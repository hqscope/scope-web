"use client";

import type { Lighting } from "./sim/types";

const LIGHTING_ORDER: readonly Lighting[] = ["night", "day", "dusk"];

const LIGHTING_COPY: Record<Lighting, { clock: string; glyph: string; word: string }> = {
  night: { clock: "23:41", glyph: "☾", word: "night" },
  day: { clock: "09:12", glyph: "☀", word: "day" },
  dusk: { clock: "18:47", glyph: "⛅", word: "dusk" },
};

export function nextLighting(current: Lighting): Lighting {
  const index = LIGHTING_ORDER.indexOf(current);
  return LIGHTING_ORDER[(index + 1) % LIGHTING_ORDER.length];
}

export interface ToolbarProps {
  workerCount: number;
  lighting: Lighting;
  onCycleLighting: () => void;
}

/** The window's own toolbar: where you are, who's in, and what time it feels like. */
export default function Toolbar({
  workerCount,
  lighting,
  onCycleLighting,
}: ToolbarProps) {
  const copy = LIGHTING_COPY[lighting];
  const upcoming = LIGHTING_COPY[nextLighting(lighting)];

  return (
    <div className="aw-demo-toolbar">
      <span className="aw-demo-toolbar-title">The Studio</span>
      <span className="aw-demo-pill">F1 · payments-api</span>
      <span className="aw-demo-toolbar-right">
        <span className="aw-demo-count">
          {workerCount} {workerCount === 1 ? "worker" : "workers"}
        </span>
        <button
          type="button"
          className="aw-demo-lighting"
          onClick={onCycleLighting}
          aria-label={`Lighting: ${copy.word}. Switch to ${upcoming.word}.`}
        >
          {copy.clock} · <span aria-hidden="true">{copy.glyph} </span>
          {copy.word} (auto)
        </button>
      </span>
    </div>
  );
}
