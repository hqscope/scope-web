"use client";

import { m, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useRef } from "react";

import PenMark from "@/components/motion/PenMark";

export type DirectionStage = {
  id: "today" | "next" | "eventually";
  when: string;
  status: string;
  lead: string;
  copy: string;
  /** Only what ships today is written in ink. */
  shipping: boolean;
};

const PENCIL = "#8d8277";
const INK = "#241e18";

/**
 * The long roadmap. Today is in ink and underlined in pen. Plans are in
 * pencil, and a pencilled row inks itself in only while it sits in the
 * middle of the screen, then fades back to graphite: readable, never final.
 */
function Stage({ stage }: { stage: DirectionStage }) {
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

  const pencilled = !stage.shipping;
  const style = pencilled && !reduceMotion ? { color } : undefined;

  return (
    <li
      ref={ref}
      id={stage.id}
      className="co-roadmap-row"
      data-pencil={pencilled || undefined}
    >
      <div className="co-roadmap-when">
        <span className="co-roadmap-name">
          {stage.when}
          {pencilled ? null : <PenMark kind="underline" inset="auto -6px -14px -4px" />}
        </span>
        <span className="co-roadmap-status">{stage.status}</span>
      </div>
      <div>
        <m.p className="co-roadmap-lead" style={style}>
          {stage.lead}
        </m.p>
        <m.p className="co-roadmap-copy" style={style}>
          {stage.copy}
        </m.p>
      </div>
    </li>
  );
}

export default function DirectionRoadmap({ stages }: { stages: DirectionStage[] }) {
  return (
    <ol className="co-roadmap">
      {stages.map((stage) => (
        <Stage key={stage.id} stage={stage} />
      ))}
    </ol>
  );
}
