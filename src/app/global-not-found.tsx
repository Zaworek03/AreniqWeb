import type { Metadata } from "next";
import Link from "next/link";
import { RootDocument } from "@/components/root-document";
import { SiteChrome } from "@/components/site-chrome";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { getDictionary } from "@/content";
import { pagePath } from "@/lib/i18n";
import "./globals.css";

// With three root layouts there is no single layout for a 404, so this page brings its own document.
// GitHub Pages serves it for every unknown URL; it is in Polish with a way back to the English site.

export const metadata: Metadata = { title: "Nie ma takiej strony | Areniq" };

export default function GlobalNotFound() {
  const pl = getDictionary("pl").notFound;
  return (
    <RootDocument lang="pl" skipLink={getDictionary("pl").chrome.skipLink}>
      <SiteChrome locale="pl">
        <Section labelledBy="nf-title">
          <h1 id="nf-title" className="font-display text-5xl font-extrabold tracking-tight">
            {pl.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink-soft">{pl.text}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href={pagePath("pl", "home")}>{pl.cta}</ButtonLink>
            <Link lang="en" href={pagePath("en", "home")} className="font-semibold underline decoration-gold underline-offset-4">
              English version
            </Link>
          </div>
        </Section>
      </SiteChrome>
    </RootDocument>
  );
}
