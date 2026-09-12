"use client";

import { m, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { HayBag, StaticHayBag } from "@/components/hay-bag";
import { Section } from "@/components/ui/section";
import { STEPS } from "@/content/product";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function HowItWorks() {
  const reduce = usePrefersReducedMotion();
  const stepsRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ["start 0.7", "end 0.7"] });

  // Desktop only: step 1 fills the bag, step 2 turns the clock, step 3 unrolls the bottom.
  const scrollFill = useTransform(scrollYProgress, [0.02, 0.28], [0, 1]);
  const scrollClock = useTransform(scrollYProgress, [0.36, 0.64], [0, 1]);
  const scrollClosed = useTransform(scrollYProgress, [0.7, 0.88], [1, 0]);
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const one = useMotionValue(1);
  const zero = useMotionValue(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(v < 0.34 ? 0 : v < 0.68 ? 1 : 2);
  });

  return (
    <Section id="jak-to-dziala" labelledBy="how-title">
      <h2 id="how-title" className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Jak to działa
      </h2>
      <p className="mt-4 max-w-xl text-lg text-ink-soft">Wieczorem zajmuje to minutę. Rano nie musisz nic robić.</p>

      <div className="mt-12 grid gap-16 md:grid-cols-2">
        {/* Scroll-driven illustration on wide screens; small screens get one static picture per step. */}
        <div className="sticky top-28 hidden self-start md:block">
          <HayBag
            fill={reduce ? one : scrollFill}
            closed={reduce ? zero : scrollClosed}
            clock={reduce ? one : scrollClock}
            label="Ilustracja trzech kroków: worek napełniony sianem, zamknięty do ustawionej godziny, a o 6:00 rozwinięty, z sianem na ziemi."
            className="mx-auto h-[min(calc(100dvh_-_9rem),40rem)] w-auto rounded-[2rem]"
          />
        </div>

        <ol ref={stepsRef} className="relative">
          <div aria-hidden="true" className="absolute top-2 bottom-2 left-[1.1rem] hidden w-0.5 bg-sand md:block">
            <m.div className="h-full w-full origin-top bg-bottle" style={{ scaleY: reduce ? 1 : line }} />
          </div>
          {STEPS.map((step, i) => {
            // On small screens every step is shown fully; highlighting only applies with the sticky illustration.
            const isActive = reduce || i <= active;
            return (
              <li
                key={step.title}
                aria-current={!reduce && i === active ? "step" : undefined}
                className="relative grid grid-cols-[2.25rem_1fr] gap-x-5 pb-14 last:pb-0 md:flex md:min-h-[60vh] md:items-center md:gap-6 md:pb-10"
              >
                <span
                  className={`relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-bottle font-display text-lg font-bold text-straw transition-colors duration-300 ${
                    isActive ? "" : "md:bg-sand md:text-ink-soft"
                  }`}
                >
                  {i + 1}
                </span>
                <div>
                  {/* Inactive steps change color, not opacity, so text keeps AA contrast. */}
                  <h3
                    className={`font-display text-3xl font-semibold tracking-tight transition-colors duration-300 sm:text-4xl ${
                      isActive ? "" : "md:text-ink-soft"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-lg text-ink-soft">{step.text}</p>
                </div>
                <StaticHayBag
                  {...step.bag}
                  className="col-start-2 mt-6 h-64 w-auto justify-self-start rounded-[1.5rem] sm:h-72 md:hidden"
                />
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
