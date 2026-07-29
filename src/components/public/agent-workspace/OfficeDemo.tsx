"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";

import DemoDebugPanel from "./DemoDebugPanel";
import InspectPanel from "./InspectPanel";
import OfficeScene from "./OfficeScene";
import Sidebar from "./Sidebar";
import Toolbar, { nextLighting } from "./Toolbar";
import Worker, { workerButtonId } from "./Worker";
import { DEFAULT_SEED } from "./sim/cast";
import type { Lighting } from "./sim/types";
import {
  useOfficeMeta,
  useOfficeRuntime,
  useOfficeStore,
  useWorkerIds,
} from "./useOfficeSim";

import "./office-demo.css";

export interface OfficeDemoProps {
  /** Same seed, same office — every time, on the server and in the browser. */
  seed?: number;
  className?: string;
}

type LightingVars = CSSProperties &
  Record<"--aw-day" | "--aw-dusk" | "--aw-night", string>;

const LIGHTING_VARS: Record<Lighting, LightingVars> = {
  night: { "--aw-day": "0", "--aw-dusk": "0", "--aw-night": "1" },
  day: { "--aw-day": "1", "--aw-dusk": "0", "--aw-night": "0" },
  dusk: { "--aw-day": "0", "--aw-dusk": "1", "--aw-night": "0" },
};

const subscribeNever = (): (() => void) => () => {};

function readDebugFlag(): boolean {
  if (process.env.NODE_ENV === "production") return false;
  return new URLSearchParams(window.location.search).get("aw-debug") === "1";
}

const SCENE_DESCRIPTION =
  "An illustrated office. Every agent working on this repo gets a desk: they type while they work, raise a hand when they need an answer, celebrate when they finish, and doze off when they are paused. Each worker below is a button — open one to read its session.";

/**
 * The live office.
 *
 * The engine only ever runs from an effect, so the markup the server sends and
 * the markup React hydrates are the same posed scene — which is also exactly
 * what someone with JavaScript off, or motion turned down, is left looking at.
 */
export default function OfficeDemo({ seed = DEFAULT_SEED, className }: OfficeDemoProps) {
  const [activeSeed, setActiveSeed] = useState(seed);
  // Read once, on the client only: the server has no query string to read, so
  // the server snapshot is always false and hydration stays quiet.
  const debug = useSyncExternalStore(subscribeNever, readDebugFlag, () => false);

  return (
    <OfficeRoom
      key={activeSeed}
      seed={activeSeed}
      className={className}
      debug={debug}
      onSeedChange={setActiveSeed}
    />
  );
}

interface OfficeRoomProps {
  seed: number;
  className?: string;
  debug: boolean;
  onSeedChange: (seed: number) => void;
}

function OfficeRoom({ seed, className, debug, onSeedChange }: OfficeRoomProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const store = useOfficeStore(seed);
  useOfficeRuntime(store, rootRef);
  const ids = useWorkerIds(store);
  const meta = useOfficeMeta(store);

  const panelId = useId();
  const [lighting, setLighting] = useState<Lighting>("night");
  const [rawSelectedId, setSelectedId] = useState<string | null>(null);

  // A worker who has left the building can't stay selected. Derived rather
  // than corrected in an effect, so there is never a frame pointing at a desk
  // nobody is sitting at.
  const selectedId =
    rawSelectedId && ids.includes(rawSelectedId) ? rawSelectedId : null;

  // Closing hands focus back to the desk that opened the panel.
  const close = useCallback(() => {
    if (selectedId) {
      const trigger = document.getElementById(workerButtonId(panelId, selectedId));
      if (trigger) trigger.focus();
    }
    setSelectedId(null);
  }, [selectedId, panelId]);

  const select = useCallback((id: string) => setSelectedId(id), []);

  useEffect(() => {
    if (!selectedId) return;

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") close();
    };
    const onPointerDown = (event: PointerEvent): void => {
      const panel = panelRef.current;
      const target = event.target;
      if (panel && target instanceof Node && panel.contains(target)) return;
      close();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [selectedId, close]);

  const deskSixTaken = useMemo(
    () => ids.some((id) => store.getWorker(id)?.deskId === "06"),
    [ids, store],
  );

  const rootClassName = className ? `aw-demo ${className}` : "aw-demo";

  return (
    <div
      ref={rootRef}
      className={rootClassName}
      style={LIGHTING_VARS[lighting]}
      data-lighting={lighting}
      data-resting="false"
      data-inspecting={selectedId ? "true" : "false"}
    >
      <p className="aw-demo-sr">{SCENE_DESCRIPTION}</p>

      <Toolbar
        workerCount={meta.workerCount}
        lighting={lighting}
        onCycleLighting={() => setLighting(nextLighting)}
      />

      <div className="aw-demo-stage">
        <div className="aw-demo-world">
          <OfficeScene />

          <div className="aw-demo-workers">
            {ids.map((id) => (
              <Worker
                key={id}
                store={store}
                id={id}
                panelId={panelId}
                selected={selectedId === id}
                onSelect={select}
              />
            ))}

            {deskSixTaken ? null : (
              <div className="aw-o-vacant" aria-hidden="true">
                <div className="aw-o-vacant-box" />
                <p className="aw-o-vacant-label">
                  <span>DESK 06 — VACANT</span>
                </p>
                <p className="aw-o-vacant-cta">
                  <span>＋ hire an agent</span>
                </p>
              </div>
            )}
          </div>
        </div>

        <Sidebar meta={meta} tucked={selectedId !== null} />

        <p className="aw-demo-strip">
          <span>F1 payments-api</span>
          <span className="aw-demo-floor-active">
            <span aria-hidden="true">●</span>
            {meta.activeCount}
          </span>
          {meta.waitingCount > 0 ? (
            <span className="aw-demo-floor-waiting">
              <span aria-hidden="true">⚠</span>
              {meta.waitingCount}
            </span>
          ) : null}
        </p>

        {selectedId ? (
          <InspectPanel
            ref={panelRef}
            store={store}
            workerId={selectedId}
            panelId={panelId}
            nowSec={meta.timeSec}
            onClose={close}
          />
        ) : null}
      </div>

      {debug ? (
        <DemoDebugPanel store={store} seed={seed} onSeedChange={onSeedChange} />
      ) : null}
    </div>
  );
}
