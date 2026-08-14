import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Lectra Notes — Jupyter Notebooks on iPad, Offline | Scope";
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
          backgroundColor: "#faf7ef",
          backgroundImage:
            "radial-gradient(900px 520px at 88% -10%, rgba(45,95,184,0.15), transparent 60%), radial-gradient(600px 400px at 10% 90%, rgba(217,56,28,0.1), transparent 60%)",
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
              backgroundColor: "#2d5fb8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: 800,
              color: "#faf7ef",
            }}
          >
            L
          </div>
          <span
            style={{ fontSize: "36px", fontWeight: 700, color: "#1b1712", letterSpacing: "-0.01em" }}
          >
            Lectra Notes
          </span>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 600,
              backgroundColor: "rgba(45,95,184,0.1)",
              color: "#2d5fb8",
              padding: "4px 12px",
              borderRadius: "20px",
              marginLeft: "8px",
            }}
          >
            Notebooks
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <span
            style={{
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#1b1712",
              maxWidth: "1000px",
              letterSpacing: "-0.02em",
            }}
          >
            Jupyter notebooks that run on your iPad. Offline.
          </span>
          <span
            style={{ fontSize: "32px", color: "#5a5347", maxWidth: "900px", lineHeight: 1.4 }}
          >
            Real .ipynb files, on-device Python with numpy, pandas, and matplotlib — no cloud kernel.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(27, 23, 18, 0.1)",
            paddingTop: "24px",
            fontSize: "24px",
            color: "#1b1712",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontWeight: 700, color: "#2d5fb8" }}>
              canvascope.org/product/lectra/notebooks
            </span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span style={{ opacity: 0.7 }}>Free on the App Store</span>
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <span style={{ fontSize: "20px", opacity: 0.6 }}>.ipynb</span>
            <span style={{ fontSize: "20px", opacity: 0.6 }}>·</span>
            <span style={{ fontSize: "20px", opacity: 0.6 }}>Python</span>
            <span style={{ fontSize: "20px", opacity: 0.6 }}>·</span>
            <span style={{ fontSize: "20px", opacity: 0.6 }}>Offline</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
