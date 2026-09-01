import Link from "next/link";

import ComparisonTable from "@/components/public/ComparisonTable";
import MethodologyNote from "@/components/public/MethodologyNote";
import PublicPageFrame from "@/components/public/PublicPageFrame";
import RelatedLinks from "@/components/public/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
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

export default function AnnotateLectureSlidesGuidePage() {
  return (
    <PublicPageFrame active="guides" footerVariant="slim">
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

      <section className="page-wrap centered-hero" id="hero">
        <div data-reveal>
          <p className="kicker">Guide · Last verified {CHECKED_ON}</p>
          <h1>How to annotate Canvas lecture slides on iPad</h1>
          <p className="centered-hero-lede">
            Two problems sit between a lecture deck posted in Canvas and a
            marked-up copy on your iPad: getting the file across, and choosing
            the app you write in. This guide covers the share-sheet route that
            works with any note app, the detour when your instructor posted
            PowerPoint instead of PDF, the one-tap route if you run our
            extension, and a table of the four apps most students end up
            choosing between.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="route-a">
        <div data-reveal>
          <h2 className="section-heading">
            Route A: share it into your note app
          </h2>
          <p className="section-copy mt-4">
            This works with every app on this page and needs nothing installed
            beyond the note app itself. It is four steps, and it is the same
            four steps whether you start in Safari or in the Canvas Student
            app.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
            <li>
              Open the file in your course — Files, Modules, or wherever the
              instructor posted it. A PDF usually previews in place.
            </li>
            <li>
              Download it. In Safari the preview has a download control; in the
              Canvas Student app, open the file and use the share or export
              control. The file lands in Files, usually in Downloads or
              On&nbsp;My&nbsp;iPad.
            </li>
            <li>
              Tap Share and pick your note app from the row of app icons. If it
              is not there, scroll the row and use the option at the end to
              show more apps.
            </li>
            <li>
              The note app opens with the file. Most ask whether it should
              become a new document or be added to one you already have; pick
              one, then start writing with Apple Pencil.
              {/* verify: the exact import-sheet wording in Goodnotes and
                  Notability — their support docs blocked automated reads on
                  September 1, 2026, so no label is quoted here. */}
            </li>
          </ol>
          <p className="section-copy mt-4">
            Where it gets annoying: the download is a copy, so nothing you write
            on it ever goes back to Canvas, and nothing tells you when the
            instructor replaces the deck with a corrected version. Files arrive
            named whatever the instructor saved them as. Do this for four
            courses a week and you are managing a second, messier library
            alongside the one in Canvas. It still works, and for one deck it is
            the fastest thing you can do.
          </p>

          <h3 className="mt-8 text-lg font-semibold text-[var(--color-ink)]">
            If the file is a .pptx
          </h3>
          <p className="section-copy mt-3">
            Canvas serves whatever the instructor uploaded, and slides are often
            PowerPoint rather than PDF. Note apps are built around PDFs, so
            convert first:
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
            <li>
              Open the downloaded .pptx in Keynote, which is free on iPad and
              whose App Store listing says it imports and edits Microsoft
              PowerPoint presentations (checked {CHECKED_ON}).
            </li>
            <li>
              Tap the Actions button in the toolbar, tap Export, then choose PDF
              — the path Apple&apos;s Keynote for iPad guide documents (checked{" "}
              {CHECKED_ON}).
            </li>
            <li>Share the exported PDF into your note app as in Route A.</li>
          </ol>
          <p className="section-copy mt-4">
            Microsoft&apos;s own PowerPoint app can open the deck too, but its
            App Store listing ties editing and saving to a Microsoft 365
            subscription, so check that before you rely on it (checked{" "}
            {CHECKED_ON}).
            {/* verify: exactly which PowerPoint iPad actions require a
                Microsoft 365 subscription — read from the App Store listing,
                not from Microsoft's own support documentation. */}{" "}
            Either way, converting flattens animations and build slides: a deck
            that reveals one bullet at a time becomes a page with every bullet
            showing, which is usually what you want to write on anyway.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="route-b">
        <div data-reveal>
          <h2 className="section-heading">
            Route B: one tap from Scope for Canvas
          </h2>
          <p className="section-copy mt-4">{LECTRA_DEFINITION}</p>
          <p className="section-copy mt-3">
            {SCOPE_PRODUCT_NAME} is the free Chrome extension we make for the
            other half of this. Send a PDF from Canvas to your iPad in one tap
            with the Scope extension; finished files can come back into
            supported upload flows. You stay on the course page in your browser,
            pick the file, and it opens on the iPad ready to write on.
          </p>
          <p className="section-copy mt-3">
            Be clear about what that is and is not. It is a handoff you trigger,
            once, for a file you chose. No app syncs with Canvas automatically —
            not this one, not any of the others on this page. If your instructor
            posts a corrected deck tomorrow, you send it again.
          </p>
          <ul className="check-list mt-6">
            <li>
              <strong>What you get on the iPad</strong>
              <span>
                Apple Pencil markup on the slides — pressure-responsive pen,
                highlighter, eraser, shapes — plus blank pages when you want to
                work something out beside the deck.
              </span>
            </li>
            <li>
              <strong>What comes back out</strong>
              <span>
                An export that keeps the PDF&apos;s own selectable text and adds
                a searchable layer over your handwriting, so the marked-up copy
                is still findable later.
              </span>
            </li>
            <li>
              <strong>What it costs</strong>
              <span>
                Nothing. Lectra Notes {LECTRA_APP_VERSION} is free with no
                tiers, file caps, or watermarks (App Store, checked{" "}
                {CHECKED_ON}). The extension is free too.
              </span>
            </li>
          </ul>
          <p className="section-copy mt-6">
            If you would rather not install anything on your laptop, Route A
            works exactly as well here: Lectra Notes takes files from the share
            sheet like every other note app. See{" "}
            <Link href="/products/lectra">Lectra Notes</Link> for what the app
            does once the file is open, or{" "}
            <Link href="/products/extension">the extension</Link> for what it
            does inside Canvas.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="apps">
        <div data-reveal>
          <h2 className="section-heading">Which app to write in</h2>
          <p className="section-copy mt-4 mb-6">
            Four apps cover most of what students actually use for slide
            annotation. Prices and store facts below were read on {CHECKED_ON};
            one column is ours, and one row we could not verify at all, so it
            says so.
          </p>
          <ComparisonTable
            caption={`Apps for annotating Canvas lecture slides on iPad, checked ${CHECKED_ON}`}
            columns={["Goodnotes", "Notability", "Apple Notes", "Lectra Notes"]}
            rows={[
              {
                label: "Price",
                cells: [
                  "Free tier capped at 3 files with watermarked exports. Essential $11.99/yr, Pro $35.99/yr, AI Pass +$9.99/mo (goodnotes.com/pricing and App Store).",
                  "Free Starter plan capped at 5 notes. Lite $14.99/yr, Plus $19.99/yr, Pro $99.99/yr, Classic $49.99 once (App Store). notability.com/pricing showed Plus at $15.99/yr the same day.",
                  "Free, and already installed on the iPad.",
                  `Free — no tiers, file caps, watermarks, or ads. Version ${LECTRA_APP_VERSION}.`,
                ],
              },
              {
                label: "Getting a Canvas PDF in",
                cells: [
                  "Share sheet from Safari, Files, or the Canvas Student app. Its App Store listing also offers importing by emailing documents to a personal Goodnotes address.",
                  "Share sheet. Its App Store listing describes importing and handwriting on PDFs, documents, and presentations.",
                  "Share sheet into a note, or drag the file in. PDFs attach inside the note rather than opening as their own paged document.",
                  "Share sheet, or one tap from the Scope extension while you are on the course page.",
                ],
              },
              {
                label: "Apple Pencil tools",
                cells: [
                  "Polished, well-tuned ink, and it converts handwriting to typed text.",
                  "Pen, highlighter, and shapes, with handwriting search listed on paid plans.",
                  "Pencil drawing straight onto an inline PDF, Scribble, and handwriting search — capable, but not a paged annotation workflow.",
                  "Pressure-responsive pen, highlighter, eraser, shapes, and a ruler; ink stays sharp at any zoom. No handwriting-to-text conversion.",
                ],
              },
              {
                label: "Audio recording",
                cells: [
                  "Yes — recording synced to the moment you wrote. About 20 minutes on the free tier, unlimited on paid plans.",
                  "Yes — recording synced to your notes, with transcription listed on paid plans. The strongest pick here for lecture-heavy classes.",
                  /* verify: Apple Notes recording with automatic transcripts —
                     described on Apple's iPadOS feature pages, not re-read on
                     September 1, 2026. */
                  "Yes on recent iPadOS versions, with automatic transcripts.",
                  "No. If you record lectures, use Notability or Goodnotes — we do not do this today.",
                ],
              },
              {
                label: "Export keeps selectable text?",
                cells: [
                  /* verify: whether Goodnotes, Notability, and Apple Notes
                     exports preserve the source PDF's text layer — not tested
                     on September 1, 2026. */
                  "Not verified for this guide — export one deck and try selecting a line before you commit. Free-tier exports carry a watermark.",
                  "Not verified for this guide — export one deck and try selecting a line before you commit.",
                  "Not verified for this guide — export one note and try selecting a line before you commit.",
                  "Yes — exports keep the PDF's own text and add a searchable layer over your handwriting.",
                ],
              },
              {
                label: "Works offline",
                cells: [
                  "Writing works offline. Sync, collaboration, and its AI features are cloud services.",
                  "Writing works offline. Sync and its AI features are cloud services.",
                  "Yes; changes sync when you reconnect.",
                  "Yes — the whole app, including its study tools, runs on the iPad.",
                ],
              },
            ]}
          />
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="tips">
        <div data-reveal>
          <h2 className="section-heading">Tips</h2>
          <ul className="check-list mt-6">
            <li>
              <strong>Put Canvas and your notes side by side</strong>
              <span>
                Split View with the browser or the Canvas Student app on one
                side and the note app on the other saves the app-switching
                round trip while you are pulling several files from one module.
              </span>
            </li>
            <li>
              <strong>Give yourself room the slide does not have</strong>
              <span>
                Slide margins are thin. Add a blank, lined, or grid page after
                each dense slide — most note apps let you insert one mid-document
                — and work the derivation out there instead of squeezing it into
                a corner.
              </span>
            </li>
            <li>
              <strong>Keep the original untouched</strong>
              <span>
                Annotate the copy on your iPad, not the file you re-download
                before the exam. The version in Canvas stays the reference, and
                if the instructor replaces it you can compare rather than guess.
              </span>
            </li>
            <li>
              <strong>Rename on the way in</strong>
              <span>
                Downloads arrive with whatever filename the instructor used.
                Renaming to the course code and lecture number as you import is
                thirty seconds that makes the file findable in week eleven.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="questions">
        <div className="space-y-8" data-reveal>
          <div>
            <h2 className="section-heading">
              Can Goodnotes open files from Canvas?
            </h2>
            <p className="section-copy mt-3">
              Not on its own. Goodnotes has no connection to Canvas: you
              download the file from your course, then share it into Goodnotes,
              which imports PDFs and other documents (App Store listing, checked{" "}
              {CHECKED_ON}). That is true of every app on this page — the
              difference is only how many taps the download takes.
            </p>
          </div>
          <div>
            <h2 className="section-heading">
              Is there a note app that syncs with Canvas?
            </h2>
            <p className="section-copy mt-3">
              No app syncs with Canvas automatically. What exists is a handoff
              you trigger: send a PDF from Canvas to your iPad in one tap with
              the Scope extension; finished files can come back into supported
              upload flows. It does not watch your courses, and a deck the
              instructor updates tomorrow is a file you send again.
            </p>
          </div>
          <div>
            <h2 className="section-heading">
              Can I annotate PowerPoint slides on iPad?
            </h2>
            <p className="section-copy mt-3">
              Yes, once it is a PDF. Keynote is free on iPad, imports PowerPoint
              files, and exports PDF from the Actions button in the toolbar
              (checked {CHECKED_ON}); share that PDF into your note app. Some
              note apps advertise importing presentations directly, but
              converting first is the predictable route — and either way, builds
              and animations flatten into finished pages.
            </p>
          </div>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="last-verified">
        <div className="public-panel" data-reveal>
          <p className="kicker kicker-muted">Last verified</p>
          <p className="section-copy mt-3">
            Checked on {CHECKED_ON}. Prices and app facts on this page were read
            that day from goodnotes.com/pricing, notability.com/pricing, and the
            App Store listings for Goodnotes, Notability, Apple Notes, Keynote,
            Microsoft PowerPoint, and Lectra Notes. Stores change prices and
            tiers without notice, and the export row above says plainly that we
            did not test it.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="methodology">
        <div data-reveal>
          <MethodologyNote
            dateChecked={CHECKED_ON}
            extraConcessions={[
              "Handwriting-to-text: Goodnotes converts handwriting to typed text; Lectra Notes does not.",
            ]}
          />
        </div>
      </section>

      <RelatedLinks
        title="Next steps"
        links={[
          {
            href: "/products/lectra",
            label: "Lectra Notes",
            copy: "The free iPad app this guide ends in: Apple Pencil markup, notebooks, and a workspace that runs on the device.",
          },
          {
            href: "/compare/lectra-notes-vs-goodnotes",
            label: "Lectra Notes vs Goodnotes",
            copy: "The full comparison, including the handwriting and audio features where Goodnotes is still ahead.",
          },
          {
            href: "/compare/free-goodnotes-alternatives",
            label: "Free Goodnotes alternatives",
            copy: "What each genuinely free note app includes without paying, and what it gives up.",
          },
          {
            href: "/products/extension",
            label: "Scope for Canvas",
            copy: "The extension behind the one-tap route — search across your courses, and send a file to the iPad from the course page.",
          },
        ]}
      />

      <section className="page-wrap final-cta" id="download" data-reveal>
        <div>
          <h2>Get the deck onto the iPad.</h2>
          <p>
            <StoreLink store="app-store" href={LECTRA_APP_STORE_CAMPAIGN_URL}>
              Lectra Notes on the App Store — free
            </StoreLink>{" "}
            with no tiers or file caps. For the one-tap route from the course
            page, add{" "}
            <Link href="/products/extension">Scope for Canvas</Link> too. If you
            need lecture audio, Notability and Goodnotes still do that better,
            and we said so above.
          </p>
        </div>
      </section>
    </PublicPageFrame>
  );
}
