"use client";

import { useEffect, useState } from "react";

export type OutlineItem = { id: string; label: string };

/**
 * The outline beside a long legal document. The section being read is marked
 * with the pen line from site.css. Without JS it is a plain list of anchors.
 */
export default function LegalOutline({
  items,
  label = "On this page",
}: {
  items: OutlineItem[];
  label?: string;
}) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setCurrent(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -65% 0px" },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="outline" aria-label={label}>
      <p>{label}</p>
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
