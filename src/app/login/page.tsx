import type { Metadata } from "next";
import { ArrowRight, Lock, Network, ShieldCheck } from "lucide-react";
import Link from "next/link";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import { sanitizeNextPath } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to the Canvascope workspace to see synced courses, documents, and connected product activity.",
};

const errorCopy: Record<string, string> = {
  oauth_start_failed: "Google sign-in could not be started.",
  auth_callback_failed: "The Google callback did not complete successfully.",
  missing_code: "The Google callback returned without an authorization code.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = sanitizeNextPath(params.next ?? null);
  const errorMessage = params.error ? errorCopy[params.error] : null;

  return (
    <PublicPageFrame>
      <section className="page-wrap grid gap-10 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-20">
        <div className="space-y-6">
          <p className="kicker">Sign in</p>
          <h1 className="text-5xl sm:text-6xl">Use the same account across Canvascope, Lectra, and the web workspace.</h1>
          <p className="section-copy text-lg">
            Sign in once, then move between the extension, Lectra, and the web
            workspace without losing access to your synced courses and documents.
          </p>

          <div className="grid gap-3">
            <div className="public-outline-card rounded-[1.25rem] p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-[var(--color-brand)]" />
                <div>
                  <p className="font-semibold">Shared identity</p>
                  <p className="mt-1 text-sm leading-7 text-[var(--color-ink-soft)]">
                    One sign-in path for the web app, the extension, and Lectra.
                  </p>
                </div>
              </div>
            </div>
            <div className="public-outline-card rounded-[1.25rem] p-4">
              <div className="flex items-start gap-3">
                <Network className="mt-1 h-5 w-5 text-[var(--color-brand)]" />
                <div>
                  <p className="font-semibold">Real data access</p>
                  <p className="mt-1 text-sm leading-7 text-[var(--color-ink-soft)]">
                    Signed-in users can inspect synced documents, course
                    snapshots, and Course Brain artifacts as they actually exist.
                  </p>
                </div>
              </div>
            </div>
            <div className="public-outline-card rounded-[1.25rem] p-4">
              <div className="flex items-start gap-3">
                <Lock className="mt-1 h-5 w-5 text-[var(--color-brand)]" />
                <div>
                  <p className="font-semibold">Still local-first where it matters</p>
                  <p className="mt-1 text-sm leading-7 text-[var(--color-ink-soft)]">
                    Signing in does not turn the extension into a tracking product.
                    Connected flows remain explicit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="public-panel rounded-[2rem] p-8 lg:p-10">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="app-label text-[var(--color-brand-deep)]">Account access</p>
              <h2 className="text-3xl">Open the Canvascope app shell</h2>
              <p className="section-copy">
                After sign-in, you will land in the authenticated workspace at{" "}
                <span className="rounded-md bg-black/5 px-2 py-1 font-mono text-sm">
                  {nextPath}
                </span>
                .
              </p>
            </div>

            {errorMessage ? (
              <div className="rounded-2xl border border-[var(--color-brand-soft-strong)] bg-[var(--color-brand-soft)] p-4 text-sm leading-7 text-[var(--color-brand-deep)]">
                {errorMessage}
              </div>
            ) : null}

            <a
              href={`/auth/login?next=${encodeURIComponent(nextPath)}`}
              className="button-primary w-full"
            >
              Continue with Google
              <ArrowRight className="h-4 w-4" />
            </a>

            <p className="text-sm leading-7 text-[var(--color-ink-soft)]">
              Prefer to browse first? Head back to the{" "}
              <Link href="/" className="font-semibold text-[var(--color-brand-deep)]">
                homepage
              </Link>{" "}
              or read the product pages for{" "}
              <Link href="/product/canvascope" className="font-semibold text-[var(--color-brand-deep)]">
                Canvascope
              </Link>{" "}
              and{" "}
              <Link href="/product/lectra" className="font-semibold text-[var(--color-brand-deep)]">
                Lectra
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </PublicPageFrame>
  );
}
