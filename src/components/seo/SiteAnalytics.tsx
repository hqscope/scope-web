"use client";

import { Analytics, type BeforeSend } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Sign-in, auth callbacks, the admin area, and API routes carry query strings
// (`next`, `code`, `error`) that have no business in a page-view log.
const PRIVATE_PATH = /^\/(login|auth|app|api)(\/|$)/;

const beforeSend: BeforeSend = (event) => {
  try {
    if (PRIVATE_PATH.test(new URL(event.url).pathname)) {
      return null;
    }
  } catch {
    // An unparseable URL is not worth dropping the event over.
  }

  // `utm_*` is deliberately kept: ChatGPT appends utm_source=chatgpt.com to
  // the links it cites, and that is the cleanest AI-referral signal we get.
  return event;
};

/**
 * First-party, cookieless page-view and Core Web Vitals measurement, served
 * from this site's own origin. Both scripts stay inert until the matching
 * products are switched on for the project in the Vercel dashboard.
 */
export default function SiteAnalytics() {
  return (
    <>
      <Analytics beforeSend={beforeSend} />
      <SpeedInsights />
    </>
  );
}
