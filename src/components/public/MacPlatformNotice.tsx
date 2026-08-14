"use client";

import { useSyncExternalStore } from "react";
import { Info } from "lucide-react";

let cachedIsMac: boolean | undefined;

function readIsMac(): boolean {
  if (cachedIsMac === undefined) {
    const ua = `${navigator.userAgent} ${navigator.platform}`;
    // Treat Mac (but not iPhone/iPad) as the "you're on the right device" case.
    cachedIsMac = /Mac/i.test(ua) && !/iPhone|iPad|iPod/i.test(ua);
  }
  return cachedIsMac;
}

const emptySubscribe = () => () => {};

// Non-Mac visitors (iPad, Windows, Android) get a gentle heads-up that this
// download runs on the Mac they want to reach. They can still download it.
export default function MacPlatformNotice() {
  const isMac = useSyncExternalStore(emptySubscribe, readIsMac, () => true);

  if (isMac) return null;

  return (
    <p
      role="note"
      className="mt-5 flex items-start gap-2.5 rounded-2xl border border-[var(--color-line)] bg-[var(--color-brand-soft)] px-4 py-3 text-sm leading-relaxed text-[var(--color-ink-soft)]"
    >
      <Info
        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand)]"
        aria-hidden="true"
      />
      <span>
        This one runs on your Mac. Open this page on the Mac you want to reach
        to set it up there.
      </span>
    </p>
  );
}
