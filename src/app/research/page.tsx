import PenMark from "@/components/motion/PenMark";
import Sheet from "@/components/motion/Sheet";
import JsonLd from "@/components/seo/JsonLd";
import PageHead from "@/components/site/PageHead";
import PageShell from "@/components/site/PageShell";
import { publicPageMetadata } from "@/lib/seo";
import { SUPPORT_EMAIL } from "@/lib/site";
import { breadcrumbSchema, itemListSchema } from "@/lib/structured-data";

import "../_company/company.css";

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
    copy: "Multimodal models take audio, video, and text and estimate the stimulus-evoked cortical response, second by second.",
  },
  {
    step: "Map",
    title: "Put it somewhere legible",
    copy: "High-dimensional predictions are summarized across interpretable cortical regions and functional networks, so a result can be inspected instead of simply trusted.",
  },
  {
    step: "Validate",
    title: "Test it on what it hasn't seen",
    copy: "Predictions are measured out of sample against a strong baseline. We never compare against nothing, and we never present in-sample fit as prediction.",
  },
];

const focusAreas = [
  {
    title: "Multimodal brain encoding",
    copy: "Models that map naturalistic audio, video, and language onto stimulus-evoked cortical response patterns.",
  },
  {
    title: "Cortical region and network mapping",
    copy: "Reducing vertex-level predictions to region and network summaries that a researcher can read, argue with, and check.",
  },
  {
    title: "Cross-subject decoding",
    copy: "Whether a model pretrained across many people can read a new person's signal from minutes of calibration instead of a full session.",
  },
  {
    title: "Leakage-audited evaluation",
    copy: "Pre-committed splits, counterfactual unit tests, and audits that fail loudly, all built to catch the failure mode this field is known for.",
  },
  {
    title: "Pre-registration and provenance",
    copy: "Endpoints are registered before the analysis runs, and execution lineage and receipts are kept so someone who doubts a result can reproduce it.",
  },
  {
    title: "The critiques, collected",
    copy: "Failed replications, reverse-inference critiques, and reliability limits are gathered as carefully as the supporting work. They decide what we don't say.",
  },
];

const standards = [
  {
    lead: "Prediction is not identification, and neither is explanation.",
    copy: "We keep the three separate in every result we publish.",
  },
  {
    lead: "We predict responses. We don't read states of mind.",
    copy: "Reading a mental state back out of a response pattern is the inference this field is most criticized for, and we don't make it.",
  },
  {
    lead: "Out-of-distribution performance degrades.",
    copy: "Models trained on one kind of material do worse on another. We expect that, measure it, and say so first.",
  },
  {
    lead: "A result is one signal among several.",
    copy: "Our work belongs alongside other evidence in a research workflow. It is never a verdict, and never a readout about an individual person.",
  },
];

const evidenceSteps = [
  {
    title: "Register the endpoint",
    copy: "The question, the splits, and the success criterion are written down before any modelling starts. Promoting a result after the fact doesn't count.",
  },
  {
    title: "Beat a strong baseline",
    copy: "Held-out performance is compared against the best simple alternative, such as content features, metadata, or self-report, and never against a straw man.",
  },
  {
    title: "Publish it either way",
    copy: "The result goes out honestly, including when the baseline wins. A claim we can defend under scrutiny is worth more than a broad one we can't.",
  },
];

const collaborateHref = `mailto:${SUPPORT_EMAIL}`;

export default function ResearchPage() {
  return (
    <PageShell>
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

      <Sheet labelledBy="research-title">
        <PageHead
          context="Scope Research, in Berkeley, California"
          title={<span id="research-title">Predicting how the cortex responds, and testing it.</span>}
          lede={
            <>
              We build computational tools that estimate the cortical response a stimulus
              evokes, map that estimate onto interpretable brain regions, and hold it to{" "}
              <span className="co-penned co-penned-under">
                one standard
                <PenMark kind="underline" inset="auto -4px -12px -4px" delay={0.8} />
              </span>
              : it has to work on material it has never seen.
            </>
          }
        >
          <a href={collaborateHref} className="btn btn-primary">
            Collaborate with us
          </a>
          <a href="#standards" className="btn btn-line">
            What we don&rsquo;t claim
          </a>
        </PageHead>
        <div className="shell" style={{ paddingBottom: "var(--section)" }}>
          <ol className="co-steps" aria-label="How a prediction is made">
            {method.map((item) => (
              <li key={item.step} className="plane">
                <p className="co-step-name">{item.step}</p>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </Sheet>

      <Sheet className="section" id="approach" labelledBy="approach-title">
        <div className="shell">
          <h2 id="approach-title" className="t-head" data-focus style={{ marginBottom: 40 }}>
            What we&rsquo;re actually working on.
          </h2>
          <div className="idea-grid idea-grid--3">
            {focusAreas.map((item) => (
              <div key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Sheet>

      <Sheet className="section" id="standards" labelledBy="standards-title">
        <div className="shell split split--top">
          <div>
            <h2 id="standards-title" className="t-head" data-focus>
              The limits are part of the work.
            </h2>
            <p className="copy co-copy-gap">
              These hold for every result we publish.
            </p>
          </div>
          <ul className="feature-list" style={{ marginTop: 0 }}>
            {standards.map((item) => (
              <li key={item.lead}>
                <strong>{item.lead}</strong>
                <span>{item.copy}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="shell co-block">
          <h2 className="t-head" data-focus style={{ marginBottom: 36 }}>
            How a result becomes a claim.
          </h2>
          <ol className="co-steps">
            {evidenceSteps.map((item) => (
              <li key={item.title} className="plane">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </Sheet>

      <section
        className="on-desk shell section co-closing"
        id="collaborate"
        aria-labelledby="collaborate-title"
      >
        <h2 id="collaborate-title" className="t-title" data-focus>
          Come argue with the evidence.
        </h2>
        <p className="lede">
          We work with people across machine learning, neuroscience, neuroimaging, EEG,
          and measurement methodology on study design, model evaluation, data
          partnerships, and tooling. The shared standard is careful validation and
          claims that survive a hostile read.
        </p>
        <div className="actions">
          <a href={collaborateHref} className="btn btn-primary">
            Start a conversation
          </a>
        </div>
      </section>
    </PageShell>
  );
}
