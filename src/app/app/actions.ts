"use server";

import { revalidatePath } from "next/cache";

import {
  WorkspaceItemPriority,
  WorkspaceItemStatus,
  WorkspaceItemType,
  WorkspaceSection,
} from "@/lib/data/models";
import {
  deleteStudentQuickLink,
  updateStudentQuickLink,
  createStudentQuickLink,
} from "@/lib/data/studentQuickLinks";
import {
  createStudentTask,
  deleteStudentTask,
  updateStudentTask,
} from "@/lib/data/studentTasks";
import {
  getWorkspaceItemState,
  upsertWorkspaceItemState,
} from "@/lib/data/workspaceState";
import { sanitizeNextPath } from "@/lib/site";
import { createServerSupabaseClient } from "@/lib/supabase/server-component";
import {
  WorkspacePreferences,
  saveWorkspacePreferences,
} from "@/lib/workspace/preferences";

function parseStatus(value: FormDataEntryValue | null): WorkspaceItemStatus | null {
  if (
    value === "open" ||
    value === "in_progress" ||
    value === "done" ||
    value === "snoozed"
  ) {
    return value;
  }

  return null;
}

function parsePriority(value: FormDataEntryValue | null): WorkspaceItemPriority | null {
  if (value === "low" || value === "normal" || value === "high") {
    return value;
  }

  return null;
}

function parseItemType(value: FormDataEntryValue | null): WorkspaceItemType | null {
  if (value === "upcoming_work" || value === "document" || value === "course_brain") {
    return value;
  }

  return null;
}

function parseBoolean(value: FormDataEntryValue | null, fallback = false): boolean {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return fallback;
}

function parseStudentTaskStatus(value: FormDataEntryValue | null) {
  if (value === "open" || value === "done") {
    return value;
  }

  return null;
}

function parseSection(value: FormDataEntryValue | null): WorkspaceSection {
  if (
    value === "overdue" ||
    value === "today" ||
    value === "week" ||
    value === "pinned"
  ) {
    return value;
  }

  return "today";
}

function parseSnapshot(value: FormDataEntryValue | null): Record<string, unknown> {
  if (typeof value !== "string" || !value.trim()) {
    return {};
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    return {};
  }

  return {};
}

function parseOptionalString(
  value: FormDataEntryValue | null,
  maxLength = 2000,
): string | null | undefined {
  if (value === null) {
    return undefined;
  }

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, maxLength) : null;
}

function parseOptionalIsoDateTime(value: FormDataEntryValue | null): string | null | undefined {
  if (value === null) {
    return undefined;
  }

  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toISOString();
}

function resolveDeferredUntil(value: FormDataEntryValue | null): string | null | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  if (!value) {
    return null;
  }

  if (value === "tomorrow") {
    return new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  }

  return value;
}

async function getAuthenticatedSupabaseContext() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return { supabase, user };
}

function revalidateWorkspacePaths(redirectTo: string) {
  const safePath = sanitizeNextPath(redirectTo);

  revalidatePath("/app");
  revalidatePath("/app/assignments");
  revalidatePath("/app/courses");
  revalidatePath("/app/documents");
  revalidatePath("/app/course-brain");
  revalidatePath("/app/settings");
  revalidatePath(safePath);
}

export async function saveWorkspaceItemStateAction(formData: FormData): Promise<void> {
  const itemKey = formData.get("itemKey");
  const itemType = parseItemType(formData.get("itemType"));

  if (typeof itemKey !== "string" || !itemKey || !itemType) {
    return;
  }

  const redirectTo = sanitizeNextPath(
    typeof formData.get("redirectTo") === "string"
      ? (formData.get("redirectTo") as string)
      : "/app",
  );

  const { supabase, user } = await getAuthenticatedSupabaseContext();
  const existing = await getWorkspaceItemState(supabase, user.id, itemKey);
  const status = parseStatus(formData.get("status"));
  const priority = parsePriority(formData.get("priority"));
  const deferredUntilValue = resolveDeferredUntil(formData.get("deferredUntil"));
  const noteValue = formData.get("note");

  await upsertWorkspaceItemState(supabase, user.id, {
    itemKey,
    itemType,
    status: status ?? existing?.status ?? "open",
    priority: priority ?? existing?.priority ?? "normal",
    pinned: parseBoolean(formData.get("pinned"), existing?.pinned ?? false),
    deferredUntil:
      deferredUntilValue === undefined
        ? existing?.deferredUntil ?? null
        : deferredUntilValue,
    note:
      typeof noteValue === "string"
        ? noteValue
        : existing?.note ?? null,
    sourceSnapshot: {
      ...(existing?.sourceSnapshot ?? {}),
      ...parseSnapshot(formData.get("sourceSnapshot")),
    },
  });

  revalidateWorkspacePaths(redirectTo);
}

export async function saveWorkspacePreferencesAction(formData: FormData): Promise<void> {
  const preferences: WorkspacePreferences = {
    defaultSection: parseSection(formData.get("defaultSection")),
    hideCompleted: parseBoolean(formData.get("hideCompleted"), true),
    showSnoozed: parseBoolean(formData.get("showSnoozed"), false),
  };

  await saveWorkspacePreferences(preferences);
  revalidateWorkspacePaths("/app/settings");
}

export async function createStudentTaskAction(formData: FormData): Promise<void> {
  const title = parseOptionalString(formData.get("title"), 120);

  if (!title) {
    return;
  }

  const redirectTo = sanitizeNextPath(
    typeof formData.get("redirectTo") === "string"
      ? (formData.get("redirectTo") as string)
      : "/app",
  );

  const { supabase, user } = await getAuthenticatedSupabaseContext();

  await createStudentTask(supabase, user.id, {
    title,
    notes: parseOptionalString(formData.get("notes")),
    dueAt: parseOptionalIsoDateTime(formData.get("dueAt")) ?? null,
    sourceApp: "canvascope-web",
  });

  revalidateWorkspacePaths(redirectTo);
}

export async function updateStudentTaskAction(formData: FormData): Promise<void> {
  const taskId = formData.get("taskId");
  if (typeof taskId !== "string" || !taskId) {
    return;
  }

  const redirectTo = sanitizeNextPath(
    typeof formData.get("redirectTo") === "string"
      ? (formData.get("redirectTo") as string)
      : "/app",
  );

  const { supabase, user } = await getAuthenticatedSupabaseContext();

  await updateStudentTask(supabase, user.id, taskId, {
    title: parseOptionalString(formData.get("title"), 120) ?? undefined,
    notes: parseOptionalString(formData.get("notes")),
    dueAt: parseOptionalIsoDateTime(formData.get("dueAt")),
    status: parseStudentTaskStatus(formData.get("status")) ?? undefined,
  });

  revalidateWorkspacePaths(redirectTo);
}

export async function deleteStudentTaskAction(formData: FormData): Promise<void> {
  const taskId = formData.get("taskId");
  if (typeof taskId !== "string" || !taskId) {
    return;
  }

  const redirectTo = sanitizeNextPath(
    typeof formData.get("redirectTo") === "string"
      ? (formData.get("redirectTo") as string)
      : "/app",
  );

  const { supabase, user } = await getAuthenticatedSupabaseContext();
  await deleteStudentTask(supabase, user.id, taskId);
  revalidateWorkspacePaths(redirectTo);
}

export async function saveStudentQuickLinkAction(formData: FormData): Promise<void> {
  const label = parseOptionalString(formData.get("label"), 80);
  const url = parseOptionalString(formData.get("url"), 2048);

  if (!label || !url) {
    return;
  }

  const redirectTo = sanitizeNextPath(
    typeof formData.get("redirectTo") === "string"
      ? (formData.get("redirectTo") as string)
      : "/app",
  );
  const linkId =
    typeof formData.get("linkId") === "string" ? (formData.get("linkId") as string) : null;
  const sortOrder =
    typeof formData.get("sortOrder") === "string" && formData.get("sortOrder")
      ? Number.parseInt(formData.get("sortOrder") as string, 10)
      : undefined;

  const { supabase, user } = await getAuthenticatedSupabaseContext();

  if (linkId) {
    await updateStudentQuickLink(supabase, user.id, linkId, {
      label,
      url,
      sortOrder: Number.isFinite(sortOrder) ? sortOrder : undefined,
    });
  } else {
    await createStudentQuickLink(supabase, user.id, {
      label,
      url,
    });
  }

  revalidateWorkspacePaths(redirectTo);
}

export async function deleteStudentQuickLinkAction(formData: FormData): Promise<void> {
  const linkId = formData.get("linkId");
  if (typeof linkId !== "string" || !linkId) {
    return;
  }

  const redirectTo = sanitizeNextPath(
    typeof formData.get("redirectTo") === "string"
      ? (formData.get("redirectTo") as string)
      : "/app",
  );

  const { supabase, user } = await getAuthenticatedSupabaseContext();
  await deleteStudentQuickLink(supabase, user.id, linkId);
  revalidateWorkspacePaths(redirectTo);
}
