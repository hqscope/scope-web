import type { Metadata } from "next";
import Link from "next/link";

import LectraImportPanel from "@/components/app/LectraImportPanel";
import QuickLinksPanel from "@/components/app/QuickLinksPanel";
import StudentTaskPanel from "@/components/app/StudentTaskPanel";
import { WorkspaceActionItem } from "@/lib/data/models";
import { getWorkspaceData } from "@/lib/data/workspace";
import {
  formatDateTimeLabel,
  formatRelativeTime,
} from "@/lib/ui/format";

export const metadata: Metadata = {
  title: "Home",
};

function isExternalHref(href: string | null): href is string {
  return Boolean(href && (href.startsWith("http://") || href.startsWith("https://")));
}

function AssignmentAction({ item }: { item: WorkspaceActionItem }) {
  if (isExternalHref(item.href)) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-2 !text-sm !text-white"
      >
        Open assignment
      </a>
    );
  }

  if (item.href) {
    return (
      <Link
        href={item.href}
        className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-2 !text-sm !text-white"
      >
        Open context
      </Link>
    );
  }

  if (item.courseKey) {
    return (
      <Link
        href={`/app/courses/${item.courseKey}`}
        className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-2 !text-sm !text-white"
      >
        Open course
      </Link>
    );
  }

  return (
    <span className="button-secondary !cursor-not-allowed !border-white/10 !bg-white/3 !px-4 !py-2 !text-sm !text-[var(--color-shell-copy-muted)]">
      No link yet
    </span>
  );
}

export default async function AppPage() {
  const workspace = await getWorkspaceData();

  if (!workspace) {
    return null;
  }

  const assignments = workspace.dashboard.upcomingAssignmentsPreview;
  const pendingDocuments = workspace.dashboard.pendingDocumentsPreview;

  return (
    <div className="space-y-6">
      <section className="app-card rounded-[1.75rem] p-6 sm:p-7">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="app-label">Student workspace</p>
            <h1 className="mt-3 text-4xl">Drop files, open assignments, and keep your week understandable.</h1>
            <p className="mt-4 max-w-3xl app-copy">
              Canvascope keeps the home page focused on the next real student actions instead of every synced system detail at once.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#import-to-lectra" className="button-primary">
              Import files
            </a>
            <Link href="/app/assignments" className="button-secondary !border-white/10 !bg-white/5 !text-white">
              View all assignments
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--color-shell-copy)]">
            Latest sync {formatRelativeTime(workspace.dashboard.latestSyncAt)}
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--color-shell-copy)]">
            {workspace.dashboard.activeDueCount} active assignments
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--color-shell-copy)]">
            {workspace.dashboard.openStudentTaskCount} personal tasks
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--color-shell-copy)]">
            {workspace.dashboard.documentsAwaitingAnnotation} files waiting on review
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div id="import-to-lectra">
            <LectraImportPanel
              courses={workspace.courseCatalog.map((course) => ({
                courseId: course.courseId,
                courseKey: course.courseKey,
                courseName: course.courseName,
              }))}
            />
          </div>

          <StudentTaskPanel tasks={workspace.studentTasks} />
        </div>

        <div className="space-y-6">
          <section className="app-card rounded-[1.75rem] p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="app-label">Upcoming assignments</p>
                <h2 className="mt-2 text-2xl">Nearest due work from synced courses</h2>
              </div>
              <Link href="/app/assignments" className="font-semibold text-white underline underline-offset-4">
                View all
              </Link>
            </div>

            {assignments.length === 0 ? (
              <div className="empty-panel mt-6">
                <p className="text-lg font-semibold">No assignments are surfaced right now</p>
                <p className="mt-2 app-copy">
                  Once Canvascope syncs due-dated work, your next assignments will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                {assignments.map((item) => (
                  <article key={item.itemKey} className="app-card-soft rounded-[1.25rem] p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="mt-2 text-sm text-[var(--color-shell-copy-muted)]">
                          {[item.courseName, item.moduleName, item.sourceStatus].filter(Boolean).join(" · ")}
                        </p>
                        {item.dueAt ? (
                          <p className="mt-3 text-sm text-[var(--color-shell-copy)]">
                            Due {formatDateTimeLabel(item.dueAt)}
                          </p>
                        ) : null}
                      </div>
                      <span className="status-chip" data-tone="warn">
                        {item.state?.status?.replaceAll("_", " ") ?? "open"}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <AssignmentAction item={item} />
                      {item.courseKey ? (
                        <Link
                          href={`/app/courses/${item.courseKey}`}
                          className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-2 !text-sm !text-white"
                        >
                          Open course
                        </Link>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <QuickLinksPanel
            quickLinks={workspace.dashboard.quickLinks}
            studentQuickLinks={workspace.studentQuickLinks}
          />

          <section className="app-card rounded-[1.75rem] p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="app-label">Files waiting on review</p>
                <h2 className="mt-2 text-2xl">Recent PDFs that still need attention</h2>
              </div>
              <Link href="/app/documents" className="font-semibold text-white underline underline-offset-4">
                Open files
              </Link>
            </div>

            {pendingDocuments.length === 0 ? (
              <div className="empty-panel mt-6">
                <p className="text-lg font-semibold">No pending file review</p>
                <p className="mt-2 app-copy">
                  Imported PDFs and Lectra handoffs that still need review will show up here.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                {pendingDocuments.map((document) => (
                  <article key={document.id} className="app-card-soft rounded-[1.25rem] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{document.title}</p>
                        <p className="mt-2 text-sm text-[var(--color-shell-copy-muted)]">
                          {[document.courseName, document.status.replaceAll("_", " ")].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                      <span className="status-chip" data-tone="warn">
                        {document.status.replaceAll("_", " ")}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-[var(--color-shell-copy)]">
                      Updated {formatDateTimeLabel(document.updatedAt)}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link
                        href={`/app/documents/${document.id}`}
                        className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-2 !text-sm !text-white"
                      >
                        Open file
                      </Link>
                      {document.sourceUrl ? (
                        <a
                          href={document.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="button-secondary !border-white/10 !bg-white/5 !px-4 !py-2 !text-sm !text-white"
                        >
                          Open source
                        </a>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
