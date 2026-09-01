import Link from "next/link";
import type { ReactNode } from "react";

import ComparisonTable from "@/components/public/ComparisonTable";
import MethodologyNote from "@/components/public/MethodologyNote";
import PublicPageFrame from "@/components/public/PublicPageFrame";
import RelatedLinks from "@/components/public/RelatedLinks";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import { comparePath, getComparison, productEntityId } from "@/lib/compare";
import { publicPageMetadata } from "@/lib/seo";
import { CHROME_WEB_STORE_URL, SCOPE_DEFINITION } from "@/lib/site";
import { SCOPE_EXTENSION_VERSION } from "@/lib/siteRelease";
import {
  appListSchema,
  breadcrumbSchema,
  comparisonArticleSchema,
} from "@/lib/structured-data";
import { LIVE_USERS } from "@/lib/usage";

const comparison = getComparison("best-canvas-chrome-extensions");
const path = comparePath(comparison);

/**
 * Every competitor figure on this page — users, rating, version, last
 * updated, price, data disclosures — was read off the Chrome Web Store
 * listing on this date. The one exception is BetterCampus's Pro price and
 * platform list, which come from its help center (help.bettercampus.com)
 * the same day — the same source /compare/scope-vs-bettercampus records.
 * Re-check all of them together when it moves.
 */
const CHECKED_ON = "September 1, 2026";

export const metadata = publicPageMetadata({
  title: comparison.title,
  absoluteTitle: comparison.absoluteTitle,
  description: comparison.description,
  path,
  type: "article",
  keywords: comparison.keywords,
  publishedTime: comparison.datePublished,
  modifiedTime: comparison.dateModified,
});

/* Chrome Web Store listings as read on CHECKED_ON. Third-party links are
   plain anchors: StoreLink records install attempts for our own listing,
   and a click on a competitor's listing is not one. */
const listings = {
  betterCampus: {
    name: "BetterCampus",
    site: "https://bettercampus.com",
    store:
      "https://chromewebstore.google.com/detail/bettercampus-prev-betterc/cndibmoanboadcifjkjbdpjgfedanolh",
  },
  tasksForCanvas: {
    name: "Tasks for Canvas",
    store:
      "https://chromewebstore.google.com/detail/tasks-for-canvas-%E2%80%93-now-su/kabafodfnabokkkddjbnkgbcbmipdlmb",
  },
  courseDownloader: {
    name: "Canvas Course Downloader & Exporter",
    store:
      "https://chromewebstore.google.com/detail/canvas-course-downloader/mmnmcnffbkcnhcjiidmdnaclpfeekiol",
  },
  filesDownloader: {
    name: "Canvas Files Downloader",
    store:
      "https://chromewebstore.google.com/detail/canvas-files-downloader/meonopfejondoahgndhocmaenpcebkhb",
  },
  lmsMods: {
    name: "Canvas LMS Mods (Basic)",
    store:
      "https://chromewebstore.google.com/detail/canvas-lms-mods-basic/bnpdolbpbjiniodlbahddbnkollgojon",
  },
} as const;

type ExtensionPick = {
  id: string;
  heading: string;
  body: ReactNode;
  whoFor: string;
  watchOut: ReactNode;
  scopeNote: ReactNode;
};

const picks: ExtensionPick[] = [
  {
    id: "bettercampus",
    heading: "BetterCampus — best for customizing Canvas",
    body: (
      <>
        BetterCampus (formerly BetterCanvas) restyles Canvas: a dark mode you
        can schedule, a library of user-made themes, dashboard cards with your own
        colors and fonts, assignment previews from the dashboard, a GPA
        calculator, and a cleaner sidebar. On {CHECKED_ON} the{" "}
        <a href={listings.betterCampus.store} target="_blank" rel="noreferrer">
          Chrome Web Store listing
        </a>{" "}
        showed 2,000,000 users, a 4.7 rating from about 4,300 ratings, version
        9.8.6, last updated August 27, 2026.
      </>
    ),
    whoFor:
      "Anyone who spends hours a day in Canvas and wants it to look and feel better while they do.",
    watchOut: (
      <>
        It is free with in-app purchases. The listing does not show the
        price; its help center listed Pro at $19 a month or $119 a year on{" "}
        {CHECKED_ON}, and we could not load BetterCampus&apos;s own site that
        day, so check before you rely on a feature.
        {/* verify: BetterCampus Pro price and what it unlocks — read from help.bettercampus.com on 2026-09-01; bettercampus.com returned 403 */}{" "}
        Its store disclosure says it collects user activity data, not sold to
        third parties. The listing describes it as an extension for Canvas;
        its help center also names Brightspace, Blackboard, Moodle, and Google
        Classroom.
        {/* verify: BetterCampus on Brightspace — help-center claim, not hands-on tested */}
      </>
    ),
    scopeNote: (
      <>
        Scope does not change how Canvas looks — no dark mode, no themes, no
        dashboard editing. If that is the job, install BetterCampus. Most
        students can run both; the details are in{" "}
        <Link href="/compare/scope-vs-bettercampus">Scope vs BetterCampus</Link>
        .
      </>
    ),
  },
  {
    id: "tasks-for-canvas",
    heading:
      "Tasks for Canvas — best to-do list across Canvas, Blackboard, and Brightspace",
    body: (
      <>
        Tasks for Canvas turns the dashboard sidebar into a to-do list: every
        active assignment with its due date and points, a color-coded progress
        ring per course, announcements, custom tasks, week-by-week navigation,
        streaks, Gradescope assignments, and a dark mode. It is now published
        by BetterCampus and works on Canvas, Blackboard, and D2L Brightspace.
        On {CHECKED_ON} the{" "}
        <a
          href={listings.tasksForCanvas.store}
          target="_blank"
          rel="noreferrer"
        >
          listing
        </a>{" "}
        showed 1,000,000 users, a 4.6 rating from about 700 ratings, version
        1.6.3, last updated August 17, 2026. Free.
      </>
    ),
    whoFor:
      "Students who want one list of what is due — especially if their classes are split across more than one learning platform.",
    watchOut: (
      <>
        It lives in the dashboard sidebar, and the open-source project it grew
        from notes that the sidebar only appears in Canvas&apos;s Card View and
        Recent Activity layouts — check that it shows up on your school&apos;s
        dashboard.
        {/* verify: whether the Card View / Recent Activity limitation still applies to the current BetterCampus-published build */}{" "}
        Its store disclosure lists user activity; the listing says it does not
        collect or share user data and only talks to your school&apos;s Canvas.
      </>
    ),
    scopeNote: (
      <>
        Scope has a planner that drafts study blocks from upcoming deadlines,
        but Tasks for Canvas is the better to-do list, and its listing covers
        Blackboard, which Scope does not. If tracking deadlines is the job,
        install Tasks for Canvas. See{" "}
        <Link href="/compare/scope-vs-tasks-for-canvas">
          Scope vs Tasks for Canvas
        </Link>{" "}
        for whether to run both.
      </>
    ),
  },
  {
    id: "canvas-course-downloader",
    heading:
      "Canvas Course Downloader & Exporter — best for backing up a whole course",
    body: (
      <>
        Canvas Course Downloader &amp; Exporter saves a course into organized
        folders before it disappears at the end of term: files with their
        folder structure, pages, assignments, discussions, and announcements,
        the module structure and syllabus, and your grades as a spreadsheet.
        Teachers and TAs can pull submissions, gradebooks, and rosters. It has
        batch mode, ZIP bundling, incremental downloads, and a throttle, and it
        is open source. On {CHECKED_ON} the{" "}
        <a
          href={listings.courseDownloader.store}
          target="_blank"
          rel="noreferrer"
        >
          listing
        </a>{" "}
        showed 8,000 users, a 4.8 rating from 12 ratings, version 2.10.2, last
        updated August 30, 2026. Free.
      </>
    ),
    whoFor:
      "Anyone who wants a copy of a course they can keep — and instructors archiving their own.",
    watchOut: (
      <>
        Twelve ratings is a small sample. It is Canvas only. Large downloads
        can trip your school&apos;s rate limits, which is what the throttle
        setting is for. Download what you are permitted to see; the materials
        are still your instructor&apos;s.
      </>
    ),
    scopeNote: (
      <>
        Scope makes your courses searchable; it does not export them or hand
        you a folder of files. For an archive, use a downloader.
      </>
    ),
  },
  {
    id: "canvas-files-downloader",
    heading: "Canvas Files Downloader — the simpler bulk download",
    body: (
      <>
        Canvas Files Downloader does one thing: open a course&apos;s Modules,
        Pages, Assignments, or Wiki tab, select all or some of the attachments,
        and download them. On {CHECKED_ON} the{" "}
        <a
          href={listings.filesDownloader.store}
          target="_blank"
          rel="noreferrer"
        >
          listing
        </a>{" "}
        showed 3,000 users, a 3.4 rating from 23 ratings, version 1.3.0, last
        updated September 27, 2025. Free; the developer states it will not
        collect or use your data.
      </>
    ),
    whoFor:
      "Someone who wants the attachments from one tab of one course and nothing else.",
    watchOut: (
      <>
        Not updated in nearly a year as of {CHECKED_ON}, and the lowest rating
        on this list. It asks you to turn off Chrome&apos;s ask-where-to-save
        prompt so files land without a dialog. Canvas only. If you want more
        than attachments, the Course Downloader above is the better-maintained
        pick.
      </>
    ),
    scopeNote: (
      <>
        Same as above: Scope searches, it does not export. The two jobs
        combine well — download a course to keep it, search it with Scope
        while the term is on.
      </>
    ),
  },
  {
    id: "canvas-lms-mods",
    heading: "Canvas LMS Mods (Basic) — best for instructors and admins",
    body: (
      <>
        Canvas LMS Mods (Basic) is a set of modifications aimed at the people
        running a course rather than taking it: admin navigation shortcuts,
        course search with filters and sorting, SpeedGrader comment tools,
        custom course reports (submission results, discussion replies, module
        progress, user access), rubric import, grade export, and a simple
        search across courses. Each feature can be switched on or off. On{" "}
        {CHECKED_ON} the{" "}
        <a href={listings.lmsMods.store} target="_blank" rel="noreferrer">
          listing
        </a>{" "}
        showed 5,000 users, a 5.0 rating from 12 ratings, version 7.5.1, last
        updated August 28, 2025. Free; the developer states it will not collect
        or use your data.
      </>
    ),
    whoFor:
      "Instructors, TAs, and Canvas administrators. Most of it does nothing on a student account.",
    watchOut: (
      <>
        Not updated in a year as of {CHECKED_ON}, twelve ratings, Canvas only.
        Despite the &ldquo;Basic&rdquo; in the name, the listing we read did
        not mention a paid edition.
        {/* verify: whether a paid / non-Basic edition of Canvas LMS Mods exists */}
      </>
    ),
    scopeNote: (
      <>
        Scope is built for students reading a course, not for staff running
        one. The two do not overlap.
      </>
    ),
  },
  {
    id: "scope",
    heading:
      "Scope for Canvas — ours, for searching every course and getting cited answers",
    body: (
      <>
        {SCOPE_DEFINITION} Search and indexing run entirely on your device.
        Type a phrase and get the assignment, page, file, PDF page, or video it
        appears in, across every course at once — including text inside PDFs
        and scanned pages. Ask a question and the answer cites the course
        material it came from. AI answers try Chrome&apos;s on-device model
        first; when it is unavailable, an optional, clearly marked cloud
        fallback is used. Send a PDF from Canvas to your iPad in one tap with
        the Scope extension; finished files can come back into supported upload
        flows. On {CHECKED_ON} the{" "}
        <StoreLink store="chrome-web-store" href={CHROME_WEB_STORE_URL}>
          Chrome Web Store listing
        </StoreLink>{" "}
        showed 94 users, a 5.0 rating from 6 ratings, version{" "}
        {SCOPE_EXTENSION_VERSION}, last updated August 30, 2026. Free. Our own
        count, which adds Lectra Notes accounts, was {LIVE_USERS} on August 27,
        2026 —{" "}
        <Link href="/newsroom/how-we-count-people-using-scope">
          here is how we count
        </Link>
        .
      </>
    ),
    whoFor:
      "Students with several courses and a lot of PDFs — the ones who know the instructor said it somewhere and cannot find where.",
    watchOut: (
      <>
        It is the newest and smallest extension here; 94 users and 6 ratings
        is not a track record. Its store disclosure lists personal information,
        web history, user activity, and website content, because the extension
        reads your course content in order to index it — the{" "}
        <Link href="/privacy">privacy page</Link> spells out what that means in
        practice. Scope answers questions from the materials your instructors
        posted and links every answer to its source. It does not take quizzes,
        write submissions, or interact with Canvas quiz logs.
      </>
    ),
    scopeNote: (
      <>
        Where the others win: BetterCampus for how Canvas looks, Tasks for
        Canvas for a to-do list and for Blackboard, a downloader for an
        archive, Canvas LMS Mods for staff tools. No app syncs with Canvas
        automatically, Scope included.
      </>
    ),
  },
];

type Faq = { question: string; answer: ReactNode };

const faqs: Faq[] = [
  {
    question: "Are Canvas extensions allowed at my school?",
    answer: (
      <>
        Usually, for the kind on this list: they change how Canvas looks in
        your own browser or work with pages you can already see. Schools do
        prohibit tools that interfere with quizzes or proctoring, and some
        managed Chromebooks block extensions entirely. Your school&apos;s
        academic-integrity policy and IT pages are the authority. A useful
        test: if an extension changes what happens during a quiz, assume it is
        not allowed.
      </>
    ),
  },
  {
    question: "Are Canvas extensions safe?",
    answer: (
      <>
        A Canvas extension can read every page you open on your school&apos;s
        Canvas site, so the real question is where that data goes. Read the
        privacy-practices section of the listing, check that the developer has
        a contact, look at the last-updated date, and read the permissions
        prompt when you install. We wrote the full checklist in{" "}
        <Link href="/guides/canvas-extension-safety">
          are Canvas extensions safe?
        </Link>
        . The table above records what each extension on this list declares,
        as of {CHECKED_ON}.
      </>
    ),
  },
  {
    question: "Can I run BetterCampus and Scope together?",
    answer: (
      <>
        Nothing in either extension is designed to block the other:
        BetterCampus changes how Canvas looks, and Scope adds a search panel on
        top of it. We have not tested Scope against every BetterCampus theme,
        so if a theme hides part of Scope&apos;s panel, tell us and we will look
        at it.
        {/* verify: side-by-side test of Scope with the current BetterCampus build and its most popular themes */}
      </>
    ),
  },
  {
    question: "Which extension searches inside PDFs?",
    answer: (
      <>
        Of the extensions on this list, Scope for Canvas is the one built for
        search: it indexes assignments, pages, files, PDFs — including scanned
        pages — and videos across your courses, on your device, and answers
        questions with citations back to the material. BetterCampus and Tasks
        for Canvas do not search course content. The downloaders let you save
        files so you can search them on your computer. Canvas LMS Mods adds
        search to some staff pages that lack it, which is a different job. The
        manual options are in{" "}
        <Link href="/guides/how-to-search-canvas">how to search Canvas</Link>.
      </>
    ),
  },
];

export default function BestCanvasChromeExtensionsPage() {
  return (
    <PublicPageFrame active="compare" footerVariant="slim">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
            { name: comparison.title, path },
          ]),
          comparisonArticleSchema(
            comparison.title,
            path,
            comparison.description,
            comparison.datePublished,
            comparison.dateModified,
            productEntityId[comparison.product],
          ),
          appListSchema(
            "Best Canvas Chrome extensions for students (2026)",
            path,
            [
              {
                name: listings.betterCampus.name,
                url: listings.betterCampus.site,
              },
              {
                name: listings.tasksForCanvas.name,
                url: listings.tasksForCanvas.store,
              },
              {
                name: listings.courseDownloader.name,
                url: listings.courseDownloader.store,
              },
              {
                name: listings.filesDownloader.name,
                url: listings.filesDownloader.store,
              },
              { name: listings.lmsMods.name, url: listings.lmsMods.store },
              { name: "Scope for Canvas", id: "#canvascope-extension" },
            ],
          ),
        ]}
      />

      <section className="page-wrap centered-hero" id="hero">
        <div data-reveal>
          <p className="kicker">
            Compare · Checked {CHECKED_ON} · Scope for Canvas is ours
          </p>
          <h1>
            The best Canvas Chrome extensions for students in 2026 — by what
            you need
          </h1>
          <p className="centered-hero-lede">
            Scope for Canvas is our extension. It appears below for one job —
            search — and we say where the others beat it.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="short-answer">
        <div className="section-heading" data-reveal>
          <p className="kicker">Short answer</p>
          <h2>Which Canvas extension for which job?</h2>
        </div>
        <div data-reveal>
          <ul className="check-list">
            <li>
              <strong>Customize Canvas — dark mode, themes, dashboard cards</strong>
              <span>
                BetterCampus. The most complete set of looks-and-layout
                controls, and the biggest install base on this list.
              </span>
            </li>
            <li>
              <strong>
                One to-do list across Canvas, Blackboard, and Brightspace
              </strong>
              <span>
                Tasks for Canvas. Its listing names Blackboard and Brightspace
                as well as Canvas.
              </span>
            </li>
            <li>
              <strong>Bulk-download or back up a course</strong>
              <span>
                Canvas Course Downloader &amp; Exporter. Canvas Files
                Downloader if you only want one tab&apos;s attachments.
              </span>
            </li>
            <li>
              <strong>Search every course and get answers with citations</strong>
              <span>
                Scope for Canvas — ours, and the newest and smallest one on
                this list.
              </span>
            </li>
            <li>
              <strong>Instructor and admin tools</strong>
              <span>
                Canvas LMS Mods (Basic). Reports, rubrics, grade export, and
                SpeedGrader helpers.
              </span>
            </li>
          </ul>
          <p className="mt-6 text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
            Looking for a deadline extension on an assignment? That is a
            request to your instructor, not a browser extension.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="table">
        <div className="section-heading" data-reveal>
          <p className="kicker">Side by side</p>
          <h2>What each listing said on {CHECKED_ON}.</h2>
        </div>
        <div data-reveal>
          <ComparisonTable
            caption={`Canvas Chrome extensions compared on Chrome Web Store facts, ${CHECKED_ON}`}
            columns={[
              "BetterCampus",
              "Tasks for Canvas",
              "Canvas Course Downloader & Exporter",
              "Canvas Files Downloader",
              "Canvas LMS Mods (Basic)",
              "Scope for Canvas (ours)",
            ]}
            rows={[
              {
                label: "Best for",
                cells: [
                  "Customizing Canvas: dark mode, themes, dashboard, GPA calculator.",
                  "A to-do list with progress rings in the dashboard sidebar.",
                  "Backing up a whole course to folders.",
                  "Downloading the attachments in one tab.",
                  "Instructor and admin tools: reports, rubrics, grade export.",
                  "Searching every course; answers with citations.",
                ],
              },
              {
                label: `Users (Chrome Web Store, ${CHECKED_ON})`,
                cells: [
                  "2,000,000",
                  "1,000,000",
                  "8,000",
                  "3,000",
                  "5,000",
                  <>
                    94. Our own count, which adds Lectra Notes accounts, was{" "}
                    {LIVE_USERS} on August 27, 2026 (
                    <Link href="/newsroom/how-we-count-people-using-scope">
                      how we count
                    </Link>
                    ).
                  </>,
                ],
              },
              {
                label: `Rating (${CHECKED_ON})`,
                cells: [
                  "4.7 from about 4,300 ratings",
                  "4.6 from about 700 ratings",
                  "4.8 from 12 ratings",
                  "3.4 from 23 ratings",
                  "5.0 from 12 ratings",
                  "5.0 from 6 ratings",
                ],
              },
              {
                label: `Last updated (as of ${CHECKED_ON})`,
                cells: [
                  "August 27, 2026 (version 9.8.6)",
                  "August 17, 2026 (version 1.6.3)",
                  "August 30, 2026 (version 2.10.2)",
                  "September 27, 2025 (version 1.3.0)",
                  "August 28, 2025 (version 7.5.1)",
                  `August 30, 2026 (version ${SCOPE_EXTENSION_VERSION})`,
                ],
              },
              {
                label: "Price",
                cells: [
                  `Free, with in-app purchases. Pro was $19 a month or $119 a year on its help center on ${CHECKED_ON}; the listing does not show a price.`,
                  "Free.",
                  "Free; open source.",
                  "Free.",
                  "Free.",
                  "Free.",
                ],
              },
              {
                label: "Where your course data goes",
                cells: [
                  "Store disclosure: collects user activity; not sold to third parties.",
                  "Store disclosure: user activity. The listing says it does not collect or share user data and only talks to your school's Canvas.",
                  "The listing says it talks only to your Canvas site; not sold to third parties.",
                  "The developer states it will not collect or use your data.",
                  "The developer states it will not collect or use your data.",
                  <>
                    Search and indexing run entirely on your device. Store
                    disclosure lists personal information, web history, user
                    activity, and website content — the course content it
                    reads to index; not sold to third parties. Details on the{" "}
                    <Link href="/privacy">privacy page</Link>.
                  </>,
                ],
              },
              {
                label: "Brightspace support",
                cells: [
                  "Not on the listing, which describes it as an extension for Canvas; its help center says yes, along with Blackboard, Moodle, and Google Classroom.",
                  "Yes — Canvas, Blackboard, and D2L Brightspace.",
                  "No — Canvas only.",
                  "No — Canvas only.",
                  "No — Canvas only.",
                  "Yes — Canvas and Brightspace.",
                ],
              },
            ]}
          />
        </div>
      </section>

      {picks.map((pick) => (
        <section className="page-wrap section-pad-sm" key={pick.id} id={pick.id}>
          <div className="section-heading" data-reveal>
            <h2>{pick.heading}</h2>
          </div>
          <div className="section-copy-block" data-reveal>
            <p className="section-copy">{pick.body}</p>
            <p className="section-copy">
              <strong className="text-[var(--color-ink)]">Who it is for:</strong>{" "}
              {pick.whoFor}
            </p>
            <p className="section-copy">
              <strong className="text-[var(--color-ink)]">Watch out:</strong>{" "}
              {pick.watchOut}
            </p>
            <p className="section-copy">
              <strong className="text-[var(--color-ink)]">
                {pick.id === "scope" ? "Where the others win:" : "Where Scope does not compete:"}
              </strong>{" "}
              {pick.scopeNote}
            </p>
          </div>
        </section>
      ))}

      <section className="page-wrap section-pad-sm" id="left-out">
        <div className="section-heading" data-reveal>
          <p className="kicker">Not on this list</p>
          <h2>What we left out, and why.</h2>
        </div>
        <div className="section-copy-block" data-reveal>
          <p className="section-copy">
            We left out every extension whose purpose is answering quizzes for
            you or hiding what you do from your instructor — not because they
            are unpopular, but because a tool that exists to defeat your
            school&apos;s academic-integrity checks does not belong on a list
            of study tools.
          </p>
          <p className="section-copy">
            That category includes anything marketed as a quiz solver, as a
            way to load answers from earlier attempts, or as
            &ldquo;anti-detection&rdquo; for quiz sessions. Some of them carry
            names that sound like ordinary Canvas utilities, so on the Chrome
            Web Store, judge an extension by what its description says it does,
            not by its name.
          </p>
          <p className="section-copy">
            Generic extensions such as Dark Reader and Grammarly run on Canvas
            pages, but they are not Canvas extensions — they do the same thing
            on every site — so they belong on a different list. And if
            something you saw recommended elsewhere is missing, the likeliest
            reasons are that it was not on the Chrome Web Store when we checked
            on {CHECKED_ON}, or that it falls into the category above.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="how-we-picked">
        <div className="section-heading" data-reveal>
          <p className="kicker">Method</p>
          <h2>How we picked.</h2>
        </div>
        <div data-reveal>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
            <li>
              Every user count, rating, version, update date, and data
              disclosure was read from the Chrome Web Store on {CHECKED_ON};
              BetterCampus&apos;s Pro price comes from its help center the same
              day. Feature descriptions come from each listing.
            </li>
            <li>
              We did not install and test every extension for this page.
              Nothing here is lab-tested unless the text says so.
            </li>
            <li>
              The list is sorted by job, not ranked one to six, because the
              extensions do different things and most people will want more
              than one.
            </li>
            <li>
              Quiz-answering and activity-hiding tools were excluded on
              principle, as explained above.
            </li>
            <li>
              This list is published by the maker of Scope for Canvas. Scope
              appears for one job, search, and every other section says where
              a competitor is the better install.
            </li>
          </ul>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="methodology">
        <div data-reveal>
          <MethodologyNote
            product="scope"
            dateChecked={CHECKED_ON}
            extraConcessions={[
              "This list is published by the maker of Scope for Canvas.",
            ]}
          />
        </div>
      </section>

      <section className="page-wrap faq-section" id="faq">
        <div className="section-heading" data-reveal>
          <p className="kicker">Questions</p>
          <h2>Canvas extensions, answered.</h2>
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

      <RelatedLinks
        title="Keep comparing."
        links={[
          {
            href: "/compare/scope-vs-bettercampus",
            label: "Scope vs BetterCampus",
            copy: "BetterCampus restyles Canvas; Scope searches it. Why most students can run both.",
          },
          {
            href: "/compare/scope-vs-tasks-for-canvas",
            label: "Scope vs Tasks for Canvas",
            copy: "Tasks for Canvas is the better to-do list. Whether Scope's planner is enough, or whether to run both.",
          },
          {
            href: "/guides/how-to-search-canvas",
            label: "How to search Canvas",
            copy: "What Canvas's own search covers, what it misses, and the manual workarounds before any extension.",
          },
          {
            href: "/guides/canvas-extension-safety",
            label: "Are Canvas extensions safe?",
            copy: "The checklist to run on any Canvas extension before you install it, including ours.",
          },
        ]}
      />

      <section className="page-wrap final-cta" id="download" data-reveal>
        <div>
          <h2>If search is the job, try Scope.</h2>
          <p>
            <StoreLink store="chrome-web-store" href={CHROME_WEB_STORE_URL}>
              Scope for Canvas on the Chrome Web Store
            </StoreLink>{" "}
            — free, version {SCOPE_EXTENSION_VERSION} as of {CHECKED_ON}. If
            the job is how Canvas looks or what is due, BetterCampus and Tasks
            for Canvas are the better installs, and we said so above.
          </p>
        </div>
      </section>
    </PublicPageFrame>
  );
}
