import { getDictionary } from "@/content";
import type { Locale } from "./i18n";

export type FaqItem = { q: string; a: string };

/** Keys in public.site_content. */
export const CONTENT_KEYS = {
  faq: (locale: Locale) => `faq_${locale}`,
  lastPublish: "last_publish",
} as const;

export const defaultFaq = (locale: Locale): FaqItem[] => getDictionary(locale).faq.items.map(({ q, a }) => ({ q, a }));

const isFaq = (value: unknown): value is FaqItem[] =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every((i) => typeof i?.q === "string" && typeof i?.a === "string" && i.q.trim() && i.a.trim());

/**
 * FAQ edited in the admin panel, read at build time. Falls back to the copy in the repo when
 * Supabase is not configured, unreachable, or holds nothing valid, so a build never breaks on it.
 */
export async function getFaq(locale: Locale): Promise<FaqItem[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return defaultFaq(locale);
  try {
    const res = await fetch(`${url}/rest/v1/site_content?key=eq.${CONTENT_KEYS.faq(locale)}&select=value`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return defaultFaq(locale);
    const rows: { value: unknown }[] = await res.json();
    return isFaq(rows[0]?.value) ? rows[0].value : defaultFaq(locale);
  } catch {
    return defaultFaq(locale);
  }
}
