"use client";

import { useId, useState } from "react";
import { Section } from "@/components/ui/section";

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
        className="mt-3 h-11 w-full cursor-pointer accent-bottle"
      />
    </div>
  );
}

const WEEKS_PER_YEAR = 52;

/** Polish plural: 1 godzina, 2–4 godziny (not 12–14), otherwise godzin. */
function plural(n: number, one: string, few: string, many: string) {
  if (n === 1) return one;
  const lastDigit = n % 10;
  const lastTwo = n % 100;
  return lastDigit >= 2 && lastDigit <= 4 && (lastTwo < 12 || lastTwo > 14) ? few : many;
}

export function TimeCalculator() {
  const [commute, setCommute] = useState(20);
  const [feeding, setFeeding] = useState(10);
  const [days, setDays] = useState(5);

  const mornings = days * WEEKS_PER_YEAR;
  const hours = Math.round(((2 * commute + feeding) * mornings) / 60);

  return (
    <Section id="kalkulator" labelledBy="calculator-title">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 id="calculator-title" className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Ile czasu zyskasz w roku?
          </h2>
          <p className="mt-4 max-w-md text-lg text-ink-soft">
            Ustaw swój poranek. Liczymy dojazd w obie strony i samo karmienie.
          </p>
          <div className="mt-10 space-y-8">
            <Slider label="Dojazd do stajni w jedną stronę" unit="min" value={commute} min={0} max={60} step={5} onChange={setCommute} />
            <Slider label="Karmienie na miejscu" unit="min" value={feeding} min={5} max={30} step={5} onChange={setFeeding} />
            <Slider label="Poranki w tygodniu, które przejmie worek" unit={plural(days, "dzień", "dni", "dni")} value={days} min={1} max={7} step={1} onChange={setDays} />
          </div>
        </div>

        <div className="self-center border-t border-ink/15 pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-16" aria-live="polite">
          <p className="font-display text-8xl leading-none font-bold tracking-tight tabular-nums sm:text-9xl">{hours}</p>
          <p className="mt-3 font-display text-2xl font-semibold">{plural(hours, "godzina", "godziny", "godzin")} rocznie</p>
          <p className="mt-6 max-w-sm text-lg text-ink-soft">
            To {mornings} {plural(mornings, "poranek", "poranki", "poranków")} w roku, w które siano czeka na konia bez Twojego udziału.
          </p>
          <p className="mt-6 max-w-sm text-sm text-ink-soft">
            Szacunek przy założeniu, że worek przejmuje całe poranne karmienie przez {WEEKS_PER_YEAR} tygodnie w roku.
          </p>
        </div>
      </div>
    </Section>
  );
}
