import PublicPageFrame from "@/components/public/PublicPageFrame";
import ComparisonTable from "@/components/public/ComparisonTable";
import MethodologyNote from "@/components/public/MethodologyNote";
import RelatedLinks from "@/components/public/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import {
  comparePath,
  comparisonsFor,
  getComparison,
  productEntityId,
} from "@/lib/compare";
import { getGuide, guidePath } from "@/lib/guides";
import { publicPageMetadata } from "@/lib/seo";
import { LECTRA_APP_STORE_CAMPAIGN_URL, LECTRA_DEFINITION } from "@/lib/site";
import {
  appListSchema,
  breadcrumbSchema,
  comparisonArticleSchema,
  competitorAppNode,
  faqSchema,
  type AppListItem,
  type FaqEntry,
} from "@/lib/structured-data";

const comparison = getComparison("free-goodnotes-alternatives");
const annotateGuide = getGuide("annotate-lecture-slides-on-ipad");

export const metadata = publicPageMetadata({
  title: comparison.title,
  absoluteTitle: comparison.absoluteTitle,
  description: comparison.description,
  path: comparePath(comparison),
  keywords: comparison.keywords,
  type: "article",
  publishedTime: comparison.datePublished,
  modifiedTime: comparison.dateModified,
});

/* The other Lectra Notes comparisons, plus the iPad annotation guide. */
const relatedLinks = [
  ...comparisonsFor("lectra")
    .filter((item) => item.slug !== comparison.slug)
    .map((item) => ({
      href: comparePath(item),
      label: item.title,
      copy: item.copy,
    })),
  {
    href: guidePath(annotateGuide),
    label: annotateGuide.title,
    copy: annotateGuide.copy,
  },
];

type Alternative = {
  name: string;
  /** Official site of a third-party app; our own app is referenced by entity id instead. */
  url?: string;
  free: string;
  strength: string;
  tradeoff: string;
};

const alternatives: Alternative[] = [
  {
    name: "Lectra Notes",
    free:
      "Everything — unlimited documents, Apple Pencil markup, scanner, on-device AI study tools, Python notebooks, terminal with Git, SSH, and the Mac app. No tiers, watermarks, ads, or third-party analytics.",
    strength:
      "The one on this list with a computing environment: Python notebooks that run on the device, a code editor, and a terminal beside your notes.",
    tradeoff:
      "No lecture audio recording, no cross-device annotation sync yet, and it's the newest app here (2026). iPad drawing is Apple Pencil-only.",
  },
  {
    name: "Apple Notes",
    url: "https://apps.apple.com/us/app/notes/id1110145109",
    free:
      "Everything — handwriting with Scribble, audio recording with automatic transcripts (iOS 18.1+), Math Notes, collaboration, iCloud sync.",
    strength:
      "Zero setup, deepest OS integration, and free audio transcripts — a feature most rivals charge for.",
    tradeoff:
      "PDF annotation is basic Markup on attachments, not a paged notebook workflow; no custom paper templates; Apple-only.",
  },
  {
    name: "Microsoft OneNote",
    url: "https://www.microsoft.com/microsoft-365/onenote",
    free:
      "All core note-taking — ink, scanning, voice capture, and sync across iPad, Windows, Android, Mac, and web (within the free 5GB OneDrive).",
    strength:
      "The widest platform coverage of any free option — the pick if you live on Windows or Android too.",
    tradeoff:
      "PDFs import as flat printouts, which makes annotating lecture slides clunky; Copilot AI needs Microsoft 365.",
  },
  {
    name: "CollaNote",
    url: "https://www.collanote.com",
    free:
      "Unlimited notebooks, 25+ pens, PDF/PowerPoint/doc markup, real-time collaboration, flashcards, scanner. One-time $13.90 lifetime premium for extras.",
    strength:
      "Free real-time collaboration and the closest free match to Goodnotes' notebook-plus-PDF workflow.",
    tradeoff:
      "Small indie team with reported reliability bugs; some formerly free features (including audio recording) moved behind premium in 2.0; requires iPadOS 18.6+.",
  },
  {
    name: "Flexcil",
    url: "https://www.flexcil.com",
    free:
      "Full pen-based PDF annotation plus its signature gesture: drag text or figures from a PDF into a side study note. One-time $9.99 upgrade rather than a subscription.",
    strength:
      "The PDF-to-study-note extraction gesture is unique for working through textbooks; also on Android.",
    tradeoff:
      "Free caps bite fast — 5 notes of up to 50 pages, 5 folders, watermarked exports — and lasso, text, and templates are paid.",
  },
  {
    name: "Kilonotes",
    // verify: official site — found via a Bing search on 2026-09-01
    // (kilonotes.com is a parked domain, not the app's site).
    url: "https://www.kilonotesapp.com/",
    free:
      "Core handwriting, unlimited notebooks, and PDF markup, with a large student-oriented template library behind a cheap membership.",
    strength:
      "Handwriting feel that reviewers consistently praise, with strong palm rejection.",
    tradeoff:
      "Ads in the free tier, cloud sync is a paid add-on, and reviewers report bugs and weak handwriting recognition and audio quality.",
  },
];

/* Third-party apps carry their official site; Lectra Notes points at its own entity node. */
const appList: AppListItem[] = alternatives.map((app) =>
  app.url
    ? { name: app.name, url: app.url }
    : { name: app.name, id: productEntityId.lectra },
);

const faqs: FaqEntry[] = [
  {
    question: "What is the best free alternative to Goodnotes?",
    answer:
      "It depends on the job. Lectra Notes is fully free with unlimited documents, Apple Pencil PDF markup, on-device AI study tools, and a Python/terminal workspace no other note app has. Apple Notes is the zero-setup default with free audio transcripts. OneNote is the free pick for Windows or Android sync. CollaNote is the closest free match to Goodnotes' notebook feel, and Flexcil's free tier is a capable PDF annotator with unique study gestures.",
  },
  {
    question: "How limited is Goodnotes' own free version?",
    answer:
      "As of August 2026, Goodnotes' free tier is capped at 3 files total, exports carry a watermark, audio recording is limited to about 20 minutes, and AI use is minimal. Full use requires Essential ($11.99/yr), Pro ($35.99/yr), or a $35.99 one-time Apple-only edition without cloud sync.",
  },
  {
    question: "Is Lectra Notes actually free, or freemium?",
    answer:
      "Actually free. There are no tiers, subscriptions, in-app purchases, file caps, watermarks, ads, or third-party analytics — the full app, including the notebooks, terminal, Git, SSH, on-device AI, and Lectra for Mac, is free.",
  },
  {
    question: "What do free apps give up compared to Goodnotes?",
    answer:
      "Goodnotes still leads on handwriting-to-text conversion, ink intelligence, its template marketplace, and years of cross-platform polish. Honest examples from this list: Lectra Notes lacks lecture audio and cross-device annotation sync; Apple Notes lacks a paged PDF workflow; OneNote flattens PDFs; Flexcil's free caps are tight.",
  },
];

export default function FreeAlternativesPage() {
  return (
    <PublicPageFrame active="compare" footerVariant="slim">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
            { name: comparison.title, path: comparePath(comparison) },
          ]),
          comparisonArticleSchema(
            comparison.title,
            comparePath(comparison),
            comparison.description,
            comparison.datePublished,
            comparison.dateModified,
            "#lectra-ipad",
          ),
          appListSchema(comparison.title, comparePath(comparison), appList),
          // Goodnotes is the page's subject, not one of the alternatives, so
          // it keeps its own node rather than a slot in the list.
          competitorAppNode("Goodnotes", "https://www.goodnotes.com"),
          faqSchema(faqs),
        ]}
      />

      <section className="page-wrap centered-hero" id="hero">
        <div data-reveal>
          <p className="kicker">Compare · Updated September 2026</p>
          <h1>Free Goodnotes alternatives for iPad (2026)</h1>
          <p className="centered-hero-lede">
            Goodnotes&apos; free tier stops at three files. These six apps
            don&apos;t — here is what each one includes without paying, and
            what it gives up.
          </p>
          <p className="hero-note">
            {LECTRA_DEFINITION} It is first on this list because it is ours;
            the five that follow are not.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="pricing">
        <div className="section-heading" data-reveal>
          <p className="kicker kicker-muted">The baseline</p>
          <h2>What does Goodnotes cost, and what is actually free?</h2>
          <p className="section-copy">
            Goodnotes&apos; free tier is capped at 3 files with watermarked
            exports; the paid plans are Essential at $11.99 a year and Pro at
            $35.99 a year. Lectra Notes has no file cap, no watermark, and no
            subscription.
          </p>
        </div>
        <div className="mt-8" data-reveal>
          <ComparisonTable
            caption="Goodnotes pricing against Lectra Notes, checked September 1, 2026"
            columns={["Goodnotes", "Lectra Notes"]}
            rows={[
              {
                label: "Free tier",
                cells: [
                  "Free tier capped at 3 files with watermarked exports.",
                  "No file cap, no watermark, no subscription.",
                ],
              },
              {
                label: "Paid plans",
                cells: [
                  "Essential $11.99/yr, Pro $35.99/yr.",
                  "None — there is nothing to buy.",
                ],
              },
            ]}
          />
          <p className="mt-4 text-[0.92rem] leading-relaxed text-[var(--color-ink-soft)]">
            Checked on September 1, 2026 against Goodnotes&apos; pricing page.
            The rest of this page was compiled on August 14, 2026 — see the
            note below.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="picks">
        <h2 className="sr-only">The free alternatives</h2>
        <div className="space-y-6" data-reveal>
          {alternatives.map((app, index) => (
            <article
              key={app.name}
              className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6"
            >
              <h3 className="text-xl font-semibold text-[var(--color-ink)]">
                {index + 1}. {app.name}
              </h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-[var(--color-ink-soft)]">
                <strong className="text-[var(--color-ink)]">
                  Free for real:
                </strong>{" "}
                {app.free}
              </p>
              <p className="mt-1.5 text-[0.92rem] leading-relaxed text-[var(--color-ink-soft)]">
                <strong className="text-[var(--color-ink)]">Standout:</strong>{" "}
                {app.strength}
              </p>
              <p className="mt-1.5 text-[0.92rem] leading-relaxed text-[var(--color-ink-soft)]">
                <strong className="text-[var(--color-ink)]">Trade-off:</strong>{" "}
                {app.tradeoff}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="methodology">
        <div data-reveal>
          <MethodologyNote
            dateChecked="August 14, 2026"
            extraConcessions={[
              "This list is published by the maker of Lectra Notes, which appears first. Every other entry's strengths are stated plainly, and Goodnotes itself remains the leader on handwriting intelligence and polish.",
            ]}
          />
        </div>
      </section>

      <section className="page-wrap faq-section" id="faq">
        <div className="section-heading" data-reveal>
          <p className="kicker">Questions</p>
          <h2>Free note apps, answered.</h2>
        </div>
        <div className="faq-list" data-reveal>
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <RelatedLinks title="More comparisons" links={relatedLinks} />

      <section className="page-wrap final-cta" id="download" data-reveal>
        <div>
          <h2>Free shouldn&apos;t mean a three-file cap.</h2>
          <p>
            <StoreLink store="app-store" href={LECTRA_APP_STORE_CAMPAIGN_URL}>
              Lectra Notes on the App Store
            </StoreLink>{" "}
            — unlimited documents, full markup, notebooks, and a terminal.
            Free, with nothing held back.
          </p>
        </div>
      </section>
    </PublicPageFrame>
  );
}
