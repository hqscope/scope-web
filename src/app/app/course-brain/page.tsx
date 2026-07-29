import type { Metadata } from "next";
import Link from "next/link";

import WorkspaceActionCard from "@/components/app/WorkspaceActionCard";
import { getWorkspaceActionItems, getWorkspaceData } from "@/lib/data/workspace";
import { formatCompactNumber, formatDateTimeLabel } from "@/lib/ui/format";

type CourseBrainSearchParams = Promise<Record<string, string | string[] | undefined>>;

export const metadata: Metadata = {
  title: "Course Brain",
};

function getSingleValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function matchesQuery(values: Array<string | null | undefined>, query: string): boolean {
  if (!query) {
    return true;
  }

  return values
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .includes(query);
}

export default async function AppCourseBrainPage({
  searchParams,
}: {
  searchParams: CourseBrainSearchParams;
}) {
  const workspace = await getWorkspaceData();

  if (!workspace) {
    return null;
  }

  const params = await searchParams;
  const query = (getSingleValue(params.q) ?? "").trim().toLowerCase();
  const course = getSingleValue(params.course) ?? "";
  const actionItemMap = new Map(
    getWorkspaceActionItems(workspace).map((item) => [item.itemKey, item]),
  );

  const artifacts = workspace.courseBrainArtifacts.filter((artifact) => {
    if (course && artifact.courseKey !== course) {
      return false;
    }

    return matchesQuery(
      [
        artifact.title,
        artifact.detail,
        artifact.courseName,
        artifact.assignmentId,
        artifact.relatedResourceTitle,
      ],
      query,
    );
  });

  const grouped = new Map<string, typeof artifacts>();
  artifacts.forEach((artifact) => {
    const key = artifact.courseKey ?? "cross-course";
    grouped.set(key, [...(grouped.get(key) ?? []), artifact]);
  });

  return (
    <div className="space-y-6">
      <section className="app-card rounded-[1.75rem] p-6 sm:p-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="app-label">Course Brain</p>
            <h1 className="mt-3 text-4xl">Navigate the study artifacts already connected to your courses</h1>
            <p className="mt-4 max-w-3xl app-copy">
              This page keeps Course Brain grounded in real course context. It
              groups what already exists and makes it easier to trace those artifacts back to the work that matters.
            </p>
          </div>

          <form className="grid w-full max-w-3xl gap-3 md:grid-cols-[1fr_16rem_auto]">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search assignments, excerpts, or concepts"
              className="h-12 rounded-full border border-white/10 bg-[rgba(8,10,14,0.48)] px-5 text-sm text-white outline-none placeholder:text-[var(--color-shell-copy-muted)]"
            />
            <select
              name="course"
              defaultValue={course}
              className="h-12 rounded-full border border-white/10 bg-[rgba(8,10,14,0.48)] px-5 text-sm text-white outline-none"
            >
              <option value="">All courses</option>
              {workspace.courseCatalog.map((courseItem) => (
                <option key={courseItem.courseKey} value={courseItem.courseKey}>
                  {courseItem.courseName}
                </option>
              ))}
            </select>
            <button type="submit" className="button-primary whitespace-nowrap">
              Filter artifacts
            </button>
          </form>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="app-card rounded-[1.5rem] p-5">
          <p className="app-label">Missions</p>
          <p className="metric-value mt-4">{formatCompactNumber(workspace.courseBrain.missionCount)}</p>
        </article>
        <article className="app-card rounded-[1.5rem] p-5">
          <p className="app-label">Evidence links</p>
          <p className="metric-value mt-4">{formatCompactNumber(workspace.courseBrain.evidenceCount)}</p>
        </article>
        <article className="app-card rounded-[1.5rem] p-5">
          <p className="app-label">Manual links</p>
          <p className="metric-value mt-4">{formatCompactNumber(workspace.courseBrain.manualLinkCount)}</p>
        </article>
        <article className="app-card rounded-[1.5rem] p-5">
          <p className="app-label">Study plans</p>
          <p className="metric-value mt-4">{formatCompactNumber(workspace.courseBrain.studyPlanCount)}</p>
        </article>
      </section>

      {artifacts.length === 0 ? (
        <section className="app-card rounded-[1.75rem] p-6">
          <div className="empty-panel">
            <p className="text-lg font-semibold">No artifacts match this view</p>
            <p className="mt-2 app-copy">
              No Course Brain artifacts are visible yet. They will appear here as your synced courses gain more context.
            </p>
          </div>
        </section>
      ) : (
        Array.from(grouped.entries()).map(([groupKey, groupArtifacts]) => {
          const groupTitle =
            groupArtifacts[0]?.courseName ??
            (groupKey === "cross-course" ? "Cross-course artifacts" : "Course artifacts");

          return (
            <section key={groupKey} className="app-card rounded-[1.75rem] p-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="app-label">Artifact group</p>
                  <h2 className="mt-2 text-2xl">{groupTitle}</h2>
                </div>
                {groupArtifacts[0]?.courseKey ? (
                  <Link
                    href={`/app/courses/${groupArtifacts[0].courseKey}`}
                    className="font-semibold text-white underline underline-offset-4"
                  >
                    Open course workspace
                  </Link>
                ) : null}
              </div>

              <div className="mt-6 space-y-4">
                {groupArtifacts.map((artifact) => {
                  const actionItem = actionItemMap.get(artifact.itemKey);

                  if (!actionItem) {
                    return (
                      <article key={artifact.id} className="app-card-soft rounded-[1.25rem] p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-white">{artifact.title}</p>
                            <p className="mt-2 app-copy">{artifact.detail}</p>
                          </div>
                          <span className="status-chip" data-tone="muted">
                            {artifact.kind.replaceAll("_", " ")}
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-[var(--color-shell-copy-muted)]">
                          Updated {formatDateTimeLabel(artifact.updatedAt)}
                        </p>
                      </article>
                    );
                  }

                  return (
                    <WorkspaceActionCard
                      key={artifact.id}
                      item={actionItem}
                      redirectTo={`/app/course-brain${course ? `?course=${course}` : ""}${query ? `${course ? "&" : "?"}q=${encodeURIComponent(query)}` : ""}`}
                      actionsEnabled={workspace.workflowAvailable}
                    />
                  );
                })}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
