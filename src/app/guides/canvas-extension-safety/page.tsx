import Link from "next/link";

import PenMark from "@/components/motion/PenMark";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import ComparisonTable, { type ComparisonRow } from "@/components/site/ComparisonTable";
import MethodologyNote from "@/components/site/MethodologyNote";
import PageShell from "@/components/site/PageShell";
import RelatedLinks from "@/components/site/RelatedLinks";
import { getGuide, guidePath } from "@/lib/guides";
import { publicPageMetadata } from "@/lib/seo";
import {
  CHROME_WEB_STORE_URL,
  SCOPE_DEFINITION,
  SCOPE_PRODUCT_NAME,
} from "@/lib/site";
import { SCOPE_EXTENSION_VERSION } from "@/lib/siteRelease";
import { breadcrumbSchema, guideArticleSchema } from "@/lib/structured-data";
import { LIVE_USERS, VERIFIED_ON } from "@/lib/usage";

import GuideArticle, { GuideClosing, GuideSection } from "../_guide/GuideArticle";

const guide = getGuide("canvas-extension-safety");
const path = guidePath(guide);

/** The day every fact on this page was read from its source. */
const CHECKED_ON = "September 1, 2026";

/** VERIFIED_ON ("2026-08-27") in the long form this site writes dates in. */
const LIVE_USERS_CHECKED_ON = new Date(`${VERIFIED_ON}T00:00:00Z`).toLocaleDateString(
  "en-US",
  { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" },
);

const BREACH_SOURCE_URL = "https://en.wikipedia.org/wiki/2026_Canvas_data_breach";

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

/*
 * Scope for Canvas, permission by permission. Read on CHECKED_ON from the
 * extension's declared permissions (version SCOPE_EXTENSION_VERSION), its
 * Chrome Web Store listing, and the privacy policy. The policy is the
 * controlling statement. The "Permissions at a glance" table on /privacy
 * carries the same rows in the policy's own wording.
 */
const permissionRows: ComparisonRow[] = [
  {
    label: "Canvas and Brightspace pages",
    cells: [
      "Reads the course pages you open to build the search index, and adds the search bar and the Send to iPad button to them. Scope also runs on Gradescope, Kaltura lecture-video pages, and Berkeley’s course scheduler. It stays off login, logout, and single-sign-on pages.",
      "Needed for search.",
      "The index stays in browser-local storage on your device.",
    ],
  },
  {
    label: "All websites",
    cells: [
      /* verify: why the all-sites host permission (https, http, and local files) is declared, and Chrome's exact prompt wording */
      `Version ${SCOPE_EXTENSION_VERSION} declares access to every website and to local files, so Chrome’s install prompt warns that it can read and change your data on all sites. The page features above are declared only for the sites named there. We would rather you read that here than meet it in the prompt.`,
      /* verify: Chrome's per-extension site-access control (On click / On specific sites / On all sites) still lives under Details */
      "Granted at install. Chrome lets you narrow any extension’s site access afterwards, under the extension’s Details.",
      "Does not apply.",
    ],
  },
  {
    label: "Open tabs",
    cells: [
      /* verify: what Scope uses tab and navigation access for */
      "Lets the extension see the address and title of your open tabs and when pages finish loading. Chrome describes this as reading your browsing history, and the store listing discloses web history and user activity among the data it handles.",
      "Granted at install.",
      "The privacy policy, not this table, is the statement of what is kept.",
    ],
  },
  {
    label: "Browser-local storage",
    cells: [
      "Holds the search index and your settings.",
      "Needed.",
      "Your device.",
    ],
  },
  {
    label: "Google sign-in",
    cells: [
      "Your Google ID, email, name, and profile picture, used to create your account and keep synced records scoped to you: course snapshots, documents, Course Brain artifacts, and Student Profile facts.",
      "Optional. Only account-linked features ask for it.",
      "Scope’s servers, under your account.",
    ],
  },
  {
    label: "Google Calendar",
    cells: [
      "Writes selected course dates to your Google Calendar when you run the syllabus or planner sync. Scope keeps the access token so later writes work until you disconnect or it expires.",
      "Optional, and asked for only when you use that feature.",
      "Your Google Calendar. Scope holds the token.",
    ],
  },
  {
    label: "AI answers",
    cells: [
      "Answers come from the materials your instructors posted, each linked to its source. Scope tries Chrome’s on-device model first. When it is unavailable, or a whole-course question needs a larger model, the retrieved passages are sent through Scope’s servers to a cloud model from a named provider, disclosed in the privacy policy, only to produce that answer. They are not used to train models.",
      "The cloud fallback is optional and clearly marked.",
      "Your device first. The disclosed provider sees only what is sent for that answer.",
    ],
  },
  {
    label: "What it does not do",
    cells: [
      "Act on your behalf inside graded work, which the academic integrity section below spells out. Read your clipboard. Sell your data, use it for advertising, or hand it to data brokers.",
      "Does not apply.",
      "Does not apply.",
    ],
  },
];

const checklist = [
  {
    title: "The permissions match the stated purpose.",
    copy: "A search tool needs to run on your Canvas pages. It does not need your browsing history on every site. When the install prompt lists more than the job needs, ask why, and expect the publisher to have an answer.",
  },
  {
    title: "The privacy policy names every data type it collects.",
    copy: "A line like “we respect your privacy” is not enough. You want a list. If clipboard text, grades, or messages are collected, the policy should say so in those words, and say what happens to them.",
  },
  {
    title: "Where the index or data lives.",
    copy: "On your device, on the publisher’s servers, or both. “Local” should mean the search index stays in the browser, and if there is also an account sync, the policy should say exactly what syncs.",
  },
  {
    title: "Whether it sends anything to a server, and to whom.",
    copy: "Cloud AI, account sync, error reporting, and analytics all mean a server. The policy should name the kinds of provider that receive data, and the store listing’s privacy disclosure should agree with it.",
  },
  {
    title: "Who the publisher is, and whether the site is verified.",
    copy: "The Chrome Web Store shows a publisher’s website and email, and marks a listing that was created by the owner of the listed website. A listing with no company, no site, and a throwaway address is a listing you cannot hold to anything.",
  },
  {
    title: "The last-updated date.",
    copy: "An extension that has not shipped an update in a year is one nobody is watching, and you are about to give it your Canvas session.",
  },
  {
    title: "Recent reviews, not just the average.",
    copy: "Sort by newest. A 4.8 built years ago says nothing about the version you are installing, and complaints about new permissions or odd behavior show up in the newest reviews first.",
  },
  {
    title: "Open source or not.",
    copy: "Public code is no guarantee, but it lets someone check the claims. Closed code means you are trusting the policy alone.",
  },
  {
    title: "Whether it interacts with quizzes or grades on your behalf.",
    copy: "Reading a grades page is one thing. Submitting, answering, or hiding activity from Canvas is another. Anything that acts for you inside graded work is an academic-integrity problem before it is a privacy one.",
  },
];

const outline = [
  { id: "what-it-can-see", label: "What an extension can see" },
  { id: "checklist", label: "The checklist" },
  { id: "local-first", label: "The limits of local-first" },
  { id: "scope", label: "Scope against the checklist" },
  { id: "integrity", label: "Academic integrity" },
  { id: "questions", label: "Questions" },
  { id: "methodology", label: "How this was checked" },
];

export default function CanvasExtensionSafetyGuide() {
  return (
    <PageShell active="guides">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: guide.title, path },
          ]),
          guideArticleSchema(
            guide.title,
            path,
            guide.description,
            guide.datePublished,
            guide.dateModified,
            "#canvascope-extension",
          ),
        ]}
      />

      <GuideArticle
        context={`A guide for Canvas and Brightspace, last checked ${CHECKED_ON}`}
        title="Are Canvas extensions safe? What to check before you install one"
        lede={
          <p>
            On April 25, 2026, unauthorized actors got into Instructure&apos;s Canvas
            systems. Instructure disclosed the intrusion on May 1, and a second
            incident on May 7 came with a ransom message. It affected 8,809
            institutions, the group responsible claimed data on roughly 275 million
            users, and a proposed class action was filed in federal court in
            California on May 13, 2026. None of that involved a browser extension,
            but it is a good moment to ask{" "}
            <span className="pen-phrase">
              what an extension can see
              <PenMark kind="underline" inset="auto -4px -12px -4px" delay={0.6} className="pen-line" />
            </span>
            .
          </p>
        }
        outline={outline}
        end={
          <RelatedLinks
            title="Keep reading"
            links={[
              {
                href: "/privacy",
                label: "Privacy policy",
                copy: "The full statement of what Scope and Lectra Notes collect, in the policy's own words.",
              },
              {
                href: "/guides/how-to-search-canvas",
                label: "How to search Canvas",
                copy: "Every way to find a file, page, or old assignment across all your courses, with and without an extension.",
              },
              {
                href: "/compare/best-canvas-chrome-extensions",
                label: "Best Canvas Chrome extensions",
                copy: "BetterCampus, Tasks for Canvas, the Canvas downloaders, and Scope, sorted by the job you need done, with where each one wins.",
              },
              {
                href: "/products/extension",
                label: "Scope for Canvas",
                copy: "What the extension does, feature by feature, and what it leaves alone.",
              },
            ]}
          />
        }
      >
        <GuideSection id="what-it-can-see" title="What any Canvas extension can see">
          <div className="prose">
            <p>
              When you install an extension, Chrome asks you to grant it access to
              certain sites. On every site it has, the extension runs inside the pages
              you open. It can read what is on the page, change it, and make requests
              to that site as you, because your browser is already signed in. It does
              not need your password. Your logged-in session is the key, and the
              extension is already inside the door.
            </p>
            <p>
              Two things follow. First, reading and acting are the same permission. An
              extension that can read your assignments page can also press submit on
              it, and nothing in Chrome&apos;s prompt tells you which one it does.
              Only the code and the privacy policy can. Second, some permissions reach
              past the sites an extension runs on. &ldquo;Read your browsing
              history,&rdquo; which Chrome shows when an extension asks to see your
              tabs, means it can see the address and title of every tab you have open,
              whether or not it does anything there.
            </p>
            <p>
              There are also limits. An extension cannot see inside other extensions,
              read sites it was never granted, or reach data that never passes
              through your browser. It also cannot undo anything Instructure already
              stores.
            </p>
          </div>
        </GuideSection>

        <GuideSection id="checklist" title="The checklist">
          <div className="prose">
            <p>Run these nine checks on any extension before it gets your Canvas session.</p>
          </div>
          <ul className="feature-list">
            {checklist.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.copy}</span>
              </li>
            ))}
          </ul>
        </GuideSection>

        <GuideSection id="local-first" title="The honest limits of local-first">
          <div className="prose">
            <p>
              Local-first limits what an extension adds to your exposure. If the index
              stays in your browser, a breach of the publisher&apos;s servers cannot
              leak it, because it is not there. That is the whole benefit, and it is
              real. It is also narrow.
            </p>
            <p>
              Local-first cannot protect anything Instructure already holds. Your
              name, email, enrollments, submissions, and messages live on
              Canvas&apos;s servers, and that is exactly what the 2026 breach reached.
              Nothing you install or uninstall changes the copy there.
            </p>
            <p>
              It also stops at the feature boundary. The moment an extension offers
              account sync or cloud AI, some data leaves the device, and the honest
              question becomes which data, to whom, and whether you can decline.{" "}
              {SCOPE_PRODUCT_NAME} has both of those features. The table below says
              what each one sends.
            </p>
          </div>
        </GuideSection>

        <GuideSection id="scope" title="Scope against its own checklist">
          <div className="prose">
            <p>{SCOPE_DEFINITION}</p>
            <p>
              Here is the checklist applied to version {SCOPE_EXTENSION_VERSION}, read
              from its Chrome Web Store listing, its declared permissions, and the{" "}
              <Link href="/privacy">privacy policy</Link> on {CHECKED_ON}. The policy
              is the controlling statement, and where this table and the policy
              differ, the policy wins.
            </p>
          </div>
          <ComparisonTable
            caption={`${SCOPE_PRODUCT_NAME} permissions, read on ${CHECKED_ON}`}
            columns={["What it is for", "Optional?", "Where the data goes"]}
            rows={permissionRows}
          />
          <div className="prose">
            <h3>The rest of the checklist</h3>
          </div>
          <ul className="feature-list feature-list--wide">
            <li>
              <strong>Publisher</strong>
              <span>
                Scope Inc. The listing links to canvascope.org, is marked as created by
                the owner of that website, and showed a publisher record with no
                history of violations on {CHECKED_ON}.
              </span>
            </li>
            <li>
              <strong>Last updated</strong>
              <span>
                August 30, 2026, version {SCOPE_EXTENSION_VERSION}, as shown on the
                Chrome Web Store on {CHECKED_ON}.
              </span>
            </li>
            <li>
              <strong>Reviews</strong>
              <span>
                5.0 from 6 ratings and 94 users on the Chrome Web Store on{" "}
                {CHECKED_ON}. Six ratings is not a track record, so read them, then
                read the policy. Counting Lectra Notes on iPad, {LIVE_USERS} people
                were using Scope when we last counted by hand, on{" "}
                {LIVE_USERS_CHECKED_ON} (
                <Link className="link" href="/newsroom/how-we-count-people-using-scope">
                  how we count
                </Link>
                ).
              </span>
            </li>
            <li>
              {/* verify: whether the extension source is published anywhere */}
              <strong>Open source</strong>
              <span>Not today. You are trusting the policy and this page.</span>
            </li>
            <li>
              <strong>Quizzes and grades</strong>
              <span>
                It reads the pages you open, including the grades page if you open it.
                It does not act on your behalf inside graded work, and the next section
                says exactly what that rules out.
              </span>
            </li>
          </ul>
        </GuideSection>

        <GuideSection id="integrity" title="What Scope will not do for you">
          <div className="prose">
            <p>
              Scope answers questions from the materials your instructors posted and
              links every answer to its source. It does not take quizzes, write
              submissions, or interact with Canvas quiz logs.
            </p>
            <p>
              Extensions that answer quiz questions for you, or that block
              Canvas&apos;s activity log, are a different category, and we leave them
              out of{" "}
              <Link href="/compare/best-canvas-chrome-extensions">our round-ups</Link>{" "}
              on purpose. They exist to act on your behalf inside graded work, which
              is the one thing a study tool should never do.
            </p>
          </div>
        </GuideSection>

        <GuideSection id="questions" title="Questions people ask">
          <div className="prose">
            <h3>Can Canvas see which extensions I use?</h3>
            {/* verify: wording against Chrome's isolated-world model — a page cannot enumerate extensions, but can observe changes an extension makes to the page */}
            <p>
              Not as a list. Extensions run inside your browser, and Chrome keeps an
              extension&apos;s code separate from the page&apos;s own code, so a site
              cannot simply ask which extensions are installed. What a page can see is
              the page. If an extension adds a button or restyles the dashboard, that
              change is in the page, and a site that goes looking for it can in
              principle notice. Scope adds a search bar and a Send to iPad button to
              course pages, so the change is there to find. It reads course material
              through the same signed-in session your browser already uses. Whether
              Instructure looks for extension activity in its own logs is a question
              only Instructure can answer.
            </p>

            <h3>Can an extension see my grades?</h3>
            <p>
              If it runs on your Canvas pages, yes. It sees whatever you open, and the
              grades page is a page. Chrome has no permission that carves grades out
              of the rest of Canvas. The questions that matter are whether it stores
              them and whether it sends them anywhere.
            </p>
            <p>
              {/* verify: that search and the local index work without signing in */}
              For Scope, search runs on the pages you open and keeps its index in
              browser-local storage. If you sign in, the privacy policy describes an
              account sync path that carries your grades, notes, and tasks.
              Account-linked features need sign-in, and the local index does not.
            </p>

            <h3>Is BetterCampus safe?</h3>
            <p>
              We have not audited it, and a competitor&apos;s page is the wrong place
              to take anyone&apos;s word on it. Run the checklist. Open its Chrome Web
              Store listing, read the permissions and the privacy-practices
              disclosure, find the privacy policy and check that it names every data
              type, look at the last-updated date and the newest reviews, and decide
              whether what it asks for matches what it does.{" "}
              {/* verify: BetterCampus restyles Canvas — from the compare registry, not read from its listing today */}
              It restyles Canvas, so it has to run on your Canvas pages, and that part
              is expected. Our{" "}
              <Link href="/compare/scope-vs-bettercampus">
                comparison with BetterCampus
              </Link>{" "}
              covers what it does. Whether it is safe is your call, after the
              checklist.
            </p>

            <h3>What happened in the 2026 Canvas breach?</h3>
            <p>
              On April 25, 2026, unauthorized actors accessed Instructure&apos;s Canvas
              systems. Instructure detected the intrusion four days later and
              disclosed it on its status page on May 1. On May 7, Canvas was hit
              again, this time with a ransom message from the group ShinyHunters,
              which threatened to publish the data unless it was paid by May 12. The
              breach affected 8,809 universities, education ministries, and other
              institutions, and ShinyHunters claimed 3.65 terabytes of data covering
              roughly 275 million users.
            </p>
            <p>
              The exposed data included names, email addresses, student ID numbers,
              and messages between users. Instructure said it found no evidence that
              passwords, birth dates, government IDs, or financial information were
              involved. On May 13, 2026, a proposed class action was filed against
              Instructure in the United States District Court for the Southern
              District of California. No browser extension was involved. Source:{" "}
              <a href={BREACH_SOURCE_URL} target="_blank" rel="noreferrer">
                Wikipedia&apos;s entry on the breach
              </a>
              , read {CHECKED_ON}.
            </p>
          </div>
        </GuideSection>

        <GuideSection id="methodology" title="How this was checked">
          <MethodologyNote product="scope" dateChecked={CHECKED_ON} />
          <p className="small guide-checked">
            Last verified {CHECKED_ON} against the Chrome Web Store listing (version{" "}
            {SCOPE_EXTENSION_VERSION}, updated August 30, 2026), the extension&apos;s
            declared permissions, the privacy policy, and
            Wikipedia&apos;s entry on the 2026 Canvas data breach.
          </p>
        </GuideSection>
      </GuideArticle>

      <GuideClosing
        title="Read the policy first, then decide."
        actions={
          <>
            <StoreLink
              store="chrome-web-store"
              href={CHROME_WEB_STORE_URL}
              className="btn btn-primary"
            >
              Get Scope for Canvas for free
            </StoreLink>
            <Link href="/privacy" className="btn btn-line">
              Read the privacy policy
            </Link>
          </>
        }
      >
        <p>
          The privacy policy is the full statement. If it reads right to you, Scope for Canvas is free on the Chrome Web Store at
          version {SCOPE_EXTENSION_VERSION}. If it does not, skip it. The checklist
          works on whatever you pick instead.
        </p>
      </GuideClosing>
    </PageShell>
  );
}
