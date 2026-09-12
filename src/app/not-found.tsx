import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Section labelledBy="nf-title">
      <h1 id="nf-title" className="font-display text-5xl font-bold tracking-tight">
        Nie ma takiej strony
      </h1>
      <p className="mt-4 max-w-xl text-lg text-ink-soft">Adres mógł się zmienić. Wróć na stronę główną.</p>
      <ButtonLink href="/" className="mt-8">
        Strona główna
      </ButtonLink>
    </Section>
  );
}
