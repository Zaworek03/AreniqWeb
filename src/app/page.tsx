import { JsonLd } from "@/components/json-ld";
import { Benefits } from "@/components/sections/benefits";
import { Faq } from "@/components/sections/faq";
import { ForStables } from "@/components/sections/for-stables";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Problem } from "@/components/sections/problem";
import { Specs } from "@/components/sections/specs";
import { TimeCalculator } from "@/components/sections/time-calculator";
import { Waitlist } from "@/components/sections/waitlist";
import { FAQ } from "@/content/product";
import { OG_IMAGE, SITE, absUrl } from "@/lib/site";

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
      name: "Worek na siano Areniq",
      description: SITE.description,
      image: OG_IMAGE.url,
      brand: { "@id": absUrl("/#organizacja") },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={structuredData} />
      <Hero />
      <Problem />
      <HowItWorks />
      <Benefits />
      <TimeCalculator />
      <Specs />
      <ForStables />
      <Faq />
      <Waitlist />
    </>
  );
}
