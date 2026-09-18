import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

/**
 * The share card every page uses: a sheet of plaster paper on the espresso
 * desk, the Scope mark, the title in Schibsted Grotesk with a red pen line
 * under it. Rendered on the Node runtime so the font can be read from disk
 * (src/assets/fonts, static instances, OFL).
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const INK = "#241e18";
const INK_SOFT = "#6e6053";
const PAPER = "#f6f1e7";
const DESK = "#14100c";
const RED = "#c42b26";

type Font = {
  name: string;
  data: Buffer;
  weight: 500 | 800;
  style: "normal";
};

let fontsPromise: Promise<Font[]> | null = null;

function loadFonts(): Promise<Font[]> {
  if (!fontsPromise) {
    const dir = path.join(process.cwd(), "src/assets/fonts");
    fontsPromise = Promise.all([
      readFile(path.join(dir, "SchibstedGrotesk-500.ttf")),
      readFile(path.join(dir, "SchibstedGrotesk-800.ttf")),
    ]).then(([regular, heavy]) => [
      { name: "Schibsted", data: regular, weight: 500, style: "normal" },
      { name: "Schibsted", data: heavy, weight: 800, style: "normal" },
    ]);
  }
  return fontsPromise;
}

/** Long titles step down so they still fit in three lines. */
function titleSize(title: string): number {
  if (title.length <= 40) return 70;
  if (title.length <= 60) return 62;
  if (title.length <= 80) return 54;
  return 46;
}

export type CardInput = {
  /** Which part of the site the card is for, shown beside the mark. */
  label?: string;
  title: string;
  subtitle?: string;
  /** Bottom-left: usually the page's address. */
  footer: string;
  /** Bottom-right, in pen red. */
  note?: string;
};

export async function renderCard({ label, title, subtitle, footer, note }: CardInput) {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "34px",
          backgroundColor: DESK,
          fontFamily: "Schibsted",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "58px 70px",
            borderRadius: "26px",
            backgroundColor: PAPER,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ width: "28px", height: "12px", borderRadius: "6px", backgroundColor: RED }} />
              <div style={{ width: "40px", height: "12px", borderRadius: "6px", backgroundColor: INK }} />
              <div style={{ width: "50px", height: "12px", borderRadius: "6px", backgroundColor: INK }} />
            </div>
            <span style={{ fontSize: "36px", fontWeight: 800, color: INK, letterSpacing: "-1px" }}>
              Scope
            </span>
            {label ? (
              <span
                style={{
                  marginLeft: "10px",
                  padding: "6px 18px",
                  borderRadius: "999px",
                  border: `2px solid ${RED}`,
                  color: RED,
                  fontSize: "22px",
                  fontWeight: 500,
                }}
              >
                {label}
              </span>
            ) : null}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: `${titleSize(title)}px`,
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: "-2.5px",
                color: INK,
                maxWidth: "980px",
              }}
            >
              {title}
            </span>
            <svg width="420" height="26" viewBox="0 0 420 26" style={{ marginTop: "14px" }}>
              <path
                d="M4 18 C 90 8, 220 4, 416 12"
                fill="none"
                stroke={RED}
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
            {subtitle ? (
              <span
                style={{
                  marginTop: "18px",
                  fontSize: "26px",
                  fontWeight: 500,
                  lineHeight: 1.35,
                  color: INK_SOFT,
                  maxWidth: "900px",
                }}
              >
                {subtitle}
              </span>
            ) : null}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "22px",
              fontWeight: 500,
              color: INK_SOFT,
            }}
          >
            <span>{footer}</span>
            {note ? <span style={{ color: RED }}>{note}</span> : null}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
