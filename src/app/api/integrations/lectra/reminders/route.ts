import { NextRequest, NextResponse } from "next/server";

import { getCanvascopeSessionSecret } from "@/lib/server/canvascopeEnv";
import {
  getBearerToken,
  parseLectraAccessToken,
} from "@/lib/server/lectraTokens";
import { parseReminderFromText } from "@/lib/server/reminderParser";
import { addReminder } from "@/lib/server/reminderStore";

interface ReminderOverridePayload {
  title?: string;
  dueAtIso?: string;
  repeatDaily?: boolean;
}

interface ReminderPushPayload {
  rawText?: string;
  reminder?: ReminderOverridePayload;
  sourceApp?: string;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseReminderPushPayload(value: unknown): ReminderPushPayload {
  if (!isObject(value)) {
    return {};
  }

  const reminderRaw = value.reminder;

  const reminder = isObject(reminderRaw)
    ? {
        title: typeof reminderRaw.title === "string" ? reminderRaw.title : undefined,
        dueAtIso: typeof reminderRaw.dueAtIso === "string" ? reminderRaw.dueAtIso : undefined,
        repeatDaily:
          typeof reminderRaw.repeatDaily === "boolean"
            ? reminderRaw.repeatDaily
            : undefined,
      }
    : undefined;

  return {
    rawText: typeof value.rawText === "string" ? value.rawText : undefined,
    reminder,
    sourceApp: typeof value.sourceApp === "string" ? value.sourceApp : undefined,
  };
}

function normalizeIsoDate(value: string | undefined): string | null {
  if (!value || !value.trim()) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toISOString();
}

function normalizeTitle(value: string | undefined, fallback: string): string {
  if (!value) {
    return fallback;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, 120) : fallback;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const sessionSecret = getCanvascopeSessionSecret();
  const bearerToken = getBearerToken(request.headers.get("authorization"));

  if (!bearerToken) {
    return NextResponse.json({ error: "Missing Bearer token." }, { status: 401 });
  }

  const accessToken = parseLectraAccessToken(bearerToken, sessionSecret);
  if (!accessToken || !accessToken.scopes.includes("reminders:write")) {
    return NextResponse.json({ error: "Invalid access token." }, { status: 401 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const body = parseReminderPushPayload(rawBody);
  if (!body.rawText || !body.rawText.trim()) {
    return NextResponse.json(
      { error: "rawText is required to generate a reminder." },
      { status: 400 },
    );
  }

  const parsedFromText = parseReminderFromText(body.rawText);
  const { reminder, error } = await addReminder({
    userId: accessToken.sub,
    rawText: body.rawText,
    title: normalizeTitle(body.reminder?.title, parsedFromText.title),
    dueAtIso:
      normalizeIsoDate(body.reminder?.dueAtIso) ?? parsedFromText.dueAtIso,
    repeatDaily:
      typeof body.reminder?.repeatDaily === "boolean"
        ? body.reminder.repeatDaily
        : parsedFromText.repeatDaily,
    sourceApp: body.sourceApp || "lectra-ios",
  });

  if (error || !reminder) {
    return NextResponse.json(
      { error: error ?? "Unable to save reminder." },
      { status: 503 },
    );
  }

  return NextResponse.json({ reminder }, { status: 201 });
}
