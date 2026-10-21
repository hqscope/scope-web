import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink, buttonClasses } from "@/components/buttons";
import { AppleIcon } from "@/components/icons";
import { ClosingCta, FeatureGrid } from "@/components/page-parts";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import FaqList, { type FaqItem } from "@/components/site/FaqList";
import PageShell from "@/components/site/PageShell";
import {
  breadcrumbSchema,
  faqSchema,
  lectraFeaturePageSchema,
} from "@/lib/structured-data";
import { LECTRA_APP_STORE_URL } from "@/lib/site";

import TerminalSlip from "../_visuals/TerminalSlip";

const title = "Lectra Notes: Terminal, Git & Code Editor on iPad";

const description =
  "Lectra Notes puts a real terminal, on-device Git, a code editor, and SSH on your iPad, beside your notes and PDFs, and all of it works fully offline.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/products/lectra/code",
  },
  keywords: [
    "iPad terminal app",
    "git on iPad",
    "iPad code editor",
    "SSH client iPad",
    "run Python on iPad",
    "GitHub on iPad",
    "iPad coding app for students",
    "Lectra Notes code",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    url: "/products/lectra/code",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const features = [
  {
    title: "A real terminal",
    body: "A POSIX-style shell built for iPad, with pipelines, redirection, globbing, and dozens of familiar commands, plus python and pip. There is no server behind it.",
  },
  {
    title: "Git on the device",
    body: "Clone, pull, commit, and push over HTTPS from the terminal or the Git panel. Your working tree lives on the iPad and works offline.",
  },
  {
    title: "GitHub, connected",
    body: "Link your account to browse repositories and branches, pull files into a project, and push finished work back.",
  },
  {
    title: "A serious editor",
    body: "Syntax highlighting for Python, JavaScript, C++, Rust, and more, with a command palette, a symbol outline, and project-wide search. Python also runs on the device.",
  },
  {
    title: "SSH when you need a bigger machine",
    body: "Connect to any server with a full terminal emulator. Interactive, full-screen terminal apps render exactly as they do on a desktop.",
  },
  {
    title: "All of it offline",
    body: "The shell, the editor, Git, and Python work with no connection at all. The network is for remotes, and the tools never need it.",
  },
];

const faqs: FaqItem[] = [
  {
    question: "Can I run git on an iPad?",
    answer:
      "Yes. Lectra Notes runs Git on the device itself, so you can clone, pull, commit, and push over HTTPS from the built-in terminal or the Git panel. No remote server or cloud IDE is involved.",
  },
  {
    question: "Does the terminal work offline?",
    answer:
      "Yes. The shell, its commands, the code editor, and on-device Python all work with no internet connection. You only need a connection to talk to a Git remote or an SSH server.",
  },
  {
    question: "Can I SSH into a server from Lectra Notes?",
    answer:
      "Yes. Lectra Notes includes an SSH client with a full terminal emulator and a real PTY, so interactive full-screen terminal apps behave exactly as they do in a desktop terminal.",
  },
  {
    question: "Which languages can I edit and run?",
    answer:
      "The editor highlights Python, JavaScript, C++, Rust, HTML, CSS, JSON, Markdown, and more. Python is the language that also runs on the iPad, with numpy, pandas, and matplotlib included.",
  },
  {
    question: "Is the coding workspace a paid feature?",
    answer:
      "No. Lectra Notes is free, with no tiers or subscriptions. The terminal, Git, the editor, SSH, and Python notebooks are all part of the free app.",
  },
];

/** A secondary button for the dark closing band. */
const onDarkSecondary =
  "inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-5 text-[15.5px] font-semibold tracking-[-0.01em] text-white ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/10";

function StoreActions({ onDark = false }: { onDark?: boolean }) {
  return (
    <>
      <StoreLink
        store="app-store"
        href={LECTRA_APP_STORE_URL}
        className={buttonClasses(onDark ? "inverted" : "primary", "lg")}
      >
        <AppleIcon className="size-[18px] -translate-y-px" />
        Download on the App Store
      </StoreLink>
      {onDark ? (
        <Link href="/products/lectra" className={onDarkSecondary}>
          All of Lectra Notes
        </Link>
      ) : (
        <ButtonLink href="/products/lectra" variant="secondary" size="lg">
          All of Lectra Notes
        </ButtonLink>
      )}
    </>
  );
}

export default function LectraCodePage() {
  return (
    <PageShell
      active="lectra"
      cta={{
        label: "Get Lectra Notes",
        href: LECTRA_APP_STORE_URL,
        store: "app-store",
      }}
    >
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Lectra", path: "/products/lectra" },
            { name: "Code", path: "/products/lectra/code" },
          ]),
          lectraFeaturePageSchema(title, "/products/lectra/code", description),
          faqSchema(faqs.map(({ question, answer }) => ({ question, answer }))),
        ]}
      />

      <header
        id="hero"
        className="mx-auto max-w-[1200px] px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16"
      >
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-x-2 text-[14px] text-stone">
                <li>
                  <Link href="/" className="hover:text-ink">
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  <Link href="/products/lectra" className="hover:text-ink">
                    Lectra Notes
                  </Link>
                </li>
              </ol>
            </nav>
            <h1 className="mt-6 max-w-[18ch] text-[clamp(2.4rem,5vw,3.9rem)] font-semibold leading-[1] tracking-[-0.045em] text-balance">
              A real terminal, Git, and a code editor on your iPad.
            </h1>
            <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.6] text-ink-soft">
              Lectra Notes keeps your repositories next to your readings. It has
              a POSIX-style shell, on-device Git and GitHub, a serious editor,
              and SSH for the moments when a bigger machine is the right tool.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <StoreActions />
            </div>
            <p className="mt-4 text-[14px] text-stone">Free, for iPadOS 18 and later.</p>
          </div>
          <div className="min-w-0">
            <TerminalSlip
              label="Shell history in the Lectra Notes terminal, in a project called bio-lab. Git status shows two changed files, circled in red pen, then python runs an analysis script that writes results.csv, and a pen note says it ran offline on the iPad."
              title="Terminal"
              where="bio-lab"
              lines={[
                { cmd: "git status" },
                { out: "On branch main" },
                { out: "2 files changed", circled: true },
                { cmd: "python analysis.py" },
                { out: "Wrote results.csv" },
                { cmd: 'git commit -am "Add growth analysis"' },
                { out: "[main 4c1e2a9] Add growth analysis" },
              ]}
              note="ran offline, on the iPad"
            />
          </div>
        </div>
      </header>

      <FeatureGrid
        id="features"
        title="The tools from the lab machine, on the iPad in your bag."
        features={features}
      />

      <section id="why" aria-labelledby="why-title" className="bg-wash">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-[15px] font-medium text-stone">Why it lives in a notes app</p>
            <h2
              id="why-title"
              className="mt-4 max-w-[18ch] text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.03] tracking-[-0.04em]"
            >
              The assignment and the code stay in one place.
            </h2>
          </div>
          <p className="max-w-[52ch] text-[17px] leading-[1.65] text-stone lg:pt-10">
            A problem set is a PDF, a notebook, and a repository at once. Lectra
            Notes keeps them side by side, so you read the handout, work the
            notebook, run the script, and commit the result without switching
            apps or emailing files to yourself. Notebooks have{" "}
            <Link href="/products/lectra/notebooks" className="link">
              their own page
            </Link>
            , and when you want your whole Mac instead, it&rsquo;s{" "}
            <Link href="/mac" className="link">
              a tap away
            </Link>
            .
          </p>
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby="faq-title"
        className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <h2
            id="faq-title"
            className="text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.035em]"
          >
            Coding on iPad, answered.
          </h2>
          <FaqList items={faqs} />
        </div>
      </section>

      <div id="download">
        <ClosingCta
          title="Bring your repos to your iPad."
          body="Lectra Notes is on the App Store. It is free, it works offline, and it is built for the work between the readings."
          actions={<StoreActions onDark />}
        />
      </div>
    </PageShell>
  );
}
