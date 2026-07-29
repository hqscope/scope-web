/**
 * The cast: providers, desks, the copy pools every worker draws from, and the
 * posed opening scene.
 *
 * `buildInitialScene()` is pure — same seed in, same scene out, on the server
 * and in the browser. That is what keeps the first paint identical on both
 * sides and the office legible with JavaScript switched off.
 */

import { mulberry32, pick, rangeInt, type Rng } from "./prng";
import type {
  DeskSlot,
  ProviderId,
  ProviderSpec,
  SceneEvent,
  SceneState,
  ScreenLine,
  WorkerState,
  WorkerStatus,
} from "./types";

/** Simulated seconds per real second — keeps the clock readable. */
export const SIM_TIME_SCALE = 40;

/** 14:29, the moment the mockup's event log is frozen at. */
export const SCENE_START_SEC = 14 * 3600 + 29 * 60;

export const DEFAULT_SEED = 20260722;

export const WORLD_WIDTH = 960;
export const WORLD_HEIGHT = 580;

/** Where a worker enters from and leaves to (the IN·OUT door). */
export const DOOR_X = 96;
export const DOOR_Y = 250;

export const MIN_OCCUPANCY = 4;
export const MAX_OCCUPANCY = 6;
export const FEED_SLOTS = 6;
export const EVENT_SLOTS = 6;

export const PROVIDERS: Record<ProviderId, ProviderSpec> = {
  claude: {
    id: "claude",
    label: "Claude Code",
    color: "#d97757",
    torsoFrom: "#eda184",
    torsoTo: "#d97757",
    glow: "rgba(217, 119, 87, 0.55)",
    avatarFrom: "#f0a184",
  },
  codex: {
    id: "codex",
    label: "Codex CLI",
    color: "#10a37f",
    torsoFrom: "#3ec9a0",
    torsoTo: "#10a37f",
    glow: "rgba(16, 163, 127, 0.5)",
    avatarFrom: "#4fd1ab",
  },
  gemini: {
    id: "gemini",
    label: "Gemini CLI",
    color: "#4285f4",
    torsoFrom: "#7ba8f0",
    torsoTo: "#4285f4",
    glow: "rgba(66, 133, 244, 0.5)",
    avatarFrom: "#8ab4f8",
  },
};

/**
 * Desk slots in world coordinates. 01–04 are the mockup's four occupied
 * desks; 05 fills the gap on the back row; 06 is the dashed vacant desk.
 */
export const DESKS: readonly DeskSlot[] = [
  { id: "01", x: 275, y: 305, z: 5 },
  { id: "02", x: 585, y: 170, z: 2 },
  { id: "03", x: 535, y: 305, z: 5 },
  { id: "04", x: 180, y: 180, z: 2 },
  { id: "05", x: 380, y: 170, z: 2 },
  { id: "06", x: 415, y: 425, z: 6 },
];

export function deskById(id: string): DeskSlot {
  return DESKS.find((desk) => desk.id === id) ?? DESKS[0];
}

/* ---------------------------------------------------------------- copy --- */

const WORKING_LINES: Record<ProviderId, readonly string[]> = {
  claude: [
    "editing auth/middleware.ts",
    "Δ src/auth ×6",
    "rewriting the token refresh",
    "reading the migration history",
    "running the auth suite",
    "tidying up the diff",
  ],
  codex: [
    "running pytest -q",
    "regenerating the client",
    "chasing a flaky test",
    "wiring up the webhook",
    "writing the changelog entry",
    "trimming the fixtures",
  ],
  gemini: [
    "scanning the schema",
    "drafting the migration",
    "diffing web-client",
    "counting the call sites",
    "sketching the query plan",
    "checking the indexes",
  ],
};

const THINKING_LINES: readonly string[] = [
  "thinking it through…",
  "planning the next pass…",
  "reading the room…",
  "weighing two approaches…",
];

const WAITING_LINES: Record<ProviderId, readonly string[]> = {
  claude: ["⚠ overwrite config.toml? y/n", "⚠ delete the legacy adapter? y/n"],
  codex: ["⚠ push straight to main? y/n", "⚠ bump the major version? y/n"],
  gemini: ["⚠ approve schema change? y/n", "⚠ drop the old index? y/n"],
};

const DONE_LINES: Record<ProviderId, readonly string[]> = {
  claude: ["✓ auth pass green — PR ready!", "✓ 118/118 — PR ready!"],
  codex: ["✓ 244/244 — PR ready!", "✓ green across the board!"],
  gemini: ["✓ migration written — take a look", "✓ schema mapped — PR ready!"],
};

const IDLE_LINES: readonly string[] = ["⏸ paused", "⏸ paused — back soon"];

const WANDER_LINES: readonly string[] = [
  "brb — water break",
  "off to refill the coffee",
  "stretching the legs",
];

const ARRIVING_LINES: readonly string[] = [
  "morning — which desk?",
  "just moved in",
  "here for the payments work",
];

const LEAVING_LINES: readonly string[] = [
  "that's me — good night",
  "handing over, back tomorrow",
  "clocking out",
];

/** Short command fragments for the monitor's first line. */
const COMMANDS: Record<ProviderId, readonly string[]> = {
  claude: ["$ edit mw.ts", "$ read auth/*", "$ test auth"],
  codex: ["$ pytest -q", "$ gen client", "$ lint --fix"],
  gemini: ["$ scan schema", "$ diff web", "$ plan query"],
};

/* --------------------------------------------------------------- roster --- */

export interface RosterEntry {
  readonly provider: ProviderId;
  readonly name: string;
  readonly nameplate: string;
  readonly skin: string;
}

/** Candidates that walk in when a desk frees up. */
export const HIRE_POOL: readonly RosterEntry[] = [
  {
    provider: "codex",
    name: "Codex",
    nameplate: "CODEX",
    skin: "#8a5a3c",
  },
  {
    provider: "gemini",
    name: "Gemini · Flash",
    nameplate: "GEMINI · FLASH",
    skin: "#c9dcf5",
  },
  {
    provider: "claude",
    name: "Claude · Sonnet",
    nameplate: "CLAUDE · SONNET",
    skin: "#f0c9a8",
  },
  {
    provider: "claude",
    name: "Claude · Haiku",
    nameplate: "CLAUDE · HAIKU",
    skin: "#d9a066",
  },
  {
    provider: "claude",
    name: "Claude · Opus",
    nameplate: "CLAUDE · OPUS",
    skin: "#f0c9a8",
  },
  {
    provider: "codex",
    name: "Codex · mini",
    nameplate: "CODEX · MINI",
    skin: "#8a5a3c",
  },
];

/* ---------------------------------------------------------------- lines --- */

export function activityFor(
  rng: Rng,
  provider: ProviderId,
  status: WorkerStatus,
  transit: "arriving" | "leaving" | null,
): string {
  switch (status) {
    case "working":
      return pick(rng, WORKING_LINES[provider]);
    case "thinking":
      return pick(rng, THINKING_LINES);
    case "waiting":
      return pick(rng, WAITING_LINES[provider]);
    case "done":
      return pick(rng, DONE_LINES[provider]);
    case "idle":
      return pick(rng, IDLE_LINES);
    case "walking":
      if (transit === "arriving") return pick(rng, ARRIVING_LINES);
      if (transit === "leaving") return pick(rng, LEAVING_LINES);
      return pick(rng, WANDER_LINES);
  }
}

export function screenFor(
  rng: Rng,
  provider: ProviderId,
  status: WorkerStatus,
  progress: number,
  prNumber: number,
): readonly ScreenLine[] {
  switch (status) {
    case "working":
      return [
        { text: pick(rng, COMMANDS[provider]), muted: true },
        { text: `Δ ${pick(rng, ["src/auth", "src/api", "src/db"])} ×${rangeInt(rng, 2, 9)}` },
        { text: `${progress}% ▍` },
      ];
    case "thinking":
      return [
        { text: "$ read -R", muted: true },
        { text: `${rangeInt(rng, 4, 18)} files in context` },
        { text: "thinking ▍" },
      ];
    case "waiting":
      return [
        { text: "? awaiting y/n" },
        { text: "awaiting input…", muted: true },
      ];
    case "done":
      return [
        { text: "✓ all green" },
        { text: "✓ lint · ✓ types" },
        { text: `PR #${prNumber} open` },
      ];
    case "idle":
      return [
        { text: "⏸ paused", muted: true },
        { text: "resumes 14:00", muted: true },
      ];
    case "walking":
      return [];
  }
}

/* ------------------------------------------------------- initial scene --- */

/**
 * The mockup's posed cast, exactly: Opus typing at 62%, Gemini blocked at 31%,
 * Codex celebrating at 100%, Haiku asleep at 45%, Sonnet off for water, desk 06
 * empty. Pure — no clock, no randomness outside the seeded stream.
 */
export function buildInitialScene(seed: number = DEFAULT_SEED): SceneState {
  const rng = mulberry32(seed);
  const t0 = SCENE_START_SEC;

  const workers: readonly WorkerState[] = [
    {
      id: "w-opus",
      provider: "claude",
      name: "Claude · Opus",
      nameplate: "CLAUDE · OPUS",
      skin: "#f0c9a8",
      deskId: "01",
      status: "working",
      transit: null,
      activity: "editing auth/middleware.ts",
      screen: [
        { text: "$ edit mw.ts", muted: true },
        { text: "Δ src/auth ×6" },
        { text: "62% ▍" },
      ],
      progress: 62,
      papers: 2,
      tokens: 84_000,
      costCents: 210,
      startedAtSec: t0 - 862,
      dueAtSec: t0 + Math.round(240 + rng() * 240),
      labelDueAtSec: t0 + Math.round(160 + rng() * 160),
      feed: [
        "editing auth/middleware.ts",
        "Δ src/auth ×6",
        "read the migration history",
      ],
    },
    {
      id: "w-gemini",
      provider: "gemini",
      name: "Gemini · 2.5 Pro",
      nameplate: "GEMINI · 2.5 PRO",
      skin: "#c9dcf5",
      deskId: "02",
      status: "waiting",
      transit: null,
      activity: "⚠ approve schema change? y/n",
      screen: [
        { text: "? schema y/n" },
        { text: "awaiting input…", muted: true },
      ],
      progress: 31,
      papers: 1,
      tokens: 41_000,
      costCents: 96,
      startedAtSec: t0 - 214,
      dueAtSec: t0 + Math.round(200 + rng() * 280),
      labelDueAtSec: Number.POSITIVE_INFINITY,
      feed: ["⚠ approve schema change? y/n", "drafting the migration", "scanning the schema"],
    },
    {
      id: "w-codex",
      provider: "codex",
      name: "Codex",
      nameplate: "CODEX",
      skin: "#8a5a3c",
      deskId: "03",
      status: "done",
      transit: null,
      activity: "✓ 244/244 — PR ready!",
      screen: [
        { text: "✓ 244/244" },
        { text: "✓ lint · ✓ types" },
        { text: "PR #482 open" },
      ],
      progress: 100,
      papers: 0,
      tokens: 128_000,
      costCents: 318,
      startedAtSec: t0 - 96,
      dueAtSec: t0 + Math.round(180 + rng() * 220),
      labelDueAtSec: Number.POSITIVE_INFINITY,
      feed: ["✓ 244/244 — PR ready!", "opened PR #482", "running pytest -q"],
    },
    {
      id: "w-haiku",
      provider: "claude",
      name: "Claude · Haiku",
      nameplate: "CLAUDE · HAIKU",
      skin: "#d9a066",
      deskId: "04",
      status: "idle",
      transit: null,
      activity: "⏸ paused",
      screen: [
        { text: "⏸ paused", muted: true },
        { text: "resumes 14:00", muted: true },
      ],
      progress: 45,
      papers: 0,
      tokens: 12_000,
      costCents: 24,
      startedAtSec: t0 - 1_340,
      dueAtSec: t0 + Math.round(260 + rng() * 300),
      labelDueAtSec: Number.POSITIVE_INFINITY,
      feed: ["⏸ paused", "handed the branch over", "trimmed the fixtures"],
    },
    {
      id: "w-sonnet",
      provider: "claude",
      name: "Claude · Sonnet",
      nameplate: "CLAUDE · SONNET",
      skin: "#f0c9a8",
      deskId: "05",
      status: "walking",
      transit: null,
      activity: "brb — water break",
      screen: [],
      progress: 18,
      papers: 0,
      tokens: 9_400,
      costCents: 18,
      startedAtSec: t0 - 40,
      dueAtSec: t0 + Math.round(150 + rng() * 200),
      labelDueAtSec: Number.POSITIVE_INFINITY,
      feed: ["brb — water break", "picked up the payments branch"],
    },
  ];

  const events: readonly SceneEvent[] = [
    { id: 4, atSec: t0, glyph: "⚠", text: "gemini needs input", tone: "warn" },
    { id: 3, atSec: t0 - 60, glyph: null, text: "codex opened PR #482", tone: "info" },
    { id: 2, atSec: t0 - 180, glyph: null, text: "claude edited 6 files", tone: "info" },
    { id: 1, atSec: t0 - 600, glyph: null, text: "pytest started", tone: "info" },
  ];

  return {
    seed,
    timeSec: t0,
    workers,
    events,
    eventSeq: 4,
    hireSeq: 0,
    prSeq: 482,
  };
}
