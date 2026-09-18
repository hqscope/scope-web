"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/**
 * Whether the visitor asked for reduced motion, safe to branch on during
 * render. Motion's own hook reads the media query immediately on the client,
 * so any markup that depends on it differs from the server's and hydration
 * fails. This one reports false for the server render and the hydrating
 * render, then updates. Use it everywhere instead of motion's
 * useReducedMotion.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
