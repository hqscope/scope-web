"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import StoreLink from "@/components/seo/StoreLink";

import { ChevronIcon, CloseIcon, MenuIcon } from "./Icons";
import Mark from "./Mark";
import {
  defaultCta,
  productLinks,
  productSections,
  siteLinks,
  type HeaderCta,
  type NavSection,
} from "./nav";

function Cta({ cta, className }: { cta: HeaderCta; className: string }) {
  if (cta.store) {
    return (
      <StoreLink store={cta.store} href={cta.href} className={className}>
        {cta.label}
      </StoreLink>
    );
  }

  if (cta.href.startsWith("/") && !cta.href.startsWith("/downloads/")) {
    return (
      <Link href={cta.href} className={className}>
        {cta.label}
      </Link>
    );
  }

  return (
    <a href={cta.href} className={className}>
      {cta.label}
    </a>
  );
}

const noopSubscribe = () => () => {};

function ProductsMenu({ active }: { active: boolean }) {
  const pathname = usePathname();
  // The menu remembers the page it was opened on, so navigating anywhere
  // closes it without an effect resetting state.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = useCallback(
    (next: boolean | ((current: boolean) => boolean)) =>
      setOpenOn((current) => {
        const wasOpen = current === pathname;
        const value = typeof next === "function" ? next(wasOpen) : next;
        return value ? pathname : null;
      }),
    [pathname],
  );
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointer = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        wrapRef.current?.querySelector("button")?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <div
      className="nav-menu"
      ref={wrapRef}
      data-active={active}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        Products
        <m.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
          style={{ display: "inline-flex" }}
        >
          <ChevronIcon size={16} />
        </m.span>
      </button>

      <AnimatePresence>
        {open ? (
          <m.div
            id={panelId}
            className="nav-menu-panel paper"
            initial={{ opacity: 0, y: -6, scale: 0.97, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -4, scale: 0.98, filter: "blur(4px)" }}
            transition={{ duration: 0.24, ease: [0.2, 0.7, 0.1, 1] }}
          >
            {productLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
                <span>{link.where}</span>
              </Link>
            ))}
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function MenuSheet({
  onClose,
  cta,
  pathname,
}: {
  onClose: () => void;
  cta: HeaderCta;
  pathname: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      // The sheet is aria-modal and covers the page, so Tab wraps inside it
      // instead of walking into the hidden page behind.
      const sheet = sheetRef.current;
      if (event.key !== "Tab" || !sheet) return;
      const focusable = sheet.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      const inside = active instanceof Node && sheet.contains(active);
      if (event.shiftKey && (active === first || !inside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !inside)) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const groups = [
    { label: "Products", links: productLinks },
    { label: "Explore", links: siteLinks },
  ];

  let index = 0;

  return (
    <m.div
      ref={sheetRef}
      className="menu-sheet paper"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.1, 1] }}
    >
      <div className="menu-sheet-top">
        <Link href="/" className="brand" onClick={onClose}>
          <Mark />
          Scope
        </Link>
        <button
          ref={closeRef}
          type="button"
          className="menu-toggle"
          onClick={onClose}
          aria-label="Close menu"
        >
          <CloseIcon size={24} />
        </button>
      </div>

      <nav className="menu-sheet-body" aria-label="Site">
        {groups.map((group) => (
          <div key={group.label} className="menu-sheet-group">
            <p>{group.label}</p>
            {group.links.map((link) => {
              const delay = 0.12 + index++ * 0.035;
              return (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay, duration: 0.5, ease: [0.2, 0.7, 0.1, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}
                    {link.where ? <span>{link.where}</span> : null}
                  </Link>
                </m.div>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="menu-sheet-cta">
        <Cta cta={cta} className="btn btn-primary" />
      </div>
    </m.div>
  );
}

export default function Header({
  active = null,
  cta = defaultCta,
}: {
  active?: NavSection;
  cta?: HeaderCta;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpenOn, setSheetOpenOn] = useState<string | null>(null);
  const sheetOpen = sheetOpenOn === pathname;
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  // True only in the browser, so the portal never renders on the server.
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeSheet = useCallback(() => {
    setSheetOpenOn(null);
    // The Products dropdown returns focus to its own opener on close; the
    // mobile sheet's close button and Escape handler need the same, or
    // keyboard focus is dropped to <body> once the sheet unmounts.
    menuToggleRef.current?.focus();
  }, []);
  const productsActive = active !== null && productSections.includes(active);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="shell site-header-inner">
        <Link href="/" className="brand" aria-label="Scope home">
          <Mark />
          <span aria-hidden="true">Scope</span>
        </Link>

        <nav className="site-nav" aria-label="Main">
          <ProductsMenu active={productsActive} />
          {siteLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active === link.section ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-header-actions">
          <Cta cta={cta} className="btn btn-primary site-header-cta" />
          <button
            ref={menuToggleRef}
            type="button"
            className="menu-toggle"
            aria-label="Open menu"
            aria-expanded={sheetOpen}
            onClick={() => setSheetOpenOn(pathname)}
          >
            <MenuIcon size={24} />
          </button>
        </div>
      </div>

      {/* Portalled: the scrolled header's backdrop-filter would otherwise
          become the containing block for this fixed sheet. */}
      {mounted
        ? createPortal(
            <AnimatePresence>
              {sheetOpen ? (
                <MenuSheet cta={cta} pathname={pathname} onClose={closeSheet} />
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </header>
  );
}
