"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { isStable, type WaitlistEntry } from "@/lib/campaign";
import { ErrorNote, Panel, adminField, adminSelect } from "./ui";
import { useWaitlist } from "./use-waitlist";

const dateFmt = new Intl.DateTimeFormat("pl-PL", { dateStyle: "short", timeStyle: "short" });

const COLUMNS: { key: keyof WaitlistEntry; label: string }[] = [
  { key: "created_at", label: "Data" },
  { key: "name", label: "Imię" },
  { key: "email", label: "E-mail" },
  { key: "horses", label: "Konie" },
  { key: "stable", label: "Stajnia" },
  { key: "country", label: "Kraj" },
  { key: "lang", label: "Język" },
  { key: "source", label: "Źródło" },
];

function toCsv(rows: WaitlistEntry[]) {
  const cell = (v: unknown) => `"${String(v ?? "").replaceAll('"', '""')}"`;
  const lines = [COLUMNS.map((c) => cell(c.label)).join(";")];
  for (const r of rows) lines.push(COLUMNS.map((c) => cell(r[c.key])).join(";"));
  // BOM so Excel opens Polish characters correctly; semicolons for Polish-locale Excel.
  return "﻿" + lines.join("\r\n");
}

export function WaitlistTable() {
  const { rows, error, reload } = useWaitlist();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"all" | "stable" | "private">("all");
  const [lang, setLang] = useState<"all" | "pl" | "en">("all");
  const [country, setCountry] = useState("all");

  const countries = useMemo(
    () => [...new Set((rows ?? []).map((r) => r.country).filter((c): c is string => Boolean(c)))].sort(),
    [rows],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (rows ?? []).filter(
      (r) =>
        (!q || [r.name, r.email, r.stable].some((v) => v?.toLowerCase().includes(q))) &&
        (type === "all" || (type === "stable") === isStable(r)) &&
        (lang === "all" || r.lang === lang) &&
        (country === "all" || r.country === country),
    );
  }, [rows, query, type, lang, country]);

  function exportCsv() {
    const blob = new Blob([toCsv(filtered)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: `areniq-lista-oczekujacych-${new Date().toISOString().slice(0, 10)}.csv`,
    });
    a.click();
    URL.revokeObjectURL(url);
  }

  if (error) {
    return (
      <ErrorNote>
        Nie udało się pobrać listy. Sprawdź połączenie i{" "}
        <button type="button" className="font-semibold underline" onClick={reload}>
          spróbuj ponownie
        </button>
        .
      </ErrorNote>
    );
  }

  return (
    <Panel
      title={rows ? `Lista oczekujących · ${filtered.length} z ${rows.length}` : "Lista oczekujących"}
      action={
        <Button variant="secondary" onClick={exportCsv} disabled={!filtered.length} className="min-h-10 disabled:opacity-50">
          Eksportuj CSV
        </Button>
      }
    >
      <div className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr_1fr]">
        <label className="text-sm font-medium">
          Szukaj
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Imię, e-mail lub stajnia"
            className={adminField}
          />
        </label>
        <label className="text-sm font-medium">
          Typ
          <select value={type} onChange={(e) => setType(e.target.value as typeof type)} className={adminSelect}>
            <option value="all">Wszystkie</option>
            <option value="stable">Stajnie</option>
            <option value="private">Osoby prywatne</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          Język formularza
          <select value={lang} onChange={(e) => setLang(e.target.value as typeof lang)} className={adminSelect}>
            <option value="all">Wszystkie</option>
            <option value="pl">PL</option>
            <option value="en">EN</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          Kraj
          <select value={country} onChange={(e) => setCountry(e.target.value)} className={adminSelect}>
            <option value="all">Wszystkie</option>
            {countries.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 overflow-x-auto rounded-xl border border-ink/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-cloud text-xs tracking-wide text-ink-soft uppercase">
            <tr>
              {COLUMNS.map((c) => (
                <th key={c.key} scope="col" className="px-3 py-2.5 font-semibold whitespace-nowrap">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows === null && (
              <tr>
                <td colSpan={COLUMNS.length} className="px-3 py-6 text-ink-soft" role="status">
                  Wczytywanie…
                </td>
              </tr>
            )}
            {rows && !filtered.length && (
              <tr>
                <td colSpan={COLUMNS.length} className="px-3 py-6 text-ink-soft">
                  {rows.length ? "Brak zapisów pasujących do filtrów." : "Nikt jeszcze się nie zapisał."}
                </td>
              </tr>
            )}
            {filtered.map((r) => (
              <tr key={r.id} className="border-t border-ink/10 align-top">
                <td className="px-3 py-2.5 whitespace-nowrap tabular-nums">{dateFmt.format(new Date(r.created_at))}</td>
                <td className="px-3 py-2.5">{r.name}</td>
                <td className="px-3 py-2.5">
                  <a href={`mailto:${r.email}`} className="underline decoration-ink/20 underline-offset-2 hover:decoration-gold">
                    {r.email}
                  </a>
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap">{r.horses}</td>
                <td className="px-3 py-2.5">
                  {r.stable}
                  {isStable(r) && !r.stable && <span className="text-ink-soft">stajnia (4+ koni)</span>}
                </td>
                <td className="px-3 py-2.5">{r.country}</td>
                <td className="px-3 py-2.5 uppercase">{r.lang}</td>
                <td className="px-3 py-2.5 text-ink-soft">{r.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
