import Link from "next/link";

import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import PenMark from "@/components/motion/PenMark";
import Sheet from "@/components/motion/Sheet";
import Mark from "@/components/site/Mark";
import NewsList from "@/components/site/NewsList";
import PageShell from "@/components/site/PageShell";
import { newsroomArticles } from "@/lib/newsroom";
import { publicPageMetadata } from "@/lib/seo";
import {
  CHROME_WEB_STORE_URL,
  LECTRA_APP_STORE_CAMPAIGN_URL,
  SCOPE_DEFINITION,
} from "@/lib/site";
import { breadcrumbSchema, canvascopeSoftwareSchema } from "@/lib/structured-data";

import "./_home/home.css";
import LectraTurn from "./_home/LectraTurn";
import LoopScene, { type LoopStep } from "./_home/LoopScene";
import PenSearch from "./_home/PenSearch";
import PolyaReplay from "./_home/PolyaReplay";
import Roadmap, { type RoadmapRow } from "./_home/Roadmap";

export const metadata = publicPageMetadata({
  title: "Scope for Canvas | Local-First Canvas Search Extension",
  absoluteTitle: true,
  description:
    "Scope for Canvas is a free, local-first Chrome extension that searches your Canvas and Brightspace courses and cites its answers. It comes with Lectra Notes, the free Apple Pencil iPad app.",
  path: "/",
});

const loopSteps: LoopStep[] = [
  {
    name: "Find",
    title: "⌘K in the browser",
    copy: "Every file, page, and assignment across your courses is searched on your device, and answers are cited to the source.",
  },
  {
    name: "Work",
    title: "Lectra Notes on iPad",
    copy: "Ink the reading, run the notebook, and keep the library offline. Polya is there when you're stuck on a step.",
  },
  {
    name: "Back",
    title: "Into supported upload flows",
    copy: "Finished files come back to the browser and into supported upload flows. DropBridge carries them.",
  },
];

const extensionFeatures = [
  {
    title: "Instant, local search",
    copy: "Indexed on your device, including the text in scanned PDFs.",
  },
  {
    title: "Cited course answers",
    copy: "Ask about the course and every answer points back to the page it came from. Scope does not take quizzes, write submissions, or interact with Canvas quiz logs.",
  },
  {
    title: "Practice exams and a planner",
    copy: "Built from real course materials, with due dates that can go into Google Calendar if you want them there.",
  },
];

const lectraFeatures = [
  {
    title: "Apple Pencil first ink",
    copy: "Vector ink on PDFs, notebooks, and scans, with your library kept offline.",
  },
  {
    title: "A real computing environment",
    copy: "Python notebooks, a terminal, and Git that all work offline on the iPad.",
  },
  {
    title: "On-device document intelligence",
    copy: "It runs on supported devices, and anything that goes to the cloud is explicit and optional.",
  },
];

const briefing = [
  { label: "Problem Set 4 due Thursday", course: "Math 53", urgent: true },
  { label: "Quiz Friday, sections 5.1 to 5.4", course: "Chem 1A" },
  { label: "New slides posted, Week 9", course: "BioE 141" },
];

const roadmap: RoadmapRow[] = [
  {
    when: "Today",
    status: "Shipping and free",
    copy: "The student layer on top of the LMS your school already runs: the extension, Lectra Notes, and Polya.",
    distance: 0,
  },
  {
    when: "Next",
    status: "In design",
    copy: "Instructors run the course in Scope, from publishing to feedback to grading.",
    distance: 1,
  },
  {
    when: "Eventually",
    status: "The goal",
    copy: "The course no longer needs the old system underneath it, so replacing that system turns into a migration you can plan.",
    distance: 2,
  },
];

function PrimaryActions() {
  return (
    <>
      <div className="actions">
        <StoreLink
          store="chrome-web-store"
          href={CHROME_WEB_STORE_URL}
          className="btn btn-primary"
        >
          Add Scope to Chrome for free
        </StoreLink>
        <Link href="/products/lectra" className="btn btn-line">
          Get Lectra Notes
        </Link>
      </div>
      <p className="btn-note">
        Works with Canvas and Brightspace, needs no account, and is free.
      </p>
    </>
  );
}

export default function HomePage() {
  const latestPosts = newsroomArticles.slice(0, 3);

  return (
    <PageShell>
      <JsonLd
        data={[breadcrumbSchema([{ name: "Home", path: "/" }]), canvascopeSoftwareSchema()]}
      />

      {/* Hero: the first sheet on the desk. */}
      <Sheet className="hero" labelledBy="hero-title">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="context-line">
              Scope for Canvas, the free Chrome extension for Canvas and Brightspace
            </p>
            <h1 id="hero-title" className="t-display hero-title">
              The LMS where students actually do the work.
            </h1>
            <p className="lede">
              {SCOPE_DEFINITION} Lectra Notes, its free iPad app, is where you mark up
              the reading with Apple Pencil and run the notebook.
            </p>
            <PrimaryActions />
          </div>
          <PenSearch />
        </div>
      </Sheet>

      {/* The problem, said plainly. */}
      <Sheet className="section problem" labelledBy="problem-title">
        <div className="shell split split--top">
          <div>
            <h2 id="problem-title" className="t-head" data-focus>
              The course lives in the LMS. The work lives everywhere else.
            </h2>
            <p className="copy" style={{ marginTop: 22 }}>
              Files, assignments, and grades sit in the system your school runs. The
              reading gets annotated in one app, the code gets written in another, and
              the questions get asked somewhere else entirely. The LMS only ever sees
              the final upload.
            </p>
          </div>
          <blockquote className="problem-quote">
            <p>
              Goodnotes knows the notebook but not the course. Canvas knows the course
              but not the work.{" "}
              <span className="problem-connect">
                We connect them.
                <PenMark kind="underline" inset="auto -4px -14px -4px" delay={0.3} />
              </span>
            </p>
          </blockquote>
        </div>
      </Sheet>

      {/* Find, Work, Back: one problem set makes the whole trip, on the desk. */}
      <section className="on-desk loop" aria-labelledby="loop-title">
        <div className="shell loop-head">
          <h2 id="loop-title" className="t-title" data-focus>
            Find. Work. Back.
          </h2>
          <p className="margin-note">Shipping now, and free.</p>
        </div>
        <LoopScene steps={loopSteps} />
        <p className="shell small loop-caption">
          DropBridge moves files between the browser and the iPad, and back into
          supported upload flows.
        </p>
      </section>

      {/* The extension. */}
      <Sheet className="section" labelledBy="ext-title">
        <div className="shell split">
          <div>
            <p className="section-tag">
              <Mark size={18} /> Scope for Canvas, in Chrome
            </p>
            <h2 id="ext-title" className="t-head" data-focus>
              Search every Canvas and Brightspace course, one keystroke away.
            </h2>
            <ul className="feature-list">
              {extensionFeatures.map((feature) => (
                <li key={feature.title}>
                  <strong>{feature.title}</strong>
                  <span>{feature.copy}</span>
                </li>
              ))}
            </ul>
            <div className="link-row">
              <Link href="/products/extension" className="link">
                Explore the extension
              </Link>
              <Link href="/compare/best-canvas-chrome-extensions" className="link">
                Best Canvas Chrome extensions, compared
              </Link>
            </div>
          </div>

          <div className="briefing-wrap" aria-hidden="true">
            <div className="briefing-commands">
              <span className="chip">/ask</span>
              <span className="chip">/plan</span>
              <span className="chip chip-pen">/quiz</span>
            </div>
            <div className="briefing plane">
              <p className="briefing-date">Today, Tue Aug 25</p>
              <ul>
                {briefing.map((item) => (
                  <li key={item.label} data-urgent={item.urgent || undefined}>
                    <span className="briefing-label">
                      {item.label}
                      {item.urgent ? (
                        <PenMark kind="circle" inset="-9px -14px -10px -12px" delay={0.2} />
                      ) : null}
                    </span>
                    <span className="briefing-course">{item.course}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Sheet>

      {/* Lectra Notes: the iPad turns on the desk as you scroll. */}
      <section className="on-desk section lectra-band" aria-labelledby="lectra-title">
        <div className="shell split split--flip">
          <LectraTurn />
          <div>
            <p className="section-tag">Lectra Notes on iPad and iPhone</p>
            <h2 id="lectra-title" className="t-head" data-focus>
              The workspace for documents you think on.
            </h2>
            <ul className="feature-list">
              {lectraFeatures.map((feature) => (
                <li key={feature.title}>
                  <strong>{feature.title}</strong>
                  <span>{feature.copy}</span>
                </li>
              ))}
            </ul>
            <div className="link-row">
              <StoreLink store="app-store" href={LECTRA_APP_STORE_CAMPAIGN_URL} className="link">
                Get Lectra Notes
              </StoreLink>
              <Link href="/guides/annotate-lecture-slides-on-ipad" className="link">
                Annotate Canvas lecture slides on iPad
              </Link>
              <Link href="/mac" className="link">
                Also on Mac
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Polya. */}
      <Sheet className="section" labelledBy="polya-title">
        <div className="shell split">
          <div>
            <p className="section-tag">Polya on the web</p>
            <h2 id="polya-title" className="t-head" data-focus>
              A tutor that knows the course.
            </h2>
            <p className="copy" style={{ marginTop: 22 }}>
              General chatbots know a little about everything and nothing about your
              class. Polya grounds every hint in your actual course materials and cites
              the page, slide, or lecture moment it came from. The help is guided, so it
              gets you to the answer and stops there.
            </p>
            <div className="link-row">
              <Link href="/products/polya" className="link">
                Try Polya
              </Link>
            </div>
          </div>
          <div>
            <PolyaReplay />
            <p className="margin-note" style={{ marginTop: 16 }}>
              Guided help, and every answer is cited.
            </p>
          </div>
        </div>
      </Sheet>

      {/* Direction: plans in pencil, today in ink. */}
      <Sheet className="section direction" labelledBy="direction-title">
        <div className="shell">
          <div className="direction-head">
            <h2 id="direction-title" className="t-title" data-focus>
              The next LMS should not be a better filing cabinet.
            </h2>
            <div>
              <p className="lede">
                It should be the course&rsquo;s execution environment. Here is the path,
                plainly labeled.
              </p>
              <p className="margin-note" style={{ marginTop: 14 }}>
                This is what we&rsquo;re building. It is not what ships today.
              </p>
            </div>
          </div>
          <Roadmap rows={roadmap} />
          <div className="link-row">
            <Link href="/direction" className="link">
              See where this goes
            </Link>
          </div>
        </div>
      </Sheet>

      {/* Privacy and the newsroom share the last sheet. */}
      <Sheet className="section" labelledBy="privacy-title">
        <div className="shell">
          <div className="split split--even privacy">
            <div>
              <h2 id="privacy-title" className="t-head" data-focus>
                Local-first is the whole point.
              </h2>
              <p className="copy" style={{ marginTop: 22 }}>
                Search and indexing run entirely on your device. AI answers try
                Chrome&rsquo;s on-device model first, and when it is unavailable an
                optional, clearly marked cloud fallback is used.
              </p>
              <div className="link-row">
                <Link href="/guides/canvas-extension-safety" className="link">
                  How to check any Canvas extension before installing it
                </Link>
              </div>
            </div>
            <ul className="privacy-facts">
              <li>
                <span className="privacy-zero">0</span>
                <span>data sold</span>
              </li>
              <li>
                <span className="privacy-zero">0</span>
                <span>subscriptions</span>
              </li>
            </ul>
          </div>

          <div className="news">
            <div className="news-head">
              <h2 id="news-title" className="t-head" data-focus>
                Building in the open.
              </h2>
              <Link href="/newsroom" className="link">
                All posts
              </Link>
            </div>
            <NewsList articles={latestPosts} showDescription={false} />
          </div>
        </div>
      </Sheet>

      {/* Close, on the desk. */}
      <section className="on-desk shell section closing" aria-labelledby="closing-title">
        <Mark size={48} className="closing-mark" />
        <h2 id="closing-title" className="t-title" data-focus>
          Start where you already are.
        </h2>
        <p className="lede">
          Scope enters through the LMS your school already runs. Install it, open a
          course, and press ⌘K.
        </p>
        <PrimaryActions />
      </section>
    </PageShell>
  );
}
