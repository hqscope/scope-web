import type { Metadata } from "next";
import Link from "next/link";

import Sheet from "@/components/motion/Sheet";
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

import "../lectra.css";
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
    copy: "A POSIX-style shell built for iPad, with pipelines, redirection, globbing, and dozens of familiar commands, plus python and pip. There is no server behind it.",
  },
  {
    title: "Git on the device",
    copy: "Clone, pull, commit, and push over HTTPS from the terminal or the Git panel. Your working tree lives on the iPad and works offline.",
  },
  {
    title: "GitHub, connected",
    copy: "Link your account to browse repositories and branches, pull files into a project, and push finished work back.",
  },
  {
    title: "A serious editor",
    copy: "Syntax highlighting for Python, JavaScript, C++, Rust, and more, with a command palette, a symbol outline, and project-wide search. Python also runs on the device.",
  },
  {
    title: "SSH when you need a bigger machine",
    copy: "Connect to any server with a full terminal emulator. Interactive, full-screen terminal apps render exactly as they do on a desktop.",
  },
  {
    title: "All of it offline",
    copy: "The shell, the editor, Git, and Python work with no connection at all. The network is for remotes, and the tools never need it.",
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

function StoreActions() {
  return (
    <>
      <StoreLink
        store="app-store"
        href={LECTRA_APP_STORE_URL}
        className="btn btn-primary"
      >
        Download on the App Store
      </StoreLink>
      <Link href="/products/lectra" className="btn btn-line">
        All of Lectra Notes
      </Link>
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

      <Sheet labelledBy="code-title">
        <header className="shell page-head lx-hero" id="hero">
          <div>
            <nav aria-label="Breadcrumb">
              <ol className="crumbs">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/products/lectra">Lectra Notes</Link>
                </li>
              </ol>
            </nav>
            <h1 id="code-title" className="t-title" data-focus>
              A real terminal, Git, and a code editor on your iPad.
            </h1>
            <div className="lede">
              Lectra Notes keeps your repositories next to your readings. It has
              a POSIX-style shell, on-device Git and GitHub, a serious editor,
              and SSH for the moments when a bigger machine is the right tool.
            </div>
            <div className="actions">
              <StoreActions />
            </div>
            <p className="btn-note">Free, for iPadOS 18 and later.</p>
          </div>
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
        </header>
      </Sheet>

      <Sheet className="section" id="features" labelledBy="features-title">
        <div className="shell">
          <h2 id="features-title" className="t-head lx-intro" data-focus>
            The tools from the lab machine, on the iPad in your bag.
          </h2>
          <div className="idea-grid idea-grid--3">
            {features.map((item) => (
              <div key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Sheet>

      <Sheet className="section" id="why" labelledBy="why-title">
        <div className="shell split split--top">
          <div>
            <p className="lx-tag">Why it lives in a notes app</p>
            <h2 id="why-title" className="t-head" data-focus>
              The assignment and the code stay in one place.
            </h2>
          </div>
          <p className="copy lx-body">
            A problem set is a PDF, a notebook, and a repository at once. Lectra
            Notes keeps them side by side, so you read the handout, work the
            notebook, run the script, and commit the result without switching
            apps or emailing files to yourself. Notebooks have{" "}
            <Link href="/products/lectra/notebooks">their own page</Link>, and
            when you want your whole Mac instead, it&rsquo;s{" "}
            <Link href="/mac">a tap away</Link>.
          </p>
        </div>
      </Sheet>

      <Sheet className="section" id="faq" labelledBy="faq-title">
        <div className="shell shell-narrow">
          <h2 id="faq-title" className="t-head lx-faq-head" data-focus>
            Coding on iPad, answered.
          </h2>
          <FaqList items={faqs} />
        </div>
      </Sheet>

      <section
        className="on-desk shell section lx-closing"
        id="download"
        aria-labelledby="closing-title"
      >
        <h2 id="closing-title" className="t-title" data-focus>
          Bring your repos to your iPad.
        </h2>
        <p className="lede">
          Lectra Notes is on the App Store. It is free, it works offline, and it
          is built for the work between the readings.
        </p>
        <div className="actions">
          <StoreActions />
        </div>
      </section>
    </PageShell>
  );
}
