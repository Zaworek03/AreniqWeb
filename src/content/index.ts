import type { Locale } from "@/lib/i18n";
import { en } from "./en";
import { pl, type Dictionary } from "./pl";

export { PRODUCT_NAME, type Dictionary, type Founder } from "./pl";

const DICTIONARIES: Record<Locale, Dictionary> = { pl, en };

export const getDictionary = (locale: Locale) => DICTIONARIES[locale];
