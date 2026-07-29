import { AuthenticatedAppUser } from "@/lib/auth/session";

export type WorkspaceItemType = "upcoming_work" | "document" | "course_brain";
export type WorkspaceItemStatus = "open" | "in_progress" | "done" | "snoozed";
export type WorkspaceItemPriority = "low" | "normal" | "high";
export type WorkspaceSection = "overdue" | "today" | "week" | "pinned";
export type StudentTaskStatus = "open" | "done";

export interface SyncedItemRow {
  id: string;
  user_id: string;
  item_type: string;
  item_data: unknown;
  sync_status: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceItemState {
  userId: string;
  itemKey: string;
  itemType: WorkspaceItemType;
  status: WorkspaceItemStatus;
  priority: WorkspaceItemPriority;
  pinned: boolean;
  deferredUntil: string | null;
  note: string | null;
  sourceSnapshot: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentSummary {
  id: string;
  itemKey: string;
  title: string;
  courseId: number | null;
  courseKey: string | null;
  courseName: string | null;
  status: string;
  syncStatus: string;
  storagePath: string | null;
  annotatedStoragePath: string | null;
  sourceUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IndexedLearningObjectSummary {
  id: string;
  itemKey: string;
  title: string;
  courseId: number | null;
  courseKey: string | null;
  courseName: string | null;
  type: string;
  dueAt: string | null;
  moduleName: string | null;
  submissionStatus: string | null;
  url: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpcomingWorkSummary extends IndexedLearningObjectSummary {
  dueAt: string;
}

export interface CourseCatalogSummary {
  id: string;
  courseId: number | null;
  courseKey: string;
  courseName: string;
  courseCode: string | null;
  termName: string | null;
  platform: string | null;
  platformDomain: string | null;
  teacherNames: string[];
  scannedAt: string | null;
  snapshotCount: number;
}

export interface CourseSnapshotSummary {
  id: string;
  courseId: number | null;
  courseKey: string;
  courseName: string;
  courseCode: string | null;
  scannedAt: string | null;
  platform: string | null;
  platformDomain: string | null;
  moduleCount: number;
  assignmentGroupCount: number;
  indexedItemCount: number;
  dueItemCount: number;
  teacherNames: string[];
  moduleNames: string[];
  indexedItems: IndexedLearningObjectSummary[];
  dueItems: UpcomingWorkSummary[];
}

export interface CourseBrainArtifactSummary {
  id: string;
  itemKey: string;
  kind: "mission" | "evidence" | "manual_link" | "study_plan";
  title: string;
  detail: string;
  courseId: number | null;
  courseKey: string | null;
  courseName: string | null;
  assignmentId: string | null;
  relatedResourceTitle: string | null;
  updatedAt: string;
}

export interface CourseBrainSummary {
  linkedLearningObjectCount: number;
  missionCount: number;
  evidenceCount: number;
  manualLinkCount: number;
  studyPlanCount: number;
  collapsedTimelineBucketCount: number;
  recentArtifacts: CourseBrainArtifactSummary[];
}

export interface IntegrationStatus {
  id: "canvascope" | "lectra" | "gradescope";
  name: string;
  status: "connected" | "available" | "planned";
  headline: string;
  description: string;
  actionHref: string;
  actionLabel: string;
  rowCount: number;
  lastSeenAt: string | null;
  recentItemTypes: string[];
}

export interface StudentTask {
  id: string;
  userId: string;
  title: string;
  notes: string | null;
  dueAt: string | null;
  status: StudentTaskStatus;
  repeatDaily: boolean;
  rawText: string | null;
  sourceApp: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentQuickLink {
  id: string;
  userId: string;
  label: string;
  url: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardQuickLink {
  id: string;
  label: string;
  href: string;
  description: string;
  external: boolean;
  source: "preset" | "custom";
}

export interface WorkspaceCoverage {
  indexedLearningObjects: number;
  assignmentsWithDueDates: number;
  documentsAwaitingAnnotation: number;
  courseCatalogCoverage: number;
}

export interface WorkspaceActionItem {
  itemKey: string;
  itemType: WorkspaceItemType;
  title: string;
  detail: string;
  courseId: number | null;
  courseKey: string | null;
  courseName: string | null;
  dueAt: string | null;
  moduleName: string | null;
  href: string | null;
  sourceStatus: string | null;
  state: WorkspaceItemState | null;
}

export interface WorkspaceQueues {
  overdue: WorkspaceActionItem[];
  today: WorkspaceActionItem[];
  week: WorkspaceActionItem[];
  pinned: WorkspaceActionItem[];
}

export interface WorkspaceActivityEvent {
  id: string;
  source: "canvascope" | "lectra" | "gradescope" | "course_brain" | "workspace";
  label: string;
  detail: string;
  updatedAt: string;
  href: string | null;
}

export interface DashboardOverview {
  activeDueCount: number;
  openStudentTaskCount: number;
  pinnedCount: number;
  documentsAwaitingAnnotation: number;
  courseCount: number;
  latestSyncAt: string | null;
  loadError: string | null;
  workflowAvailable: boolean;
  workflowError: string | null;
  upcomingAssignmentsPreview: WorkspaceActionItem[];
  pendingDocumentsPreview: DocumentSummary[];
  quickLinks: DashboardQuickLink[];
  queues: WorkspaceQueues;
  activity: WorkspaceActivityEvent[];
}

export interface CourseDetailViewModel {
  catalog: CourseCatalogSummary;
  snapshot: CourseSnapshotSummary | null;
  documents: DocumentSummary[];
  artifacts: CourseBrainArtifactSummary[];
  dueItems: WorkspaceActionItem[];
  indexedItems: IndexedLearningObjectSummary[];
}

export interface DocumentDetailViewModel {
  document: DocumentSummary;
  state: WorkspaceItemState | null;
  relatedWork: WorkspaceActionItem[];
  relatedArtifacts: CourseBrainArtifactSummary[];
}

export interface WorkspaceData {
  user: AuthenticatedAppUser;
  rows: SyncedItemRow[];
  documents: DocumentSummary[];
  studentTasks: StudentTask[];
  studentQuickLinks: StudentQuickLink[];
  courseCatalog: CourseCatalogSummary[];
  courseSnapshots: CourseSnapshotSummary[];
  indexedItems: IndexedLearningObjectSummary[];
  upcomingWork: UpcomingWorkSummary[];
  courseBrainArtifacts: CourseBrainArtifactSummary[];
  courseBrain: CourseBrainSummary;
  dashboard: DashboardOverview;
  integrations: IntegrationStatus[];
  coverage: WorkspaceCoverage;
  latestSyncAt: string | null;
  loadError: string | null;
  workflowState: Map<string, WorkspaceItemState>;
  workflowError: string | null;
  workflowAvailable: boolean;
}
