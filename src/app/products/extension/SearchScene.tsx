"use client";

import Image from "next/image";
import { m } from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useEffect, useState } from "react";

import PenMark from "@/components/motion/PenMark";
import { useSeenOnce } from "@/components/motion/useInView";

export type SlipRow = { tag: string; title: string; meta: string };

const EASE = [0.2, 0.7, 0.1, 1] as const;

/**
 * The extension's one scene: the real screenshot of Scope open over a Canvas
 * dashboard, with the pen circling the shortcut, and a paper slip beside it
 * where a search types itself out and the pen circles the lecture it finds.
 * Reduced motion shows the finished search.
 */
export default function SearchScene({
  query,
  rows,
  footnote,
}: {
  query: string;
  rows: SlipRow[];
  footnote: string;
}) {
  const reduceMotion = useReducedMotion();
  const [ref, seen] = useSeenOnce<HTMLDivElement>(0.4);
  const [typedCount, setTyped] = useState(0);
  const [shownState, setShown] = useState(false);

  useEffect(() => {
    if (reduceMotion || !seen) return;

    const timers: number[] = [];
    for (let index = 1; index <= query.length; index += 1) {
      timers.push(window.setTimeout(() => setTyped(index), 300 + index * 45));
    }
    timers.push(window.setTimeout(() => setShown(true), 450 + query.length * 45));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [seen, reduceMotion, query]);

  // Reduced motion skips the typing and shows the finished search.
  const typed = reduceMotion ? query.length : typedCount;
  const shown = Boolean(reduceMotion) || shownState;
  const done = typed >= query.length;

  return (
    <div className="search-scene" ref={ref}>
      <div className="search-shot shot">
        <Image
          src="/brand/canvascope-extension-screenshot.png"
          alt="Scope's search open over a blurred Canvas dashboard, listing recently opened items from three courses."
          width={1919}
          height={915}
          quality={90}
          sizes="(max-width: 900px) 100vw, 1100px"
        />
        <span className="search-shot-key" aria-hidden="true">
          <PenMark kind="circle" inset="-6px -10px" delay={0.2} />
        </span>
      </div>

      <div className="search-slip paper" aria-hidden="true">
        <p className="search-slip-query">
          <span>{query.slice(0, typed)}</span>
          <span className="search-slip-caret" data-done={done || undefined} />
        </p>
        <ul>
          {rows.map((row, index) => (
            <m.li
              key={row.title}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.45, delay: index * 0.12, ease: EASE }}
            >
              <span className="search-slip-tag">{row.tag}</span>
              <span className="search-slip-title">
                {index === 0 ? (
                  <span className="search-slip-hit">
                    {row.title}
                    <PenMark
                      kind="circle"
                      inset="-10px -14px -12px -12px"
                      delay={0.5}
                      play={shown}
                    />
                  </span>
                ) : (
                  row.title
                )}
                <small>{row.meta}</small>
              </span>
            </m.li>
          ))}
        </ul>
        <p className="search-slip-foot">{footnote}</p>
      </div>
    </div>
  );
}
