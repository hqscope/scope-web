"use client";

import { useSyncExternalStore } from "react";

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
      className="mt-6 max-w-[52ch] rounded-[14px] bg-wash px-5 py-4 text-[15px] leading-[1.55] text-ink-soft ring-1 ring-inset ring-line"
    >
      This one runs on your Mac. Open this page on the Mac you want to reach to set
      it up there.
    </p>
  );
}
