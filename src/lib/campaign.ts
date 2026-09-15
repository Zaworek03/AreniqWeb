// Campaign "Siano o czasie" (autumn 2026): weeks, targets and helpers shared by the admin panel.

/** Monday of ISO week 40, 2026 (prep week). Campaign weeks run T40–T52. */
const FIRST_MONDAY = Date.UTC(2026, 8, 28);
const DAY = 86_400_000;

export const CAMPAIGN_WEEKS = Array.from({ length: 13 }, (_, i) => {
  const start = new Date(FIRST_MONDAY + i * 7 * DAY);
  const end = new Date(FIRST_MONDAY + (i * 7 + 6) * DAY);
  const fmt = (d: Date) => `${d.getUTCDate()}.${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
  return { id: `T${40 + i}`, start, end, label: `${fmt(start)}–${fmt(end)}` };
});

export const TARGETS = {
  total: 400,
  poland: 250,
  restOfEurope: 150,
  stables: 20,
  igFollowersGain: 1000,
  countries: 10,
} as const;

/** Campaign week id (e.g. "T45") for a timestamp, or null outside T40–T52. */
export function campaignWeek(iso: string): string | null {
  const t = Date.parse(iso);
  const index = Math.floor((t - FIRST_MONDAY) / (7 * DAY));
  return index >= 0 && index < CAMPAIGN_WEEKS.length ? CAMPAIGN_WEEKS[index].id : null;
}

export type WaitlistEntry = {
  id: number;
  created_at: string;
  name: string | null;
  email: string;
  horses: string | null;
  stable: string | null;
  country: string | null;
  lang: "pl" | "en";
  source: string | null;
};

/** Same rule as the public form: 4+ horses or a stable name counts as a stable sign-up. */
export const isStable = (e: Pick<WaitlistEntry, "horses" | "stable">) =>
  e.horses === "4-10" || e.horses === "10+" || Boolean(e.stable?.trim());

/** Entries without a country are counted by form language: the Polish form means Poland. */
export const isPoland = (e: Pick<WaitlistEntry, "country" | "lang">) =>
  e.country ? e.country === "Polska" || e.country === "Poland" : e.lang === "pl";
