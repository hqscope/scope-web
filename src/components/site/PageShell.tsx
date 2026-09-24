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
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header active={active} cta={cta} />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
