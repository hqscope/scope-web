import type { Metadata } from "next";
import { ArrowRight, Lock, Network, ShieldCheck } from "lucide-react";
import Link from "next/link";

import PublicPageFrame from "@/components/public/PublicPageFrame";
import { sanitizeNextPath } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "One account across the Scope extension, Lectra, and everything that moves between them.",
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
      <section className="page-wrap legal-page legal-page--split">
        <div className="space-y-6">
          <p className="kicker">Sign in</p>
          <h1>One account, everywhere Scope runs.</h1>
          <p className="section-copy">
            Signing in is optional. Search, indexing, and reading all work
            without it — an account is what lets your devices recognise each
            other.
          </p>

          <div className="grid gap-3">
            <div className="public-outline-card rounded-[1.25rem] p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-5 w-5 text-[var(--color-brand)]" />
                <div>
                  <p className="font-semibold">One sign-in</p>
                  <p className="mt-1 text-sm leading-7 text-[var(--color-ink-soft)]">
                    The same account across the extension, Lectra on iPad, and
                    Lectra for Mac.
                  </p>
                </div>
              </div>
            </div>
            <div className="public-outline-card rounded-[1.25rem] p-4">
              <div className="flex items-start gap-3">
                <Network className="mt-1 h-5 w-5 text-[var(--color-brand)]" />
                <div>
                  <p className="font-semibold">Devices that find each other</p>
                  <p className="mt-1 text-sm leading-7 text-[var(--color-ink-soft)]">
                    Send a reading from the browser and it lands on the right
                    iPad, then comes back to the right upload.
                  </p>
                </div>
              </div>
            </div>
            <div className="public-outline-card rounded-[1.25rem] p-4">
              <div className="flex items-start gap-3">
                <Lock className="mt-1 h-5 w-5 text-[var(--color-brand)]" />
                <div>
                  <p className="font-semibold">Still local-first</p>
                  <p className="mt-1 text-sm leading-7 text-[var(--color-ink-soft)]">
                    Your course index stays on your device. Signing in does not
                    change that, and nothing leaves without you asking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="public-panel rounded-[2rem] p-8 lg:p-10">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="kicker">Sign in</p>
              <h2>Continue with Google</h2>
              <p className="section-copy">
                We use Google sign-in so there is no Scope password to store,
                lose, or leak.
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
              Nothing to sign in for yet? Head back to the{" "}
              <Link href="/" className="font-semibold text-[var(--color-brand-deep)]">
                homepage
              </Link>{" "}
              or read the product pages for{" "}
              <Link href="/products/extension" className="font-semibold text-[var(--color-brand-deep)]">
                Scope
              </Link>{" "}
              and{" "}
              <Link href="/products/lectra" className="font-semibold text-[var(--color-brand-deep)]">
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
