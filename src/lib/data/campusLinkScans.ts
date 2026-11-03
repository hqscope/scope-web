// Server-only: createAdminSupabaseClient reads the service-role key, which
// must never reach a client bundle. Import this module from server components
// and route handlers only.
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

/**
 * A coarse device class, kept instead of the raw user agent so the log holds
 * nothing that could single a person out (the privacy policy promises the
 * website collects no personal data). iPadOS Safari reports itself as a Mac,
 * so iPads land in "desktop".
 */
export type ScanDevice = "ios" | "android" | "desktop" | "other";

export function deviceFromUserAgent(userAgent: string): ScanDevice {
  if (/iPhone|iPad|iPod/i.test(userAgent)) return "ios";
  if (/Android/i.test(userAgent)) return "android";
  if (/Windows|Macintosh|CrOS|Linux/i.test(userAgent)) return "desktop";
  return "other";
}

// Link-preview fetchers, crawlers, and scripted clients. A shared link pasted
// into iMessage, Slack, or Discord gets fetched by a bot before anyone taps
// it, and that fetch is not a scan. App names alone (Instagram, Discord) are
// left out on purpose: their in-app browsers carry the app's name too, and a
// tap inside one is a real visit. Their preview fetchers all say "bot".
const NON_HUMAN_AGENT =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|embedly|curl|wget|python|go-http|java\/|okhttp|axios|node-fetch|headless|lighthouse|pingdom|uptime/i;

export function isLikelyHuman(userAgent: string | null): boolean {
  return Boolean(userAgent) && !NON_HUMAN_AGENT.test(userAgent ?? "");
}

/**
 * Records one visit to a campus link. Never throws: a failed write must not
 * stop the visitor from reaching the landing page.
 */
export async function recordCampusLinkScan(campus: string, device: ScanDevice): Promise<void> {
  const admin = createAdminSupabaseClient();
  if (!admin) {
    console.warn("[campus-links] no service-role key; scan not recorded", { campus });
    return;
  }

  const { error } = await admin.from("campus_link_scans").insert({ campus, device });
  if (error) {
    console.error("[campus-links] scan insert failed", { campus, code: error.code, message: error.message });
  }
}

export type CampusScanTotal = {
  campus: string;
  scans: number;
  first_scan: string;
  last_scan: string;
};

export type CampusScan = {
  campus: string;
  device: ScanDevice;
  scanned_at: string;
};

export type CampusLinkReport = {
  totals: CampusScanTotal[];
  recent: CampusScan[];
  /** Set when the service-role key is missing or a query failed. */
  error: string | null;
};

/**
 * Per-campus totals plus the most recent scans, newest first. Pass a campus
 * slug to list only that campus's scans. Returns `error` rather than
 * throwing, like the activity snapshot.
 */
export async function getCampusLinkReport(
  campus: string | null,
  limit = 200,
): Promise<CampusLinkReport> {
  const admin = createAdminSupabaseClient();
  if (!admin) {
    return {
      totals: [],
      recent: [],
      error: "No service-role key configured. Set NEXT_PRIVATE_SUPABASE_SERVICE_ROLE_KEY.",
    };
  }

  let recentQuery = admin
    .from("campus_link_scans")
    .select("campus, device, scanned_at")
    .order("scanned_at", { ascending: false })
    .limit(limit);
  if (campus) {
    recentQuery = recentQuery.eq("campus", campus);
  }

  const [totalsResult, recentResult] = await Promise.all([
    admin.from("campus_link_scan_totals").select("campus, scans, first_scan, last_scan"),
    recentQuery,
  ]);

  const failure = totalsResult.error?.message ?? recentResult.error?.message ?? null;
  if (failure) {
    return { totals: [], recent: [], error: failure };
  }

  return {
    totals: (totalsResult.data ?? []) as CampusScanTotal[],
    recent: (recentResult.data ?? []) as CampusScan[],
    error: null,
  };
}
