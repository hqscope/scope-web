"use client";

import Image from "next/image";
import {
  m,
  useScroll,
  useTransform,
} from "motion/react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useRef } from "react";

/**
 * The iPad turns from portrait to landscape as it scrolls through the
 * viewport. Mid-turn the screen racks focus from a marked-up midterm review
 * to the library it lives in: the page you think on, then everything else.
 */
export default function LectraTurn() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Progress runs 0 to 1 from the device entering at the bottom of the
  // screen to leaving at the top. The whole turn finishes by 0.32, while the
  // device is still in the lower half of the screen, so it is already flat
  // and landscape by the time you read it.
  const turn = useTransform(scrollYProgress, [0.08, 0.32], [0, 90]);
  const portraitRotate = useTransform(turn, (value) => value);
  const landscapeRotate = useTransform(turn, (value) => value - 90);
  // A quick swap just past the midpoint of the turn.
  const portraitOpacity = useTransform(scrollYProgress, [0.19, 0.21], [1, 0]);
  const landscapeOpacity = useTransform(scrollYProgress, [0.19, 0.21], [0, 1]);
  const portraitBlur = useTransform(scrollYProgress, [0.14, 0.2], ["blur(0px)", "blur(4px)"]);
  const landscapeBlur = useTransform(scrollYProgress, [0.2, 0.26], ["blur(4px)", "blur(0px)"]);
  const tilt = useTransform(scrollYProgress, [0.04, 0.32, 0.7, 0.95], [14, 0, 0, -6]);
  // A turning rectangle's diagonal is wider than either side, so the device
  // steps back mid-turn to stay inside its stage.
  const size = useTransform(scrollYProgress, [0.08, 0.2, 0.32], [1, 0.74, 1]);

  if (reduceMotion) {
    return (
      <div className="lectra-turn lectra-turn--still">
        <div className="lectra-device lectra-device--landscape">
          <Image
            src="/brand/lectra-library-ipad.png"
            alt="The Lectra Notes library on iPad, showing recent course documents including an organic chemistry midterm review, a physics rotational dynamics reading, and a statics lab worksheet."
            width={2064}
            height={1548}
            quality={90}
            sizes="(max-width: 900px) 92vw, 50vw"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="lectra-turn" ref={ref}>
      <m.div className="lectra-turn-stage" style={{ rotateX: tilt, scale: size }}>
        <m.div
          className="lectra-device lectra-device--portrait"
          style={{ rotate: portraitRotate, opacity: portraitOpacity, filter: portraitBlur }}
        >
          <Image
            src="/brand/lectra-markup-ipad.png"
            alt="A midterm review for organic chemistry open in Lectra Notes, marked up with Apple Pencil highlights and circled notes."
            width={2064}
            height={2752}
            quality={90}
            sizes="(max-width: 900px) 70vw, 36vw"
          />
        </m.div>
        <m.div
          className="lectra-device lectra-device--landscape"
          style={{ rotate: landscapeRotate, opacity: landscapeOpacity, filter: landscapeBlur }}
        >
          <Image
            src="/brand/lectra-library-ipad.png"
            alt="The Lectra Notes library on iPad, showing recent course documents including an organic chemistry midterm review, a physics rotational dynamics reading, and a statics lab worksheet."
            width={2064}
            height={1548}
            quality={90}
            sizes="(max-width: 900px) 92vw, 50vw"
          />
        </m.div>
      </m.div>
    </div>
  );
}
