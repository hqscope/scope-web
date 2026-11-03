"use client";

import { track } from "@vercel/analytics";
import { useEffect, useState } from "react";

import { buttonClasses } from "@/components/buttons";

/**
 * Scope for Canvas is a Chrome extension, so a student who scans a flyer on
 * their phone can't add it there. This hands them the link to open later on
 * their laptop: the share sheet where there is one (AirDrop, Messages, email
 * to self), otherwise a copy to the clipboard.
 */
export default function SendToLaptop({
  url,
  className = "",
}: {
  url: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function send() {
    track("send_to_laptop", { page: window.location.pathname });

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "Scope for Canvas",
          text: "Add Scope for Canvas to Chrome on your laptop.",
          url,
        });
        return;
      } catch (error) {
        // Closing the share sheet is a choice, not a failure.
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // No share sheet and no clipboard: leave the button as it is.
    }
  }

  return (
    <button type="button" onClick={send} className={`${buttonClasses("primary", "lg")} ${className}`}>
      <span aria-live="polite">{copied ? "Link copied" : "Send this to my laptop"}</span>
    </button>
  );
}
