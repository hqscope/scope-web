import Link from "next/link";

import PenMark from "@/components/motion/PenMark";
import Sheet from "@/components/motion/Sheet";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import Mark from "@/components/site/Mark";
import PageHead from "@/components/site/PageHead";
import PageShell from "@/components/site/PageShell";
import { publicPageMetadata } from "@/lib/seo";
import { CHROME_WEB_STORE_URL } from "@/lib/site";
import { breadcrumbSchema, itemListSchema } from "@/lib/structured-data";

import "../_company/company.css";
import DirectionRoadmap, { type DirectionStage } from "./DirectionRoadmap";

export const metadata = publicPageMetadata({
  title: "Direction",
  description:
    "Learning management systems became systems of record: files in, grades out. The actual work of learning happens somewhere else. We think the course itself should be the workspace, and we're building toward that in the open.",
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

const stages: DirectionStage[] = [
  {
    id: "today",
    when: "Today",
    status: "Shipping and free",
    lead: "The student layer.",
    copy: "Scope for Canvas, the extension, puts search, cited answers, practice exams, and a planner inside the LMS. Lectra Notes is the workspace for ink, notebooks, and an offline library. Polya tutors from the course itself, and DropBridge carries files between all of it.",
    shipping: true,
  },
  {
    id: "next",
    when: "Next",
    status: "In design",
    lead: "The instructor side.",
    copy: "Publishing, assignments, feedback, and grading run in Scope while the institutional LMS stays the system of record underneath. A course can live in Scope before a university ever signs anything.",
    shipping: false,
  },
  {
    id: "eventually",
    when: "Eventually",
    status: "The goal",
    lead: "The course doesn't need the old system underneath.",
    copy: "Enrollment, content, work, and record all live in one place, an LMS where the learning and the management are the same surface. Replacing the old system becomes a migration you can plan.",
    shipping: false,
  },
];

const principles = [
  {
    title: "Students first, free",
    copy: "The student layer is free. We charge institutions and never the people doing the homework.",
  },
  {
    title: "Local-first by default",
    copy: "Course data is indexed and searched on your device. Cloud features are explicit, optional, and labeled.",
  },
  {
    title: "AI that cites or stays quiet",
    copy: "Every generated answer points to the course material it came from. If there is no source, there is no claim.",
  },
  {
    title: "Leave the door open",
    copy: "We use open formats like .lectra and standard exports, so nothing locks you in. If we're wrong, leaving should be easy.",
  },
];

export default function DirectionPage() {
  return (
    <PageShell active="direction">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Direction", path: "/direction" },
          ]),
          itemListSchema("What Scope is building", "/direction", [
            { name: "Today: the student layer", path: "/direction#today" },
            { name: "Next: the instructor side", path: "/direction#next" },
            { name: "Eventually: the course itself", path: "/direction#eventually" },
          ]),
        ]}
      />

      <Sheet labelledBy="direction-title">
        <PageHead
          context="Where Scope is going. Only the first stage ships today."
          title={
            <span id="direction-title">
              The next LMS should not be a better{" "}
              <span className="co-penned">
                filing cabinet.
                <PenMark kind="strike" inset="0 -6px" delay={0.9} />
              </span>
            </span>
          }
          lede="Learning management systems became systems of record: files in, grades out. The actual work of learning happens somewhere else. We think the course itself should be the workspace, and we're building toward that in the open."
        />
      </Sheet>

      <Sheet className="section" labelledBy="wedge-title">
        <div className="shell split split--even split--top">
          <div>
            <h2 id="wedge-title" className="t-head" data-focus>
              You don&rsquo;t replace an LMS by asking a university to switch.
            </h2>
            <p className="copy co-copy-gap">
              Procurement cycles run for years, and students are enrolled now. So Scope
              enters from the side with Scope for Canvas, a free extension on top of
              Canvas and Brightspace that students install themselves in a minute. It
              works with the systems your school already runs.
            </p>
          </div>
          <div>
            <h2 className="t-head" data-focus>
              If students do their work in Scope, the record follows the work.
            </h2>
            <p className="copy co-copy-gap">
              When reading, notes, code, questions, and submissions all pass through one
              place, that place becomes the real system of record. The old LMS underneath
              turns into an export target, and replacing it becomes a migration.
            </p>
          </div>
        </div>
      </Sheet>

      <Sheet className="section" labelledBy="path-title">
        <div className="shell">
          <div className="co-head-split">
            <h2 id="path-title" className="t-title" data-focus>
              The path, plainly labeled.
            </h2>
            <p className="margin-note">
              What ships today is written in ink. Plans are in pencil, because plans
              change.
            </p>
          </div>
          <p className="co-legend" aria-hidden="true">
            <span>
              <i /> Shipping
            </span>
            <span>
              <i data-pencil /> Planned
            </span>
          </p>
          <DirectionRoadmap stages={stages} />
        </div>
      </Sheet>

      <Sheet className="section" labelledBy="rules-title">
        <div className="shell split split--top">
          <div>
            <h2 id="rules-title" className="t-head" data-focus>
              Rules we&rsquo;re holding ourselves to.
            </h2>
            <p className="copy co-copy-gap">
              These hold at every stage of the path, including the ones still in pencil.
            </p>
          </div>
          <ul className="feature-list feature-list--wide" style={{ marginTop: 0 }}>
            {principles.map((principle) => (
              <li key={principle.title}>
                <strong>{principle.title}</strong>
                <span>{principle.copy}</span>
              </li>
            ))}
          </ul>
        </div>
      </Sheet>

      <section className="on-desk shell section co-closing" aria-labelledby="closing-title">
        <Mark size={48} />
        <h2 id="closing-title" className="t-title" data-focus>
          The first piece is free. Try it today.
        </h2>
        <div className="actions">
          <StoreLink
            store="chrome-web-store"
            href={CHROME_WEB_STORE_URL}
            className="btn btn-primary"
          >
            Add Scope to Chrome for free
          </StoreLink>
          <Link href="/newsroom" className="btn btn-line">
            Follow along in the Newsroom
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
