import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Scope: local-first Canvas and Brightspace search with cited AI answers";
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
          backgroundColor: "#f6f7f9",
          backgroundImage:
            "radial-gradient(900px 520px at 88% -10%, rgba(225,18,31,0.16), transparent 60%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              backgroundColor: "#e1121f",
            }}
          />
          <span
            style={{ fontSize: "40px", fontWeight: 700, color: "#0e1116" }}
          >
            Scope
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <span
            style={{
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#0e1116",
              maxWidth: "920px",
              letterSpacing: "-0.02em",
            }}
          >
            Search, ask, and move coursework in seconds.
          </span>
          <span
            style={{ fontSize: "32px", color: "#b60d18", maxWidth: "900px" }}
          >
            Local-first Chrome extension for Canvas &amp; Brightspace. Cited AI
            answers, PDF/OCR search, and two-way Lectra workflows.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "26px",
            color: "#0e1116",
          }}
        >
          <span style={{ fontWeight: 700, color: "#e1121f" }}>canvascope.org</span>
          <span style={{ opacity: 0.5 }}>· Free Chrome extension</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
