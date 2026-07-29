import Link from "next/link";
import { notFound } from "next/navigation";

import WorkspaceActionCard from "@/components/app/WorkspaceActionCard";
import {
  getDocumentDetail,
  getWorkspaceActionItems,
  getWorkspaceData,
} from "@/lib/data/workspace";
import { formatDateTimeLabel } from "@/lib/ui/format";

export default async function AppDocumentDetailPage({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const workspace = await getWorkspaceData();

  if (!workspace) {
    return null;
  }

  const { documentId } = await params;
  const detail = getDocumentDetail(workspace, documentId);

  if (!detail) {
    notFound();
  }

  const actionItem = getWorkspaceActionItems(workspace).find(
    (item) => item.itemKey === detail.document.itemKey,
  );

  return (
    <div className="space-y-6">
      <section className="app-card rounded-[1.75rem] p-6 sm:p-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="app-label">Document detail</p>
            <h1 className="mt-3 text-4xl">{detail.document.title}</h1>
            <p className="mt-4 max-w-3xl app-copy">
              This is the full file view behind the smaller dashboard preview. Use it when you need the actual PDF, the source page, and the surrounding course context together.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="app-card-soft rounded-[1.25rem] p-4">
              <p className="app-label">Course</p>
              <p className="mt-3 text-sm text-[var(--color-shell-copy)]">
                {detail.document.courseName ?? "Unscoped document"}
              </p>
            </div>
            <div className="app-card-soft rounded-[1.25rem] p-4">
              <p className="app-label">Updated</p>
              <p className="mt-3 text-sm text-[var(--color-shell-copy)]">
                {formatDateTimeLabel(detail.document.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="app-card rounded-[1.75rem] p-6">
          <p className="app-label">Access</p>
          <h2 className="mt-2 text-2xl">Open the actual files and source context</h2>

          <div className="mt-6 grid gap-4">
            <div className="app-card-soft rounded-[1.25rem] p-4">
              <p className="app-label">Original file</p>
              <p className="mt-3 text-sm text-[var(--color-shell-copy)]">
                {detail.document.storagePath
                  ? "The original file is available to open."
                  : "No original file is available yet."}
              </p>
              <div className="mt-4">
                {detail.document.storagePath ? (
                  <Link
                    href={`/api/workspace/documents/${detail.document.id}/file?variant=original`}
                    className="button-secondary !border-white/10 !bg-white/5 !text-white"
                  >
                    Open original file
                  </Link>
                ) : (
                  <span className="button-secondary !cursor-not-allowed !border-white/10 !bg-white/3 !text-[var(--color-shell-copy-muted)]">
                    Original file unavailable
                  </span>
                )}
              </div>
            </div>

            <div className="app-card-soft rounded-[1.25rem] p-4">
              <p className="app-label">Annotated file</p>
              <p className="mt-3 text-sm text-[var(--color-shell-copy)]">
                {detail.document.annotatedStoragePath
                  ? "The annotated file is available to open."
                  : "No annotated upload is available yet."}
              </p>
              <div className="mt-4">
                {detail.document.annotatedStoragePath ? (
                  <Link
                    href={`/api/workspace/documents/${detail.document.id}/file?variant=annotated`}
                    className="button-secondary !border-white/10 !bg-white/5 !text-white"
                  >
                    Open annotated file
                  </Link>
                ) : (
                  <span className="button-secondary !cursor-not-allowed !border-white/10 !bg-white/3 !text-[var(--color-shell-copy-muted)]">
                    Annotated file unavailable
                  </span>
                )}
              </div>
            </div>

            <div className="app-card-soft rounded-[1.25rem] p-4">
              <p className="app-label">Source page</p>
              <p className="mt-3 text-sm text-[var(--color-shell-copy)]">
                {detail.document.sourceUrl ?? "No source URL stored"}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {detail.document.sourceUrl ? (
                  <a
                    href={detail.document.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="button-secondary !border-white/10 !bg-white/5 !text-white"
                  >
                    Open source page
                  </a>
                ) : null}
                {detail.document.courseKey ? (
                  <Link href={`/app/courses/${detail.document.courseKey}`} className="button-secondary !border-white/10 !bg-white/5 !text-white">
                    Open course
                  </Link>
                ) : null}
                <Link href="/app" className="button-secondary !border-white/10 !bg-white/5 !text-white">
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        </article>

        <article className="app-card rounded-[1.75rem] p-6">
          <p className="app-label">Workflow</p>
          <h2 className="mt-2 text-2xl">Keep the document in your active workspace</h2>
          {actionItem ? (
            <div className="mt-6">
              <WorkspaceActionCard
                item={actionItem}
                redirectTo={`/app/documents/${detail.document.id}`}
                actionsEnabled={workspace.workflowAvailable}
              />
            </div>
          ) : (
            <div className="empty-panel mt-6">
              <p className="text-lg font-semibold">No workflow overlay yet</p>
              <p className="mt-2 app-copy">
                This document exists in source data, but its workflow state hasn’t been initialized.
              </p>
            </div>
          )}
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="app-card rounded-[1.75rem] p-6">
          <p className="app-label">Related work</p>
          <h2 className="mt-2 text-2xl">Assignments and deadlines from the same course</h2>
          {detail.relatedWork.length === 0 ? (
            <div className="empty-panel mt-6">
              <p className="text-lg font-semibold">No related due work found</p>
              <p className="mt-2 app-copy">
                This document is not currently tied to a visible due item in the latest snapshot.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {detail.relatedWork.map((item) => (
                <WorkspaceActionCard
                  key={item.itemKey}
                  item={item}
                  redirectTo={`/app/documents/${detail.document.id}`}
                  actionsEnabled={workspace.workflowAvailable}
                />
              ))}
            </div>
          )}
        </article>

        <article className="app-card rounded-[1.75rem] p-6">
          <p className="app-label">Course Brain context</p>
          <h2 className="mt-2 text-2xl">Artifacts from the same course</h2>
          {detail.relatedArtifacts.length === 0 ? (
            <div className="empty-panel mt-6">
              <p className="text-lg font-semibold">No related artifacts</p>
              <p className="mt-2 app-copy">
                Course Brain hasn’t produced visible artifacts for this course yet.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {detail.relatedArtifacts.map((artifact) => (
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
                </article>
              ))}
            </div>
          )}
        </article>
      </section>
    </div>
  );
}
