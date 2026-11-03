import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAdminUser } from "@/lib/auth/admin";
import { CAMPUS_LINKS, campusGoPath, findCampusLink } from "@/lib/campus-links";
import { getCampusLinkReport, type ScanDevice } from "@/lib/data/campusLinkScans";

export const metadata: Metadata = {
  title: "Campus links",
  robots: { index: false, follow: false },
};

// Live counts; never serve a cached copy.
export const dynamic = "force-dynamic";

const PRINTED_HOST = "canvascope.org";

const timeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const yearFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  year: "numeric",
});

function formatTime(iso: string): string {
  const date = new Date(iso);
  const sameYear = yearFormat.format(date) === yearFormat.format(new Date());
  return sameYear ? timeFormat.format(date) : `${timeFormat.format(date)}, ${yearFormat.format(date)}`;
}

const DEVICE_LABELS: Record<ScanDevice, string> = {
  ios: "iPhone",
  android: "Android",
  desktop: "Computer or iPad",
  other: "Other",
};

/**
 * Internal: how many times each campus QR link has been opened, and when.
 * Gated like the metrics endpoint: anyone not in SCOPE_ADMIN_USER_IDS gets a
 * 404, and the proxy sends signed-out visitors to /login first.
 */
export default async function CampusLinksAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ campus?: string | string[] }>;
}) {
  const admin = await getAdminUser();
  if (!admin) {
    notFound();
  }

  const requested = (await searchParams).campus;
  const selected = typeof requested === "string" ? findCampusLink(requested) : null;
  const report = await getCampusLinkReport(selected?.slug ?? null);

  const totalsBySlug = new Map(report.totals.map((row) => [row.campus, row]));
  const rows = CAMPUS_LINKS.map((campus) => ({
    campus,
    scans: totalsBySlug.get(campus.slug)?.scans ?? 0,
    lastScan: totalsBySlug.get(campus.slug)?.last_scan ?? null,
  }));
  const allScans = rows.reduce((sum, row) => sum + row.scans, 0);
  const nameBySlug = new Map(CAMPUS_LINKS.map((campus) => [campus.slug, campus.name]));

  return (
    <main className="mx-auto w-full max-w-[1000px] px-5 py-10 sm:px-8 sm:py-14">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="text-[15px] font-semibold text-ink">
          Scope
        </Link>
        <form action="/auth/signout" method="post">
          <button type="submit" className="text-[14px] font-medium text-stone hover:text-ink">
            Sign out
          </button>
        </form>
      </div>

      <h1 className="mt-10 text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
        Campus links
      </h1>
      <p className="mt-3 max-w-[60ch] text-[16px] leading-[1.55] text-stone">
        {allScans.toLocaleString("en-US")} scans across {CAMPUS_LINKS.length} campuses. A scan is
        one visit to a printed link. Link previews and crawlers aren&apos;t counted, but the same
        person opening a link twice counts twice. Times are Pacific.
      </p>

      {report.error && (
        <p role="alert" className="mt-6 rounded-[14px] bg-red-tint px-4 py-3 text-[14.5px] text-red-deep">
          Couldn&apos;t load scans: {report.error}
        </p>
      )}

      <div className="mt-8 overflow-x-auto rounded-[18px] ring-1 ring-line">
        <table className="w-full min-w-[560px] text-left text-[15px]">
          <thead className="bg-wash text-[13.5px] text-stone">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Campus</th>
              <th scope="col" className="px-4 py-3 font-medium">Link</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Scans</th>
              <th scope="col" className="px-4 py-3 font-medium">Last scan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map(({ campus, scans, lastScan }) => {
              const isSelected = selected?.slug === campus.slug;
              return (
                <tr key={campus.slug} className={isSelected ? "bg-red-tint/50" : undefined}>
                  <th scope="row" className="px-4 py-3 font-semibold text-ink">
                    <Link
                      href={isSelected ? "/app/admin/campus-links" : `/app/admin/campus-links?campus=${campus.slug}`}
                      className="underline decoration-line decoration-2 underline-offset-4 hover:decoration-red"
                    >
                      {campus.name}
                    </Link>
                  </th>
                  <td className="px-4 py-3 text-stone">
                    {PRINTED_HOST}
                    {campusGoPath(campus)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-semibold text-ink">
                    {scans.toLocaleString("en-US")}
                  </td>
                  <td className="px-4 py-3 text-stone">{lastScan ? formatTime(lastScan) : "Never"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-12 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-[22px] font-semibold tracking-[-0.025em]">
          {selected ? `Scans from ${selected.name}` : "Recent scans"}
        </h2>
        {selected && (
          <Link href="/app/admin/campus-links" className="text-[14.5px] font-medium text-stone hover:text-ink">
            Show all campuses
          </Link>
        )}
      </div>
      <p className="mt-1 text-[14px] text-stone">Newest first, up to 200.</p>

      {report.recent.length === 0 ? (
        <p className="mt-6 text-[15px] text-stone">No scans yet.</p>
      ) : (
        <ol className="mt-5 divide-y divide-line rounded-[18px] ring-1 ring-line">
          {report.recent.map((scan, index) => (
            <li
              key={`${scan.scanned_at}-${index}`}
              className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-0.5 px-4 py-3 text-[15px] sm:grid-cols-[12rem_minmax(0,1fr)_auto]"
            >
              <span className="tabular-nums text-ink">{formatTime(scan.scanned_at)}</span>
              <span className="order-3 col-span-2 text-stone sm:order-none sm:col-span-1">
                {nameBySlug.get(scan.campus) ?? scan.campus}
              </span>
              <span className="text-right text-stone">{DEVICE_LABELS[scan.device] ?? scan.device}</span>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
