import type { Metadata, Viewport } from "next";
import { Archivo, Figtree } from "next/font/google";
import { getDictionary } from "@/content";
import { LOCALES, type Locale, OG_LOCALE, pagePath } from "@/lib/i18n";
import { SITE, absUrl, ogImage } from "@/lib/site";

// Shared by the three root layouts ((site) Polish, (en) English, (admin) panel), each with its own <html lang>.

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin", "latin-ext"], display: "swap" });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin", "latin-ext"], display: "swap" });

export const viewport: Viewport = { themeColor: "#eef1f5" };

/** hreflang links for a page that exists in both languages. */
export const languageAlternates = (page: Parameters<typeof pagePath>[1]) => ({
  ...Object.fromEntries(LOCALES.map((l) => [l, absUrl(pagePath(l, page))])),
  "x-default": absUrl(pagePath("pl", page)),
});

export function rootMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).meta;
  const image = ogImage(locale, t.ogAlt);
  return {
    metadataBase: new URL(`${SITE.url}/`),
    title: { default: t.title, template: "%s | Areniq" },
    description: t.description,
    applicationName: SITE.name,
    alternates: { canonical: absUrl(pagePath(locale, "home")), languages: languageAlternates("home") },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      siteName: SITE.name,
      url: absUrl(pagePath(locale, "home")),
      images: [image],
    },
    twitter: { card: "summary_large_image", images: [image.url] },
  };
}

export function RootDocument({ lang, skipLink, children }: { lang: Locale; skipLink: string; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${archivo.variable} ${figtree.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#tresc"
          className="sr-only z-50 rounded-full bg-charcoal px-5 py-3 font-semibold text-mist focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {skipLink}
        </a>
        {children}
      </body>
    </html>
  );
}
