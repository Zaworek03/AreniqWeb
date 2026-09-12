const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const SITE = {
  name: "Areniq",
  description:
    "Automatyczny podajnik siana, który otwiera się o ustawionej godzinie. Regularne karmienie konia, nawet gdy nie ma Cię w stajni.",
  // Public origin + basePath, no trailing slash.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000") + basePath,
  locale: "pl_PL",
};

export const absUrl = (path = "/") => `${SITE.url}${path}`;

// Plain string paths (img src, CSS url, fetch) are not prefixed with basePath by Next.
export const asset = (path: string) => `${basePath}${path}`;

export const NAV_LINKS = [
  { href: "/#produkt", label: "Podajnik" },
  { href: "/#jak-to-dziala", label: "Jak to działa" },
  { href: "/#parametry", label: "Parametry" },
  { href: "/#faq", label: "FAQ" },
  { href: "/o-nas/", label: "O nas" },
] as const;

export const WAITLIST_HREF = "/#zapisy";
