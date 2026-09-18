"use client";

import { LazyMotion, MotionConfig, domMax } from "motion/react";
import type { ReactNode } from "react";

import FocusObserver from "./FocusObserver";
import Magnet from "./Magnet";

/**
 * One motion context for the whole site. `domMax` is needed for shared-layout
 * animation (the hero's focus field and the Polya citation). MotionConfig
 * follows the visitor's reduced-motion setting everywhere, so no scene has to
 * remember to check it.
 */
export default function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <FocusObserver />
        <Magnet />
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
