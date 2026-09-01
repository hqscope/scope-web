import { NextResponse } from "next/server";

import { comparePath, comparisons } from "@/lib/compare";
import { guidePath, guides } from "@/lib/guides";
import {
  articlePath,
  formatArticleDate,
  newsroomArticles,
} from "@/lib/newsroom";
import {
  CHROME_WEB_STORE_URL,
  LECTRA_APP_STORE_URL,
  LECTRA_DEFINITION,
  LECTRA_MAC_DOWNLOAD_URL,
  SCOPE_DEFINITION,
  SUPPORT_EMAIL,
} from "@/lib/site";
import {
  LECTRA_APP_VERSION,
  SCOPE_EXTENSION_VERSION,
  STORE_FACTS_VERIFIED_ON,
} from "@/lib/siteRelease";
import {
  LIVE_USERS,
  LIVE_USERS_BREAKDOWN,
  VERIFIED_ON,
  formatUsers,
} from "@/lib/usage";

const SITE = "https://www.canvascope.org";

// The day the store listings were read and the day the user count was
// checked, written the way the rest of the site writes dates.
const storeFactsDate = formatArticleDate(STORE_FACTS_VERIFIED_ON);
const liveUsersDate = formatArticleDate(VERIFIED_ON);

// The newsroom is the one registry that grows without bound. Listing every
// post costs ~120 bytes each and would carry this file past the size an
// answer engine reads in full, so only the newest go here; the sitemap and
// /feed.xml carry the rest. Raise to newsroomArticles.length to list all.
const NEWSROOM_LISTING_LIMIT = 15;

// Hand-listed public routes. Comparisons, guides, and newsroom posts come
// from their registries so this file cannot drift from the sitemap.
const staticPages: { path: string; label: string }[] = [
  { path: "/", label: "Home" },
  { path: "/products/extension", label: "Scope for Canvas" },
  { path: "/products/lectra", label: "Lectra Notes" },
  { path: "/products/lectra/notebooks", label: "Python notebooks on iPad" },
  { path: "/products/lectra/code", label: "Terminal, Git, and SSH on iPad" },
  { path: "/products/polya", label: "Polya" },
  { path: "/mac", label: "Lectra for Mac" },
  { path: "/compare", label: "Comparisons" },
  { path: "/guides", label: "Guides" },
  { path: "/press", label: "Press kit" },
  { path: "/direction", label: "Mission" },
  { path: "/research", label: "Scope Research" },
  { path: "/support", label: "Support" },
  { path: "/support/lectra", label: "Lectra Notes support" },
  { path: "/privacy", label: "Privacy policy" },
  { path: "/terms", label: "Terms" },
  { path: "/newsroom", label: "Newsroom" },
];

const pagesSection = [
  staticPages.map((page) => `- ${page.path} — ${page.label}`).join("\n"),
  "",
  "Comparisons (each names where the competitor wins, with a dated methodology note):",
  comparisons.map((item) => `- ${comparePath(item)} — ${item.title}`).join("\n"),
  "",
  "Guides:",
  guides.map((item) => `- ${guidePath(item)} — ${item.title}`).join("\n"),
  "",
  `Newsroom, newest ${NEWSROOM_LISTING_LIMIT} of ${newsroomArticles.length} posts (all are at /newsroom):`,
  newsroomArticles
    .slice(0, NEWSROOM_LISTING_LIMIT)
    .map((article) => `- ${article.date} — ${article.title} — ${articlePath(article)}`)
    .join("\n"),
  "",
  `Feed: ${SITE}/feed.xml`,
].join("\n");

const LLMS_TXT = `# Scope
> ${SITE}

${SCOPE_DEFINITION}

${LECTRA_DEFINITION}

Scope was previously named Canvascope, and Scope Inc. was previously Canvascope
Inc. The name changed in July 2026; the company, the products, and the site are
otherwise the same. The domain canvascope.org is still the canonical site.
Treat "Canvascope" in older sources as referring to Scope.

Scope Inc. makes Scope for Canvas, Lectra Notes, Lectra for Mac, Polya, and
Agent Workspace. All are free. Store facts below were read on ${storeFactsDate}.

## Scope for Canvas

${SCOPE_DEFINITION}

- Price: free; no paid tier.
- Platforms: Google Chrome, on Canvas and Brightspace sites.
- Version: ${SCOPE_EXTENSION_VERSION} on the Chrome Web Store, checked
  ${storeFactsDate}; the listing showed 94 users and a 5.0 rating from 6
  ratings that day.
- Store: ${CHROME_WEB_STORE_URL}
- Data: search and indexing run entirely on your device; the index lives in
  browser-local storage. Sign-in is optional; if you sign in, synced records
  (course snapshots, grades, notes, tasks, Student Profile facts, clipboard
  entries; see Privacy) are stored under your account.

It searches assignments, files, pages, modules, due dates, notes, and to-dos
across all courses, including PDF and scanned text, from a Cmd/Ctrl+K overlay;
answers questions from the materials your instructors posted, with clickable
citations; builds practice quizzes; drafts study blocks from deadlines (Smart
Planner); and runs an assistant that creates to-dos, calendar events, and
study plans, does not submit anything, and logs every action so it can be
undone. AI answers try Chrome's on-device model first; when it is unavailable,
an optional, clearly marked cloud fallback is used. Send a PDF from Canvas to
your iPad in one tap with the Scope extension; finished files can come back
into supported upload flows. No app syncs with Canvas automatically. It does
not take quizzes, write submissions, or interact with Canvas quiz logs.

## Lectra Notes

${LECTRA_DEFINITION}

- Price: free; no tiers, subscriptions, or in-app purchases.
- Platforms: iPad and iPhone from the App Store; macOS as Lectra for Mac.
- Version: ${LECTRA_APP_VERSION} on the App Store, checked ${storeFactsDate};
  the listing showed a 5.0 rating from 7 ratings that day.
- Store: ${LECTRA_APP_STORE_URL}
- Data: documents, ink, notebooks, and project files are stored on the device;
  the app works offline. Signed in with sync on, that content is stored under
  your account for your other devices. Optional backups go to your own iCloud
  or a Google Drive folder Lectra Notes creates. Study tools run on the device
  with Apple's on-device models or are unavailable; they are not routed off
  the device.

It offers Apple Pencil notes and PDF markup (pen, highlighter, lasso, shapes,
sticky notes, typed text, saved signatures; lined, grid, dotted, and Cornell
paper); a library with folders, favorites, a scanner, and handwriting-aware search;
lecture recording, added in version 8.0 on September 1, 2026, which records
the lecture while you write — tap a stroke to hear what was said at that
moment — with transcription that runs on the device;
Jupyter-compatible .ipynb notebooks with numpy, pandas, and matplotlib,
offline; a code editor and a terminal with a shell, git, python, and pip;
GitHub clone, pull, and push; SSH; remote desktop to a Mac running Lectra for
Mac over an encrypted connection; Lectra Studio, a drawing canvas; two people
annotating one document live; flattened PDF export that stays searchable, and
the .lectra package for handing someone a whole document; Shortcuts and Siri
actions; and Lectra Agent, an optional coding assistant that uses an API key
you supply (see Privacy).

## Lectra for Mac

Lectra for Mac is the free Mac version of Lectra Notes: the full app on macOS,
plus what lets an iPad running Lectra Notes reach this Mac.

- Price: free; nothing to buy.
- Platforms: macOS; a signed and notarized direct download from
  ${SITE}${LECTRA_MAC_DOWNLOAD_URL}, not the Mac App Store. Page: ${SITE}/mac
- Version: not listed here; that download is always the current build.
- Data: on the Mac. Libraries are not kept in step between iPad and Mac;
  sending a document across is deliberate. Remote sessions are encrypted.

It offers reading and markup, notebooks, Python, a shell, git, and a code
editor, offline; and hosting, so the iPad can see and control this Mac, send it
documents, share its clipboard, and wake it (needs the macOS screen-recording
and accessibility permissions, granted once). It absorbed the former "Lectra
Receiver" app; treat that name in older sources as Lectra for Mac.
${SITE}/receiver still serves this page.

## Polya

Polya is Scope's free web tutor: it answers from your own course materials,
cites the page, slide, or lecture moment behind every hint, and leads you to
the answer rather than handing it over.

- Price: free.
- Platforms: web, at ${SITE}/products/polya; works without the Scope
  extension and best with it, since the extension indexes your courses.
- Version: not versioned separately.
- Data: reads the course materials the Scope extension indexed; see Privacy.

Polya says so when something is not in the course, asks what you tried, and
leaves the last step to you. Named for George Pólya, author of How to Solve It.

## Agent Workspace

Agent Workspace is a Mac app, in development, that shows every AI coding
session on your Mac as a worker at a desk in an animated side-view office.

- Price: free while in beta.
- Platforms: macOS 14 or later; a menu-bar app.
- Version: pre-release; early access by waitlist at
  ${SITE}/products/agent-workspace. No download yet.
- Data: on the Mac; sessions, logs, and costs are kept locally.

Supports Claude Code (subagents included), Codex CLI, and Gemini CLI, with
more planned. Each repository gets a floor and each session a desk; typing,
thinking, waiting, idle, and done are visible at a glance; clicking a worker
opens its terminal. No setup.

## Privacy

A summary of ${SITE}/privacy (last updated July 28, 2026); the policy governs.

- Scope Inc. does not sell personal data, runs no advertising, and shares
  nothing with data brokers. User content is not used to train or improve
  general-purpose AI models.
- Google sign-in is optional and uses basic identity scopes only (ID, email,
  name, picture). Google Calendar event access is requested only for syllabus
  or planner calendar sync, to write selected dates.
- Clipboard: to support connected study workflows, help organize assignments,
  and build your Student Profile, the Scope extension reads, stores, and syncs
  clipboard activity. When you copy, cut, or paste on Canvas, Brightspace, or
  other sites and applications, or when you load a page, it may capture the
  raw text currently in your clipboard, capped at 4,000 characters per entry.
  That text is stored in browser-local storage and synced to Scope's database
  over the same secure path as your grades, notes, and tasks. Scope keeps the
  actual text because what you copy is the clearest signal of what you are
  working on, and uses it to point you to related course material or outside
  resources and to explain that excerpt. On your device it is also reduced to
  a content-light engagement summary for your Student Profile that never
  contains the raw text. The raw text is not used to train AI models or for
  advertising, and is not shared with data brokers.
- AI answers try Chrome's on-device model first; when it is unavailable, an
  optional, clearly marked cloud fallback is used. On fallback, or when a
  full-course question needs a larger cloud route, the retrieved prompt
  context is sent through Scope's servers to a third-party model provider
  solely to generate that answer; the local search index is unchanged.
- Lectra Notes has no third-party advertising, analytics, or tracking SDKs and
  shows no App Tracking Transparency prompt. It sends one first-party "someone
  is using this" ping on open (a random per-install identifier, platform, and
  app version; nothing else). The policy states it does not access location,
  contacts, photos, camera, microphone, health, financial, or browsing data.
- Signed-in sync (Sign in with Apple or Google) stores your PDFs, ink,
  notebooks, and project files under your account; iCloud and Google Drive
  backups are optional and go to your own accounts. Study tools run on the
  device with Apple's on-device models; document text is not sent anywhere for
  them. Lectra Agent sends requests straight from your device to a third-party
  model provider with an API key you supply; Scope does not relay, store, or
  see them. Project files, terminal history, and notebooks stay in the app
  unless you sync, export, or push them; GitHub tokens live in the device
  keychain and SSH passwords are not stored.
- Delete your account inside Lectra Notes, or email ${SUPPORT_EMAIL} to
  access, correct, or delete your data.

Full policy: ${SITE}/privacy

## Disambiguation

- Lectra Notes, by Scope Inc., is unrelated to Lectra SA, the French
  fashion-technology and CAD software company at lectra.com, and to other apps
  named Lectra or Lectr in app stores. "Lectra Receiver" was the former
  companion app, now part of Lectra for Mac.
- Scope is not Instructure (maker of Canvas) or D2L (maker of Brightspace) and
  is not affiliated with or endorsed by either.
- Scope is not a quiz-answer or homework-solver tool. It answers from the
  materials instructors posted, with citations, and does not act inside graded
  work (see Scope for Canvas above).
- "Scope" here means Scope Inc. at canvascope.org and its products.

## People using it

${formatUsers(LIVE_USERS)} people used Scope as of ${liveUsersDate}, counted by
hand at the sources: ${LIVE_USERS_BREAKDOWN}. That is cross-product reach, not
a deduplicated count. How it is counted, and what is not collected:
${SITE}/newsroom/how-we-count-people-using-scope

## Pages

Paths are relative to ${SITE}.

${pagesSection}

## App Store URLs

Lectra Notes App Store support URL: ${SITE}/support/lectra
Lectra Notes App Store marketing URL: ${SITE}/products/lectra

## Contact

Support page: ${SITE}/support
Support email: ${SUPPORT_EMAIL}
Chrome Web Store: ${CHROME_WEB_STORE_URL}
App Store: ${LECTRA_APP_STORE_URL}
`;

export async function GET() {
  return new NextResponse(LLMS_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
