import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  FileQuestion,
  LifeBuoy,
  Lock,
  RefreshCw,
} from "lucide-react";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import { LECTRA_APP_STORE_URL, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lectra Notes Support | Canvascope",
  description:
    "Support information for Lectra Notes, the Canvascope App Store app for reading, annotating, organizing, and handing off PDFs on iPhone and iPad.",
  alternates: {
    canonical: "/support/lectra",
  },
  openGraph: {
    title: "Lectra Notes Support | Canvascope",
    description:
      "Get help with Lectra Notes imports, annotations, account access, privacy, and Canvascope document handoff.",
    type: "website",
    url: "/support/lectra",
  },
};

const supportTopics = [
  {
    icon: Download,
    title: "Importing documents",
    copy:
      "Use the in-app import controls or the iOS share sheet to bring PDFs into Lectra. If a file does not appear, confirm the file is a PDF and retry from Files.",
  },
  {
    icon: RefreshCw,
    title: "Canvascope handoff",
    copy:
      "For connected workflows, sign in with the same account in Lectra and Canvascope. Documents sent from Canvascope may take a moment to appear if realtime delivery falls back to polling.",
  },
  {
    icon: FileQuestion,
    title: "Annotations and exports",
    copy:
      "If a finished PDF looks incomplete after export, reopen the document in Lectra, wait for the save state to settle, then export or send the file again.",
  },
  {
    icon: Lock,
    title: "Account and privacy",
    copy:
      "Lectra includes account deletion from inside the app. Privacy, data-use, and retention details are maintained in the Canvascope privacy policy.",
  },
];

export default function LectraSupportPage() {
  return (
    <PublicPageFrame>
      <section className="page-wrap max-w-4xl py-14 lg:py-20">
        <div className="space-y-6">
          <p className="kicker">Lectra Notes support</p>
          <h1 className="text-5xl sm:text-6xl">
            Help for Lectra Notes on iPhone and iPad.
          </h1>
          <p className="section-copy text-lg">
            Lectra Notes is the Canvascope App Store app for importing course
            PDFs, organizing readings, annotating with Apple Pencil where
            supported, and moving finished files through connected Canvascope
            workflows.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=Lectra%20Notes%20support`}
            className="public-panel rounded-[1.5rem] p-6"
          >
            <LifeBuoy className="h-5 w-5 text-[var(--color-brand)]" aria-hidden="true" />
            <h2 className="mt-4 text-2xl">Contact support</h2>
            <p className="mt-3 section-copy">
              Email {SUPPORT_EMAIL} with your device model, iOS or iPadOS
              version, and a short description of the issue.
            </p>
          </a>

          <a
            href={LECTRA_APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="public-panel rounded-[1.5rem] p-6"
          >
            <Download className="h-5 w-5 text-[var(--color-brand)]" aria-hidden="true" />
            <h2 className="mt-4 text-2xl">App Store listing</h2>
            <p className="mt-3 section-copy">
              Download Lectra Notes, check availability, and review the current
              App Store product information.
            </p>
          </a>
        </div>

        <section className="mt-14 space-y-6">
          <div>
            <p className="kicker">Common help topics</p>
            <h2 className="mt-3 text-4xl">Start here.</h2>
          </div>
          <div className="grid gap-4">
            {supportTopics.map((topic) => {
              const Icon = topic.icon;

              return (
                <article key={topic.title} className="public-panel rounded-[1.5rem] p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-[var(--color-brand-soft)] p-3 text-[var(--color-brand)]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-2xl">{topic.title}</h3>
                      <p className="mt-3 section-copy">{topic.copy}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-14 grid gap-4 sm:grid-cols-3">
          <Link href="/product/lectra" className="button-secondary justify-center">
            Marketing page
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
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
