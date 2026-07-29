/**
 * The office engine.
 *
 * One event at a time, one `setTimeout` chain, nothing running in between —
 * every bit of motion you see between events is CSS. The engine is a pure
 * state machine over `SceneState`: `advance()` never reads the wall clock, so
 * the same seed always produces the same office, in the same order, forever.
 * (`DemoDebugPanel` proves it by replaying two fresh engines side by side.)
 */

import {
  DESKS,
  EVENT_SLOTS,
  FEED_SLOTS,
  HIRE_POOL,
  MAX_OCCUPANCY,
  MIN_OCCUPANCY,
  SIM_TIME_SCALE,
  activityFor,
  buildInitialScene,
  screenFor,
} from "./cast";
import { mulberry32, pick, rangeInt, type Rng } from "./prng";
import {
  MIN_EVENT_GAP_MS,
  TRANSIT_MS,
  dwellMs,
  eventGapMs,
  labelSwapMs,
  nextOutcome,
  type Outcome,
} from "./states";
import type {
  SceneEvent,
  SceneState,
  WorkerState,
  WorkerStatus,
} from "./types";

export interface EngineEvent {
  readonly seq: number;
  readonly atSec: number;
  readonly kind: "transition" | "spawn" | "despawn" | "label" | "quiet";
  readonly workerId: string;
  readonly from: WorkerStatus | "none";
  readonly to: WorkerStatus | "gone";
}

export interface InvariantReport {
  readonly ok: boolean;
  readonly failures: readonly string[];
}

export interface OfficeEngine {
  getState(): SceneState;
  /** Run exactly one simulation event. Returns the new immutable state. */
  advance(): SceneState;
  /** Real milliseconds to wait before the next `advance()`, speed applied. */
  nextDelayMs(): number;
  setSpeed(multiplier: number): void;
  /** Debug affordance — drop a worker straight into a status. */
  forceStatus(workerId: string, status: WorkerStatus): SceneState;
  getLog(): readonly EngineEvent[];
  checkInvariants(): InvariantReport;
}

/** "14:29" from simulated seconds past midnight. */
export function formatClock(sec: number): string {
  const wrapped = ((Math.floor(sec) % 86_400) + 86_400) % 86_400;
  const hours = Math.floor(wrapped / 3600);
  const minutes = Math.floor((wrapped % 3600) / 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function msToSimSec(ms: number): number {
  return (ms / 1000) * SIM_TIME_SCALE;
}

function providerWord(worker: WorkerState): string {
  return worker.provider;
}

function ringPush<T>(items: readonly T[], item: T, slots: number): readonly T[] {
  return [item, ...items].slice(0, slots);
}

const WORKING_EVENT_LINES: readonly string[] = [
  "is back at the keyboard",
  "picked the task back up",
  "started the next pass",
  "edited 6 files",
];

const THINKING_EVENT_LINES: readonly string[] = [
  "is reading the diff",
  "is weighing two options",
  "went quiet for a think",
];

export function createOfficeEngine(seed: number): OfficeEngine {
  const rng: Rng = mulberry32(seed >>> 0);
  let state: SceneState = buildInitialScene(seed);
  let pendingGapMs = eventGapMs(rng);
  let lastGapMs = MIN_EVENT_GAP_MS;
  let speed = 1;
  let seq = 0;
  const log: EngineEvent[] = [];

  function record(entry: Omit<EngineEvent, "seq">): void {
    seq += 1;
    log.push({ seq, ...entry });
    if (log.length > 512) log.splice(0, log.length - 512);
  }

  function pushSceneEvent(
    text: string,
    glyph: string | null,
    tone: SceneEvent["tone"],
  ): void {
    const event: SceneEvent = {
      id: state.eventSeq + 1,
      atSec: state.timeSec,
      glyph,
      text,
      tone,
    };
    state = {
      ...state,
      eventSeq: state.eventSeq + 1,
      events: ringPush(state.events, event, EVENT_SLOTS),
    };
  }

  function occupiedDeskIds(): readonly string[] {
    return state.workers.map((worker) => worker.deskId);
  }

  function firstVacantDesk(): string | null {
    const taken = new Set(occupiedDeskIds());
    const free = DESKS.find((desk) => !taken.has(desk.id));
    return free ? free.id : null;
  }

  function replaceWorker(next: WorkerState): void {
    state = {
      ...state,
      workers: state.workers.map((worker) =>
        worker.id === next.id ? next : worker,
      ),
    };
  }

  /**
   * The director. A transition is only allowed to land if the room still
   * reads well afterwards: one raised hand at a time, four to six desks busy.
   */
  function resolveOutcome(worker: WorkerState, outcome: Outcome): Outcome {
    if (outcome === "waiting") {
      const alreadyWaiting = state.workers.some(
        (other) => other.id !== worker.id && other.status === "waiting",
      );
      if (alreadyWaiting) return "working";
    }
    if (outcome === "despawn") {
      // Count who will still be here once everyone already on their way out
      // has left — otherwise two departures can drain the room together.
      const staying = state.workers.filter(
        (other) => !(other.status === "walking" && other.transit === "leaving"),
      ).length;
      if (staying <= MIN_OCCUPANCY) return "working";
    }
    return outcome;
  }

  function nextProgress(worker: WorkerState, status: WorkerStatus): number {
    if (status === "done") return 100;
    if (status !== "working") return worker.progress;
    if (worker.progress >= 100) return rangeInt(rng, 4, 15);
    return Math.min(99, worker.progress + rangeInt(rng, 4, 18));
  }

  function applyStatus(
    worker: WorkerState,
    status: WorkerStatus,
    transit: WorkerState["transit"],
  ): WorkerState {
    // Finishing a task and picking up the next one starts the meters over.
    const freshTask = status === "working" && worker.progress >= 100;
    const progress = nextProgress(worker, status);
    const activity = activityFor(rng, worker.provider, status, transit);
    const tokenGain = status === "walking" ? 0 : rangeInt(rng, 900, 9_000);
    const dwell =
      status === "walking" && transit !== null
        ? TRANSIT_MS
        : dwellMs(rng, status);

    return {
      ...worker,
      status,
      transit,
      activity,
      progress,
      screen: screenFor(rng, worker.provider, status, progress, state.prSeq),
      papers:
        status === "working"
          ? Math.min(2, worker.papers + (rng() < 0.35 ? 1 : 0))
          : status === "done"
            ? 0
            : worker.papers,
      tokens: freshTask ? rangeInt(rng, 800, 4_000) : worker.tokens + tokenGain,
      costCents: freshTask
        ? rangeInt(rng, 2, 12)
        : worker.costCents + Math.round(tokenGain / 400),
      startedAtSec: state.timeSec,
      dueAtSec: state.timeSec + msToSimSec(dwell),
      labelDueAtSec:
        status === "working"
          ? state.timeSec + msToSimSec(labelSwapMs(rng))
          : Number.POSITIVE_INFINITY,
      feed: ringPush(worker.feed, activity, FEED_SLOTS),
    };
  }

  function announce(worker: WorkerState, status: WorkerStatus): void {
    const who = providerWord(worker);
    switch (status) {
      case "waiting":
        pushSceneEvent(`${who} needs input`, "⚠", "warn");
        break;
      case "done": {
        state = { ...state, prSeq: state.prSeq + 1 };
        pushSceneEvent(`${who} opened PR #${state.prSeq}`, "✓", "done");
        break;
      }
      case "working":
        pushSceneEvent(`${who} ${pick(rng, WORKING_EVENT_LINES)}`, null, "info");
        break;
      case "thinking":
        pushSceneEvent(`${who} ${pick(rng, THINKING_EVENT_LINES)}`, null, "info");
        break;
      case "idle":
        pushSceneEvent(`${who} paused for a bit`, null, "info");
        break;
      case "walking":
        pushSceneEvent(`${who} stepped away`, null, "info");
        break;
    }
  }

  function spawn(): boolean {
    const deskId = firstVacantDesk();
    if (deskId === null || state.workers.length >= MAX_OCCUPANCY) return false;

    // Prefer a name nobody in the room is already using.
    const unused = HIRE_POOL.filter(
      (candidate) => !state.workers.some((worker) => worker.name === candidate.name),
    );
    const entry = pick(rng, unused.length > 0 ? unused : HIRE_POOL);
    const hireSeq = state.hireSeq + 1;
    const id = `w-hire-${hireSeq}`;
    const activity = activityFor(rng, entry.provider, "walking", "arriving");
    const worker: WorkerState = {
      id,
      provider: entry.provider,
      name: entry.name,
      nameplate: entry.nameplate,
      skin: entry.skin,
      deskId,
      status: "walking",
      transit: "arriving",
      activity,
      screen: [],
      progress: rangeInt(rng, 2, 9),
      papers: 0,
      tokens: rangeInt(rng, 400, 3_000),
      costCents: rangeInt(rng, 1, 9),
      startedAtSec: state.timeSec,
      dueAtSec: state.timeSec + msToSimSec(TRANSIT_MS),
      labelDueAtSec: Number.POSITIVE_INFINITY,
      feed: [activity],
    };

    state = { ...state, hireSeq, workers: [...state.workers, worker] };
    pushSceneEvent(`${entry.provider} moved into desk ${deskId}`, null, "info");
    record({
      atSec: state.timeSec,
      kind: "spawn",
      workerId: id,
      from: "none",
      to: "walking",
    });
    return true;
  }

  function despawn(worker: WorkerState): void {
    state = {
      ...state,
      workers: state.workers.filter((other) => other.id !== worker.id),
    };
    pushSceneEvent(`${providerWord(worker)} clocked out`, null, "info");
    record({
      atSec: state.timeSec,
      kind: "despawn",
      workerId: worker.id,
      from: "walking",
      to: "gone",
    });
  }

  function transition(worker: WorkerState): void {
    // A one-shot transit resolves into arrival or departure.
    if (worker.status === "walking" && worker.transit === "leaving") {
      despawn(worker);
      return;
    }
    if (worker.status === "walking" && worker.transit === "arriving") {
      const seated = applyStatus(worker, "working", null);
      replaceWorker(seated);
      announce(seated, "working");
      record({
        atSec: state.timeSec,
        kind: "transition",
        workerId: worker.id,
        from: "walking",
        to: "working",
      });
      return;
    }

    const outcome = resolveOutcome(worker, nextOutcome(rng, worker.status));
    if (outcome === "despawn") {
      const leaving = applyStatus(worker, "walking", "leaving");
      replaceWorker(leaving);
      record({
        atSec: state.timeSec,
        kind: "transition",
        workerId: worker.id,
        from: worker.status,
        to: "walking",
      });
      return;
    }

    const next = applyStatus(worker, outcome, null);
    replaceWorker(next);
    announce(next, outcome);
    record({
      atSec: state.timeSec,
      kind: "transition",
      workerId: worker.id,
      from: worker.status,
      to: outcome,
    });
  }

  function swapLabel(worker: WorkerState): void {
    const activity = activityFor(rng, worker.provider, "working", null);
    const progress = Math.min(99, worker.progress + rangeInt(rng, 1, 6));
    replaceWorker({
      ...worker,
      activity,
      progress,
      screen: screenFor(rng, worker.provider, "working", progress, state.prSeq),
      tokens: worker.tokens + rangeInt(rng, 300, 2_600),
      labelDueAtSec: state.timeSec + msToSimSec(labelSwapMs(rng)),
      feed: ringPush(worker.feed, activity, FEED_SLOTS),
    });
    record({
      atSec: state.timeSec,
      kind: "label",
      workerId: worker.id,
      from: "working",
      to: "working",
    });
  }

  function earliest(
    predicate: (worker: WorkerState) => boolean,
    keyOf: (worker: WorkerState) => number,
  ): WorkerState | null {
    let best: WorkerState | null = null;
    let bestKey = Number.POSITIVE_INFINITY;
    for (const worker of state.workers) {
      if (!predicate(worker)) continue;
      const key = keyOf(worker);
      if (key < bestKey) {
        best = worker;
        bestKey = key;
      }
    }
    return best;
  }

  function advance(): SceneState {
    const gapMs = Math.max(MIN_EVENT_GAP_MS, pendingGapMs);
    state = { ...state, timeSec: state.timeSec + msToSimSec(gapMs) };
    lastGapMs = gapMs;

    // Keeping the room populated comes first: below the floor we always hire,
    // and above it we occasionally do, so a freed desk does not stay empty.
    const understaffed = state.workers.length < MIN_OCCUPANCY;
    if (
      (understaffed || (state.workers.length < MAX_OCCUPANCY && rng() < 0.12)) &&
      spawn()
    ) {
      pendingGapMs = eventGapMs(rng);
      return state;
    }

    const due = earliest(
      (worker) => worker.dueAtSec <= state.timeSec,
      (worker) => worker.dueAtSec,
    );

    if (due) {
      transition(due);
    } else {
      const stale = earliest(
        (worker) =>
          worker.status === "working" && worker.labelDueAtSec <= state.timeSec,
        (worker) => worker.labelDueAtSec,
      );
      if (stale) {
        swapLabel(stale);
      } else {
        record({
          atSec: state.timeSec,
          kind: "quiet",
          workerId: "-",
          from: "none",
          to: "gone",
        });
      }
    }

    pendingGapMs = eventGapMs(rng);
    return state;
  }

  return {
    getState: () => state,
    advance,
    nextDelayMs: () => Math.max(MIN_EVENT_GAP_MS / speed, pendingGapMs / speed),
    setSpeed: (multiplier: number) => {
      speed = multiplier > 0 ? multiplier : 1;
    },
    forceStatus: (workerId: string, status: WorkerStatus) => {
      const worker = state.workers.find((other) => other.id === workerId);
      if (!worker) return state;
      replaceWorker(applyStatus(worker, status, null));
      return state;
    },
    getLog: () => log,
    checkInvariants: () => {
      const failures: string[] = [];
      const waiting = state.workers.filter(
        (worker) => worker.status === "waiting",
      ).length;
      if (waiting > 1) failures.push(`${waiting} workers waiting (max 1)`);
      if (state.workers.length < MIN_OCCUPANCY) {
        failures.push(`occupancy ${state.workers.length} < ${MIN_OCCUPANCY}`);
      }
      if (state.workers.length > MAX_OCCUPANCY) {
        failures.push(`occupancy ${state.workers.length} > ${MAX_OCCUPANCY}`);
      }
      const desks = new Set(state.workers.map((worker) => worker.deskId));
      if (desks.size !== state.workers.length) {
        failures.push("two workers share a desk");
      }
      if (lastGapMs < MIN_EVENT_GAP_MS) {
        failures.push(`events ${Math.round(lastGapMs)}ms apart (min ${MIN_EVENT_GAP_MS})`);
      }
      return { ok: failures.length === 0, failures };
    },
  };
}

/**
 * Replays two fresh engines at the same seed and compares their event logs.
 * Used by the debug panel; kept here so the check lives next to the thing it
 * is checking.
 */
export function determinismCheck(
  seed: number,
  steps = 200,
): { ok: boolean; divergedAt: number | null } {
  const a = createOfficeEngine(seed);
  const b = createOfficeEngine(seed);
  for (let index = 0; index < steps; index += 1) {
    a.advance();
    b.advance();
  }
  const logA = a.getLog();
  const logB = b.getLog();
  if (logA.length !== logB.length) return { ok: false, divergedAt: 0 };
  for (let index = 0; index < logA.length; index += 1) {
    if (JSON.stringify(logA[index]) !== JSON.stringify(logB[index])) {
      return { ok: false, divergedAt: index };
    }
  }
  return { ok: true, divergedAt: null };
}
