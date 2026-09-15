import Image from "next/image";
import Link from "next/link";
import fundingLogos from "@/assets/fepw-rp-ue-negative.png";
import { Logo } from "./logo";
import { Container } from "./ui/container";
import { Icon } from "./icons";
import type { Dictionary } from "@/content";
import { type Locale, pagePath } from "@/lib/i18n";
import { CONTACT, navLinks } from "@/lib/site";

export function SiteFooter({ t, locale }: { t: Dictionary["chrome"]; locale: Locale }) {
  const NAV_LINKS = navLinks(locale, t.nav);
  const year = new Date().getFullYear();

  return (
    <footer data-tone="dark" className="bg-charcoal-deep text-mist">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo href={pagePath(locale, "home")} label={t.homeLabel} className="text-mist" />
          <p className="mt-4 text-mist/80">
            {t.footer.tagline}
          </p>
        </div>

        <nav aria-label={t.footer.footerNavLabel}>
          <h2 className="font-display text-lg font-bold">{t.footer.siteHeading}</h2>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-mist/80 underline-offset-4 hover:text-mist hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-lg font-bold">{t.footer.contactHeading}</h2>
          <ul className="mt-4 space-y-2 text-mist/80">
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2 underline-offset-4 hover:text-mist hover:underline"
              >
                <Icon name="mail" className="size-5" />
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.instagram.url}
                className="inline-flex items-center gap-2 underline-offset-4 hover:text-mist hover:underline"
              >
                <Icon name="instagram" className="size-5" />
                {CONTACT.instagram.handle}
                <span className="sr-only">(Instagram)</span>
              </a>
            </li>
          </ul>
        </div>
      </Container>

      {/* EU funding marking (FEPW 2021–2027), white-text version for the dark footer. */}
      <Container className="flex justify-center border-t border-mist/15 py-8">
        <Image src={fundingLogos} alt={t.footer.fundingAlt} sizes="(min-width: 768px) 720px, 100vw" className="h-auto w-full max-w-[720px]" />
      </Container>

      <Container className="flex flex-col gap-2 border-t border-mist/15 py-6 text-sm text-mist/70 sm:flex-row sm:justify-between">
        <p>© {year} Areniq</p>
        <p>{t.footer.closing}</p>
      </Container>
    </footer>
  );
}
