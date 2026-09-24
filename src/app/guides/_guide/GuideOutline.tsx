"use client";

import { useEffect, useState } from "react";

export type OutlineItem = { id: string; label: string };

/**
 * The guide's table of contents, sticky beside the text on wide screens.
 * The section you are reading gets the pen line.
 */
export default function GuideOutline({ items }: { items: OutlineItem[] }) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);
    if (sections.length === 0) return;

    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        const first = sections.find((section) => visible.get(section.id));
        if (first) setCurrent(first.id);
      },
      // A band across the upper part of the screen: a section counts as the
      // one being read once its top is under the header.
      { rootMargin: "-20% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="outline" aria-label="On this page">
      <p>On this page</p>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} aria-current={current === item.id ? "true" : undefined}>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
