import type { CSSProperties } from "react";
import { Fragment } from "react";
import { Check } from "lucide-react";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import JsonLd from "@/components/seo/JsonLd";
import { publicPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/structured-data";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata = publicPageMetadata({
  title: "Scope Research",
  description:
    "Scope Research builds computational tools that predict the cortical response a stimulus evokes, map those predictions onto interpretable brain regions, and hold them to held-out evaluation against strong baselines.",
  path: "/research",
  keywords: [
    "Scope Research",
    "computational neuroscience",
    "brain encoding models",
    "cortical response prediction",
    "cortical mapping",
    "held-out evaluation",
    "pre-registration",
  ],
});

const method = [
  {
    step: "Estimate",
    title: "Predict the response",
    copy:
      "Multimodal models take audio, video, and text and estimate the stimulus-evoked cortical response, second by second.",
  },
  {
    step: "Map",
    title: "Put it somewhere legible",
    copy:
      "High-dimensional predictions are summarized across interpretable cortical regions and functional networks, so a result can be inspected rather than trusted.",
  },
  {
    step: "Validate",
    title: "Test it on what it hasn't seen",
    copy:
      "Predictions are measured out-of-sample against a strong baseline — never against nothing, and never in-sample fit dressed up as prediction.",
  },
];

const focusAreas = [
  {
    title: "Multimodal brain encoding",
    copy:
      "Models that map naturalistic audio, video, and language onto stimulus-evoked cortical response patterns.",
  },
  {
    title: "Cortical region and network mapping",
    copy:
      "Reducing vertex-level predictions to region and network summaries that a researcher can read, argue with, and check.",
  },
  {
    title: "Cross-subject decoding",
    copy:
      "Whether a model pretrained across many people can read a new person's signal from minutes of calibration instead of a full session.",
  },
  {
    title: "Leakage-audited evaluation",
    copy:
      "Pre-committed splits, counterfactual unit tests, and audits that fail loudly — built to catch the failure mode this field is known for.",
  },
  {
    title: "Pre-registration and provenance",
    copy:
      "Endpoints registered before the analysis runs, with execution lineage and receipts kept so a result can be reproduced by someone who doubts it.",
  },
  {
    title: "The critiques, collected",
    copy:
      "Failed replications, reverse-inference critiques, and reliability limits are gathered as carefully as the supporting work. They decide what we don't say.",
  },
];

const standards = [
  {
    lead: "Prediction is not identification, and neither is explanation.",
    copy: "We keep the three separate in every result we publish.",
  },
  {
    lead: "We predict responses, not states of mind.",
    copy:
      "Reading a mental state back out of a response pattern is the inference this field is most criticized for. We don't make it.",
  },
  {
    lead: "Out-of-distribution performance degrades.",
    copy:
      "Models trained on one kind of material do worse on another. We expect that, measure it, and say so first.",
  },
  {
    lead: "A result is one signal among several.",
    copy:
      "Our work belongs alongside other evidence in a research workflow. It is not a verdict, and never a readout about an individual person.",
  },
];

const evidenceSteps = [
  {
    step: "Step 01",
    title: "Register the endpoint",
    copy:
      "The question, the splits, and the success criterion are written down before any modelling starts. Post-hoc promotion doesn't count.",
  },
  {
    step: "Step 02",
    title: "Beat a strong baseline",
    copy:
      "Held-out performance is compared against the best simple alternative — content features, metadata, self-report — not against a straw man.",
  },
  {
    step: "Step 03",
    title: "Publish it either way",
    copy:
      "The result goes out honestly, including when the baseline wins. A claim we can defend under scrutiny is worth more than a broad one that isn't.",
  },
];

export default function ResearchPage() {
  return (
    <PublicPageFrame footerVariant="slim">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Research", path: "/research" },
          ]),
          itemListSchema("Scope Research focus areas", "/research", [
            { name: "How the work runs", path: "/research#approach" },
            { name: "What we don't claim", path: "/research#standards" },
            { name: "Collaboration", path: "/research#collaborate" },
          ]),
        ]}
      />

      <section className="page-wrap centered-hero">
        <div data-reveal>
          <p className="kicker">Scope Research</p>
          <h1>Predicting how the cortex responds — and testing it.</h1>
          <p className="centered-hero-lede">
            We build computational tools that estimate the cortical response a
            stimulus evokes, map that estimate onto interpretable brain regions,
            and hold it to one standard: it has to work on material it has
            never seen.
          </p>
          <div className="pill-actions" aria-label="Primary actions">
            <a href={`mailto:${SUPPORT_EMAIL}`} className="button-primary">
              Collaborate with us
            </a>
            <a href="#standards" className="button-secondary">
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
          {method.map((item, index) => (
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

      <section className="page-wrap section-pad" id="approach">
        <div className="section-heading" data-reveal>
          <p className="kicker kicker-muted">The work</p>
          <h2>What we&apos;re actually working on.</h2>
        </div>
        <div
          className="plain-grid stack-top"
          data-reveal
          style={{ "--reveal-delay": "90ms" } as CSSProperties}
        >
          {focusAreas.map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-wrap split-section" id="standards">
        <div data-reveal>
          <p className="kicker kicker-muted">Claim discipline</p>
          <h2>The limits are part of the work.</h2>
        </div>
        <div className="check-list" data-reveal>
          {standards.map((item) => (
            <div key={item.lead}>
              <Check className="h-4 w-4" aria-hidden="true" />
              <p>
                <strong>{item.lead}</strong> {item.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-wrap section-pad-sm">
        <div className="step-band" data-reveal>
          <h2>How a result becomes a claim.</h2>
          <div className="step-grid">
            {evidenceSteps.map((item) => (
              <div key={item.step}>
                <span>{item.step.toUpperCase()}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="page-wrap install-section"
        id="collaborate"
        data-reveal
      >
        <div>
          <h2>Come argue with the evidence.</h2>
          <p>
            We work with people across machine learning, neuroscience,
            neuroimaging, EEG, and measurement methodology — on study design,
            model evaluation, data partnerships, and tooling. The shared
            standard is careful validation and claims that survive a hostile
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
