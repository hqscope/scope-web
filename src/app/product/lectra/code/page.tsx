import type { Metadata } from "next";
import Link from "next/link";
import {
  Code2,
  GitBranch,
  Github,
  TerminalSquare,
  Waypoints,
  WifiOff,
} from "lucide-react";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import LectraWorkspacePreview from "@/components/public/LectraWorkspacePreview";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  lectraFeaturePageSchema,
  type FaqEntry,
} from "@/lib/structured-data";
import { LECTRA_APP_STORE_URL } from "@/lib/site";

const description =
  "Lectra Notes puts a real terminal, on-device Git, a code editor, and SSH on your iPad — beside your notes and PDFs, working fully offline.";

export const metadata: Metadata = {
  title: "Lectra Notes — Terminal, Git & Code Editor on iPad",
  description,
  alternates: {
    canonical: "/product/lectra/code",
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
    title: "Lectra Notes — Terminal, Git & Code Editor on iPad",
    description,
    type: "website",
    url: "/product/lectra/code",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lectra Notes — Terminal, Git & Code Editor on iPad",
    description,
  },
};

const features = [
  {
    icon: TerminalSquare,
    title: "A real terminal",
    copy:
      "A POSIX-style shell built for iPad — pipelines, redirection, globbing, and dozens of familiar commands, plus python and pip. No server behind it.",
  },
  {
    icon: GitBranch,
    title: "Git on the device",
    copy:
      "Clone, pull, commit, and push over HTTPS from the terminal or the Git panel. Your working tree lives on the iPad and works offline.",
  },
  {
    icon: Github,
    title: "GitHub, connected",
    copy:
      "Link your account to browse repositories and branches, pull files into a project, and push finished work back.",
  },
  {
    icon: Code2,
    title: "A serious editor",
    copy:
      "Syntax highlighting for Python, JavaScript, C++, Rust, and more, with a command palette, symbol outline, and project-wide search. Python also runs on device.",
  },
  {
    icon: Waypoints,
    title: "SSH when you need a bigger machine",
    copy:
      "Connect to any server with a full terminal emulator — interactive, full-screen terminal apps render exactly as they do on a desktop.",
  },
  {
    icon: WifiOff,
    title: "All of it offline",
    copy:
      "The shell, the editor, Git, and Python work with no connection at all. The network is for remotes, not for the tools.",
  },
];

const faqs: FaqEntry[] = [
  {
    question: "Can I run git on an iPad?",
    answer:
      "Yes. Lectra Notes runs Git on the device itself — clone, pull, commit, and push over HTTPS, from the built-in terminal or the Git panel. No remote server or cloud IDE is involved.",
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
      "No. Lectra Notes is free, with no tiers or subscriptions — the terminal, Git, the editor, SSH, and Python notebooks are all part of the free app.",
  },
];

export default function LectraCodePage() {
  return (
    <PublicPageFrame
      active="lectra"
      footerVariant="slim"
      headerCta={{ label: "Get Lectra", href: LECTRA_APP_STORE_URL, external: true }}
    >
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Lectra", path: "/product/lectra" },
            { name: "Code", path: "/product/lectra/code" },
          ]),
          lectraFeaturePageSchema(
            "Lectra Notes — Terminal, Git & Code Editor on iPad",
            "/product/lectra/code",
            description,
          ),
          faqSchema(faqs),
        ]}
      />

      <section className="page-wrap centered-hero" id="hero">
        <div data-reveal>
          <p className="kicker">Lectra Notes · Code</p>
          <h1>A real terminal, Git, and a code editor — on your iPad.</h1>
          <p className="centered-hero-lede">
            Lectra Notes keeps your repositories next to your readings: a
            POSIX-style shell, on-device Git and GitHub, a serious editor, and
            SSH for the moments a bigger machine is the right tool.
          </p>
          <div className="pill-actions">
            <a
              href={LECTRA_APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="button-primary"
            >
              Download on the App Store
            </a>
            <Link href="/product/lectra" className="button-secondary">
              All of Lectra Notes →
            </Link>
          </div>
          <p className="hero-note">iPadOS 18+ · Free</p>
        </div>

        <div
          data-reveal
          style={{ marginTop: "clamp(3rem, 6vw, 4.5rem)" }}
        >
          <LectraWorkspacePreview />
        </div>
      </section>

      <section className="page-wrap section-pad" id="features">
        <h2 className="sr-only">Coding features in Lectra Notes</h2>
        <div className="plain-grid" data-reveal>
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title}>
                <Icon
                  className="h-5 w-5 text-[var(--color-brand)]"
                  aria-hidden="true"
                />
                <h3 className="mt-3">{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-band" id="why">
        <div className="page-wrap split-section" style={{ paddingBlock: 0 }}>
          <div data-reveal>
            <p className="kicker kicker-muted">Why it lives in a notes app</p>
            <h2>The assignment and the code stay in one place.</h2>
          </div>
          <div data-reveal>
            <p
              style={{
                color: "var(--color-ink-soft)",
                fontSize: "1rem",
                lineHeight: 1.65,
              }}
            >
              A problem set is a PDF, a notebook, and a repository at once.
              Lectra Notes keeps them side by side — read the handout, work the
              notebook, run the script, commit the result — without switching
              apps or emailing files to yourself. Notebooks have{" "}
              <Link href="/product/lectra/notebooks">their own page</Link>, and
              when you want your whole Mac instead, it&apos;s{" "}
              <Link href="/mac">a tap away</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="page-wrap faq-section" id="faq">
        <div className="section-heading" data-reveal>
          <p className="kicker">Questions</p>
          <h2>Coding on iPad, answered.</h2>
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

      <section className="page-wrap final-cta" id="download" data-reveal>
        <div>
          <h2>Bring your repos to your iPad.</h2>
          <p>
            <a href={LECTRA_APP_STORE_URL} target="_blank" rel="noreferrer">
              Lectra Notes on the App Store
            </a>{" "}
            — free, offline, and built for the work between the readings.
          </p>
        </div>
      </section>
    </PublicPageFrame>
  );
}
