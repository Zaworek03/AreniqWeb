import Link from "next/link";
import { Logo } from "./logo";
import { Container } from "./ui/container";
import { NAV_LINKS } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer data-tone="dark" className="bg-bottle-deep text-straw">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo className="text-straw" />
          <p className="mt-4 text-straw/80">
            Technologia do stajni, która pilnuje pór karmienia, kiedy Ty masz inne sprawy.
          </p>
        </div>

        <nav aria-label="Stopka">
          <h2 className="font-display text-lg font-semibold">Strona</h2>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-straw/80 underline-offset-4 hover:text-straw hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-lg font-semibold">Kontakt</h2>
          <ul className="mt-4 space-y-2 text-straw/80">
            {/* TODO: real contact details */}
            <li>
              <a href="mailto:kontakt@areniq.pl" className="underline-offset-4 hover:text-straw hover:underline">
                kontakt@areniq.pl
              </a>
            </li>
            <li>Polska</li>
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-straw/15 py-6 text-sm text-straw/70 sm:flex-row sm:justify-between">
        <p>© {year} Areniq</p>
        <p>Zrobione z myślą o koniach i ich ludziach.</p>
      </Container>
    </footer>
  );
}
