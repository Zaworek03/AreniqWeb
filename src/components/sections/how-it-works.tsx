"use client";

import { m, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { HayBag } from "@/components/hay-bag";
import { Container } from "@/components/ui/container";
import { STEPS } from "@/content/product";

export function HowItWorks() {
  const reduce = useReducedMotion();
  const stepsRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ["start 0.7", "end 0.7"] });

  // Step 1 fills the bag, step 2 closes it and turns the clock, step 3 opens it.
  const scrollFill = useTransform(scrollYProgress, [0.02, 0.28], [0, 1]);
  const scrollClosed = useTransform(scrollYProgress, [0, 0.36, 0.44, 0.7, 0.85], [0, 0, 1, 1, 0]);
  const scrollClock = useTransform(scrollYProgress, [0.44, 0.68], [0, 1]);
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const one = useMotionValue(1);
  const zero = useMotionValue(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(v < 0.34 ? 0 : v < 0.68 ? 1 : 2);
  });

  return (
    <section id="jak-to-dziala" aria-labelledby="how-title" className="bg-straw py-20 sm:py-28">
      <Container>
        <h2 id="how-title" className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Jak to działa
        </h2>
        <p className="mt-4 max-w-xl text-lg text-ink-soft">Wieczorem zajmuje to minutę. Rano nie musisz nic robić.</p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-16">
          <div className="sticky top-16 z-20 -mx-5 bg-straw px-5 py-3 sm:top-18 md:top-28 md:mx-0 md:self-start md:px-0 md:py-0">
            <HayBag
              fill={reduce ? one : scrollFill}
              closed={reduce ? zero : scrollClosed}
              clock={reduce ? one : scrollClock}
              label="Ilustracja trzech kroków: worek napełniony sianem, zamknięty do ustawionej godziny i otwarty o 6:00."
              className="mx-auto h-[34vh] w-auto rounded-[2rem] md:h-[min(calc(100dvh_-_9rem),40rem)]"
            />
          </div>

          <ol ref={stepsRef} className="relative">
            <div aria-hidden="true" className="absolute top-2 bottom-2 left-[1.1rem] w-0.5 bg-sand">
              <m.div className="h-full w-full origin-top bg-bottle" style={{ scaleY: reduce ? 1 : line }} />
            </div>
            {STEPS.map((step, i) => {
              const isActive = reduce || i <= active;
              return (
                <li
                  key={step.title}
                  aria-current={!reduce && i === active ? "step" : undefined}
                  className="relative flex min-h-[45vh] gap-6 pb-10 md:min-h-[60vh] md:items-center"
                >
                  <span
                    className={`relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold transition-colors duration-300 ${
                      isActive ? "bg-bottle text-straw" : "bg-sand text-ink-soft"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className={`transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-45"}`}>
                    <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{step.title}</h3>
                    <p className="mt-3 max-w-sm text-lg text-ink-soft">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
