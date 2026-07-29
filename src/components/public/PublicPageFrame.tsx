import { ReactNode } from "react";

import PublicFooter, {
  type PublicFooterVariant,
} from "@/components/public/PublicFooter";
import PublicHeader, {
  type PublicHeaderCta,
  type PublicNavSection,
} from "@/components/public/PublicHeader";
import RevealObserver from "@/components/public/RevealObserver";

export default function PublicPageFrame({
  children,
  active = null,
  headerCta,
  footerVariant = "full",
  tone,
}: {
  children: ReactNode;
  active?: PublicNavSection;
  headerCta?: PublicHeaderCta;
  footerVariant?: PublicFooterVariant;
  /** "dark" restyles the shared chrome for dark product pages. */
  tone?: "dark";
}) {
  return (
    <div className={tone === "dark" ? "public-page public-page--dark" : "public-page"}>
      {/* Keep reveal content visible if JS never runs. */}
      <noscript>
        <style>{`.public-page [data-reveal],.public-page [data-reveal]>*{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      <RevealObserver />
      <PublicHeader active={active} cta={headerCta} />
      <main>{children}</main>
      <PublicFooter variant={footerVariant} />
    </div>
  );
}
