import { SupabaseClient } from "@supabase/supabase-js";

import { StudentQuickLink } from "@/lib/data/models";

interface StudentQuickLinkRow {
  id: string;
  user_id: string;
  label: string;
  url: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface StudentQuickLinkSaveInput {
  label: string;
  url: string;
  sortOrder?: number;
}

function baseSelect() {
  return "id, user_id, label, url, sort_order, created_at, updated_at";
}

function normalizeStudentQuickLink(row: StudentQuickLinkRow): StudentQuickLink {
  return {
    id: row.id,
    userId: row.user_id,
    label: row.label,
    url: row.url,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function cleanLabel(value: string): string {
  return value.trim().replace(/\s+/g, " ").slice(0, 80);
}

function normalizeLinkUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

export async function loadStudentQuickLinks(
  supabase: SupabaseClient,
  userId: string,
): Promise<{
  links: StudentQuickLink[];
  error: string | null;
  available: boolean;
}> {
  const { data, error } = await supabase
    .from("student_quick_links")
    .select(baseSelect())
    .eq("user_id", userId)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    return {
      links: [],
      error: error.message,
      available: false,
    };
  }

  const rows = Array.isArray(data)
    ? (data as unknown as StudentQuickLinkRow[])
    : [];

  return {
    links: rows.map(normalizeStudentQuickLink),
    error: null,
    available: true,
  };
}

export async function getNextStudentQuickLinkSortOrder(
  supabase: SupabaseClient,
  userId: string,
): Promise<number> {
  const { data, error } = await supabase
    .from("student_quick_links")
    .select("sort_order")
    .eq("user_id", userId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return 0;
  }

  return typeof data.sort_order === "number" ? data.sort_order + 1 : 0;
}

export async function createStudentQuickLink(
  supabase: SupabaseClient,
  userId: string,
  input: StudentQuickLinkSaveInput,
): Promise<{ link: StudentQuickLink | null; error: string | null }> {
  const label = cleanLabel(input.label);
  const url = normalizeLinkUrl(input.url);

  if (!label) {
    return { link: null, error: "Link label is required." };
  }

  if (!url) {
    return { link: null, error: "A valid http or https URL is required." };
  }

  const sortOrder =
    typeof input.sortOrder === "number"
      ? input.sortOrder
      : await getNextStudentQuickLinkSortOrder(supabase, userId);

  const { data, error } = await supabase
    .from("student_quick_links")
    .insert({
      user_id: userId,
      label,
      url,
      sort_order: sortOrder,
    })
    .select(baseSelect())
    .single();

  if (error) {
    return { link: null, error: error.message };
  }

  return {
    link: normalizeStudentQuickLink(data as unknown as StudentQuickLinkRow),
    error: null,
  };
}

export async function updateStudentQuickLink(
  supabase: SupabaseClient,
  userId: string,
  linkId: string,
  input: StudentQuickLinkSaveInput,
): Promise<{ link: StudentQuickLink | null; error: string | null }> {
  const label = cleanLabel(input.label);
  const url = normalizeLinkUrl(input.url);

  if (!label) {
    return { link: null, error: "Link label is required." };
  }

  if (!url) {
    return { link: null, error: "A valid http or https URL is required." };
  }

  const payload: Record<string, unknown> = {
    label,
    url,
  };

  if (typeof input.sortOrder === "number") {
    payload.sort_order = input.sortOrder;
  }

  const { data, error } = await supabase
    .from("student_quick_links")
    .update(payload)
    .eq("id", linkId)
    .eq("user_id", userId)
    .select(baseSelect())
    .maybeSingle();

  if (error) {
    return { link: null, error: error.message };
  }

  if (!data) {
    return { link: null, error: "Link not found." };
  }

  return {
    link: normalizeStudentQuickLink(data as unknown as StudentQuickLinkRow),
    error: null,
  };
}

export async function deleteStudentQuickLink(
  supabase: SupabaseClient,
  userId: string,
  linkId: string,
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("student_quick_links")
    .delete()
    .eq("id", linkId)
    .eq("user_id", userId);

  return { error: error?.message ?? null };
}
