import { Section } from "@/components/ui/section";
import { SPECS } from "@/content/product";

export function Specs() {
  return (
    <Section id="parametry" labelledBy="specs-title">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div>
          <h2 id="specs-title" className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Parametry
          </h2>
          <p className="mt-4 max-w-sm text-ink-soft">
            Pojemność, wymiary i cenę podamy przed premierą.
          </p>
        </div>
        <dl className="border-t border-ink/15">
          {SPECS.map((s) => (
            <div key={s.label} className="grid gap-1 border-b border-ink/15 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="text-ink-soft">{s.label}</dt>
              <dd className="font-medium">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
