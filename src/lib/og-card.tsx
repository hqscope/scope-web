import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

/**
 * The share card every page uses: the brand haze (blurred pills under film
 * grain, from scope-brand), the Scope mark, and the title in Schibsted
 * Grotesk. The haze is a pre-rendered image because Satori can't blur.
 * Rendered on the Node runtime so the fonts and images can be read from disk
 * (src/assets, static font instances, OFL).
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const DEEP = "#14100c";
const INK = "#241e18";
const INK_SOFT = "#6b5f55";
const RED = "#c42b26";

const ASSETS = path.join(process.cwd(), "src/assets");

type Font = {
  name: string;
  data: Buffer;
  weight: 500 | 800;
  style: "normal";
};

let fontsPromise: Promise<Font[]> | null = null;

function loadFonts(): Promise<Font[]> {
  if (!fontsPromise) {
    const dir = path.join(ASSETS, "fonts");
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

const imageCache = new Map<string, Promise<string>>();

/** An image from src/assets/og as a data URI, which is what Satori's <img> accepts. */
function loadImage(file: string, mime: "image/png" | "image/jpeg"): Promise<string> {
  let image = imageCache.get(file);
  if (!image) {
    image = readFile(path.join(ASSETS, "og", file)).then(
      (data) => `data:${mime};base64,${data.toString("base64")}`,
    );
    imageCache.set(file, image);
  }
  return image;
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
  /** Bottom-right, in Scope red. */
  note?: string;
};

export async function renderCard({ label, title, subtitle, footer, note }: CardInput) {
  const [fonts, background] = await Promise.all([
    loadFonts(),
    loadImage("card-background.jpg", "image/jpeg"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "Schibsted",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> only */}
        <img
          src={background}
          alt=""
          width={OG_SIZE.width}
          height={OG_SIZE.height}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 96px",
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
                  border: "2px solid rgba(20, 16, 12, 0.12)",
                  backgroundColor: "rgba(246, 241, 231, 0.72)",
                  color: DEEP,
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
                color: DEEP,
                maxWidth: "980px",
              }}
            >
              {title}
            </span>
            {subtitle ? (
              <span
                style={{
                  marginTop: "22px",
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

/**
 * The homepage card: "Study with Scope" on the haze, exactly as designed in
 * scope-brand (web/link-previews/canvascope-link-preview-1200x630.png).
 */
export async function renderBrandCard() {
  const image = await loadImage("canvascope-link-preview.png", "image/png");

  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> only
      <img src={image} alt="" width={OG_SIZE.width} height={OG_SIZE.height} />
    ),
    OG_SIZE,
  );
}
