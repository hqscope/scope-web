"use client";

export type BubbleTone = "default" | "warn" | "done" | "walk";

export interface StatusBubbleProps {
  text: string;
  tone?: BubbleTone;
  /** Adds the blinking block cursor the mockup puts on live lines. */
  cursor?: boolean;
}

/**
 * The little speech bubble above a worker. The tail is a rotated square on
 * `::after` (see office-demo.css) — the wandering variant drops it, exactly as
 * the mockup does.
 */
export default function StatusBubble({
  text,
  tone = "default",
  cursor = false,
}: StatusBubbleProps) {
  return (
    <span className="aw-w-bubble" data-tone={tone}>
      {text}
      {cursor ? <span className="aw-w-caret">▍</span> : null}
    </span>
  );
}
