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
import { PRODUCT_NAME } from "@/content/product";
import { getFaq, type FaqItem } from "@/lib/content";
import { OG_IMAGE, SITE, absUrl } from "@/lib/site";

// No offers, price or ratings until they are real.
const structuredData = (faq: FaqItem[]) => ({
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
      description: SITE.description,
      image: OG_IMAGE.url,
      brand: { "@id": absUrl("/#organizacja") },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
});

export default async function Home() {
  const faq = await getFaq();
  return (
    <>
      <JsonLd data={structuredData(faq)} />
      <Hero />
      <Problem />
      <HowItWorks />
      <Schedule />
      <Benefits />
      <TimeCalculator />
      <Specs />
      <ForStables />
      <Faq items={faq} />
      <Waitlist />
    </>
  );
}
