"use client";

import { useEffect, useRef, useState } from "react";

/**
 * True while the element is on screen. Scenes use it to pause loops that
 * nobody can see, which keeps a phone's battery and main thread free.
 */
export function useOnScreen<T extends Element>(rootMargin = "0px") {
  const ref = useRef<T>(null);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, onScreen] as const;
}

/** True once the element has been seen, and stays true. */
export function useSeenOnce<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || seen) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [seen, threshold]);

  return [ref, seen] as const;
}

/**
 * Whether the viewport can hold a pinned scroll scene. Short landscape
 * phones cannot, so pinned scenes fall back to a plain stack there.
 */
export function useCanPin(minHeight = 560) {
  const [canPin, setCanPin] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      `(min-height: ${minHeight}px) and (prefers-reduced-motion: no-preference)`,
    );
    const update = () => setCanPin(query.matches);
    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, [minHeight]);

  return canPin;
}
