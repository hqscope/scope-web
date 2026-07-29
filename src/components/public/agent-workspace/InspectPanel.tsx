"use client";

import { forwardRef, type CSSProperties } from "react";

import { PROVIDERS } from "./sim/cast";
import type { OfficeStore } from "./sim/store";
import type { WorkerState } from "./sim/types";
import { useWorker } from "./useOfficeSim";

const STATUS_WORD: Record<WorkerState["status"], string> = {
  working: "working",
  thinking: "thinking",
  waiting: "needs you",
  done: "finished",
  idle: "paused",
  walking: "away",
};

function formatTokens(tokens: number): string {
  if (tokens >= 1_000_000) return `${(tokens / 1_000_000).toFixed(1)}M`;
  if (tokens >= 1_000) return `${Math.round(tokens / 1_000)}K`;
  return `${tokens}`;
}

function formatCost(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatElapsed(seconds: number): string {
  const total = Math.max(0, Math.round(seconds));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const rest = total % 60;
  if (hours > 0) return `${hours}h ${String(minutes).padStart(2, "0")}m`;
  return `${minutes}m ${String(rest).padStart(2, "0")}s`;
}

type PanelVars = CSSProperties & Record<"--aw-av-a" | "--aw-av-b", string>;

export interface InspectPanelProps {
  store: OfficeStore;
  workerId: string;
  panelId: string;
  /** Simulated clock, for the "working · 14m 22s" line. */
  nowSec: number;
  onClose: () => void;
}

/**
 * The session, opened beside the office. Same card as the one on the marketing
 * page — the numbers here are the simulation's, not decoration.
 */
const InspectPanel = forwardRef<HTMLElement, InspectPanelProps>(
  function InspectPanel({ store, workerId, panelId, nowSec, onClose }, ref) {
    const worker = useWorker(store, workerId);
    if (!worker) return null;

    const provider = PROVIDERS[worker.provider];
    const style: PanelVars = {
      "--aw-av-a": provider.avatarFrom,
      "--aw-av-b": provider.color,
    };

    return (
      <section
        id={panelId}
        ref={ref}
        className="aw-demo-inspect"
        aria-labelledby={`${panelId}-name`}
      >
        <div className="aw-ip" style={style}>
          <div className="aw-ip-head">
            <div className="aw-ip-avatar" aria-hidden="true" />
            <div className="aw-ip-id">
              <h3 className="aw-ip-name" id={`${panelId}-name`}>
                {worker.name}
              </h3>
              <p className="aw-ip-status" data-status={worker.status}>
                <span aria-hidden="true">● </span>
                {STATUS_WORD[worker.status]} ·{" "}
                {formatElapsed(nowSec - worker.startedAtSec)}
              </p>
            </div>
            <p className="aw-ip-desk">desk {worker.deskId}</p>
            <button
              type="button"
              className="aw-demo-inspect-close"
              onClick={onClose}
              aria-label="Close session"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="aw-ip-tiles">
            <div className="aw-ip-tile">
              <div className="aw-ip-tile-num">{formatTokens(worker.tokens)}</div>
              <div className="aw-ip-tile-cap">tokens</div>
            </div>
            <div className="aw-ip-tile">
              <div className="aw-ip-tile-num">{formatCost(worker.costCents)}</div>
              <div className="aw-ip-tile-cap">cost</div>
            </div>
            <div className="aw-ip-tile">
              <div className="aw-ip-tile-num">{worker.progress}%</div>
              <div className="aw-ip-tile-cap">task</div>
            </div>
          </div>

          <div className="aw-ip-tabs" aria-hidden="true">
            <div className="aw-ip-tab is-active">Chat</div>
            <div className="aw-ip-tab">Terminal</div>
            <div className="aw-ip-tab">Activity</div>
          </div>

          <div className="aw-ip-thread">
            <p className="aw-ip-msg aw-ip-msg--agent">
              On the auth middleware refactor — six files in, tests running now.
            </p>
            <p className="aw-ip-msg aw-ip-msg--you">
              skip the legacy adapter, it&rsquo;s getting deleted
            </p>
            <p className="aw-ip-msg aw-ip-msg--agent">
              on it — I&rsquo;ll fold that into the current pass.
            </p>
          </div>

          <div className="aw-ip-input">
            <span className="aw-ip-field">
              <input
                className="aw-demo-inspect-field"
                type="text"
                disabled
                placeholder="message claude…"
                aria-label="Message this agent (preview only)"
              />
              <span className="aw-w-caret" aria-hidden="true">
                ▍
              </span>
            </span>
            <button type="button" className="aw-ip-send" disabled>
              Send
            </button>
          </div>
        </div>
      </section>
    );
  },
);

export default InspectPanel;
