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
      <p className="admin-muted" style={{ marginTop: 12 }}>
        Not enough history yet. The chart fills in as days accumulate.
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
    <div className="admin-spark">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={`Daily active users over the last ${points.length} days, peak ${max}`}
      >
        <polyline
          points={`0,${height} ${line} ${width},${height}`}
          fill="rgba(196,43,38,0.08)"
          stroke="none"
        />
        <polyline
          points={line}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="admin-spark-axis admin-muted">
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
    <div className="admin">
      <header className="admin-head">
        <div>
          <p className="admin-label">Internal</p>
          <h1>Activity</h1>
          <p className="copy">
            People who actually used a Scope product, signed in or not. Counted per
            install, so someone signed in on two devices counts once, and someone
            anonymous on two devices counts twice.
          </p>
        </div>
        <p className="admin-muted">
          {isStale ? <span className="admin-stale">Reconnecting. </span> : null}
          Updated {formatTime(snapshot.generatedAt)}
        </p>
      </header>

      {snapshot.error ? (
        <section className="plane admin-panel admin-error">
          <p className="admin-label">Not available</p>
          <p style={{ marginTop: 10 }}>{snapshot.error}</p>
        </section>
      ) : null}

      <section className="plane admin-panel">
        <div className="admin-live">
          <span className="admin-live-dot" aria-hidden />
          <p className="admin-label">Live now</p>
        </div>
        <p className="admin-big">{snapshot.total.live}</p>
        <p className="admin-muted" style={{ marginTop: 8 }}>
          Active in the last 10 minutes, across every product.
        </p>

        <div className="admin-windows">
          {WINDOWS.map((window) => (
            <article key={window.key} className="admin-window">
              <p className="admin-label">{window.label}</p>
              <p className="admin-window-value">{snapshot.total[window.key]}</p>
              <p className="admin-muted">{window.hint}</p>
            </article>
          ))}
        </div>

        <p className="admin-muted admin-foot">
          {snapshot.total.installs} installs all time, {snapshot.total.new_today} new
          today, and {snapshot.total.all_time} have ever been active.
        </p>
      </section>

      <section className="plane admin-panel">
        <p className="admin-label">Daily actives, last 30 days</p>
        <Sparkline points={daily} />
      </section>

      <section className="plane admin-panel">
        <p className="admin-label">By product</p>

        {snapshot.products.length === 0 ? (
          <p className="admin-muted" style={{ marginTop: 12 }}>
            No activity recorded yet.
          </p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Live</th>
                  {WINDOWS.map((window) => (
                    <th key={window.key}>{window.label}</th>
                  ))}
                  <th>Installs</th>
                </tr>
              </thead>
              <tbody>
                {snapshot.products.map((row) => {
                  const meta = ACTIVITY_PRODUCTS[row.product];
                  return (
                    <tr key={row.product}>
                      <td>
                        <span>{meta?.label ?? row.product}</span>
                        {meta?.note ? (
                          <span className="admin-muted">{meta.note}</span>
                        ) : null}
                      </td>
                      <td>{row.live}</td>
                      {WINDOWS.map((window) => (
                        <td key={window.key}>{row[window.key]}</td>
                      ))}
                      <td>{row.installs}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <p className="admin-muted admin-foot">
          Products measure different things and should not be summed. The extension,
          Lectra on iPad, the Receiver, and Polya count real interaction. Lectra for Mac
          counts hosts online, because a background receiver has no interaction to count.
        </p>
      </section>
    </div>
  );
}
