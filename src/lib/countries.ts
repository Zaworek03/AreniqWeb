import type { Locale } from "./i18n";

// European countries for the waitlist form, stored as ISO 3166-1 alpha-2 codes ("OTHER" for the rest).
// Names are written out (not Intl.DisplayNames) so server and browser render identical options.
const COUNTRIES: Record<string, { pl: string; en: string }> = {
  AT: { pl: "Austria", en: "Austria" },
  BE: { pl: "Belgia", en: "Belgium" },
  BG: { pl: "Bułgaria", en: "Bulgaria" },
  HR: { pl: "Chorwacja", en: "Croatia" },
  CY: { pl: "Cypr", en: "Cyprus" },
  CZ: { pl: "Czechy", en: "Czechia" },
  DK: { pl: "Dania", en: "Denmark" },
  EE: { pl: "Estonia", en: "Estonia" },
  FI: { pl: "Finlandia", en: "Finland" },
  FR: { pl: "Francja", en: "France" },
  DE: { pl: "Niemcy", en: "Germany" },
  GR: { pl: "Grecja", en: "Greece" },
  HU: { pl: "Węgry", en: "Hungary" },
  IS: { pl: "Islandia", en: "Iceland" },
  IE: { pl: "Irlandia", en: "Ireland" },
  IT: { pl: "Włochy", en: "Italy" },
  LV: { pl: "Łotwa", en: "Latvia" },
  LT: { pl: "Litwa", en: "Lithuania" },
  LU: { pl: "Luksemburg", en: "Luxembourg" },
  MT: { pl: "Malta", en: "Malta" },
  NL: { pl: "Holandia", en: "Netherlands" },
  NO: { pl: "Norwegia", en: "Norway" },
  PL: { pl: "Polska", en: "Poland" },
  PT: { pl: "Portugalia", en: "Portugal" },
  RO: { pl: "Rumunia", en: "Romania" },
  SK: { pl: "Słowacja", en: "Slovakia" },
  SI: { pl: "Słowenia", en: "Slovenia" },
  ES: { pl: "Hiszpania", en: "Spain" },
  SE: { pl: "Szwecja", en: "Sweden" },
  CH: { pl: "Szwajcaria", en: "Switzerland" },
  UA: { pl: "Ukraina", en: "Ukraine" },
  GB: { pl: "Wielka Brytania", en: "United Kingdom" },
};

/** Options sorted by name; the visitor's likely country goes first (Poland on the Polish page). */
export function countryOptions(locale: Locale, otherLabel: string) {
  const sorted = Object.entries(COUNTRIES)
    .map(([code, names]) => ({ code, name: names[locale] }))
    .sort((a, b) => a.name.localeCompare(b.name, locale));
  const first = locale === "pl" ? sorted.filter((c) => c.code === "PL") : [];
  const rest = sorted.filter((c) => !first.includes(c));
  return [...first, ...rest, { code: "OTHER", name: otherLabel }];
}

/** Name for a stored code, for the admin panel. Unknown values are shown as stored. */
export const countryName = (code: string, locale: Locale = "pl") =>
  COUNTRIES[code]?.[locale] ?? (code === "OTHER" ? (locale === "pl" ? "Inny kraj" : "Another country") : code);
