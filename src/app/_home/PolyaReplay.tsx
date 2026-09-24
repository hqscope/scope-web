"use client";

import {
  AnimatePresence,
  LayoutGroup,
  m,
} from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useEffect, useState } from "react";

import { useSeenOnce } from "@/components/motion/useInView";

const QUESTION = "Why does the sign flip in step 3 of the substitution?";
const ANSWER =
  "Look at what happens to du when u = cos θ. Before checking the solutions, try writing out the new bounds first. What direction are they running?";
const SOURCE = "Lecture 14, slide 22";

type Phase = "idle" | "asked" | "answering" | "cited" | "linked";

const EASE = [0.2, 0.7, 0.1, 1] as const;

/**
 * A single tutoring exchange that plays once when it scrolls in: the
 * question, the hint writing itself out, then the citation chip travelling
 * to the slide it came from. Reduced motion shows the finished exchange.
 */
export default function PolyaReplay() {
  const reduceMotion = useReducedMotion();
  const [ref, seen] = useSeenOnce<HTMLDivElement>(0.45);
  const [playedPhase, setPhase] = useState<Phase>("idle");
  const [playedTyped, setTyped] = useState(0);

  // Reduced motion shows the finished exchange, derived rather than set.
  const phase: Phase = reduceMotion ? "linked" : playedPhase;
  const typed = reduceMotion ? ANSWER.length : playedTyped;

  useEffect(() => {
    if (reduceMotion || !seen) return;

    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    at(200, () => setPhase("asked"));
    at(1100, () => setPhase("answering"));

    // The answer writes out word by word, the way a tutor would say it.
    const words = ANSWER.split(" ");
    let length = 0;
    words.forEach((word, index) => {
      length += (index === 0 ? 0 : 1) + word.length;
      const end = length;
      at(1300 + index * 70, () => setTyped(end));
    });

    const done = 1300 + words.length * 70;
    at(done + 300, () => setPhase("cited"));
    at(done + 1500, () => setPhase("linked"));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [seen, reduceMotion]);

  const showQuestion = phase !== "idle";
  const showAnswer = phase === "answering" || phase === "cited" || phase === "linked";
  const chipInAnswer = phase === "cited";
  const chipOnSlide = phase === "linked";

  return (
    <div className="polya" ref={ref}>
      <LayoutGroup>
        <div className="polya-chat">
          <p className="polya-course">Math 53, guided help</p>

          <AnimatePresence>
            {showQuestion ? (
              <m.p
                className="polya-q"
                initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {QUESTION}
              </m.p>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {showAnswer ? (
              <m.div
                className="polya-a"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p>
                  <span>{ANSWER.slice(0, typed)}</span>
                  <span className="polya-rest" aria-hidden="true">
                    {ANSWER.slice(typed)}
                  </span>
                </p>
                <div className="polya-source-slot">
                  {chipInAnswer ? (
                    <m.span layoutId="polya-cite" className="chip chip-hi polya-cite">
                      {SOURCE}
                    </m.span>
                  ) : null}
                </div>
              </m.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="polya-slide" data-linked={chipOnSlide}>
          <div className="polya-slide-face" aria-hidden="true">
            <b>u-substitution</b>
            <span>u = cos θ</span>
            <span>du = −sin θ dθ</span>
            <span className="polya-slide-mark">bounds flip: θ = 0 → u = 1</span>
          </div>
          <div className="polya-slide-caption">
            {chipOnSlide ? (
              <m.span
                layoutId="polya-cite"
                className="chip chip-hi polya-cite"
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
              >
                {SOURCE}
              </m.span>
            ) : (
              <span className="polya-slide-label">{SOURCE}</span>
            )}
          </div>
        </div>
      </LayoutGroup>
    </div>
  );
}
