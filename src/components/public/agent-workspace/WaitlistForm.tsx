"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import { AGENT_WORKSPACE_WAITLIST_SOURCE } from "@/lib/site";

import "./waitlist.css";

type FormPhase = "idle" | "submitting" | "success" | "already" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COPY = {
  success: "You're on the list. We'll save you a desk.",
  already: "You're already on the list. Sit tight.",
  invalid: "That email doesn't look right. Mind checking it?",
  serverError: "Something went wrong on our end. Try again in a moment.",
} as const;

function readStatus(value: unknown): string | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }
  const status = (value as Record<string, unknown>).status;
  return typeof status === "string" ? status : null;
}

export default function WaitlistForm() {
  const [phase, setPhase] = useState<FormPhase>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const startedAtRef = useRef<number | null>(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const isDone = phase === "success" || phase === "already";
  const hasError = phase === "error";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phase === "submitting") {
      return;
    }

    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const honeypot = String(data.get("aw_ref_code") ?? "");

    if (email.length === 0 || email.length > 254 || !EMAIL_PATTERN.test(email)) {
      setPhase("error");
      setStatusMessage(COPY.invalid);
      return;
    }

    setPhase("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          // Must match the honeypot field name the route reads; sending it
          // under any other key makes the trap silently inert.
          aw_ref_code: honeypot,
          startedAt: startedAtRef.current ?? Date.now(),
          source: AGENT_WORKSPACE_WAITLIST_SOURCE,
        }),
      });

      if (response.ok) {
        const payload: unknown = await response.json().catch(() => null);
        if (readStatus(payload) === "already_subscribed") {
          setPhase("already");
          setStatusMessage(COPY.already);
        } else {
          setPhase("success");
          setStatusMessage(COPY.success);
        }
        return;
      }

      setPhase("error");
      setStatusMessage(response.status === 400 ? COPY.invalid : COPY.serverError);
    } catch {
      setPhase("error");
      setStatusMessage(COPY.serverError);
    }
  }

  return (
    <div className="aw-waitlist">
      {!isDone && (
        <>
          <form
            className="aw-waitlist-form"
            method="post"
            action="/api/waitlist"
            onSubmit={handleSubmit}
          >
            <label className="aw-sr-only" htmlFor="aw-waitlist-email">
              Email address
            </label>
            <input
              id="aw-waitlist-email"
              className="aw-waitlist-input"
              name="email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              placeholder="you@company.com"
              aria-invalid={hasError || undefined}
              aria-describedby={hasError ? "aw-waitlist-status" : undefined}
            />
            {/* Honeypot: hidden from people, tempting to bots. The name is
                deliberately meaningless — password managers happily autofill a
                hidden field called "company" and would drop real signups. */}
            <div className="aw-waitlist-hp" aria-hidden="true">
              <input
                type="text"
                name="aw_ref_code"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
            </div>
            <button
              type="submit"
              className="aw-waitlist-submit"
              disabled={phase === "submitting"}
              aria-busy={phase === "submitting" || undefined}
            >
              Get early access
            </button>
          </form>
          <p className="aw-waitlist-micro">
            One email, when your invite is ready. No newsletter.
          </p>
        </>
      )}
      <p
        className="aw-waitlist-status"
        id="aw-waitlist-status"
        role="status"
        aria-live="polite"
        data-tone={isDone ? "done" : hasError ? "error" : undefined}
      >
        {statusMessage}
      </p>
    </div>
  );
}
