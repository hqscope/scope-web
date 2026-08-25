import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Lectra Notes: iPad PDF Annotation & Study Companion | Scope";
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
          backgroundColor: "#fbf7ee",
          backgroundImage:
            "radial-gradient(900px 520px at 88% -10%, rgba(196,43,38,0.15), transparent 60%), radial-gradient(600px 400px at 10% 90%, rgba(217,56,28,0.1), transparent 60%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Header with badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              backgroundColor: "#c42b26",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: 800,
              color: "#fbf7ee",
            }}
          >
            L
          </div>
          <span
            style={{ fontSize: "36px", fontWeight: 700, color: "#241e18", letterSpacing: "-0.01em" }}
          >
            Lectra Notes
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
            }}
          >
            iPad Companion
          </span>
        </div>

        {/* Hero Section */}
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
            Mark up course readings by hand.
          </span>
          <span
            style={{ fontSize: "32px", color: "#6e6053", maxWidth: "900px", lineHeight: 1.4 }}
          >
            Annotate PDFs with Apple Pencil, organize readings, and use private on-device intelligence. Seamless integration with Scope.
          </span>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(27, 23, 18, 0.1)",
            paddingTop: "24px",
            fontSize: "24px",
            color: "#241e18",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontWeight: 700, color: "#c42b26" }}>canvascope.org/products/lectra</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span style={{ opacity: 0.7 }}>Available on the App Store</span>
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <span style={{ fontSize: "20px", opacity: 0.6 }}>PDF Annotation</span>
            <span style={{ fontSize: "20px", opacity: 0.6 }}>·</span>
            <span style={{ fontSize: "20px", opacity: 0.6 }}>On-Device AI</span>
            <span style={{ fontSize: "20px", opacity: 0.6 }}>·</span>
            <span style={{ fontSize: "20px", opacity: 0.6 }}>DropBridge</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
