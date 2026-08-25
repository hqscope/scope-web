import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Agent Workspace: Every agent. Every repo. One office. | Scope";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PROVIDERS = [
  { name: "Claude Code", color: "#d97757" },
  { name: "Codex CLI", color: "#10a37f" },
  { name: "Gemini CLI", color: "#4285f4" },
];

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
          backgroundColor: "#14100c",
          backgroundImage:
            "radial-gradient(900px 560px at 50% 55%, rgba(120,80,220,0.22), transparent 65%), radial-gradient(520px 340px at 88% 8%, rgba(232,64,42,0.14), transparent 60%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: "24px",
              fontWeight: 600,
              letterSpacing: "0.22em",
              color: "#e5484d",
            }}
          >
            AGENT WORKSPACE · FOR MAC
          </span>
        </div>

        {/* Headline + providers */}
        <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
          <span
            style={{
              fontSize: "82px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              color: "#f6f1e7",
              maxWidth: "960px",
            }}
          >
            Every agent. Every repo. One office.
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "34px" }}>
            {PROVIDERS.map((provider) => (
              <div
                key={provider.name}
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "26px",
                    height: "26px",
                    borderRadius: "13px",
                    backgroundColor: provider.color,
                  }}
                />
                <span
                  style={{
                    fontSize: "28px",
                    fontWeight: 600,
                    color: "rgba(246,241,231,0.85)",
                  }}
                >
                  {provider.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "24px",
            fontSize: "24px",
            color: "rgba(246,241,231,0.6)",
          }}
        >
          <span style={{ fontWeight: 600, color: "#e5484d" }}>
            canvascope.org/products/agent-workspace
          </span>
          <span>macOS · menu-bar native · local-first</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
