import Link from "next/link";

import PenMark from "@/components/motion/PenMark";
import Sheet from "@/components/motion/Sheet";
import Mark from "@/components/site/Mark";
import PageShell from "@/components/site/PageShell";
import JsonLd from "@/components/seo/JsonLd";
import { comparePath, comparisons, comparisonsFor, type Comparison } from "@/lib/compare";
import { publicPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/structured-data";

import "./compare.css";

const description =
  "Honest comparisons of Scope for Canvas with BetterCampus and Tasks for Canvas, and of Lectra Notes with Goodnotes, Notability, and the iPad Python notebook apps, including where each competitor is stronger.";

export const metadata = publicPageMetadata({
  title: "Compare Scope and Lectra Notes",
  description,
  path: "/compare",
  keywords: [
    "Scope vs Better Canvas",
    "Scope vs Tasks for Canvas",
    "best Canvas Chrome extensions",
    "Lectra Notes vs Goodnotes",
    "Lectra Notes vs Notability",
    "free Goodnotes alternatives",
    "iPad Python notebook apps",
  ],
});

/* Where the other apps win, each one taken from its comparison page. */
const theirWins = [
  { app: "BetterCampus", win: "Dark mode, themes, and custom course cards" },
  { app: "Tasks for Canvas", win: "A to-do list on the Canvas dashboard" },
  { app: "Goodnotes", win: "Handwriting-to-text conversion", marked: true },
  { app: "Notability", win: "Years of polish on lecture audio" },
  { app: "Juno and Carnets", win: "SciPy and scikit-learn built in" },
];

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function CompareIndex({ items }: { items: Comparison[] }) {
  return (
    <ul className="index-list">
      {items.map((item) => (
        <li key={item.slug}>
          <Link href={comparePath(item)}>
            <span className="index-title">
              <span>{item.title}</span>
            </span>
            <span className="index-copy">{item.copy}</span>
            <span className="index-meta">Updated {formatDate(item.dateModified)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function ComparePage() {
  const scopeComparisons = comparisonsFor("scope");
  const lectraComparisons = comparisonsFor("lectra");

  return (
    <PageShell active="compare">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
          ]),
          itemListSchema(
            "Scope and Lectra Notes comparisons",
            "/compare",
            comparisons.map((item) => ({
              name: item.title,
              path: comparePath(item),
            })),
          ),
        ]}
      />

      <Sheet labelledBy="compare-title">
        <div className="shell split compare-hub-head">
          <div>
            <p className="context-line">
              Comparisons for Scope for Canvas and Lectra Notes
            </p>
            <h1 id="compare-title" className="t-title" data-focus style={{ marginTop: 18 }}>
              Pick the right app, even if it isn&apos;t ours.
            </h1>
            <p className="lede">
              Every comparison here names what the other app does better. Each one
              is dated, sourced, and corrected when we&apos;re wrong. If Scope for
              Canvas or Lectra Notes wins, we want it to win on the merits.
            </p>
            <div className="link-row">
              <a href="#scope" className="link">
                Canvas extensions
              </a>
              <a href="#lectra" className="link">
                iPad note-taking apps
              </a>
            </div>
          </div>

          <figure className="scorecard plane">
            <p className="scorecard-title">Where they win</p>
            <ul>
              {theirWins.map((item) => (
                <li key={item.app}>
                  <span className="scorecard-app">{item.app}</span>
                  <span className="scorecard-win">
                    {item.marked ? (
                      <span>
                        {item.win}
                        <PenMark kind="circle" inset="-10px -14px -10px -12px" delay={0.4} />
                      </span>
                    ) : (
                      item.win
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <figcaption>Each page says where the other app is the better pick.</figcaption>
          </figure>
        </div>
      </Sheet>

      <Sheet className="section compare-hub-group" id="scope" labelledBy="scope-title">
        <div className="shell">
          <p className="compare-tag">
            <Mark size={18} /> Scope for Canvas
          </p>
          <h2 id="scope-title" className="t-head" data-focus>
            Canvas Chrome extensions, compared.
          </h2>
          <p className="lede">
            BetterCampus, Tasks for Canvas, the downloaders, and Scope. Most
            students can run more than one, so each page says which job each
            extension does best.
          </p>
          <CompareIndex items={scopeComparisons} />
        </div>
      </Sheet>

      <Sheet className="section compare-hub-group" id="lectra" labelledBy="lectra-title">
        <div className="shell">
          <p className="compare-tag">Lectra Notes</p>
          <h2 id="lectra-title" className="t-head" data-focus>
            iPad note-taking apps, compared.
          </h2>
          <p className="lede">
            Goodnotes, Notability, OneNote, and the iPad Python apps, set against
            Lectra Notes on price, handwriting, audio, and code.
          </p>
          <CompareIndex items={lectraComparisons} />
        </div>
      </Sheet>

      <section className="on-desk shell section compare-closing" aria-labelledby="guides-title">
        <h2 id="guides-title" className="t-title" data-focus>
          Looking for a how-to instead?
        </h2>
        <p className="lede">
          The guides cover the manual way first, like searching Canvas, checking an
          extension before you install it, and getting lecture slides onto an
          iPad, and only then mention ours.
        </p>
        <div className="actions">
          <Link href="/guides" className="btn btn-primary">
            Read the guides
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
