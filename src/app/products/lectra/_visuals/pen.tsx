import type { ReactNode } from "react";

/**
 * A hand-drawn red loop around whatever it sits inside. The parent needs
 * `relative`. Decorative.
 */
export function PenCircle() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 60"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -inset-y-2 -left-5 h-[calc(100%+16px)] w-[calc(100%+32px)] overflow-visible"
    >
      <path
        d="M16 36 C 6 14, 78 5, 128 6 C 180 8, 197 21, 191 37 C 185 53, 112 58, 62 54 C 24 51, 6 44, 14 26"
        fill="none"
        stroke="#c42b26"
        strokeWidth="1.8"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** A short handwritten note in red, with an arrow back up at the work. */
export function PenNote({ children }: { children: ReactNode }) {
  return (
    <p className="mx-5 mb-5 mt-4 flex rotate-[-2deg] items-end justify-end gap-2 text-right font-hand text-[22px] leading-[1.1] text-red sm:mx-6">
      <svg
        aria-hidden="true"
        viewBox="0 0 34 30"
        className="h-[26px] w-[30px] shrink-0 overflow-visible"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M31 27C22 26 12 20 7 5" />
        <path d="M2.5 10.5 6.8 4.2l6 3.4" />
      </svg>
      <span className="max-w-[22ch]">{children}</span>
    </p>
  );
}
