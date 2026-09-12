import { FeatureList } from "@/components/feature-list";
import { Section } from "@/components/ui/section";
import { BENEFITS } from "@/content/product";

export function Benefits() {
  return (
    <Section id="korzysci" tone="bottle" labelledBy="benefits-title">
      <h2 id="benefits-title" className="max-w-2xl font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
        Regularne karmienie bez wstawania o świcie
      </h2>
      <FeatureList items={BENEFITS} />
    </Section>
  );
}
