import Link from "next/link";

import PenMark from "@/components/motion/PenMark";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import ComparisonTable from "@/components/site/ComparisonTable";
import DeviceFrame from "@/components/site/DeviceFrame";
import MethodologyNote from "@/components/site/MethodologyNote";
import PageShell from "@/components/site/PageShell";
import RelatedLinks from "@/components/site/RelatedLinks";
import { getGuide, guidePath } from "@/lib/guides";
import { publicPageMetadata } from "@/lib/seo";
import {
  LECTRA_APP_STORE_CAMPAIGN_URL,
  LECTRA_DEFINITION,
  SCOPE_PRODUCT_NAME,
} from "@/lib/site";
import { LECTRA_APP_VERSION } from "@/lib/siteRelease";
import {
  breadcrumbSchema,
  competitorAppNode,
  guideArticleSchema,
} from "@/lib/structured-data";

import GuideArticle, { GuideClosing, GuideSection } from "../_guide/GuideArticle";

const guide = getGuide("annotate-lecture-slides-on-ipad");
const path = guidePath(guide);

/**
 * Competitor facts on this page were read on September 1, 2026 from
 * goodnotes.com/pricing, notability.com/pricing, and the App Store listings
 * for Goodnotes, Notability, Apple Notes, Keynote, and PowerPoint. Anything
 * that could not be read that day is hedged in the copy and flagged with a
 * `verify:` comment beside it.
 */
const CHECKED_ON = "September 1, 2026";

export const metadata = publicPageMetadata({
  title: guide.title,
  absoluteTitle: guide.absoluteTitle,
  description: guide.description,
  path,
  type: "article",
  keywords: guide.keywords,
  publishedTime: guide.datePublished,
  modifiedTime: guide.dateModified,
});

const outline = [
  { id: "route-a", label: "Route A: the share sheet" },
  { id: "route-b", label: "Route B: one tap from Scope" },
  { id: "apps", label: "Which app to write in" },
  { id: "tips", label: "Tips" },
  { id: "questions", label: "Questions" },
  { id: "last-verified", label: "Last checked" },
];

const tips = [
  {
    title: "Put Canvas and your notes side by side",
    copy: "Split View with the browser or the Canvas Student app on one side and the note app on the other saves the app-switching round trip while you are pulling several files from one module.",
  },
  {
    title: "Give yourself room the slide does not have",
    copy: "Slide margins are thin. Add a blank, lined, or grid page after each dense slide (most note apps let you insert one mid-document) and work the derivation out there instead of squeezing it into a corner.",
  },
  {
    title: "Keep the original untouched",
    copy: "Annotate the copy on your iPad and leave the file you re-download before the exam alone. The version in Canvas stays the reference, and if the instructor replaces it you can compare instead of guessing.",
  },
  {
    title: "Rename on the way in",
    copy: "Downloads arrive with whatever filename the instructor used. Renaming to the course code and lecture number as you import takes thirty seconds and makes the file findable in week eleven.",
  },
];

export default function AnnotateLectureSlidesGuidePage() {
  return (
    <PageShell
      active="guides"
      cta={{
        label: "Get Lectra Notes",
        href: LECTRA_APP_STORE_CAMPAIGN_URL,
        store: "app-store",
      }}
    >
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            {
              name: "Annotate Canvas lecture slides on iPad",
              path,
            },
          ]),
          guideArticleSchema(
            guide.title,
            path,
            guide.description,
            guide.datePublished,
            guide.dateModified,
            "#lectra-ipad",
          ),
          competitorAppNode("Goodnotes", "https://www.goodnotes.com"),
          competitorAppNode("Notability", "https://notability.com"),
          // verify: apple.com/notes returns 404, so the entity points at the
          // App Store listing, which we read on September 1, 2026.
          competitorAppNode(
            "Apple Notes",
            "https://apps.apple.com/us/app/notes/id1110145109",
          ),
        ]}
      />

      <GuideArticle
        context={`A guide for iPad and Apple Pencil, last checked ${CHECKED_ON}`}
        title="How to annotate Canvas lecture slides on iPad"
        lede={
          <p>
            Two problems sit between a lecture deck posted in Canvas and a marked-up
            copy on your iPad:{" "}
            <span className="pen-phrase">
              getting the file across
              <PenMark kind="underline" inset="auto -4px -12px -4px" delay={0.6} className="pen-line" />
            </span>
            , and choosing the app you write in. This guide covers the share-sheet
            route that works with any note app, the detour for when your instructor
            posted PowerPoint instead of PDF, the one-tap route if you run our
            extension, and a table of the four apps most students end up choosing
            between.
          </p>
        }
        outline={outline}
        end={
          <RelatedLinks
            title="Next steps"
            links={[
              {
                href: "/products/lectra",
                label: "Lectra Notes",
                copy: "The free iPad app this guide ends in, with Apple Pencil markup, notebooks, and a workspace that runs on the device.",
              },
              {
                href: "/compare/lectra-notes-vs-goodnotes",
                label: "Lectra Notes vs Goodnotes",
                copy: "The full comparison, including handwriting-to-text, where Goodnotes is ahead, and lecture audio, where Goodnotes has years more polish.",
              },
              {
                href: "/compare/free-goodnotes-alternatives",
                label: "Free Goodnotes alternatives",
                copy: "What each genuinely free note app includes without paying, and what it gives up.",
              },
              {
                href: "/products/extension",
                label: "Scope for Canvas",
                copy: "The extension behind the one-tap route. It searches across your courses and sends a file to the iPad from the course page.",
              },
            ]}
          />
        }
      >
        <GuideSection id="route-a" title="Route A: share it into your note app">
          <div className="prose">
            <p>
              This works with every app on this page and needs nothing installed
              beyond the note app itself. It takes four steps, and they are the same
              four steps whether you start in Safari or in the Canvas Student app.
            </p>
            <ol>
              <li>
                Open the file in your course, from Files, Modules, or wherever the
                instructor posted it. A PDF usually previews in place.
              </li>
              <li>
                Download it. In Safari the preview has a download control, and in the
                Canvas Student app you open the file and use the share or export
                control. The file lands in Files, usually in Downloads or
                On&nbsp;My&nbsp;iPad.
              </li>
              <li>
                Tap Share and pick your note app from the row of app icons. If it is
                not there, scroll the row and use the option at the end to show more
                apps.
              </li>
              <li>
                The note app opens with the file. Most ask whether it should become a
                new document or be added to one you already have. Pick one, then start
                writing with Apple Pencil.
                {/* verify: the exact import-sheet wording in Goodnotes and
                    Notability — their support docs blocked automated reads on
                    September 1, 2026, so no label is quoted here. */}
              </li>
            </ol>
            <p>
              Where it gets annoying: the download is a copy, so nothing you write on
              it ever goes back to Canvas, and nothing tells you when the instructor
              replaces the deck with a corrected version. Files arrive named whatever
              the instructor saved them as. Do this for four courses a week and you
              are managing a second, messier library alongside the one in Canvas. It
              still works, and for one deck it is the fastest thing you can do.
            </p>

            <h3>If the file is a .pptx</h3>
            <p>
              Canvas serves whatever the instructor uploaded, and slides are often
              PowerPoint files instead of PDFs. Note apps are built around PDFs, so
              convert first.
            </p>
            <ol>
              <li>
                Open the downloaded .pptx in Keynote, which is free on iPad and whose
                App Store listing says it imports and edits Microsoft PowerPoint
                presentations (checked {CHECKED_ON}).
              </li>
              <li>
                Tap the Actions button in the toolbar, tap Export, then choose PDF.
                That is the path Apple&apos;s Keynote for iPad guide documents (checked{" "}
                {CHECKED_ON}).
              </li>
              <li>Share the exported PDF into your note app as in Route A.</li>
            </ol>
            <p>
              Microsoft&apos;s own PowerPoint app can open the deck too, but its App
              Store listing ties editing and saving to a Microsoft 365 subscription, so
              check that before you rely on it (checked {CHECKED_ON}).
              {/* verify: exactly which PowerPoint iPad actions require a
                  Microsoft 365 subscription — read from the App Store listing,
                  not from Microsoft's own support documentation. */}{" "}
              Either way, converting flattens animations and build slides. A deck that
              reveals one bullet at a time becomes a page with every bullet showing,
              which is usually what you want to write on anyway.
            </p>
          </div>
        </GuideSection>

        <GuideSection id="route-b" title="Route B: one tap from Scope for Canvas">
          <div className="prose">
            <p>{LECTRA_DEFINITION}</p>
            <p>
              {SCOPE_PRODUCT_NAME} is the free Chrome extension we make for the other
              half of this. Send a PDF from Canvas to your iPad in one tap with the
              Scope extension, and finished files can come back into supported upload
              flows. You stay on the course page in your browser, pick the file, and
              it opens on the iPad ready to write on.
            </p>
            <p>
              Here is exactly what that is. It is a handoff you trigger, once, for a
              file you chose. No app syncs with Canvas automatically, including this
              one and every other app on this page. If your instructor posts a
              corrected deck tomorrow, you send it again.
            </p>
          </div>
          <ul className="feature-list">
            <li>
              <strong>What you get on the iPad</strong>
              <span>
                Apple Pencil markup on the slides with a pressure-responsive pen,
                highlighter, eraser, and shapes, plus blank pages when you want to work
                something out beside the deck.
              </span>
            </li>
            <li>
              <strong>What comes back out</strong>
              <span>
                An export that keeps the PDF&apos;s own selectable text and adds a
                searchable layer over your handwriting, so the marked-up copy is still
                findable later.
              </span>
            </li>
            <li>
              <strong>What it costs</strong>
              <span>
                Nothing. Lectra Notes {LECTRA_APP_VERSION} is free with no tiers, file
                caps, or watermarks (App Store, checked {CHECKED_ON}). The extension is
                free too.
              </span>
            </li>
          </ul>
          <figure className="guide-figure">
            <DeviceFrame
              src="/brand/lectra-markup-ipad.png"
              alt="A midterm review for organic chemistry open in Lectra Notes, marked up with Apple Pencil highlights and circled notes."
              width={2064}
              height={2752}
              sizes="(max-width: 520px) 88vw, 400px"
            />
            <figcaption className="small">
              A review sheet marked up with Apple Pencil in Lectra Notes.
            </figcaption>
          </figure>
          <div className="prose">
            <p>
              If you would rather not install anything on your laptop, Route A works
              exactly as well here, because Lectra Notes takes files from the share
              sheet like every other note app. See{" "}
              <Link href="/products/lectra">Lectra Notes</Link> for what the app does
              once the file is open, or <Link href="/products/extension">the extension</Link>{" "}
              for what it does inside Canvas.
            </p>
          </div>
        </GuideSection>

        <GuideSection id="apps" title="Which app to write in">
          <div className="prose">
            <p>
              Four apps cover most of what students actually use for slide annotation.
              Prices and store facts below were read on {CHECKED_ON}. One column is
              ours, and there is one row we could not verify at all, so it says so.
            </p>
          </div>
          <ComparisonTable
            caption={`Apps for annotating Canvas lecture slides on iPad, checked ${CHECKED_ON}`}
            columns={["Goodnotes", "Notability", "Apple Notes", "Lectra Notes"]}
            ours={3}
            rows={[
              {
                label: "Price",
                cells: [
                  "Free tier capped at 3 files with watermarked exports. Essential $11.99/yr, Pro $35.99/yr, AI Pass +$9.99/mo (goodnotes.com/pricing and App Store).",
                  "Free Starter plan capped at 5 notes. Lite $14.99/yr, Plus $19.99/yr, Pro $99.99/yr, Classic $49.99 once (App Store). notability.com/pricing showed Plus at $15.99/yr the same day.",
                  "Free, and already installed on the iPad.",
                  `Free, with no tiers, file caps, watermarks, or ads. Version ${LECTRA_APP_VERSION}.`,
                ],
              },
              {
                label: "Getting a Canvas PDF in",
                cells: [
                  "Share sheet from Safari, Files, or the Canvas Student app. Its App Store listing also offers importing by emailing documents to a personal Goodnotes address.",
                  "Share sheet. Its App Store listing describes importing and handwriting on PDFs, documents, and presentations.",
                  "Share sheet into a note, or drag the file in. PDFs attach inside the note instead of opening as their own paged document.",
                  "Share sheet, or one tap from the Scope extension while you are on the course page.",
                ],
              },
              {
                label: "Apple Pencil tools",
                cells: [
                  "Polished, well-tuned ink, and it converts handwriting to typed text.",
                  "Pen, highlighter, and shapes, with handwriting search listed on paid plans.",
                  "Pencil drawing straight onto an inline PDF, Scribble, and handwriting search. It is capable, but it is not a paged annotation workflow.",
                  "Pressure-responsive pen, highlighter, eraser, shapes, and a ruler, and ink stays sharp at any zoom. No handwriting-to-text conversion.",
                ],
              },
              {
                label: "Audio recording",
                cells: [
                  "Yes, with recording synced to the moment you wrote. About 20 minutes on the free tier, unlimited on paid plans.",
                  "Yes, with recording synced to your notes and transcription listed on paid plans. It is the strongest pick here for lecture-heavy classes.",
                  /* verify: Apple Notes recording with automatic transcripts —
                     described on Apple's iPadOS feature pages, not re-read on
                     September 1, 2026. */
                  "Yes on recent iPadOS versions, with automatic transcripts.",
                  "Yes, added in version 8.0 on September 1, 2026. It records the lecture while you write, you can tap a stroke to hear what was said at that moment, and transcription runs on the device. It is new and has not been through a full term of use, and Notability and Goodnotes have years of polish here.",
                ],
              },
              {
                label: "Export keeps selectable text?",
                cells: [
                  /* verify: whether Goodnotes, Notability, and Apple Notes
                     exports preserve the source PDF's text layer — not tested
                     on September 1, 2026. */
                  "Not verified for this guide. Export one deck and try selecting a line before you commit. Free-tier exports carry a watermark.",
                  "Not verified for this guide. Export one deck and try selecting a line before you commit.",
                  "Not verified for this guide. Export one note and try selecting a line before you commit.",
                  "Yes. Exports keep the PDF's own text and add a searchable layer over your handwriting.",
                ],
              },
              {
                label: "Works offline",
                cells: [
                  "Writing works offline. Sync, collaboration, and its AI features are cloud services.",
                  "Writing works offline. Sync and its AI features are cloud services.",
                  "Yes, and changes sync when you reconnect.",
                  "Yes. The whole app, including its study tools, runs on the iPad.",
                ],
              },
            ]}
          />
        </GuideSection>

        <GuideSection id="tips" title="Tips">
          <ul className="feature-list">
            {tips.map((tip) => (
              <li key={tip.title}>
                <strong>{tip.title}</strong>
                <span>{tip.copy}</span>
              </li>
            ))}
          </ul>
        </GuideSection>

        <GuideSection id="questions" title="Questions people ask">
          <div className="prose">
            <h3>Can Goodnotes open files from Canvas?</h3>
            <p>
              Not on its own. Goodnotes has no connection to Canvas. You download the
              file from your course, then share it into Goodnotes, which imports PDFs
              and other documents (App Store listing, checked {CHECKED_ON}). That is
              true of every app on this page, and the only difference is how many taps
              the download takes.
            </p>

            <h3>Is there a note app that works with Canvas?</h3>
            <p>
              No app syncs with Canvas automatically. What exists is a handoff you
              trigger: send a PDF from Canvas to your iPad in one tap with the Scope
              extension, and finished files can come back into supported upload flows.
              It does not watch your courses, and a deck the instructor updates
              tomorrow is a file you send again.
            </p>

            <h3>Can I annotate PowerPoint slides on iPad?</h3>
            <p>
              Yes, once it is a PDF. Keynote is free on iPad, imports PowerPoint files,
              and exports PDF from the Actions button in the toolbar (checked{" "}
              {CHECKED_ON}), so share that PDF into your note app. Some note apps
              advertise importing presentations directly, but converting first is the
              predictable route, and either way, builds and animations flatten into
              finished pages.
            </p>
          </div>
        </GuideSection>

        <GuideSection id="last-verified" title="When this was last checked">
          <div className="prose">
            <p>
              Checked on {CHECKED_ON}. Prices and app facts on this page were read that
              day from goodnotes.com/pricing, notability.com/pricing, and the App Store
              listings for Goodnotes, Notability, Apple Notes, Keynote, Microsoft
              PowerPoint, and Lectra Notes. Stores change prices and tiers without
              notice, and the export row above says plainly that we did not test it.
            </p>
          </div>
          <MethodologyNote
            dateChecked={CHECKED_ON}
            extraConcessions={[
              "Handwriting-to-text: Goodnotes converts handwriting to typed text, and Lectra Notes does not.",
            ]}
          />
        </GuideSection>
      </GuideArticle>

      <GuideClosing
        title="Get the deck onto the iPad."
        actions={
          <>
            <StoreLink
              store="app-store"
              href={LECTRA_APP_STORE_CAMPAIGN_URL}
              className="btn btn-primary"
            >
              Get Lectra Notes for free
            </StoreLink>
            <Link href="/products/extension" className="btn btn-line">
              Add Scope for Canvas
            </Link>
          </>
        }
      >
        <p>
          Lectra Notes is free on the App Store with no tiers or file caps. For the
          one-tap route from the course page, add Scope for Canvas too. Lecture
          recording arrived in Lectra Notes version 8.0 on September 1, 2026. It is
          new, and Notability and Goodnotes have years more polish on audio, as the
          table above says.
        </p>
      </GuideClosing>
    </PageShell>
  );
}
