"use client";

import { animate, useMotionValue } from "motion/react";
import { useEffect } from "react";
import { HayBag } from "@/components/hay-bag";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { WAITLIST_HREF } from "@/lib/site";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function Hero() {
  const reduce = usePrefersReducedMotion();
  const fill = useMotionValue(1);
  const closed = useMotionValue(1);
  const clock = useMotionValue(0);

  // One page-load moment: the clock reaches 6:00 and the bottom unrolls.
  // Reduced motion: globals.css shows the final state from first paint; this syncs the values.
  useEffect(() => {
    if (reduce) {
      clock.set(1);
      closed.set(0);
      return;
    }
    let stopped = false;
    const clockAnim = animate(clock, 1, { duration: 1.6, delay: 0.6, ease: "easeInOut" });
    let openAnim: ReturnType<typeof animate> | undefined;
    clockAnim.then(() => {
      if (!stopped) openAnim = animate(closed, 0, { duration: 1.1, ease: [0.22, 1, 0.36, 1] });
    });
    return () => {
      stopped = true;
      clockAnim.stop();
      openAnim?.stop();
    };
  }, [reduce, clock, closed]);

  return (
    <Section
      spacing="none"
      labelledBy="hero-title"
      className="overflow-hidden"
      containerClassName="grid items-center gap-12 py-14 sm:py-20 md:grid-cols-[1.15fr_0.85fr] md:gap-8 lg:py-24"
    >
      <div>
        <h1
          id="hero-title"
          className="font-display text-5xl leading-[1.02] font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl"
        >
          Siano podane na czas. Nawet gdy Cię nie ma.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink-soft sm:text-xl">
          Areniq to worek na siano z zamkiem czasowym. Napełniasz go wieczorem, ustawiasz godzinę, a rano otwiera
          się sam, zanim dojedziesz do stajni.
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

      <div data-hero-bag className="relative mx-auto w-full max-w-sm md:max-w-none">
        <HayBag
          fill={fill}
          closed={closed}
          clock={clock}
          label="Worek Areniq zawieszony w boksie. O 6:00 zwinięty dół worka się rozwija i siano spada na ziemię."
          className="h-auto w-full rounded-[2rem]"
        />
        <p className="absolute bottom-4 left-4 rounded-full bg-straw px-4 py-2 text-sm font-semibold text-bottle">
          Otwarcie o 6:00
        </p>
      </div>
    </Section>
  );
}
