import { type Locale, pagePath, sectionPath } from "./i18n";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const SITE = {
  name: "Areniq",
  // Public origin + basePath, no trailing slash.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000") + basePath,
};

export const absUrl = (path = "/") => `${SITE.url}${path}`;

export const OG_SIZE = { width: 1200, height: 630 };

/** Share image per language: /og.png (PL) and /en/og.png (EN). */
export const ogImage = (locale: Locale, alt: string) => ({
  url: absUrl(locale === "pl" ? "/og.png" : "/en/og.png"),
  ...OG_SIZE,
  alt,
});

/** Main navigation; labels come from the dictionary. */
export const navLinks = (locale: Locale, labels: { how: string; schedule: string; specs: string; faq: string; about: string }) => [
  { href: sectionPath(locale, "jak-to-dziala"), label: labels.how },
  { href: sectionPath(locale, "harmonogram"), label: labels.schedule },
  { href: sectionPath(locale, "parametry"), label: labels.specs },
  { href: sectionPath(locale, "faq"), label: labels.faq },
  { href: pagePath(locale, "about"), label: labels.about },
];

export const CONTACT = {
  email: "contact.areniq@gmail.com",
  instagram: { handle: "@areniq.eu", url: "https://www.instagram.com/areniq.eu/" },
};
