import Link from "next/link";
import { notFound } from "next/navigation";

import WorkspaceActionCard from "@/components/app/WorkspaceActionCard";
import {
  getCourseDetail,
  getWorkspaceActionItems,
  getWorkspaceData,
} from "@/lib/data/workspace";
import { formatCompactNumber, formatDateLabel, formatDateTimeLabel } from "@/lib/ui/format";

export default async function AppCourseDetailPage({
  params,
}: {
  params: Promise<{ courseKey: string }>;
}) {
  const workspace = await getWorkspaceData();

  if (!workspace) {
    return null;
  }

  const { courseKey } = await params;
  const detail = getCourseDetail(workspace, courseKey);

  if (!detail) {
    notFound();
  }

  const actionItemMap = new Map(
    getWorkspaceActionItems(workspace).map((item) => [item.itemKey, item]),
  );

  return (
    <div className="space-y-6">
      <section className="app-card rounded-[1.75rem] p-6 sm:p-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="app-label">Course workspace</p>
            <h1 className="mt-3 text-4xl">{detail.catalog.courseName}</h1>
            <p className="mt-4 max-w-3xl app-copy">
              This is the deeper class view behind the simpler student dashboard. Use it when you want everything Canvascope knows about one course in one place.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="app-card-soft rounded-[1.25rem] p-4">
              <p className="app-label">Teachers</p>
              <p className="mt-3 text-sm text-[var(--color-shell-copy)]">
                {detail.catalog.teacherNames.join(", ") || "No teacher summaries stored"}
              </p>
            </div>
            <div className="app-card-soft rounded-[1.25rem] p-4">
              <p className="app-label">Last sync</p>
              <p className="mt-3 text-sm text-[var(--color-shell-copy)]">
                {formatDateLabel(detail.snapshot?.scannedAt ?? detail.catalog.scannedAt)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <article className="app-card rounded-[1.5rem] p-5">
          <p className="app-label">Due items</p>
          <p className="metric-value mt-4">{formatCompactNumber(detail.dueItems.length)}</p>
        </article>
        <article className="app-card rounded-[1.5rem] p-5">
          <p className="app-label">Indexed objects</p>
          <p className="metric-value mt-4">{formatCompactNumber(detail.indexedItems.length)}</p>
        </article>
        <article className="app-card rounded-[1.5rem] p-5">
          <p className="app-label">Documents</p>
          <p className="metric-value mt-4">{formatCompactNumber(detail.documents.length)}</p>
        </article>
        <article className="app-card rounded-[1.5rem] p-5">
          <p className="app-label">Course Brain artifacts</p>
          <p className="metric-value mt-4">{formatCompactNumber(detail.artifacts.length)}</p>
        </article>
      </section>

      <section className="app-card rounded-[1.75rem] p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="app-label">Due work</p>
            <h2 className="mt-2 text-2xl">Triage the next assignments and deadlines</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/app" className="font-semibold text-white underline underline-offset-4">
              Back to home
            </Link>
            <Link href="/app/course-brain" className="font-semibold text-white underline underline-offset-4">
              Open Course Brain
            </Link>
          </div>
        </div>

        <div className="mt-4">
          <Link href="/app/assignments" className="font-semibold text-[var(--color-shell-copy)] underline underline-offset-4">
            See all assignments across courses
          </Link>
        </div>

        {detail.dueItems.length === 0 ? (
          <div className="empty-panel mt-6">
            <p className="text-lg font-semibold">No due items currently surfaced</p>
            <p className="mt-2 app-copy">
              The course is synced, but there are no due-dated items in the current snapshot.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {detail.dueItems.map((item) => (
              <WorkspaceActionCard
                key={item.itemKey}
                item={item}
                redirectTo={`/app/courses/${detail.catalog.courseKey}`}
                actionsEnabled={workspace.workflowAvailable}
              />
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="app-card rounded-[1.75rem] p-6">
          <p className="app-label">Indexed resources</p>
          <h2 className="mt-2 text-2xl">Everything the latest snapshot exposed</h2>

          {detail.indexedItems.length === 0 ? (
            <div className="empty-panel mt-6">
              <p className="text-lg font-semibold">No indexed resources yet</p>
              <p className="mt-2 app-copy">
                This course has catalog coverage, but there are no indexed learning objects available.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {detail.indexedItems.slice(0, 12).map((item) => (
                <article key={item.id} className="app-card-soft rounded-[1.25rem] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-[var(--color-shell-copy-muted)]">
                        {[item.type, item.moduleName].filter(Boolean).join(" · ") || "Resource"}
                      </p>
                    </div>
                    <span className="status-chip" data-tone={item.dueAt ? "warn" : "muted"}>
                      {item.dueAt ? `Due ${formatDateTimeLabel(item.dueAt)}` : item.type}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-2 !text-sm !text-white"
                      >
                        Open source
                      </a>
                    ) : (
                      <span className="button-secondary !cursor-not-allowed !border-white/10 !bg-white/3 !px-4 !py-2 !text-sm !text-[var(--color-shell-copy-muted)]">
                        No source link
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </article>

        <div className="space-y-6">
          <article className="app-card rounded-[1.75rem] p-6">
            <p className="app-label">Linked documents</p>
            <h2 className="mt-2 text-2xl">PDF handoff context from Lectra</h2>

            {detail.documents.length === 0 ? (
              <div className="empty-panel mt-6">
                <p className="text-lg font-semibold">No course documents yet</p>
                <p className="mt-2 app-copy">
                  Documents will appear here once a PDF is handed off into Lectra for this course.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                {detail.documents.map((document) => (
                  <article key={document.id} className="app-card-soft rounded-[1.25rem] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{document.title}</p>
                        <p className="mt-1 text-sm text-[var(--color-shell-copy-muted)]">
                          Updated {formatDateTimeLabel(document.updatedAt)}
                        </p>
                      </div>
                      <span className="status-chip" data-tone={document.status === "annotated" ? "good" : "warn"}>
                        {document.status.replaceAll("_", " ")}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link href={`/app/documents/${document.id}`} className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-2 !text-sm !text-white">
                        Open document
                      </Link>
                      {document.sourceUrl ? (
                        <a
                          href={document.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-2 !text-sm !text-white"
                        >
                          Open source URL
                        </a>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </article>

          <article className="app-card rounded-[1.75rem] p-6">
            <p className="app-label">Course Brain</p>
            <h2 className="mt-2 text-2xl">Related artifacts already stored</h2>

            {detail.artifacts.length === 0 ? (
              <div className="empty-panel mt-6">
                <p className="text-lg font-semibold">No Course Brain artifacts for this course</p>
                <p className="mt-2 app-copy">
                  Artifacts appear here once this course gains more connected study context.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {detail.artifacts.map((artifact) => {
                  const actionItem = actionItemMap.get(artifact.itemKey);

                  if (!actionItem) {
                    return (
                      <article key={artifact.id} className="app-card-soft rounded-[1.25rem] p-4">
                        <p className="font-semibold text-white">{artifact.title}</p>
                        <p className="mt-2 app-copy">{artifact.detail}</p>
                      </article>
                    );
                  }

                  return (
                    <WorkspaceActionCard
                      key={artifact.id}
                      item={actionItem}
                      redirectTo={`/app/courses/${detail.catalog.courseKey}`}
                      actionsEnabled={workspace.workflowAvailable}
                    />
                  );
                })}
              </div>
            )}
          </article>
        </div>
      </section>
    </div>
  );
}
