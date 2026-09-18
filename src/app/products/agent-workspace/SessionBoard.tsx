"use client";

import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { useEffect, useState } from "react";

import PenMark from "@/components/motion/PenMark";
import { useOnScreen } from "@/components/motion/useInView";

/* ------------------------------------------------------------------
   One floor of Agent Workspace, played as paper session cards on the
   desk. The whole thing is a fixed script: every card has one frame per
   beat, so the server and the browser render the same first frame, and
   the loop is the same for every visitor. Beat 0 is a good still (one
   card working, one thinking, one waiting for you, one done), which is
   what reduced motion and the server show.
   ------------------------------------------------------------------ */

type Status = "working" | "thinking" | "waiting" | "done";

type Frame = {
  status: Status;
  /** What the session is doing, or what it is asking you. */
  line: string;
  /** Task progress for working frames, 0 to 100. */
  progress?: number;
  /** A short note the pen leaves after you step in. */
  note?: string;
};

type Session = {
  id: string;
  agent: string;
  detail: string;
  frames: Frame[];
};

const BEATS = 12;
const BEAT_MS = 2600;
const START_MINUTES = 14 * 60 + 29;

const statusLabel: Record<Status, string> = {
  working: "Working",
  thinking: "Thinking",
  waiting: "Waiting for you",
  done: "Done",
};

const sessions: Session[] = [
  {
    id: "claude",
    agent: "Claude Code",
    detail: "Sonnet",
    frames: [
      { status: "working", line: "Editing auth/middleware.ts", progress: 42 },
      { status: "working", line: "Rewriting the token refresh", progress: 58 },
      { status: "thinking", line: "Weighing two approaches" },
      { status: "waiting", line: "Overwrite config.toml?" },
      { status: "waiting", line: "Overwrite config.toml?" },
      { status: "working", line: "Running the auth suite", progress: 81, note: "You approved it" },
      { status: "working", line: "Tidying up the diff", progress: 93 },
      { status: "done", line: "118 of 118 tests pass. The PR is ready." },
      { status: "done", line: "118 of 118 tests pass. The PR is ready." },
      { status: "working", line: "Reading the migration history", progress: 12 },
      { status: "thinking", line: "Planning the next pass" },
      { status: "working", line: "Editing auth/session.ts", progress: 30 },
    ],
  },
  {
    id: "codex",
    agent: "Codex CLI",
    detail: "Codex",
    frames: [
      { status: "thinking", line: "Planning the next pass" },
      { status: "working", line: "Running pytest -q", progress: 20 },
      { status: "working", line: "Chasing a flaky test", progress: 46 },
      { status: "working", line: "Chasing a flaky test", progress: 61 },
      { status: "working", line: "Wiring up the webhook", progress: 77 },
      { status: "done", line: "244 of 244 green. The PR is ready." },
      { status: "done", line: "244 of 244 green. The PR is ready." },
      { status: "working", line: "Writing the changelog entry", progress: 30 },
      { status: "working", line: "Trimming the fixtures", progress: 55 },
      { status: "waiting", line: "Push straight to main?" },
      { status: "waiting", line: "Push straight to main?" },
      { status: "working", line: "Opening a pull request instead", progress: 70, note: "You said no" },
    ],
  },
  {
    id: "gemini",
    agent: "Gemini CLI",
    detail: "Flash",
    frames: [
      { status: "waiting", line: "Approve the schema change?" },
      { status: "working", line: "Drafting the migration", progress: 35, note: "You approved it" },
      { status: "working", line: "Drafting the migration", progress: 52 },
      { status: "thinking", line: "Sketching the query plan" },
      { status: "working", line: "Checking the indexes", progress: 70 },
      { status: "working", line: "Checking the indexes", progress: 84 },
      { status: "done", line: "Migration written. Take a look." },
      { status: "done", line: "Migration written. Take a look." },
      { status: "working", line: "Scanning the schema", progress: 15 },
      { status: "thinking", line: "Reading the room" },
      { status: "working", line: "Counting the call sites", progress: 40 },
      { status: "working", line: "Counting the call sites", progress: 62 },
    ],
  },
  {
    id: "subagent",
    agent: "Claude Code",
    detail: "Haiku, a subagent",
    frames: [
      { status: "done", line: "Found 14 call sites. Handed back." },
      { status: "working", line: "Reading src/api", progress: 18 },
      { status: "working", line: "Reading src/api", progress: 40 },
      { status: "working", line: "Mapping the webhook handlers", progress: 66 },
      { status: "thinking", line: "Weighing two approaches" },
      { status: "waiting", line: "Delete the legacy adapter?" },
      { status: "waiting", line: "Delete the legacy adapter?" },
      { status: "working", line: "Removing the legacy adapter", progress: 72, note: "You approved it" },
      { status: "working", line: "Running the webhook tests", progress: 90 },
      { status: "done", line: "All webhook tests pass. Handed back." },
      { status: "done", line: "All webhook tests pass. Handed back." },
      { status: "thinking", line: "Planning the next pass" },
    ],
  },
];

const floors = ["payments-api", "web-client", "infra"];

/** What changed at each beat, for the log under the cards. */
function eventsAt(beat: number): string[] {
  const previous = (beat - 1 + BEATS) % BEATS;
  const events: string[] = [];

  for (const session of sessions) {
    const now = session.frames[beat];
    const before = session.frames[previous];
    const name = `${session.agent} (${session.detail.split(",")[0]})`;

    if (now.status === "waiting" && before.status !== "waiting") {
      events.push(`${name} is asking: ${now.line}`);
    } else if (now.status === "done" && before.status !== "done") {
      events.push(`${name} finished. ${now.line}`);
    } else if (now.note && before.status === "waiting") {
      events.push(`${name} is back to work.`);
    }
  }

  return events;
}

/** A minute passes on the board's clock with every beat played. */
function clock(played: number) {
  const minutes = START_MINUTES + played;
  const hours = Math.floor(minutes / 60) % 24;
  return `${hours}:${String(minutes % 60).padStart(2, "0")}`;
}

/** The last few things that happened, newest first. */
function logAt(visits: number) {
  const lines: { key: string; time: string; text: string }[] = [];

  for (let step = 0; step < BEATS && lines.length < 3; step++) {
    const absolute = visits - step;
    if (absolute < 0) break;
    const at = ((absolute % BEATS) + BEATS) % BEATS;
    for (const text of eventsAt(at)) {
      if (lines.length < 3) lines.push({ key: `${absolute}-${text}`, time: clock(absolute), text });
    }
  }

  if (lines.length === 0) {
    lines.push({ key: "start", time: clock(visits), text: "Four sessions on this floor." });
  }

  return lines;
}

function StatusChip({ status }: { status: Status }) {
  return (
    <span className="aw-status" data-status={status}>
      <span className="aw-status-dot" aria-hidden="true" />
      {statusLabel[status]}
    </span>
  );
}

function SessionCard({ session, frame }: { session: Session; frame: Frame }) {
  const waiting = frame.status === "waiting";

  return (
    <li className="aw-card" data-status={frame.status}>
      {waiting ? (
        <PenMark key={frame.line} kind="circle" play inset="-14px -10px -16px -12px" />
      ) : null}

      <div className="aw-card-top">
        <p className="aw-card-agent">
          <strong>{session.agent}</strong>
          <span>{session.detail}</span>
        </p>
        <StatusChip status={frame.status} />
      </div>

      <p className="aw-card-line">{frame.line}</p>

      <div className="aw-card-foot">
        {waiting ? (
          <span className="aw-ask">
            <span className="aw-ask-yes">Approve</span>
            <span className="aw-ask-no">Deny</span>
          </span>
        ) : frame.status === "done" ? (
          <span className="aw-card-done">Ready for review</span>
        ) : frame.status === "thinking" ? (
          <span className="aw-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        ) : (
          <span className="aw-progress">
            <span className="aw-progress-bar">
              <span style={{ width: `${frame.progress ?? 0}%` }} />
            </span>
            <span className="aw-progress-num">{frame.progress ?? 0}%</span>
          </span>
        )}
        {frame.note ? <span className="aw-card-note">{frame.note}</span> : null}
      </div>
    </li>
  );
}

export default function SessionBoard() {
  const reduceMotion = useReducedMotion();
  const [rootRef, onScreen] = useOnScreen<HTMLDivElement>("80px");
  const [pageVisible, setPageVisible] = useState(true);
  // Beats played so far. The frame on screen is visits % BEATS.
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  // One timer, and only while someone can see the board.
  const running = !reduceMotion && onScreen && pageVisible;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setVisits((count) => count + 1), BEAT_MS);
    return () => window.clearTimeout(timer);
  }, [running, visits]);

  const beat = reduceMotion ? 0 : visits % BEATS;
  const frames = sessions.map((session) => session.frames[beat]);
  const waitingCount = frames.filter((frame) => frame.status === "waiting").length;
  const log = logAt(reduceMotion ? 0 : visits);

  return (
    <div className="aw-board-wrap" ref={rootRef}>
      <div className="aw-board paper" aria-hidden="true" data-running={running}>
        <div className="aw-board-head">
          <ul className="aw-floors">
            {floors.map((floor, index) => (
              <li key={floor} className={index === 0 ? "chip chip-pen" : "chip"}>
                {floor}
              </li>
            ))}
          </ul>
          <p className="aw-board-count">
            {`${sessions.length} sessions, ${
              waitingCount > 0 ? `${waitingCount} waiting for you` : "none waiting"
            }`}
          </p>
        </div>

        <ul className="aw-cards">
          {sessions.map((session, index) => (
            <SessionCard key={session.id} session={session} frame={frames[index]} />
          ))}
        </ul>

        <ol className="aw-log">
          {log.map((entry) => (
            <li key={entry.key}>
              <span className="aw-log-time">{entry.time}</span>
              <span>{entry.text}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className="sr-only">
        A preview of one project floor in Agent Workspace. Four coding sessions from
        Claude Code, Codex CLI, and Gemini CLI move between working, thinking, waiting
        for your approval, and done. A session that needs you is circled in red.
      </p>
    </div>
  );
}
