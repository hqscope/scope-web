import { Star } from "lucide-react";

import { GOOGLE_PREFERRED_SOURCE_URL } from "@/lib/site";

/** "on-deep" restyles the badge for the espresso footer band. */
export type PreferredSourceTone = "paper" | "on-deep";

/**
 * Google Preferred Sources badge.
 *
 * Deliberately not dressed as a Google control: it carries no Google mark and
 * makes no promise about ranking. It says what it does — opens Google's picker
 * with Scope in it — and the reader decides there, on Google's own surface.
 */
export default function PreferredSourceLink({
  tone = "paper",
  label = "Make Scope a preferred source on Google",
}: {
  tone?: PreferredSourceTone;
  label?: string;
}) {
  return (
    <a
      href={GOOGLE_PREFERRED_SOURCE_URL}
      target="_blank"
      rel="noreferrer"
      className={
        tone === "on-deep"
          ? "preferred-source preferred-source--on-deep"
          : "preferred-source"
      }
    >
      <Star className="h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}
