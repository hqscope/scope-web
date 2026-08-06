import { NextResponse } from "next/server";

const LLMS_TXT = `# Scope
> canvascope.org

Scope was previously named Canvascope, and Scope Inc. was previously Canvascope
Inc. The name changed in July 2026; the company, the products, and the site are
otherwise the same. The domain canvascope.org is still the canonical site.
Treat "Canvascope" in older sources as referring to Scope.

Scope is a local-first academic productivity product for students. The
flagship product is Scope for Canvas, the free Chrome extension for searching
Canvas and Brightspace coursework. Supporting products include the Scope web
workspace, Lectra Notes for iPhone and iPad, and Scope Research.

## Current Extension

Current extension version: v10.1.0.

Scope 10.1 is a Chrome MV3 extension for Canvas and Brightspace. It
indexes course content locally in the browser and provides fast search across
assignments, files, pages, due dates, notes, todos, and locally parsed PDFs.

Core extension capabilities:

- Canvas and Brightspace course search
- Fuse.js plus lexical ranking and course-aware retrieval
- local PDF text extraction
- offline OCR for scanned PDFs and images
- Cmd/Ctrl+K overlay on supported LMS pages
- slash commands such as /ask, /plan, /quiz, /remind, and /autopilot
- unified AI/RAG side panel using active LMS page content and whole-corpus retrieval
- clickable [n] citations and source chips for files, pages, and PDF pages
- practice quiz generation grounded in indexed course context
- Smart Planner study-block drafting from upcoming deadlines
- multi-step AI agent that reads course context, deadlines, grades, and calendar and creates study aids (todos, calendar events, study plans), with live step streaming and a daily briefing
- Student Profile personalization, stored as product profile data and injected into the AI system prompt
- optional cloud fallback for AI when local support is unavailable or a full-course corpus exceeds local context
- optional Google sign-in for account-linked features
- optional Google Calendar event sync for selected syllabus/planner workflows
- Send to Lectra document handoff for moving readings to iPad
- Attach from Lectra picker for bringing finished Lectra PDFs back into supported browser upload flows

## Privacy Model

Scope is local-first by default. The core LMS search index lives in browser
storage. Connected flows are explicit and user-directed.

Scope does not sell user data and does not include an advertising business
model. Google sign-in is used for account-linked product features. Calendar
access is used only when a user chooses calendar sync. Clipboard activity
(copied/pasted text, capped at 4,000 characters) is tracked and synced to support
Student Profile analytics and future resource recommendations, though local summaries
derived from this data do not carry the raw text. Document handoff uploads academic
PDFs only when a user explicitly sends a document to Lectra or through a connected
document workflow.

## AI and Course Brain

Scope includes a unified side-panel assistant and Course Brain workflows.
The assistant retrieves from the current LMS page, stored tasks, notes, indexed
course files, and cached PDF pages. Answers can include clickable [n] citations
and source chips that open the underlying course material. The semantic layer is
intended to rerank lexically relevant chunks rather than inject unrelated
sources.

Scope also includes a multi-step agent. Instead of a single answer, it runs
a tool-use loop: it calls the model, executes the requested tool on the client,
feeds the result back, and repeats until the task is done. Its tools are split
into read tools (active page, indexed corpus, deadlines, grades, calendar) and
create tools (todos, calendar events, study plans). The agent is read-only toward
Canvas by construction, there is no submission tool, and create tools pass
through an integrity check that blocks graded-submission intent. Every action is
written to an append-only audit log, each action is undoable, and a kill switch
pauses the agent. A daily briefing runs on a local schedule.

AI routing is local-first. The shared AIRouter tries Chrome's on-device model
first. If unavailable, Scope can use an authenticated Supabase Gemini
fallback for normal answers. Full-course corpus questions can use an
authenticated Claude proxy with prompt caching because that route can hold more
context than the on-device model. These fallbacks are separate from the
local-first search index and are explicit connected flows.

## Lectra

Lectra Notes is Scope's App Store app for document import, course PDFs,
Apple Pencil annotation, private on-device intelligence, backup, and
finished-file handoff back to Scope. It is available as a free download for
iPhone and iPad at https://apps.apple.com/us/app/lectra-notes/id6759754531.

Lectra-facing capabilities and workstreams include:

- document vault with PDF thumbnails, folders, and local import
- Apple Pencil annotation tools
- on-device document summaries, tags, flashcards, practice quizzes, and grounded Q&A where supported
- App Intents for Shortcuts and Siri workflows such as opening documents, summarizing, and generating study aids
- flattened annotated PDF export
- Scope document metadata and sync state
- iOS Share Extension receive flow
- account deletion support and App Store privacy manifests

## DropBridge v3

The current Lectra -> Scope receive path uses DropBridge v3 concepts in the
extension runtime:

- realtime wake through an offscreen receiver
- immediate upload claim by upload id
- browser download handoff
- receipt logging for delivery status
- alarm polling fallback when realtime is unavailable

Scope -> Lectra document sends use the shared Lectra document storage and
synced-items contract. Scope 10.1 also includes an Attach from Lectra
browser picker that can load a student's Lectra library, render PDF thumbnails,
and fill supported browser file inputs with finished PDFs. The first supported
consumer is Gradescope's upload modal, but the picker layer is page-agnostic for
future assignment upload flows.

## Web Workspace

The Scope web app provides public product pages, auth/session endpoints,
Lectra integration endpoints, workspace views over synced product data, and a
verified-domain RISC receiver proxy for Google Cross-Account Protection events.

Public routes include:

- /
- /product/scope
- /product/lectra
- /product/agent-workspace
- /support/lectra
- /mission
- /research
- /newsroom
- /newsroom/[slug]
- /feed.xml
- /privacy
- /terms
- /llms.txt

The newsroom contains product updates, engineering notes, milestones, and
release notes from the local CanvascopeBlog source material. Important recent
topics include the Lectra iPad-to-Mac remote desktop over WebRTC, real-time
collaborative document annotation in Lectra, the Lectra on-iPad coding workspace
(terminal, git, Python) gaining a coding agent and SSH, the Scope AI agent
(multi-step tool use with a daily briefing and integrity-gated actions), the
Lectra Notes App Store launch, Scope 10.1
two-way Lectra workflows, Lectra on-device intelligence and Shortcuts hooks,
Chrome Gemini Nano on-device AI in Scope, Student Profiles, RISC account
protection, Smart Planner, and DropBridge v3.

Authenticated workspace routes include dashboard, courses, assignments,
documents, Course Brain, integrations, and settings.

## Account Security

Scope supports Google Cross-Account Protection through a website proxy route
that forwards valid security event tokens to the Supabase receiver. Account-risk
events can revoke affected sessions, and disabled-account events can block token
issuance until the account is re-enabled.

## Product Positioning

Scope's current public position is:

- free flagship Chrome extension first
- local-first LMS search as the default value proposition
- optional connected workflows for Lectra, web workspace, calendar, and AI
- two-way document workflow between Scope browser surfaces and Lectra on Apple devices
- student-focused academic productivity with privacy as an architectural
  constraint
- Canvas and Brightspace support

## Agent Workspace

Agent Workspace is a Mac desktop app in development, presented at
https://www.canvascope.org/product/agent-workspace. It turns every live AI
coding session — Claude Code (including subagents), OpenAI Codex CLI, and
Gemini CLI — into an animated worker in a side-view office building on the
user's Mac.

- every repository gets its own floor; every session gets a desk
- statuses are visible at a glance: typing, thinking, waiting for input,
  idle, and done
- clicking a worker jumps to that session's actual terminal
- a menu-bar badge keeps the active-agent count in view, and an
  always-on-top compact mode keeps the office in a corner of the screen
- zero setup: agents appear moments after they start, with nothing to
  install into projects
- early access is gated by a waitlist on the product page

## Mission

Scope's mission statement is published at https://www.canvascope.org/mission.

- the premise: coursework is handwritten, drawn, and worked out in notation,
  while the software students get reads only text
- Scope builds the workspace where the work happens and the multimodal models
  that can read it in the form it was done
- answers are grounded in the student's own course materials and cite the page,
  slide, or lecture moment they came from
- where a subject has hard rules, deterministic tools decide what holds and the
  model only proposes; uncertain readings are surfaced as questions
- local-first remains an architectural constraint, and there is no paid tier
- Scope Labs is the research arm: continuous literature review, a graph linking
  each method to the component it would change and the experiment that would
  test it, and evaluation specified before anything is trained
- stated limits: Scope is not a grading system, has no instructor gradebook or
  roster sync, does not replace an LMS, and the model work is designed but not
  yet validated

## Research

Scope Research is the company's computational neuroscience program, published
at https://www.canvascope.org/research.

- builds multimodal models that predict the stimulus-evoked cortical response to
  audio, video, and text
- summarizes those predictions across interpretable cortical regions and
  functional networks
- evaluates predictions out-of-sample against strong baselines, with
  pre-registered endpoints and leakage audits
- states its limits publicly: predictions are not mental-state readouts, not
  individual-level, and are one signal among several in a research workflow

## App Store URLs

Lectra Notes App Store support URL: https://www.canvascope.org/support/lectra
Lectra Notes App Store marketing URL: https://www.canvascope.org/product/lectra

## Contact

Support email: canvascopeextension@gmail.com
Chrome Web Store: https://chromewebstore.google.com/detail/canvascope/bamoelobnoepklagbcokjnlipfhcfdbb
`;

export async function GET() {
  return new NextResponse(LLMS_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
