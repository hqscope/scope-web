import Link from "next/link";

import Sheet from "@/components/motion/Sheet";
import PenMark from "@/components/motion/PenMark";
import JsonLd from "@/components/seo/JsonLd";
import PageHead from "@/components/site/PageHead";
import PageShell from "@/components/site/PageShell";
import { guidePath, guides } from "@/lib/guides";
import { formatArticleDate } from "@/lib/newsroom";
import { publicPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/structured-data";

import "./_guide/guides.css";

const description =
  "Step-by-step guides for students on Canvas and iPad: how to search every course, what to check before installing a Canvas extension, and how to annotate lecture slides with Apple Pencil.";

export const metadata = publicPageMetadata({
  title: "Guides for Canvas and iPad Note-Taking",
  description,
  path: "/guides",
  keywords: [
    "how to search in Canvas",
    "are Canvas extensions safe",
    "annotate lecture slides iPad",
    "Canvas tips for students",
    "iPad note-taking guide",
  ],
});

export default function GuidesPage() {
  return (
    <PageShell active="guides">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
          ]),
          itemListSchema(
            "Scope guides",
            "/guides",
            guides.map((guide) => ({
              name: guide.title,
              path: guidePath(guide),
            })),
          ),
        ]}
      />

      <Sheet className="guides-hub" labelledBy="guides-title">
        <PageHead
          crumbs={[{ href: "/", label: "Home" }]}
          context="Guides for Canvas, Brightspace, and iPad"
          title={<span id="guides-title">The manual way first. Then ours.</span>}
          lede={
            <p>
              Answers to the questions students actually search, like how to find
              something in Canvas, whether an extension is safe, and how to get a
              lecture deck onto an iPad. Each one covers what works{" "}
              <span className="pen-phrase">
                without installing anything
                <PenMark kind="underline" inset="auto -4px -12px -4px" delay={0.9} className="pen-line" />
              </span>{" "}
              before it mentions Scope for Canvas or Lectra Notes.
            </p>
          }
        />

        <section className="shell section-tight" aria-labelledby="all-guides-title" style={{ paddingTop: 0 }}>
          <h2 id="all-guides-title" className="sr-only">
            All guides
          </h2>
          <ul className="index-list">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link href={guidePath(guide)}>
                  <span className="index-title">
                    <span>{guide.title}</span>
                  </span>
                  <span className="index-copy">{guide.copy}</span>
                  <time className="index-meta" dateTime={guide.dateModified}>
                    {formatArticleDate(guide.dateModified)}
                  </time>
                </Link>
              </li>
            ))}
          </ul>

          <div className="note guides-hub-note">
            <h2>Deciding between apps?</h2>
            <p style={{ marginTop: 10 }}>
              The comparisons put Scope and Lectra Notes next to BetterCampus, Tasks for
              Canvas, Goodnotes, and Notability, and they say where the other app is
              better.
            </p>
            <div className="link-row" style={{ marginTop: 18 }}>
              <Link href="/compare" className="link">
                See the comparisons
              </Link>
            </div>
          </div>
        </section>
      </Sheet>
    </PageShell>
  );
}
