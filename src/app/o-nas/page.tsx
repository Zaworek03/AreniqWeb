import type { Metadata } from "next";
import { FounderCard } from "@/components/founder-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FOUNDERS, STORY, VALUES } from "@/content/about";
import { WAITLIST_HREF, absUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "O nas",
  description:
    "Za Areniq stoją trzy osoby: Oliwia Michalak, Bartosz Zawłocki i Magda Augustyniak. Poznaj naszą historię i wartości.",
  alternates: { canonical: absUrl("/o-nas/") },
};

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="about-title">
        <Container className="py-16 sm:py-24">
          <h1
            id="about-title"
            className="max-w-4xl font-display text-5xl leading-[1.02] font-bold tracking-tight text-balance sm:text-7xl"
          >
            Trzy osoby, jeden cel: siano podane na czas.
          </h1>
        </Container>
      </section>

      <Section tone="sand" labelledBy="story-title">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <h2 id="story-title" className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Dlaczego powstało Areniq
          </h2>
          <div className="max-w-2xl space-y-5 text-lg text-ink-soft sm:text-xl">
            {STORY.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section labelledBy="team-title">
        <h2 id="team-title" className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Założyciele
        </h2>
        <p className="mt-4 max-w-xl text-lg text-ink-soft">
          Areniq to wspólny projekt trzech osób. Razem odpowiadamy za każdy etap, od pomysłu po gotowy worek.
        </p>
        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {FOUNDERS.map((founder) => (
            <FounderCard key={founder.name} founder={founder} />
          ))}
        </div>
      </Section>

      <Section tone="bottle" labelledBy="values-title">
        <h2 id="values-title" className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Czym się kierujemy
        </h2>
        <ul className="mt-14 grid gap-x-16 gap-y-10 sm:grid-cols-2">
          {VALUES.map((v) => (
            <li key={v.title} className="border-t border-straw/25 pt-6">
              <h3 className="font-display text-2xl font-semibold">{v.title}</h3>
              <p className="mt-3 max-w-md text-lg text-straw/80">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="about-cta-title">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="about-cta-title" className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Chcesz wiedzieć o premierze?
            </h2>
            <p className="mt-4 max-w-xl text-lg text-ink-soft">
              Zapisz się na listę oczekujących. Napiszemy, gdy worek Areniq będzie gotowy.
            </p>
          </div>
          <ButtonLink href={WAITLIST_HREF} className="self-start md:self-auto">
            Zapisz się na listę
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
