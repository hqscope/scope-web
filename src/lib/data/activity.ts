// Server-only: createAdminSupabaseClient reads the service-role key, which
// must never reach a client bundle. Import this module from server components
// and route handlers only.
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

// Human-readable names and, more importantly, what each product's number
// actually means. These are not all the same kind of measurement and the
// dashboard says so rather than quietly adding them up.
export const ACTIVITY_PRODUCTS: Record<string, { label: string; note?: string }> = {
  scope_extension: { label: "Scope extension" },
  lectra_ios: { label: "Lectra (iPad/iPhone)" },
  lectra_mac: {
    label: "Lectra for Mac",
    note: "Counts hosts online, not people interacting — the Mac app is a background receiver.",
  },
  lectra_receiver_ext: { label: "Lectra Receiver extension" },
  polya: { label: "Polya" },
  scope_web: { label: "Scope web app", note: "Not instrumented yet." },
};

export interface ActivityWindows {
  live: number;
  hourly: number;
  daily: number;
  weekly: number;
  biweekly: number;
  monthly: number;
  yearly: number;
  all_time: number;
  new_today: number;
  installs: number;
}

export interface ActivityProductRow extends ActivityWindows {
  product: string;
}

export interface ActivityPoint {
  bucket: string;
  product: string;
  actives: number;
}

export interface ActivitySnapshot {
  total: ActivityWindows;
  products: ActivityProductRow[];
  series: ActivityPoint[];
  generatedAt: string;
  /** Set when the service-role key is missing or a query failed. */
  error: string | null;
}

const EMPTY_WINDOWS: ActivityWindows = {
  live: 0,
  hourly: 0,
  daily: 0,
  weekly: 0,
  biweekly: 0,
  monthly: 0,
  yearly: 0,
  all_time: 0,
  new_today: 0,
  installs: 0,
};

function emptySnapshot(error: string | null): ActivitySnapshot {
  return {
    total: EMPTY_WINDOWS,
    products: [],
    series: [],
    generatedAt: new Date().toISOString(),
    error,
  };
}

/**
 * Reads the activity rollups.
 *
 * The tables have RLS on with no policies, so this must go through the service
 * role — there is no anon or authenticated read path by design. Returns a
 * snapshot with `error` set rather than throwing: a broken metrics widget
 * should not take a page down.
 */
export async function getActivitySnapshot(days = 30): Promise<ActivitySnapshot> {
  const admin = createAdminSupabaseClient();
  if (!admin) {
    return emptySnapshot(
      "No service-role key configured. Set NEXT_PRIVATE_SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  const [totalResult, productsResult, seriesResult] = await Promise.all([
    admin.rpc("activity_summary_total"),
    admin.rpc("activity_summary", { p_product: null }),
    admin.rpc("activity_timeseries", { p_grain: "day", p_since: since, p_product: null }),
  ]);

  const failure =
    totalResult.error?.message ??
    productsResult.error?.message ??
    seriesResult.error?.message ??
    null;

  if (failure) {
    return emptySnapshot(failure);
  }

  // activity_summary_total returns exactly one row.
  const total = (Array.isArray(totalResult.data) ? totalResult.data[0] : totalResult.data) as
    | ActivityWindows
    | undefined;

  return {
    total: total ?? EMPTY_WINDOWS,
    products: (productsResult.data ?? []) as ActivityProductRow[],
    series: (seriesResult.data ?? []) as ActivityPoint[],
    generatedAt: new Date().toISOString(),
    error: null,
  };
}

export function productLabel(product: string): string {
  return ACTIVITY_PRODUCTS[product]?.label ?? product;
}

export function productNote(product: string): string | undefined {
  return ACTIVITY_PRODUCTS[product]?.note;
}
