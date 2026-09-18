import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import PenMark from "@/components/motion/PenMark";
import Sheet from "@/components/motion/Sheet";
import ComparisonTable from "@/components/site/ComparisonTable";
import FaqList, { type FaqItem } from "@/components/site/FaqList";
import Mark from "@/components/site/Mark";
import NewsList from "@/components/site/NewsList";
import PageHead from "@/components/site/PageHead";
import PageShell from "@/components/site/PageShell";
import RelatedLinks from "@/components/site/RelatedLinks";
import {
  breadcrumbSchema,
  canvascopeSoftwareSchema,
  faqSchema,
  type FaqEntry,
} from "@/lib/structured-data";
import { getNewsroomArticlesBySlugs } from "@/lib/newsroom";
import { publicPageMetadata } from "@/lib/seo";
import { CHROME_WEB_STORE_URL, SCOPE_DEFINITION } from "@/lib/site";
import {
  SCOPE_EXTENSION_VERSION,
  STORE_FACTS_VERIFIED_ON,
} from "@/lib/siteRelease";
import { LIVE_USERS, VERIFIED_ON } from "@/lib/usage";

import "./extension.css";
import SearchScene, { type SlipRow } from "./SearchScene";

export const metadata: Metadata = publicPageMetadata({
  title: "Scope for Canvas: Chrome Extension That Searches Every Course",
  absoluteTitle: true,
  description:
    "Scope for Canvas is a free Chrome extension that searches every file, page, and assignment across your Canvas and Brightspace courses. It is indexed on your device, and answers are cited to the source.",
  path: "/products/extension",
  keywords: [
    "Scope extension",
    "Scope for Canvas",
    // Retained so people still searching the former name find us.
    "Canvascope",
    "Canvascope extension",
    "Canvas LMS search",
    "Brightspace search",
    "Attach from Lectra",
    "student productivity extension",
    "LMS search extension",
    "Canvas Chrome extension",
    "search Canvas",
    "best Canvas extension",
    "Canvas search extension",
  ],
});

/** "2026-09-01" becomes "September 1, 2026", so dated copy tracks the constant. */
function formatCheckedOn(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

const storeFactsCheckedOn = formatCheckedOn(STORE_FACTS_VERIFIED_ON);
const usersCountedOn = formatCheckedOn(VERIFIED_ON);

const slipRows: SlipRow[] = [
  {
    tag: "Slides",
    title: "Lecture 14, Lagrange multipliers.pdf",
    meta: "Math 53, Files, Week 8",
  },
  {
    tag: "Media",
    title: "Lecture 14 recording, 48:12",
    meta: "Math 53, Media gallery",
  },
  {
    tag: "Page",
    title: "Week 8 overview: constrained optimization",
    meta: "Math 53, Pages",
  },
];

const features = [
  {
    title: "Instant and local",
    copy:
      "Files, pages, assignments, announcements, and media across every course, including scanned PDFs. Search and indexing run entirely on your device.",
  },
  {
    title: "Cited course answers",
    copy:
      "Ask when the midterm is or what the late policy says. Answers come from your materials, with the source page linked.",
  },
  {
    title: "Exams from real material",
    copy:
      "Practice tests are generated from what the course actually covered, using the real material your instructors posted.",
  },
  {
    title: "A planner that fills itself",
    copy:
      "Due dates gathered across courses, a morning briefing, and optional Google Calendar sync.",
  },
  {
    title: "What-if calculator",
    copy:
      "See where you stand and what the final needs to be. It is computed on your device.",
  },
  {
    title: "Hand off to iPad",
    copy:
      "Send a course file to Lectra Notes, mark it up, and bring the finished file back into supported upload flows.",
  },
];

/** FAQ entries: plain `answer` feeds the schema, `body` adds the link on the page. */
type ExtensionFaq = FaqEntry & { link?: { href: string; label: string } };

const faqs: ExtensionFaq[] = [
  {
    question: "Is Scope free?",
    answer:
      "Yes. Scope for Canvas is a free Chrome extension. Install it from the Chrome Web Store and start searching your courses right away, with no subscription and no account required.",
  },
  {
    question: "Does Scope work with both Canvas and Brightspace?",
    answer:
      "Yes. Scope searches across Canvas (Instructure) and Brightspace (D2L) courses, including assignments, readings, files, pages, and due dates.",
  },
  {
    // verify: Canvas Smart Search scope and availability. Instructure's
    // documentation was not reachable on September 1, 2026 (community site
    // returned 403, search engines returned no listing), so the answer below
    // is written in the hedged form the source supports.
    question: "How is Scope different from Canvas Smart Search?",
    answer:
      "Smart Search is Canvas's own search, and where a school has turned it on you use it from inside the course you are already in. Scope searches across every course you can open, including files, pages, assignments, and scanned PDFs, from anywhere in the browser, and it works whether or not your school has enabled Smart Search. What Smart Search offers is set by your school, so check what yours has turned on.",
  },
  {
    question: "Is Scope a quiz-answer or homework-solver tool?",
    answer:
      "No. Scope answers questions from the materials your instructors posted and links every answer to its source. It does not take quizzes, write submissions, or interact with Canvas quiz logs.",
  },
  {
    question: "Is a Canvas extension safe to install?",
    answer:
      "It depends entirely on the extension. Check what permissions it asks for, where your course data goes, and whether the developer says so plainly. Scope builds and searches its index on your device, and our guide walks through the questions worth asking before you install anything that can read your coursework.",
    link: {
      href: "/guides/canvas-extension-safety",
      label: "Read the Canvas extension safety guide",
    },
  },
  {
    question: "Is Scope affiliated with Instructure or D2L?",
    answer:
      "No. Scope is an independent product from Scope Inc. It works with Canvas and Brightspace but is not made or endorsed by Instructure or D2L.",
  },
  {
    question: "Where is my course data stored?",
    answer:
      "Scope is local-first. Your course index and search data live in your browser, on your device, by default. Connected features like Google sign-in, calendar sync, the cloud AI fallback, and the handoff to Lectra Notes only run when you explicitly choose them. The privacy policy lists everything the extension stores and syncs.",
    link: { href: "/privacy", label: "Read the privacy policy" },
  },
  {
    question: "Can Scope search inside PDFs?",
    answer:
      "Yes. Scope reads PDF text on your device and can read scanned pages and images, so their contents show up in future searches.",
  },
  {
    question: "What are the cited AI answers?",
    answer:
      "Ask reads the course page you are on plus your indexed course files, tasks, notes, and PDF pages, then returns an answer with clickable [n] citations back to the source material. Answers try Chrome's on-device model first, and when it is unavailable an optional, clearly marked cloud fallback is used.",
  },
  {
    question: "How does the Lectra Notes handoff work?",
    answer:
      "Send a PDF from Canvas to your iPad in one tap with the Scope extension. Mark it up with Apple Pencil in Lectra Notes, and finished files can come back into supported upload flows in the browser.",
  },
];

const faqItems: FaqItem[] = faqs.map((faq) => ({
  question: faq.question,
  answer: faq.answer,
  body: faq.link ? (
    <p>
      {faq.answer}{" "}
      <Link className="link" href={faq.link.href}>
        {faq.link.label}
      </Link>
      .
    </p>
  ) : undefined,
}));

const glanceRows = [
  { label: "Price", cells: ["Free, no account required."] },
  { label: "Browser", cells: ["Chrome, and other Chromium browsers."] },
  { label: "Works with", cells: ["Canvas and Brightspace courses."] },
  {
    label: "Where the index lives",
    cells: ["Your browser, on your device."],
  },
  {
    label: "AI answers",
    cells: [
      "Chrome's on-device model first. When it is unavailable, an optional, clearly marked cloud fallback is used.",
    ],
  },
  {
    label: "Version",
    cells: [`${SCOPE_EXTENSION_VERSION} (checked ${storeFactsCheckedOn})`],
  },
  {
    label: "People using it",
    cells: [
      <>
        {LIVE_USERS} across Scope for Canvas and Lectra Notes, counted by hand on{" "}
        {usersCountedOn}.{" "}
        <Link className="link" href="/newsroom/how-we-count-people-using-scope">
          How we count
        </Link>
      </>,
    ],
  },
];

const relatedArticles = getNewsroomArticlesBySlugs([
  "who-teaches-this-and-does-it-fit-my-week",
  "how-we-count-people-using-scope",
  "course-indexing-stops-getting-stuck",
]);

function InstallButton() {
  return (
    <StoreLink
      store="chrome-web-store"
      href={CHROME_WEB_STORE_URL}
      className="btn btn-primary"
    >
      Add Scope to Chrome for free
    </StoreLink>
  );
}

export default function ExtensionPage() {
  return (
    <PageShell active="extension">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Extension", path: "/products/extension" },
          ]),
          canvascopeSoftwareSchema(),
          faqSchema(faqs),
        ]}
      />

      {/* Hero. */}
      <Sheet>
        <PageHead
          context="Scope for Canvas, the free Chrome extension for Canvas and Brightspace"
          title="Search every Canvas and Brightspace course, one keystroke away."
          wide
          lede={
            <p>
              {SCOPE_DEFINITION} Press ⌘K anywhere in the browser and everything your
              instructors have posted is one search away, from files and pages to
              assignments, announcements, and scanned PDFs, all indexed on your device.
            </p>
          }
        >
          <InstallButton />
          <span className="btn-note">No account required</span>
        </PageHead>
      </Sheet>

      {/* The scene: the real search, on the desk. */}
      <section className="on-desk section ext-scene-band" aria-labelledby="scene-title">
        <div className="shell">
          <div className="ext-scene-head">
            <h2 id="scene-title" className="t-head" data-focus>
              Press ⌘K from any page.
            </h2>
            <p className="margin-note">
              Scope opens over the course you are on and searches all of them at once.
            </p>
          </div>
          <SearchScene
            query="lagrange multipliers lecture"
            rows={slipRows}
            footnote="Indexed on your device, and it finds text in scans."
          />
        </div>
      </section>

      {/* What it does. */}
      <Sheet className="section" labelledBy="features-title">
        <div className="shell">
          <h2 id="features-title" className="t-head" data-focus style={{ maxWidth: "20ch" }}>
            Everything the LMS knows, finally at hand.
          </h2>
          <div className="idea-grid idea-grid--3 ext-features">
            {features.map((feature) => (
              <div key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Sheet>

      {/* At a glance, and privacy. */}
      <Sheet className="section" id="at-a-glance" labelledBy="glance-title">
        <div className="shell">
          <div className="split split--top ext-glance">
            <div>
              <h2 id="glance-title" className="t-head" data-focus>
                What Scope for Canvas is
              </h2>
              <p className="copy" style={{ marginTop: 22 }}>
                The short version: what it costs, where it runs, and where your
                course index lives.
              </p>
            </div>
            <div>
              <ComparisonTable
                caption="Scope for Canvas at a glance: price, browser, supported course systems, where the index lives, how AI answers work, current version, and how many people use it"
                columns={["Scope for Canvas"]}
                rows={glanceRows}
              />
              <p className="small">Store facts checked on {storeFactsCheckedOn}.</p>
            </div>
          </div>

          <div className="split split--even ext-privacy">
            <ul className="ext-zeros">
              <li>
                <b>0</b>
                <span>data sold</span>
              </li>
              <li>
                <b>0</b>
                <span>subscriptions</span>
              </li>
            </ul>
            <p className="lede">
              The index is built and searched on your device. Features that reach the
              cloud, like practice-exam generation when the on-device model is
              unavailable, are explicit and optional, and they are{" "}
              <span style={{ position: "relative", whiteSpace: "nowrap" }}>
                clearly marked
                <PenMark kind="underline" inset="auto -4px -14px -4px" delay={0.2} />
              </span>{" "}
              before anything is sent.
            </p>
          </div>
        </div>
      </Sheet>

      {/* iPad handoff and questions. */}
      <Sheet className="section" id="ipad" labelledBy="ipad-title">
        <div className="shell">
          <div className="split split--top ext-handoff">
            <h2 id="ipad-title" className="t-head" data-focus>
              Send the reading to your iPad in one tap.
            </h2>
            <div>
              <p className="copy">
                Send a PDF from Canvas to your iPad in one tap with the Scope
                extension, and finished files can come back into supported upload
                flows. Mark up lecture slides with Apple Pencil in{" "}
                <Link className="link" href="/products/lectra">
                  Lectra Notes
                </Link>
                , the free iPad and iPhone app from Scope, then pick the annotated file
                from the browser in a supported upload flow when it&apos;s time to
                submit.
              </p>
              <p className="copy">
                New to it? The{" "}
                <Link className="link" href="/guides/annotate-lecture-slides-on-ipad">
                  guide to annotating lecture slides on iPad
                </Link>{" "}
                walks through the whole loop, from the course page to the finished PDF.
              </p>
            </div>
          </div>

          <div id="faq" style={{ marginTop: "var(--section)" }}>
            <h2 className="t-head ext-faq-head" data-focus>
              Questions people actually ask.
            </h2>
            <FaqList items={faqItems} />
          </div>
        </div>
      </Sheet>

      {/* What shipped, and where to read next. */}
      <Sheet className="section" labelledBy="news-title">
        <div className="shell">
          <div className="ext-news-head">
            <h2 id="news-title" className="t-head" data-focus>
              What shipped recently.
            </h2>
            <Link href="/newsroom" className="link">
              All posts
            </Link>
          </div>
          <NewsList articles={relatedArticles} showDescription={false} />
        </div>
        <div className="ext-related">
          <RelatedLinks
            title="Keep comparing."
            links={[
              {
                href: "/compare/best-canvas-chrome-extensions",
                label: "Best Canvas Chrome extensions",
                copy: "The round-up, including the ones that beat Scope at their own thing and the categories we leave out on purpose.",
              },
              {
                href: "/compare/scope-vs-bettercampus",
                label: "Scope vs BetterCampus",
                copy: "Search and cited answers against a Canvas restyling and dashboard toolkit with a far larger install base.",
              },
              {
                href: "/compare/scope-vs-tasks-for-canvas",
                label: "Scope vs Tasks for Canvas",
                copy: "A full course index against a far more widely installed assignment tracker.",
              },
              {
                href: "/guides/how-to-search-canvas",
                label: "How to search Canvas",
                copy: "What Canvas can and cannot find on its own, and how to get to a file when you only remember a phrase from it.",
              },
            ]}
          />
        </div>
      </Sheet>

      {/* Close, on the desk. */}
      <section
        className="on-desk shell section ext-closing"
        aria-labelledby="closing-title"
      >
        <Mark size={48} />
        <h2 id="closing-title" className="t-title" data-focus>
          Open a course. Press ⌘K.
        </h2>
        <div className="actions">
          <InstallButton />
        </div>
        <p className="btn-note">Works with Canvas and Brightspace</p>
      </section>
    </PageShell>
  );
}
