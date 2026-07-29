import { createHash, randomUUID } from "node:crypto";
import { cache } from "react";

import { getAuthenticatedAppUser } from "@/lib/auth/session";
import {
  CourseBrainArtifactSummary,
  CourseBrainSummary,
  CourseCatalogSummary,
  CourseDetailViewModel,
  CourseSnapshotSummary,
  DashboardOverview,
  DashboardQuickLink,
  DocumentDetailViewModel,
  DocumentSummary,
  IndexedLearningObjectSummary,
  IntegrationStatus,
  StudentQuickLink,
  StudentTask,
  SyncedItemRow,
  UpcomingWorkSummary,
  WorkspaceActionItem,
  WorkspaceActivityEvent,
  WorkspaceCoverage,
  WorkspaceData,
  WorkspaceItemState,
  WorkspaceSection,
} from "@/lib/data/models";
import { loadStudentQuickLinks } from "@/lib/data/studentQuickLinks";
import { loadStudentTasks } from "@/lib/data/studentTasks";
import { loadWorkspaceItemStateMap } from "@/lib/data/workspaceState";
import { CHROME_WEB_STORE_URL } from "@/lib/site";
import { getRenderNow } from "@/lib/ui/render-time";

const COURSE_CATALOG_ITEM_TYPE = "canvascope_course_catalog_v1";
const COURSE_SNAPSHOT_ITEM_TYPE = "canvascope_course_snapshot_v1";
const COURSE_BRAIN_MANUAL_LINK = "course_brain_manual_link";
const COURSE_BRAIN_MISSION = "course_brain_assignment_mission_v1";
const COURSE_BRAIN_EVIDENCE = "course_brain_evidence_link_v1";
const COURSE_BRAIN_STUDY_PLAN = "course_brain_study_plan_v1";
const COURSE_BRAIN_TIMELINE_META = "course_brain_timeline_meta";

interface RecordValue {
  [key: string]: unknown;
}

interface ParsedSnapshotsResult {
  snapshots: CourseSnapshotSummary[];
  upcomingWork: UpcomingWorkSummary[];
  indexedItems: IndexedLearningObjectSummary[];
  indexedLearningObjects: number;
  assignmentsWithDueDates: number;
  courseNameById: Map<number, string>;
  snapshotCounts: Map<string, number>;
}

function isRecord(value: unknown): value is RecordValue {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asRecord(value: unknown): RecordValue | null {
  return isRecord(value) ? value : null;
}

function getString(value: RecordValue | null, ...keys: string[]): string | null {
  if (!value) {
    return null;
  }

  for (const key of keys) {
    const candidate = value[key];
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim();
    }
  }

  return null;
}

function getNumber(value: RecordValue | null, ...keys: string[]): number | null {
  if (!value) {
    return null;
  }

  for (const key of keys) {
    const candidate = value[key];
    if (typeof candidate === "number" && Number.isFinite(candidate)) {
      return candidate;
    }

    if (typeof candidate === "string" && candidate.trim()) {
      const parsed = Number(candidate);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return null;
}

function getStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
    .filter(Boolean);
}

function getRecordArray(value: unknown): RecordValue[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isRecord);
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "course";
}

function buildCourseKey(courseId: number | null, courseName: string): string {
  return courseId ? String(courseId) : slugify(courseName);
}

function hashJson(value: Record<string, unknown>): string {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function buildUpcomingWorkKey(input: {
  courseId: number | null;
  title: string;
  dueAt: string;
  url: string | null;
  type: string;
}): string {
  return `upcoming:${hashJson({
    courseId: input.courseId,
    title: input.title,
    dueAt: input.dueAt,
    url: input.url,
    type: input.type,
  })}`;
}

function buildDocumentKey(documentId: string): string {
  return `document:${documentId}`;
}

function buildArtifactKey(kind: string, rowId: string): string {
  return `artifact:${kind}:${rowId}`;
}

function getAssignmentWindow(inputNowMs = getRenderNow()) {
  const windowStartMs = inputNowMs - 7 * 24 * 60 * 60 * 1000;
  const windowEnd = new Date(inputNowMs);
  windowEnd.setMonth(windowEnd.getMonth() + 1);

  return {
    windowStartMs,
    windowEndMs: windowEnd.getTime(),
  };
}

function isSubmittedStatus(status: string | null): boolean {
  if (!status) {
    return false;
  }

  return status.trim().toLowerCase() === "submitted";
}

function isVisibleUpcomingWork(item: {
  dueAt: string;
  submissionStatus: string | null;
}, nowMs = getRenderNow()): boolean {
  if (isSubmittedStatus(item.submissionStatus)) {
    return false;
  }

  const dueAtMs = Date.parse(item.dueAt);
  if (Number.isNaN(dueAtMs)) {
    return false;
  }

  const { windowStartMs, windowEndMs } = getAssignmentWindow(nowMs);
  return dueAtMs >= windowStartMs && dueAtMs <= windowEndMs;
}

function parseSyncedItemRows(raw: unknown): SyncedItemRow[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw
    .filter(isRecord)
    .map((row) => ({
      id: getString(row, "id") ?? randomUUID(),
      user_id: getString(row, "user_id") ?? "",
      item_type: getString(row, "item_type") ?? "unknown",
      item_data: row.item_data ?? null,
      sync_status: getString(row, "sync_status"),
      created_at: getString(row, "created_at") ?? new Date(0).toISOString(),
      updated_at: getString(row, "updated_at") ?? new Date(0).toISOString(),
    }));
}

function parseCourseCatalog(
  rows: SyncedItemRow[],
  snapshotCounts: Map<string, number>,
): CourseCatalogSummary[] {
  const catalogMap = new Map<string, CourseCatalogSummary>();

  rows.forEach((row) => {
    if (row.item_type !== COURSE_CATALOG_ITEM_TYPE) {
      return;
    }

    const itemData = asRecord(row.item_data);
    getRecordArray(itemData?.courseCatalog).forEach((course, index) => {
      const courseId = getNumber(course, "courseId");
      const courseName = getString(course, "courseName", "name") ?? "Untitled course";
      const courseKey = buildCourseKey(courseId, courseName);
      const teacherNames = getRecordArray(course.teacherSummaries).flatMap((teacher) => {
        const name = getString(teacher, "name");
        return name ? [name] : [];
      });

      catalogMap.set(courseKey, {
        id: `${row.id}-${index}`,
        courseId,
        courseKey,
        courseName,
        courseCode: getString(course, "courseCode"),
        termName: getString(course, "termName"),
        platform: getString(course, "platform"),
        platformDomain: getString(course, "platformDomain"),
        teacherNames,
        scannedAt: getString(course, "scannedAt"),
        snapshotCount: snapshotCounts.get(courseKey) ?? 0,
      });
    });
  });

  return Array.from(catalogMap.values()).sort((left, right) =>
    left.courseName.localeCompare(right.courseName),
  );
}

function parseIndexedItems(
  row: SyncedItemRow,
  snapshotIndex: number,
  courseId: number | null,
  courseKey: string,
  courseName: string,
  indexedContent: RecordValue[],
  nowMs: number,
): {
  indexedItems: IndexedLearningObjectSummary[];
  dueItems: UpcomingWorkSummary[];
} {
  const indexedItems: IndexedLearningObjectSummary[] = [];
  const dueItems: UpcomingWorkSummary[] = [];

  indexedContent.forEach((item, itemIndex) => {
    const title = getString(item, "title") ?? "Untitled item";
    const type = getString(item, "type") ?? "resource";
    const dueAt = getString(item, "dueAt");
    const url = getString(item, "url");
    const itemKey = dueAt
      ? buildUpcomingWorkKey({ courseId, title, dueAt, url, type })
      : `indexed:${row.id}:${snapshotIndex}:${itemIndex}`;

    const indexedItem = {
      id: `${row.id}-${snapshotIndex}-${itemIndex}`,
      itemKey,
      title,
      courseId,
      courseKey,
      courseName,
      type,
      dueAt,
      moduleName: getString(item, "moduleName"),
      submissionStatus: getString(item, "submissionStatus"),
      url,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    } satisfies IndexedLearningObjectSummary;

    indexedItems.push(indexedItem);

    if (dueAt) {
      const dueItem = {
        ...indexedItem,
        dueAt,
      } satisfies UpcomingWorkSummary;

      if (isVisibleUpcomingWork(dueItem, nowMs)) {
        dueItems.push(dueItem);
      }
    }
  });

  return { indexedItems, dueItems };
}

function parseCourseSnapshots(rows: SyncedItemRow[]): ParsedSnapshotsResult {
  const snapshots: CourseSnapshotSummary[] = [];
  const upcomingWork: UpcomingWorkSummary[] = [];
  const indexedItems: IndexedLearningObjectSummary[] = [];
  const nowMs = getRenderNow();
  const courseNameById = new Map<number, string>();
  const snapshotCounts = new Map<string, number>();
  let indexedLearningObjects = 0;
  let assignmentsWithDueDates = 0;

  for (const row of rows) {
    if (row.item_type !== COURSE_SNAPSHOT_ITEM_TYPE) {
      continue;
    }

    const itemData = asRecord(row.item_data);
    const snapshotCandidates = itemData?.courseSnapshots
      ? getRecordArray(itemData.courseSnapshots)
      : itemData
        ? [itemData]
        : [];

    for (const [index, snapshot] of snapshotCandidates.entries()) {
      const course = asRecord(snapshot.course);
      const courseId = getNumber(course, "courseId") ?? getNumber(snapshot, "courseId");
      const courseName =
        getString(course, "courseName", "name") ||
        getString(snapshot, "courseName") ||
        "Untitled course";
      const courseKey = buildCourseKey(courseId, courseName);

      if (courseId) {
        courseNameById.set(courseId, courseName);
      }

      const modules = getRecordArray(snapshot.modules);
      const indexedContent = getRecordArray(snapshot.indexedContent);
      const teacherNames = getRecordArray(snapshot.teacherSummaries).flatMap((teacher) => {
        const name = getString(teacher, "name");
        return name ? [name] : [];
      });
      const parsedItems = parseIndexedItems(
        row,
        index,
        courseId,
        courseKey,
        courseName,
        indexedContent,
        nowMs,
      );

      snapshots.push({
        id: `${row.id}-${index}`,
        courseId,
        courseKey,
        courseName,
        courseCode: getString(course, "courseCode"),
        scannedAt: getString(snapshot, "scannedAt"),
        platform: getString(snapshot, "platform"),
        platformDomain: getString(snapshot, "platformDomain"),
        moduleCount: modules.length,
        assignmentGroupCount: getRecordArray(snapshot.assignmentGroups).length,
        indexedItemCount: parsedItems.indexedItems.length,
        dueItemCount: parsedItems.dueItems.length,
        teacherNames,
        moduleNames: modules
          .map((module) => getString(module, "name"))
          .filter((name): name is string => Boolean(name))
          .slice(0, 6),
        indexedItems: parsedItems.indexedItems,
        dueItems: parsedItems.dueItems,
      });

      indexedLearningObjects += parsedItems.indexedItems.length;
      assignmentsWithDueDates += parsedItems.dueItems.length;
      indexedItems.push(...parsedItems.indexedItems);
      upcomingWork.push(...parsedItems.dueItems);
      snapshotCounts.set(courseKey, (snapshotCounts.get(courseKey) ?? 0) + 1);
    }
  }

  return {
    snapshots: snapshots.sort((left, right) =>
      left.courseName.localeCompare(right.courseName),
    ),
    upcomingWork: upcomingWork.sort(
      (left, right) => new Date(left.dueAt).getTime() - new Date(right.dueAt).getTime(),
    ),
    indexedItems,
    indexedLearningObjects,
    assignmentsWithDueDates,
    courseNameById,
    snapshotCounts,
  };
}

function parseDocuments(
  rows: SyncedItemRow[],
  courseNameById: Map<number, string>,
): DocumentSummary[] {
  return rows
    .filter((row) => row.item_type === "pdf_document")
    .map((row) => {
      const itemData = asRecord(row.item_data);
      const courseId = getNumber(itemData, "courseId");
      const courseName = courseId ? courseNameById.get(courseId) ?? null : null;
      const courseKey = courseName ? buildCourseKey(courseId, courseName) : null;

      return {
        id: row.id,
        itemKey: buildDocumentKey(row.id),
        title: getString(itemData, "title") ?? "Untitled document",
        courseId,
        courseKey,
        courseName,
        status: getString(itemData, "status") ?? "pending_annotation",
        syncStatus: row.sync_status ?? "synced",
        storagePath: getString(itemData, "storagePath"),
        annotatedStoragePath: getString(itemData, "annotatedStoragePath"),
        sourceUrl: getString(itemData, "sourceUrl"),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      } satisfies DocumentSummary;
    })
    .sort((left, right) => Date.parse(right.updatedAt) - Date.parse(left.updatedAt));
}

function parseCourseBrainArtifacts(
  rows: SyncedItemRow[],
  courseNameById: Map<number, string>,
): CourseBrainArtifactSummary[] {
  const artifacts: CourseBrainArtifactSummary[] = [];

  for (const row of rows) {
    const itemData = asRecord(row.item_data);
    const courseId = getNumber(itemData, "courseId");
    const courseName = courseId ? courseNameById.get(courseId) ?? null : null;
    const courseKey = courseName ? buildCourseKey(courseId, courseName) : null;

    if (row.item_type === COURSE_BRAIN_MISSION) {
      artifacts.push({
        id: row.id,
        itemKey: buildArtifactKey("mission", row.id),
        kind: "mission",
        title:
          getString(itemData, "assignmentId") ??
          getString(itemData, "briefMarkdown") ??
          "Course mission",
        detail: `Shortlisted ${getRecordArray(itemData?.shortlistedResourceIDs).length || getStringArray(itemData?.shortlistedResourceIDs).length} resources`,
        courseId,
        courseKey,
        courseName,
        assignmentId: getString(itemData, "assignmentId"),
        relatedResourceTitle: null,
        updatedAt: row.updated_at,
      });
    }

    if (row.item_type === COURSE_BRAIN_EVIDENCE) {
      artifacts.push({
        id: row.id,
        itemKey: buildArtifactKey("evidence", row.id),
        kind: "evidence",
        title: getString(itemData, "selectionText", "excerpt") ?? "Evidence link",
        detail: getString(itemData, "targetKind", "sourceKind") ?? "Linked study evidence",
        courseId,
        courseKey,
        courseName,
        assignmentId: getString(itemData, "assignmentId"),
        relatedResourceTitle: getString(itemData, "selectionText", "excerpt"),
        updatedAt: row.updated_at,
      });
    }

    if (row.item_type === COURSE_BRAIN_MANUAL_LINK) {
      artifacts.push({
        id: row.id,
        itemKey: buildArtifactKey("manual_link", row.id),
        kind: "manual_link",
        title: "Manual concept link",
        detail: getString(itemData, "relationship") ?? "Custom relationship saved in Course Brain",
        courseId,
        courseKey,
        courseName,
        assignmentId: getString(itemData, "assignmentId"),
        relatedResourceTitle: getString(itemData, "conceptName", "targetConcept"),
        updatedAt: row.updated_at,
      });
    }

    if (row.item_type === COURSE_BRAIN_STUDY_PLAN) {
      artifacts.push({
        id: row.id,
        itemKey: buildArtifactKey("study_plan", row.id),
        kind: "study_plan",
        title: getString(itemData, "assignmentId") ?? "Study plan",
        detail: `${getRecordArray(itemData?.sprints).length} sprint blocks`,
        courseId,
        courseKey,
        courseName,
        assignmentId: getString(itemData, "assignmentId"),
        relatedResourceTitle: null,
        updatedAt: row.updated_at,
      });
    }
  }

  return artifacts.sort(
    (left, right) => Date.parse(right.updatedAt) - Date.parse(left.updatedAt),
  );
}

function parseCourseBrainSummary(
  rows: SyncedItemRow[],
  artifacts: CourseBrainArtifactSummary[],
  linkedLearningObjectCount: number,
): CourseBrainSummary {
  let missionCount = 0;
  let evidenceCount = 0;
  let manualLinkCount = 0;
  let studyPlanCount = 0;
  let collapsedTimelineBucketCount = 0;

  artifacts.forEach((artifact) => {
    if (artifact.kind === "mission") {
      missionCount += 1;
    }
    if (artifact.kind === "evidence") {
      evidenceCount += 1;
    }
    if (artifact.kind === "manual_link") {
      manualLinkCount += 1;
    }
    if (artifact.kind === "study_plan") {
      studyPlanCount += 1;
    }
  });

  rows.forEach((row) => {
    if (row.item_type !== COURSE_BRAIN_TIMELINE_META) {
      return;
    }

    const itemData = asRecord(row.item_data);
    collapsedTimelineBucketCount += getStringArray(itemData?.collapsedBuckets).length;
  });

  return {
    linkedLearningObjectCount,
    missionCount,
    evidenceCount,
    manualLinkCount,
    studyPlanCount,
    collapsedTimelineBucketCount,
    recentArtifacts: artifacts.slice(0, 6),
  };
}

function sourceIdForRow(row: SyncedItemRow): IntegrationStatus["id"] | "course_brain" {
  const itemData = asRecord(row.item_data);

  if (row.item_type === "pdf_document") {
    return "lectra";
  }

  if (
    row.item_type === COURSE_CATALOG_ITEM_TYPE ||
    row.item_type === COURSE_SNAPSHOT_ITEM_TYPE ||
    getString(itemData, "sourceApp") === "canvascope_extension"
  ) {
    return "canvascope";
  }

  if (row.item_type.startsWith("course_brain_")) {
    return "course_brain";
  }

  if (row.item_type.toLowerCase().includes("gradescope")) {
    return "gradescope";
  }

  if (getString(itemData, "sourceApp")?.includes("lectra")) {
    return "lectra";
  }

  return "canvascope";
}

function parseIntegrationStatus(
  rows: SyncedItemRow[],
  documents: DocumentSummary[],
  courseCatalog: CourseCatalogSummary[],
): IntegrationStatus[] {
  const canvascopeRows = rows.filter((row) => sourceIdForRow(row) === "canvascope");
  const lectraRows = rows.filter((row) => sourceIdForRow(row) === "lectra");
  const gradescopeRows = rows.filter((row) => sourceIdForRow(row) === "gradescope");

  return [
    {
      id: "canvascope",
      name: "Canvascope Extension",
      status: canvascopeRows.length > 0 ? "connected" : "available",
      headline:
        canvascopeRows.length > 0
          ? `${courseCatalog.length} course records synced into the workspace`
          : "Ready to sync once the extension signs in",
      description:
        "The extension is still the source for LMS indexing, search, and course snapshots. The web app now turns those records into a study workflow.",
      actionHref: CHROME_WEB_STORE_URL,
      actionLabel: canvascopeRows.length > 0 ? "Open extension listing" : "Add extension",
      rowCount: canvascopeRows.length,
      lastSeenAt: canvascopeRows[0]?.updated_at ?? null,
      recentItemTypes: Array.from(new Set(canvascopeRows.map((row) => row.item_type))).slice(0, 3),
    },
    {
      id: "lectra",
      name: "Lectra",
      status: documents.length > 0 ? "connected" : "available",
      headline:
        documents.length > 0
          ? `${documents.length} document handoffs are visible in the workspace`
          : "Document handoff appears once PDFs are sent from Canvascope",
      description:
        "Lectra remains the annotation companion. The web workspace now exposes document access and follow-up, not just sync status.",
      actionHref: "/product/lectra",
      actionLabel: documents.length > 0 ? "Open document workflow" : "Learn about Lectra",
      rowCount: lectraRows.length,
      lastSeenAt: lectraRows[0]?.updated_at ?? null,
      recentItemTypes: Array.from(new Set(lectraRows.map((row) => row.item_type))).slice(0, 3),
    },
    {
      id: "gradescope",
      name: "Gradescope",
      status: gradescopeRows.length > 0 ? "connected" : "planned",
      headline:
        gradescopeRows.length > 0
          ? "Gradescope activity is present in the broader ecosystem"
          : "No web-backed Gradescope sync yet",
      description:
        "Gradescope stays status-first until there is a durable web-facing model. The workspace will report readiness without pretending it already owns the flow.",
      actionHref: "/app/integrations",
      actionLabel: "View integration health",
      rowCount: gradescopeRows.length,
      lastSeenAt: gradescopeRows[0]?.updated_at ?? null,
      recentItemTypes: Array.from(new Set(gradescopeRows.map((row) => row.item_type))).slice(0, 3),
    },
  ];
}

function buildCoverage(
  documents: DocumentSummary[],
  indexedLearningObjects: number,
  assignmentsWithDueDates: number,
  courseCatalog: CourseCatalogSummary[],
): WorkspaceCoverage {
  return {
    indexedLearningObjects,
    assignmentsWithDueDates,
    documentsAwaitingAnnotation: documents.filter(
      (document) => document.status !== "annotated",
    ).length,
    courseCatalogCoverage: courseCatalog.length,
  };
}

function normalizeDashboardUrl(raw: string | null): string | null {
  if (!raw) {
    return null;
  }

  try {
    const normalized = raw.includes("://") ? raw : `https://${raw}`;
    return new URL(normalized).toString();
  } catch {
    return null;
  }
}

function deriveCanvasQuickLink(
  courseCatalog: CourseCatalogSummary[],
  upcomingWork: UpcomingWorkSummary[],
  documents: DocumentSummary[],
): DashboardQuickLink | null {
  const catalogCandidate = courseCatalog.find(
    (course) =>
      course.platform?.toLowerCase().includes("canvas") &&
      Boolean(course.platformDomain),
  );

  const catalogHref = normalizeDashboardUrl(catalogCandidate?.platformDomain ?? null);
  if (catalogHref) {
    return {
      id: "preset:canvas",
      label: "Canvas",
      href: catalogHref,
      description: "Return to your LMS dashboard.",
      external: true,
      source: "preset",
    };
  }

  const rawUrls = [
    ...upcomingWork.map((item) => item.url),
    ...documents.map((document) => document.sourceUrl),
  ].filter((value): value is string => Boolean(value));

  for (const rawUrl of rawUrls) {
    try {
      const parsed = new URL(rawUrl);
      const href = parsed.origin;
      if (parsed.hostname.includes("canvas") || parsed.hostname.includes("instructure")) {
        return {
          id: "preset:canvas",
          label: "Canvas",
          href,
          description: "Return to your LMS dashboard.",
          external: true,
          source: "preset",
        };
      }
    } catch {
      continue;
    }
  }

  return null;
}

function buildDashboardQuickLinks(
  courseCatalog: CourseCatalogSummary[],
  upcomingWork: UpcomingWorkSummary[],
  documents: DocumentSummary[],
  studentQuickLinks: StudentQuickLink[],
): DashboardQuickLink[] {
  const canvasLink = deriveCanvasQuickLink(courseCatalog, upcomingWork, documents);
  const links: DashboardQuickLink[] = [];

  if (canvasLink) {
    links.push(canvasLink);
  }

  links.push(
    {
      id: "preset:gradescope",
      label: "Gradescope",
      href: "https://www.gradescope.com",
      description: "Open submissions, regrade requests, and results.",
      external: true,
      source: "preset",
    },
    {
      id: "preset:lectra",
      label: "Lectra files",
      href: "/app/documents",
      description: "Review imported PDFs and annotation status.",
      external: false,
      source: "preset",
    },
  );

  return [
    ...links,
    ...studentQuickLinks.map((link) => ({
      id: link.id,
      label: link.label,
      href: link.url,
      description: "Student-added quick link.",
      external: true,
      source: "custom" as const,
    })),
  ];
}

function buildActionItems(
  upcomingWork: UpcomingWorkSummary[],
  documents: DocumentSummary[],
  artifacts: CourseBrainArtifactSummary[],
  workflowState: Map<string, WorkspaceItemState>,
): WorkspaceActionItem[] {
  const dueWorkItems = upcomingWork.map((item) => ({
    itemKey: item.itemKey,
    itemType: "upcoming_work" as const,
    title: item.title,
    detail: [item.type, item.courseName, item.submissionStatus].filter(Boolean).join(" · "),
    courseId: item.courseId,
    courseKey: item.courseKey,
    courseName: item.courseName,
    dueAt: item.dueAt,
    moduleName: item.moduleName,
    href: item.url ?? (item.courseKey ? `/app/courses/${item.courseKey}` : null),
    sourceStatus: item.submissionStatus,
    state: workflowState.get(item.itemKey) ?? null,
  }));

  const documentItems = documents.map((document) => ({
    itemKey: document.itemKey,
    itemType: "document" as const,
    title: document.title,
    detail: [document.status.replaceAll("_", " "), document.courseName].filter(Boolean).join(" · "),
    courseId: document.courseId,
    courseKey: document.courseKey,
    courseName: document.courseName,
    dueAt: null,
    moduleName: null,
    href: `/app/documents/${document.id}`,
    sourceStatus: document.status,
    state: workflowState.get(document.itemKey) ?? null,
  }));

  const artifactItems = artifacts.map((artifact) => ({
    itemKey: artifact.itemKey,
    itemType: "course_brain" as const,
    title: artifact.title,
    detail: [artifact.kind.replaceAll("_", " "), artifact.courseName ?? "Cross-course"].join(" · "),
    courseId: artifact.courseId,
    courseKey: artifact.courseKey,
    courseName: artifact.courseName,
    dueAt: null,
    moduleName: null,
    href: artifact.courseKey ? `/app/courses/${artifact.courseKey}` : "/app/course-brain",
    sourceStatus: artifact.kind,
    state: workflowState.get(artifact.itemKey) ?? null,
  }));

  return [...dueWorkItems, ...documentItems, ...artifactItems];
}

function shouldIncludeCompleted(item: WorkspaceActionItem, showCompleted: boolean): boolean {
  if (showCompleted) {
    return true;
  }

  return item.state?.status !== "done";
}

function shouldIncludeSnoozed(item: WorkspaceActionItem, showSnoozed: boolean): boolean {
  if (showSnoozed) {
    return true;
  }

  return item.state?.status !== "snoozed";
}

function isDueWithinToday(value: string, nowMs: number): boolean {
  const dueAt = new Date(value);
  if (Number.isNaN(dueAt.getTime())) {
    return false;
  }

  const now = new Date(nowMs);
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  return dueAt.getTime() >= now.getTime() && dueAt.getTime() <= endOfDay.getTime();
}

function isDueThisWeek(value: string, nowMs: number): boolean {
  const dueAt = new Date(value);
  if (Number.isNaN(dueAt.getTime())) {
    return false;
  }

  const weekAhead = nowMs + 7 * 24 * 60 * 60 * 1000;
  return dueAt.getTime() > nowMs && dueAt.getTime() <= weekAhead;
}

function buildQueues(
  actionItems: WorkspaceActionItem[],
  showCompleted = true,
  showSnoozed = true,
): DashboardOverview["queues"] {
  const nowMs = getRenderNow();
  const filtered = actionItems.filter(
    (item) =>
      shouldIncludeCompleted(item, showCompleted) &&
      shouldIncludeSnoozed(item, showSnoozed),
  );

  return {
    overdue: filtered.filter((item) => {
      if (!item.dueAt) {
        return false;
      }
      return new Date(item.dueAt).getTime() < nowMs;
    }),
    today: filtered.filter((item) => item.dueAt && isDueWithinToday(item.dueAt, nowMs)),
    week: filtered.filter((item) => item.dueAt && isDueThisWeek(item.dueAt, nowMs)),
    pinned: filtered.filter((item) => item.state?.pinned),
  };
}

function buildActivity(rows: SyncedItemRow[]): WorkspaceActivityEvent[] {
  const seen = new Set<string>();
  const activity = rows.flatMap((row) => {
    const source = sourceIdForRow(row);
    const itemData = asRecord(row.item_data);
    const nestedCourse = asRecord(itemData?.course);
    const courseId =
      getNumber(itemData, "courseId") ?? getNumber(nestedCourse, "courseId");
    const courseName =
      getString(nestedCourse, "courseName", "name") ??
      getString(itemData, "courseName", "title");
    const courseKey = courseName ? buildCourseKey(courseId, courseName) : null;

    let event: WorkspaceActivityEvent;

    if (row.item_type === COURSE_SNAPSHOT_ITEM_TYPE) {
      event = {
        id: row.id,
        source,
        label: "Course snapshot synced",
        detail: courseName ?? "Course data updated",
        updatedAt: row.updated_at,
        href: courseKey ? `/app/courses/${courseKey}` : "/app/courses",
      } satisfies WorkspaceActivityEvent;
    } else if (row.item_type === "pdf_document") {
      const title = getString(itemData, "title") ?? "Document handoff";
      event = {
        id: row.id,
        source,
        label: "Document synced",
        detail: title,
        updatedAt: row.updated_at,
        href: `/app/documents/${row.id}`,
      } satisfies WorkspaceActivityEvent;
    } else if (row.item_type.startsWith("course_brain_")) {
      event = {
        id: row.id,
        source: "course_brain",
        label: "Course Brain updated",
        detail:
          getString(itemData, "assignmentId", "selectionText", "relationship") ??
          "Study context updated",
        updatedAt: row.updated_at,
        href: courseKey ? `/app/courses/${courseKey}` : "/app/course-brain",
      } satisfies WorkspaceActivityEvent;
    } else {
      event = {
        id: row.id,
        source,
        label: row.item_type.replaceAll("_", " "),
        detail: getString(itemData, "title") ?? "Synced row updated",
        updatedAt: row.updated_at,
        href: null,
      } satisfies WorkspaceActivityEvent;
    }

    const dedupeKey = `${event.label}:${event.detail}`;
    if (seen.has(dedupeKey)) {
      return [];
    }
    seen.add(dedupeKey);
    return [event];
  });

  return activity.slice(0, 12);
}

function buildDashboardOverview(input: {
  actionItems: WorkspaceActionItem[];
  documents: DocumentSummary[];
  courseCatalog: CourseCatalogSummary[];
  studentTasks: StudentTask[];
  coverage: WorkspaceCoverage;
  latestSyncAt: string | null;
  loadError: string | null;
  workflowAvailable: boolean;
  workflowError: string | null;
  activity: WorkspaceActivityEvent[];
  quickLinks: DashboardQuickLink[];
}): DashboardOverview {
  const activeDueCount = input.actionItems.filter(
    (item) =>
      item.itemType === "upcoming_work" &&
      item.state?.status !== "done" &&
      item.state?.status !== "snoozed",
  ).length;

  const pinnedCount = input.actionItems.filter((item) => item.state?.pinned).length;
  const upcomingAssignmentsPreview = input.actionItems
    .filter(
      (item) =>
        item.itemType === "upcoming_work" &&
        item.state?.status !== "done" &&
        item.state?.status !== "snoozed",
    )
    .slice(0, 8);
  const pendingDocumentsPreview = input.documents
    .filter((document) => document.status !== "annotated")
    .slice(0, 4);

  return {
    activeDueCount,
    openStudentTaskCount: input.studentTasks.filter((task) => task.status === "open").length,
    pinnedCount,
    documentsAwaitingAnnotation: input.coverage.documentsAwaitingAnnotation,
    courseCount: input.courseCatalog.length,
    latestSyncAt: input.latestSyncAt,
    loadError: input.loadError,
    workflowAvailable: input.workflowAvailable,
    workflowError: input.workflowError,
    upcomingAssignmentsPreview,
    pendingDocumentsPreview,
    quickLinks: input.quickLinks,
    queues: buildQueues(input.actionItems),
    activity: input.activity,
  };
}

export function getCourseDetail(
  workspace: WorkspaceData,
  courseKey: string,
): CourseDetailViewModel | null {
  const catalog = workspace.courseCatalog.find((course) => course.courseKey === courseKey);
  if (!catalog) {
    return null;
  }

  const snapshot =
    workspace.courseSnapshots.find((candidate) => candidate.courseKey === courseKey) ?? null;
  const documents = workspace.documents.filter((document) => document.courseKey === courseKey);
  const artifacts = workspace.courseBrainArtifacts.filter(
    (artifact) => artifact.courseKey === courseKey,
  );
  const dueItems = buildActionItems(
    workspace.upcomingWork.filter((item) => item.courseKey === courseKey),
    [],
    [],
    workspace.workflowState,
  );

  return {
    catalog,
    snapshot,
    documents,
    artifacts,
    dueItems,
    indexedItems: snapshot?.indexedItems ?? [],
  };
}

export function getDocumentDetail(
  workspace: WorkspaceData,
  documentId: string,
): DocumentDetailViewModel | null {
  const document = workspace.documents.find((candidate) => candidate.id === documentId);
  if (!document) {
    return null;
  }

  const relatedWork = buildActionItems(
    workspace.upcomingWork.filter((item) => item.courseKey && item.courseKey === document.courseKey),
    [],
    [],
    workspace.workflowState,
  ).slice(0, 6);

  const relatedArtifacts = workspace.courseBrainArtifacts.filter(
    (artifact) => artifact.courseKey && artifact.courseKey === document.courseKey,
  );

  return {
    document,
    state: workspace.workflowState.get(document.itemKey) ?? null,
    relatedWork,
    relatedArtifacts,
  };
}

export function filterActionItemsForSection(
  workspace: WorkspaceData,
  section: WorkspaceSection,
  options?: {
    showCompleted?: boolean;
    showSnoozed?: boolean;
  },
): WorkspaceActionItem[] {
  const actionItems = buildActionItems(
    workspace.upcomingWork,
    workspace.documents,
    workspace.courseBrainArtifacts,
    workspace.workflowState,
  );
  const queues = buildQueues(
    actionItems,
    options?.showCompleted ?? false,
    options?.showSnoozed ?? true,
  );

  return queues[section];
}

export function getWorkspaceActionItems(workspace: WorkspaceData): WorkspaceActionItem[] {
  return buildActionItems(
    workspace.upcomingWork,
    workspace.documents,
    workspace.courseBrainArtifacts,
    workspace.workflowState,
  );
}

export function getWorkspaceQueues(
  workspace: WorkspaceData,
  options?: {
    showCompleted?: boolean;
    showSnoozed?: boolean;
  },
) {
  return buildQueues(
    getWorkspaceActionItems(workspace),
    options?.showCompleted ?? true,
    options?.showSnoozed ?? true,
  );
}

export const getWorkspaceData = cache(async (): Promise<WorkspaceData | null> => {
  const { supabase, user } = await getAuthenticatedAppUser();

  if (!user) {
    return null;
  }

  let rows: SyncedItemRow[] = [];
  let loadError: string | null = null;

  const { data, error } = await supabase
    .from("synced_items")
    .select("id, user_id, item_type, item_data, sync_status, created_at, updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    loadError = error.message;
  } else {
    rows = parseSyncedItemRows(data);
  }

  const [
    {
      workflowState,
      workflowAvailable,
      workflowError,
    },
    studentTaskResult,
    studentQuickLinkResult,
  ] = await Promise.all([
    loadWorkspaceItemStateMap(supabase, user.id),
    loadStudentTasks(supabase, user.id),
    loadStudentQuickLinks(supabase, user.id),
  ]);

  const snapshotResult = parseCourseSnapshots(rows);
  const courseCatalog = parseCourseCatalog(rows, snapshotResult.snapshotCounts);
  const courseNameById = new Map<number, string>(snapshotResult.courseNameById);

  courseCatalog.forEach((course) => {
    if (course.courseId && !courseNameById.has(course.courseId)) {
      courseNameById.set(course.courseId, course.courseName);
    }
  });

  const documents = parseDocuments(rows, courseNameById);
  const studentTasks = studentTaskResult.tasks;
  const studentQuickLinks = studentQuickLinkResult.links;
  const courseBrainArtifacts = parseCourseBrainArtifacts(rows, courseNameById);
  const courseBrain = parseCourseBrainSummary(
    rows,
    courseBrainArtifacts,
    snapshotResult.indexedLearningObjects,
  );
  const integrations = parseIntegrationStatus(rows, documents, courseCatalog);
  const coverage = buildCoverage(
    documents,
    snapshotResult.indexedLearningObjects,
    snapshotResult.assignmentsWithDueDates,
    courseCatalog,
  );
  const latestSyncAt = rows[0]?.updated_at ?? null;
  const actionItems = buildActionItems(
    snapshotResult.upcomingWork,
    documents,
    courseBrainArtifacts,
    workflowState,
  );
  const activity = buildActivity(rows);
  const quickLinks = buildDashboardQuickLinks(
    courseCatalog,
    snapshotResult.upcomingWork,
    documents,
    studentQuickLinks,
  );

  return {
    user,
    rows,
    documents,
    studentTasks,
    studentQuickLinks,
    courseCatalog,
    courseSnapshots: snapshotResult.snapshots,
    indexedItems: snapshotResult.indexedItems,
    upcomingWork: snapshotResult.upcomingWork,
    courseBrainArtifacts,
    courseBrain,
    integrations,
    coverage,
    latestSyncAt,
    loadError,
    workflowState,
    workflowError,
    workflowAvailable,
    dashboard: buildDashboardOverview({
      actionItems,
      documents,
      courseCatalog,
      studentTasks,
      coverage,
      latestSyncAt,
      loadError,
      workflowAvailable,
      workflowError,
      activity,
      quickLinks,
    }),
  } satisfies WorkspaceData;
});
