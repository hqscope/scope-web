import Link from "next/link";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import RelatedLinks from "@/components/public/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import { publicPageMetadata } from "@/lib/seo";
import {
  CHROME_WEB_STORE_URL,
  LECTRA_APP_STORE_URL,
  LECTRA_DEFINITION,
  LECTRA_PRODUCT_NAME,
  SCOPE_DEFINITION,
  SCOPE_PRODUCT_NAME,
  SUPPORT_EMAIL,
} from "@/lib/site";
import {
  LECTRA_APP_VERSION,
  SCOPE_EXTENSION_VERSION,
  STORE_FACTS_VERIFIED_ON,
} from "@/lib/siteRelease";
import { breadcrumbSchema } from "@/lib/structured-data";
import { LIVE_USERS, VERIFIED_ON, formatUsers } from "@/lib/usage";

const SITE_URL = "https://www.canvascope.org";

export const metadata = publicPageMetadata({
  title: "Press Kit",
  description:
    "Facts, definitions, boilerplates, screenshots, and logos for writing about Scope for Canvas and Lectra Notes.",
  path: "/press",
});

/** "2026-08-27" → "August 27, 2026", the form every date on the site uses. */
function longDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

type Boilerplate = { words: number; text: string };

const scopeBoilerplates: Boilerplate[] = [
  {
    words: 25,
    text: "Scope for Canvas is a free Chrome extension that searches Canvas and Brightspace courses on the device and answers questions with citations to course materials.",
  },
  {
    words: 60,
    text: "Scope for Canvas is a free Chrome extension for students whose courses run on Canvas or Brightspace. It indexes assignments, files, pages, modules, and announcements on the student's computer, so previously indexed materials stay searchable when the learning-management system is down. Questions are answered from the materials instructors posted, with every answer linked to its source. There is no subscription.",
  },
  {
    words: 150,
    text: "Scope for Canvas is a free Chrome extension from Scope (formerly Canvascope) for students whose courses run on Canvas or Brightspace. It builds a searchable index of assignments, files, pages, modules, announcements, and PDFs — including scanned ones — on the student's computer, so a course can be searched in one place and previously indexed materials stay available when the learning-management system is down. Questions are answered from what instructors posted, with every answer linked to its source page or document. AI answers try Chrome's on-device model first; when it is unavailable, an optional, clearly marked cloud fallback is used. The extension can draft a study plan from upcoming deadlines and send a PDF to Lectra Notes on an iPad in one tap. It does not take quizzes, write submissions, or interact with Canvas quiz logs. Scope for Canvas is free with no subscription, and was built by a UC Berkeley student.",
  },
];

const lectraBoilerplates: Boilerplate[] = [
  {
    words: 25,
    text: "Lectra Notes is a free iPad and iPhone app for handwritten notes and Apple Pencil PDF markup, with offline Python notebooks, a terminal, and Git.",
  },
  {
    words: 60,
    text: "Lectra Notes is a free iPad and iPhone app from Scope for students who take notes by hand and write code. It handles handwritten notebooks and Apple Pencil markup on PDFs, and adds a computing environment: Python notebooks, a code editor, a terminal, and Git, all running on the device without a network connection. No subscription, no tiers, no ads.",
  },
  {
    words: 150,
    text: "Lectra Notes is a free iPad and iPhone app from Scope (formerly Canvascope) for students who take notes by hand and write code. It covers the expected ground — handwritten notebooks on lined, grid, dotted, and Cornell paper, Apple Pencil markup on PDFs, a document scanner, folders, tags, and search that reads handwriting — and adds a computing environment that note-taking apps rarely have: Jupyter-compatible Python notebooks, a code editor, a terminal with Git, and remote development over SSH, running on the device and working offline. Exports keep the PDF's selectable text, and a hybrid export opens in any PDF reader and re-imports with editable ink. On supported devices, on-device study tools produce summaries, flashcards, and quizzes from a document. A free companion app, Lectra for Mac, lets the iPad see and control a Mac. Lectra Notes has no subscription, tiers, ads, or tracking, and was built by a UC Berkeley student.",
  },
];

type BrandAsset = { path: string; description: string };

const brandAssets: BrandAsset[] = [
  {
    path: "/brand/scope-icon-512.png",
    description:
      "Scope app icon, 512 × 512 PNG with transparency. The icon used on the Chrome Web Store and the sign-in screen.",
  },
  {
    path: "/brand/scope-mark-plaster-2048.png",
    description:
      "Scope mark on its plaster background, 2048 × 2048 PNG. Use this where a square logo with a solid ground is needed.",
  },
  {
    path: "/brand/scope-mark.svg",
    description:
      "Scope mark, vector, for light backgrounds. Three rounded bars, the top one red.",
  },
  {
    path: "/brand/scope-mark-dark.svg",
    description:
      "Scope mark, vector, for dark backgrounds. Same shape with light bars.",
  },
  {
    path: "/brand/canvascope-extension-screenshot.png",
    description:
      "Scope for Canvas search window open over a Canvas dashboard, 1919 × 915 PNG. Recorded under the previous name; the footer of the window reads Canvascope.",
  },
  {
    path: "/brand/lectra-library-ipad.png",
    description:
      "Lectra Notes document library on iPad, landscape, 2064 × 1548 PNG. Sidebar with Documents, Scope Inbox, Studio, Projects, and Remote Desktop.",
  },
  {
    path: "/brand/lectra-markup-ipad.png",
    description:
      "Lectra Notes marking up an organic chemistry review PDF on iPad, portrait, 2064 × 2752 PNG. Highlighter, pen, and the Scope button visible.",
  },
  {
    path: "/brand/lectra-canvascope-lockup.png",
    description:
      "The Lectra Notes and Canvascope wordmarks side by side, 1024 × 1024 PNG. Carries the previous company name; use only when the older branding is the subject.",
  },
  {
    path: "/brand/lectra-mark.png",
    description:
      "Lectra Notes app mark on a dark ground, 1024 × 1024 PNG. A page with a red pen.",
  },
];

type NamingRule = { name: string; rule: string };

const namingRules: NamingRule[] = [
  {
    name: "Scope for Canvas",
    rule: "The Chrome extension. Use the full name on first mention; “Scope” or “the Scope extension” after that. It works with Canvas and Brightspace even though only Canvas is in the name.",
  },
  {
    name: "Lectra Notes",
    rule: "The iPad and iPhone app. Always “Lectra Notes”, never “Lectra” on its own — the bare word is shared with unrelated apps and with Lectra SA, the French fashion-technology software company, which has no connection to us.",
  },
  {
    name: "Lectra for Mac",
    rule: "The free Mac app that pairs with Lectra Notes. It replaced an earlier companion app called Lectra Receiver; the old name still resolves but should not appear in new writing.",
  },
  {
    name: "Scope (formerly Canvascope)",
    rule: "The company, on first mention where the old name matters — for example when linking to coverage from before July 2026. Otherwise just “Scope”. The legal name is Scope Inc.",
  },
  {
    name: "Polya",
    rule: "The web tutor. One word, capital P, no article.",
  },
  {
    name: "Canvas, Brightspace",
    rule: "Canvas belongs to Instructure and Brightspace to D2L. Scope is not affiliated with or endorsed by either. No app syncs with Canvas automatically.",
  },
];

const cellClass =
  "px-4 py-3.5 leading-relaxed text-[var(--color-ink-soft)]";
const rowHeadClass =
  "px-4 py-3.5 font-medium text-[var(--color-ink-soft)] whitespace-nowrap align-top";

export default function PressPage() {
  const peopleCount = formatUsers(LIVE_USERS);
  const countedOn = longDate(VERIFIED_ON);
  const storeFactsOn = longDate(STORE_FACTS_VERIFIED_ON);

  return (
    <PublicPageFrame active={null} footerVariant="slim">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Press kit", path: "/press" },
        ])}
      />

      <section className="page-wrap centered-hero" id="hero">
        <div data-reveal>
          <p className="kicker">Press</p>
          <h1>Press kit</h1>
          <p className="centered-hero-lede">
            Everything here may be reused to write about {SCOPE_PRODUCT_NAME}{" "}
            and {LECTRA_PRODUCT_NAME}; a link back is appreciated but not
            required. Facts are dated so you can tell how fresh they are, and
            corrections go to{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="facts">
        <div className="section-heading" data-reveal>
          <p className="kicker">Fact sheet</p>
          <h2>The short version.</h2>
        </div>
        <div data-reveal>
          <div className="overflow-x-auto rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)]">
            <table className="w-full min-w-[640px] border-collapse text-left text-[0.92rem]">
              <caption className="sr-only">
                Scope fact sheet, checked {storeFactsOn}
              </caption>
              <thead>
                <tr className="border-b border-[var(--color-line)]">
                  <th
                    scope="col"
                    className="px-4 py-3.5 font-semibold text-[var(--color-ink-faint)]"
                  >
                    Item
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 font-semibold text-[var(--color-ink)]"
                  >
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--color-line-soft)] align-top">
                  <th scope="row" className={rowHeadClass}>
                    Company
                  </th>
                  <td className={cellClass}>
                    Scope Inc., formerly Canvascope. Renamed July 2026 &mdash;{" "}
                    <Link href="/newsroom/canvascope-is-now-scope">
                      read the announcement
                    </Link>
                    .
                  </td>
                </tr>
                <tr className="border-b border-[var(--color-line-soft)] align-top">
                  <th scope="row" className={rowHeadClass}>
                    Founder
                  </th>
                  <td className={cellClass}>Noel Sason, UC Berkeley.</td>
                </tr>
                <tr className="border-b border-[var(--color-line-soft)] align-top">
                  <th scope="row" className={rowHeadClass}>
                    Products
                  </th>
                  <td className={cellClass}>
                    <ul className="list-disc space-y-1 pl-5">
                      <li>
                        <Link href="/products/extension">
                          {SCOPE_PRODUCT_NAME}
                        </Link>{" "}
                        &mdash; free Chrome extension, version{" "}
                        {SCOPE_EXTENSION_VERSION}.
                      </li>
                      <li>
                        <Link href="/products/lectra">
                          {LECTRA_PRODUCT_NAME}
                        </Link>{" "}
                        &mdash; free iPad and iPhone app, version{" "}
                        {LECTRA_APP_VERSION}.
                      </li>
                      <li>
                        <Link href="/mac">Lectra for Mac</Link> &mdash; free
                        Mac app.
                      </li>
                      <li>
                        <Link href="/products/polya">Polya</Link> &mdash; web.
                      </li>
                    </ul>
                    <p className="mt-2 text-[0.85rem] text-[var(--color-ink-faint)]">
                      Versions as listed on the Chrome Web Store and the App
                      Store on {storeFactsOn}.
                    </p>
                  </td>
                </tr>
                <tr className="border-b border-[var(--color-line-soft)] align-top">
                  <th scope="row" className={rowHeadClass}>
                    People using it
                  </th>
                  <td className={cellClass}>
                    {peopleCount} across Scope and {LECTRA_PRODUCT_NAME},
                    counted by hand on {countedOn}.{" "}
                    <Link href="/newsroom/how-we-count-people-using-scope">
                      How we count
                    </Link>
                    .
                  </td>
                </tr>
                <tr className="border-b border-[var(--color-line-soft)] align-top">
                  <th scope="row" className={rowHeadClass}>
                    Store listings
                  </th>
                  <td className={cellClass}>
                    {/* verify: Chrome Web Store user and rating counts, App Store rating, as shown on 2026-09-01 */}
                    <StoreLink store="chrome-web-store" href={CHROME_WEB_STORE_URL}>
                      Chrome Web Store
                    </StoreLink>{" "}
                    showed 94 users and 5.0 from 6 ratings; the{" "}
                    <StoreLink store="app-store" href={LECTRA_APP_STORE_URL}>
                      App Store
                    </StoreLink>{" "}
                    showed 5.0 from 7 ratings. Both as of {storeFactsOn}.
                  </td>
                </tr>
                <tr className="border-b border-[var(--color-line-soft)] align-top">
                  <th scope="row" className={rowHeadClass}>
                    Works with
                  </th>
                  <td className={cellClass}>
                    Canvas and Brightspace. No app syncs with Canvas
                    automatically.
                  </td>
                </tr>
                <tr className="border-b border-[var(--color-line-soft)] align-top">
                  <th scope="row" className={rowHeadClass}>
                    Pricing
                  </th>
                  <td className={cellClass}>Free. No subscription.</td>
                </tr>
                <tr className="border-b border-[var(--color-line-soft)] align-top">
                  <th scope="row" className={rowHeadClass}>
                    Privacy
                  </th>
                  <td className={cellClass}>
                    Search and indexing run entirely on your device. Optional
                    cloud features are clearly marked.{" "}
                    <Link href="/privacy">Privacy policy</Link>.
                  </td>
                </tr>
                <tr className="border-b border-[var(--color-line-soft)] align-top">
                  <th scope="row" className={rowHeadClass}>
                    Contact
                  </th>
                  <td className={cellClass}>
                    <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
                  </td>
                </tr>
                <tr className="align-top">
                  <th scope="row" className={rowHeadClass}>
                    Site
                  </th>
                  <td className={cellClass}>
                    <a href={SITE_URL}>{SITE_URL}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="definitions">
        <div className="section-heading" data-reveal>
          <p className="kicker">Definitions</p>
          <h2>What each product is, in one sentence.</h2>
        </div>
        <div className="plain-grid" data-reveal>
          <div>
            <p className="kicker kicker-muted">Use this sentence verbatim</p>
            <h3>{SCOPE_PRODUCT_NAME}</h3>
            <p>{SCOPE_DEFINITION}</p>
          </div>
          <div>
            <p className="kicker kicker-muted">Use this sentence verbatim</p>
            <h3>{LECTRA_PRODUCT_NAME}</h3>
            <p>{LECTRA_DEFINITION}</p>
          </div>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="boilerplates">
        <div className="section-heading" data-reveal>
          <p className="kicker">Boilerplates</p>
          <h2>Ready-made paragraphs at three lengths.</h2>
        </div>
        <div data-reveal>
          <p className="section-copy">
            Written to be quoted as-is. Every claim in them is true of the
            versions listed above on {storeFactsOn}; if a later release
            changes something, the fact sheet is updated first.
          </p>
        </div>

        <div className="mt-10" data-reveal>
          <p className="kicker kicker-muted">{SCOPE_PRODUCT_NAME}</p>
          <div className="plain-grid mt-4">
            {scopeBoilerplates.map((item) => (
              <div key={`scope-${item.words}`}>
                <h3>{item.words} words</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10" data-reveal>
          <p className="kicker kicker-muted">{LECTRA_PRODUCT_NAME}</p>
          <div className="plain-grid mt-4">
            {lectraBoilerplates.map((item) => (
              <div key={`lectra-${item.words}`}>
                <h3>{item.words} words</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="assets">
        <div className="section-heading" data-reveal>
          <p className="kicker">Logos and screenshots</p>
          <h2>Files you can use.</h2>
        </div>
        <div data-reveal>
          <ul className="check-list">
            {brandAssets.map((asset) => (
              <li key={asset.path}>
                <strong>
                  <a href={asset.path}>{asset.path}</a>
                </strong>
                <span>{asset.description}</span>
              </li>
            ))}
          </ul>
          <p className="section-copy mt-6">
            Higher-resolution versions, the marks on other backgrounds, and
            screenshots of a specific feature are available on request at{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Please
            do not stretch, recolor, or add effects to the marks.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="naming">
        <div className="section-heading" data-reveal>
          <p className="kicker">Naming</p>
          <h2>How to write the names.</h2>
        </div>
        <div data-reveal>
          <ul className="check-list">
            {namingRules.map((entry) => (
              <li key={entry.name}>
                <strong>{entry.name}</strong>
                <span>{entry.rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="coverage">
        <div className="section-heading" data-reveal>
          <p className="kicker">Coverage guidelines</p>
          <h2>What we do and don&apos;t do for coverage.</h2>
        </div>
        <div className="section-copy-block" data-reveal>
          <p className="section-copy">
            We do not pay for coverage, offer reciprocal links, or provide
            review copies in exchange for a particular verdict &mdash; both
            products are free, so there is nothing to give. Write what you
            find.
          </p>
          <p className="section-copy">
            If we got something wrong on this page, or you find a claim of
            ours that does not hold up, tell us at{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and we will
            correct it and date the correction. Our own{" "}
            <Link href="/compare">comparison pages</Link> name where other
            apps are better; you are welcome to hold us to the same standard.
          </p>
          <p className="section-copy">
            One boundary worth knowing before you write: Scope answers
            questions from the materials your instructors posted and links
            every answer to its source. It does not take quizzes, write
            submissions, or interact with Canvas quiz logs.
          </p>
        </div>
      </section>

      <RelatedLinks
        kicker="Background"
        title="Where the details live."
        links={[
          {
            href: "/products/extension",
            label: SCOPE_PRODUCT_NAME,
            copy: "The extension page: what it indexes, how answers are cited, and what it will not do.",
          },
          {
            href: "/products/lectra",
            label: LECTRA_PRODUCT_NAME,
            copy: "The app page: handwriting, PDF markup, notebooks, terminal, and Git on an iPad.",
          },
          {
            href: "/compare",
            label: "Comparisons",
            copy: "Dated, sourced comparisons with the apps students usually consider instead, including where those apps win.",
          },
          {
            href: "/newsroom",
            label: "Newsroom",
            copy: "Release notes, company announcements, and the posts that explain how our numbers are counted.",
          },
        ]}
      />

      <section className="page-wrap final-cta" id="contact" data-reveal>
        <div>
          <h2>Need something that isn&apos;t here?</h2>
          <p>
            Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> for
            interviews, additional screenshots, or a fact check on a draft. We
            answer from the same inbox students write to, so replies are quick
            but not instant.
          </p>
        </div>
      </section>
    </PublicPageFrame>
  );
}
