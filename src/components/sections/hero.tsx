"use client";

import { animate, useMotionValue } from "motion/react";
import { useEffect } from "react";
import { HayBag } from "@/components/hay-bag";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { PRODUCT_NAME } from "@/content/product";
import { WAITLIST_HREF } from "@/lib/site";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function Hero() {
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
          Siano podane na czas. Nawet gdy Cię nie ma.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink-soft sm:text-xl">
          Automatyczny, mobilny podajnik siana dla koni. Ustawiasz harmonogram tygodniowy, a worek otwiera się sam o
          zaplanowanej porze: w boksie, na padoku i na zawodach.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={WAITLIST_HREF} data-umami-event="cta-hero">
            Zapisz się na listę
          </ButtonLink>
          <ButtonLink href="/#jak-to-dziala" variant="secondary">
            Zobacz, jak działa
          </ButtonLink>
        </div>
        <p className="mt-4 text-sm text-ink-soft">Zapis jest bezpłatny i do niczego nie zobowiązuje.</p>
      </div>

      <div data-hero-bag className="relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-none">
        <HayBag
          fill={fill}
          armed={armed}
          hung={hung}
          open={open}
          label="Areniq Feed zawieszony na drążku. O zaplanowanej porze rygiel się zwalnia, dół worka otwiera się i siano spada na ziemię."
          className="h-auto w-full"
        />
        <div className="absolute top-[38%] right-0 rounded-2xl bg-charcoal px-4 py-3 text-mist shadow-lg shadow-charcoal/20 sm:-right-2">
          <p className="text-xs text-mist/75">Harmonogram</p>
          <p className="font-display text-lg font-bold tabular-nums">PN · 06:00</p>
        </div>
      </div>
    </Section>
  );
}
