"use client";

import { track } from "@vercel/analytics";
import type { AnchorHTMLAttributes } from "react";

export type StoreName = "chrome-web-store" | "app-store";

type StoreLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  store: StoreName;
  href: string;
};

/**
 * An outbound store link that records the click. Neither store reports the
 * referrer, so this event is the only way to tie a page on this site to an
 * install attempt. Opens in a new tab like every other store link here.
 */
export default function StoreLink({
  store,
  href,
  children,
  onClick,
  ...rest
}: StoreLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      {...rest}
      onClick={(event) => {
        track("store_click", { store, page: window.location.pathname });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
