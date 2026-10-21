"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChromeIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import StoreLink from "@/components/seo/StoreLink";
import { defaultCta, headerLinks, type HeaderCta, type NavSection } from "./nav";

function CtaButton({ cta, className }: { cta: HeaderCta; className: string }) {
  const content = (
    <>
      {cta.store === "chrome-web-store" && <ChromeIcon className="size-4" />}
      {cta.label}
    </>
  );
  if (cta.store) {
    return (
      <StoreLink store={cta.store} href={cta.href} className={className}>
        {content}
      </StoreLink>
    );
  }
  if (cta.href.startsWith("/") && !cta.href.startsWith("/downloads/")) {
    return (
      <Link href={cta.href} className={className}>
        {content}
      </Link>
    );
  }
  return (
    <a href={cta.href} className={className}>
      {content}
    </a>
  );
}

export default function Header({
  active = null,
  cta = defaultCta,
}: {
  active?: NavSection;
  cta?: HeaderCta;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const buttonClass =
    "inline-flex h-10 items-center justify-center gap-2 rounded-full bg-red px-4 text-[14.5px] font-semibold tracking-[-0.01em] text-white transition-colors hover:bg-red-deep";

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-200 ${
        scrolled || open
          ? "bg-paper/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl"
          : "bg-paper"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Scope home" className="rounded-md">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {headerLinks.map((item) => {
            const current = item.section != null && item.section === active;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-colors ${
                  current ? "text-ink" : "text-stone hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <CtaButton cta={cta} className={buttonClass} />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-ink hover:bg-wash lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="m5 5 10 10M15 5 5 15" /> : <path d="M3 6.5h14M3 13.5h14" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-line px-5 pb-6 pt-3 lg:hidden">
          <ul className="flex flex-col">
            {headerLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={item.section === active ? "page" : undefined}
                  className="block py-3 text-[17px] font-medium text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
