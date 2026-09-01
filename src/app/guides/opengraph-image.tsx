import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Scope guides: the manual way first, then ours";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
            style={{ fontSize: "40px", fontWeight: 700, color: "#241e18" }}
          >
            Scope
          </span>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 600,
              backgroundColor: "rgba(196,43,38,0.1)",
              color: "#c42b26",
              padding: "4px 12px",
              borderRadius: "20px",
              marginLeft: "8px",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Guides
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <span
            style={{
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#241e18",
              maxWidth: "960px",
              letterSpacing: "-0.02em",
            }}
          >
            The manual way first. Then ours.
          </span>
          <span
            style={{
              fontSize: "30px",
              color: "#6e6053",
              maxWidth: "900px",
              lineHeight: 1.4,
            }}
          >
            Step-by-step walkthroughs for Canvas and iPad study work that show
            how to do it by hand before showing where Scope for Canvas or
            Lectra Notes shortens it.
          </span>
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
            canvascope.org/guides
          </span>
          <span style={{ opacity: 0.5 }}>· Scope for Canvas &amp; Lectra Notes</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
