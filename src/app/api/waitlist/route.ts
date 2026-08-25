import { NextRequest, NextResponse } from "next/server";

import { AGENT_WORKSPACE_WAITLIST_SOURCE } from "@/lib/site";
import { createServerWriteSupabaseClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_HEADER_LENGTH = 512;
const MIN_FILL_TIME_MS = 2500;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;

const CONFIRMED_PATH = "/products/agent-workspace/waitlist-confirmed";
const FORM_RETRY_PATH = "/products/agent-workspace#early-access";

// Best-effort rate limiter: this Map lives per serverless instance, so a cold
// start or a second instance resets the counts. That is fine — it is a
// nuisance filter, not a security boundary; the honeypot and time trap do the
// heavier bot lifting.
const recentPostsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Keep the map from growing without bound on long-lived instances.
  if (recentPostsByIp.size > 1000) {
    for (const [key, hits] of recentPostsByIp) {
      if (hits.every((at) => now - at >= RATE_LIMIT_WINDOW_MS)) {
        recentPostsByIp.delete(key);
      }
    }
  }

  const hits = (recentPostsByIp.get(ip) ?? []).filter(
    (at) => now - at < RATE_LIMIT_WINDOW_MS,
  );
  hits.push(now);
  recentPostsByIp.set(ip, hits);
  return hits.length > RATE_LIMIT_MAX;
}

// The honeypot field's name is deliberately meaningless: password managers
// autofill hidden fields called "company", which would silently drop real
// signups.
const HONEYPOT_FIELD = "aw_ref_code";

interface WaitlistSubmission {
  email: string;
  company: string;
  startedAt: number | null;
  source: string | null;
}

function parseJsonSubmission(value: unknown): WaitlistSubmission {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return { email: "", company: "", startedAt: null, source: null };
  }

  const payload = value as Record<string, unknown>;

  const honeypot = payload[HONEYPOT_FIELD];

  return {
    email: typeof payload.email === "string" ? payload.email : "",
    company: typeof honeypot === "string" ? honeypot : "",
    startedAt:
      typeof payload.startedAt === "number" && Number.isFinite(payload.startedAt)
        ? payload.startedAt
        : null,
    source: typeof payload.source === "string" ? payload.source : null,
  };
}

function parseFormSubmission(data: FormData): WaitlistSubmission {
  const email = data.get("email");
  const company = data.get(HONEYPOT_FIELD);
  const source = data.get("source");

  return {
    email: typeof email === "string" ? email : "",
    company: typeof company === "string" ? company : "",
    startedAt: null,
    source: typeof source === "string" ? source : null,
  };
}

function truncateHeader(value: string | null): string | null {
  if (!value) {
    return null;
  }
  return value.length > MAX_HEADER_LENGTH ? value.slice(0, MAX_HEADER_LENGTH) : value;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const contentType = request.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  const redirectTo = (path: string) =>
    NextResponse.redirect(new URL(path, request.url), 303);
  const silentSuccess = () =>
    isJson
      ? NextResponse.json({ status: "subscribed" }, { status: 200 })
      : redirectTo(CONFIRMED_PATH);
  const invalid = (message: string) =>
    isJson
      ? NextResponse.json({ error: message }, { status: 400 })
      : redirectTo(FORM_RETRY_PATH);

  const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwardedFor.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a minute." },
      { status: 429 },
    );
  }

  let submission: WaitlistSubmission;
  if (isJson) {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }
    submission = parseJsonSubmission(body);
  } else {
    let data: FormData;
    try {
      data = await request.formData();
    } catch {
      return redirectTo(FORM_RETRY_PATH);
    }
    submission = parseFormSubmission(data);
  }

  // Honeypot: real people never see the "company" field.
  if (submission.company.trim() !== "") {
    return silentSuccess();
  }

  // Time trap (JSON path only): a human takes longer than 2.5s from page
  // load to submit; a missing or too-fresh timestamp reads as a bot.
  if (isJson) {
    if (
      submission.startedAt === null ||
      Date.now() - submission.startedAt < MIN_FILL_TIME_MS
    ) {
      return silentSuccess();
    }
  }

  const email = submission.email.trim().toLowerCase();
  if (
    email.length === 0 ||
    email.length > MAX_EMAIL_LENGTH ||
    !EMAIL_PATTERN.test(email)
  ) {
    return invalid("Enter a valid email address.");
  }

  if (submission.source !== null && submission.source !== AGENT_WORKSPACE_WAITLIST_SOURCE) {
    return invalid("Invalid source.");
  }
  const source = submission.source ?? AGENT_WORKSPACE_WAITLIST_SOURCE;

  const supabase = createServerWriteSupabaseClient();

  const { error } = await supabase.from("agent_workspace_waitlist").insert({
    email,
    source,
    user_agent: truncateHeader(request.headers.get("user-agent")),
    referrer: truncateHeader(request.headers.get("referer")),
  });

  if (error) {
    if (error.code === "23505") {
      return isJson
        ? NextResponse.json({ status: "already_subscribed" }, { status: 200 })
        : redirectTo(CONFIRMED_PATH);
    }
    return NextResponse.json(
      { error: "Unable to join the waitlist right now." },
      { status: 502 },
    );
  }

  return isJson
    ? NextResponse.json({ status: "subscribed" }, { status: 201 })
    : redirectTo(CONFIRMED_PATH);
}
