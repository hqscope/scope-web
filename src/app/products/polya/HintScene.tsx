"use client";

import { m } from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";

import PenMark from "@/components/motion/PenMark";
import { useSeenOnce } from "@/components/motion/useInView";

const EASE = [0.2, 0.7, 0.1, 1] as const;

/**
 * Polya's one scene: a student's worked problem lying on the desk with a
 * sign error in it. The pen circles the line that went wrong and stops
 * there. The hint beside it points at the slide and leaves the fix to the
 * student. Reduced motion shows the finished page.
 */
export default function HintScene({
  header,
  question,
  answer,
  sources,
  replyHint,
}: {
  header: string;
  question: string;
  answer: string;
  sources: string[];
  replyHint: string;
}) {
  const reduceMotion = useReducedMotion();
  const [ref, seen] = useSeenOnce<HTMLDivElement>(0.4);
  const show = seen || Boolean(reduceMotion);

  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 14 },
    animate: show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 0.55, delay, ease: EASE },
  });

  return (
    <div className="hint-scene" ref={ref}>
      <div className="hint-work paper" aria-hidden="true">
        <p className="hint-work-title">Problem 3</p>
        <p className="hint-work-given">Maximize f(x, y) = xy on the line x + y = 10</p>
        <ol>
          <li>∇f = λ∇g</li>
          <li>
            <span className="hint-work-wrong">
              g(x, y) = 10 − x − y
              <PenMark kind="circle" inset="-12px -18px -14px -16px" delay={0.9} play={show} />
            </span>
          </li>
          <li>∇g = (−1, −1)</li>
          <li>y = −λ, x = −λ</li>
          <li className="hint-work-pencil">λ = −5 ?</li>
        </ol>
      </div>

      <div className="hint-chat">
        <p className="hint-chat-course">{header}</p>
        <m.p className="hint-q" {...enter(0.1)}>
          {question}
        </m.p>
        <m.div className="hint-a" {...enter(0.5)}>
          <p>{answer}</p>
          <div className="hint-sources">
            {sources.map((source) => (
              <span key={source} className="chip chip-pen">
                {source}
              </span>
            ))}
          </div>
        </m.div>
        <m.p className="hint-reply" {...enter(0.9)}>
          {replyHint}
        </m.p>
      </div>
    </div>
  );
}
