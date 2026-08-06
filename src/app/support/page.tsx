import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Chrome,
  LifeBuoy,
  Mail,
  Monitor,
  Tablet,
  UserRound,
} from "lucide-react";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import { CHROME_WEB_STORE_URL, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support | Scope",
  description:
    "Get help with Scope for Canvas, Lectra Notes, Agent Workspace, and your Scope account. Email canvascopeextension@gmail.com and a person will read it.",
  alternates: {
    canonical: "/support",
  },
  openGraph: {
    title: "Support | Scope",
    description:
      "Contact Scope support, find help for each app, and manage your account and data.",
    type: "website",
    url: "/support",
  },
};

const mailtoHref = `mailto:${SUPPORT_EMAIL}?subject=Scope%20support`;

const productHelp = [
  {
    icon: Chrome,
    title: "Scope for Canvas",
    copy:
      "If search comes up empty or a course looks out of date, open a course page in your LMS and let it finish indexing, then search again. Tell us your school and the course you were looking at and we can narrow it down quickly.",
    action: { href: "/product/scope", label: "About the extension" },
  },
  {
    icon: Tablet,
    title: "Lectra Notes",
    copy:
      "Help for importing PDFs, annotating, exporting, and moving documents between Lectra and Scope lives on its own page.",
    action: { href: "/support/lectra", label: "Lectra support" },
  },
  {
    icon: Monitor,
    title: "Agent Workspace",
    copy:
      "Agent Workspace is still in early access. If you are on the list and something is broken, email us and mention which build you are running.",
    action: { href: "/product/agent-workspace", label: "About Agent Workspace" },
  },
  {
    icon: UserRound,
    title: "Account and data",
    copy:
      "Sign-in trouble, deleting your account, or a question about what we store and why. You can also disconnect Scope from your Google Account at any time.",
    action: { href: "/privacy", label: "Privacy policy" },
  },
];

const emailChecklist = [
  "Which app you were using: the Chrome extension, Lectra, or the website",
  "Your school and the course, if it is a search or indexing problem",
  "What you expected to happen, and what happened instead",
  "A screenshot, if the problem is something you can see",
];

export default function SupportPage() {
  return (
    <PublicPageFrame>
      <section className="page-wrap max-w-4xl py-14 lg:py-20">
        <div className="space-y-6">
          <p className="kicker">Support</p>
          <h1 className="text-5xl sm:text-6xl">Something not working? Tell us.</h1>
          <p className="section-copy text-lg">
            Scope is built by a small team, and the same people who write the
            software answer the email. There is no ticket queue and no phone
            tree — write to us and you will hear back from a person.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a href={mailtoHref} className="public-panel rounded-[1.5rem] p-6">
            <Mail className="h-5 w-5 text-[var(--color-brand)]" aria-hidden="true" />
            <h2 className="mt-4 text-2xl">Email us</h2>
            <p className="mt-3 section-copy">
              {SUPPORT_EMAIL}
            </p>
            <p className="mt-3 section-copy">
              Bugs, questions, account help, feature requests, or anything about
              how your data is handled. Replies usually take a day or two.
            </p>
          </a>

          <a
            href={CHROME_WEB_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="public-panel rounded-[1.5rem] p-6"
          >
            <LifeBuoy className="h-5 w-5 text-[var(--color-brand)]" aria-hidden="true" />
            <h2 className="mt-4 text-2xl">Reinstall or update</h2>
            <p className="mt-3 section-copy">
              A surprising number of problems clear up after updating to the
              latest version from the Chrome Web Store and reloading your LMS
              tab.
            </p>
          </a>
        </div>

        <section className="mt-14 space-y-6">
          <div>
            <p className="kicker">Get a faster answer</p>
            <h2 className="mt-3 text-4xl">What to put in the email.</h2>
          </div>
          <div className="public-panel rounded-[1.5rem] p-6">
            <ul className="section-copy space-y-3">
              {emailChecklist.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand)]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 section-copy">
              Please do not send passwords or LMS login details. We never need
              them, and we will never ask for them.
            </p>
          </div>
        </section>

        <section className="mt-14 space-y-6">
          <div>
            <p className="kicker">By product</p>
            <h2 className="mt-3 text-4xl">Where to look first.</h2>
          </div>
          <div className="grid gap-4">
            {productHelp.map((topic) => {
              const Icon = topic.icon;

              return (
                <article
                  key={topic.title}
                  className="public-panel rounded-[1.5rem] p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-[var(--color-brand-soft)] p-3 text-[var(--color-brand)]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-2xl">{topic.title}</h3>
                      <p className="mt-3 section-copy">{topic.copy}</p>
                      <Link
                        href={topic.action.href}
                        className="text-link mt-4 inline-block"
                      >
                        {topic.action.label} →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-14 grid gap-4 sm:grid-cols-3">
          <a href={mailtoHref} className="button-primary justify-center">
            Email support
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <Link href="/privacy" className="button-secondary justify-center">
            Privacy policy
          </Link>
          <Link href="/terms" className="button-secondary justify-center">
            Terms
          </Link>
        </section>
      </section>
    </PublicPageFrame>
  );
}
