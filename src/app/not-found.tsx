import type { Metadata } from "next";
import Link from "next/link";

import PenMark from "@/components/motion/PenMark";
import Sheet from "@/components/motion/Sheet";
import PageShell from "@/components/site/PageShell";

import "./_company/company.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const places = [
  {
    href: "/",
    label: "The homepage",
    copy: "Start from the top and find your way from there.",
  },
  {
    href: "/products/extension",
    label: "Scope for Canvas",
    copy: "The free Chrome extension that searches your Canvas and Brightspace courses.",
  },
  {
    href: "/products/lectra",
    label: "Lectra Notes",
    copy: "The free iPad and iPhone app for handwritten notes, PDF markup, and notebooks.",
  },
  {
    href: "/support",
    label: "Support",
    copy: "Something broken, or a link of ours that sent you here? Tell us and we'll fix it.",
  },
];

export default function NotFound() {
  return (
    <PageShell>
      <Sheet className="section" labelledBy="not-found-title">
        <div className="shell split split--top">
          <div>
            <p className="context-line">Error 404</p>
            <h1 id="not-found-title" className="t-title" data-focus style={{ marginTop: 18 }}>
              We couldn&rsquo;t find that page.
            </h1>
            <p className="lede co-copy-gap">
              The link may be old, or the page may have moved. One of these is probably what
              you were after.
            </p>
            <div style={{ marginTop: 40 }}>
              <p className="co-missing">
                The page you wanted
                <PenMark kind="strike" inset="0 -8px" delay={0.6} />
              </p>
            </div>
          </div>
          <ul className="index-list">
            {places.map((place) => (
              <li key={place.href}>
                <Link href={place.href}>
                  <span className="index-title">
                    <span>{place.label}</span>
                  </span>
                  <span className="index-copy">{place.copy}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Sheet>
    </PageShell>
  );
}
