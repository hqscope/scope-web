"use client";

import { memo, type CSSProperties } from "react";

import Desk from "./Desk";
import StatusBubble, { type BubbleTone } from "./StatusBubble";
import { DOOR_X, DOOR_Y, PROVIDERS, deskById } from "./sim/cast";
import type { WorkerState } from "./sim/types";
import { useWorker } from "./useOfficeSim";
import type { OfficeStore } from "./sim/store";

/** Where a wandering worker stands — the water-cooler corner, per the mockup. */
const WANDER_X = 712;
const WANDER_Y = 186;

const CONFETTI = ["c1", "c2", "c3", "c4", "c5", "c6"] as const;

const STATUS_WORD: Record<WorkerState["status"], string> = {
  working: "working",
  thinking: "thinking",
  waiting: "waiting for you",
  done: "finished",
  idle: "paused",
  walking: "away from the desk",
};

const BUBBLE_TONE: Record<WorkerState["status"], BubbleTone> = {
  working: "default",
  thinking: "default",
  waiting: "warn",
  done: "done",
  idle: "default",
  walking: "walk",
};

type WorkerVars = CSSProperties &
  Record<
    | "--aw-x"
    | "--aw-y"
    | "--aw-z"
    | "--aw-skin"
    | "--aw-torso-a"
    | "--aw-torso-b"
    | "--aw-lamp"
    | "--aw-fill"
    | "--g"
    | "--aw-walk-dx"
    | "--aw-walk-dy",
    string
  >;

function lampColour(worker: WorkerState): string {
  switch (worker.status) {
    case "waiting":
      return "#ffc454";
    case "done":
      return "#7fd48a";
    case "idle":
      return "#4a4162";
    default:
      return PROVIDERS[worker.provider].color;
  }
}

function lampGlow(worker: WorkerState): string {
  switch (worker.status) {
    case "waiting":
      return "rgba(255, 196, 84, 0.5)";
    case "done":
      return "rgba(127, 212, 138, 0.5)";
    case "idle":
      return "rgba(74, 65, 98, 0)";
    default:
      return PROVIDERS[worker.provider].glow;
  }
}

/** Stable DOM id so focus can be handed back when the panel closes. */
export function workerButtonId(panelId: string, workerId: string): string {
  return `${panelId}-src-${workerId}`;
}

export interface WorkerProps {
  store: OfficeStore;
  id: string;
  selected: boolean;
  panelId: string;
  onSelect: (id: string) => void;
}

function WorkerImpl({ store, id, selected, panelId, onSelect }: WorkerProps) {
  const worker = useWorker(store, id);
  if (!worker) return null;

  const provider = PROVIDERS[worker.provider];
  const desk = deskById(worker.deskId);
  const walking = worker.status === "walking";
  const transiting = walking && worker.transit !== null;

  // Seated workers sit in a 150×150 box on their desk; a worker on the move
  // stands in a 60×86 box — by the cooler for a break, or on the line between
  // the door and their desk while arriving or leaving.
  const anchorX = walking ? (transiting ? desk.x + 45 : WANDER_X) : desk.x;
  const anchorY = walking ? (transiting ? desk.y + 40 : WANDER_Y) : desk.y;

  const style: WorkerVars = {
    "--aw-x": `${anchorX}px`,
    "--aw-y": `${anchorY}px`,
    "--aw-z": walking ? "4" : `${desk.z}`,
    "--aw-skin": worker.skin,
    "--aw-torso-a": provider.torsoFrom,
    "--aw-torso-b": provider.torsoTo,
    "--aw-lamp": lampColour(worker),
    "--aw-fill": worker.status === "done" ? "#7fd48a" : worker.status === "idle" ? "#8a7aa8" : provider.color,
    "--g": lampGlow(worker),
    "--aw-walk-dx": `${DOOR_X - (desk.x + 45)}px`,
    "--aw-walk-dy": `${DOOR_Y - (desk.y + 40)}px`,
  };

  const label = `${worker.name} on payments-api — ${STATUS_WORD[worker.status]}: ${worker.activity}`;

  return (
    <button
      type="button"
      id={workerButtonId(panelId, worker.id)}
      className="aw-w"
      data-status={worker.status}
      data-transit={worker.transit ?? "none"}
      data-shape={walking ? "walk" : "desk"}
      data-selected={selected ? "true" : "false"}
      style={style}
      aria-expanded={selected}
      aria-controls={panelId}
      aria-label={label}
      onClick={() => onSelect(worker.id)}
    >
      <span className="aw-w-lift" aria-hidden="true">
        <span className="aw-w-move">
          {walking ? (
            <>
              <StatusBubble text={worker.activity} tone="walk" />
              <span className="aw-w-waddle">
                <span className="aw-w-hair" />
                <span className="aw-w-head" />
                <span className="aw-w-eye aw-w-eye--l" />
                <span className="aw-w-eye aw-w-eye--r" />
                <span className="aw-w-torso" />
                <span className="aw-w-carry" />
                <span className="aw-w-leg aw-w-leg--l" />
                <span className="aw-w-leg aw-w-leg--r" />
              </span>
              <span className="aw-w-walkshadow" />
            </>
          ) : (
            <>
              <StatusBubble
                text={worker.activity}
                tone={BUBBLE_TONE[worker.status]}
                cursor={worker.status === "working" || worker.status === "thinking"}
              />

              {worker.status === "idle" ? (
                <span className="aw-w-zzz">
                  <span className="aw-w-z aw-w-z--1">z</span>
                  <span className="aw-w-z aw-w-z--2">z</span>
                  <span className="aw-w-z aw-w-z--3">Z</span>
                </span>
              ) : null}

              {worker.status === "done" ? (
                <span className="aw-w-confetti">
                  {CONFETTI.map((piece) => (
                    <span key={piece} className={`aw-w-conf aw-w-conf--${piece}`} />
                  ))}
                </span>
              ) : null}

              <span className="aw-w-chair" />

              <span className="aw-w-body">
                <span className="aw-w-hair" />
                <span className="aw-w-head" />
                <span className="aw-w-eye aw-w-eye--l" />
                <span className="aw-w-eye aw-w-eye--r" />
                <span className="aw-w-torso" />
                {worker.status === "idle" ? null : (
                  <>
                    <span className="aw-w-arm aw-w-arm--l" />
                    <span className="aw-w-arm aw-w-arm--r" />
                  </>
                )}
              </span>

              <span className="aw-w-monitor">
                <span className="aw-w-screen">
                  {worker.screen.map((line, index) => (
                    <span
                      key={`${line.text}-${index}`}
                      className="aw-w-screenline"
                      data-muted={line.muted ? "true" : "false"}
                    >
                      {line.text}
                    </span>
                  ))}
                </span>
                <span className="aw-w-stand" />
                <span className="aw-w-base" />
              </span>

              <span className="aw-w-lamppost">
                <span className="aw-w-pole" />
                <span className="aw-w-bulb" />
              </span>

              {worker.papers > 0 ? (
                <span className="aw-w-papers" data-count={worker.papers}>
                  <span className="aw-w-sheet" />
                  {worker.papers > 1 ? <span className="aw-w-papercount">×2</span> : null}
                </span>
              ) : null}

              <Desk nameplate={worker.nameplate} progress={worker.progress} />
            </>
          )}
        </span>
      </span>
    </button>
  );
}

const Worker = memo(WorkerImpl);
Worker.displayName = "Worker";

export default Worker;
