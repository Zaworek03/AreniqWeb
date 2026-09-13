import { Icon } from "@/components/icons";
import { Section } from "@/components/ui/section";
import { COMPARISON, COMPARISON_FEATURES } from "@/content/product";

const SUPPORT = {
  yes: { icon: "check", label: "Tak" },
  no: { icon: "cross", label: "Nie" },
  partial: { icon: "check", label: "Częściowo" },
} as const;

function Cell({ value, dark }: { value: keyof typeof SUPPORT; dark?: boolean }) {
  const { icon, label } = SUPPORT[value];
  const color =
    value === "no" ? (dark ? "text-mist/60" : "text-slate") : dark ? "text-gold-light" : "text-charcoal";
  return (
    <span className={`inline-flex items-center gap-1.5 ${color}`}>
      <Icon name={icon} className="size-6" />
      {value === "partial" ? <span className="text-sm">częściowo</span> : <span className="sr-only">{label}</span>}
    </span>
  );
}

export function Comparison() {
  return (
    <Section id="porownanie" tone="cloud" labelledBy="comparison-title">
      <h2 id="comparison-title" className="max-w-2xl font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
        Czym różni się od innych rozwiązań
      </h2>
      <p className="mt-4 max-w-xl text-lg text-ink-soft">
        Siatki, stacjonarne boksy i podajniki z timerem rozwiązują część problemu. Areniq Feed łączy mobilność z
        pełnym harmonogramem tygodniowym.
      </p>

      <div className="relative mt-12 overflow-x-auto rounded-3xl bg-white shadow-xl shadow-charcoal/5" tabIndex={0} role="region" aria-label="Tabela porównania, przewijana w poziomie">
        <table className="w-full min-w-[56rem] border-collapse text-left">
          <caption className="sr-only">Porównanie Areniq Feed z innymi rozwiązaniami do podawania siana</caption>
          <thead>
            <tr className="border-b border-charcoal/10 text-sm text-ink-soft">
              <th scope="col" className="px-6 py-4 font-medium">
                Rozwiązanie
              </th>
              {COMPARISON_FEATURES.map((f) => (
                <th key={f} scope="col" className="px-3 py-4 text-center font-medium">
                  {f}
                </th>
              ))}
              <th scope="col" className="px-6 py-4 font-medium">
                Kluczowe ograniczenie
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row) => (
              <tr
                key={row.name}
                className={row.highlight ? "bg-charcoal text-mist" : "border-b border-charcoal/10 last:border-0"}
              >
                <th scope="row" className="px-6 py-5 align-middle">
                  <span className="block font-display text-lg font-bold">{row.name}</span>
                  {row.note && <span className="text-sm font-normal text-ink-soft">{row.note}</span>}
                </th>
                {row.values.map((v, i) => (
                  <td key={COMPARISON_FEATURES[i]} className="px-3 py-5 text-center">
                    <Cell value={v} dark={row.highlight} />
                  </td>
                ))}
                <td className={`px-6 py-5 ${row.highlight ? "text-mist/80" : "text-ink-soft"}`}>{row.limitation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-ink-soft">Zestawienie przygotowane przez zespół Areniq.</p>
    </Section>
  );
}
