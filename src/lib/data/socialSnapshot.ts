import "server-only";

import { createAdminSupabaseClient } from "@/lib/supabase/admin";

const AUTH_PAGE_SIZE = 1_000;
const ACTIVE_DEVICE_DAYS = 30;

interface ActivityTotalRow {
  daily: number;
  weekly: number;
  monthly: number;
}

export interface SocialSnapshot {
  schemaVersion: 1;
  measuredAt: string;
  accounts: { registered: number };
  recentActivity: { daily: number; weekly: number; monthly: number };
  syncedDocuments: { total: number };
  devices: { registered: number; active30d: number };
}

async function countRegisteredAccounts(): Promise<number> {
  const admin = createAdminSupabaseClient();
  if (!admin) throw new Error("Supabase service role key is not configured.");

  let page = 1;
  let total = 0;
  while (true) {
    const { data, error } = await admin.auth.admin.listUsers({
      page,
      perPage: AUTH_PAGE_SIZE,
    });
    if (error) throw new Error(`Account count failed: ${error.message}`);
    total += data.users.length;
    if (data.users.length < AUTH_PAGE_SIZE) return total;
    page += 1;
  }
}

export async function getSocialSnapshot(): Promise<SocialSnapshot> {
  const admin = createAdminSupabaseClient();
  if (!admin) throw new Error("Supabase service role key is not configured.");

  const activeSince = new Date(
    Date.now() - ACTIVE_DEVICE_DAYS * 24 * 60 * 60 * 1_000,
  ).toISOString();

  const [accounts, activity, documents, devices, activeDevices] = await Promise.all([
    countRegisteredAccounts(),
    admin.rpc("activity_summary_total"),
    admin
      .from("synced_items")
      .select("id", { count: "exact", head: true })
      .in("item_type", ["document", "pdf_document"]),
    admin
      .from("devices")
      .select("id", { count: "exact", head: true })
      .is("revoked_at", null),
    admin
      .from("devices")
      .select("id", { count: "exact", head: true })
      .is("revoked_at", null)
      .gte("last_seen_at", activeSince),
  ]);

  const failure =
    activity.error?.message ??
    documents.error?.message ??
    devices.error?.message ??
    activeDevices.error?.message;
  if (failure) throw new Error(`Social snapshot query failed: ${failure}`);

  const activityRow = (
    Array.isArray(activity.data) ? activity.data[0] : activity.data
  ) as ActivityTotalRow | null;
  if (!activityRow) throw new Error("Activity snapshot returned no row.");

  return {
    schemaVersion: 1,
    measuredAt: new Date().toISOString(),
    accounts: { registered: accounts },
    recentActivity: {
      daily: Number(activityRow.daily),
      weekly: Number(activityRow.weekly),
      monthly: Number(activityRow.monthly),
    },
    syncedDocuments: { total: documents.count ?? 0 },
    devices: {
      registered: devices.count ?? 0,
      active30d: activeDevices.count ?? 0,
    },
  };
}
