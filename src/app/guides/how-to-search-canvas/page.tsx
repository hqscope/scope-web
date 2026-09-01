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
  CHROME_WEB_STORE_URL,
  SCOPE_DEFINITION,
  SCOPE_PRODUCT_NAME,
} from "@/lib/site";
import { LIVE_USERS, VERIFIED_ON } from "@/lib/usage";
import { breadcrumbSchema, guideArticleSchema } from "@/lib/structured-data";

const guide = getGuide("how-to-search-canvas");
const path = guidePath(guide);

/**
 * Every Canvas and Brightspace fact on this page was read on September 1,
 * 2026 from these sources:
 *
 *   - community.instructure.com/en/kb/articles/662774-what-is-igniteai-search-for-courses
 *     (updated 2026-07-29) — opt-in feature option, course-navigation link,
 *     and the four content types Smart Search covers.
 *   - canvas.instructure.com/doc/api/smart_search.html and
 *     developerdocs.instructure.com/services/canvas/resources/smart_search —
 *     GET /api/v1/courses/:course_id/smartsearch, single-course scope, no
 *     account-wide endpoint, BETA with "limited availability at present".
 *   - community.instructure.com/en/kb/articles/662809-how-do-i-view-all-my-canvas-courses
 *     (updated 2026-06-01) — the All Courses groupings and the read-only
 *     archive wording for past enrollments.
 *   - community.instructure.com/en/kb/articles/662840-how-do-i-use-files
 *     (updated 2026-06-09) — Files is searchable by file name.
 *   - community.instructure.com/en/kb/articles/662841-how-do-i-view-course-files
 *     (updated 2026-07-21) — the Files link and the All My Files button.
 *   - Chrome Web Store listing for Canvas Files Downloader.
 *   - community.d2l.com/brightspace/discussion/3483 — D2L's answer that
 *     Brightspace has no global content search.
 *
 * Anything that could not be read that day is hedged in the copy and marked
 * with a `verify:` comment beside it.
 */
const CHECKED_ON = "September 1, 2026";

/** VERIFIED_ON ("2026-08-27") in the long form this site writes dates in. */
const LIVE_USERS_CHECKED_ON = new Date(`${VERIFIED_ON}T00:00:00Z`).toLocaleDateString(
  "en-US",
  { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" },
);

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

const faqs = [
  {
    question: "Can you search all Canvas courses at once?",
    answer:
      "Not with Canvas on its own. Smart Search — which Instructure now lists under the name IgniteAI Search for Courses — appears as a link inside one course and searches that course. Instructure's developer documentation describes a single course-scoped search endpoint and no account-wide equivalent. To cover several courses you either repeat the search in each one, or run a browser extension that indexes them together.",
  },
  {
    question: "How do I find an old assignment in Canvas?",
    answer:
      "Open Courses, then All Courses, and look under the Past Enrollments heading. Instructure describes a concluded course there as a read-only archive: you can still view course material and grades, but you can no longer participate. Open the course and check its Assignments or Grades page. Some institutions restrict access to concluded courses, so a course may not appear in that list at all.",
  },
  {
    question: "Does Canvas search inside PDFs?",
    answer:
      "No. Canvas documents Files as searchable by file name, and Smart Search covers assignments, announcements, discussions, and pages — files are not among the content types Instructure lists. So if the definition you want is on slide 34 of a lecture deck, nothing built into Canvas will find it. Downloading the files and searching them on your own computer, or using a tool that reads them for you, is the way around it.",
  },
  {
    question: "Why don't I see Smart Search?",
    answer:
      "Because your institution has not turned it on. Instructure's own guide says the feature applies to institutions that have opted in to the Search for Courses feature option, and that if your interface looks different, it has not been enabled at your institution. Admins switch it on for an account or a sub-account, and where it is left unlocked, teachers can control it course by course. There is no student-side switch — asking your Canvas admin is the route that works.",
  },
];

export default function HowToSearchCanvasGuidePage() {
  return (
    <PublicPageFrame active="guides" footerVariant="slim">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: "How to search Canvas across all your courses", path },
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

      <section className="page-wrap centered-hero" id="hero">
        <div data-reveal>
          <p className="kicker">Guide · Last verified {CHECKED_ON}</p>
          <h1>How to search Canvas across all your courses</h1>
          <p className="centered-hero-lede">
            Canvas has no built-in search across courses. Canvas Smart Search,
            where your school has turned it on, searches one course at a time.
            This guide covers what Canvas can find today, the manual routine
            that works without installing anything, how to dig an old
            assignment or grade out of a finished course, and the two kinds of
            extension people reach for when the manual routine stops scaling.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="methods">
        <div className="section-heading" data-reveal>
          <p className="kicker">At a glance</p>
          <h2>Five ways to find something, side by side.</h2>
        </div>
        <div data-reveal>
          <ComparisonTable
            caption={`Ways to search Canvas course content, compared on cross-course reach, PDF contents, institutional setup, and cost, checked ${CHECKED_ON}`}
            columns={[
              "Searches across courses?",
              "Searches inside PDFs?",
              "Needs your school to enable it?",
              "Cost",
            ]}
            rows={[
              {
                label: "Canvas Smart Search",
                cells: [
                  "No — it lives in one course's navigation and searches that course.",
                  "No. It covers assignments, announcements, discussions, and pages; files are not on Instructure's list.",
                  "Yes. An admin has to opt the account or sub-account in.",
                  // verify: whether IgniteAI carries an add-on cost for the
                  // institution is discussed but not settled in Instructure's
                  // community; nothing indicates a student-side charge.
                  "Nothing for you. Whether the institution pays for it is between the institution and Instructure.",
                ],
              },
              {
                label: "All Courses + Find on page",
                cells: [
                  "Only the list of course names — not what is inside them.",
                  "No. Find on page reads what is drawn on screen, nothing more.",
                  "No.",
                  "Free.",
                ],
              },
              {
                label: "Per-course Files search",
                cells: [
                  "No, though the All My Files view widens it to file names across your courses.",
                  "No — file names only.",
                  "No.",
                  "Free.",
                ],
              },
              {
                label: "Bulk-download extension",
                cells: [
                  "It downloads course by course; the searching happens on your computer afterwards.",
                  "Whatever your computer's own file search can read once the files are local.",
                  "No, but check your institution's policy on bulk downloading.",
                  "Free listings exist.",
                ],
              },
              {
                label: SCOPE_PRODUCT_NAME,
                cells: [
                  "Yes, across the courses you have indexed.",
                  "Yes, including scanned pages.",
                  "No.",
                  "Free.",
                ],
              },
            ]}
          />
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="what-canvas-can-search">
        <div className="section-heading" data-reveal>
          <p className="kicker kicker-muted">Built in</p>
          <h2>What Canvas can search today</h2>
        </div>
        <div data-reveal>
          <p className="section-copy">
            Two search boxes ship with Canvas, and neither one crosses a course
            boundary.
          </p>
          <p className="section-copy mt-4">
            <strong>Smart Search</strong>, which Instructure now lists as
            IgniteAI Search for Courses, appears as a link in a course&apos;s
            navigation menu. Type a phrase and it returns assignments,
            announcements, discussions, and pages from that course, ranked by
            meaning rather than exact wording, with a filter for narrowing to
            one content type. Two things limit it. It is opt-in: Instructure&apos;s
            guide states that it applies to institutions that have opted in to
            the Search for Courses feature option, and that if your interface
            looks different, the feature has not been enabled at your school.
            And it is scoped to one course — Instructure&apos;s developer
            documentation describes a single course-scoped search endpoint,
            with no account-wide equivalent, and still marks the feature as
            beta with limited availability.
          </p>
          <p className="section-copy mt-4">
            <strong>The Files page</strong> in each course has its own search
            box, reached from the Files link in course navigation. Canvas
            documents Files as searchable by file name — so it will find{" "}
            <em>lecture12.pdf</em>, and it will not find the word{" "}
            <em>chemiosmosis</em> printed on page four of it. The All My Files
            button widens that view to the file names across every course you
            are enrolled in plus your own uploads, which is the closest thing
            Canvas has to a cross-course search, and it is still names only.
          </p>
          <p className="section-copy mt-4">
            What neither one reaches: the text inside a PDF, a slide deck, or a
            scanned handout. That is where most of the answer you are looking
            for actually lives.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="manual">
        <div className="section-heading" data-reveal>
          <p className="kicker kicker-muted">No installs</p>
          <h2>The manual way: all courses, then Find on page</h2>
        </div>
        <div data-reveal>
          <p className="section-copy">
            No installs, no permissions, works on every Canvas instance. It is
            also slow, and it is worth being honest about why before you start.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
            <li>
              Click <strong>Courses</strong> in the global navigation menu on
              the left, then <strong>All Courses</strong>.
            </li>
            <li>
              Read past the current term. Canvas groups this page into All
              Courses, <strong>Past Enrollments</strong>, Future Enrollments,
              and Groups — last spring&apos;s course is under Past Enrollments,
              not at the top.
            </li>
            <li>
              Open the course you think holds the file. A past-enrollment
              course opens as a read-only archive: you can read it, you cannot
              post in it.
            </li>
            <li>
              Go to <strong>Files</strong> or <strong>Modules</strong>,
              whichever your instructor actually used. Many instructors post
              everything in Modules and never touch Files.
            </li>
            <li>
              Expand every collapsed module, then press{" "}
              <strong>Ctrl+F</strong> (<strong>Cmd+F</strong> on a Mac) and
              search the page.
            </li>
            <li>Repeat for the next course.</li>
          </ol>
          <p className="section-copy mt-4">
            The friction is real. Find on page only matches text the browser
            has already drawn, so a collapsed module, a folder you have not
            opened, and the contents of every attachment are all invisible to
            it. You are searching a table of contents, not the material. For
            one half-remembered assignment title this is fine. For &quot;which
            week did she define the effective population size&quot; it is
            hours.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="old-work">
        <div className="section-heading" data-reveal>
          <p className="kicker kicker-muted">Old courses</p>
          <h2>Finding an old assignment or grade</h2>
        </div>
        <div data-reveal>
          <p className="section-copy">
            A finished course does not disappear — it moves. Under Past
            Enrollments on the All Courses page, Instructure describes a
            concluded course as a read-only archive where you can still view
            course material and grades but can no longer participate. Open it
            and you have two useful pages.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
            <li>
              <strong>Grades</strong>, from the course navigation menu, for
              what a submission scored and any comments left on it.
            </li>
            <li>
              <strong>Assignments</strong>, which lists every assignment the
              course expected of you and the points each was worth — the
              fastest way to recover a title you half-remember, then follow it
              through to the submission.
            </li>
          </ul>
          <p className="section-copy mt-4">
            One caveat worth knowing before you panic: Instructure notes that
            institutions may restrict access to concluded courses after the
            course has ended. If a course is missing from Past Enrollments
            entirely, that is usually a school setting rather than something
            you did, and your registrar or help desk is the place to ask.
            Anything you want to keep permanently is worth downloading while
            the course is still open to you.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="downloaders">
        <div className="section-heading" data-reveal>
          <p className="kicker kicker-muted">Workaround</p>
          <h2>Bulk-download extensions as a workaround</h2>
        </div>
        <div data-reveal>
          <p className="section-copy">
            A whole category of browser extension exists to walk a course&apos;s
            modules, pages, and assignments and pull every attachment down in
            one pass, keeping the folder structure. The search then happens on
            your own computer, where Spotlight or File Explorer can read inside
            the documents — which is the one thing Canvas cannot do.
          </p>
          <p className="section-copy mt-4">
            To give a sense of the category rather than a recommendation: the
            Chrome Web Store listing for Canvas Files Downloader, read on{" "}
            {CHECKED_ON}, showed 3,000 users and a 3.4 rating from 23 ratings,
            version 1.3.0, last updated September 27, 2025. We have not tested
            it. Several similar extensions exist with smaller listings; we are
            naming the one whose listing we actually read.
          </p>
          <p className="section-copy mt-4">The trade-offs, plainly:</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
            <li>
              It is still course by course. Six courses means six passes.
            </li>
            <li>
              A download is a snapshot. The moment an instructor posts a
              revised problem set, your local copy is wrong and nothing tells
              you.
            </li>
            <li>
              You get a folder, not an index. Finding the file is now your
              operating system&apos;s job, and scanned handouts with no text
              layer stay unsearchable.
            </li>
            <li>
              An extension that downloads your course files can read your
              Canvas session. That is a real permission to hand over — worth
              reading{" "}
              <Link href="/guides/canvas-extension-safety">
                what a Canvas extension can see
              </Link>{" "}
              before you install any of them, ours included.
            </li>
            <li>
              Check your institution&apos;s policy. Some schools have rules
              about bulk-downloading course materials, particularly licensed
              readings.
            </li>
          </ul>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="scope">
        <div className="section-heading" data-reveal>
          <p className="kicker kicker-muted">Our extension</p>
          <h2>A cross-course search extension</h2>
        </div>
        <div data-reveal>
          <p className="section-copy">{SCOPE_DEFINITION}</p>
          <p className="section-copy mt-4">
            The difference from everything above is that it holds more than one
            course at a time and reads what is inside the documents, including
            scanned pages, so a phrase from a lecture slide is findable
            alongside the assignment that referenced it. Ask a question and it
            answers from the materials your instructors posted, with a link
            back to the page or file each part of the answer came from.
          </p>
          <p className="section-copy mt-4">
            Where it falls short, and these matter:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
            <li>
              It has to index a course before it can search it. A course you
              have never opened with Scope running is not in the index, and the
              first pass through a term of material takes a few minutes.
            </li>
            <li>
              It can only reach courses you can already open yourself. If your
              school has closed a concluded course, Scope sees exactly what you
              see: nothing.
            </li>
            <li>
              No app syncs with Canvas automatically. Scope indexes what you
              visit; it is not a background mirror of your account.
            </li>
            <li>
              Scope answers questions from the materials your instructors
              posted and links every answer to its source. It does not take
              quizzes, write submissions, or interact with Canvas quiz logs.
            </li>
            <li>
              It is small. {LIVE_USERS} people were using Scope and Lectra Notes
              combined when we last counted by hand, on {LIVE_USERS_CHECKED_ON},
              and we{" "}
              <Link href="/newsroom/how-we-count-people-using-scope">
                show our working
              </Link>
              . The bulk downloaders above have more users than we do.
            </li>
          </ul>
          <p className="section-copy mt-4">
            On privacy, the two honest sentences. Search and indexing run
            entirely on your device. AI answers try Chrome&apos;s on-device
            model first; when it is unavailable, an optional, clearly marked
            cloud fallback is used.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="brightspace">
        <div className="section-heading" data-reveal>
          <p className="kicker kicker-muted">Brightspace</p>
          <h2>On Brightspace</h2>
        </div>
        <div data-reveal>
          <p className="section-copy">
            The situation is the same shape. Asked whether an instructor could
            search every course at once, D2L&apos;s answer in its own community
            was that there is no global content search in Brightspace: you can
            search topic names within a course, and for anything beyond that
            the suggested workaround was the browser&apos;s own find, which
            only matches text already rendered on the page.{" "}
            {/* verify: a later community reply says the search topics box
                reached the New Content Experience in a December release, but
                does not give the year, so the sentence above stays at the
                course level rather than naming an experience. */}
            So the routine is the one above: open the course, open the module
            list or the content tree, expand everything, and use Ctrl+F. Scope
            indexes Brightspace courses the same way it indexes Canvas ones.
          </p>
        </div>
      </section>

      <section className="page-wrap faq-section" id="faq">
        <div className="section-heading" data-reveal>
          <p className="kicker">Questions</p>
          <h2>Searching Canvas, answered.</h2>
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

      <section className="page-wrap section-pad-sm" id="last-verified">
        <div className="public-panel" data-reveal>
          <p className="kicker kicker-muted">Last verified</p>
          <p className="section-copy mt-3">
            Checked on {CHECKED_ON}. Every Canvas step and limit on this page
            was read that day from Instructure&apos;s own guides and developer
            documentation, the Brightspace paragraph from D2L&apos;s community,
            and the downloader figures from that extension&apos;s Chrome Web
            Store listing. What changed since this guide was first written:
            Instructure now lists Smart Search under the name IgniteAI Search
            for Courses, and its guide was last updated in July 2026 — the
            feature is still opt-in per institution and still scoped to one
            course. Canvas guides move, and features arrive at different
            schools at different times, so if a step here no longer matches
            what you see, tell us and we will correct it.
          </p>
        </div>
      </section>

      <section className="page-wrap section-pad-sm" id="methodology">
        <div data-reveal>
          <MethodologyNote
            product="scope"
            dateChecked={CHECKED_ON}
            extraConcessions={[
              "Indexing: Scope cannot search a course until it has indexed it, and it only reaches courses you can already open yourself.",
              "Downloading: Scope does not bulk-download a course to your disk. If you want offline copies of everything, a downloader still does that job better.",
            ]}
          />
        </div>
      </section>

      <RelatedLinks
        title="Next steps"
        links={[
          {
            href: "/guides/canvas-extension-safety",
            label: "Are Canvas extensions safe?",
            copy: "What a browser extension can see in your Canvas account, and the checklist to run before installing any of them.",
          },
          {
            href: "/compare/best-canvas-chrome-extensions",
            label: "Best Canvas Chrome extensions",
            copy: "The extensions students actually install, sorted by the job each one does — and where each is the better pick.",
          },
          {
            href: "/compare/scope-vs-tasks-for-canvas",
            label: "Scope vs Tasks for Canvas",
            copy: "Tasks for Canvas is the better to-do list. Scope is search plus a planner. Which one you need, or whether to run both.",
          },
          {
            href: "/products/extension",
            label: SCOPE_PRODUCT_NAME,
            copy: "The extension behind the last method: cross-course search, cited answers, and a planner drafted from your deadlines.",
          },
        ]}
      />

      <section className="page-wrap final-cta" id="download" data-reveal>
        <div>
          <h2>Stop opening courses one at a time.</h2>
          <p>
            <StoreLink store="chrome-web-store" href={CHROME_WEB_STORE_URL}>
              Add Scope to Chrome — free
            </StoreLink>{" "}
            and it searches the courses you open, PDFs included. If all you
            need is one old assignment title, the All Courses page above does
            the job without installing anything, and we would rather you knew
            that.
          </p>
        </div>
      </section>
    </PublicPageFrame>
  );
}
