"use client";

import { useId, useState } from "react";
import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/content";
import type { PluralForms } from "@/content/pl";
import type { Locale } from "@/lib/i18n";

type SliderProps = {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

function Slider({ label, unit, value, min, max, step, onChange }: SliderProps) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-medium">
          {label}
        </label>
        <output htmlFor={id} className="shrink-0 font-display text-xl font-semibold tabular-nums">
          {value} {unit}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-11 w-full cursor-pointer accent-charcoal"
      />
    </div>
  );
}

const WEEKS_PER_YEAR = 52;

export function TimeCalculator({ t, locale }: { t: Dictionary["calculator"]; locale: Locale }) {
  // Intl picks the right form: Polish 1 godzina, 2–4 godziny (not 12–14), 5 godzin; English 1 hour, 2 hours.
  const rules = new Intl.PluralRules(locale);
  const plural = (n: number, forms: PluralForms) => forms[rules.select(n) as keyof PluralForms] ?? forms.other;

  const [commute, setCommute] = useState(20);
  const [feeding, setFeeding] = useState(10);
  const [days, setDays] = useState(5);

  const mornings = days * WEEKS_PER_YEAR;
  const hours = Math.round(((2 * commute + feeding) * mornings) / 60);

  return (
    <Section id="kalkulator" labelledBy="calculator-title">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 id="calculator-title" className="font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-4 max-w-md text-lg text-ink-soft">
            {t.lead}
          </p>
          <div className="mt-10 space-y-8">
            <Slider label={t.commute} unit={t.minutes} value={commute} min={0} max={60} step={5} onChange={setCommute} />
            <Slider label={t.feeding} unit={t.minutes} value={feeding} min={5} max={30} step={5} onChange={setFeeding} />
            <Slider label={t.days} unit={plural(days, t.dayForms)} value={days} min={1} max={7} step={1} onChange={setDays} />
          </div>
        </div>

        <div className="self-center border-t border-ink/15 pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-16" aria-live="polite">
          <p className="font-display text-8xl leading-none font-extrabold tracking-tight tabular-nums sm:text-9xl">{hours}</p>
          <p className="mt-3 font-display text-2xl font-semibold">{plural(hours, t.hourForms)} {t.perYear}</p>
          <p className="mt-6 max-w-sm text-lg text-ink-soft">
            {t.result.replace("{mornings}", String(mornings)).replace("{morningWord}", plural(mornings, t.morningForms))}
          </p>
          <p className="mt-6 max-w-sm text-sm text-ink-soft">
            {t.assumption.replace("{weeks}", String(WEEKS_PER_YEAR))}
          </p>
        </div>
      </div>
    </Section>
  );
}
