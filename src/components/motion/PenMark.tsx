"use client";

import {
  m,
} from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

import { useSeenOnce } from "./useInView";

/* Hand-drawn paths on a 200 x 60 box, stretched to whatever they mark. */
const PATHS = {
  circle:
    "M24 10C62 1 152 2 188 13s9 35-40 41S13 56 7 38 19 8 60 5",
  underline: "M4 44c40-5 92-8 150-6 14 1 28 2 42 4",
  double: "M4 40c52-4 110-6 190-2M16 52c46-3 96-4 170 0",
  strike: "M4 32c58-3 124-3 192 0",
} as const;

export type PenMarkKind = keyof typeof PATHS;

/**
 * A red pen mark that draws itself the first time it scrolls into view.
 * Place it inside a positioned element; `inset` sets where it sits relative
 * to that element. It is decoration only, so it is hidden from assistive tech.
 */
export default function PenMark({
  kind = "underline",
  inset = "-10px -14px",
  delay = 0,
  play,
  className,
}: {
  kind?: PenMarkKind;
  inset?: string;
  delay?: number;
  /** Drive the mark from outside instead of by scroll. */
  play?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [ref, seen] = useSeenOnce<HTMLSpanElement>(0.6);
  const drawn = play ?? seen;

  // The box is a span, not the svg itself: an absolutely positioned svg is a
  // replaced element and keeps its intrinsic width instead of stretching
  // between its left and right offsets. The stroke is drawn in full and
  // revealed by a left-to-right wipe. Animating pathLength on a stretched,
  // non-scaling stroke leaves a gap in wide marks.
  const shown = drawn || reduceMotion;
  return (
    <m.span
      ref={ref}
      className={className ? `pen-mark ${className}` : "pen-mark"}
      aria-hidden="true"
      style={{ inset }}
      initial={reduceMotion ? false : { clipPath: "inset(-30% 100% -30% -4%)" }}
      animate={{
        clipPath: shown ? "inset(-30% -4% -30% -4%)" : "inset(-30% 100% -30% -4%)",
      }}
      transition={{ duration: 0.75, delay, ease: [0.65, 0, 0.25, 1] }}
    >
      <svg viewBox="0 0 200 60" preserveAspectRatio="none" width="100%" height="100%">
        <path d={PATHS[kind]} vectorEffect="non-scaling-stroke" />
      </svg>
    </m.span>
  );
}
