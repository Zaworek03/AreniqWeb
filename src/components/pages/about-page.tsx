import type { Metadata } from "next";
import { FeatureList } from "@/components/feature-list";
import { FounderCard } from "@/components/founder-card";
import { languageAlternates } from "@/components/root-document";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { getDictionary } from "@/content";
import { type Locale, OG_LOCALE, pagePath, waitlistPath } from "@/lib/i18n";
import { SITE, absUrl, ogImage } from "@/lib/site";

export function aboutMetadata(locale: Locale): Metadata {
  const { about, meta } = getDictionary(locale);
  const url = absUrl(pagePath(locale, "about"));
  return {
    title: about.metaTitle,
    description: about.metaDescription,
    alternates: { canonical: url, languages: languageAlternates("about") },
    // Page-level openGraph replaces the root one, so repeat the shared fields.
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      siteName: SITE.name,
      title: `${about.metaTitle} | Areniq`,
      description: about.metaDescription,
      url,
      images: [ogImage(locale, meta.ogAlt)],
    },
  };
}

export function AboutPage({ locale }: { locale: Locale }) {
  const { about: t, chrome } = getDictionary(locale);
  const cta = chrome.cta;
  return (
    <>
      <Section spacing="none" labelledBy="about-title" className="bg-deck-glow" containerClassName="py-16 sm:py-24">
        <h1
          id="about-title"
          className="max-w-4xl font-display text-5xl leading-[1.02] font-extrabold tracking-tight text-balance sm:text-7xl"
        >
          {t.title}
        </h1>
      </Section>

      <Section tone="cloud" labelledBy="story-title">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <h2 id="story-title" className="font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
            {t.storyTitle}
          </h2>
          <div className="max-w-2xl space-y-5 text-lg text-ink-soft sm:text-xl">
            {t.story.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section labelledBy="team-title">
        <h2 id="team-title" className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          {t.teamTitle}
        </h2>
        <p className="mt-4 max-w-xl text-lg text-ink-soft">
          {t.teamLead}
        </p>
        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {t.founders.map((founder) => (
            <FounderCard key={founder.name} founder={founder} />
          ))}
        </div>
      </Section>

      <Section tone="charcoal" labelledBy="values-title">
        <h2 id="values-title" className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          {t.valuesTitle}
        </h2>
        <FeatureList items={t.values} />
      </Section>

      <Section labelledBy="about-cta-title">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="about-cta-title" className="font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              {t.ctaTitle}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-ink-soft">
              {t.ctaText}
            </p>
          </div>
          <ButtonLink href={waitlistPath(locale)} className="self-start md:self-auto">
            {cta}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
