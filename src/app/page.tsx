import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { WAITLIST_HREF } from "@/lib/site";

// Stage 1 placeholder. Sections are filled in during stage 2.
const placeholders = [
  { id: "produkt", title: "Podajnik siana", tone: "sand" },
  { id: "jak-to-dziala", title: "Jak to działa", tone: "straw" },
  { id: "wkrotce", title: "Równiarka do placów", tone: "sand" },
  { id: "faq", title: "Pytania i odpowiedzi", tone: "straw" },
  { id: "zapisy", title: "Lista oczekujących", tone: "bottle" },
] as const;

export default function Home() {
  return (
    <>
      <Section labelledBy="hero-title" className="sm:py-36">
        <h1 id="hero-title" className="max-w-3xl font-display text-5xl leading-[1.02] font-bold tracking-tight text-balance sm:text-7xl">
          Siano podane na czas. Nawet gdy Cię nie ma.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink-soft sm:text-xl">
          Automatyczny podajnik, który otwiera worek z sianem o godzinie, którą ustawisz.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={WAITLIST_HREF}>Dołącz do listy</ButtonLink>
          <ButtonLink href="/#jak-to-dziala" variant="secondary">
            Zobacz, jak działa
          </ButtonLink>
        </div>
      </Section>

      {placeholders.map((s) => (
        <Section key={s.id} id={s.id} tone={s.tone} labelledBy={`${s.id}-title`}>
          <h2 id={`${s.id}-title`} className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {s.title}
          </h2>
          <p className="mt-4 max-w-xl opacity-80">Sekcja w przygotowaniu (etap 2).</p>
        </Section>
      ))}
    </>
  );
}
