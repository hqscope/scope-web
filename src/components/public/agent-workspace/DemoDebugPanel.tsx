"use client";

import { useState } from "react";

import { determinismCheck } from "./sim/engine";
import type { OfficeStore } from "./sim/store";
import type { WorkerStatus } from "./sim/types";
import { useOfficeMeta, useWorkerIds } from "./useOfficeSim";

const STATUSES: readonly WorkerStatus[] = [
  "working",
  "thinking",
  "waiting",
  "done",
  "idle",
  "walking",
];

const SPEEDS: readonly number[] = [1, 4, 16];

export interface DemoDebugPanelProps {
  store: OfficeStore;
  seed: number;
  onSeedChange: (seed: number) => void;
}

/**
 * Development-only instrumentation, reachable at `?aw-debug=1`.
 * Never shipped: the whole component compiles out in production builds.
 */
export default function DemoDebugPanel({
  store,
  seed,
  onSeedChange,
}: DemoDebugPanelProps) {
  const ids = useWorkerIds(store);
  const meta = useOfficeMeta(store);
  const [speed, setSpeed] = useState(1);
  const [seedDraft, setSeedDraft] = useState(String(seed));
  const [determinism, setDeterminism] = useState<string>("not run");

  if (process.env.NODE_ENV === "production") return null;

  const report = store.engine.checkInvariants();

  return (
    <div className="aw-demo-debug">
      <p className="aw-demo-debug-head">aw-debug · seed {seed}</p>

      <div className="aw-demo-debug-row">
        {SPEEDS.map((multiplier) => (
          <button
            key={multiplier}
            type="button"
            data-on={speed === multiplier ? "true" : "false"}
            onClick={() => {
              setSpeed(multiplier);
              store.setSpeed(multiplier);
            }}
          >
            ×{multiplier}
          </button>
        ))}
        <input
          type="text"
          inputMode="numeric"
          value={seedDraft}
          aria-label="Seed"
          onChange={(event) => setSeedDraft(event.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            const parsed = Number.parseInt(seedDraft, 10);
            if (Number.isFinite(parsed)) onSeedChange(parsed);
          }}
        >
          reinit
        </button>
      </div>

      <div className="aw-demo-debug-matrix">
        {ids.map((id) => (
          <div key={id} className="aw-demo-debug-row">
            <span className="aw-demo-debug-id">{id}</span>
            {STATUSES.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => store.forceStatus(id, status)}
              >
                {status.slice(0, 4)}
              </button>
            ))}
          </div>
        ))}
      </div>

      <p className="aw-demo-debug-line" data-ok={report.ok ? "true" : "false"}>
        invariants: {report.ok ? "PASS" : report.failures.join(" · ")} · occupancy{" "}
        {meta.workerCount} · waiting {meta.waitingCount}
      </p>

      <div className="aw-demo-debug-row">
        <button
          type="button"
          onClick={() => {
            const result = determinismCheck(seed, 200);
            setDeterminism(
              result.ok ? "PASS (200 events × 2 runs)" : `FAIL at #${result.divergedAt}`,
            );
          }}
        >
          determinism
        </button>
        <span className="aw-demo-debug-id">{determinism}</span>
      </div>
    </div>
  );
}
