import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { absUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "O nas",
  description: "Poznaj zespół Areniq: Oliwia Michalak, Bartosz Zawłocki i Magda Augustyniak.",
  alternates: { canonical: absUrl("/o-nas/") },
};

export default function AboutPage() {
  return (
    <Section labelledBy="about-title">
      <h1 id="about-title" className="font-display text-5xl font-bold tracking-tight sm:text-6xl">
        O nas
      </h1>
      <p className="mt-4 max-w-xl text-lg text-ink-soft">Strona w przygotowaniu (etap 3).</p>
    </Section>
  );
}
