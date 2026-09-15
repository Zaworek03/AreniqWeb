"use client";

import { animate, useMotionValue } from "motion/react";
import { useEffect } from "react";
import { HayBag } from "@/components/hay-bag";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { PRODUCT_NAME, type Dictionary } from "@/content";
import { type Locale, sectionPath, waitlistPath } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function Hero({ t, cta, locale }: { t: Dictionary["hero"]; cta: string; locale: Locale }) {
  const reduce = usePrefersReducedMotion();
  const fill = useMotionValue(1);
  const armed = useMotionValue(1);
  const hung = useMotionValue(1);
  const open = useMotionValue(0);

  // One page-load moment: the bolt releases and the hay drops.
  // Reduced motion: globals.css shows the final state from first paint; this syncs the value.
  useEffect(() => {
    if (reduce) {
      open.set(1);
      return;
    }
    const openAnim = animate(open, 1, { duration: 1.4, delay: 1.1, ease: [0.22, 1, 0.36, 1] });
    return () => openAnim.stop();
  }, [reduce, open]);

  return (
    <Section
      spacing="none"
      labelledBy="hero-title"
      className="bg-deck-glow overflow-hidden"
      containerClassName="grid items-center gap-10 py-14 sm:py-20 md:grid-cols-[1.15fr_0.85fr] md:gap-8 lg:py-24"
    >
      <div>
        <p className="font-display text-lg font-bold text-slate">{PRODUCT_NAME}</p>
        <h1
          id="hero-title"
          className="mt-3 font-display text-5xl leading-[1] font-extrabold tracking-tight text-balance text-charcoal sm:text-6xl lg:text-7xl"
        >
          {t.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink-soft sm:text-xl">
          {t.lead}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={waitlistPath(locale)} data-umami-event="cta-hero">
            {cta}
          </ButtonLink>
          <ButtonLink href={sectionPath(locale, "jak-to-dziala")} variant="secondary">
            {t.ctaSecondary}
          </ButtonLink>
        </div>
        <p className="mt-4 text-sm text-ink-soft">{t.note}</p>
      </div>

      <div data-hero-bag className="relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-none">
        <HayBag
          fill={fill}
          armed={armed}
          hung={hung}
          open={open}
          label={t.bagLabel}
          className="h-auto w-full"
        />
        <div className="absolute top-[38%] right-0 rounded-2xl bg-charcoal px-4 py-3 text-mist shadow-lg shadow-charcoal/20 sm:-right-2">
          <p className="text-xs text-mist/75">{t.badgeLabel}</p>
          <p className="font-display text-lg font-bold tabular-nums">{t.badgeValue}</p>
        </div>
      </div>
    </Section>
  );
}
