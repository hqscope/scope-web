/**
 * The store that sits between the engine and React.
 *
 * Snapshots are immutable and per-worker, so a single event re-renders a
 * single worker rather than the whole room. Everything a component can
 * subscribe to is cached and only replaced when it actually changes, which is
 * what `useSyncExternalStore` needs to stay quiet.
 */

import { createOfficeEngine, type OfficeEngine } from "./engine";
import type { FloorCount, SceneEvent, SceneState, WorkerState, WorkerStatus } from "./types";

export interface OfficeMeta {
  readonly workerCount: number;
  readonly waitingCount: number;
  readonly activeCount: number;
  readonly walkingCount: number;
  readonly idleCount: number;
  readonly events: readonly SceneEvent[];
  readonly floors: readonly FloorCount[];
  /** Simulated clock, seconds past midnight — never wall-clock time. */
  readonly timeSec: number;
}

type Listener = () => void;

export interface OfficeStore {
  readonly seed: number;
  readonly engine: OfficeEngine;

  subscribeWorker(id: string, listener: Listener): () => void;
  getWorker(id: string): WorkerState | null;
  getInitialWorker(id: string): WorkerState | null;

  subscribeIds(listener: Listener): () => void;
  getIds(): readonly string[];
  getInitialIds(): readonly string[];

  subscribeMeta(listener: Listener): () => void;
  getMeta(): OfficeMeta;
  getInitialMeta(): OfficeMeta;

  start(): void;
  stop(): void;
  isRunning(): boolean;
  setSpeed(multiplier: number): void;
  forceStatus(id: string, status: WorkerStatus): void;
}

const ACTIVE: ReadonlySet<WorkerStatus> = new Set<WorkerStatus>([
  "working",
  "thinking",
  "done",
]);

function buildMeta(state: SceneState): OfficeMeta {
  let waitingCount = 0;
  let activeCount = 0;
  let walkingCount = 0;
  let idleCount = 0;

  for (const worker of state.workers) {
    if (worker.status === "waiting") waitingCount += 1;
    else if (worker.status === "walking") walkingCount += 1;
    else if (worker.status === "idle") idleCount += 1;
    if (ACTIVE.has(worker.status)) activeCount += 1;
  }

  const floors: readonly FloorCount[] = [
    { id: "f3", label: "F3 infra", active: 1, waiting: 0, current: false, quiet: null },
    { id: "f2", label: "F2 web-client", active: 1, waiting: 0, current: false, quiet: null },
    {
      id: "f1",
      label: "F1 payments-api",
      active: activeCount,
      waiting: waitingCount,
      current: true,
      quiet: null,
    },
    {
      id: "lobby",
      label: "Lobby",
      active: walkingCount,
      waiting: 0,
      current: false,
      quiet: walkingCount === 0 ? "zzz" : null,
    },
  ];

  return {
    workerCount: state.workers.length,
    waitingCount,
    activeCount,
    walkingCount,
    idleCount,
    events: state.events,
    floors,
    timeSec: state.timeSec,
  };
}

function metaEqual(a: OfficeMeta, b: OfficeMeta): boolean {
  return (
    a.workerCount === b.workerCount &&
    a.waitingCount === b.waitingCount &&
    a.activeCount === b.activeCount &&
    a.walkingCount === b.walkingCount &&
    a.idleCount === b.idleCount &&
    a.events === b.events &&
    a.timeSec === b.timeSec
  );
}

function idsEqual(a: readonly string[], b: readonly string[]): boolean {
  if (a.length !== b.length) return false;
  for (let index = 0; index < a.length; index += 1) {
    if (a[index] !== b[index]) return false;
  }
  return true;
}

export function createOfficeStore(seed: number): OfficeStore {
  const engine = createOfficeEngine(seed);

  let state: SceneState = engine.getState();
  let ids: readonly string[] = state.workers.map((worker) => worker.id);
  let meta: OfficeMeta = buildMeta(state);

  const initialState = state;
  const initialIds = ids;
  const initialMeta = meta;

  const workerListeners = new Map<string, Set<Listener>>();
  const idsListeners = new Set<Listener>();
  const metaListeners = new Set<Listener>();

  let timer: ReturnType<typeof setTimeout> | null = null;

  function notify(listeners: Set<Listener>): void {
    for (const listener of Array.from(listeners)) listener();
  }

  function commit(next: SceneState): void {
    const previous = state;
    state = next;

    const touched = new Set<string>();
    for (const worker of previous.workers) {
      const after = next.workers.find((other) => other.id === worker.id);
      if (after !== worker) touched.add(worker.id);
    }
    for (const worker of next.workers) {
      const before = previous.workers.find((other) => other.id === worker.id);
      if (before !== worker) touched.add(worker.id);
    }
    for (const id of touched) {
      const listeners = workerListeners.get(id);
      if (listeners) notify(listeners);
    }

    const nextIds = next.workers.map((worker) => worker.id);
    if (!idsEqual(ids, nextIds)) {
      ids = nextIds;
      notify(idsListeners);
    }

    const nextMeta = buildMeta(next);
    if (!metaEqual(meta, nextMeta)) {
      meta = nextMeta;
      notify(metaListeners);
    }
  }

  function tick(): void {
    commit(engine.advance());
    schedule();
  }

  function schedule(): void {
    timer = setTimeout(tick, engine.nextDelayMs());
  }

  return {
    seed,
    engine,

    subscribeWorker(id, listener) {
      let listeners = workerListeners.get(id);
      if (!listeners) {
        listeners = new Set<Listener>();
        workerListeners.set(id, listeners);
      }
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) workerListeners.delete(id);
      };
    },
    getWorker: (id) => state.workers.find((worker) => worker.id === id) ?? null,
    getInitialWorker: (id) =>
      initialState.workers.find((worker) => worker.id === id) ?? null,

    subscribeIds(listener) {
      idsListeners.add(listener);
      return () => idsListeners.delete(listener);
    },
    getIds: () => ids,
    getInitialIds: () => initialIds,

    subscribeMeta(listener) {
      metaListeners.add(listener);
      return () => metaListeners.delete(listener);
    },
    getMeta: () => meta,
    getInitialMeta: () => initialMeta,

    start() {
      if (timer !== null) return;
      schedule();
    },
    stop() {
      if (timer === null) return;
      clearTimeout(timer);
      timer = null;
    },
    isRunning: () => timer !== null,
    setSpeed: (multiplier) => engine.setSpeed(multiplier),
    forceStatus: (id, status) => commit(engine.forceStatus(id, status)),
  };
}
