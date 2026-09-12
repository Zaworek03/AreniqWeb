"use client";

import { animate, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { HayBag } from "@/components/hay-bag";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { WAITLIST_HREF } from "@/lib/site";

export function Hero() {
  const reduce = useReducedMotion();
  const fill = useMotionValue(1);
  const closed = useMotionValue(1);
  const clock = useMotionValue(0);

  // One page-load moment: the clock reaches 6:00 and the bag opens.
  useEffect(() => {
    if (reduce) {
      clock.set(1);
      closed.set(0);
      return;
    }
    let stopped = false;
    const clockAnim = animate(clock, 1, { duration: 1.6, delay: 0.6, ease: "easeInOut" });
    let coverAnim: ReturnType<typeof animate> | undefined;
    clockAnim.then(() => {
      if (!stopped) coverAnim = animate(closed, 0, { duration: 1.1, ease: [0.22, 1, 0.36, 1] });
    });
    return () => {
      stopped = true;
      clockAnim.stop();
      coverAnim?.stop();
    };
  }, [reduce, clock, closed]);

  return (
    <section aria-labelledby="hero-title" className="overflow-hidden">
      <Container className="grid items-center gap-12 py-14 sm:py-20 md:grid-cols-[1.15fr_0.85fr] md:gap-8 lg:py-24">
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
            <ButtonLink href={WAITLIST_HREF}>Zapisz się na listę</ButtonLink>
            <ButtonLink href="/#jak-to-dziala" variant="secondary">
              Zobacz, jak działa
            </ButtonLink>
          </div>
          <p className="mt-4 text-sm text-ink-soft">Zapis jest bezpłatny i do niczego nie zobowiązuje.</p>
        </div>

        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          <HayBag
            fill={fill}
            closed={closed}
            clock={clock}
            label="Worek Areniq zawieszony w boksie. O 6:00 osłona opada i odsłania siano."
            className="h-auto w-full rounded-[2rem]"
          />
          <p className="absolute bottom-5 left-5 rounded-full bg-straw px-4 py-2 text-sm font-semibold text-bottle">
            Otwarcie o 6:00
          </p>
        </div>
      </Container>
    </section>
  );
}
