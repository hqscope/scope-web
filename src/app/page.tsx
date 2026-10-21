import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import PageShell from "@/components/site/PageShell";
import { AppStoreButton, ButtonLink, ChromeStoreButton } from "@/components/buttons";
import { CommandPaletteDemo } from "@/components/command-palette-demo";
import { CheckIcon } from "@/components/icons";
import { FindScene, HandInScene, SendScene } from "@/components/mocks/flow-mocks";
import { LectraMock } from "@/components/mocks/lectra-mock";
import { PolyaMock } from "@/components/mocks/polya-mock";
import { WeekFlow, type FlowStep } from "@/components/week-flow";
import { publicPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, canvascopeSoftwareSchema } from "@/lib/structured-data";
import { products, site } from "@/lib/site";

export const metadata: Metadata = publicPageMetadata({
  title: "Scope for Canvas | Local-First Canvas Search Extension",
  absoluteTitle: true,
  description:
    "Scope for Canvas is a free, local-first Chrome extension that searches your Canvas and Brightspace courses and cites its answers. It comes with Lectra Notes, the free Apple Pencil iPad app.",
  path: "/",
});

const steps: FlowStep[] = [
  {
    title: "Find it",
    app: products.extension.name,
    body: "Press ⌘K on any Canvas or Brightspace page and type a few words. Scope searches every course you're in, so you stop clicking through modules.",
    scene: <FindScene />,
  },
  {
    title: "Send it to your iPad",
    app: "Scope for Canvas and Lectra Notes",
    body: "When the result is a PDF, send it to Lectra Notes in one step. It lands in the Scope Inbox in your library.",
    scene: <SendScene />,
  },
  {
    title: "Work on it",
    app: products.lectra.name,
    body: "Read and write on the PDF with Apple Pencil. Record the lecture while you take notes, then tap your notes to hear that moment.",
    scene: <LectraMock />,
  },
  {
    title: "Hand it in",
    app: "Scope for Canvas and Lectra Notes",
    body: "On a Canvas or Gradescope upload page, choose Select from Lectra to attach your marked-up PDF. Scope fills in the file. You press submit.",
    scene: <HandInScene />,
  },
  {
    title: "Get unstuck",
    app: products.polya.name,
    body: "When a problem doesn't make sense, ask Polya. It answers from your course materials and, by default, starts with a hint instead of the answer.",
    scene: <PolyaMock showModes={false} />,
  },
];

const apps = [
  {
    name: products.extension.name,
    where: "Chrome extension",
    summary: "Search every Canvas and Brightspace course from one search bar.",
    features: [
      "Search across all your courses",
      "Every due date in one agenda",
      "Ask about dates, policies, and files",
      "Study plans and practice questions",
      "Send PDFs to your iPad",
    ],
    href: products.extension.href,
  },
  {
    name: products.lectra.name,
    where: "iPad app",
    summary: "Read, mark up, and work on course documents with Apple Pencil.",
    features: [
      "Handwriting on PDFs and notebooks",
      "Lecture recording tied to your notes",
      "Search your handwriting",
      "Python and Jupyter notebooks, offline",
      "Works without an account",
    ],
    href: products.lectra.href,
  },
  {
    name: products.polya.name,
    where: "On the web",
    summary: "A tutor that teaches from your own course materials.",
    features: [
      "Answers that open the page they came from",
      "Four study modes, Guided by default",
      "Exam practice from your materials",
      "Works inside ChatGPT and Claude",
      "Use it on your phone, too",
    ],
    href: products.polya.href,
  },
];

const commitments = [
  {
    title: "Help starts with a hint.",
    body: "Polya's default mode gives you the next step, not the answer. You choose how much help each course gets, and you can change it any time.",
  },
  {
    title: "You press submit.",
    body: "Scope can find a file and attach it to an upload form. Handing work in is always your move.",
  },
  {
    title: "Your work stays yours.",
    body: "No ads, and no selling your data. Your notes, documents, and course materials aren't used to train AI models.",
  },
];

export default function HomePage() {
  return (
    <PageShell>
      <JsonLd
        data={[breadcrumbSchema([{ name: "Home", path: "/" }]), canvascopeSoftwareSchema()]}
      />
      {/* Hero */}
      <section className="mx-auto max-w-[1200px] px-5 pb-16 pt-12 sm:px-8 sm:pt-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-14">
          <div>
            <p className="text-[15px] font-medium text-stone">
              Course search, PDF notes, and a tutor for Canvas and Brightspace
            </p>
            <h1 className="mt-5 max-w-[12ch] text-[clamp(2.9rem,7.4vw,5.75rem)] font-semibold leading-[0.95] tracking-[-0.048em] text-ink">
              The LMS where students actually do the work.
            </h1>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-[46ch] text-[18px] leading-[1.55] text-ink-soft">
              Scope is a free Canvas extension, iPad notes app, and course tutor. Find any reading in
              a keystroke, mark it up with Apple Pencil, and work through problems with help that
              starts with a hint.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ChromeStoreButton />
              <AppStoreButton />
            </div>
          </div>
        </div>

        <div className="mt-14 sm:mt-16">
          <CommandPaletteDemo />
          <p className="mt-4 text-center text-[14px] text-stone">
            Try it: click the search box and type, or press <kbd className="font-semibold text-ink-soft">⌘K</kbd>.
            The courses here are samples.
          </p>
        </div>
      </section>

      {/* A week of class */}
      <section aria-labelledby="week-heading" className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-[40rem]">
          <h2 id="week-heading" className="text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            One week of class, without the tab hunt.
          </h2>
          <p className="mt-5 text-[18px] leading-[1.55] text-stone">
            Canvas is where your course lives. Scope is where you do the work: find the reading, mark
            it up, hand it in, and get help when you&apos;re stuck. Your instructor doesn&apos;t need
            to set anything up.
          </p>
        </div>
        <div className="mt-14">
          <WeekFlow steps={steps} />
        </div>
      </section>

      {/* The apps */}
      <section aria-labelledby="apps-heading" className="border-y border-line bg-wash">
        <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 id="apps-heading" className="max-w-[16ch] text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              Three free apps, one account.
            </h2>
            <p className="max-w-[44ch] text-[17px] leading-[1.55] text-stone">
              Each app works on its own. Sign in to all three with the same Google account and your
              PDFs, backups, and courses come with you.
            </p>
          </div>

          <div className="mt-14 grid overflow-hidden rounded-[22px] bg-line ring-1 ring-line md:grid-cols-3 md:gap-px">
            {apps.map((app) => (
              <article key={app.name} className="flex flex-col bg-paper p-7 sm:p-9 max-md:border-t max-md:border-line max-md:first:border-t-0">
                <p className="text-[13.5px] font-medium text-stone">{app.where}</p>
                <h3 className="mt-1 text-[24px] font-semibold tracking-[-0.03em]">{app.name}</h3>
                <p className="mt-3 text-[16px] leading-[1.5] text-ink-soft">{app.summary}</p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {app.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-[15px] leading-snug text-ink-soft">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-red" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={app.href}
                  className="mt-8 inline-flex w-fit items-center rounded-full text-[15px] font-semibold text-ink underline decoration-line decoration-2 underline-offset-[6px] hover:decoration-red"
                >
                  More about {app.name}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Principle */}
      <section aria-labelledby="principle-heading" className="bg-ink text-white">
        <div className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32">
          <h2 id="principle-heading" className="max-w-[18ch] text-[clamp(2.25rem,5.6vw,4.25rem)] font-semibold leading-[1] tracking-[-0.045em]">
            Automate everything around learning. Don&apos;t automate learning itself.
          </h2>
          <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.55] text-white/65">
            Scope handles the finding, filing, and keeping track, so the hours you spend on a course
            go to the course. The thinking stays with you.
          </p>
          <div className="mt-16 grid gap-10 border-t border-white/15 pt-10 md:grid-cols-3 md:gap-12">
            {commitments.map((item) => (
              <div key={item.title}>
                <h3 className="text-[19px] font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-[15.5px] leading-[1.6] text-white/65">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section aria-labelledby="privacy-heading" className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <h2 id="privacy-heading" className="text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              Your coursework stays on your side.
            </h2>
            <p className="mt-5 max-w-[42ch] text-[17px] leading-[1.55] text-stone">
              Scope is free, shows no ads, and doesn&apos;t track you across other apps and websites.
              You can search your courses and use Lectra Notes without an account.
            </p>
            <Link
              href="/privacy"
              className="mt-7 inline-flex text-[15px] font-semibold text-ink underline decoration-line decoration-2 underline-offset-[6px] hover:decoration-red"
            >
              Read privacy at a glance
            </Link>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[22px] bg-line ring-1 ring-line sm:grid-cols-2">
            <div className="bg-paper p-7">
              <h3 className="text-[16px] font-semibold">On your device</h3>
              <ul className="mt-4 space-y-3 text-[15px] leading-snug text-ink-soft">
                <li>Your course search index. Searching happens on your computer.</li>
                <li>Your Lectra Notes documents and handwriting.</li>
                <li>Summaries and answers about your documents in Lectra Notes, which are written on your iPad and are off until you turn them on.</li>
              </ul>
            </div>
            <div className="bg-paper p-7">
              <h3 className="text-[16px] font-semibold">With your account, if you sign in</h3>
              <ul className="mt-4 space-y-3 text-[15px] leading-snug text-ink-soft">
                <li>The PDFs you send to your iPad.</li>
                <li>A backup copy of your Lectra Notes pages.</li>
                <li>The courses you add to Polya, your study modes, and your conversations.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section aria-labelledby="teach-heading" className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-8 rounded-[22px] bg-wash p-8 sm:p-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end">
          <div>
            <h2 id="teach-heading" className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Teaching a course?
            </h2>
            <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.55] text-stone">
              Canvas keeps the record of a course, and students do the work somewhere else. We&apos;re
              building Scope so the work happens next to the course. If you teach, we&apos;d like to
              hear what your students need.
            </p>
          </div>
          <div className="md:justify-self-end">
            <ButtonLink href={`mailto:${site.supportEmail}?subject=Scope%20for%20my%20course`} variant="secondary" size="lg">
              Email the Scope team
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="mx-auto max-w-[1200px] px-5 py-24 text-center sm:px-8 sm:py-32">
        <h2 className="mx-auto max-w-[16ch] text-[clamp(2.25rem,5.6vw,4.25rem)] font-semibold leading-[1] tracking-[-0.045em]">
          Put every course one search away.
        </h2>
        <p className="mx-auto mt-5 max-w-[44ch] text-[17px] leading-[1.55] text-stone">
          Add Scope to Chrome, open your Canvas or Brightspace site once, and press ⌘K.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ChromeStoreButton />
          <AppStoreButton />
        </div>
      </section>
    </PageShell>
  );
}
