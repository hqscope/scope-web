/**
 * The per-worker state machine: how long each state lasts and where it can go
 * next. Weights and dwell ranges live here on their own so the office's rhythm
 * can be retuned without touching the engine.
 */

import { pickWeighted, rangeFloat, type Rng, type WeightedOption } from "./prng";
import type { WorkerStatus } from "./types";

/** Real-world milliseconds a worker sits in a state before it re-rolls. */
export const DWELL_MS: Record<WorkerStatus, readonly [number, number]> = {
  working: [6_000, 14_000],
  thinking: [2_500, 6_000],
  waiting: [5_000, 12_000],
  done: [4_000, 9_000],
  idle: [6_000, 14_000],
  walking: [4_200, 4_200],
};

/** How long a working worker keeps the same activity line. */
export const LABEL_SWAP_MS: readonly [number, number] = [4_000, 8_000];

/** Gap between simulation events. */
export const EVENT_GAP_MS: readonly [number, number] = [2_000, 5_000];

/** Director floor — two events may never land closer together than this. */
export const MIN_EVENT_GAP_MS = 700;

/** One-shot walk between the door and a desk. */
export const TRANSIT_MS = 4_200;

/** `despawn` leaves the building; the rest are ordinary statuses. */
export type Outcome = WorkerStatus | "despawn";

const TABLE: Record<WorkerStatus, readonly WeightedOption<Outcome>[]> = {
  working: [
    { value: "thinking", weight: 0.45 },
    { value: "done", weight: 0.25 },
    { value: "waiting", weight: 0.15 },
    { value: "idle", weight: 0.15 },
  ],
  thinking: [
    { value: "working", weight: 0.85 },
    { value: "waiting", weight: 0.15 },
  ],
  waiting: [{ value: "working", weight: 1 }],
  idle: [{ value: "working", weight: 1 }],
  done: [
    { value: "despawn", weight: 0.6 },
    { value: "working", weight: 0.4 },
  ],
  walking: [{ value: "working", weight: 1 }],
};

export function nextOutcome(rng: Rng, from: WorkerStatus): Outcome {
  return pickWeighted(rng, TABLE[from]);
}

export function dwellMs(rng: Rng, status: WorkerStatus): number {
  const [min, max] = DWELL_MS[status];
  return rangeFloat(rng, min, max);
}

export function labelSwapMs(rng: Rng): number {
  return rangeFloat(rng, LABEL_SWAP_MS[0], LABEL_SWAP_MS[1]);
}

export function eventGapMs(rng: Rng): number {
  return Math.max(
    MIN_EVENT_GAP_MS,
    rangeFloat(rng, EVENT_GAP_MS[0], EVENT_GAP_MS[1]),
  );
}
