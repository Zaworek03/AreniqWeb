import { JsonLd } from "@/components/json-ld";
import { Benefits } from "@/components/sections/benefits";
import { Faq } from "@/components/sections/faq";
import { ForStables } from "@/components/sections/for-stables";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Problem } from "@/components/sections/problem";
import { Schedule } from "@/components/sections/schedule";
import { Specs } from "@/components/sections/specs";
import { TimeCalculator } from "@/components/sections/time-calculator";
import { Waitlist } from "@/components/sections/waitlist";
import { PRODUCT_NAME, getDictionary } from "@/content";
import { getFaq } from "@/lib/content";
import { type Locale, pagePath } from "@/lib/i18n";
import { SITE, absUrl, ogImage } from "@/lib/site";

export async function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const faq = await getFaq(locale);
  const home = absUrl(pagePath(locale, "home"));

  // No offers, price or ratings until they are real.
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": absUrl("/#organizacja"),
        name: SITE.name,
        url: absUrl("/"),
        logo: absUrl("/apple-icon.png"),
      },
      {
        "@type": "Product",
        name: PRODUCT_NAME,
        description: t.meta.description,
        image: ogImage(locale, t.meta.ogAlt).url,
        brand: { "@id": absUrl("/#organizacja") },
      },
      {
        "@type": "FAQPage",
        "@id": `${home}#faq`,
        inLanguage: locale,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <Hero t={t.hero} cta={t.chrome.cta} locale={locale} />
      <Problem t={t.problem} />
      <HowItWorks t={t.how} />
      <Schedule t={t.schedule} />
      <Benefits t={t.benefits} />
      <TimeCalculator t={t.calculator} locale={locale} />
      <Specs t={t.specs} />
      <ForStables t={t.stables} locale={locale} />
      <Faq title={t.faq.title} items={faq} />
      <Waitlist t={t.waitlist} locale={locale} />
    </>
  );
}
