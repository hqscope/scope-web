import type { Metadata } from "next";
import Link from "next/link";

import WorkspaceActionCard from "@/components/app/WorkspaceActionCard";
import { WorkspaceActionItem, WorkspaceSection } from "@/lib/data/models";
import { getWorkspaceData, getWorkspaceQueues } from "@/lib/data/workspace";
import { formatCompactNumber } from "@/lib/ui/format";
import { getWorkspacePreferences } from "@/lib/workspace/preferences";

type AssignmentSearchParams = Promise<Record<string, string | string[] | undefined>>;

export const metadata: Metadata = {
  title: "Assignments",
};

function getSingleValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseSection(value: string | undefined, fallback: WorkspaceSection): WorkspaceSection {
  if (
    value === "overdue" ||
    value === "today" ||
    value === "week" ||
    value === "pinned"
  ) {
    return value;
  }

  return fallback;
}

function parseShowMode(value: string | undefined, hideCompleted: boolean) {
  if (value === "active" || value === "completed" || value === "all") {
    return value;
  }

  return hideCompleted ? "active" : "all";
}

function sectionLabel(section: WorkspaceSection): string {
  if (section === "overdue") {
    return "Overdue";
  }

  if (section === "today") {
    return "Today";
  }

  if (section === "week") {
    return "This week";
  }

  return "Pinned";
}

function matchesQuery(item: WorkspaceActionItem, query: string): boolean {
  if (!query) {
    return true;
  }

  const haystack = [
    item.title,
    item.detail,
    item.courseName,
    item.moduleName,
    item.sourceStatus,
    item.state?.note,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

function filterItemsForMode(
  items: WorkspaceActionItem[],
  showMode: "active" | "completed" | "all",
  showSnoozed: boolean,
  query: string,
): WorkspaceActionItem[] {
  return items.filter((item) => {
    const status = item.state?.status ?? "open";

    if (showMode === "completed" && status !== "done") {
      return false;
    }

    if (showMode === "active" && status === "done") {
      return false;
    }

    if (!showSnoozed && status === "snoozed") {
      return false;
    }

    return matchesQuery(item, query);
  });
}

function hrefForSection(
  section: WorkspaceSection,
  showMode: "active" | "completed" | "all",
  query: string,
): string {
  const params = new URLSearchParams();
  params.set("section", section);
  params.set("show", showMode);
  if (query) {
    params.set("q", query);
  }
  return `/app/assignments?${params.toString()}`;
}

function orderedSections(selected: WorkspaceSection): WorkspaceSection[] {
  const sections: WorkspaceSection[] = ["overdue", "today", "week", "pinned"];
  return [selected, ...sections.filter((section) => section !== selected)];
}

function onlyAssignments(items: WorkspaceActionItem[]): WorkspaceActionItem[] {
  return items.filter((item) => item.itemType === "upcoming_work");
}

export default async function AppAssignmentsPage({
  searchParams,
}: {
  searchParams: AssignmentSearchParams;
}) {
  const workspace = await getWorkspaceData();

  if (!workspace) {
    return null;
  }

  const prefs = await getWorkspacePreferences();
  const params = await searchParams;
  const rawQuery = (getSingleValue(params.q) ?? "").trim();
  const query = rawQuery.toLowerCase();
  const selectedSection = parseSection(
    getSingleValue(params.section),
    prefs.defaultSection,
  );
  const showMode = parseShowMode(getSingleValue(params.show), prefs.hideCompleted);
  const allQueues = getWorkspaceQueues(workspace, {
    showCompleted: true,
    showSnoozed: true,
  });
  const queues = {
    overdue: onlyAssignments(allQueues.overdue),
    today: onlyAssignments(allQueues.today),
    week: onlyAssignments(allQueues.week),
    pinned: onlyAssignments(allQueues.pinned),
  };

  return (
    <div className="space-y-6">
      <section className="app-card rounded-[1.75rem] p-6 sm:p-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="app-label">Assignments</p>
            <h1 className="mt-3 text-4xl">One place for due work, not the whole product map</h1>
            <p className="mt-4 max-w-3xl app-copy">
              Use this page when you want the full assignment queue with filters, notes, pinned items, and status controls. The home dashboard stays smaller on purpose.
            </p>
          </div>

          <form className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
            <input type="hidden" name="section" value={selectedSection} />
            <input type="hidden" name="show" value={showMode} />
            <input
              type="search"
              name="q"
              defaultValue={rawQuery}
              placeholder="Search assignments, modules, or courses"
              className="h-12 flex-1 rounded-full border border-white/10 bg-[rgba(8,10,14,0.48)] px-5 text-sm text-white outline-none placeholder:text-[var(--color-shell-copy-muted)]"
            />
            <button type="submit" className="button-primary whitespace-nowrap">
              Search assignments
            </button>
          </form>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.04)] px-5 py-4 text-sm text-[var(--color-shell-copy)]">
        Showing only assignments due within the last 7 days and the next month. Items already marked as <span className="font-semibold text-white">submitted</span> in synced backend data are hidden automatically.
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="app-card rounded-[1.5rem] p-5">
          <p className="app-label">Overdue</p>
          <p className="metric-value mt-4">{formatCompactNumber(queues.overdue.length)}</p>
        </article>
        <article className="app-card rounded-[1.5rem] p-5">
          <p className="app-label">Today</p>
          <p className="metric-value mt-4">{formatCompactNumber(queues.today.length)}</p>
        </article>
        <article className="app-card rounded-[1.5rem] p-5">
          <p className="app-label">This week</p>
          <p className="metric-value mt-4">{formatCompactNumber(queues.week.length)}</p>
        </article>
        <article className="app-card rounded-[1.5rem] p-5">
          <p className="app-label">Pinned</p>
          <p className="metric-value mt-4">{formatCompactNumber(queues.pinned.length)}</p>
        </article>
      </section>

      <section className="app-card rounded-[1.75rem] p-5">
        <div className="flex flex-wrap items-center gap-3">
          {orderedSections(selectedSection).map((section) => {
            const itemCount = filterItemsForMode(
              queues[section],
              showMode,
              prefs.showSnoozed,
              query,
            ).length;

            return (
              <Link
                key={section}
                href={hrefForSection(section, showMode, query)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold text-white ${
                  section === "overdue"
                    ? "border-[rgba(243,179,90,0.32)] bg-[rgba(243,179,90,0.12)]"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {sectionLabel(section)} · {itemCount}
              </Link>
            );
          })}

          <div className="ml-auto flex flex-wrap gap-2">
            {(["active", "completed", "all"] as const).map((mode) => {
              const search = new URLSearchParams();
              search.set("section", selectedSection);
              search.set("show", mode);
              if (query) {
                search.set("q", query);
              }

              return (
                <Link
                  key={mode}
                  href={`/app/assignments?${search.toString()}`}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white"
                >
                  {mode}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {orderedSections(selectedSection).map((section) => {
        const items = filterItemsForMode(
          queues[section],
          showMode,
          prefs.showSnoozed,
          query,
        );

        return (
          <section key={section} className="app-card rounded-[1.75rem] p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="app-label">{sectionLabel(section)}</p>
                <h2 className="mt-2 text-2xl">{sectionLabel(section)} assignments</h2>
              </div>
              <p className="text-sm text-[var(--color-shell-copy-muted)]">
                {items.length} visible items
              </p>
            </div>

            {items.length === 0 ? (
              <div className="empty-panel mt-6">
                <p className="text-lg font-semibold">Nothing surfaced here right now</p>
                <p className="mt-2 app-copy">
                  Try another section or change the search/filter mode.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <WorkspaceActionCard
                    key={item.itemKey}
                    item={item}
                    redirectTo={`/app/assignments?section=${section}&show=${showMode}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
                    actionsEnabled={workspace.workflowAvailable}
                  />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
