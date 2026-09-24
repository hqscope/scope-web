"use client";

import { m } from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

import { useSeenOnce } from "@/components/motion/useInView";

/* The reading both screens show, drawn on a 416 x 256 box. */
const SCREEN_W = 416;
const SCREEN_H = 256;
const IPAD_SCALE = 0.64;

const LINES = [
  { y: 92, w: 150 },
  { y: 106, w: 164 },
  { y: 120, w: 132 },
  { y: 148, w: 158 },
  { y: 162, w: 146 },
  { y: 176, w: 120 },
  { y: 204, w: 160 },
  { y: 218, w: 110 },
];

const STROKE = "M126 130c26-3 66-4 102-2 12 1 24 1 36 3";
const TICK = "M300 158c3 2 5 5 7 8 4-8 9-14 16-18";

const EASE = [0.65, 0, 0.25, 1] as const;

function Reading({ drawn, delay, still }: { drawn: boolean; delay: number; still: boolean }) {
  const draw = (extra: number) => ({
    initial: still ? false : { pathLength: 0, opacity: 0 },
    animate: drawn || still ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    transition: {
      pathLength: { duration: 0.9, delay: delay + extra, ease: EASE },
      opacity: { duration: 0.05, delay: delay + extra },
    },
  });

  return (
    <>
      <rect width={SCREEN_W} height={SCREEN_H} className="mirror-desktop" />
      <rect width={SCREEN_W} height={22} className="mirror-bar" />
      <circle cx={14} cy={11} r={4} className="mirror-dot" />
      <circle cx={28} cy={11} r={4} className="mirror-dot" />
      <circle cx={42} cy={11} r={4} className="mirror-dot" />
      <rect x={108} y={36} width={214} height={212} rx={3} className="mirror-page" />
      <rect x={126} y={58} width={96} height={10} rx={2} className="mirror-head" />
      {LINES.map((line) => (
        <rect
          key={line.y}
          x={126}
          y={line.y}
          width={line.w}
          height={5}
          rx={2}
          className="mirror-line"
        />
      ))}
      <m.path d={STROKE} className="mirror-ink" {...draw(0)} />
      <m.path d={TICK} className="mirror-ink" {...draw(0.8)} />
    </>
  );
}

/**
 * The Mac page's one scene: a Mac with a reading open and an iPad in front
 * of it showing the same screen. A Pencil stroke goes down on the iPad, and
 * a moment later the same stroke lands on the Mac. Reduced motion shows the
 * finished marks on both.
 */
export default function MirrorScene({ caption }: { caption: string }) {
  const reduceMotion = useReducedMotion();
  const [ref, seen] = useSeenOnce<HTMLDivElement>(0.4);
  const still = Boolean(reduceMotion);

  return (
    <figure className="mirror" ref={ref}>
      <svg viewBox="0 0 640 460" className="mirror-svg" aria-hidden="true">
        {/* The Mac. */}
        <rect x={30} y={10} width={440} height={280} rx={16} className="mirror-bezel" />
        <g transform="translate(42 22)">
          <Reading drawn={seen} delay={0.9} still={still} />
        </g>
        <path d="M0 300h500l-18 16H18z" className="mirror-base" />

        {/* The iPad, held in front of it. */}
        <g transform="translate(316 232) rotate(-3)">
          <rect
            width={SCREEN_W * IPAD_SCALE + 24}
            height={SCREEN_H * IPAD_SCALE + 24}
            rx={18}
            className="mirror-bezel mirror-ipad"
          />
          <g transform={`translate(12 12) scale(${IPAD_SCALE})`}>
            <Reading drawn={seen} delay={0.3} still={still} />
          </g>
        </g>

        {/* The Pencil, resting where the stroke ended. */}
        <g transform="translate(507 334) rotate(38)">
          <rect x={0} y={-4} width={120} height={8} rx={3} className="mirror-pencil" />
          <path d="M0 -4 L-12 0 L0 4z" className="mirror-pencil-tip" />
        </g>
      </svg>
      <figcaption className="margin-note">{caption}</figcaption>
    </figure>
  );
}
