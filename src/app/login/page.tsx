import type { Metadata } from "next";
import Link from "next/link";

import Sheet from "@/components/motion/Sheet";
import PageShell from "@/components/site/PageShell";
import { sanitizeNextPath } from "@/lib/site";

import "../_company/company.css";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "One account across the Scope extension, Lectra Notes, and everything that moves between them.",
  alternates: {
    canonical: "/login",
  },
  // A sign-in form has no place in search results. Kept out of robots.txt
  // so crawlers can still read this tag.
  robots: {
    index: false,
    follow: true,
  },
};

const errorCopy: Record<string, string> = {
  oauth_start_failed: "We couldn't start Google sign-in. Please try again.",
  auth_callback_failed: "Google sign-in didn't finish. Please try again.",
  missing_code: "Google sent you back before sign-in was complete. Please try again.",
};

const reasons = [
  {
    title: "One sign-in",
    copy: "The same account works across the extension, Lectra Notes on iPad, and Lectra for Mac.",
  },
  {
    title: "Devices that find each other",
    copy: "Send a reading from the browser and it lands on the right iPad, then comes back to the right upload.",
  },
  {
    title: "Still local-first",
    copy: "Your course index stays on your device, and signing in does not change that. Cloud features stay optional and clearly marked.",
  },
];

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = sanitizeNextPath(params.next ?? null);
  const errorMessage = params.error ? errorCopy[params.error] : null;

  return (
    <PageShell>
      <Sheet className="section" labelledBy="login-title">
        <div className="shell co-login">
          <div>
            <header className="page-head" style={{ paddingTop: 0 }}>
              <h1 id="login-title" className="t-title" data-focus>
                One account, everywhere Scope runs.
              </h1>
              <p className="lede">
                Signing in is optional. Search, indexing, and reading all work without it.
                An account is what lets your devices recognize each other.
              </p>
            </header>
            <ul className="feature-list">
              {reasons.map((reason) => (
                <li key={reason.title}>
                  <strong>{reason.title}</strong>
                  <span>{reason.copy}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="co-signin plane">
            <h2>Continue with Google</h2>
            <p>
              We use Google sign-in so there is no Scope password to store, lose, or leak.
            </p>

            {errorMessage ? (
              <p className="co-signin-error" role="alert">
                {errorMessage}
              </p>
            ) : null}

            <a
              href={`/auth/login?next=${encodeURIComponent(nextPath)}`}
              className="btn btn-primary"
            >
              Continue with Google
            </a>

            <p className="co-signin-foot co-inline">
              Nothing to sign in for yet? Head back to the <Link href="/">homepage</Link>{" "}
              or read about <Link href="/products/extension">Scope for Canvas</Link> and{" "}
              <Link href="/products/lectra">Lectra Notes</Link>.
            </p>
          </div>
        </div>
      </Sheet>
    </PageShell>
  );
}
