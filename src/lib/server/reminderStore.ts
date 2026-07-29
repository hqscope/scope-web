import {
  createStudentTaskWithAdmin,
  listStudentTasksWithAdmin,
} from "@/lib/data/studentTasks";
import { StudentTask } from "@/lib/data/models";

export interface CanvascopeReminder {
  id: string;
  userId: string;
  rawText: string;
  title: string;
  dueAtIso: string | null;
  repeatDaily: boolean;
  sourceApp: string;
  createdAtIso: string;
  status: "active" | "completed";
}

export interface ReminderInsertInput {
  userId: string;
  rawText: string;
  title: string;
  dueAtIso: string | null;
  repeatDaily: boolean;
  sourceApp: string;
}

function toReminder(task: StudentTask): CanvascopeReminder {
  return {
    id: task.id,
    userId: task.userId,
    rawText: task.rawText ?? task.title,
    title: task.title,
    dueAtIso: task.dueAt,
    repeatDaily: task.repeatDaily,
    sourceApp: task.sourceApp,
    createdAtIso: task.createdAt,
    status: task.status === "done" ? "completed" : "active",
  };
}

export async function addReminder(
  input: ReminderInsertInput,
): Promise<{ reminder: CanvascopeReminder | null; error: string | null }> {
  const { task, error } = await createStudentTaskWithAdmin({
    userId: input.userId,
    title: input.title,
    dueAt: input.dueAtIso,
    repeatDaily: input.repeatDaily,
    rawText: input.rawText,
    sourceApp: input.sourceApp,
  });

  if (error || !task) {
    return { reminder: null, error: error ?? "Unable to create reminder." };
  }

  return {
    reminder: toReminder(task),
    error: null,
  };
}

export async function listReminders(
  userId: string,
): Promise<{ reminders: CanvascopeReminder[]; error: string | null }> {
  const { tasks, error } = await listStudentTasksWithAdmin(userId);

  return {
    reminders: tasks.map(toReminder),
    error,
  };
}
