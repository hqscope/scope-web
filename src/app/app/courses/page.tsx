import type { Metadata } from "next";
import Link from "next/link";

import { getWorkspaceData } from "@/lib/data/workspace";
import { formatCompactNumber, formatDateLabel } from "@/lib/ui/format";

type CoursesSearchParams = Promise<Record<string, string | string[] | undefined>>;

export const metadata: Metadata = {
  title: "Courses",
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

export default async function AppCoursesPage({
  searchParams,
}: {
  searchParams: CoursesSearchParams;
}) {
  const workspace = await getWorkspaceData();

  if (!workspace) {
    return null;
  }

  const params = await searchParams;
  const query = (getSingleValue(params.q) ?? "").trim().toLowerCase();
  const sort = getSingleValue(params.sort) ?? "name";

  const snapshotByCourseKey = new Map(
    workspace.courseSnapshots.map((snapshot) => [snapshot.courseKey, snapshot]),
  );
  const documentCountByCourseKey = new Map<string, number>();
  const artifactCountByCourseKey = new Map<string, number>();

  workspace.documents.forEach((document) => {
    if (!document.courseKey) {
      return;
    }
    documentCountByCourseKey.set(
      document.courseKey,
      (documentCountByCourseKey.get(document.courseKey) ?? 0) + 1,
    );
  });

  workspace.courseBrainArtifacts.forEach((artifact) => {
    if (!artifact.courseKey) {
      return;
    }
    artifactCountByCourseKey.set(
      artifact.courseKey,
      (artifactCountByCourseKey.get(artifact.courseKey) ?? 0) + 1,
    );
  });

  const filteredCourses = workspace.courseCatalog
    .filter((course) =>
      matchesQuery(
        [
          course.courseName,
          course.courseCode,
          course.termName,
          ...course.teacherNames,
        ],
        query,
      ),
    )
    .sort((left, right) => {
      const leftSnapshot = snapshotByCourseKey.get(left.courseKey);
      const rightSnapshot = snapshotByCourseKey.get(right.courseKey);

      if (sort === "updated") {
        return Date.parse(rightSnapshot?.scannedAt ?? "") - Date.parse(leftSnapshot?.scannedAt ?? "");
      }

      if (sort === "due") {
        return (rightSnapshot?.dueItemCount ?? 0) - (leftSnapshot?.dueItemCount ?? 0);
      }

      return left.courseName.localeCompare(right.courseName);
    });

  return (
    <div className="space-y-6">
      <section className="app-card rounded-[1.75rem] p-6 sm:p-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="app-label">Courses</p>
            <h1 className="mt-3 text-4xl">Course pages when you need the deeper class context</h1>
            <p className="mt-4 max-w-3xl app-copy">
              The student home stays lightweight. This page is where you go when you want the fuller per-course breakdown of due work, indexed resources, and linked files.
            </p>
          </div>

          <form className="flex w-full max-w-2xl flex-col gap-3 md:flex-row">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search by course, teacher, term, or code"
              className="h-12 flex-1 rounded-full border border-white/10 bg-[rgba(8,10,14,0.48)] px-5 text-sm text-white outline-none placeholder:text-[var(--color-shell-copy-muted)]"
            />
            <select
              name="sort"
              defaultValue={sort}
              className="h-12 rounded-full border border-white/10 bg-[rgba(8,10,14,0.48)] px-5 text-sm text-white outline-none"
            >
              <option value="name">Sort by name</option>
              <option value="due">Sort by due items</option>
              <option value="updated">Sort by latest sync</option>
            </select>
            <button type="submit" className="button-primary whitespace-nowrap">
              Filter courses
            </button>
          </form>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <article className="app-card rounded-[1.5rem] p-5">
          <p className="app-label">Catalog entries</p>
          <p className="metric-value mt-4">{formatCompactNumber(workspace.courseCatalog.length)}</p>
        </article>
        <article className="app-card rounded-[1.5rem] p-5">
          <p className="app-label">Snapshots</p>
          <p className="metric-value mt-4">{formatCompactNumber(workspace.courseSnapshots.length)}</p>
        </article>
        <article className="app-card rounded-[1.5rem] p-5">
          <p className="app-label">Indexed objects</p>
          <p className="metric-value mt-4">{formatCompactNumber(workspace.coverage.indexedLearningObjects)}</p>
        </article>
        <article className="app-card rounded-[1.5rem] p-5">
          <p className="app-label">Due items</p>
          <p className="metric-value mt-4">{formatCompactNumber(workspace.coverage.assignmentsWithDueDates)}</p>
        </article>
      </section>

      {filteredCourses.length === 0 ? (
        <section className="app-card rounded-[1.75rem] p-6">
          <div className="empty-panel">
            <p className="text-lg font-semibold">No courses match this view</p>
            <p className="mt-2 app-copy">
              Change the search query or wait for more course data to sync in.
            </p>
          </div>
        </section>
      ) : (
        <section className="grid gap-4 xl:grid-cols-2">
          {filteredCourses.map((course) => {
            const snapshot = snapshotByCourseKey.get(course.courseKey) ?? null;
            const documentCount = documentCountByCourseKey.get(course.courseKey) ?? 0;
            const artifactCount = artifactCountByCourseKey.get(course.courseKey) ?? 0;

            return (
              <article key={course.courseKey} className="app-card rounded-[1.75rem] p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-2xl font-semibold text-white">{course.courseName}</p>
                    <p className="mt-1 text-sm text-[var(--color-shell-copy-muted)]">
                      {[course.courseCode, course.termName].filter(Boolean).join(" · ") || "Catalog record"}
                    </p>
                  </div>
                  <span className="status-chip" data-tone={snapshot ? "good" : "warn"}>
                    {snapshot ? `${snapshot.dueItemCount} due items` : "Catalog only"}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="app-card-soft rounded-[1.25rem] p-4">
                    <p className="app-label">Teachers</p>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-shell-copy)]">
                      {course.teacherNames.length > 0
                        ? course.teacherNames.length > 4
                          ? `${course.teacherNames.slice(0, 4).join(", ")} and ${course.teacherNames.length - 4} more`
                          : course.teacherNames.join(", ")
                        : "No teacher summaries stored"}
                    </p>
                  </div>
                  <div className="app-card-soft rounded-[1.25rem] p-4">
                    <p className="app-label">Latest snapshot</p>
                    <p className="mt-3 text-sm text-[var(--color-shell-copy)]">
                      {formatDateLabel(snapshot?.scannedAt ?? course.scannedAt)}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[var(--color-shell-copy-muted)]">
                      {course.platform ?? "Unknown platform"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-4">
                  <div className="app-card-soft rounded-[1.25rem] p-4">
                    <p className="app-label">Modules</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{snapshot?.moduleCount ?? 0}</p>
                  </div>
                  <div className="app-card-soft rounded-[1.25rem] p-4">
                    <p className="app-label">Indexed</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{snapshot?.indexedItemCount ?? 0}</p>
                  </div>
                  <div className="app-card-soft rounded-[1.25rem] p-4">
                    <p className="app-label">Documents</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{documentCount}</p>
                  </div>
                  <div className="app-card-soft rounded-[1.25rem] p-4">
                    <p className="app-label">Artifacts</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{artifactCount}</p>
                  </div>
                </div>

                {snapshot?.moduleNames.length ? (
                  <div className="mt-5">
                    <p className="app-label">Module preview</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {snapshot.moduleNames.map((moduleName) => (
                        <span
                          key={moduleName}
                          className="rounded-full bg-white/6 px-3 py-2 text-sm text-[var(--color-shell-copy)]"
                        >
                          {moduleName}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/app/courses/${course.courseKey}`} className="button-primary">
                    Open course
                  </Link>
                  <Link href="/app/assignments" className="button-secondary !border-white/10 !bg-white/5 !text-white">
                    Open assignments
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}
