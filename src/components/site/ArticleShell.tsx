"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

export type OutlineItem = { id: string; label: string };

/**
 * Long-form layout shared by guides, comparisons, newsroom posts, and legal
 * pages: an "On this page" outline beside the reading column on wide screens,
 * a collapsible outline above it on narrow ones. Children render inside
 * `.prose-scope`, so plain h2/h3/p/ul/table markup is styled automatically.
 * Section headings need ids that match the outline.
 */
export default function ArticleShell({
  outline = [],
  outlineLabel = "On this page",
  children,
}: {
  outline?: OutlineItem[];
  outlineLabel?: string;
  children: ReactNode;
}) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const headings = outline
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
  }, [outline]);

  if (outline.length === 0) {
    return (
      <div className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-8">
        <div className="prose-scope max-w-[70ch]">{children}</div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-x-16 px-5 pb-20 sm:px-8 lg:grid-cols-[14rem_minmax(0,1fr)]">
      <details className="group mb-8 rounded-2xl bg-wash px-5 py-4 lg:hidden">
        <summary className="cursor-pointer list-none text-[14.5px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
          {outlineLabel}
        </summary>
        <ol className="mt-3 space-y-2">
          {outline.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="text-[14.5px] text-stone hover:text-ink">
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </details>

      <nav aria-label={outlineLabel} className="hidden lg:block">
        <div className="sticky top-24">
          <p className="text-[13.5px] font-semibold text-ink">{outlineLabel}</p>
          <ol className="mt-4 space-y-1 border-l border-line">
            {outline.map((item) => {
              const active = current === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active ? "true" : undefined}
                    className={`-ml-px block border-l-2 py-1.5 pl-4 text-[14px] leading-snug transition-colors ${
                      active ? "border-red text-ink" : "border-transparent text-stone hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </nav>

      <div className="prose-scope min-w-0 max-w-[70ch]">{children}</div>
    </div>
  );
}
