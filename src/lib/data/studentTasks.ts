import { SupabaseClient } from "@supabase/supabase-js";

import { StudentTask, StudentTaskStatus } from "@/lib/data/models";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

interface StudentTaskRow {
  id: string;
  user_id: string;
  title: string;
  notes: string | null;
  due_at: string | null;
  status: StudentTaskStatus;
  repeat_daily: boolean;
  raw_text: string | null;
  source_app: string;
  created_at: string;
  updated_at: string;
}

export interface StudentTaskSaveInput {
  title: string;
  notes?: string | null;
  dueAt?: string | null;
  status?: StudentTaskStatus;
  repeatDaily?: boolean;
  rawText?: string | null;
  sourceApp?: string;
}

export interface StudentTaskUpdateInput {
  title?: string;
  notes?: string | null;
  dueAt?: string | null;
  status?: StudentTaskStatus;
  repeatDaily?: boolean;
  rawText?: string | null;
  sourceApp?: string;
}

function normalizeStudentTask(row: StudentTaskRow): StudentTask {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    notes: row.notes,
    dueAt: row.due_at,
    status: row.status,
    repeatDaily: row.repeat_daily,
    rawText: row.raw_text,
    sourceApp: row.source_app,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function cleanText(value: string | null | undefined, maxLength: number): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, maxLength) : null;
}

function cleanTitle(value: string): string {
  return value.trim().replace(/\s+/g, " ").slice(0, 120);
}

function normalizeDueAt(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toISOString();
}

function sortStudentTasks(tasks: StudentTask[]): StudentTask[] {
  return [...tasks].sort((left, right) => {
    if (left.status !== right.status) {
      return left.status === "open" ? -1 : 1;
    }

    const leftDueMs = left.dueAt ? Date.parse(left.dueAt) : Number.POSITIVE_INFINITY;
    const rightDueMs = right.dueAt ? Date.parse(right.dueAt) : Number.POSITIVE_INFINITY;

    if (leftDueMs !== rightDueMs) {
      return leftDueMs - rightDueMs;
    }

    return Date.parse(right.updatedAt) - Date.parse(left.updatedAt);
  });
}

function baseSelect() {
  return "id, user_id, title, notes, due_at, status, repeat_daily, raw_text, source_app, created_at, updated_at";
}

export async function loadStudentTasks(
  supabase: SupabaseClient,
  userId: string,
): Promise<{
  tasks: StudentTask[];
  error: string | null;
  available: boolean;
}> {
  const { data, error } = await supabase
    .from("student_tasks")
    .select(baseSelect())
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    return {
      tasks: [],
      error: error.message,
      available: false,
    };
  }

  const rows = Array.isArray(data) ? (data as unknown as StudentTaskRow[]) : [];

  return {
    tasks: sortStudentTasks(rows.map(normalizeStudentTask)),
    error: null,
    available: true,
  };
}

export async function createStudentTask(
  supabase: SupabaseClient,
  userId: string,
  input: StudentTaskSaveInput,
): Promise<{ task: StudentTask | null; error: string | null }> {
  const title = cleanTitle(input.title);
  if (!title) {
    return { task: null, error: "Task title is required." };
  }

  const payload = {
    user_id: userId,
    title,
    notes: cleanText(input.notes, 2000),
    due_at: normalizeDueAt(input.dueAt),
    status: input.status ?? "open",
    repeat_daily: input.repeatDaily ?? false,
    raw_text: cleanText(input.rawText, 2000),
    source_app: cleanText(input.sourceApp, 120) ?? "canvascope-web",
  };

  const { data, error } = await supabase
    .from("student_tasks")
    .insert(payload)
    .select(baseSelect())
    .single();

  if (error) {
    return { task: null, error: error.message };
  }

  return {
    task: normalizeStudentTask(data as unknown as StudentTaskRow),
    error: null,
  };
}

export async function updateStudentTask(
  supabase: SupabaseClient,
  userId: string,
  taskId: string,
  input: StudentTaskUpdateInput,
): Promise<{ task: StudentTask | null; error: string | null }> {
  const payload: Record<string, unknown> = {};

  if (typeof input.title === "string") {
    const title = cleanTitle(input.title);
    if (!title) {
      return { task: null, error: "Task title is required." };
    }
    payload.title = title;
  }

  if (input.notes !== undefined) {
    payload.notes = cleanText(input.notes, 2000);
  }

  if (input.dueAt !== undefined) {
    payload.due_at = normalizeDueAt(input.dueAt);
  }

  if (input.status) {
    payload.status = input.status;
  }

  if (typeof input.repeatDaily === "boolean") {
    payload.repeat_daily = input.repeatDaily;
  }

  if (input.rawText !== undefined) {
    payload.raw_text = cleanText(input.rawText, 2000);
  }

  if (input.sourceApp !== undefined) {
    payload.source_app = cleanText(input.sourceApp, 120) ?? "canvascope-web";
  }

  const { data, error } = await supabase
    .from("student_tasks")
    .update(payload)
    .eq("id", taskId)
    .eq("user_id", userId)
    .select(baseSelect())
    .maybeSingle();

  if (error) {
    return { task: null, error: error.message };
  }

  if (!data) {
    return { task: null, error: "Task not found." };
  }

  return {
    task: normalizeStudentTask(data as unknown as StudentTaskRow),
    error: null,
  };
}

export async function deleteStudentTask(
  supabase: SupabaseClient,
  userId: string,
  taskId: string,
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("student_tasks")
    .delete()
    .eq("id", taskId)
    .eq("user_id", userId);

  return { error: error?.message ?? null };
}

function getAdminClient() {
  const admin = createAdminSupabaseClient();
  if (!admin) {
    return { admin: null, error: "Supabase service role key is not configured." };
  }

  return { admin, error: null };
}

export async function createStudentTaskWithAdmin(
  input: { userId: string } & StudentTaskSaveInput,
): Promise<{ task: StudentTask | null; error: string | null }> {
  const { admin, error: adminError } = getAdminClient();
  if (!admin) {
    return { task: null, error: adminError };
  }

  return createStudentTask(admin, input.userId, input);
}

export async function listStudentTasksWithAdmin(
  userId: string,
): Promise<{ tasks: StudentTask[]; error: string | null }> {
  const { admin, error: adminError } = getAdminClient();
  if (!admin) {
    return { tasks: [], error: adminError };
  }

  const result = await loadStudentTasks(admin, userId);
  return {
    tasks: result.tasks,
    error: result.error,
  };
}
