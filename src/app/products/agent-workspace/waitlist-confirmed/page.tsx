import type { Metadata } from "next";

import { ButtonLink } from "@/components/buttons";
import PageHead from "@/components/site/PageHead";
import PageShell from "@/components/site/PageShell";

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
      <div className="pb-16 sm:pb-24">
        <PageHead
          context="Agent Workspace early access"
          title={
            <span className="underline decoration-red decoration-[0.06em] underline-offset-[0.14em]">
              You&rsquo;re on the list.
            </span>
          }
          lede={
            <p>
              We&rsquo;ll email your invite when a desk is ready, and that&rsquo;s the only
              email we&rsquo;ll send.
            </p>
          }
        >
          <ButtonLink href="/products/agent-workspace" variant="secondary" size="lg">
            Back to Agent Workspace
          </ButtonLink>
        </PageHead>
      </div>
    </PageShell>
  );
}
