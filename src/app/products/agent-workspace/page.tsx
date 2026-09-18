import Link from "next/link";

import JsonLd from "@/components/seo/JsonLd";
import PenMark from "@/components/motion/PenMark";
import Sheet from "@/components/motion/Sheet";
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
import "./workspace.css";

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

function PrimaryCta() {
  return (
    <a className="btn btn-primary" href={PRIMARY_CTA.href}>
      {PRIMARY_CTA.label}
    </a>
  );
}

function SecondaryCta() {
  return (
    <a className="btn btn-line" href="#demo">
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
      <Sheet className="aw-hero" labelledBy="aw-title">
        <div className="shell split aw-hero-grid">
          <header className="page-head aw-hero-copy">
            <nav aria-label="Breadcrumb">
              <ol className="crumbs">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/products/agent-workspace">Agent Workspace</Link>
                </li>
              </ol>
            </nav>
            <p className="context-line">Agent Workspace for Mac, in development</p>
            <h1 id="aw-title" className="t-title" data-focus>
              Every agent. Every repo. One office.
            </h1>
            <p className="lede">
              Your Claude Code, Codex, and Gemini sessions, alive in a little office on
              your Mac. Watch them work, step in when they&rsquo;re stuck, and give every
              project its own floor.
            </p>
            <div className="actions">
              <PrimaryCta />
              <SecondaryCta />
            </div>
            <p className="btn-note aw-hero-note">
              For macOS 14 and later. It lives in your menu bar and works local-first.
            </p>
          </header>
          <MenuBarSlip />
        </div>
      </Sheet>

      {/* The live demo, on the desk */}
      <section
        className="on-desk aw-demo"
        id="demo"
        tabIndex={-1}
        aria-labelledby="aw-demo-title"
      >
        <div className="shell aw-demo-head">
          <h2 id="aw-demo-title" className="t-head" data-focus>
            Who is working, who is thinking, and who needs you.
          </h2>
          <p className="margin-note">
            One project floor, playing on its own. When a session needs your
            approval, the pen circles it.
          </p>
        </div>
        <div className="shell">
          <SessionBoard />
          <p className="aw-vendors">
            Watches over Claude Code, Codex CLI, and Gemini CLI, and every subagent
            gets a desk.
          </p>
        </div>
      </section>

      {/* The three ideas */}
      <Sheet className="section" labelledBy="aw-ideas-title">
        <div className="shell">
          <h2 id="aw-ideas-title" className="t-head aw-ideas-title" data-focus>
            Your agents, under one roof.
          </h2>
          <div className="idea-grid idea-grid--3">
            {ideas.map((idea) => (
              <div key={idea.title}>
                <h3>{idea.title}</h3>
                <p>{idea.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Sheet>

      {/* A closer look */}
      <Sheet className="section" labelledBy="aw-dives-title">
        <div className="shell">
          <h2 id="aw-dives-title" className="t-head" data-focus>
            A closer look.
          </h2>
          <div className="aw-dives">
            {dives.map((dive) => (
              <section key={dive.id} className="aw-dive split split--top" aria-labelledby={dive.id}>
                <div>
                  <h3 id={dive.id} className="t-sub">
                    {dive.id === "dive-approvals" ? (
                      <span className="aw-hand">
                        {dive.title}
                        <PenMark kind="underline" inset="auto -4px -14px -4px" delay={0.2} />
                      </span>
                    ) : (
                      dive.title
                    )}
                  </h3>
                  <p className="copy aw-dive-lede">{dive.lede}</p>
                </div>
                <ul className="feature-list aw-points">
                  {dive.points.map((point) => (
                    <li key={point}>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </Sheet>

      {/* Details and questions */}
      <Sheet className="section" labelledBy="aw-details-title">
        <div className="shell">
          <div className="split split--top">
            <h2 id="aw-details-title" className="t-head" data-focus>
              Built like a Mac app.
            </h2>
            <ul className="feature-list feature-list--wide aw-details">
              {details.map((detail) => (
                <li key={detail.title}>
                  <strong>{detail.title}</strong>
                  <span>{detail.body}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="split split--top aw-faq" id="faq">
            <h2 id="aw-faq-title" className="t-head" data-focus>
              Common questions.
            </h2>
            <FaqList items={FAQS} />
          </div>
        </div>
      </Sheet>

      {/* Close, on the desk */}
      <section
        className="on-desk shell section aw-closing"
        id="early-access"
        tabIndex={-1}
        aria-labelledby="aw-closing-title"
      >
        <Mark size={48} className="aw-closing-mark" />
        <p className="context-line">Agent Workspace for Mac</p>
        <h2 id="aw-closing-title" className="t-title" data-focus>
          Put your agents to work.
        </h2>
        <p className="lede">
          It&rsquo;s free while in beta, and the office opens soon. Join the
          waitlist to be among the first through the door.
        </p>
        {AGENT_WORKSPACE_DOWNLOAD_URL ? (
          <div className="actions">
            <PrimaryCta />
            <SecondaryCta />
          </div>
        ) : (
          <div className="aw-slip paper">
            <WaitlistForm />
          </div>
        )}
      </section>
    </PageShell>
  );
}
