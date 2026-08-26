"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

/**
 * The Products menu.
 *
 * A <details> so it still works with no JavaScript and needs no popover
 * polyfill. On a mouse it opens on hover and closes when the pointer leaves;
 * on touch and by keyboard it stays a click-to-toggle disclosure, which is
 * what those inputs expect and what screen readers announce.
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

  const close = () => {
    if (ref.current?.open) {
      ref.current.open = false;
    }
  };

  useEffect(() => {
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

  /* Only on a real mouse. A touch tap also fires pointerenter, which would
     open the menu and then immediately have the click close it again. */
  const canHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <details
      ref={ref}
      className="nav-menu"
      data-active={active ? "true" : undefined}
      onPointerEnter={() => {
        if (canHover() && ref.current) {
          ref.current.open = true;
        }
      }}
      onPointerLeave={() => {
        if (!canHover()) return;
        close();
        // Otherwise the summary keeps a focus ring from the click that a
        // hover user never meant to make. Keyboard focus is unaffected.
        if (document.activeElement === ref.current?.firstElementChild) {
          (document.activeElement as HTMLElement).blur();
        }
      }}
    >
      <summary>
        {label}
        <ChevronDown className="nav-menu-caret" aria-hidden="true" />
      </summary>
      <div className="nav-menu-panel" onClick={close}>
        {children}
      </div>
    </details>
  );
}
