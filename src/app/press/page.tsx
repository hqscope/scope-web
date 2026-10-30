import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { ButtonLink } from "@/components/buttons";
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
  SITE_URL,
  SUPPORT_EMAIL,
} from "@/lib/site";
import {
  LECTRA_APP_VERSION,
  SCOPE_EXTENSION_VERSION,
  STORE_FACTS_VERIFIED_ON,
} from "@/lib/siteRelease";
import { breadcrumbSchema } from "@/lib/structured-data";
import { LIVE_USERS, VERIFIED_ON, formatUsers } from "@/lib/usage";

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
  /** Marks meant for dark grounds are shown on an ink tile. */
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
    rule: "The company, on first mention where the old name matters, for example when linking to coverage from before July 2026. Otherwise just “Scope”. Scope is not incorporated; it is run by Noel Jubil Sason.",
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

const container = "mx-auto max-w-[1200px] px-5 sm:px-8";
const sectionTitle =
  "text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-balance";
const sideNote = "max-w-[46ch] text-[15.5px] leading-[1.6] text-stone";

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

      <PageHead
        context="For journalists, bloggers, and anyone writing about Scope"
        title="Press kit"
        lede={
          <p>
            Everything here may be reused to write about {SCOPE_PRODUCT_NAME} and{" "}
            {LECTRA_PRODUCT_NAME}. A link back is appreciated but not required. Facts are
            dated so you can tell how fresh they are, and corrections go to{" "}
            <a href={mailto} className="link break-words">
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        }
      />

      <section id="facts" aria-labelledby="facts-title" className={`${container} pb-20 sm:pb-28`}>
        <div className="grid grid-cols-1 gap-8 border-t border-line pt-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10">
          <h2 id="facts-title" className={sectionTitle}>
            The short version.
          </h2>
          <dl
            className="divide-y divide-line border-y border-line"
            aria-label={`Scope fact sheet, checked ${storeFactsOn}`}
          >
            <FactRow term="Operator">
              Noel Jubil Sason, an individual developer. Scope is not incorporated. Formerly Canvascope, renamed July 2026.{" "}
              <Link href="/newsroom/canvascope-is-now-scope" className="link">
                Read the announcement
              </Link>
              .
            </FactRow>
            <FactRow term="Founder">Noel Jubil Sason, UC Berkeley.</FactRow>
            <FactRow term="Products">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-stone">
                <li>
                  <Link href="/products/extension" className="link">
                    {SCOPE_PRODUCT_NAME}
                  </Link>
                  , the free Chrome extension, version {SCOPE_EXTENSION_VERSION}.
                </li>
                <li>
                  <Link href="/products/lectra" className="link">
                    {LECTRA_PRODUCT_NAME}
                  </Link>
                  , the free iPad and iPhone app, version {LECTRA_APP_VERSION}.
                </li>
                <li>
                  <Link href="/mac" className="link">
                    Lectra for Mac
                  </Link>
                  , the free Mac app.
                </li>
                <li>
                  <Link href="/products/polya" className="link">
                    Polya
                  </Link>
                  , on the web.
                </li>
              </ul>
              <p className="mt-3 text-[14px] leading-[1.55] text-stone">
                Versions as listed on the Chrome Web Store and the App Store on{" "}
                {storeFactsOn}.
              </p>
            </FactRow>
            <FactRow term="People using it">
              {peopleCount} across Scope and {LECTRA_PRODUCT_NAME}, counted by hand on{" "}
              {countedOn}.{" "}
              <Link href="/newsroom/how-we-count-people-using-scope" className="link">
                How we count
              </Link>
              .
            </FactRow>
            <FactRow term="Store listings">
              {/* verify: Chrome Web Store user and rating counts, App Store rating, as shown on 2026-09-01 */}
              The{" "}
              <StoreLink store="chrome-web-store" href={CHROME_WEB_STORE_URL} className="link">
                Chrome Web Store
              </StoreLink>{" "}
              showed 94 users and 5.0 from 6 ratings, and the{" "}
              <StoreLink store="app-store" href={LECTRA_APP_STORE_URL} className="link">
                App Store
              </StoreLink>{" "}
              showed 5.0 from 7 ratings. Both as of {storeFactsOn}.
            </FactRow>
            <FactRow term="Works with">
              Canvas and Brightspace. No app syncs with Canvas automatically.
            </FactRow>
            <FactRow term="Pricing">Free. No subscription.</FactRow>
            <FactRow term="Privacy">
              Search and indexing run entirely on your device. Optional cloud features are
              clearly marked.{" "}
              <Link href="/privacy" className="link">
                Privacy policy
              </Link>
              .
            </FactRow>
            <FactRow term="Contact">
              <a href={mailto} className="link break-words">
                {SUPPORT_EMAIL}
              </a>
            </FactRow>
            <FactRow term="Site">
              <a href={SITE_URL} className="link break-words">
                {SITE_URL}
              </a>
            </FactRow>
          </dl>
        </div>
      </section>

      <div className="bg-wash">
        <section
          id="definitions"
          aria-labelledby="definitions-title"
          className={`${container} pt-20 sm:pt-28`}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <h2 id="definitions-title" className={`${sectionTitle} max-w-[22ch]`}>
              What each product is, in one sentence.
            </h2>
            <p className={sideNote}>Use these sentences word for word.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            <div className="rounded-[18px] bg-paper p-6 ring-1 ring-line sm:p-8">
              <h3 className="text-[18px] font-semibold tracking-[-0.015em]">
                {SCOPE_PRODUCT_NAME}
              </h3>
              <p className="mt-3 text-[16.5px] leading-[1.6] text-ink-soft">{SCOPE_DEFINITION}</p>
            </div>
            <div className="rounded-[18px] bg-paper p-6 ring-1 ring-line sm:p-8">
              <h3 className="text-[18px] font-semibold tracking-[-0.015em]">
                {LECTRA_PRODUCT_NAME}
              </h3>
              <p className="mt-3 text-[16.5px] leading-[1.6] text-ink-soft">
                {LECTRA_DEFINITION}
              </p>
            </div>
          </div>
        </section>

        <section
          id="boilerplates"
          aria-labelledby="boilerplates-title"
          className={`${container} pb-20 pt-20 sm:pb-28 sm:pt-28`}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
            <h2 id="boilerplates-title" className={`${sectionTitle} max-w-[22ch]`}>
              Ready-made paragraphs at three lengths.
            </h2>
            <p className={sideNote}>
              Written to be quoted as is. Every claim in them is true of the versions listed
              above on {storeFactsOn}. If a later release changes something, the fact sheet
              is updated first.
            </p>
          </div>

          <BoilerplateGroup
            id="boilerplates-scope"
            name={SCOPE_PRODUCT_NAME}
            items={scopeBoilerplates}
          />
          <BoilerplateGroup
            id="boilerplates-lectra"
            name={LECTRA_PRODUCT_NAME}
            items={lectraBoilerplates}
          />
        </section>
      </div>

      <section id="assets" aria-labelledby="assets-title" className={`${container} py-20 sm:py-28`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <h2 id="assets-title" className={sectionTitle}>
            Files you can use.
          </h2>
          <p className={sideNote}>
            Please do not stretch, recolor, or add effects to the marks. Higher resolutions,
            the marks on other backgrounds, and screenshots of a specific feature are
            available on request at{" "}
            <a href={mailto} className="link break-words">
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brandAssets.map((asset) => (
            <li
              key={asset.path}
              className="flex min-w-0 flex-col overflow-hidden rounded-[18px] ring-1 ring-line"
            >
              <div
                className={`flex aspect-[4/3] items-center justify-center p-6 ${
                  asset.dark ? "bg-ink" : "bg-wash"
                }`}
              >
                <Image
                  src={asset.path}
                  alt={asset.description}
                  width={asset.width}
                  height={asset.height}
                  sizes="(max-width: 640px) 90vw, (max-width: 1100px) 45vw, 400px"
                  unoptimized={asset.path.endsWith(".svg")}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 border-t border-line p-5">
                <a href={asset.path} className="link self-start break-words text-[14.5px]">
                  {asset.path}
                </a>
                <p className="text-[15px] leading-[1.6] text-stone">{asset.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="bg-wash">
        <section
          id="naming"
          aria-labelledby="naming-title"
          className={`${container} pt-20 sm:pt-28`}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10">
            <h2 id="naming-title" className={sectionTitle}>
              How to write the names.
            </h2>
            <ul className="divide-y divide-line border-y border-line">
              {namingRules.map((entry) => (
                <li
                  key={entry.name}
                  className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6"
                >
                  <strong className="text-[16px] font-semibold tracking-[-0.01em]">
                    {entry.name}
                  </strong>
                  <span className="text-[15.5px] leading-[1.6] text-stone">{entry.rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="coverage"
          aria-labelledby="coverage-title"
          className={`${container} pb-20 pt-20 sm:pb-28 sm:pt-28`}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10">
            <h2 id="coverage-title" className={sectionTitle}>
              What we do and don&rsquo;t do for coverage.
            </h2>
            <div className="max-w-[62ch] space-y-5 text-[17px] leading-[1.65] text-ink-soft">
              <p>
                We do not pay for coverage, offer reciprocal links, or provide review copies in
                exchange for a particular verdict. Both products are free, so there is nothing
                to give. Write what you find.
              </p>
              <p>
                If we got something wrong on this page, or you find a claim of ours that does
                not hold up, tell us at{" "}
                <a href={mailto} className="link break-words">
                  {SUPPORT_EMAIL}
                </a>{" "}
                and we will correct it and date the correction. Our own{" "}
                <Link href="/compare" className="link">
                  comparison pages
                </Link>{" "}
                name where other apps are better, and you are welcome to hold us to the same
                standard.
              </p>
              <p>
                One boundary worth knowing before you write: Scope answers questions from the
                materials your instructors posted and links every answer to its source. It
                does not take quizzes, write submissions, or interact with Canvas quiz logs.
              </p>
            </div>
          </div>
        </section>
      </div>

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

      <section id="contact" aria-labelledby="contact-title" className="bg-ink text-white">
        <div
          className={`${container} flex flex-col gap-8 py-20 sm:py-24 md:flex-row md:items-end md:justify-between`}
        >
          <div>
            <h2
              id="contact-title"
              className="max-w-[18ch] text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
            >
              Need something that isn&rsquo;t here?
            </h2>
            <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-white/65">
              Email {SUPPORT_EMAIL} for interviews, more screenshots, or a fact check on a
              draft. We answer from the same inbox students write to, so replies are quick but
              not instant.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <ButtonLink href={mailto} variant="inverted" size="lg">
              Email us
            </ButtonLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function FactRow({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
      <dt className="text-[15px] font-semibold">{term}</dt>
      <dd className="min-w-0 text-[15.5px] leading-[1.6] text-ink-soft">{children}</dd>
    </div>
  );
}

function BoilerplateGroup({
  id,
  name,
  items,
}: {
  id: string;
  name: string;
  items: Boilerplate[];
}) {
  return (
    <div className="mt-12">
      <h3 id={id} className="text-[20px] font-semibold tracking-[-0.02em]">
        {name}
      </h3>
      <div className="mt-5 grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-5">
        {items.map((item) => (
          <div key={`${id}-${item.words}`} className="rounded-[18px] bg-paper p-6 ring-1 ring-line">
            <h4 className="text-[14px] font-semibold text-stone">{item.words} words</h4>
            <p className="mt-2 text-[15.5px] leading-[1.65] text-ink-soft">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
