"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { CAMPAIGN_WEEKS, TARGETS, campaignWeek, isPoland, isStable } from "@/lib/campaign";
import { getSupabase } from "@/lib/supabase";
import { ErrorNote, Panel, adminField, adminSelect } from "./ui";
import { useWaitlist } from "./use-waitlist";

// Validated with the dataviz palette checker on white: CVD ΔE 28, both inside the lightness band.
// Gold is below 3:1 against white, so every value is also given as text and in the table below.
const SERIES = {
  poland: { label: "Polska", color: "#3f6fc0" },
  europe: { label: "Reszta Europy", color: "#c9992f" },
} as const;

type Metrics = {
  week: string;
  ig_followers: number | null;
  ig_non_pl_pct: number | null;
  stable_talks: number | null;
  stable_tests: number | null;
  media_mentions: number | null;
  notes: string | null;
};

export function CampaignResults() {
  const { rows, error } = useWaitlist();

  const stats = useMemo(() => {
    const list = rows ?? [];
    const poland = list.filter(isPoland).length;
    const countries = new Set(list.map((r) => r.country).filter((c) => c && c !== "OTHER")).size;
    const weekly = CAMPAIGN_WEEKS.map((w) => ({ ...w, poland: 0, europe: 0 }));
    for (const r of list) {
      const week = weekly.find((w) => w.id === campaignWeek(r.created_at));
      if (week) week[isPoland(r) ? "poland" : "europe"] += 1;
    }
    return {
      total: list.length,
      poland,
      europe: list.length - poland,
      stables: list.filter(isStable).length,
      countries,
      weekly,
    };
  }, [rows]);

  if (error) return <ErrorNote>Nie udało się pobrać zapisów. Odśwież stronę, żeby spróbować ponownie.</ErrorNote>;
  if (!rows) return <p role="status" className="text-ink-soft">Wczytywanie wyników…</p>;

  const peak = Math.max(1, ...stats.weekly.map((w) => w.poland + w.europe));

  return (
    <div className="grid min-w-0 grid-cols-1 gap-6">
      <Panel title="Postęp względem celów (do 27.12.2026)">
        <div className="grid gap-5 md:grid-cols-2">
          <Progress label="Wszystkie zapisy" value={stats.total} target={TARGETS.total} emphasis />
          <Progress label="Stajnie" value={stats.stables} target={TARGETS.stables} />
          <Progress label="Polska" value={stats.poland} target={TARGETS.poland} color={SERIES.poland.color} />
          <Progress label="Reszta Europy" value={stats.europe} target={TARGETS.restOfEurope} color={SERIES.europe.color} />
          <Progress label="Kraje z co najmniej 1 zapisem" value={stats.countries} target={TARGETS.countries} />
        </div>
      </Panel>

      <Panel title="Zapisy tydzień po tygodniu">
        <ul className="mb-4 flex flex-wrap gap-4 text-sm text-ink-soft" aria-label="Legenda">
          {Object.values(SERIES).map((s) => (
            <li key={s.label} className="flex items-center gap-2">
              <span className="size-3 rounded-sm" style={{ background: s.color }} aria-hidden="true" />
              {s.label}
            </li>
          ))}
        </ul>
        <div className="overflow-x-auto">
          <div
            className="grid h-60 min-w-[640px] pt-6 grid-cols-13 items-end gap-2 border-b border-ink/15"
            role="img"
            aria-label="Wykres zapisów w tygodniach T40–T52, szczegóły w tabeli poniżej"
          >
            {stats.weekly.map((w) => {
              const sum = w.poland + w.europe;
              return (
                <div
                  key={w.id}
                  className="group relative flex h-full flex-col justify-end"
                  title={`${w.id} (${w.label}): Polska ${w.poland}, reszta Europy ${w.europe}`}
                >
                  {sum > 0 && (
                    <span className="mb-1 text-center text-xs font-semibold tabular-nums text-ink">{sum}</span>
                  )}
                  <div className="flex flex-col gap-0.5" style={{ height: `${(sum / peak) * 85}%` }}>
                    {w.europe > 0 && (
                      <div className="rounded-t-[4px]" style={{ flexGrow: w.europe, background: SERIES.europe.color }} />
                    )}
                    {w.poland > 0 && (
                      <div
                        className={w.europe > 0 ? "" : "rounded-t-[4px]"}
                        style={{ flexGrow: w.poland, background: SERIES.poland.color }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid min-w-[640px] grid-cols-13 gap-2 pt-2 text-center text-xs text-ink-soft">
            {stats.weekly.map((w) => (
              <span key={w.id}>
                <b className="block font-semibold text-ink">{w.id}</b>
                {w.label.split("–")[0]}
              </span>
            ))}
          </div>
        </div>
      </Panel>

      <WeeklyMetrics weekly={stats.weekly} />
    </div>
  );
}

function Progress({
  label,
  value,
  target,
  color = "#3a3a3e",
  emphasis = false,
}: {
  label: string;
  value: number;
  target: number;
  color?: string;
  emphasis?: boolean;
}) {
  const pct = Math.min(100, Math.round((value / target) * 100));
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-medium">{label}</span>
        <span className="tabular-nums">
          <b className={emphasis ? "font-display text-2xl" : "font-display text-lg"}>{value}</b>
          <span className="text-ink-soft"> / {target} · {pct}%</span>
        </span>
      </div>
      <div
        className="mt-2 h-2.5 overflow-hidden rounded-full bg-cloud"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={target}
        aria-valuenow={value}
      >
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

const METRIC_FIELDS = [
  { key: "ig_followers", label: "Obserwujący IG" },
  { key: "ig_non_pl_pct", label: "Odbiorcy spoza PL (%)" },
  { key: "stable_talks", label: "Rozmowy ze stajniami" },
  { key: "stable_tests", label: "Testy w stajniach" },
  { key: "media_mentions", label: "Wzmianki w mediach" },
] as const;

function WeeklyMetrics({ weekly }: { weekly: { id: string; label: string; poland: number; europe: number }[] }) {
  const [metrics, setMetrics] = useState<Record<string, Metrics>>({});
  const [loadError, setLoadError] = useState(false);
  const [week, setWeek] = useState(() => {
    const current = campaignWeek(new Date().toISOString());
    return current ?? CAMPAIGN_WEEKS[0].id;
  });
  const [saving, setSaving] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    getSupabase()
      ?.from("campaign_metrics")
      .select("*")
      .then(({ data, error }) => {
        if (error) setLoadError(true);
        else setMetrics(Object.fromEntries((data as Metrics[]).map((m) => [m.week, m])));
      });
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const num = (k: string) => {
      const v = String(data.get(k) ?? "").trim().replace(",", ".");
      return v === "" ? null : Number(v);
    };
    const row: Metrics = {
      week,
      ig_followers: num("ig_followers"),
      ig_non_pl_pct: num("ig_non_pl_pct"),
      stable_talks: num("stable_talks"),
      stable_tests: num("stable_tests"),
      media_mentions: num("media_mentions"),
      notes: String(data.get("notes") ?? "").trim() || null,
    };
    setSaving("saving");
    const { error } = await getSupabase()!
      .from("campaign_metrics")
      .upsert({ ...row, updated_at: new Date().toISOString() });
    if (error) return setSaving("error");
    setMetrics((m) => ({ ...m, [week]: row }));
    setSaving("saved");
  }

  const current = metrics[week];
  const baseline = metrics.T40?.ig_followers ?? null;
  const latestFollowers = [...weekly].reverse().map((w) => metrics[w.id]?.ig_followers).find((v) => v != null) ?? null;

  return (
    <Panel title="Liczby wpisywane co tydzień">
      {loadError && <ErrorNote>Nie udało się pobrać zapisanych liczb. Odśwież stronę.</ErrorNote>}
      <p className="mb-4 text-sm text-ink-soft">
        Wpisujcie w każdy piątek. Przyrost obserwujących liczymy od T40:{" "}
        <b className="text-ink tabular-nums">
          {baseline != null && latestFollowers != null ? `+${latestFollowers - baseline}` : "brak danych"}
        </b>{" "}
        / cel +{TARGETS.igFollowersGain}.
      </p>

      <form key={week} onSubmit={onSubmit} className="grid gap-3 rounded-xl bg-mist p-4 sm:grid-cols-3 lg:grid-cols-6">
        <label className="text-sm font-medium">
          Tydzień
          <select
            value={week}
            onChange={(e) => {
              setWeek(e.target.value);
              setSaving("idle");
            }}
            className={adminSelect}
          >
            {weekly.map((w) => (
              <option key={w.id} value={w.id}>
                {w.id} · {w.label}
              </option>
            ))}
          </select>
        </label>
        {METRIC_FIELDS.map((f) => (
          <label key={f.key} className="text-sm font-medium">
            {f.label}
            <input
              name={f.key}
              type="number"
              min={0}
              max={f.key === "ig_non_pl_pct" ? 100 : undefined}
              step={f.key === "ig_non_pl_pct" ? 0.1 : 1}
              defaultValue={current?.[f.key] ?? ""}
              className={adminField}
            />
          </label>
        ))}
        <label className="text-sm font-medium sm:col-span-3 lg:col-span-5">
          Notatki
          <input name="notes" type="text" maxLength={2000} defaultValue={current?.notes ?? ""} className={adminField} />
        </label>
        <div className="flex items-end gap-3">
          <Button type="submit" disabled={saving === "saving"} className="min-h-11 w-full disabled:opacity-70">
            {saving === "saving" ? "Zapisywanie…" : "Zapisz"}
          </Button>
        </div>
        <p aria-live="polite" className="text-sm sm:col-span-3 lg:col-span-6">
          {saving === "saved" && `Zapisano liczby dla ${week}.`}
          {saving === "error" && "Nie udało się zapisać. Sprawdź, czy wartości są liczbami nieujemnymi, i spróbuj ponownie."}
        </p>
      </form>

      <div className="mt-5 overflow-x-auto rounded-xl border border-ink/10">
        <table className="w-full text-left text-sm tabular-nums">
          <thead className="bg-cloud text-xs tracking-wide text-ink-soft uppercase">
            <tr>
              <th scope="col" className="px-3 py-2.5">Tydzień</th>
              <th scope="col" className="px-3 py-2.5">Zapisy PL</th>
              <th scope="col" className="px-3 py-2.5">Zapisy Europa</th>
              {METRIC_FIELDS.map((f) => (
                <th key={f.key} scope="col" className="px-3 py-2.5">
                  {f.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weekly.map((w) => (
              <tr key={w.id} className="border-t border-ink/10">
                <th scope="row" className="px-3 py-2 text-left font-semibold whitespace-nowrap">
                  {w.id} <span className="font-normal text-ink-soft">{w.label}</span>
                </th>
                <td className="px-3 py-2">{w.poland}</td>
                <td className="px-3 py-2">{w.europe}</td>
                {METRIC_FIELDS.map((f) => (
                  <td key={f.key} className="px-3 py-2">
                    {metrics[w.id]?.[f.key] ?? "–"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
