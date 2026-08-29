import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import NewsroomTeaserGrid from "@/components/public/NewsroomTeaserGrid";
import ScopeMark from "@/components/public/ScopeMark";
import BriefingMock from "@/components/public/mocks/BriefingMock";
import CommandPaletteMock from "@/components/public/mocks/CommandPaletteMock";
import DropBridgeStrip from "@/components/public/mocks/DropBridgeStrip";
import PolyaChatMock from "@/components/public/mocks/PolyaChatMock";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  canvascopeSoftwareSchema,
} from "@/lib/structured-data";
import { getNewsroomArticlesBySlugs } from "@/lib/newsroom";
import { CHROME_WEB_STORE_URL, LECTRA_APP_STORE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Scope | The LMS where students actually do the work",
  },
  description:
    "Scope works with the LMS your school already runs — and puts your reading, notes, code, and questions in one place, tied to the course. Local-first search for Canvas and Brightspace, cited course answers, and an iPad workspace.",
  alternates: {
    canonical: "/",
  },
};

const paletteRows = [
  {
    tag: "PDF",
    title: "Practice Midterm 2 — solutions.pdf",
    meta: "Files · Exams",
    active: true,
  },
  {
    tag: "PDF",
    title: "Practice Midterm 2 (blank).pdf",
    meta: "Files · Exams",
  },
  {
    tag: "Due",
    tone: "due" as const,
    title: "Midterm 2 — in class",
    meta: "Thu Nov 5 · Assignments",
  },
  {
    tag: "Page",
    title: "Syllabus — exam policy",
    meta: "Pages",
  },
];

const briefingItems = [
  { label: "Problem Set 4 due Thursday", course: "Math 53", urgent: true },
  { label: "Quiz Friday — sections 5.1–5.4", course: "Chem 1A" },
  { label: "New slides posted — Week 9", course: "BioE 141" },
];

const loop = [
  {
    step: "01 — Find",
    title: "⌘K in the browser",
    copy:
      "Every file, page, and assignment across your courses — searched on your device, answers cited to the source.",
  },
  {
    step: "02 — Work",
    title: "Lectra Notes on iPad",
    copy:
      "Ink the reading, run the notebook, keep the library offline. Polya when you're stuck on a step.",
  },
  {
    step: "03 — Back",
    title: "Into any upload flow",
    copy:
      "Finished files return to the browser and attach wherever the course collects work. DropBridge carries them.",
  },
];

const extensionFeatures = [
  {
    title: "Instant, local search",
    copy: "Indexed on your device, including OCR on scanned PDFs.",
  },
  {
    title: "Cited course answers",
    copy:
      "Ask about the course; every answer points back to the page it came from.",
  },
  {
    title: "Practice exams and a planner",
    copy:
      "Built from real course materials. Due dates, optionally in Google Calendar.",
  },
];

const lectraFeatures = [
  {
    title: "Apple-Pencil-first ink",
    copy: "Vector ink on PDFs, notebooks, and scans. Your library, offline.",
  },
  {
    title: "A real computing environment",
    copy: "Python notebooks, a terminal, and Git — offline, on the iPad.",
  },
  {
    title: "On-device document intelligence",
    copy:
      "On supported devices. Anything that reaches the cloud is explicit and optional.",
  },
];

const roadmap = [
  {
    stage: "today" as const,
    when: "Today",
    status: "Shipping · free",
    copy:
      "The student layer on top of the LMS your school already runs. The extension, Lectra Notes, Polya.",
  },
  {
    stage: "next" as const,
    when: "Next",
    status: "In design",
    copy:
      "Instructors run the course in Scope — publishing, feedback, grading.",
  },
  {
    stage: "eventually" as const,
    when: "Eventually",
    status: "The goal",
    copy:
      "The course doesn't need the old system underneath. Replacement becomes a migration, not a leap.",
  },
];

const homeNewsroomArticles = getNewsroomArticlesBySlugs([
  "lectra-studio",
  "who-teaches-this-and-does-it-fit-my-week",
  "a-working-prototype-of-the-instructor-side",
]);

export default function HomePage() {
  return (
    <PublicPageFrame>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          canvascopeSoftwareSchema(),
        ]}
      />

      {/* --- Hero --- */}
      <section className="page-wrap product-hero">
        <div className="product-hero-grid">
          <div className="product-hero-copy" data-reveal>
            <h1>
              The LMS where students <em>actually</em> do the work.
            </h1>
            <p className="section-copy">
              Scope works with the LMS your school already runs — and puts your
              reading, notes, code, and questions in one place, tied to the
              course.
            </p>
            <div className="pill-actions">
              <a
                href={CHROME_WEB_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="button-primary"
              >
                Add Scope to Chrome — free
              </a>
              <Link href="/products/lectra" className="button-secondary">
                Get Lectra Notes →
              </Link>
            </div>
            <p className="hero-note">
              Works with Canvas and Brightspace · No account required · Free
            </p>
          </div>

          <div data-reveal="scale">
            <CommandPaletteMock
              query="practice midterm"
              scope="Math 53 · Fall"
              rows={paletteRows}
              footnote="Local index · ⌘L send to Lectra"
            />
          </div>
        </div>
      </section>

      {/* --- The problem --- */}
      <section className="section-band">
        <div className="page-wrap split-section" data-reveal>
          <div>
            <p className="kicker">The problem</p>
            <h2>The course lives in the LMS. The work lives everywhere else.</h2>
            <p className="section-copy">
              Files, assignments, and grades sit in the system your school runs.
              The reading gets annotated in one app, the code written in another,
              the questions asked somewhere else entirely. The LMS only ever sees
              the final upload.
            </p>
          </div>
          <div className="pull-quote">
            <p>
              GoodNotes knows the notebook but not the course. Canvas knows the
              course but not the work. We connect them.
            </p>
          </div>
        </div>
      </section>

      {/* --- Today's loop --- */}
      <section className="section-band">
        <div className="page-wrap">
          <div className="news-hero-top" data-reveal>
            <div className="loop-heading">
              <p className="kicker">Today&rsquo;s loop</p>
              <h2>Find. Work. Back.</h2>
            </div>
            <p className="hero-note">Shipping now · free</p>
          </div>

          <div
            className="plain-grid stack-top"
            data-reveal="stagger"
            style={{ "--stagger-step": "80ms" } as React.CSSProperties}
          >
            {loop.map((item, index) => (
              <div
                key={item.step}
                style={{ "--stagger-index": index } as React.CSSProperties}
              >
                <p className="kicker kicker--bare">{item.step}</p>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- The extension --- */}
      <section className="section-band">
        <div className="page-wrap split-section split-section--center" data-reveal>
          <div>
            <p className="kicker">Scope extension — Chrome</p>
            <h2>Your courses, one keystroke away.</h2>
            <ul className="check-list">
              {extensionFeatures.map((feature) => (
                <li key={feature.title}>
                  <strong>{feature.title}</strong>
                  <span>{feature.copy}</span>
                </li>
              ))}
            </ul>
            <Link href="/products/extension" className="text-link">
              Explore the extension →
            </Link>
          </div>

          <div className="mock-column">
            <div className="mock-chips">
              <span className="mock-chip">/ask</span>
              <span className="mock-chip">/plan</span>
              <span className="mock-chip">/quiz</span>
            </div>
            <BriefingMock date="Tue Aug 25" items={briefingItems} />
          </div>
        </div>
      </section>

      {/* --- DropBridge --- */}
      <section className="page-wrap strip-section" data-reveal="fade">
        <DropBridgeStrip />
        <p className="strip-note">
          DropBridge — files move between browser and iPad, and back into any
          upload flow
        </p>
      </section>

      {/* --- Lectra --- */}
      <section className="section-band">
        <div className="page-wrap split-section split-section--center" data-reveal>
          <div className="device-frame">
            <Image
              src="/brand/lectra-library-ipad.png"
              alt="The Lectra Notes library on iPad, showing recent course documents including an organic chemistry midterm review, a physics rotational dynamics reading, and a statics lab worksheet."
              width={2064}
              height={1548}
              quality={90}
              sizes="(max-width: 860px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="kicker">Lectra Notes — iPad · iPhone</p>
            <h2>
              The workspace for documents you <em>think</em> on.
            </h2>
            <ul className="check-list">
              {lectraFeatures.map((feature) => (
                <li key={feature.title}>
                  <strong>{feature.title}</strong>
                  <span>{feature.copy}</span>
                </li>
              ))}
            </ul>
            <div className="link-row">
              <a
                href={LECTRA_APP_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                Get Lectra Notes →
              </a>
              <Link href="/mac" className="link-quiet">
                Also on Mac →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- Polya --- */}
      <section className="section-band">
        <div className="page-wrap split-section split-section--center" data-reveal>
          <div>
            <p className="kicker">Polya — web</p>
            <h2>A tutor that knows the course.</h2>
            <p className="section-copy">
              Not a chatbot that knows everything and nothing. Polya grounds
              every hint in your actual course materials and cites the page,
              slide, or lecture moment it came from. Guided help that gets you to
              the answer — not past it.
            </p>
            <Link href="/products/polya" className="text-link">
              Try Polya →
            </Link>
          </div>

          <div className="mock-column">
            <PolyaChatMock
              question="Why does the sign flip in step 3 of the substitution?"
              answer="Look at what happens to du when u = cos θ. Before checking the solutions — try writing out the new bounds first. What direction are they running?"
              sources={["Lecture 14 · Slide 22"]}
            />
            <p className="strip-note">
              Guided, not answer-dumping · every answer cited
            </p>
          </div>
        </div>
      </section>

      {/* --- Direction --- */}
      <section className="section-band section-band--sunken">
        <div className="page-wrap">
          <div className="direction-head" data-reveal>
            <div>
              <p className="kicker">Direction</p>
              <h2>The next LMS should not be a better filing cabinet.</h2>
              <p className="section-copy">
                It should be the course&rsquo;s execution environment. Here is
                the path — plainly labeled.
              </p>
            </div>
            <p className="hero-note">
              What we&rsquo;re building —<br />
              not what ships today
            </p>
          </div>

          <div className="roadmap stack-top" data-reveal>
            {roadmap.map((row) => (
              <div key={row.when} className="roadmap-row" data-stage={row.stage}>
                <div className="roadmap-when">
                  <span>{row.when}</span>
                  <span>{row.status}</span>
                </div>
                <div className="roadmap-body">
                  <div className="roadmap-bar" />
                  <p>{row.copy}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="stack-top">
            <Link href="/direction" className="text-link">
              See where this goes →
            </Link>
          </p>
        </div>
      </section>

      {/* --- Privacy --- */}
      <section className="page-wrap section-pad">
        <div className="privacy-band" data-reveal>
          <div>
            <p className="kicker">Privacy</p>
            <h2>Local-first isn&rsquo;t a feature. It&rsquo;s the whole point.</h2>
            <p className="section-copy">
              Your course index is built and searched on your device. Anything
              that reaches the cloud is explicit and optional — and off by
              default.
            </p>
          </div>
          <div className="privacy-stats">
            <div>
              <span className="stat-zero">0</span>
              <span className="stat-label">Data sold</span>
            </div>
            <div>
              <span className="stat-zero">0</span>
              <span className="stat-label">Ad trackers</span>
            </div>
          </div>
        </div>
      </section>

      <NewsroomTeaserGrid
        articles={homeNewsroomArticles}
        kicker="Newsroom"
        title="Building in the open."
        ctaLabel="All posts →"
      />

      {/* --- Final CTA --- */}
      <section className="page-wrap final-cta" data-reveal>
        <ScopeMark size={44} />
        <h2>Start where you already are.</h2>
        <p>
          Scope enters through the LMS your school already runs. Install it, open
          a course, press ⌘K.
        </p>
        <div className="pill-actions">
          <a
            href={CHROME_WEB_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="button-primary"
          >
            Add Scope to Chrome — free
          </a>
          <Link href="/products/lectra" className="button-secondary">
            Get Lectra Notes →
          </Link>
        </div>
        <p className="hero-note">
          Works with Canvas and Brightspace · No account required · Free
        </p>
      </section>
    </PublicPageFrame>
  );
}
