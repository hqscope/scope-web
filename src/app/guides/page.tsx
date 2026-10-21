import Link from "next/link";

import { ButtonLink } from "@/components/buttons";
import JsonLd from "@/components/seo/JsonLd";
import PageHead from "@/components/site/PageHead";
import PageShell from "@/components/site/PageShell";
import { guidePath, guides } from "@/lib/guides";
import { formatArticleDate } from "@/lib/newsroom";
import { publicPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/structured-data";

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

      <PageHead
        crumbs={[{ href: "/", label: "Home" }]}
        context="Guides for Canvas, Brightspace, and iPad"
        title={<span id="guides-title">The manual way first. Then ours.</span>}
        lede={
          <p>
            Answers to the questions students actually search, like how to find
            something in Canvas, whether an extension is safe, and how to get a
            lecture deck onto an iPad. Each one covers what works without
            installing anything before it mentions Scope for Canvas or Lectra
            Notes.
          </p>
        }
      />

      <section
        aria-labelledby="all-guides-title"
        className="mx-auto max-w-[1200px] px-5 pb-24 sm:px-8 sm:pb-32"
      >
        <h2 id="all-guides-title" className="sr-only">
          All guides
        </h2>
        <ul className="divide-y divide-line border-y border-line">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={guidePath(guide)}
                className="group grid gap-2 py-7 sm:py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_8.5rem] md:gap-10"
              >
                <span className="text-[clamp(1.25rem,2.2vw,1.5rem)] font-semibold leading-[1.2] tracking-[-0.025em] text-ink group-hover:text-red">
                  {guide.title}
                </span>
                <span className="text-[16px] leading-[1.6] text-stone">{guide.copy}</span>
                <time
                  dateTime={guide.dateModified}
                  className="text-[14px] text-stone md:pt-1 md:text-right"
                >
                  {formatArticleDate(guide.dateModified)}
                </time>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-8 rounded-[22px] bg-wash p-8 sm:mt-20 sm:p-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end">
          <div>
            <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Deciding between apps?
            </h2>
            <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.55] text-stone">
              The comparisons put Scope and Lectra Notes next to BetterCampus, Tasks for
              Canvas, Goodnotes, and Notability, and they say where the other app is
              better.
            </p>
          </div>
          <div className="md:justify-self-end">
            <ButtonLink href="/compare" variant="secondary" size="lg">
              See the comparisons
            </ButtonLink>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
