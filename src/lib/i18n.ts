// Two languages: Polish at the site root, English under /en/. Section anchors keep the same ids in both.

export const LOCALES = ["pl", "en"] as const;
export type Locale = (typeof LOCALES)[number];

const PAGES = {
  home: { pl: "/", en: "/en/" },
  about: { pl: "/o-nas/", en: "/en/about/" },
} as const;

export type PageKey = keyof typeof PAGES;

export const pagePath = (locale: Locale, page: PageKey) => PAGES[page][locale];

/** Link to a section of the home page, e.g. sectionPath("en", "zapisy") → "/en/#zapisy". */
export const sectionPath = (locale: Locale, id: string) => `${PAGES.home[locale]}#${id}`;

export const waitlistPath = (locale: Locale) => sectionPath(locale, "zapisy");

/** The same page in the other language (pathname without basePath, as from usePathname). */
export function alternatePath(pathname: string, to: Locale): string {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  for (const page of Object.values(PAGES)) {
    if (page.pl === normalized || page.en === normalized) return page[to];
  }
  return PAGES.home[to];
}

export const localeFromPath = (pathname: string): Locale =>
  pathname === "/en" || pathname.startsWith("/en/") ? "en" : "pl";

export const OG_LOCALE: Record<Locale, string> = { pl: "pl_PL", en: "en_GB" };
