"use client";

import { m, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { HayBag, StaticHayBag } from "@/components/hay-bag";
import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/content";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function HowItWorks({ t }: { t: Dictionary["how"] }) {
  const STEPS = t.steps;
  const reduce = usePrefersReducedMotion();
  const stepsRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ["start 0.7", "end 0.7"] });

  // Desktop only, one quarter of the scroll per step: fill, set the schedule, hang, release.
  const scrollFill = useTransform(scrollYProgress, [0.02, 0.2], [0, 1]);
  const scrollArmed = useTransform(scrollYProgress, [0.27, 0.42], [0, 1]);
  const scrollHung = useTransform(scrollYProgress, [0.52, 0.68], [0, 1]);
  const scrollOpen = useTransform(scrollYProgress, [0.77, 0.93], [0, 1]);
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const one = useMotionValue(1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length)));
  });

  return (
    <Section id="jak-to-dziala" tone="cloud" labelledBy="how-title">
      <h2 id="how-title" className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        {t.title}
      </h2>
      <p className="mt-4 max-w-xl text-lg text-ink-soft">{t.lead}</p>

      <div className="mt-12 grid gap-16 md:grid-cols-2">
        {/* Scroll-driven illustration on wide screens; small screens get one static picture per step. */}
        <div className="sticky top-28 hidden self-start md:block">
          <HayBag
            fill={reduce ? one : scrollFill}
            armed={reduce ? one : scrollArmed}
            hung={reduce ? one : scrollHung}
            open={reduce ? one : scrollOpen}
            label={t.illustrationLabel}
            className="mx-auto h-[min(calc(100dvh_-_9rem),40rem)] w-auto"
          />
        </div>

        <ol ref={stepsRef} className="relative md:pb-[25vh]">
          <div aria-hidden="true" className="absolute top-2 bottom-[calc(25vh+0.5rem)] left-[1.1rem] hidden w-0.5 bg-charcoal/15 md:block">
            <m.div className="h-full w-full origin-top bg-charcoal" style={{ scaleY: reduce ? 1 : line }} />
          </div>
          {STEPS.map((step, i) => {
            // On small screens every step is shown fully; highlighting only applies with the sticky illustration.
            const isActive = reduce || i <= active;
            return (
              <li
                key={step.title}
                aria-current={!reduce && i === active ? "step" : undefined}
                className="relative grid grid-cols-[2.25rem_1fr] gap-x-5 pb-14 last:pb-0 md:flex md:min-h-[50vh] md:items-center md:gap-6 md:pb-10"
              >
                <span
                  className={`relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-charcoal font-display text-lg font-bold text-mist transition-colors duration-300 ${
                    isActive ? "" : "md:bg-mist md:text-ink-soft"
                  }`}
                >
                  {i + 1}
                </span>
                <div>
                  {/* Inactive steps change color, not opacity, so text keeps AA contrast. */}
                  <h3
                    className={`font-display text-3xl font-extrabold tracking-tight transition-colors duration-300 sm:text-4xl ${
                      isActive ? "" : "md:text-ink-soft"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-lg text-ink-soft">{step.text}</p>
                </div>
                <StaticHayBag
                  {...step.bag}
                  className="col-start-2 mt-4 h-64 w-auto justify-self-start sm:h-72 md:hidden"
                />
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
