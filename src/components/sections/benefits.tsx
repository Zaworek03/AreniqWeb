import { FeatureList } from "@/components/feature-list";
import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/content";

export function Benefits({ t }: { t: Dictionary["benefits"] }) {
  return (
    <Section id="korzysci" tone="charcoal" labelledBy="benefits-title">
      <h2 id="benefits-title" className="max-w-2xl font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
        {t.title}
      </h2>
      <FeatureList items={t.items} />
    </Section>
  );
}
