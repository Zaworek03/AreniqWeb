"use client";

import { FeatureList } from "@/components/feature-list";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/content";
import { type Locale, waitlistPath } from "@/lib/i18n";
import { requestStableSignup } from "@/lib/waitlist-events";

export function ForStables({ t, locale }: { t: Dictionary["stables"]; locale: Locale }) {
  return (
    <Section id="dla-stajni" tone="charcoal" labelledBy="stables-title">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="stables-title" className="max-w-2xl font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-mist/80">
            {t.lead}
          </p>
        </div>
        <ButtonLink
          href={waitlistPath(locale)}
          variant="light"
          onClick={requestStableSignup}
          data-umami-event="cta-dla-stajni"
          className="self-start md:self-auto"
        >
          {t.cta}
        </ButtonLink>
      </div>
      <FeatureList items={t.items} />
    </Section>
  );
}
