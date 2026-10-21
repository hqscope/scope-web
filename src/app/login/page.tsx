import type { Metadata } from "next";
import Link from "next/link";
import { cookies, headers } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import { buttonClasses } from "@/components/buttons";
import PageShell from "@/components/site/PageShell";
import { getSupabaseConfig } from "@/lib/supabase/config";
import { sanitizeNextPath } from "@/lib/site";
import { createFailFastAuthFetch } from "@/lib/supabase/fail-fast-auth-fetch";
import { AUTH_UNREACHABLE_HEADER } from "@/lib/auth/outage";

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

// Fails fast during an auth outage instead of waiting ~26 s (P-36).
const failFastAuthFetch = createFailFastAuthFetch();

// The proxy no longer bounces a signed-in visitor away from /login (see
// proxy.ts), so this page checks the session itself and shows a one-line
// signed-in state instead of the Google button. Server Components can't set
// cookies, so `setAll` is a no-op here; the proxy keeps the session cookie
// fresh on every navigation.
async function getSignedInUser() {
  // The proxy couldn't reach auth for this request; show the sign-in button
  // rather than wait out a second timeout (P-36).
  if ((await headers()).has(AUTH_UNREACHABLE_HEADER)) {
    return null;
  }

  const cookieStore = await cookies();
  const { url, anonKey } = getSupabaseConfig();
  const supabase = createServerClient(url, anonKey, {
    global: { fetch: failFastAuthFetch },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll() {},
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

const panelClasses = "rounded-[22px] bg-wash p-7 sm:p-10";
const panelTitleClasses =
  "text-[clamp(1.5rem,2.8vw,1.9rem)] font-semibold leading-[1.1] tracking-[-0.03em]";
const panelFootClasses =
  "mt-6 border-t border-line pt-5 text-[14.5px] leading-[1.6] text-stone [&_a]:font-semibold [&_a]:text-ink [&_a]:underline [&_a]:decoration-line [&_a]:decoration-2 [&_a]:underline-offset-4 [&_a:hover]:decoration-red";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = sanitizeNextPath(params.next ?? null);
  const errorMessage = params.error ? errorCopy[params.error] : null;
  const user = await getSignedInUser();

  return (
    <PageShell>
      <section
        aria-labelledby="login-title"
        className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-5 pb-24 pt-12 sm:px-8 sm:pb-32 sm:pt-20 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-start lg:gap-16"
      >
        <div>
          <header>
            <h1
              id="login-title"
              className="max-w-[16ch] text-[clamp(2.4rem,5.4vw,4.25rem)] font-semibold leading-[1] tracking-[-0.045em] text-balance"
            >
              One account, everywhere Scope runs.
            </h1>
            <p className="mt-6 max-w-[48ch] text-[18px] leading-[1.6] text-ink-soft">
              Signing in is optional. Search, indexing, and reading all work without it.
              An account is what lets your devices recognize each other.
            </p>
          </header>
          <ul className="mt-10 max-w-[52ch] divide-y divide-line border-y border-line">
            {reasons.map((reason) => (
              <li key={reason.title} className="flex flex-col gap-1 py-5">
                <strong className="text-[16.5px] font-semibold tracking-[-0.015em] text-ink">
                  {reason.title}
                </strong>
                <span className="text-[15.5px] leading-[1.6] text-stone">{reason.copy}</span>
              </li>
            ))}
          </ul>
        </div>

        {user ? (
          <div className={panelClasses}>
            {/* web.login.signedIn.title */}
            <h2 className={panelTitleClasses}>You&rsquo;re signed in</h2>
            {user.email ? (
              // web.login.signedIn.body
              <p className="mt-3 text-[16px] leading-[1.6] text-ink-soft wrap-anywhere">
                Signed in as {user.email}.
              </p>
            ) : null}

            {/* web.login.signedIn.cta */}
            <Link href={nextPath} className={`${buttonClasses("primary", "lg")} mt-7 w-full`}>
              Continue
            </Link>

            <p className={panelFootClasses}>
              {/* web.login.signedIn.foot */}
              Not you? Sign out from Settings in{" "}
              <Link href="/products/extension">Scope for Canvas</Link> or{" "}
              <Link href="/products/lectra">Lectra Notes</Link>.
            </p>
          </div>
        ) : (
          <div className={panelClasses}>
            <h2 className={panelTitleClasses}>Continue with Google</h2>
            <p className="mt-3 text-[16px] leading-[1.6] text-ink-soft">
              We use Google sign-in so there is no Scope password to store, lose, or leak.
            </p>

            {errorMessage ? (
              <p
                className="mt-5 rounded-[14px] bg-red-tint px-4 py-3 text-[15px] leading-[1.5] text-red-deep"
                role="alert"
              >
                {errorMessage}
              </p>
            ) : null}

            <a
              href={`/auth/login?next=${encodeURIComponent(nextPath)}`}
              className={`${buttonClasses("primary", "lg")} mt-7 w-full`}
            >
              Continue with Google
            </a>

            <p className={panelFootClasses}>
              Nothing to sign in for yet? Head back to the <Link href="/">homepage</Link>{" "}
              or read about <Link href="/products/extension">Scope for Canvas</Link> and{" "}
              <Link href="/products/lectra">Lectra Notes</Link>.
            </p>
          </div>
        )}
      </section>
    </PageShell>
  );
}
