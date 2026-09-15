import { ImageResponse } from "next/og";
import { WORDMARK_PATHS, WORDMARK_VIEWBOX } from "@/components/logo";
import { OG_IMAGE } from "@/lib/site";

// Route handler instead of the opengraph-image convention: the export needs a real
// `og.png` filename so GitHub Pages serves it as image/png.
export const dynamic = "force-static";

const HEADLINE = "Siano podane na czas. Nawet gdy Cię nie ma.";
// The built-in fallback font has no Polish glyphs, so the fallback copy avoids them.
const FALLBACK_HEADLINE = "Siano podane na czas.";
const PRODUCT = "Feed";

// Build-time fetch of an Archivo subset with just the glyphs we draw.
// Returns null instead of failing the deploy if Google Fonts is unreachable or changes format.
async function loadFont(weight: number, text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Archivo:wght@${weight}&text=${encodeURIComponent(text)}`,
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
  const bold = await loadFont(800, HEADLINE + PRODUCT);

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
          color: "#3a3a3e",
          backgroundColor: "#eef1f5",
          backgroundImage:
            "radial-gradient(circle at 78% 70%, rgba(226,214,190,0.95), rgba(238,241,245,0) 38%), radial-gradient(circle at 60% 8%, rgba(184,204,232,0.8), rgba(238,241,245,0) 32%)",
          ...(bold ? { fontFamily: "Archivo" } : {}),
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 20 }}>
          <svg width="232" height="100" viewBox={WORDMARK_VIEWBOX}>
            <g fill="none" stroke="#3a3a3e" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
              {WORDMARK_PATHS.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
            <circle cx="242" cy="38" r="7.5" fill="#c9992f" />
          </svg>
          <div style={{ fontSize: 48, letterSpacing: -1, marginBottom: 22 }}>{PRODUCT}</div>
        </div>
        <div style={{ display: "flex", maxWidth: 1000, fontSize: 104, lineHeight: 1.02, letterSpacing: -3 }}>
          {bold ? HEADLINE : FALLBACK_HEADLINE}
        </div>
      </div>
    ),
    {
      width: OG_IMAGE.width,
      height: OG_IMAGE.height,
      ...(bold ? { fonts: [{ name: "Archivo", data: bold, weight: 800, style: "normal" as const }] } : {}),
    },
  );
}
