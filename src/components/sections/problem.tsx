import { Section } from "@/components/ui/section";
import { PROBLEMS } from "@/content/product";

export function Problem() {
  return (
    <Section id="produkt" tone="sand" labelledBy="problem-title">
      <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div>
          <h2 id="problem-title" className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Koń je według zegara. Ty nie zawsze możesz.
          </h2>
          <p className="mt-6 max-w-md text-lg text-ink-soft">
            Areniq przejmuje poranne karmienie. Siano czeka w zamkniętym worku i jest dostępne dokładnie o godzinie,
            którą ustawisz.
          </p>
        </div>

        <ul className="border-t border-ink/15">
          {PROBLEMS.map((p) => (
            <li key={p.title} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-ink/15 py-7 sm:grid-cols-[7rem_1fr]">
              <span aria-hidden="true" className="font-display text-3xl font-bold text-leather sm:text-4xl">
                {p.marker}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-ink-soft">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
