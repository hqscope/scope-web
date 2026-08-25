import { Fragment, type CSSProperties } from "react";
import type { Metadata } from "next";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import JsonLd from "@/components/seo/JsonLd";
import OfficeDemo from "@/components/public/agent-workspace/OfficeDemo";
import WaitlistForm from "@/components/public/agent-workspace/WaitlistForm";
import ApprovalsScene from "@/components/public/agent-workspace/illustrations/ApprovalsScene";
import FloorsStack from "@/components/public/agent-workspace/illustrations/FloorsStack";
import InspectPanelMock from "@/components/public/agent-workspace/illustrations/InspectPanelMock";
import TimeOfDayCards from "@/components/public/agent-workspace/illustrations/TimeOfDayCards";
import { AGENT_WORKSPACE_DOWNLOAD_URL } from "@/lib/site";
import {
  agentWorkspaceSoftwareSchema,
  breadcrumbSchema,
  faqSchema,
  type FaqEntry,
} from "@/lib/structured-data";

import { awMono, awSans } from "./fonts";
import "./agent-workspace.css";

export const metadata: Metadata = {
  title: "Agent Workspace - Mission Control for AI Coding Agents",
  description:
    "Agent Workspace is a Mac app that turns every live AI coding session into a worker in an animated office. Claude Code, Codex, and Gemini agents appear the moment they start — typing, thinking, raising a hand when they need you. Join the early-access waitlist.",
  alternates: {
    canonical: "/products/agent-workspace",
  },
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
};

/* ------------------------------------------------------------------
   Launch-state CTA. Flip AGENT_WORKSPACE_DOWNLOAD_URL in src/lib/site.ts
   on launch day and every primary button on the page becomes the download.
   ------------------------------------------------------------------ */
const PRIMARY_CTA = AGENT_WORKSPACE_DOWNLOAD_URL
  ? { href: AGENT_WORKSPACE_DOWNLOAD_URL, label: "Download for Mac — free" }
  : { href: "#early-access", label: "Get early access" };

function PrimaryCta() {
  return (
    <a className="aw-button-primary" href={PRIMARY_CTA.href}>
      {PRIMARY_CTA.label}
    </a>
  );
}

function SecondaryCta() {
  return (
    <a className="aw-button-ghost" href="#demo">
      See it live ↓
    </a>
  );
}

/* ---------------------------------- copy ---------------------------------- */

const HERO_LEDE =
  "Your Claude Code, Codex and Gemini sessions — alive in a little office on your Mac. Watch them work, step in when they're stuck, and give every project its own floor.";

const FLOATIES = [
  { key: "desks", lines: ["every desk is a", "live session"] },
  { key: "hand", lines: ["a raised hand", "means they need you"] },
  { key: "floors", lines: ["scroll — one floor", "per repo"] },
] as const;

const VENDORS = [
  { key: "claude", name: "Claude Code" },
  { key: "codex", name: "Codex CLI" },
  { key: "gemini", name: "Gemini CLI" },
] as const;

const CARDS = [
  {
    num: "01",
    tag: " · FLOORS",
    title: "A floor per repo",
    body: "Open a project, get a floor. Scroll between them like riding an elevator; close a project and the floor archives itself.",
  },
  {
    num: "02",
    tag: " · DESKS",
    title: "A desk per agent",
    body: "Every session gets a little worker — typing through tool calls, celebrating green tests, dozing when paused.",
  },
  {
    num: "03",
    tag: " · STEP IN",
    title: "Intervene in one click",
    body: "Blocked agents raise a hand. Approve, deny, or open a chat and terminal into the live session — right from the office.",
  },
] as const;

type DiveBullet = { glyph: string; text: string; warn?: boolean };

const DIVE_FLOORS: DiveBullet[] = [
  { glyph: "↑↓", text: "scroll or arrow keys to change floors" },
  { glyph: "⌁", text: "connect a repo — the floor takes its name" },
  { glyph: "◱", text: "the lobby sleeps when nothing is running" },
];

const DIVE_INSPECT: DiveBullet[] = [
  { glyph: "▸", text: "chat · terminal · activity — one panel" },
  { glyph: "▸", text: "pause, resume or kill any session" },
  { glyph: "▸", text: "token + cost meters, always live" },
];

const DIVE_APPROVALS: DiveBullet[] = [
  { glyph: "⚠", text: "toasts are dismissible, never modal", warn: true },
  { glyph: "✋", text: "the hand stays up until you answer", warn: true },
];

const DIVE_CLOCK: DiveBullet[] = [
  { glyph: "☾", text: "day · dusk · night, or pin a mood" },
  { glyph: "♪", text: "sound designed — keyboard clacks off by default" },
];

const DIVE_LEDE_FLOORS =
  "Each repo lives on its own floor with its own crew. Scroll to ride between them, open a new floor when a project starts, and connect any folder on your Mac to bring it to life.";

const DIVE_LEDE_INSPECT =
  "Click a desk and the session opens beside the office — live tokens, cost and task progress, a chat thread that pipes straight to the agent, and the raw terminal when you want to see everything.";

const DIVE_LEDE_APPROVALS =
  "When a session needs sign-off, its worker hops with a hand up and a toast slides in. Approve or deny without leaving the room — the character sits down and keeps going.";

const DIVE_LEDE_CLOCK =
  "Morning sun through the windows, dusk over the skyline, lamps on for the night shift. Agent Workspace is built to sit on a second display all day — calm, glanceable, a little alive.";

const DETAILS = [
  {
    title: "menu-bar native",
    body: "lives in your menu bar; the office is one click away.",
  },
  {
    title: "local-first",
    body: "sessions, logs and costs never leave your Mac.",
  },
  {
    title: "⌘N from anywhere",
    body: "hire an agent onto any floor with one shortcut.",
  },
  {
    title: "live meters",
    body: "tokens, cost and task progress on every desk.",
  },
  {
    title: "every CLI welcome",
    body: "Claude Code, Codex and Gemini today; adapters for more.",
  },
  {
    title: "clean exits",
    body: "close a project and its floor archives with full history.",
  },
] as const;

const FAQS: FaqEntry[] = [
  {
    question: "What is Agent Workspace?",
    answer:
      "A little office for your Mac where every AI coding session you run shows up as a worker at a desk. One glance tells you who is typing, who is thinking, and who is waiting on you.",
  },
  {
    question: "Which agents does it support?",
    answer:
      "Claude Code, Codex CLI and Gemini CLI today — subagents included, and every one of them gets a desk. More agents move in over time.",
  },
  {
    question: "Do I need to set anything up?",
    answer:
      "No. Run your agents exactly the way you always do and they walk in on their own. Point the office at a folder and that project gets its own floor.",
  },
  {
    question: "Will it slow my agents down?",
    answer:
      "No. The office watches from the side and never stands between you and your agents — they work at exactly the speed they always did.",
  },
  {
    question: "Does anything leave my Mac?",
    answer:
      "No. Sessions, logs and costs are local-first: they stay on your machine.",
  },
  {
    question: "When can I use it?",
    answer:
      "Agent Workspace is still in the workshop. Join the waitlist and you will be among the first through the door — free while it is in beta.",
  },
];

/* -------------------------------- section bits -------------------------------- */

function DiveList({ bullets }: { bullets: DiveBullet[] }) {
  return (
    <ul className="aw-dive-list" data-reveal="stagger">
      {bullets.map((bullet, index) => (
        <li
          key={bullet.text}
          style={{ "--stagger-index": index } as CSSProperties}
        >
          <span
            className={
              bullet.warn
                ? "aw-dive-glyph aw-dive-glyph--warn"
                : "aw-dive-glyph"
            }
            aria-hidden="true"
          >
            {bullet.glyph}
          </span>
          &nbsp; {bullet.text}
        </li>
      ))}
    </ul>
  );
}

export default function AgentWorkspacePage() {
  return (
    <PublicPageFrame
      active="agent-workspace"
      footerVariant="slim"
      tone="dark"
      headerCta={{
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

      <div className={`aw-page ${awSans.variable} ${awMono.variable}`}>
        {/* ---------------------------------- hero ---------------------------------- */}
        <section className="aw-hero-zone" id="top">
          <div className="aw-hero-glow" aria-hidden="true" />

          <div className="aw-hero">
            <p className="aw-eyebrow" data-reveal>
              YOUR AGENTS, UNDER ONE ROOF
            </p>
            <h1
              className="aw-hero-title"
              data-reveal
              style={{ "--reveal-delay": "60ms" } as CSSProperties}
            >
              Every agent. Every repo.
              <br />
              One office.
            </h1>
            <p
              className="aw-hero-lede"
              data-reveal
              style={{ "--reveal-delay": "120ms" } as CSSProperties}
            >
              {HERO_LEDE}
            </p>
            <div
              className="aw-hero-ctas"
              data-reveal
              style={{ "--reveal-delay": "180ms" } as CSSProperties}
            >
              <PrimaryCta />
              <SecondaryCta />
            </div>
            <p
              className="aw-hero-note"
              data-reveal
              style={{ "--reveal-delay": "240ms" } as CSSProperties}
            >
              macOS 14+ · menu-bar native · local-first
            </p>
          </div>

          {/* ------------------------------ demo window ------------------------------ */}
          <section
            className="aw-demo-section"
            id="demo"
            aria-label="The office, live"
          >
            <div
              className="aw-window-wrap"
              data-reveal="rise-lg"
              style={{ "--reveal-delay": "120ms" } as CSSProperties}
            >
              {FLOATIES.map((chip, index) => (
                <p
                  key={chip.key}
                  className={`aw-floaty aw-floaty--${index + 1}`}
                  aria-hidden="true"
                >
                  {chip.lines[0]}
                  <br />
                  {chip.lines[1]}
                </p>
              ))}

              <div className="aw-window">
                <div className="aw-window-titlebar">
                  <div className="aw-tl aw-tl--red" />
                  <div className="aw-tl aw-tl--yellow" />
                  <div className="aw-tl aw-tl--green" />
                  <p className="aw-window-title">
                    Agent Workspace — payments-api
                  </p>
                </div>
                <div className="aw-window-body">
                  <OfficeDemo />
                </div>
              </div>

              <p className="aw-window-hint">
                <span>
                  scroll — floors · click a worker — inspect · ⌘N — hire
                </span>
              </p>
            </div>
          </section>
        </section>

        {/* ------------------------------ vendor strip ------------------------------ */}
        <section className="aw-vendor" data-reveal="fade">
          <div className="aw-vendor-inner">
            <p className="aw-vendor-label">WATCHES OVER</p>
            {VENDORS.map((vendor) => (
              <div className="aw-vendor-item" key={vendor.key}>
                <div
                  className={`aw-vendor-dot aw-vendor-dot--${vendor.key}`}
                  aria-hidden="true"
                />
                <div className="aw-vendor-name">{vendor.name}</div>
              </div>
            ))}
            <p className="aw-vendor-tail">— every subagent gets a desk</p>
          </div>
        </section>

        {/* -------------------------------- three cards ------------------------------- */}
        <section className="aw-cards">
          <div className="aw-cards-row" data-reveal="stagger">
            {CARDS.map((card, index) => (
              <Fragment key={card.num}>
                {index > 0 ? (
                  <p
                    className="aw-cards-arrow"
                    aria-hidden="true"
                    style={
                      { "--stagger-index": index * 2 - 1 } as CSSProperties
                    }
                  >
                    <span>→</span>
                  </p>
                ) : null}
                <article
                  className="aw-card"
                  style={{ "--stagger-index": index * 2 } as CSSProperties}
                >
                  <p className="aw-card-label">
                    <span className="aw-card-num">{card.num}</span>
                    <span className="aw-card-tag">{card.tag}</span>
                  </p>
                  <h2 className="aw-card-title">{card.title}</h2>
                  <p className="aw-card-body">{card.body}</p>
                </article>
              </Fragment>
            ))}
          </div>
        </section>

        {/* -------------------------------- deep dives -------------------------------- */}
        <section className="aw-dives">
          <div className="aw-dive">
            <div className="aw-dive-copy">
              <p className="aw-eyebrow aw-eyebrow--dive">THE BUILDING</p>
              <h2 className="aw-dive-title">
                Ride the elevator between projects
              </h2>
              <p className="aw-dive-lede">{DIVE_LEDE_FLOORS}</p>
              <DiveList bullets={DIVE_FLOORS} />
            </div>
            <div className="aw-dive-art" data-reveal="fade">
              <FloorsStack />
            </div>
          </div>

          <div className="aw-dive aw-dive--reverse">
            <div className="aw-dive-copy">
              <p className="aw-eyebrow aw-eyebrow--dive">THE INSPECT PANEL</p>
              <h2 className="aw-dive-title">
                Chat with any worker. Or drop into their terminal.
              </h2>
              <p className="aw-dive-lede">{DIVE_LEDE_INSPECT}</p>
              <DiveList bullets={DIVE_INSPECT} />
            </div>
            <div className="aw-dive-art" data-reveal="fade">
              <InspectPanelMock />
            </div>
          </div>

          <div className="aw-dive">
            <div className="aw-dive-copy">
              <p className="aw-eyebrow aw-eyebrow--dive">APPROVALS</p>
              <h2 className="aw-dive-title">
                Blocked agents raise a hand — literally
              </h2>
              <p className="aw-dive-lede">{DIVE_LEDE_APPROVALS}</p>
              <DiveList bullets={DIVE_APPROVALS} />
            </div>
            <div className="aw-dive-art" data-reveal="fade">
              <ApprovalsScene />
            </div>
          </div>

          <div className="aw-dive aw-dive--reverse">
            <div className="aw-dive-copy">
              <p className="aw-eyebrow aw-eyebrow--dive">AMBIENT BY DESIGN</p>
              <h2 className="aw-dive-title">The office follows your clock</h2>
              <p className="aw-dive-lede">{DIVE_LEDE_CLOCK}</p>
              <DiveList bullets={DIVE_CLOCK} />
            </div>
            <div className="aw-dive-art" data-reveal="fade">
              <TimeOfDayCards />
            </div>
          </div>
        </section>

        {/* ------------------------------- details grid ------------------------------- */}
        <section className="aw-details">
          <h2 className="aw-eyebrow aw-eyebrow--dive aw-eyebrow--center">
            BUILT LIKE A MAC APP
          </h2>
          <div className="aw-details-grid" data-reveal="stagger">
            {DETAILS.map((detail, index) => (
              <div
                className="aw-details-cell"
                key={detail.title}
                style={{ "--stagger-index": index } as CSSProperties}
              >
                <h3>{detail.title}</h3>
                <p>{detail.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------ FAQ ----------------------------------- */}
        <section className="aw-faq" id="faq">
          <h2 className="aw-eyebrow aw-eyebrow--dive aw-eyebrow--center">
            COMMON QUESTIONS
          </h2>
          <div className="aw-faq-list" data-reveal>
            {FAQS.map((faq) => (
              <details className="aw-faq-item" key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* --------------------------------- final CTA -------------------------------- */}
        <section className="aw-final" id="early-access" tabIndex={-1} data-reveal>
          <p className="aw-eyebrow aw-eyebrow--dive">
            AGENT WORKSPACE · FOR MAC
          </p>
          <h2 className="aw-final-title">Put your agents to work.</h2>
          <p className="aw-final-sub">
            Free while in beta. Join the waitlist — the office is opening soon.
          </p>
          {AGENT_WORKSPACE_DOWNLOAD_URL ? (
            <div className="aw-final-ctas">
              <PrimaryCta />
              <SecondaryCta />
            </div>
          ) : (
            <WaitlistForm />
          )}
        </section>
      </div>
    </PublicPageFrame>
  );
}
