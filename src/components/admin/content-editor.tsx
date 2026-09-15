"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CONTENT_KEYS, type FaqItem, defaultFaq } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { getSupabase } from "@/lib/supabase";
import { ErrorNote, Panel, adminField } from "./ui";

type LastPublish = { at: string; by: string };

const dateFmt = new Intl.DateTimeFormat("pl-PL", { dateStyle: "medium", timeStyle: "short" });

export function ContentEditor() {
  const [lang, setLang] = useState<Locale>("pl");
  const [items, setItems] = useState<FaqItem[] | null>(null);
  const [savedJson, setSavedJson] = useState("");
  const [lastPublish, setLastPublish] = useState<LastPublish | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState<"save" | "publish" | null>(null);

  useEffect(() => {
    getSupabase()
      ?.from("site_content")
      .select("key, value")
      .in("key", [CONTENT_KEYS.faq(lang), CONTENT_KEYS.lastPublish])
      .then(({ data, error }) => {
        if (error) return setLoadError(true);
        const byKey = Object.fromEntries(data.map((r) => [r.key, r.value]));
        const faq = (byKey[CONTENT_KEYS.faq(lang)] as FaqItem[] | undefined) ?? defaultFaq(lang);
        setItems(faq);
        // Until the first save the page uses the FAQ from the repo, which is what the editor shows.
        setSavedJson(JSON.stringify(faq));
        setLastPublish((byKey[CONTENT_KEYS.lastPublish] as LastPublish | undefined) ?? null);
      });
  }, [lang]);

  if (loadError) return <ErrorNote>Nie udało się pobrać treści. Odśwież stronę, żeby spróbować ponownie.</ErrorNote>;
  if (!items) return <p role="status" className="text-ink-soft">Wczytywanie treści…</p>;

  const dirty = JSON.stringify(items) !== savedJson;
  const invalid = items.some((i) => !i.q.trim() || !i.a.trim());

  const update = (index: number, patch: Partial<FaqItem>) =>
    setItems(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));

  const move = (index: number, by: -1 | 1) => {
    const next = [...items];
    [next[index], next[index + by]] = [next[index + by], next[index]];
    setItems(next);
  };

  async function save() {
    if (invalid) {
      setMessage({ kind: "error", text: "Każde pytanie musi mieć treść pytania i odpowiedzi." });
      return false;
    }
    setBusy("save");
    const supabase = getSupabase()!;
    const { data: user } = await supabase.auth.getUser();
    const clean = items!.map((i) => ({ q: i.q.trim(), a: i.a.trim() }));
    const { error } = await supabase.from("site_content").upsert({
      key: CONTENT_KEYS.faq(lang),
      value: clean,
      updated_at: new Date().toISOString(),
      updated_by: user.user?.id ?? null,
    });
    setBusy(null);
    if (error) {
      setMessage({ kind: "error", text: "Nie udało się zapisać zmian. Spróbuj ponownie." });
      return false;
    }
    setItems(clean);
    setSavedJson(JSON.stringify(clean));
    setMessage({ kind: "ok", text: "Zapisano. Zmiany będą widoczne na stronie po publikacji." });
    return true;
  }

  async function publish() {
    if (dirty && !(await save())) return;
    setBusy("publish");
    const { data, error } = await getSupabase()!.functions.invoke<LastPublish>("publish-site");
    setBusy(null);
    if (error || !data) {
      setMessage({
        kind: "error",
        text: "Nie udało się uruchomić publikacji. Sprawdź, czy funkcja publish-site jest wdrożona (README), i spróbuj ponownie.",
      });
      return;
    }
    setLastPublish(data);
    setMessage({ kind: "ok", text: "Publikacja uruchomiona. Nowa wersja strony pojawi się za około 2–3 minuty." });
  }

  return (
    <div className="grid gap-6">
      <Panel
        title="Pytania i odpowiedzi (FAQ)"
        action={
          <div className="flex flex-wrap items-center gap-3">
            <div role="group" aria-label="Język FAQ" className="flex rounded-full bg-cloud p-1 text-sm font-semibold">
              {(["pl", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  aria-pressed={lang === l}
                  disabled={dirty && lang !== l}
                  title={dirty && lang !== l ? "Najpierw zapisz zmiany" : undefined}
                  onClick={() => {
                    setItems(null);
                    setMessage(null);
                    setLang(l);
                  }}
                  className="min-h-9 rounded-full px-3 uppercase aria-pressed:bg-white aria-pressed:shadow-sm disabled:opacity-40"
                >
                  {l}
                </button>
              ))}
            </div>
            <Button variant="secondary" onClick={save} disabled={!dirty || busy !== null} className="min-h-10 disabled:opacity-50">
              {busy === "save" ? "Zapisywanie…" : "Zapisz zmiany"}
            </Button>
            <Button onClick={publish} disabled={busy !== null} className="min-h-10 disabled:opacity-50">
              {busy === "publish" ? "Publikowanie…" : "Publikuj na stronie"}
            </Button>
          </div>
        }
      >
        <p className="text-sm text-ink-soft">
          {lastPublish
            ? `Ostatnia publikacja: ${dateFmt.format(new Date(lastPublish.at))}, ${lastPublish.by}.`
            : "Strona nie była jeszcze publikowana z panelu."}{" "}
          {dirty && <b className="text-ink">Masz niezapisane zmiany.</b>}
        </p>
        <div aria-live="polite" className="mt-3">
          {message && (
            <p className={`rounded-xl p-3 ${message.kind === "ok" ? "bg-[#dcefe2] text-[#1d5a33]" : "bg-cloud text-ink"}`}>
              {message.text}
            </p>
          )}
        </div>

        <ol className="mt-5 grid gap-4">
          {items.map((item, i) => (
            <li key={i} className="rounded-xl border border-ink/10 bg-mist p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-semibold text-ink-soft">Pytanie {i + 1}</span>
                <div className="flex gap-1 text-sm">
                  <IconButton label={`Przesuń pytanie ${i + 1} wyżej`} disabled={i === 0} onClick={() => move(i, -1)}>
                    ↑
                  </IconButton>
                  <IconButton
                    label={`Przesuń pytanie ${i + 1} niżej`}
                    disabled={i === items.length - 1}
                    onClick={() => move(i, 1)}
                  >
                    ↓
                  </IconButton>
                  <IconButton
                    label={`Usuń pytanie ${i + 1}`}
                    disabled={items.length === 1}
                    onClick={() => setItems(items.filter((_, j) => j !== i))}
                  >
                    Usuń
                  </IconButton>
                </div>
              </div>
              <label className="mt-2 block text-sm font-medium">
                Pytanie
                <input value={item.q} onChange={(e) => update(i, { q: e.target.value })} className={adminField} />
              </label>
              <label className="mt-3 block text-sm font-medium">
                Odpowiedź
                <textarea
                  value={item.a}
                  onChange={(e) => update(i, { a: e.target.value })}
                  rows={3}
                  className={`${adminField} h-auto py-2`}
                />
              </label>
            </li>
          ))}
        </ol>
        <Button variant="secondary" className="mt-4 min-h-10" onClick={() => setItems([...items, { q: "", a: "" }])}>
          Dodaj pytanie
        </Button>
      </Panel>
    </div>
  );
}

function IconButton({
  label,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="min-h-9 min-w-9 rounded-lg px-2 font-semibold hover:bg-cloud disabled:opacity-30"
      {...props}
    >
      {children}
    </button>
  );
}
