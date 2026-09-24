"use client";

import {
  m,
  useScroll,
  useTransform,
} from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useRef } from "react";

import PenMark from "@/components/motion/PenMark";

export type RoadmapRow = {
  when: string;
  status: string;
  copy: string;
  /** 0 ships today and is written in ink. Anything else is pencilled in. */
  distance: 0 | 1 | 2;
};

const PENCIL = "#8d8277";
const INK = "#241e18";

/**
 * The roadmap on paper. What ships today is written in ink and ticked in
 * pen. Plans are pencilled in: graphite, readable, and plainly not final.
 * A pencilled row inks itself in only while it sits in the middle of the
 * screen, then goes back to pencil.
 */
function Row({ row }: { row: RoadmapRow }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const color = useTransform(
    scrollYProgress,
    [0.2, 0.42, 0.58, 0.8],
    [PENCIL, INK, INK, PENCIL],
  );

  const pencilled = row.distance > 0;

  return (
    <li ref={ref} className="roadmap-row" data-pencil={pencilled || undefined}>
      <div className="roadmap-when">
        <span className="roadmap-name">
          {row.when}
          {!pencilled ? <PenMark kind="underline" inset="auto -6px -12px -4px" /> : null}
        </span>
        <span className="roadmap-status">{row.status}</span>
      </div>
      <m.p
        className="roadmap-copy"
        style={pencilled && !reduceMotion ? { color } : undefined}
      >
        {row.copy}
      </m.p>
    </li>
  );
}

export default function Roadmap({ rows }: { rows: RoadmapRow[] }) {
  return (
    <ol className="roadmap">
      {rows.map((row) => (
        <Row key={row.when} row={row} />
      ))}
    </ol>
  );
}
