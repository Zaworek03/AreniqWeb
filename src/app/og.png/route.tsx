import { ImageResponse } from "next/og";
import { OG_IMAGE } from "@/lib/site";

// Route handler instead of the opengraph-image convention: the export needs a real
// `og.png` filename so GitHub Pages serves it as image/png.
export const dynamic = "force-static";

const HEADLINE = "Siano podane na czas. Nawet gdy Cię nie ma.";
// The built-in fallback font has no Polish glyphs, so the fallback copy avoids them.
const FALLBACK_HEADLINE = "Siano podane na czas.";
const WORDMARK = "areniq";

// Build-time fetch of a Bricolage Grotesque subset with just the glyphs we draw.
// Returns null instead of failing the deploy if Google Fonts is unreachable or changes format.
async function loadFont(weight: number, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@${weight}&text=${encodeURIComponent(text)}`,
    ).then((res) => res.text());
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!src) throw new Error("font URL not found in CSS");
    const res = await fetch(src);
    if (!res.ok) throw new Error(`font download failed: ${res.status}`);
    return await res.arrayBuffer();
  } catch (error) {
    console.warn("og.png: using fallback font", error);
    return null;
  }
}

export async function GET() {
  const bold = await loadFont(700, HEADLINE + WORDMARK);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#1f3d2b",
          color: "#ede6cf",
          ...(bold ? { fontFamily: "Bricolage" } : {}),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="15" fill="#ede6cf" />
            <path d="M16 7v9l6 4" stroke="#c9a227" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
          <div style={{ fontSize: 56, letterSpacing: -1 }}>{WORDMARK}</div>
        </div>
        <div style={{ display: "flex", maxWidth: 960, fontSize: 108, lineHeight: 1.02, letterSpacing: -3 }}>
          {bold ? HEADLINE : FALLBACK_HEADLINE}
        </div>
      </div>
    ),
    {
      width: OG_IMAGE.width,
      height: OG_IMAGE.height,
      ...(bold ? { fonts: [{ name: "Bricolage", data: bold, weight: 700, style: "normal" as const }] } : {}),
    },
  );
}
