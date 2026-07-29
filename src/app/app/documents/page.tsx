import type { Metadata } from "next";
import WorkspaceActionCard from "@/components/app/WorkspaceActionCard";
import { getWorkspaceActionItems, getWorkspaceData } from "@/lib/data/workspace";
import { formatCompactNumber } from "@/lib/ui/format";

type DocumentsSearchParams = Promise<Record<string, string | string[] | undefined>>;

export const metadata: Metadata = {
  title: "Files",
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

export default async function AppDocumentsPage({
  searchParams,
}: {
  searchParams: DocumentsSearchParams;
}) {
  const workspace = await getWorkspaceData();

  if (!workspace) {
    return null;
  }

  const params = await searchParams;
  const query = (getSingleValue(params.q) ?? "").trim().toLowerCase();
  const course = getSingleValue(params.course) ?? "";
  const status = getSingleValue(params.status) ?? "all";
  const actionItems = new Map(
    getWorkspaceActionItems(workspace).map((item) => [item.itemKey, item]),
  );

  const filteredDocuments = workspace.documents.filter((document) => {
    if (course && document.courseKey !== course) {
      return false;
    }

    if (status === "annotated" && document.status !== "annotated") {
      return false;
    }

    if (status === "pending" && document.status === "annotated") {
      return false;
    }

    return matchesQuery(
      [document.title, document.courseName, document.status, document.syncStatus],
      query,
    );
  });

  return (
    <div className="space-y-6">
      <section className="app-card rounded-[1.75rem] p-6 sm:p-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="app-label">Files</p>
            <h1 className="mt-3 text-4xl">Imported files and Lectra review status</h1>
            <p className="mt-4 max-w-3xl app-copy">
              This page is the full file list behind the smaller home dashboard preview. Use it when you need to open a PDF, jump back to the source page, or work through review status in bulk.
            </p>
          </div>

          <form className="grid w-full max-w-3xl gap-3 md:grid-cols-[1fr_12rem_12rem_auto]">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search files or courses"
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
            <select
              name="status"
              defaultValue={status}
              className="h-12 rounded-full border border-white/10 bg-[rgba(8,10,14,0.48)] px-5 text-sm text-white outline-none"
            >
              <option value="all">All statuses</option>
              <option value="annotated">Annotated</option>
              <option value="pending">Pending</option>
            </select>
            <button type="submit" className="button-primary whitespace-nowrap">
              Filter files
            </button>
          </form>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="app-card rounded-[1.5rem] p-5">
          <p className="app-label">Total docs</p>
          <p className="metric-value mt-4">{formatCompactNumber(workspace.documents.length)}</p>
        </article>
        <article className="app-card rounded-[1.5rem] p-5">
          <p className="app-label">Annotated</p>
          <p className="metric-value mt-4">
            {formatCompactNumber(
              workspace.documents.filter((document) => document.status === "annotated").length,
            )}
          </p>
        </article>
        <article className="app-card rounded-[1.5rem] p-5">
          <p className="app-label">Pending</p>
          <p className="metric-value mt-4">
            {formatCompactNumber(
              workspace.documents.filter((document) => document.status !== "annotated").length,
            )}
          </p>
        </article>
      </section>

      <section className="app-card rounded-[1.75rem] p-6">
        {filteredDocuments.length === 0 ? (
          <div className="empty-panel">
            <p className="text-lg font-semibold">No documents match this inbox view</p>
            <p className="mt-2 app-copy">
              Change the filters or wait for documents to appear after they are sent from Canvascope to Lectra.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDocuments.map((document) => {
              const actionItem = actionItems.get(document.itemKey);

              if (!actionItem) {
                return null;
              }

              return (
                <WorkspaceActionCard
                  key={document.id}
                  item={actionItem}
                  redirectTo={`/app/documents?${new URLSearchParams({
                    ...(query ? { q: query } : {}),
                    ...(course ? { course } : {}),
                    ...(status ? { status } : {}),
                  }).toString()}`}
                  actionsEnabled={workspace.workflowAvailable}
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
