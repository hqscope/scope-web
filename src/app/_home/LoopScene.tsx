"use client";

import {
  m,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useRef, useState } from "react";

import { useCanPin } from "@/components/motion/useInView";

export type LoopStep = { name: string; title: string; copy: string };

/* Where the problem set sits at each stage, as % of the stage box. */
const STOPS = {
  browser: { left: 44, top: 26 },
  ipad: { left: 72, top: 19 },
  upload: { left: 30, top: 46 },
};

function Ink({ progress }: { progress: MotionValue<number> }) {
  const first = useTransform(progress, [0.4, 0.5], [0, 1]);
  const second = useTransform(progress, [0.48, 0.58], [0, 1]);
  const third = useTransform(progress, [0.56, 0.64], [0, 1]);
  // A zero-length path still paints its round cap as a dot, so each stroke
  // stays invisible until it starts drawing.
  const firstOn = useTransform(progress, [0.4, 0.405], [0, 1]);
  const secondOn = useTransform(progress, [0.48, 0.485], [0, 1]);
  const thirdOn = useTransform(progress, [0.56, 0.565], [0, 1]);

  return (
    <svg viewBox="0 0 120 150" className="loop-ink" aria-hidden="true">
      <m.path d="M14 40 C 40 30, 70 44, 104 36" style={{ pathLength: first, opacity: firstOn }} />
      <m.path
        d="M20 76 c 10 -14 24 -14 30 0 s 20 12 30 -2"
        style={{ pathLength: second, opacity: secondOn }}
      />
      <m.path
        d="M70 104 c -18 -10 -40 0 -34 14 c 6 14 36 12 42 -2 c 3 -8 -2 -14 -8 -14"
        style={{ pathLength: third, opacity: thirdOn }}
      />
    </svg>
  );
}

function Stage({ progress }: { progress: MotionValue<number> }) {
  const left = useTransform(
    progress,
    [0.18, 0.36, 0.7, 0.86],
    [`${STOPS.browser.left}%`, `${STOPS.ipad.left}%`, `${STOPS.ipad.left}%`, `${STOPS.upload.left}%`],
  );
  const top = useTransform(
    progress,
    [0.18, 0.36, 0.7, 0.86],
    [`${STOPS.browser.top}%`, `${STOPS.ipad.top}%`, `${STOPS.ipad.top}%`, `${STOPS.upload.top}%`],
  );
  const scale = useTransform(
    progress,
    [0.08, 0.18, 0.27, 0.36, 0.7, 0.78, 0.86, 0.94],
    [0.4, 0.8, 0.9, 1.18, 1.18, 0.9, 0.7, 0.3],
  );
  const docOpacity = useTransform(progress, [0.08, 0.14, 0.88, 0.94], [0, 1, 1, 0]);
  const rotate = useTransform(progress, [0.18, 0.36, 0.7, 0.86], [-3, 2, 2, -1]);
  const lift = useTransform(
    progress,
    [0.18, 0.27, 0.36, 0.7, 0.78, 0.86],
    [
      "0 10px 20px -14px rgb(16 19 63 / .5)",
      "0 40px 60px -20px rgb(16 19 63 / .55)",
      "0 14px 26px -14px rgb(16 19 63 / .5)",
      "0 14px 26px -14px rgb(16 19 63 / .5)",
      "0 40px 60px -20px rgb(16 19 63 / .55)",
      "0 10px 20px -14px rgb(16 19 63 / .5)",
    ],
  );

  const paletteOpacity = useTransform(progress, [0.3, 0.42], [1, 0]);
  const uploadOpacity = useTransform(progress, [0.62, 0.74], [0, 1]);
  const attached = useTransform(progress, [0.88, 0.94], [0, 1]);
  const ipadGlow = useTransform(progress, [0.32, 0.38, 0.68, 0.74], [0, 1, 1, 0]);

  return (
    <div className="loop-stage" aria-hidden="true">
      {/* The browser: a course page with the search palette over it. */}
      <div className="loop-browser">
        <div className="loop-browser-bar">
          <span />
          <span />
          <span />
          <b>Math 53, Fall</b>
        </div>
        <div className="loop-browser-body">
          <div className="loop-course-lines">
            <i />
            <i />
            <i />
            <i />
          </div>
          <m.div className="loop-palette" style={{ opacity: paletteOpacity }}>
            <div className="loop-palette-query">problem set 4</div>
            <div className="loop-palette-row loop-palette-row--on">Problem Set 4.pdf</div>
            <div className="loop-palette-row">Problem Set 4 due Thursday</div>
            <div className="loop-palette-row">Office hours this week</div>
          </m.div>
          <m.div className="loop-upload" style={{ opacity: uploadOpacity }}>
            <b>Problem Set 4</b>
            <span>Upload a file</span>
            <div className="loop-dropzone">
              <m.span style={{ opacity: attached }}>Problem Set 4 (annotated).pdf</m.span>
            </div>
          </m.div>
        </div>
      </div>

      {/* The iPad, running Lectra Notes. */}
      <div className="loop-ipad">
        <m.div className="loop-ipad-glow" style={{ opacity: ipadGlow }} />
        <div className="loop-ipad-screen" />
      </div>

      {/* The problem set itself, which makes the whole trip. */}
      <m.div
        className="loop-doc"
        style={{ left, top, scale, rotate, boxShadow: lift, opacity: docOpacity }}
      >
        <span className="loop-doc-title">Problem Set 4</span>
        <span className="loop-doc-lines">
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
        <Ink progress={progress} />
      </m.div>
    </div>
  );
}

function StepText({
  steps,
  active,
  pinned,
}: {
  steps: LoopStep[];
  active: number;
  pinned: boolean;
}) {
  return (
    <ol className="loop-steps" data-pinned={pinned}>
      {steps.map((step, index) => (
        <li
          key={step.name}
          className="loop-step"
          data-state={!pinned ? "on" : index === active ? "on" : "off"}
          aria-current={pinned && index === active ? "step" : undefined}
        >
          <span className="loop-step-num" aria-hidden="true">
            {index + 1}
          </span>
          <div>
            <h3>
              <span className="loop-step-name">{step.name}</span>
              <span className="loop-step-title">{step.title}</span>
            </h3>
            <p>{step.copy}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function LoopScene({ steps }: { steps: LoopStep[] }) {
  const reduceMotion = useReducedMotion();
  const canPin = useCanPin(560) && !reduceMotion;
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = value < 0.33 ? 0 : value < 0.72 ? 1 : 2;
    setActive((current) => (current === next ? current : next));
  });

  // Unpinned (short screens, reduced motion): the scene holds at the middle
  // of the trip, the problem set inked on the iPad, with every step
  // readable beside it.
  const still = useTransform(scrollYProgress, () => 0.66);

  return (
    <div
      ref={trackRef}
      className="loop-track"
      data-pinned={canPin}
      style={canPin ? { height: "320svh" } : undefined}
    >
      <div className="loop-sticky">
        <div className="shell loop-grid">
          <StepText steps={steps} active={active} pinned={canPin} />
          <Stage progress={canPin ? scrollYProgress : still} />
        </div>
      </div>
    </div>
  );
}
