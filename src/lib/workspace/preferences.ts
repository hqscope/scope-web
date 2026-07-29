import { cookies } from "next/headers";

import { WorkspaceSection } from "@/lib/data/models";

export interface WorkspacePreferences {
  defaultSection: WorkspaceSection;
  hideCompleted: boolean;
  showSnoozed: boolean;
}

const SECTION_COOKIE = "canvascope_workspace_section";
const HIDE_COMPLETED_COOKIE = "canvascope_workspace_hide_completed";
const SHOW_SNOOZED_COOKIE = "canvascope_workspace_show_snoozed";

const DEFAULT_PREFERENCES: WorkspacePreferences = {
  defaultSection: "today",
  hideCompleted: true,
  showSnoozed: false,
};

function parseBooleanCookie(value: string | undefined, fallback: boolean): boolean {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return fallback;
}

function parseSection(value: string | undefined): WorkspaceSection {
  if (
    value === "overdue" ||
    value === "today" ||
    value === "week" ||
    value === "pinned"
  ) {
    return value;
  }

  return DEFAULT_PREFERENCES.defaultSection;
}

export async function getWorkspacePreferences(): Promise<WorkspacePreferences> {
  const cookieStore = await cookies();

  return {
    defaultSection: parseSection(cookieStore.get(SECTION_COOKIE)?.value),
    hideCompleted: parseBooleanCookie(
      cookieStore.get(HIDE_COMPLETED_COOKIE)?.value,
      DEFAULT_PREFERENCES.hideCompleted,
    ),
    showSnoozed: parseBooleanCookie(
      cookieStore.get(SHOW_SNOOZED_COOKIE)?.value,
      DEFAULT_PREFERENCES.showSnoozed,
    ),
  };
}

export async function saveWorkspacePreferences(
  input: WorkspacePreferences,
): Promise<void> {
  const cookieStore = await cookies();
  const oneYearSeconds = 60 * 60 * 24 * 365;

  cookieStore.set(SECTION_COOKIE, input.defaultSection, {
    httpOnly: false,
    maxAge: oneYearSeconds,
    path: "/",
    sameSite: "lax",
  });
  cookieStore.set(HIDE_COMPLETED_COOKIE, String(input.hideCompleted), {
    httpOnly: false,
    maxAge: oneYearSeconds,
    path: "/",
    sameSite: "lax",
  });
  cookieStore.set(SHOW_SNOOZED_COOKIE, String(input.showSnoozed), {
    httpOnly: false,
    maxAge: oneYearSeconds,
    path: "/",
    sameSite: "lax",
  });
}
