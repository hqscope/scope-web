"use client";

import { useSyncExternalStore } from "react";

import { GOOGLE_PREFERRED_SOURCE_URL } from "@/lib/site";

import { StarIcon } from "./Icons";

const STORAGE_KEY = "scope.preferred-source.v1";
const SYNC_EVENT = "scope:preferred-source";

function subscribe(onChange: () => void) {
  window.addEventListener(SYNC_EVENT, onChange);
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
    // Private windows and blocked site data throw. The badge still works as
    // a plain link, it just never fills in.
    return false;
  }
}

function mark() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Nothing to persist to.
  }
  window.dispatchEvent(new Event(SYNC_EVENT));
}

/**
 * Google Preferred Sources link. It carries no Google mark and promises
 * nothing about ranking. It opens Google's own picker with Scope in it, and
 * the reader decides there. The filled star records this browser's visit,
 * never a confirmation from Google, which never reports back.
 */
export default function PreferredSource({
  label = "Make Scope a preferred source on Google",
  markedLabel = "Scope is a preferred source",
}: {
  label?: string;
  markedLabel?: string;
}) {
  const marked = useSyncExternalStore(subscribe, isMarked, () => false);

  return (
    <a
      href={GOOGLE_PREFERRED_SOURCE_URL}
      target="_blank"
      rel="noreferrer"
      className="preferred-source"
      data-marked={marked}
      onClick={mark}
    >
      <StarIcon filled={marked} />
      <span>{marked ? markedLabel : label}</span>
    </a>
  );
}
