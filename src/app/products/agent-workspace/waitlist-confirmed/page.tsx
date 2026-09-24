import type { Metadata } from "next";
import Link from "next/link";

import PenMark from "@/components/motion/PenMark";
import Sheet from "@/components/motion/Sheet";
import PageHead from "@/components/site/PageHead";
import PageShell from "@/components/site/PageShell";

import "../workspace.css";

export const metadata: Metadata = {
  title: "You're on the list",
  robots: {
    index: false,
  },
};

export default function WaitlistConfirmedPage() {
  return (
    <PageShell
      active="agent-workspace"
      cta={{
        label: "Get early access",
        href: "/products/agent-workspace#early-access",
      }}
    >
      <Sheet className="aw-confirmed" labelledBy="aw-confirmed-title">
        <PageHead
          context="Agent Workspace early access"
          title={
            <span id="aw-confirmed-title" className="aw-confirmed-title">
              You&rsquo;re on the list.
              <PenMark kind="underline" inset="auto -6px -18px -6px" delay={0.9} />
            </span>
          }
          lede={
            <p>
              We&rsquo;ll email your invite when a desk is ready, and that&rsquo;s the
              only email we&rsquo;ll send.
            </p>
          }
        >
          <Link className="btn btn-line" href="/products/agent-workspace">
            Back to Agent Workspace
          </Link>
        </PageHead>
      </Sheet>
    </PageShell>
  );
}
