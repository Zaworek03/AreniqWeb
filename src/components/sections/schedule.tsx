"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/content";

export function Schedule({ t }: { t: Dictionary["schedule"] }) {
  const [slots, setSlots] = useState(() => t.sample.map((s) => ({ ...s })));
  const active = slots.filter((s) => s.on).length;

  const toggle = (index: number) =>
    setSlots((current) => current.map((s, i) => (i === index ? { ...s, on: !s.on } : s)));

  return (
    <Section id="harmonogram" labelledBy="schedule-title" containerClassName="grid items-center gap-12 md:grid-cols-2 md:gap-16">
      <div>
        <h2 id="schedule-title" className="font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
          {t.title}
        </h2>
        <p className="mt-6 max-w-md text-lg text-ink-soft">
          {t.lead}
        </p>

        <h3 className="mt-10 font-display text-xl font-bold">{t.useCasesTitle}</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {t.useCases.map((u) => (
            <li
              key={u.label}
              className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal/15 px-4 py-2 font-medium"
            >
              <Icon name={u.icon} className="size-5 text-slate" />
              {u.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-xl shadow-charcoal/10 sm:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-display text-xl font-bold" id="schedule-card-title">
            {t.cardTitle}
          </p>
          <p className="text-sm text-ink-soft" aria-live="polite">
            {t.activeCount} {active}
          </p>
        </div>
        <ul className="mt-4 divide-y divide-charcoal/10" aria-labelledby="schedule-card-title">
          {slots.map((slot, i) => (
            <li key={slot.day} className="flex items-center gap-4 py-3">
              <span className="w-8 font-bold" aria-hidden="true">
                {slot.day}
              </span>
              <span className={`flex-1 tabular-nums ${slot.on ? "text-ink" : "text-ink-soft"}`} aria-hidden="true">
                {slot.time}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={slot.on}
                aria-label={`${slot.dayLabel}, ${slot.time}`}
                onClick={() => toggle(i)}
                className={`relative h-8 w-14 shrink-0 rounded-full transition-colors duration-200 ${
                  slot.on ? "bg-gold" : "bg-charcoal/15"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 size-6 rounded-full bg-white shadow transition-transform duration-200 ease-out-soft ${
                    slot.on ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink-soft">{t.cardNote}</p>
      </div>
    </Section>
  );
}
