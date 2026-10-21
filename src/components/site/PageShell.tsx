import type { ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";
import type { HeaderCta, NavSection } from "./nav";

/** Every public page: skip link, header, main, footer. */
export default function PageShell({
  children,
  active = null,
  cta,
}: {
  children: ReactNode;
  active?: NavSection;
  cta?: HeaderCta;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
      >
        Skip to content
      </a>
      <Header active={active} cta={cta} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
