"use client";

import { useEffect } from "react";

/**
 * Buttons lean a few pixels toward a mouse pointer. Only on fine pointers
 * with motion allowed. Touch never sees it, and nothing depends on it.
 * One delegated listener serves every .btn on the page.
 */
export default function Magnet() {
  useEffect(() => {
    const query = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!query.matches) return;

    let current: HTMLElement | null = null;

    const release = () => {
      if (current) {
        current.style.removeProperty("--mx");
        current.style.removeProperty("--my");
        current = null;
      }
    };

    const onMove = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(".btn");
      if (target !== current) release();
      if (!target) return;

      current = target;
      const box = target.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      target.style.setProperty("--mx", `${(dx / box.width) * 6}px`);
      target.style.setProperty("--my", `${(dy / box.height) * 5}px`);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", release);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", release);
      release();
    };
  }, []);

  return null;
}
