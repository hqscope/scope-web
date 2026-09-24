"use client";

import {
  m,
  useScroll,
  useTransform,
} from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useRef, type ReactNode } from "react";

/**
 * A sheet of paper on the desk. As the next sheet slides up over it, this one
 * settles back into the stack: it shrinks a little and falls into shadow.
 * The shade is an overlay's opacity, not a filter, so scrolling stays cheap.
 */
export default function Sheet({
  children,
  className,
  id,
  labelledBy,
  as = "section",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
  as?: "section" | "article" | "div";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // Starts once this sheet's bottom edge passes the middle of the screen,
    // which is when the next sheet is actually covering it.
    offset: ["end 55%", "end start"],
  });

  // The same markup renders on the server and the client. Reduced motion
  // only flattens the values, so hydration never sees a different tree.
  const scale = useTransform(scrollYProgress, (value) => (reduceMotion ? 1 : 1 - 0.06 * value));
  const shade = useTransform(scrollYProgress, (value) => (reduceMotion ? 0 : 0.5 * value));

  const Tag = as === "article" ? m.article : as === "div" ? m.div : m.section;

  return (
    <Tag
      ref={ref as never}
      id={id}
      aria-labelledby={labelledBy}
      className={className ? `sheet ${className}` : "sheet"}
      style={{ scale }}
    >
      {children}
      <m.span className="sheet-shade" aria-hidden="true" style={{ opacity: shade }} />
    </Tag>
  );
}
