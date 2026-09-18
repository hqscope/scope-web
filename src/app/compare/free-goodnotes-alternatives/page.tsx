import ComparisonTable from "@/components/site/ComparisonTable";
import FaqList from "@/components/site/FaqList";
import MethodologyNote from "@/components/site/MethodologyNote";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import { comparePath, getComparison, productEntityId } from "@/lib/compare";
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

import CompareArticle, {
  lectraCta,
  lectraRelatedLinks,
  Pen,
  PickList,
} from "../CompareArticle";

const comparison = getComparison("free-goodnotes-alternatives");

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
      "Everything: unlimited documents, Apple Pencil markup, scanner, lecture recording (new in version 8.0, September 1, 2026), on-device AI study tools, Python notebooks, terminal with Git, SSH, and the Mac app. No tiers, watermarks, ads, or third-party analytics.",
    strength:
      "The one on this list with a computing environment, with Python notebooks that run on the device, a code editor, and a terminal beside your notes.",
    tradeoff:
      "Lecture recording is new (version 8.0, September 1, 2026) and untested over a full term. There is no cross-device annotation sync yet, and it's the newest app here (2026). iPad drawing is Apple Pencil-only.",
  },
  {
    name: "Apple Notes",
    url: "https://apps.apple.com/us/app/notes/id1110145109",
    free:
      "Everything: handwriting with Scribble, audio recording with automatic transcripts (iOS 18.1+), Math Notes, collaboration, and iCloud sync.",
    strength:
      "Zero setup, the deepest OS integration, and free audio transcripts, which most rivals charge for.",
    tradeoff:
      "PDF annotation is basic Markup on attachments, with no paged notebook workflow. There are no custom paper templates, and it is Apple-only.",
  },
  {
    name: "Microsoft OneNote",
    url: "https://www.microsoft.com/microsoft-365/onenote",
    free:
      "All core note-taking, with ink, scanning, voice capture, and sync across iPad, Windows, Android, Mac, and web (within the free 5GB OneDrive).",
    strength:
      "The widest platform coverage of any free option, and the pick if you live on Windows or Android too.",
    tradeoff:
      "PDFs import as flat printouts, which makes annotating lecture slides clunky, and Copilot AI needs Microsoft 365.",
  },
  {
    name: "CollaNote",
    url: "https://www.collanote.com",
    free:
      "Unlimited notebooks, 25+ pens, PDF, PowerPoint, and doc markup, real-time collaboration, flashcards, and a scanner. A one-time $13.90 lifetime premium adds extras.",
    strength:
      "Free real-time collaboration and the closest free match to Goodnotes' notebook-plus-PDF workflow.",
    tradeoff:
      "A small indie team with reported reliability bugs. Some formerly free features (including audio recording) moved behind premium in 2.0, and it requires iPadOS 18.6+.",
  },
  {
    name: "Flexcil",
    url: "https://www.flexcil.com",
    free:
      "Full pen-based PDF annotation plus its signature gesture, where you drag text or figures from a PDF into a side study note. The upgrade is a one-time $9.99 with no subscription.",
    strength:
      "The PDF-to-study-note extraction gesture is unique for working through textbooks, and it is also on Android.",
    tradeoff:
      "The free caps bite fast (5 notes of up to 50 pages, 5 folders, watermarked exports), and lasso, text, and templates are paid.",
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
      "It depends on the job. Lectra Notes is fully free with unlimited documents, Apple Pencil PDF markup, on-device AI study tools, and a Python and terminal workspace no other note app has. Apple Notes is the zero-setup default with free audio transcripts. OneNote is the free pick for Windows or Android sync. CollaNote is the closest free match to Goodnotes' notebook feel, and Flexcil's free tier is a capable PDF annotator with unique study gestures.",
  },
  {
    question: "How limited is Goodnotes' own free version?",
    answer:
      "As of August 2026, Goodnotes' free tier is capped at 3 files total, exports carry a watermark, audio recording is limited to about 20 minutes, and AI use is minimal. Full use requires Essential ($11.99/yr), Pro ($35.99/yr), or a $35.99 one-time Apple-only edition without cloud sync.",
  },
  {
    question: "Is Lectra Notes actually free, or freemium?",
    answer:
      "Actually free. There are no tiers, subscriptions, in-app purchases, file caps, watermarks, ads, or third-party analytics. The full app is free, including the notebooks, terminal, Git, SSH, on-device AI, and Lectra for Mac.",
  },
  {
    question: "What do free apps give up compared to Goodnotes?",
    answer:
      "Goodnotes still leads on handwriting-to-text conversion, ink intelligence, its template marketplace, and years of cross-platform polish. Honest examples from this list: Lectra Notes' lecture recording is brand new (version 8.0, September 1, 2026) and it lacks cross-device annotation sync, Apple Notes lacks a paged PDF workflow, OneNote flattens PDFs, and Flexcil's free caps are tight.",
  },
];

export default function FreeAlternativesPage() {
  return (
    <>
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

      <CompareArticle
        cta={lectraCta}
        context="Updated September 2026. Lectra Notes is ours."
        title="Free Goodnotes alternatives for iPad (2026)"
        lede={
          <>
            Goodnotes&apos; free tier stops at <Pen>three files</Pen>. These six
            apps don&apos;t. Here is what each one includes without paying, and
            what it gives up.
          </>
        }
        definition={
          <>
            {LECTRA_DEFINITION} It is first on this list because it is ours, and
            the five that follow are not.
          </>
        }
        actions={
          <>
            <StoreLink
              store="app-store"
              href={LECTRA_APP_STORE_CAMPAIGN_URL}
              className="btn btn-primary"
            >
              Get Lectra Notes for free
            </StoreLink>
            <a href="#picks" className="btn btn-line">
              See the six apps
            </a>
          </>
        }
        sections={[
          {
            id: "pricing",
            title: "What does Goodnotes cost, and what is actually free?",
            outline: "The baseline",
            content: (
              <>
                <div className="prose">
                  <p>
                    Goodnotes&apos; free tier is capped at 3 files with
                    watermarked exports. The paid plans are Essential at $11.99 a
                    year and Pro at $35.99 a year. Lectra Notes has no file cap, no
                    watermark, and no subscription.
                  </p>
                </div>
                <ComparisonTable
                  caption="Goodnotes pricing against Lectra Notes, checked September 1, 2026"
                  columns={["Goodnotes", "Lectra Notes"]}
                  ours={1}
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
                        "None. There is nothing to buy.",
                      ],
                    },
                  ]}
                />
                <p className="compare-aside">
                  Checked on September 1, 2026 against Goodnotes&apos; pricing
                  page. The rest of this page was compiled on August 14, 2026, with
                  the Lectra Notes facts updated on September 1, 2026 for version
                  8.0. The note below has the details.
                </p>
              </>
            ),
          },
          {
            id: "picks",
            title: "The six free alternatives.",
            outline: "The six apps",
            content: (
              <PickList
                picks={alternatives.map((app) => ({
                  name: app.name,
                  facts: [
                    { label: "Free for real", value: app.free },
                    { label: "Standout", value: app.strength },
                    { label: "Trade-off", value: app.tradeoff },
                  ],
                }))}
              />
            ),
          },
          {
            id: "methodology",
            outline: "How this was made",
            content: (
              <MethodologyNote
                dateChecked="August 14, 2026"
                extraConcessions={[
                  "This list is published by the maker of Lectra Notes, which appears first. Every other entry's strengths are stated plainly, and Goodnotes itself remains the leader on handwriting intelligence and polish.",
                ]}
              />
            ),
          },
          {
            id: "faq",
            title: "Free note apps, answered.",
            outline: "Questions",
            content: <FaqList items={faqs} />,
          },
        ]}
        related={{
          title: "More comparisons.",
          links: lectraRelatedLinks(comparison.slug),
        }}
        closing={{
          title: "Free shouldn't mean a three-file cap.",
          body: (
            <p>
              Lectra Notes has unlimited documents, full markup, notebooks, and a
              terminal. It is free, with nothing held back.
            </p>
          ),
          actions: (
            <StoreLink
              store="app-store"
              href={LECTRA_APP_STORE_CAMPAIGN_URL}
              className="btn btn-primary"
            >
              Lectra Notes on the App Store
            </StoreLink>
          ),
        }}
      />
    </>
  );
}
