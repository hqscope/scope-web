import { SupabaseClient } from "@supabase/supabase-js";

import {
  WorkspaceItemPriority,
  WorkspaceItemState,
  WorkspaceItemStatus,
  WorkspaceItemType,
} from "@/lib/data/models";

interface WorkspaceItemStateRow {
  user_id: string;
  item_key: string;
  item_type: WorkspaceItemType;
  status: WorkspaceItemStatus;
  priority: WorkspaceItemPriority;
  pinned: boolean;
  deferred_until: string | null;
  note: string | null;
  source_snapshot: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceItemStateUpsertInput {
  itemKey: string;
  itemType: WorkspaceItemType;
  status?: WorkspaceItemStatus;
  priority?: WorkspaceItemPriority;
  pinned?: boolean;
  deferredUntil?: string | null;
  note?: string | null;
  sourceSnapshot?: Record<string, unknown>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeStateRow(row: WorkspaceItemStateRow): WorkspaceItemState {
  return {
    userId: row.user_id,
    itemKey: row.item_key,
    itemType: row.item_type,
    status: row.status,
    priority: row.priority,
    pinned: row.pinned,
    deferredUntil: row.deferred_until,
    note: row.note,
    sourceSnapshot: isRecord(row.source_snapshot) ? row.source_snapshot : {},
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function loadWorkspaceItemStateMap(
  supabase: SupabaseClient,
  userId: string,
): Promise<{
  workflowState: Map<string, WorkspaceItemState>;
  workflowError: string | null;
  workflowAvailable: boolean;
}> {
  const { data, error } = await supabase
    .from("workspace_item_state")
    .select(
      "user_id, item_key, item_type, status, priority, pinned, deferred_until, note, source_snapshot, created_at, updated_at",
    )
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    return {
      workflowState: new Map(),
      workflowError: error.message,
      workflowAvailable: false,
    };
  }

  const workflowState = new Map<string, WorkspaceItemState>();
  (data satisfies WorkspaceItemStateRow[]).forEach((row) => {
    const normalized = normalizeStateRow(row);
    workflowState.set(normalized.itemKey, normalized);
  });

  return {
    workflowState,
    workflowError: null,
    workflowAvailable: true,
  };
}

export async function upsertWorkspaceItemState(
  supabase: SupabaseClient,
  userId: string,
  input: WorkspaceItemStateUpsertInput,
): Promise<{ state: WorkspaceItemState | null; error: string | null }> {
  const payload = {
    user_id: userId,
    item_key: input.itemKey,
    item_type: input.itemType,
    status: input.status ?? "open",
    priority: input.priority ?? "normal",
    pinned: input.pinned ?? false,
    deferred_until:
      typeof input.deferredUntil === "string" ? input.deferredUntil : null,
    note:
      typeof input.note === "string"
        ? input.note.trim().slice(0, 2000) || null
        : null,
    source_snapshot: input.sourceSnapshot ?? {},
  };

  const { data, error } = await supabase
    .from("workspace_item_state")
    .upsert(payload, {
      onConflict: "user_id,item_key",
    })
    .select(
      "user_id, item_key, item_type, status, priority, pinned, deferred_until, note, source_snapshot, created_at, updated_at",
    )
    .single();

  if (error) {
    return { state: null, error: error.message };
  }

  return {
    state: normalizeStateRow(data satisfies WorkspaceItemStateRow),
    error: null,
  };
}

export async function getWorkspaceItemState(
  supabase: SupabaseClient,
  userId: string,
  itemKey: string,
): Promise<WorkspaceItemState | null> {
  const { data, error } = await supabase
    .from("workspace_item_state")
    .select(
      "user_id, item_key, item_type, status, priority, pinned, deferred_until, note, source_snapshot, created_at, updated_at",
    )
    .eq("user_id", userId)
    .eq("item_key", itemKey)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return normalizeStateRow(data satisfies WorkspaceItemStateRow);
}
