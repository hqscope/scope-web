import type { Metadata } from "next";
import Link from "next/link";

import PublicPageFrame from "@/components/public/PublicPageFrame";

import { awMono, awSans } from "../fonts";
import "../agent-workspace.css";
import "@/components/public/agent-workspace/waitlist.css";

export const metadata: Metadata = {
  title: "You're on the list",
  robots: {
    index: false,
  },
};

export default function WaitlistConfirmedPage() {
  return (
    <PublicPageFrame
      active="agent-workspace"
      footerVariant="slim"
      tone="dark"
      headerCta={{
        label: "Get early access",
        href: "/products/agent-workspace#early-access",
      }}
    >
      <div className={`aw-page ${awSans.variable} ${awMono.variable}`}>
        <section className="aw-confirmed">
          <p className="aw-confirmed-eyebrow">EARLY ACCESS</p>
          <h1 className="aw-confirmed-title">You&apos;re on the list.</h1>
          <p className="aw-confirmed-copy">
            We&apos;ll email your invite when a desk is ready — that&apos;s the
            only email we&apos;ll send.
          </p>
          <Link className="aw-confirmed-back" href="/products/agent-workspace">
            Back to Agent Workspace
          </Link>
        </section>
      </div>
    </PublicPageFrame>
  );
}
