import { FeatureList } from "@/components/feature-list";
import { Section } from "@/components/ui/section";
import { BENEFITS } from "@/content/product";

export function Benefits() {
  return (
    <Section id="korzysci" tone="charcoal" labelledBy="benefits-title">
      <h2 id="benefits-title" className="max-w-2xl font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
        Regularne karmienie, gdziekolwiek jest koń
      </h2>
      <FeatureList items={BENEFITS} />
    </Section>
  );
}
