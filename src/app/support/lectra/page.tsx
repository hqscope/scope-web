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

import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import PublicPageFrame from "@/components/public/PublicPageFrame";
import { publicPageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";
import {
  LECTRA_APP_STORE_URL,
  LECTRA_DEFINITION,
  SUPPORT_EMAIL,
} from "@/lib/site";

export const metadata: Metadata = {
  ...publicPageMetadata({
    title: "Lectra Notes Support",
    description:
      "Support information for Lectra Notes, the Scope App Store app for reading, annotating, organizing, and handing off PDFs on iPhone and iPad.",
    path: "/support/lectra",
  }),
  // Safari's Smart App Banner on iPhone and iPad. The id is the one in
  // LECTRA_APP_STORE_URL; the argument sends the banner tap back here.
  itunes: {
    appId: "6759754531",
    appArgument: "https://www.canvascope.org/support/lectra",
  },
};

const supportTopics = [
  {
    icon: Download,
    title: "Importing documents",
    copy:
      "Use the in-app import controls or the iOS share sheet to bring PDFs into Lectra Notes. If a file does not appear, confirm the file is a PDF and retry from Files.",
  },
  {
    icon: RefreshCw,
    title: "Scope handoff",
    copy:
      "For connected workflows, sign in with the same account in Lectra Notes and Scope. Documents sent from Scope may take a moment to appear.",
  },
  {
    icon: FileQuestion,
    title: "Annotations and exports",
    copy:
      "If a finished PDF looks incomplete after export, reopen the document in Lectra Notes, wait for the save state to settle, then export or send the file again.",
  },
  {
    icon: Lock,
    title: "Account and privacy",
    copy:
      "Lectra Notes includes account deletion from inside the app. Privacy, data-use, and retention details are maintained in the Scope privacy policy.",
  },
];

export default function LectraSupportPage() {
  return (
    <PublicPageFrame>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Support", path: "/support" },
            { name: "Lectra Notes support", path: "/support/lectra" },
          ]),
        ]}
      />
      <section className="page-wrap legal-page">
        <div className="space-y-6">
          <p className="kicker">Lectra Notes support</p>
          <h1>
            Help for Lectra Notes on iPhone and iPad.
          </h1>
          <p className="section-copy">
            {LECTRA_DEFINITION} This page covers importing course PDFs,
            organizing readings, annotating, exporting, and moving finished
            files through connected Scope workflows.
          </p>
          <p className="section-copy">
            If you are looking for Lectra SA&apos;s fashion software or a
            different study app called Lectra, this page is not for them.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=Lectra%20Notes%20support`}
            className="public-panel rounded-[1.5rem] p-6"
          >
            <LifeBuoy className="h-5 w-5 text-[var(--color-brand)]" aria-hidden="true" />
            <h2 className="mt-4">Contact support</h2>
            <p className="mt-3 section-copy">
              Email {SUPPORT_EMAIL} with your device model, iOS or iPadOS
              version, and a short description of the issue.
            </p>
          </a>

          <StoreLink
            store="app-store"
            href={LECTRA_APP_STORE_URL}
            className="public-panel rounded-[1.5rem] p-6"
          >
            <Download className="h-5 w-5 text-[var(--color-brand)]" aria-hidden="true" />
            <h2 className="mt-4">App Store listing</h2>
            <p className="mt-3 section-copy">
              Download Lectra Notes, check availability, and review the current
              App Store product information.
            </p>
          </StoreLink>
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
                      <h3 className="">{topic.title}</h3>
                      <p className="mt-3 section-copy">{topic.copy}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-14 grid gap-4 sm:grid-cols-3">
          <Link href="/products/lectra" className="button-secondary justify-center">
            About Lectra Notes
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
