/**
 * Shared vocabulary for the office simulation.
 *
 * Nothing in `sim/` touches the DOM, React, `window`, `Date` or `Math.random`.
 * The whole module is a pure state machine so it can be replayed, diffed and
 * unit-checked (see the determinism self-check in the debug panel).
 */

export type ProviderId = "claude" | "codex" | "gemini";

/**
 * Machine states. `idle` is drawn as the mockup's "paused" pose (zzz glyphs,
 * desaturated, static lamp) — see RESKIN.md for the status → pose table.
 */
export type WorkerStatus =
  | "working"
  | "thinking"
  | "waiting"
  | "done"
  | "idle"
  | "walking";

/** `null` = a wander (water break loop); the others are one-shot transits. */
export type TransitKind = "arriving" | "leaving";

export type Lighting = "night" | "day" | "dusk";

export interface ProviderSpec {
  readonly id: ProviderId;
  /** Shown in the inspect panel and event log. */
  readonly label: string;
  readonly color: string;
  readonly torsoFrom: string;
  readonly torsoTo: string;
  readonly glow: string;
  readonly avatarFrom: string;
}

export interface DeskSlot {
  readonly id: string;
  /** World coordinates (960 × 580 stage) of the 150 × 150 worker container. */
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface ScreenLine {
  readonly text: string;
  readonly muted?: boolean;
}

export interface WorkerState {
  readonly id: string;
  readonly provider: ProviderId;
  /** "Claude · Opus" */
  readonly name: string;
  /** "CLAUDE · OPUS" — the desk-front nameplate. */
  readonly nameplate: string;
  readonly skin: string;
  readonly deskId: string;
  readonly status: WorkerStatus;
  readonly transit: TransitKind | null;
  /** Speech-bubble copy. */
  readonly activity: string;
  readonly screen: readonly ScreenLine[];
  /** 0–100, drives the desk-front progress track. */
  readonly progress: number;
  /** 0, 1 or 2 sheets in the desk paper stack. */
  readonly papers: number;
  readonly tokens: number;
  readonly costCents: number;
  /** Simulated clock (seconds past midnight) when the status began. */
  readonly startedAtSec: number;
  readonly dueAtSec: number;
  readonly labelDueAtSec: number;
  /** Newest-first ring buffer, max 6. */
  readonly feed: readonly string[];
}

export interface SceneEvent {
  readonly id: number;
  readonly atSec: number;
  /** "⚠" / "✓" / null — rendered in its own colour, mockup style. */
  readonly glyph: string | null;
  readonly text: string;
  readonly tone: "info" | "warn" | "done";
}

export interface SceneState {
  readonly seed: number;
  /** Simulated clock, seconds past midnight. Never wall-clock time. */
  readonly timeSec: number;
  readonly workers: readonly WorkerState[];
  /** Newest-first ring buffer, max 6. */
  readonly events: readonly SceneEvent[];
  readonly eventSeq: number;
  readonly hireSeq: number;
  readonly prSeq: number;
}

export interface FloorCount {
  readonly id: string;
  readonly label: string;
  readonly active: number;
  readonly waiting: number;
  /** True for the floor this office window is showing. */
  readonly current: boolean;
  /** Rendered instead of the counts when the floor is quiet. */
  readonly quiet: string | null;
}
