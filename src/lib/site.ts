const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const SITE = {
  name: "Areniq",
  description:
    "Areniq Feed to mobilny worek na siano z modułem elektronicznym i ryglem, który otwiera się sam według ustawionego harmonogramu tygodniowego.",
  // Public origin + basePath, no trailing slash.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000") + basePath,
  locale: "pl_PL",
};

export const absUrl = (path = "/") => `${SITE.url}${path}`;

export const OG_IMAGE = {
  url: absUrl("/og.png"),
  width: 1200,
  height: 630,
  alt: "Areniq Feed: automatyczny, mobilny podajnik siana dla koni",
};

export const NAV_LINKS = [
  { href: "/#jak-to-dziala", label: "Jak to działa" },
  { href: "/#harmonogram", label: "Harmonogram" },
  { href: "/#parametry", label: "Parametry" },
  { href: "/#faq", label: "FAQ" },
  { href: "/o-nas/", label: "O nas" },
] as const;

export const WAITLIST_HREF = "/#zapisy";

export const CONTACT = {
  email: "contact.areniq@gmail.com",
  instagram: { handle: "@areniq.eu", url: "https://www.instagram.com/areniq.eu/" },
};
