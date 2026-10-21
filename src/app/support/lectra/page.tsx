import type { Metadata } from "next";

import { ButtonLink } from "@/components/buttons";
import JsonLd from "@/components/seo/JsonLd";
import StoreLink from "@/components/seo/StoreLink";
import DeviceFrame from "@/components/site/DeviceFrame";
import PageHead from "@/components/site/PageHead";
import PageShell from "@/components/site/PageShell";
import { publicPageMetadata } from "@/lib/seo";
import { LECTRA_APP_STORE_URL, LECTRA_DEFINITION, SUPPORT_EMAIL } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

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

const cardClasses =
  "group flex flex-col rounded-[22px] bg-wash p-7 transition-colors hover:bg-[#efede8] sm:p-8";

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

      <PageHead
        crumbs={[
          { href: "/support", label: "Support" },
          { href: "/support/lectra", label: "Lectra Notes" },
        ]}
        title="Help for Lectra Notes on iPhone and iPad."
        lede={
          <>
            <p>
              {LECTRA_DEFINITION} This page covers importing course PDFs, organizing
              readings, annotating, exporting, and moving finished files through
              connected Scope workflows.
            </p>
            <p className="text-[15px] leading-[1.6] text-stone">
              Looking for Lectra SA&rsquo;s fashion software or a different study app
              called Lectra? This page is only about Lectra Notes.
            </p>
          </>
        }
      />

      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-5 pb-20 sm:px-8 sm:pb-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-4">
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=Lectra%20Notes%20support`}
            className={cardClasses}
          >
            <h2 className="text-[clamp(1.4rem,2.6vw,1.75rem)] font-semibold leading-tight tracking-[-0.03em]">
              Contact support
            </h2>
            <p className="mt-2 text-[16px] font-semibold text-ink underline decoration-line decoration-2 underline-offset-4 wrap-anywhere group-hover:decoration-red">
              {SUPPORT_EMAIL}
            </p>
            <p className="mt-4 text-[15.5px] leading-[1.6] text-ink-soft">
              Write with your device model, iOS or iPadOS version, and a short
              description of the issue.
            </p>
          </a>
          <StoreLink store="app-store" href={LECTRA_APP_STORE_URL} className={cardClasses}>
            <h2 className="text-[clamp(1.4rem,2.6vw,1.75rem)] font-semibold leading-tight tracking-[-0.03em] group-hover:text-red">
              App Store listing
            </h2>
            <p className="mt-4 text-[15.5px] leading-[1.6] text-ink-soft">
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
          sizes="(max-width: 1024px) 100vw, 640px"
          priority
        />
      </div>

      <section aria-labelledby="topics-title" className="border-y border-line bg-wash">
        <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
          <h2
            id="topics-title"
            className="text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.03] tracking-[-0.04em]"
          >
            Start here.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-x-12 md:grid-cols-2">
            {supportTopics.map((topic) => (
              <div key={topic.title} className="border-t border-line py-7">
                <h3 className="text-[17px] font-semibold tracking-[-0.015em]">{topic.title}</h3>
                <p className="mt-2 max-w-[52ch] text-[15.5px] leading-[1.6] text-stone">
                  {topic.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="closing-title"
        className="mx-auto max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32"
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2
            id="closing-title"
            className="max-w-[16ch] text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.03] tracking-[-0.04em]"
          >
            More about Lectra Notes.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/products/lectra" size="lg">
              About Lectra Notes
            </ButtonLink>
            <ButtonLink href="/privacy" variant="secondary" size="lg">
              Privacy policy
            </ButtonLink>
            <ButtonLink href="/terms" variant="secondary" size="lg">
              Terms
            </ButtonLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
