import type { CSSProperties } from "react";
import Link from "next/link";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import JsonLd from "@/components/seo/JsonLd";
import { publicPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/structured-data";
import { CHROME_WEB_STORE_URL } from "@/lib/site";

export const metadata = publicPageMetadata({
  title: "Direction",
  description:
    "Learning management systems became systems of record: files in, grades out. The actual work of learning happens somewhere else. We think the course itself should be the workspace — and we're building toward that in the open.",
  path: "/direction",
  keywords: [
    "Scope direction",
    "Scope mission",
    "next LMS",
    "course-grounded AI",
    "local-first student software",
    "LMS replacement",
  ],
});

const roadmap = [
  {
    stage: "today" as const,
    when: "Today",
    status: "Shipping · free",
    copy:
      "The student layer. Scope for Canvas, the extension, puts search, cited answers, practice exams, and a planner inside the LMS. Lectra Notes is the workspace — ink, notebooks, an offline library. Polya tutors from the course itself. DropBridge carries files between all of it.",
  },
  {
    stage: "next" as const,
    when: "Next",
    status: "In design",
    copy:
      "The instructor side. Publishing, assignments, feedback, and grading run in Scope while the institutional LMS stays the system of record underneath. A course can live in Scope before a university ever signs anything.",
  },
  {
    stage: "eventually" as const,
    when: "Eventually",
    status: "The goal",
    copy:
      "The course doesn't need the old system underneath. Enrollment, content, work, and record in one place — an LMS where the learning and the management are the same surface. Migration, not a leap.",
  },
];

const principles = [
  {
    n: "01",
    title: "Students first, free",
    copy:
      "The student layer is free. We charge institutions, not the people doing the homework.",
  },
  {
    n: "02",
    title: "Local-first by default",
    copy:
      "Course data is indexed and searched on-device. Cloud features are explicit, optional, and labeled.",
  },
  {
    n: "03",
    title: "AI that cites or stays quiet",
    copy:
      "Every generated answer points to the course material it came from. No source, no claim.",
  },
  {
    n: "04",
    title: "Leave the door open",
    copy:
      "Open formats like .lectra, standard exports, no lock-in. If we're wrong, leaving should be easy.",
  },
];

export default function DirectionPage() {
  return (
    <PublicPageFrame active="direction" footerVariant="slim">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Direction", path: "/direction" },
          ]),
          itemListSchema("What Scope is building", "/direction", [
            { name: "Today — the student layer", path: "/direction#today" },
            { name: "Next — the instructor side", path: "/direction#next" },
            { name: "Eventually — the course itself", path: "/direction#eventually" },
          ]),
        ]}
      />

      {/* --- Hero --- */}
      <section className="page-wrap companion-hero" data-reveal>
        <p className="kicker">
          Direction — what we&rsquo;re building, not what ships today
        </p>
        <h1>
          The next LMS should not be a better <em>filing cabinet.</em>
        </h1>
        <p className="section-copy">
          Learning management systems became systems of record: files in, grades
          out. The actual work of learning happens somewhere else. We think the
          course itself should be the workspace — and we&rsquo;re building
          toward that in the open.
        </p>
      </section>

      {/* --- The thesis --- */}
      <section className="section-band">
        <div className="page-wrap split-section" data-reveal>
          <div>
            <p className="kicker kicker--bare">The wedge</p>
            <h2>
              You don&rsquo;t replace an LMS by asking a university to switch.
            </h2>
            <p className="section-copy">
              Procurement cycles run years. Students are enrolled now. So Scope
              enters from the side: Scope for Canvas, a free extension on top of
              Canvas and Brightspace that students install themselves in a
              minute. It works with the systems your school already runs.
            </p>
          </div>
          <div>
            <p className="kicker kicker--bare">The bet</p>
            <h2>
              If students do their work in Scope, the record follows the work.
            </h2>
            <p className="section-copy">
              Reading, notes, code, questions, submissions — when they all pass
              through one place, that place becomes the real system of record.
              The old LMS underneath becomes an export target. Replacement stops
              being a leap and becomes a migration.
            </p>
          </div>
        </div>
      </section>

      {/* --- The path --- */}
      <section className="section-band section-band--sunken">
        <div className="page-wrap">
          <p className="kicker" data-reveal>
            The path — plainly labeled
          </p>
          <div className="roadmap stack-top" data-reveal>
            {roadmap.map((row) => (
              <div
                key={row.stage}
                id={row.stage}
                className="roadmap-row"
                data-stage={row.stage}
              >
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
        </div>
      </section>

      {/* --- Principles --- */}
      <section className="section-band">
        <div className="page-wrap">
          <h2 className="section-heading" data-reveal>
            Rules we&rsquo;re holding ourselves to.
          </h2>
          <div
            className="principle-grid stack-top"
            data-reveal="stagger"
            style={{ "--stagger-step": "70ms" } as CSSProperties}
          >
            {principles.map((principle, index) => (
              <div
                key={principle.n}
                className="principle"
                style={{ "--stagger-index": index } as CSSProperties}
              >
                <span>{principle.n}</span>
                <span className="principle-body">
                  <strong>{principle.title}</strong>
                  <span>{principle.copy}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="page-wrap final-cta" data-reveal>
        <h2>The wedge is free. Try it today.</h2>
        <div className="pill-actions">
          <a
            href={CHROME_WEB_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="button-primary"
          >
            Add Scope to Chrome — free
          </a>
          <Link href="/newsroom" className="button-secondary">
            Follow along in the Newsroom →
          </Link>
        </div>
      </section>
    </PublicPageFrame>
  );
}
