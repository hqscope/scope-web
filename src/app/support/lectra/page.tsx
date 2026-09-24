import type { Metadata } from "next";
import Link from "next/link";

import Sheet from "@/components/motion/Sheet";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import DeviceFrame from "@/components/site/DeviceFrame";
import PageHead from "@/components/site/PageHead";
import PageShell from "@/components/site/PageShell";
import { publicPageMetadata } from "@/lib/seo";
import { LECTRA_APP_STORE_URL, LECTRA_DEFINITION, SUPPORT_EMAIL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

import "../../_company/company.css";

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
    title: "Importing documents",
    copy: "Use the in-app import controls or the iOS share sheet to bring PDFs into Lectra Notes. If a file does not appear, check that it is a PDF and try again from Files.",
  },
  {
    title: "Scope handoff",
    copy: "For connected workflows, sign in with the same account in Lectra Notes and Scope. Documents sent from Scope may take a moment to appear.",
  },
  {
    title: "Annotations and exports",
    copy: "If a finished PDF looks incomplete after export, reopen the document in Lectra Notes, wait for it to finish saving, then export or send the file again.",
  },
  {
    title: "Account and privacy",
    copy: "You can delete your account from inside Lectra Notes. Privacy, data use, and retention details are in the Scope privacy policy.",
  },
];

export default function LectraSupportPage() {
  return (
    <PageShell active="support">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Support", path: "/support" },
            { name: "Lectra Notes support", path: "/support/lectra" },
          ]),
        ]}
      />

      <Sheet labelledBy="lectra-support-title">
        <PageHead
          crumbs={[
            { href: "/support", label: "Support" },
            { href: "/support/lectra", label: "Lectra Notes" },
          ]}
          title={
            <span id="lectra-support-title">Help for Lectra Notes on iPhone and iPad.</span>
          }
          lede={
            <>
              <p>
                {LECTRA_DEFINITION} This page covers importing course PDFs, organizing
                readings, annotating, exporting, and moving finished files through
                connected Scope workflows.
              </p>
              <p className="small" style={{ marginTop: 14 }}>
                Looking for Lectra SA&rsquo;s fashion software or a different study app
                called Lectra? This page is only about Lectra Notes.
              </p>
            </>
          }
        />
        <div className="shell split" style={{ paddingBottom: "var(--section)" }}>
          <div className="co-stack">
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Lectra%20Notes%20support`}
              className="co-card plane"
            >
              <h2>Contact support</h2>
              <p className="co-card-line">{SUPPORT_EMAIL}</p>
              <p>
                Write with your device model, iOS or iPadOS version, and a short
                description of the issue.
              </p>
            </a>
            <StoreLink store="app-store" href={LECTRA_APP_STORE_URL} className="co-card plane">
              <h2>App Store listing</h2>
              <p>
                Download Lectra Notes, check availability, and read the current App Store
                product information.
              </p>
            </StoreLink>
          </div>
          <DeviceFrame
            src="/brand/lectra-library-ipad.png"
            alt="The Lectra Notes document library on iPad, with Documents, Scope Inbox, Studio, Projects, and Remote Desktop in the sidebar."
            width={2064}
            height={1548}
            priority
          />
        </div>
      </Sheet>

      <Sheet className="section" labelledBy="topics-title">
        <div className="shell">
          <h2 id="topics-title" className="t-head" data-focus style={{ marginBottom: 40 }}>
            Start here.
          </h2>
          <div className="co-help">
            {supportTopics.map((topic) => (
              <div key={topic.title}>
                <h3>{topic.title}</h3>
                <p>{topic.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Sheet>

      <section className="on-desk shell section co-closing" aria-labelledby="closing-title">
        <h2 id="closing-title" className="t-title" data-focus>
          More about Lectra Notes.
        </h2>
        <div className="actions">
          <Link href="/products/lectra" className="btn btn-primary">
            About Lectra Notes
          </Link>
          <Link href="/privacy" className="btn btn-line">
            Privacy policy
          </Link>
          <Link href="/terms" className="btn btn-line">
            Terms
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
