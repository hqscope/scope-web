import { ImageResponse } from "next/og";

import {
  formatArticleDate,
  getNewsroomArticle,
  newsroomArticles,
} from "@/lib/newsroom";

// No `runtime = "edge"` here on purpose: the newsroom module is large and
// this route renders on the default Node runtime.

export const alt = "Scope Newsroom";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type NewsroomImageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return newsroomArticles.map((article) => ({ slug: article.slug }));
}

/** Titles run roughly 20–75 characters; step the size down so long ones
 *  still fit in three lines of the 1040px content column. */
function headlineFontSize(title: string): number {
  if (title.length <= 40) return 68;
  if (title.length <= 60) return 60;
  if (title.length <= 80) return 54;
  return 46;
}

export default async function Image({ params }: NewsroomImageProps) {
  const { slug } = await params;
  const article = getNewsroomArticle(slug);

  const kicker = article
    ? `Scope Newsroom · ${article.category}`
    : "Scope Newsroom";
  const headline = article
    ? article.title
    : "Product updates and engineering notes from Scope and Lectra Notes";
  const dateLine = article ? formatArticleDate(article.date) : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#f6f1e7",
          backgroundImage:
            "radial-gradient(900px 520px at 88% -10%, rgba(196,43,38,0.16), transparent 60%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* The Scope mark, drawn as bars so Satori can render it without an
              external asset fetch. */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "7px",
              width: "58px",
              height: "56px",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "14px",
                borderRadius: "7px",
                backgroundColor: "#c42b26",
              }}
            />
            <div
              style={{
                width: "46px",
                height: "14px",
                borderRadius: "7px",
                backgroundColor: "#241e18",
              }}
            />
            <div
              style={{
                width: "58px",
                height: "14px",
                borderRadius: "7px",
                backgroundColor: "#241e18",
              }}
            />
          </div>
          <span
            style={{
              fontSize: "26px",
              fontWeight: 600,
              color: "#c42b26",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {kicker}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "block",
              fontSize: `${headlineFontSize(headline)}px`,
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#241e18",
              maxWidth: "1040px",
              letterSpacing: "-0.02em",
              lineClamp: 3,
            }}
          >
            {headline}
          </div>
          {dateLine ? (
            <span style={{ fontSize: "30px", color: "#6e6053" }}>
              {dateLine}
            </span>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "26px",
            color: "#241e18",
          }}
        >
          <span style={{ fontWeight: 700, color: "#c42b26" }}>
            canvascope.org/newsroom
          </span>
          <span style={{ opacity: 0.5 }}>· Scope for Canvas &amp; Lectra Notes</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
