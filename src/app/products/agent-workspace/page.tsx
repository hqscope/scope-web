import Link from "next/link";

import { buttonClasses } from "@/components/buttons";
import { CheckIcon } from "@/components/icons";
import JsonLd from "@/components/seo/JsonLd";
import FaqList from "@/components/site/FaqList";
import Mark from "@/components/site/Mark";
import PageShell from "@/components/site/PageShell";
import { publicPageMetadata } from "@/lib/seo";
import { AGENT_WORKSPACE_DOWNLOAD_URL } from "@/lib/site";
import {
  agentWorkspaceSoftwareSchema,
  breadcrumbSchema,
  faqSchema,
  type FaqEntry,
} from "@/lib/structured-data";

import MenuBarSlip from "./MenuBarSlip";
import SessionBoard from "./SessionBoard";
import WaitlistForm from "./WaitlistForm";

export const metadata = publicPageMetadata({
  title: "Agent Workspace - Mission Control for AI Coding Agents",
  description:
    "Agent Workspace is a Mac app that turns every live AI coding session into a worker in an animated office. Claude Code, Codex, and Gemini agents appear the moment they start, typing, thinking, and raising a hand when they need you. Join the early-access waitlist.",
  path: "/products/agent-workspace",
  keywords: [
    "Agent Workspace",
    "AI coding agent dashboard",
    "Claude Code monitor",
    "Codex CLI",
    "Gemini CLI",
    "AI agent mission control",
    "Mac menu bar app",
    "multi-agent coding",
  ],
});

/* ------------------------------------------------------------------
   Launch-state CTA. Flip AGENT_WORKSPACE_DOWNLOAD_URL in src/lib/site.ts
   on launch day and every primary button on the page becomes the download.
   ------------------------------------------------------------------ */
const PRIMARY_CTA = AGENT_WORKSPACE_DOWNLOAD_URL
  ? { href: AGENT_WORKSPACE_DOWNLOAD_URL, label: "Download free for Mac" }
  : { href: "#early-access", label: "Get early access" };

const onInkSecondary =
  "inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-5 text-[15.5px] font-semibold tracking-[-0.01em] text-white ring-1 ring-inset ring-white/30 transition-colors hover:bg-white/10";

function PrimaryCta({ onInk = false }: { onInk?: boolean }) {
  return (
    <a className={buttonClasses(onInk ? "inverted" : "primary", "lg")} href={PRIMARY_CTA.href}>
      {PRIMARY_CTA.label}
    </a>
  );
}

function SecondaryCta({ onInk = false }: { onInk?: boolean }) {
  return (
    <a className={onInk ? onInkSecondary : buttonClasses("secondary", "lg")} href="#demo">
      See it live
    </a>
  );
}

/* ---------------------------------- copy ---------------------------------- */

const ideas = [
  {
    title: "A floor per repo",
    body: "Open a project and you get a floor. You scroll between floors like riding an elevator, and when you close a project its floor archives itself.",
  },
  {
    title: "A desk per agent",
    body: "Every session gets a little worker who types through tool calls, celebrates green tests, and dozes when it's paused.",
  },
  {
    title: "Step in with one click",
    body: "Blocked agents raise a hand. You can approve, deny, or open a chat and a terminal into the live session, right from the office.",
  },
];

type Dive = {
  id: string;
  title: string;
  lede: string;
  points: string[];
};

const dives: Dive[] = [
  {
    id: "dive-floors",
    title: "Ride the elevator between projects",
    lede: "Each repo lives on its own floor with its own crew. Scroll to ride between them, open a new floor when a project starts, and connect any folder on your Mac to bring it to life.",
    points: [
      "Scroll or use the arrow keys to change floors.",
      "Connect a repo and the floor takes its name.",
      "The lobby sleeps when nothing is running.",
    ],
  },
  {
    id: "dive-inspect",
    title: "Chat with any worker, or drop into their terminal",
    lede: "Click a desk and the session opens beside the office. You get live tokens, cost, and task progress, a chat thread that goes straight to the agent, and the raw terminal when you want to see everything.",
    points: [
      "Chat, terminal, and activity sit in one panel.",
      "Pause, resume, or kill any session.",
      "Token and cost meters are always live.",
    ],
  },
  {
    id: "dive-approvals",
    title: "Blocked agents raise a hand, literally",
    lede: "When a session needs sign-off, its worker hops with a hand up and a toast slides in. You approve or deny without leaving the room, and the character sits down and keeps going.",
    points: [
      "Toasts can be dismissed and are never modal.",
      "The hand stays up until you answer.",
    ],
  },
  {
    id: "dive-clock",
    title: "The office follows your clock",
    lede: "Morning sun comes through the windows, dusk settles over the skyline, and the lamps come on for the night shift. Agent Workspace is built to sit on a second display all day, calm and easy to glance at, and a little alive.",
    points: [
      "Day, dusk, and night, or pin the mood you like.",
      "Sound designed, with keyboard clacks off by default.",
    ],
  },
];

const details = [
  {
    title: "Lives in the menu bar",
    body: "The office is always one click away.",
  },
  {
    title: "Local-first",
    body: "Sessions, logs, and costs stay on your Mac.",
  },
  {
    title: "⌘N from anywhere",
    body: "Hire an agent onto any floor with one shortcut.",
  },
  {
    title: "Live meters",
    body: "Tokens, cost, and task progress on every desk.",
  },
  {
    title: "Every CLI is welcome",
    body: "Claude Code, Codex, and Gemini today, with more to come.",
  },
  {
    title: "Clean exits",
    body: "Close a project and its floor archives with its full history.",
  },
];

const FAQS: FaqEntry[] = [
  {
    question: "What is Agent Workspace?",
    answer:
      "It is a little office for your Mac where every AI coding session you run shows up as a worker at a desk. One glance tells you who is typing, who is thinking, and who is waiting on you.",
  },
  {
    question: "Which agents does it support?",
    answer:
      "Claude Code, Codex CLI, and Gemini CLI today, subagents included, and every one of them gets a desk. More agents will move in over time.",
  },
  {
    question: "Do I need to set anything up?",
    answer:
      "Run your agents the way you already do and they walk in on their own. Point the office at a folder and that project gets its own floor.",
  },
  {
    question: "Will it slow my agents down?",
    answer:
      "It is built to watch from the side and stays out of the path between you and your agents, so it should not change how fast they run.",
  },
  {
    question: "Does Agent Workspace send anything off my Mac?",
    answer:
      "Agent Workspace keeps sessions, logs, and costs on your Mac. Your agents still talk to their own providers exactly as they do without it.",
  },
  {
    question: "When can I use it?",
    answer:
      "Agent Workspace is still in the workshop. Join the waitlist and you will be among the first through the door, and it is free while it is in beta.",
  },
];

const container = "mx-auto max-w-[1200px] px-5 sm:px-8";
const sectionTitle =
  "text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-balance";
const bigTitle =
  "text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.03] tracking-[-0.04em] text-balance";

export default function AgentWorkspacePage() {
  return (
    <PageShell
      active="agent-workspace"
      cta={{
        label: "Get early access",
        href: "/products/agent-workspace#early-access",
      }}
    >
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Agent Workspace", path: "/products/agent-workspace" },
          ]),
          agentWorkspaceSoftwareSchema(),
          faqSchema(FAQS),
        ]}
      />

      {/* Hero */}
      <section aria-labelledby="aw-title" className={`${container} pb-16 pt-12 sm:pb-24 sm:pt-16`}>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
          <header className="min-w-0">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-x-2 text-[14px] text-stone">
                <li>
                  <Link href="/" className="hover:text-ink">
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  <Link href="/products/agent-workspace" className="hover:text-ink">
                    Agent Workspace
                  </Link>
                </li>
              </ol>
            </nav>
            <p className="mt-6 text-[15px] font-medium text-stone">
              Agent Workspace for Mac, in development
            </p>
            <h1
              id="aw-title"
              className="mt-5 max-w-[14ch] text-[clamp(2.6rem,6vw,4.75rem)] font-semibold leading-[0.97] tracking-[-0.046em]"
            >
              Every agent. Every repo. One office.
            </h1>
            <p className="mt-6 max-w-[48ch] text-[18px] leading-[1.55] text-ink-soft">
              Your Claude Code, Codex, and Gemini sessions, alive in a little office on your Mac.
              Watch them work, step in when they&rsquo;re stuck, and give every project its own
              floor.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PrimaryCta />
              <SecondaryCta />
            </div>
            <p className="mt-4 text-[14px] leading-[1.5] text-stone">
              For macOS 14 and later. It lives in your menu bar and works local-first.
            </p>
          </header>
          <MenuBarSlip />
        </div>
      </section>

      {/* The demo board */}
      <section
        id="demo"
        tabIndex={-1}
        aria-labelledby="aw-demo-title"
        className="bg-wash focus-visible:outline-none"
      >
        <div className={`${container} py-20 sm:py-24`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <h2 id="aw-demo-title" className={`${sectionTitle} max-w-[24ch]`}>
              Who is working, who is thinking, and who needs you.
            </h2>
            <p className="max-w-[42ch] text-[15.5px] leading-[1.6] text-stone">
              One project floor, playing on its own. When a session needs your approval, the pen
              circles it.
            </p>
          </div>
          <div className="mt-10">
            <SessionBoard />
          </div>
          <p className="mt-6 text-[15px] leading-[1.6] text-stone">
            Watches over Claude Code, Codex CLI, and Gemini CLI, and every subagent gets a desk.
          </p>
        </div>
      </section>

      {/* The three ideas */}
      <section aria-labelledby="aw-ideas-title" className={`${container} py-20 sm:py-28`}>
        <h2 id="aw-ideas-title" className={bigTitle}>
          Your agents, under one roof.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea) => (
            <div key={idea.title} className="border-t border-line py-7">
              <h3 className="text-[17px] font-semibold tracking-[-0.015em]">{idea.title}</h3>
              <p className="mt-2 text-[15.5px] leading-[1.6] text-stone">{idea.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* A closer look */}
      <section aria-labelledby="aw-dives-title" className="bg-wash">
        <div className={`${container} py-20 sm:py-28`}>
          <h2 id="aw-dives-title" className={bigTitle}>
            A closer look.
          </h2>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {dives.map((dive) => (
              <section
                key={dive.id}
                aria-labelledby={dive.id}
                className="grid grid-cols-1 gap-6 py-10 lg:grid-cols-2 lg:gap-16"
              >
                <div>
                  <h3
                    id={dive.id}
                    className="text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-balance"
                  >
                    {dive.title}
                  </h3>
                  <p className="mt-4 max-w-[52ch] text-[16.5px] leading-[1.65] text-ink-soft">
                    {dive.lede}
                  </p>
                </div>
                <ul className="space-y-3 lg:pt-2">
                  {dive.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[15.5px] leading-[1.55] text-ink-soft">
                      <span
                        aria-hidden="true"
                        className="mt-[3px] inline-flex size-[18px] shrink-0 items-center justify-center rounded-full bg-paper text-ink ring-1 ring-line"
                      >
                        <CheckIcon className="size-3" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* Details and questions */}
      <section aria-labelledby="aw-details-title" className={`${container} pt-20 sm:pt-28`}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10">
          <h2 id="aw-details-title" className={sectionTitle}>
            Built like a Mac app.
          </h2>
          <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {details.map((detail) => (
              <li key={detail.title} className="border-t border-line py-5">
                <strong className="block text-[16.5px] font-semibold tracking-[-0.01em] text-ink">
                  {detail.title}
                </strong>
                <span className="mt-1 block text-[15.5px] leading-[1.6] text-stone">
                  {detail.body}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby="aw-faq-title"
        className={`${container} pb-20 pt-16 sm:pb-28 sm:pt-20`}
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10">
          <h2 id="aw-faq-title" className={sectionTitle}>
            Common questions.
          </h2>
          <FaqList items={FAQS} />
        </div>
      </section>

      {/* Close */}
      <section
        id="early-access"
        tabIndex={-1}
        aria-labelledby="aw-closing-title"
        className="bg-ink text-white focus-visible:outline-none"
      >
        <div
          className={`${container} grid grid-cols-1 items-end gap-10 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16`}
        >
          <div>
            <Mark size={48} className="[--mark-ink:#ffffff]" />
            <p className="mt-6 text-[15px] font-medium text-white/60">Agent Workspace for Mac</p>
            <h2
              id="aw-closing-title"
              className="mt-3 max-w-[18ch] text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
            >
              Put your agents to work.
            </h2>
            <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.6] text-white/65">
              It&rsquo;s free while in beta, and the office opens soon. Join the waitlist to be
              among the first through the door.
            </p>
          </div>
          {AGENT_WORKSPACE_DOWNLOAD_URL ? (
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <PrimaryCta onInk />
              <SecondaryCta onInk />
            </div>
          ) : (
            <div className="rounded-[22px] bg-paper p-6 text-ink sm:p-8">
              <WaitlistForm />
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
