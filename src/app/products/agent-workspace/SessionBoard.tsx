import { CheckIcon } from "@/components/icons";

/* ------------------------------------------------------------------
   One floor of Agent Workspace as a still picture: one session working,
   one thinking, one waiting for you (circled in red pen), and one done.
   Decorative and hidden from assistive tech; the sr-only paragraph
   describes it.
   ------------------------------------------------------------------ */

type Status = "working" | "thinking" | "waiting" | "done";

type Session = {
  id: string;
  agent: string;
  detail: string;
  status: Status;
  /** What the session is doing, or what it is asking you. */
  line: string;
  /** Task progress for working sessions, 0 to 100. */
  progress?: number;
};

const statusLabel: Record<Status, string> = {
  working: "Working",
  thinking: "Thinking",
  waiting: "Waiting for you",
  done: "Done",
};

const chipTone: Record<Status, string> = {
  working: "bg-wash text-ink",
  thinking: "bg-wash text-stone",
  waiting: "bg-red-tint text-red",
  done: "bg-wash text-ink",
};

const dotTone: Record<Status, string> = {
  working: "bg-pen",
  thinking: "bg-stone/50",
  waiting: "bg-red",
  done: "bg-ink",
};

const sessions: Session[] = [
  {
    id: "claude",
    agent: "Claude Code",
    detail: "Sonnet",
    status: "working",
    line: "Editing auth/middleware.ts",
    progress: 42,
  },
  {
    id: "codex",
    agent: "Codex CLI",
    detail: "Codex",
    status: "thinking",
    line: "Planning the next pass",
  },
  {
    id: "gemini",
    agent: "Gemini CLI",
    detail: "Flash",
    status: "waiting",
    line: "Approve the schema change?",
  },
  {
    id: "subagent",
    agent: "Claude Code",
    detail: "Haiku, a subagent",
    status: "done",
    line: "Found 14 call sites. Handed back.",
  },
];

const floors = ["payments-api", "web-client", "infra"];

const log = [
  { time: "14:29", text: "Gemini CLI (Flash) is asking: Approve the schema change?" },
  { time: "14:29", text: "Claude Code (Haiku) finished. Found 14 call sites. Handed back." },
];

const waitingCount = sessions.filter((session) => session.status === "waiting").length;

/** A loose loop of red pen around the card that needs you. */
function PenCircle() {
  return (
    <svg
      viewBox="0 0 200 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -left-3 -top-3 h-[calc(100%_+_1.5rem)] w-[calc(100%_+_1.5rem)] text-red"
    >
      <path
        d="M 22 4 C 70 1, 140 2, 186 4 C 197 5, 199 12, 198 30 C 197 55, 199 78, 196 92 C 194 98, 186 99, 170 98 C 120 97, 70 99, 22 97 C 8 96, 2 92, 2 76 C 1 55, 3 30, 3 16 C 3 6, 10 2, 34 2 C 50 1.5, 64 2, 80 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function SessionCard({ session }: { session: Session }) {
  const { status } = session;

  return (
    <li className="relative rounded-2xl bg-paper p-4 ring-1 ring-line">
      {status === "waiting" ? <PenCircle /> : null}

      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0">
          <strong className="block truncate text-[13.5px] font-semibold text-ink">
            {session.agent}
          </strong>
          <span className="block truncate text-[11.5px] text-stone">{session.detail}</span>
        </p>
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${chipTone[status]}`}
        >
          <span className={`size-1.5 rounded-full ${dotTone[status]}`} />
          {statusLabel[status]}
        </span>
      </div>

      <p className="mt-3 text-[14px] leading-[1.4] text-ink">{session.line}</p>

      <div className="mt-4 flex min-h-7 items-center">
        {status === "waiting" ? (
          <span className="flex gap-2">
            <span className="rounded-full bg-ink px-3 py-1.5 text-[12px] font-semibold text-white">
              Approve
            </span>
            <span className="rounded-full px-3 py-1.5 text-[12px] font-semibold text-ink ring-1 ring-line">
              Deny
            </span>
          </span>
        ) : status === "done" ? (
          <span className="inline-flex items-center gap-2 text-[12.5px] font-medium text-stone">
            <span className="inline-flex size-4 items-center justify-center rounded-full bg-ink text-white">
              <CheckIcon className="size-2.5" />
            </span>
            Ready for review
          </span>
        ) : status === "thinking" ? (
          <span className="flex gap-1.5">
            <span className="size-1.5 rounded-full bg-stone/50" />
            <span className="size-1.5 rounded-full bg-stone/50" />
            <span className="size-1.5 rounded-full bg-stone/50" />
          </span>
        ) : (
          <span className="flex w-full items-center gap-3">
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-wash">
              <span
                className="block h-full rounded-full bg-ink"
                style={{ width: `${session.progress ?? 0}%` }}
              />
            </span>
            <span className="text-[12px] font-medium tabular-nums text-stone">
              {session.progress ?? 0}%
            </span>
          </span>
        )}
      </div>
    </li>
  );
}

export default function SessionBoard() {
  return (
    <div>
      <div
        aria-hidden="true"
        className="select-none rounded-[22px] bg-paper p-4 shadow-[0_24px_60px_-24px_rgba(36,30,24,0.35)] ring-1 ring-line sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <ul className="flex flex-wrap gap-2">
            {floors.map((floor, index) => (
              <li
                key={floor}
                className={`rounded-full px-3 py-1 text-[12.5px] font-semibold ${
                  index === 0 ? "bg-ink text-white" : "text-stone ring-1 ring-line"
                }`}
              >
                {floor}
              </li>
            ))}
          </ul>
          <p className="text-[13px] text-stone">
            {`${sessions.length} sessions, ${
              waitingCount > 0 ? `${waitingCount} waiting for you` : "none waiting"
            }`}
          </p>
        </div>

        <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </ul>

        <ol className="mt-6 space-y-2 border-t border-line pt-4">
          {log.map((entry) => (
            <li key={entry.text} className="flex gap-3 text-[12.5px] leading-[1.45]">
              <span className="shrink-0 tabular-nums text-stone">{entry.time}</span>
              <span className="min-w-0 text-ink-soft">{entry.text}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className="sr-only">
        A preview of one project floor in Agent Workspace. Four coding sessions from Claude
        Code, Codex CLI, and Gemini CLI move between working, thinking, waiting for your
        approval, and done. A session that needs you is circled in red.
      </p>
    </div>
  );
}
