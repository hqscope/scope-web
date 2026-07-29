"use client";

import type { CSSProperties } from "react";

export interface DeskProps {
  nameplate: string;
  /** 0–100, drives the width of the progress track. */
  progress: number;
}

type DeskVars = CSSProperties & Record<"--aw-progress", string>;

/**
 * The desk under a worker: the perspective-tilted top, the front bar with its
 * progress track and mono nameplate, and the soft shadow on the floor.
 */
export default function Desk({ nameplate, progress }: DeskProps) {
  const style: DeskVars = { "--aw-progress": `${Math.max(0, Math.min(100, progress))}%` };

  return (
    <>
      <span className="aw-w-desktop" />
      <span className="aw-w-deskfront">
        <span className="aw-w-track">
          <span className="aw-w-fill" style={style} />
        </span>
        <span className="aw-w-nameplate">{nameplate}</span>
      </span>
      <span className="aw-w-shadow" />
    </>
  );
}
