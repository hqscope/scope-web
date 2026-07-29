import type { Metadata } from "next";
import Link from "next/link";

import { getWorkspaceData } from "@/lib/data/workspace";
import {
  formatCompactNumber,
  formatDateTimeLabel,
  formatRelativeTime,
} from "@/lib/ui/format";

export const metadata: Metadata = {
  title: "Integrations",
};

function humanizeItemType(value: string): string {
  const map: Record<string, string> = {
    pdf: "PDFs",
    page: "Pages",
    assignment: "Assignments",
    file: "Files",
    slides: "Slides",
    document: "Documents",
    video: "Videos",
    externalurl: "External links",
    discussion: "Discussions",
    canvascope_course_snapshot_v1: "Course snapshots",
  };

  return map[value] ?? value.replaceAll("_", " ");
}

export default async function AppIntegrationsPage() {
  const workspace = await getWorkspaceData();

  if (!workspace) {
    return null;
  }

  const rowCountByType = new Map<string, number>();
  workspace.rows.forEach((row) => {
    rowCountByType.set(row.item_type, (rowCountByType.get(row.item_type) ?? 0) + 1);
  });

  return (
    <div className="space-y-6">
      <section className="app-card rounded-[1.75rem] p-6 sm:p-7">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="app-label">Integrations</p>
            <h1 className="mt-3 text-4xl">Operational health for Scope, Lectra, and connected sources</h1>
            <p className="mt-4 max-w-3xl app-copy">
              The workspace treats integrations as infrastructure. This page shows
              whether data is flowing, how much is present, and which path to use when a user needs to reconnect.
            </p>
          </div>
          <div className="app-card-soft rounded-[1.25rem] p-4">
            <p className="app-label">Latest global sync</p>
            <p className="mt-3 text-lg font-semibold text-white">
              {formatRelativeTime(workspace.latestSyncAt)}
            </p>
            <p className="mt-2 text-sm text-[var(--color-shell-copy-muted)]">
              {formatDateTimeLabel(workspace.latestSyncAt)}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {workspace.integrations.map((integration) => (
          <article key={integration.id} className="app-card rounded-[1.75rem] p-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-2xl font-semibold text-white">{integration.name}</p>
              <span
                className="status-chip"
                data-tone={
                  integration.status === "connected"
                    ? "good"
                    : integration.status === "planned"
                      ? "muted"
                      : "warn"
                }
              >
                {integration.status}
              </span>
            </div>
            <p className="mt-4 text-lg leading-7 text-white">{integration.headline}</p>
            <p className="mt-4 app-copy">{integration.description}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="app-card-soft rounded-[1.25rem] p-4">
                <p className="app-label">Rows</p>
                <p className="mt-3 text-2xl font-semibold text-white">{formatCompactNumber(integration.rowCount)}</p>
              </div>
              <div className="app-card-soft rounded-[1.25rem] p-4">
                <p className="app-label">Last seen</p>
                <p className="mt-3 text-sm text-[var(--color-shell-copy)]">
                  {formatDateTimeLabel(integration.lastSeenAt)}
                </p>
              </div>
            </div>

            {integration.recentItemTypes.length > 0 ? (
              <div className="mt-5">
                <p className="app-label">Recent item types</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {integration.recentItemTypes.map((itemType) => (
                    <span
                      key={itemType}
                      className="rounded-full bg-white/6 px-3 py-2 text-sm text-[var(--color-shell-copy)]"
                    >
                      {itemType}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <Link
              href={integration.actionHref}
              className="mt-6 inline-flex font-semibold text-white underline underline-offset-4"
            >
              {integration.actionLabel}
            </Link>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="app-card rounded-[1.75rem] p-6">
          <p className="app-label">Recent source activity</p>
          <h2 className="mt-2 text-2xl">What changed most recently</h2>
          <div className="mt-6 space-y-3">
            {workspace.dashboard.activity.slice(0, 5).map((event) => (
              <article key={event.id} className="app-card-soft rounded-[1.25rem] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{event.label}</p>
                    <p className="mt-2 app-copy">{event.detail}</p>
                  </div>
                  <span className="status-chip" data-tone="muted">
                    {event.source.replaceAll("_", " ")}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-[var(--color-shell-copy-muted)]">
                    {formatDateTimeLabel(event.updatedAt)}
                  </p>
                  {event.href ? (
                    <Link href={event.href} className="font-semibold text-white underline underline-offset-4">
                      Open context
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </article>

        <div className="space-y-6">
          <article className="app-card rounded-[1.75rem] p-6">
            <p className="app-label">Row coverage</p>
            <h2 className="mt-2 text-2xl">Counts by synced item type</h2>
            <div className="mt-6 space-y-3">
              {Array.from(rowCountByType.entries())
                .sort((left, right) => right[1] - left[1])
                .slice(0, 10)
                .map(([itemType, count]) => (
                  <div
                    key={itemType}
                    className="flex items-center justify-between rounded-[1.25rem] border border-white/8 bg-white/4 px-4 py-3 text-sm text-[var(--color-shell-copy)]"
                  >
                    <span className="font-mono text-xs text-[var(--color-shell-copy-muted)]">
                      {humanizeItemType(itemType)}
                    </span>
                    <span className="font-semibold text-white">{count}</span>
                  </div>
                ))}
            </div>
          </article>

          <article className="app-card rounded-[1.75rem] p-6">
            <p className="app-label">Reconnect and support</p>
            <h2 className="mt-2 text-2xl">Primary entry points</h2>
            <div className="mt-6 space-y-3">
              <Link href="/product/scope" className="button-secondary !border-white/10 !bg-white/5 !text-white">
                Review Scope install flow
              </Link>
              <Link href="/product/lectra" className="button-secondary !border-white/10 !bg-white/5 !text-white">
                Review Lectra workflow
              </Link>
              <details className="rounded-[1.25rem] border border-white/8 bg-white/4 p-4">
                <summary className="font-medium text-white">Developer routes</summary>
                <div className="mt-4 space-y-2 text-sm text-[var(--color-shell-copy)]">
                  <div className="font-mono">/api/auth/session</div>
                  <div className="font-mono">/api/auth/google/start</div>
                  <div className="font-mono">/api/integrations/lectra/bootstrap</div>
                </div>
                <p className="mt-4 text-sm text-[var(--color-shell-copy-muted)]">
                  Keep these for debugging and compatibility, not for the primary user journey.
                </p>
              </details>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
