import Image from "next/image";
import Link from "next/link";

import Sheet from "@/components/motion/Sheet";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import PageHead from "@/components/site/PageHead";
import PageShell from "@/components/site/PageShell";
import RelatedLinks from "@/components/site/RelatedLinks";
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

import "../_company/company.css";

const SITE_URL = "https://www.canvascope.org";

export const metadata = publicPageMetadata({
  title: "Press Kit",
  description:
    "Facts, definitions, boilerplates, screenshots, and logos for writing about Scope for Canvas and Lectra Notes.",
  path: "/press",
});

/** "2026-08-27" becomes "August 27, 2026", the form every date on the site uses. */
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
    text: "Scope for Canvas is a free Chrome extension from Scope (formerly Canvascope) for students whose courses run on Canvas or Brightspace. It builds a searchable index of assignments, files, pages, modules, announcements, and PDFs, including scanned ones, on the student's computer, so a course can be searched in one place and previously indexed materials stay available when the learning-management system is down. Questions are answered from what instructors posted, with every answer linked to its source page or document. AI answers try Chrome's on-device model first, and when it is unavailable, an optional, clearly marked cloud fallback is used. The extension can draft a study plan from upcoming deadlines and send a PDF to Lectra Notes on an iPad in one tap. It does not take quizzes, write submissions, or interact with Canvas quiz logs. Scope for Canvas is free with no subscription, and was built by a UC Berkeley student.",
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
    text: "Lectra Notes is a free iPad and iPhone app from Scope (formerly Canvascope) for students who take notes by hand and write code. It covers the expected ground, with handwritten notebooks on lined, grid, dotted, and Cornell paper, Apple Pencil markup on PDFs, a document scanner, folders, tags, and search that reads handwriting. It also adds a computing environment that note-taking apps rarely have: Jupyter-compatible Python notebooks, a code editor, a terminal with Git, and remote development over SSH, running on the device and working offline. Exports keep the PDF's selectable text, and a hybrid export opens in any PDF reader and re-imports with editable ink. On supported devices, on-device study tools produce summaries, flashcards, and quizzes from a document. A free companion app, Lectra for Mac, lets the iPad see and control a Mac. Lectra Notes has no subscription, tiers, ads, or tracking, and was built by a UC Berkeley student.",
  },
];

type BrandAsset = {
  path: string;
  description: string;
  width: number;
  height: number;
  /** Marks meant for dark grounds are shown on the desk. */
  dark?: boolean;
};

const brandAssets: BrandAsset[] = [
  {
    path: "/brand/scope-icon-512.png",
    width: 512,
    height: 512,
    description:
      "Scope app icon, 512 × 512 PNG with transparency. The icon used on the Chrome Web Store and the sign-in screen.",
  },
  {
    path: "/brand/scope-mark-plaster-2048.png",
    width: 2048,
    height: 2048,
    description:
      "Scope mark on its plaster background, 2048 × 2048 PNG. Use this where a square logo with a solid ground is needed.",
  },
  {
    path: "/brand/scope-mark.svg",
    width: 100,
    height: 100,
    description:
      "Scope mark, vector, for light backgrounds. Three rounded bars, the top one red.",
  },
  {
    path: "/brand/scope-mark-dark.svg",
    width: 100,
    height: 100,
    dark: true,
    description: "Scope mark, vector, for dark backgrounds. Same shape with light bars.",
  },
  {
    path: "/brand/canvascope-extension-screenshot.png",
    width: 1919,
    height: 915,
    description:
      "Scope for Canvas search window open over a Canvas dashboard, 1919 × 915 PNG. It was recorded under the previous name, so the footer of the window reads Canvascope.",
  },
  {
    path: "/brand/lectra-library-ipad.png",
    width: 2064,
    height: 1548,
    description:
      "Lectra Notes document library on iPad, landscape, 2064 × 1548 PNG. Sidebar with Documents, Scope Inbox, Studio, Projects, and Remote Desktop.",
  },
  {
    path: "/brand/lectra-markup-ipad.png",
    width: 2064,
    height: 2752,
    description:
      "Lectra Notes marking up an organic chemistry review PDF on iPad, portrait, 2064 × 2752 PNG. Highlighter, pen, and the Scope button visible.",
  },
  {
    path: "/brand/lectra-canvascope-lockup.png",
    width: 1024,
    height: 1024,
    description:
      "The Lectra Notes and Canvascope wordmarks side by side, 1024 × 1024 PNG. It carries the previous company name, so use it only when the older branding is the subject.",
  },
  {
    path: "/brand/lectra-mark.png",
    width: 1024,
    height: 1024,
    dark: true,
    description: "Lectra Notes app mark on a dark ground, 1024 × 1024 PNG. A page with a red pen.",
  },
];

type NamingRule = { name: string; rule: string };

const namingRules: NamingRule[] = [
  {
    name: "Scope for Canvas",
    rule: "The Chrome extension. Use the full name on first mention, and “Scope” or “the Scope extension” after that. It works with Canvas and Brightspace even though only Canvas is in the name.",
  },
  {
    name: "Lectra Notes",
    rule: "The iPad and iPhone app. Always write “Lectra Notes” and never “Lectra” on its own, because the bare word is shared with unrelated apps and with Lectra SA, the French fashion-technology software company, which has no connection to us.",
  },
  {
    name: "Lectra for Mac",
    rule: "The free Mac app that pairs with Lectra Notes. It replaced an earlier companion app called Lectra Receiver. The old name still resolves but should not appear in new writing.",
  },
  {
    name: "Scope (formerly Canvascope)",
    rule: "The company, on first mention where the old name matters, for example when linking to coverage from before July 2026. Otherwise just “Scope”. The legal name is Scope Inc.",
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

const mailto = `mailto:${SUPPORT_EMAIL}`;

export default function PressPage() {
  const peopleCount = formatUsers(LIVE_USERS);
  const countedOn = longDate(VERIFIED_ON);
  const storeFactsOn = longDate(STORE_FACTS_VERIFIED_ON);

  return (
    <PageShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Press kit", path: "/press" },
        ])}
      />

      <Sheet labelledBy="press-title">
        <PageHead
          context="For journalists, bloggers, and anyone writing about Scope"
          title={<span id="press-title">Press kit</span>}
          lede={
            <p className="co-inline">
              Everything here may be reused to write about {SCOPE_PRODUCT_NAME} and{" "}
              {LECTRA_PRODUCT_NAME}. A link back is appreciated but not required. Facts
              are dated so you can tell how fresh they are, and corrections go to{" "}
              <a href={mailto}>{SUPPORT_EMAIL}</a>.
            </p>
          }
        />

        <div className="shell" id="facts" style={{ paddingBottom: "var(--section)" }}>
          <h2 className="t-head" data-focus style={{ marginBottom: 28 }}>
            The short version.
          </h2>
          <dl className="co-facts plane" aria-label={`Scope fact sheet, checked ${storeFactsOn}`}>
            <div>
              <dt>Company</dt>
              <dd>
                Scope Inc., formerly Canvascope. Renamed July 2026.{" "}
                <Link href="/newsroom/canvascope-is-now-scope">Read the announcement</Link>.
              </dd>
            </div>
            <div>
              <dt>Founder</dt>
              <dd>Noel Sason, UC Berkeley.</dd>
            </div>
            <div>
              <dt>Products</dt>
              <dd>
                <ul>
                  <li>
                    <Link href="/products/extension">{SCOPE_PRODUCT_NAME}</Link>, the free
                    Chrome extension, version {SCOPE_EXTENSION_VERSION}.
                  </li>
                  <li>
                    <Link href="/products/lectra">{LECTRA_PRODUCT_NAME}</Link>, the free
                    iPad and iPhone app, version {LECTRA_APP_VERSION}.
                  </li>
                  <li>
                    <Link href="/mac">Lectra for Mac</Link>, the free Mac app.
                  </li>
                  <li>
                    <Link href="/products/polya">Polya</Link>, on the web.
                  </li>
                </ul>
                <p className="small">
                  Versions as listed on the Chrome Web Store and the App Store on{" "}
                  {storeFactsOn}.
                </p>
              </dd>
            </div>
            <div>
              <dt>People using it</dt>
              <dd>
                {peopleCount} across Scope and {LECTRA_PRODUCT_NAME}, counted by hand on{" "}
                {countedOn}.{" "}
                <Link href="/newsroom/how-we-count-people-using-scope">How we count</Link>.
              </dd>
            </div>
            <div>
              <dt>Store listings</dt>
              <dd>
                {/* verify: Chrome Web Store user and rating counts, App Store rating, as shown on 2026-09-01 */}
                The{" "}
                <StoreLink store="chrome-web-store" href={CHROME_WEB_STORE_URL}>
                  Chrome Web Store
                </StoreLink>{" "}
                showed 94 users and 5.0 from 6 ratings, and the{" "}
                <StoreLink store="app-store" href={LECTRA_APP_STORE_URL}>
                  App Store
                </StoreLink>{" "}
                showed 5.0 from 7 ratings. Both as of {storeFactsOn}.
              </dd>
            </div>
            <div>
              <dt>Works with</dt>
              <dd>Canvas and Brightspace. No app syncs with Canvas automatically.</dd>
            </div>
            <div>
              <dt>Pricing</dt>
              <dd>Free. No subscription.</dd>
            </div>
            <div>
              <dt>Privacy</dt>
              <dd>
                Search and indexing run entirely on your device. Optional cloud features
                are clearly marked. <Link href="/privacy">Privacy policy</Link>.
              </dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>
                <a href={mailto}>{SUPPORT_EMAIL}</a>
              </dd>
            </div>
            <div>
              <dt>Site</dt>
              <dd>
                <a href={SITE_URL}>{SITE_URL}</a>
              </dd>
            </div>
          </dl>
        </div>
      </Sheet>

      <Sheet className="section" id="definitions" labelledBy="definitions-title">
        <div className="shell">
          <div className="co-head-split">
            <h2 id="definitions-title" className="t-head" data-focus>
              What each product is, in one sentence.
            </h2>
            <p className="margin-note">Use these sentences word for word.</p>
          </div>
          <div className="split split--even split--top">
            <div className="co-definition plane">
              <h3>{SCOPE_PRODUCT_NAME}</h3>
              <p>{SCOPE_DEFINITION}</p>
            </div>
            <div className="co-definition plane">
              <h3>{LECTRA_PRODUCT_NAME}</h3>
              <p>{LECTRA_DEFINITION}</p>
            </div>
          </div>
        </div>

        <div className="shell co-block" id="boilerplates">
          <div className="co-head-split">
            <h2 className="t-head" data-focus>
              Ready-made paragraphs at three lengths.
            </h2>
            <p className="margin-note">
              Written to be quoted as is. Every claim in them is true of the versions
              listed above on {storeFactsOn}. If a later release changes something, the
              fact sheet is updated first.
            </p>
          </div>

          <div className="co-boiler-group">
            <h3>{SCOPE_PRODUCT_NAME}</h3>
            <div className="co-boilers">
              {scopeBoilerplates.map((item) => (
                <div key={`scope-${item.words}`} className="plane">
                  <h4>{item.words} words</h4>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="co-boiler-group">
            <h3>{LECTRA_PRODUCT_NAME}</h3>
            <div className="co-boilers">
              {lectraBoilerplates.map((item) => (
                <div key={`lectra-${item.words}`} className="plane">
                  <h4>{item.words} words</h4>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sheet>

      <Sheet className="section" id="assets" labelledBy="assets-title">
        <div className="shell">
          <div className="co-head-split">
            <h2 id="assets-title" className="t-head" data-focus>
              Files you can use.
            </h2>
            <p className="margin-note co-inline">
              Please do not stretch, recolor, or add effects to the marks. Higher
              resolutions, the marks on other backgrounds, and screenshots of a specific
              feature are available on request at <a href={mailto}>{SUPPORT_EMAIL}</a>.
            </p>
          </div>
          <ul className="co-assets">
            {brandAssets.map((asset) => (
              <li key={asset.path} className="co-asset plane">
                <div className="co-asset-thumb" data-dark={asset.dark || undefined}>
                  <Image
                    src={asset.path}
                    alt=""
                    width={asset.width}
                    height={asset.height}
                    sizes="(max-width: 640px) 90vw, (max-width: 1100px) 45vw, 400px"
                    unoptimized={asset.path.endsWith(".svg")}
                  />
                </div>
                <div className="co-asset-body">
                  <a href={asset.path} className="link" style={{ justifySelf: "start" }}>
                    {asset.path}
                  </a>
                  <p>{asset.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Sheet>

      <Sheet className="section" id="naming" labelledBy="naming-title">
        <div className="shell split split--top">
          <h2 id="naming-title" className="t-head" data-focus>
            How to write the names.
          </h2>
          <ul className="feature-list feature-list--wide" style={{ marginTop: 0 }}>
            {namingRules.map((entry) => (
              <li key={entry.name}>
                <strong>{entry.name}</strong>
                <span>{entry.rule}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="shell split split--top co-block" id="coverage">
          <h2 className="t-head" data-focus>
            What we do and don&rsquo;t do for coverage.
          </h2>
          <div className="co-inline">
            <p className="copy">
              We do not pay for coverage, offer reciprocal links, or provide review copies
              in exchange for a particular verdict. Both products are free, so there is
              nothing to give. Write what you find.
            </p>
            <p className="copy co-copy-gap">
              If we got something wrong on this page, or you find a claim of ours that
              does not hold up, tell us at <a href={mailto}>{SUPPORT_EMAIL}</a> and we
              will correct it and date the correction. Our own{" "}
              <Link href="/compare">comparison pages</Link> name where other apps are
              better, and you are welcome to hold us to the same standard.
            </p>
            <p className="copy co-copy-gap">
              One boundary worth knowing before you write: Scope answers questions from
              the materials your instructors posted and links every answer to its source.
              It does not take quizzes, write submissions, or interact with Canvas quiz
              logs.
            </p>
          </div>
        </div>
      </Sheet>

      <Sheet labelledBy="related-title">
        <RelatedLinks
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
      </Sheet>

      <section className="on-desk shell section co-closing" id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title" className="t-title" data-focus>
          Need something that isn&rsquo;t here?
        </h2>
        <p className="lede">
          Email {SUPPORT_EMAIL} for interviews, more screenshots, or a fact check on a
          draft. We answer from the same inbox students write to, so replies are quick
          but not instant.
        </p>
        <div className="actions">
          <a href={mailto} className="btn btn-primary">
            Email us
          </a>
        </div>
      </section>
    </PageShell>
  );
}
