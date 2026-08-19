"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { ActivitySnapshot, ActivityWindows } from "@/lib/data/activity";
import { ACTIVITY_PRODUCTS } from "@/lib/data/activity";

const REFRESH_MS = 30 * 1000;

const WINDOWS: { key: keyof ActivityWindows; label: string; hint: string }[] = [
  { key: "hourly", label: "This hour", hint: "Active since the top of the hour" },
  { key: "daily", label: "Daily", hint: "Active in the last 24 hours" },
  { key: "weekly", label: "Weekly", hint: "Active in the last 7 days" },
  { key: "biweekly", label: "Biweekly", hint: "Active in the last 14 days" },
  { key: "monthly", label: "Monthly", hint: "Active in the last 30 days" },
  { key: "yearly", label: "Yearly", hint: "Active in the last 365 days" },
];

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return iso;
  }
}

/** Daily totals across all products, oldest first, for the sparkline. */
function useDailySeries(snapshot: ActivitySnapshot) {
  return useMemo(() => {
    const byBucket = new Map<string, number>();
    for (const point of snapshot.series) {
      // Summing per-product counts double-counts anyone using two products in
      // the same day. Accepted here: this is a shape-of-the-trend sparkline,
      // and the tiles above it carry the exact deduplicated numbers.
      byBucket.set(point.bucket, (byBucket.get(point.bucket) ?? 0) + point.actives);
    }
    return [...byBucket.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([bucket, actives]) => ({ bucket, actives }));
  }, [snapshot.series]);
}

function Sparkline({ points }: { points: { bucket: string; actives: number }[] }) {
  if (points.length < 2) {
    return (
      <p className="text-sm text-[var(--color-shell-copy-muted)]">
        Not enough history yet — the chart fills in as days accumulate.
      </p>
    );
  }

  const width = 720;
  const height = 120;
  const max = Math.max(...points.map((p) => p.actives), 1);
  const step = width / (points.length - 1);

  const line = points
    .map((p, i) => `${i * step},${height - (p.actives / max) * (height - 8) - 4}`)
    .join(" ");

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={`Daily active users over the last ${points.length} days, peak ${max}`}
        className="h-[120px] w-full min-w-[420px]"
      >
        <polyline
          points={`0,${height} ${line} ${width},${height}`}
          fill="rgba(255,255,255,0.06)"
          stroke="none"
        />
        <polyline
          points={line}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="mt-2 flex justify-between text-xs text-[var(--color-shell-copy-muted)]">
        <span>{points[0].bucket.slice(0, 10)}</span>
        <span>peak {max}</span>
        <span>{points[points.length - 1].bucket.slice(0, 10)}</span>
      </div>
    </div>
  );
}

export default function ActivityDashboard({
  initialSnapshot,
}: {
  initialSnapshot: ActivitySnapshot;
}) {
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [isStale, setIsStale] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/metrics", { cache: "no-store" });
      if (!response.ok) {
        setIsStale(true);
        return;
      }
      setSnapshot((await response.json()) as ActivitySnapshot);
      setIsStale(false);
    } catch {
      // Offline or navigating away. Keep showing the last good numbers and
      // mark them stale rather than blanking the page.
      setIsStale(true);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(refresh, REFRESH_MS);
    return () => clearInterval(timer);
  }, [refresh]);

  const daily = useDailySeries(snapshot);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="app-label">Internal</p>
          <h1 className="mt-2 text-3xl">Activity</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--color-shell-copy-muted)]">
            People who actually used a Scope product, signed in or not. Counted
            per install; someone signed in on two devices counts once, someone
            anonymous on two devices counts twice.
          </p>
        </div>
        <p className="text-sm text-[var(--color-shell-copy-muted)]">
          {isStale ? "Reconnecting… " : ""}
          Updated {formatTime(snapshot.generatedAt)}
        </p>
      </header>

      {snapshot.error ? (
        <section className="app-card rounded-[1.75rem] p-6">
          <p className="app-label">Not available</p>
          <p className="mt-3 text-sm leading-7">{snapshot.error}</p>
        </section>
      ) : null}

      <section className="app-card rounded-[1.75rem] p-6 sm:p-7">
        <div className="flex items-baseline gap-3">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400"
            aria-hidden
          />
          <p className="app-label">Live now</p>
        </div>
        <p className="mt-3 text-5xl tabular-nums">{snapshot.total.live}</p>
        <p className="mt-2 text-sm text-[var(--color-shell-copy-muted)]">
          Active in the last 10 minutes, across every product.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {WINDOWS.map((window) => (
            <article key={window.key} className="app-card-soft rounded-[1.25rem] p-4">
              <p className="app-label">{window.label}</p>
              <p className="mt-2 text-2xl tabular-nums">{snapshot.total[window.key]}</p>
              <p className="mt-1 text-xs leading-5 text-[var(--color-shell-copy-muted)]">
                {window.hint}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-5 text-sm text-[var(--color-shell-copy-muted)]">
          {snapshot.total.installs} installs all time · {snapshot.total.new_today} new
          today · {snapshot.total.all_time} have ever been active
        </p>
      </section>

      <section className="app-card rounded-[1.75rem] p-6 sm:p-7">
        <p className="app-label">Daily actives, last 30 days</p>
        <div className="mt-4 text-[var(--color-shell-copy)]">
          <Sparkline points={daily} />
        </div>
      </section>

      <section className="app-card rounded-[1.75rem] p-6 sm:p-7">
        <p className="app-label">By product</p>

        {snapshot.products.length === 0 ? (
          <p className="mt-4 text-sm text-[var(--color-shell-copy-muted)]">
            No activity recorded yet.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="text-left text-[var(--color-shell-copy-muted)]">
                  <th className="pb-3 font-normal">Product</th>
                  <th className="pb-3 text-right font-normal">Live</th>
                  {WINDOWS.map((window) => (
                    <th key={window.key} className="pb-3 text-right font-normal">
                      {window.label}
                    </th>
                  ))}
                  <th className="pb-3 text-right font-normal">Installs</th>
                </tr>
              </thead>
              <tbody>
                {snapshot.products.map((row) => {
                  const meta = ACTIVITY_PRODUCTS[row.product];
                  return (
                    <tr
                      key={row.product}
                      className="border-t border-[var(--color-shell-line)]"
                    >
                      <td className="py-3 pr-4">
                        <span>{meta?.label ?? row.product}</span>
                        {meta?.note ? (
                          <span className="mt-1 block text-xs leading-5 text-[var(--color-shell-copy-muted)]">
                            {meta.note}
                          </span>
                        ) : null}
                      </td>
                      <td className="py-3 text-right tabular-nums">{row.live}</td>
                      {WINDOWS.map((window) => (
                        <td key={window.key} className="py-3 text-right tabular-nums">
                          {row[window.key]}
                        </td>
                      ))}
                      <td className="py-3 text-right tabular-nums">{row.installs}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-5 text-xs leading-6 text-[var(--color-shell-copy-muted)]">
          Products measure different things and should not be summed. The
          extension, Lectra on iPad, the Receiver, and Polya count real
          interaction. Lectra for Mac counts hosts online, because a background
          receiver has no interaction to count.
        </p>
      </section>
    </div>
  );
}
