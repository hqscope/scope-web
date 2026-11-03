import type { Metadata } from "next";

import StartLanding from "./StartLanding";

// A campaign landing page (campus QR codes land here or on /start/<campus>).
// It repeats the home page's product story, so it stays out of search.
export const metadata: Metadata = {
  title: "Get started",
  description:
    "Three free apps for Canvas and Brightspace students: Scope for Canvas, Lectra Notes, and Polya.",
  robots: { index: false, follow: true },
};

export default function StartPage() {
  return <StartLanding path="/start" />;
}
