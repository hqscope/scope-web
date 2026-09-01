"use client";

import { useSyncExternalStore } from "react";
import { Star } from "lucide-react";

import { GOOGLE_PREFERRED_SOURCE_URL } from "@/lib/site";

/** "on-deep" restyles the badge for the espresso footer band. */
export type PreferredSourceTone = "paper" | "on-deep";

const STORAGE_KEY = "scope.preferred-source.v1";

/** Fires when one badge is marked, so the others on the page follow. */
const SYNC_EVENT = "scope:preferred-source";

function subscribe(onChange: () => void) {
  window.addEventListener(SYNC_EVENT, onChange);
  // Another tab.
  window.addEventListener("storage", onChange);

  return () => {
    window.removeEventListener(SYNC_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function isMarked(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    // Private windows and blocked site data both throw. Fall back to the
    // unmarked badge, which is still a working link.
    return false;
  }
}

/** The server has no idea what this browser remembers. */
function isMarkedOnServer(): boolean {
  return false;
}

function mark() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Nothing to persist to, so the badge just never fills in.
  }
  window.dispatchEvent(new Event(SYNC_EVENT));
}

/**
 * Google Preferred Sources badge.
 *
 * Deliberately not dressed as a Google control: it carries no Google mark and
 * makes no promise about ranking. It says what it does — opens Google's picker
 * with Scope in it — and the reader decides there, on Google's own surface.
 *
 * Once followed, the badge stays marked on this browser. Google never tells us
 * how the picker ended, so the marked state records the reader's own visit, not
 * a confirmation from Google; the badge stays a live link so a second click
 * reopens the picker. It renders as a plain link on the server, so it still
 * works with JavaScript off — it just never fills in.
 */
export default function PreferredSourceLink({
  tone = "paper",
  label = "Make Scope a preferred source on Google",
  markedLabel = "Scope is a preferred source",
}: {
  tone?: PreferredSourceTone;
  label?: string;
  markedLabel?: string;
}) {
  const marked = useSyncExternalStore(subscribe, isMarked, isMarkedOnServer);

  const className = [
    "preferred-source",
    tone === "on-deep" ? "preferred-source--on-deep" : null,
    marked ? "is-marked" : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={GOOGLE_PREFERRED_SOURCE_URL}
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={mark}
    >
      <Star
        className="h-4 w-4"
        fill={marked ? "currentColor" : "none"}
        aria-hidden="true"
      />
      <span>{marked ? markedLabel : label}</span>
    </a>
  );
}
