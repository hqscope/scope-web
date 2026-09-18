"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Pulls every [data-focus] element into focus the first time it enters the
 * viewport. The blurred starting state lives in CSS behind
 * html[data-motion="on"], which the pre-paint script in the root layout sets.
 * Marking html[data-focus-ready] tells that script the observer is alive.
 */
export default function FocusObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-focus-ready", "");

    if (root.getAttribute("data-motion") !== "on") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-sharp");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.2 },
    );

    const watch = () => {
      document
        .querySelectorAll<HTMLElement>("[data-focus]:not(.is-sharp)")
        .forEach((element) => observer.observe(element));
    };

    watch();

    // Client navigations and streamed segments add headings after mount.
    const mutations = new MutationObserver(watch);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
