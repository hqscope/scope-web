import { ButtonLink } from "@/components/buttons";
import JsonLd from "@/components/seo/JsonLd";
import PageHead from "@/components/site/PageHead";
import PageShell from "@/components/site/PageShell";
import { publicPageMetadata } from "@/lib/seo";
import { SUPPORT_EMAIL } from "@/lib/site";
import { breadcrumbSchema, itemListSchema } from "@/lib/structured-data";

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

const container = "mx-auto max-w-[1200px] px-5 sm:px-8";
const sectionTitle =
  "text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-balance";

/** The number on a step card. The <ol> already announces the order. */
function StepNumber({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold tabular-nums text-ink ring-1 ring-inset ring-[#d6d0c7]"
    >
      {n}
    </span>
  );
}

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

      <PageHead
        context="Scope Research, in Berkeley, California"
        title="Predicting how the cortex responds, and testing it."
        wide
        lede={
          <p>
            We build computational tools that estimate the cortical response a stimulus evokes,
            map that estimate onto interpretable brain regions, and hold it to{" "}
            <span className="underline decoration-red decoration-2 underline-offset-[5px]">
              one standard
            </span>
            : it has to work on material it has never seen.
          </p>
        }
      >
        <ButtonLink href={collaborateHref} size="lg">
          Collaborate with us
        </ButtonLink>
        <ButtonLink href="#standards" variant="secondary" size="lg">
          What we don&rsquo;t claim
        </ButtonLink>
      </PageHead>

      <div className={`${container} pb-20 sm:pb-28`}>
        <ol
          aria-label="How a prediction is made"
          className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5"
        >
          {method.map((item, index) => (
            <li key={item.step} className="rounded-[18px] bg-wash p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <StepNumber n={index + 1} />
                <p className="text-[15px] font-semibold text-stone">{item.step}</p>
              </div>
              <h3 className="mt-5 text-[19px] font-semibold leading-[1.25] tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="mt-2 text-[15.5px] leading-[1.6] text-stone">{item.copy}</p>
            </li>
          ))}
        </ol>
      </div>

      <section id="approach" aria-labelledby="approach-title" className={`${container} pb-20 sm:pb-28`}>
        <h2 id="approach-title" className={sectionTitle}>
          What we&rsquo;re actually working on.
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((item) => (
            <div key={item.title} className="border-t border-line py-7">
              <h3 className="text-[17px] font-semibold tracking-[-0.015em]">{item.title}</h3>
              <p className="mt-2 text-[15.5px] leading-[1.6] text-stone">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-wash">
        <section
          id="standards"
          aria-labelledby="standards-title"
          className={`${container} pt-20 sm:pt-28`}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10">
            <div>
              <h2 id="standards-title" className={sectionTitle}>
                The limits are part of the work.
              </h2>
              <p className="mt-4 max-w-[36ch] text-[17px] leading-[1.6] text-stone">
                These hold for every result we publish.
              </p>
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {standards.map((item) => (
                <li key={item.lead} className="py-5">
                  <strong className="block text-[16.5px] font-semibold tracking-[-0.01em] text-ink">
                    {item.lead}
                  </strong>
                  <span className="mt-1 block text-[15.5px] leading-[1.6] text-stone">
                    {item.copy}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="claim-title" className={`${container} pb-20 pt-20 sm:pb-28 sm:pt-28`}>
          <h2 id="claim-title" className={sectionTitle}>
            How a result becomes a claim.
          </h2>
          <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {evidenceSteps.map((item, index) => (
              <li key={item.title} className="rounded-[18px] bg-paper p-6 ring-1 ring-line sm:p-7">
                <StepNumber n={index + 1} />
                <h3 className="mt-5 text-[19px] font-semibold leading-[1.25] tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15.5px] leading-[1.6] text-stone">{item.copy}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section id="collaborate" aria-labelledby="collaborate-title" className="bg-ink text-white">
        <div
          className={`${container} flex flex-col gap-8 py-20 sm:py-24 md:flex-row md:items-end md:justify-between`}
        >
          <div>
            <h2
              id="collaborate-title"
              className="max-w-[18ch] text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
            >
              Come argue with the evidence.
            </h2>
            <p className="mt-4 max-w-[56ch] text-[17px] leading-[1.6] text-white/65">
              We work with people across machine learning, neuroscience, neuroimaging, EEG, and
              measurement methodology on study design, model evaluation, data partnerships, and
              tooling. The shared standard is careful validation and claims that survive a
              hostile read.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <ButtonLink href={collaborateHref} variant="inverted" size="lg">
              Start a conversation
            </ButtonLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
