import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Fragment } from "react";
import { Check } from "lucide-react";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/lib/structured-data";
import { CHROME_WEB_STORE_URL, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mission",
  description:
    "Coursework is handwritten, drawn, and worked out in notation — and the software students get is text-only. Scope is building a course-grounded workspace, and the multimodal models behind it, that meet the work in the form it is actually done.",
  alternates: {
    canonical: "/mission",
  },
  keywords: [
    "Scope mission",
    "course-grounded AI",
    "multimodal student work",
    "handwritten STEM work",
    "local-first student software",
    "Scope Labs",
  ],
};

const approach = [
  {
    step: "Ground",
    title: "Work from the course",
    copy:
      "Answers come from the materials of the class you are actually in — the readings, the slides, the assignment in front of you — and point back to where they came from.",
  },
  {
    step: "Understand",
    title: "Read the work as it is",
    copy:
      "Handwriting, diagrams, notation, notebooks, and code. Not a text box that treats everything else as an attachment.",
  },
  {
    step: "Respond",
    title: "Ask before answering",
    copy:
      "A question that moves you one step is worth more than a finished solution you did not write. The hard part is knowing which step you are on.",
  },
];

const building = [
  {
    title: "The workspace",
    copy:
      "Somewhere to do the assignment: annotate the reading, run the notebook, write the code, work the derivation. It attaches to the Canvas or Brightspace a school already runs, and students use it free.",
  },
  {
    title: "Course-grounded answers",
    copy:
      "Retrieval over your own course materials, so every claim points back to the page, slide, or moment in a lecture it came from — and stops at the edge of your course.",
  },
  {
    title: "Multimodal understanding",
    copy:
      "Models that read handwritten and drawn STEM work — notation, structures, diagrams, the arrows between them — instead of flattening anything that is not text into a caption.",
  },
  {
    title: "Proposals, then checks",
    copy:
      "Where a subject has hard rules, deterministic tools decide what holds and the model only proposes. When the reading is uncertain, the software asks. It does not rule.",
  },
  {
    title: "Local-first, still",
    copy:
      "The index lives on your devices, handoffs are end-to-end, and on-device models run where they are available. Nothing sold, ever.",
  },
  {
    title: "Scope Labs",
    copy:
      "The research arm. Continuous literature review, a graph tying each method to the component it would change and the experiment that would test it, and evaluation specified before anything is trained.",
  },
];

const limits = [
  {
    lead: "This is not a grading system.",
    copy:
      "Scope does not score work. There is no instructor gradebook, no roster sync, and no replacement for the LMS a school already runs.",
  },
  {
    lead: "A model that reads handwriting will misread some of it.",
    copy:
      "A misread mark and a real misunderstanding look identical a step later. We treat that as the central problem rather than an edge case, which is why the checks are deterministic and the uncertainty is shown.",
  },
  {
    lead: "Producing an answer is the easy part.",
    copy:
      "Any general model can hand over a finished solution. Whether a student can then do the next problem alone is a different measurement, and it is the one that matters.",
  },
  {
    lead: "None of the model work is proven yet.",
    copy:
      "The architecture is designed and the evaluation is written down. The numbers come after, and they go out either way.",
  },
];

const discipline = [
  {
    step: "Step 01",
    title: "Start from a real failure",
    copy:
      "A feature begins with coursework the current tools handle badly, not with a capability we would like to demonstrate.",
  },
  {
    step: "Step 02",
    title: "Decide what would falsify it",
    copy:
      "The success criterion, the split, and the baseline are fixed before the build. A demo that works on the example it was built from is not evidence.",
  },
  {
    step: "Step 03",
    title: "Measure the student, not the demo",
    copy:
      "The test is whether the work got better afterwards — including when the honest answer is that it did not.",
  },
];

export default function MissionPage() {
  return (
    <PublicPageFrame footerVariant="slim">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Mission", path: "/mission" },
          ]),
          itemListSchema("What Scope is building", "/mission", [
            { name: "What we're building", path: "/mission#building" },
            { name: "What we don't claim", path: "/mission#limits" },
            { name: "How the work runs", path: "/mission#discipline" },
          ]),
        ]}
      />

      <section className="page-wrap centered-hero">
        <div data-reveal>
          <p className="kicker">Our mission</p>
          <h1>
            Coursework is multimodal. The software students get{" "}
            <em>isn&apos;t</em>.
          </h1>
          <p className="centered-hero-lede">
            Students work in handwriting, diagrams, notation, and code, then get
            help from tools that only read text. Scope is building the
            workspace where the work actually happens, and the models that can
            read it in the form it was done.
          </p>
          <div className="pill-actions" aria-label="Primary actions">
            <a href={CHROME_WEB_STORE_URL} className="button-primary">
              Add Scope to Chrome — free
            </a>
            <a href="#limits" className="button-secondary">
              What we don&apos;t claim →
            </a>
          </div>
          <p className="hero-note">Berkeley, California</p>
        </div>

        <div
          className="flow-strip"
          data-reveal
          style={{ "--reveal-delay": "120ms" } as CSSProperties}
        >
          {approach.map((item, index) => (
            <Fragment key={item.step}>
              {index > 0 ? (
                <div className="flow-arrow" aria-hidden="true">
                  →
                </div>
              ) : null}
              <article className="flow-card">
                <p>{item.step.toUpperCase()}</p>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            </Fragment>
          ))}
        </div>
      </section>

      <section className="page-wrap section-pad" id="building">
        <div className="section-heading" data-reveal>
          <p className="kicker kicker-muted">The work</p>
          <h2>What we&apos;re building.</h2>
        </div>
        <div
          className="plain-grid stack-top"
          data-reveal
          style={{ "--reveal-delay": "90ms" } as CSSProperties}
        >
          {building.map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-wrap split-section" id="limits">
        <div data-reveal>
          <p className="kicker kicker-muted">Claim discipline</p>
          <h2>The limits are part of the work.</h2>
        </div>
        <div className="check-list" data-reveal>
          {limits.map((item) => (
            <div key={item.lead}>
              <Check className="h-4 w-4" aria-hidden="true" />
              <p>
                <strong>{item.lead}</strong> {item.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="discipline">
        <div className="step-band" data-reveal>
          <h2>How a feature earns its place.</h2>
          <div className="step-grid">
            {discipline.map((item) => (
              <div key={item.step}>
                <span>{item.step.toUpperCase()}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-wrap install-section" id="collaborate" data-reveal>
        <div>
          <h2>Build it with us.</h2>
          <p>
            We want to hear from students who will tell us what is broken,
            instructors willing to argue about what good help looks like, and
            researchers working on multimodal understanding, tutoring, and
            evaluation. The shared standard is a claim that survives a hostile
            read.
          </p>
        </div>
        <div className="pill-actions install-actions">
          <a href={`mailto:${SUPPORT_EMAIL}`} className="button-primary">
            Start a conversation
          </a>
        </div>
      </section>
    </PublicPageFrame>
  );
}
