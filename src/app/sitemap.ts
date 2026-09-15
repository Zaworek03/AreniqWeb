import type { MetadataRoute } from "next";
import { languageAlternates } from "@/components/root-document";
import { LOCALES, type PageKey, pagePath } from "@/lib/i18n";
import { absUrl } from "@/lib/site";

export const dynamic = "force-static";

const PAGES: { page: PageKey; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { page: "home", priority: 1, changeFrequency: "monthly" },
  { page: "about", priority: 0.6, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ page, priority, changeFrequency }) =>
    LOCALES.map((locale) => ({
      url: absUrl(pagePath(locale, page)),
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates(page) },
    })),
  );
}
