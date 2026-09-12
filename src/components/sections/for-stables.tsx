"use client";

import { FeatureList } from "@/components/feature-list";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { STABLE_POINTS } from "@/content/product";
import { WAITLIST_HREF } from "@/lib/site";
import { requestStableSignup } from "@/lib/waitlist-events";

export function ForStables() {
  return (
    <Section id="dla-stajni" tone="bottle" labelledBy="stables-title">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="stables-title" className="max-w-2xl font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Masz stajnię albo pensjonat?
          </h2>
          <p className="mt-6 max-w-xl text-lg text-straw/80">
            Przy kilkunastu koniach poranne karmienie zajmuje godzinę, zanim ktokolwiek zacznie dzień. Worki Areniq
            mogą podać siano we wszystkich boksach o tej samej porze.
          </p>
        </div>
        <ButtonLink
          href={WAITLIST_HREF}
          variant="light"
          onClick={requestStableSignup}
          data-umami-event="cta-dla-stajni"
          className="self-start md:self-auto"
        >
          Zapisz stajnię na listę
        </ButtonLink>
      </div>
      <FeatureList items={STABLE_POINTS} />
    </Section>
  );
}
