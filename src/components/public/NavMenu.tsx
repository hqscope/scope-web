"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

/**
 * The Products menu.
 *
 * A <details> so it works with no JavaScript and needs no popover polyfill —
 * but a bare <details> stays open until you click the summary again, which
 * leaves a panel hanging over the page after you scroll or click elsewhere.
 * This closes it the three ways people expect: click outside, Escape, or
 * following one of its own links.
 */
export default function NavMenu({
  label,
  active = false,
  children,
}: {
  label: string;
  active?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const close = () => {
      if (ref.current?.open) {
        ref.current.open = false;
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const el = ref.current;
      if (el?.open && event.target instanceof Node && !el.contains(event.target)) {
        close();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <details
      ref={ref}
      className="nav-menu"
      data-active={active ? "true" : undefined}
    >
      <summary>
        {label}
        <ChevronDown className="nav-menu-caret" aria-hidden="true" />
      </summary>
      <div
        className="nav-menu-panel"
        onClick={() => {
          if (ref.current) ref.current.open = false;
        }}
      >
        {children}
      </div>
    </details>
  );
}
