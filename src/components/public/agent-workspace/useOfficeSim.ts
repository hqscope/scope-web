"use client";

/**
 * React bindings for the office simulation.
 *
 * The store is created once per demo instance (a `useRef` initialiser, so two
 * demos on one page never share a room). The engine only ever starts from an
 * effect, which is what keeps the server render and the first client render
 * byte-identical — and it never starts at all when the visitor has asked for
 * less motion.
 */

import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";

import { createOfficeStore, type OfficeMeta, type OfficeStore } from "./sim/store";
import type { WorkerState } from "./sim/types";

export function useOfficeStore(seed: number): OfficeStore {
  // Lazy state initialiser rather than a ref: same "build it once per demo"
  // guarantee, without reading a ref during render.
  const [store] = useState(() => createOfficeStore(seed));
  return store;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Runs the engine while the office is on screen and the tab is in front, and
 * flips `data-resting` on the root — the single attribute that freezes every
 * animation in the room.
 *
 * Written straight to the DOM rather than through React state: whether the
 * office is resting is a fact about the page, not about the render tree, and
 * keeping it out of state means scrolling past never re-renders anything.
 */
export function useOfficeRuntime(
  store: OfficeStore,
  rootRef: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      store.stop();
      return;
    }

    let inFront = !document.hidden;
    let onScreen = true;

    const apply = (): void => {
      const shouldRun = inFront && onScreen;
      root.dataset.resting = shouldRun ? "false" : "true";
      if (shouldRun) store.start();
      else store.stop();
    };

    const onVisibility = (): void => {
      inFront = !document.hidden;
      apply();
    };

    document.addEventListener("visibilitychange", onVisibility);

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      // The observer fires once on observe(), which is what starts the room.
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) onScreen = entry.isIntersecting;
          apply();
        },
        { threshold: 0.05 },
      );
      observer.observe(root);
    } else {
      store.start();
    }

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (observer) observer.disconnect();
      store.stop();
      root.dataset.resting = "false";
    };
  }, [store, rootRef]);
}

export function useWorker(store: OfficeStore, id: string): WorkerState | null {
  const subscribe = useCallback(
    (listener: () => void) => store.subscribeWorker(id, listener),
    [store, id],
  );
  const getSnapshot = useCallback(() => store.getWorker(id), [store, id]);
  const getServerSnapshot = useCallback(
    () => store.getInitialWorker(id),
    [store, id],
  );
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useWorkerIds(store: OfficeStore): readonly string[] {
  const subscribe = useCallback(
    (listener: () => void) => store.subscribeIds(listener),
    [store],
  );
  const getSnapshot = useCallback(() => store.getIds(), [store]);
  const getServerSnapshot = useCallback(() => store.getInitialIds(), [store]);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useOfficeMeta(store: OfficeStore): OfficeMeta {
  const subscribe = useCallback(
    (listener: () => void) => store.subscribeMeta(listener),
    [store],
  );
  const getSnapshot = useCallback(() => store.getMeta(), [store]);
  const getServerSnapshot = useCallback(() => store.getInitialMeta(), [store]);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
