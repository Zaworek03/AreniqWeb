"use client";

import { useEffect, useMemo, useState } from "react";
import { CAMPAIGN_WEEKS, campaignWeek } from "@/lib/campaign";
import { getSupabase } from "@/lib/supabase";
import { ErrorNote, Panel, adminSelect } from "./ui";

type Status = "todo" | "doing" | "done" | "skipped";

type Task = {
  id: number;
  week: string;
  phase: string;
  title: string;
  channel: string;
  owner: string;
  kind: "task" | "checkpoint";
  status: Status;
  sort: number;
};

const STATUS: Record<Status, { label: string; className: string }> = {
  todo: { label: "Do zrobienia", className: "bg-cloud text-ink" },
  doing: { label: "W trakcie", className: "bg-[#dbe6f7] text-[#1f3f73]" },
  done: { label: "Zrobione", className: "bg-[#dcefe2] text-[#1d5a33]" },
  skipped: { label: "Pominięte", className: "bg-white text-ink-soft line-through shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12)]" },
};

const OWNERS = [
  { id: "O", label: "Oliwia" },
  { id: "M", label: "Magdalena" },
  { id: "B", label: "Bartosz" },
] as const;

export function CampaignCalendar() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [error, setError] = useState(false);
  const [owner, setOwner] = useState("all");
  const [hideDone, setHideDone] = useState(false);
  const [saveError, setSaveError] = useState("");
  const currentWeek = campaignWeek(new Date().toISOString());

  useEffect(() => {
    getSupabase()
      ?.from("campaign_tasks")
      .select("id, week, phase, title, channel, owner, kind, status, sort")
      .order("week")
      .order("sort")
      .then(({ data, error: err }) => {
        if (err) setError(true);
        else setTasks(data as Task[]);
      });
  }, []);

  async function changeStatus(task: Task, status: Status) {
    setSaveError("");
    setTasks((all) => all?.map((t) => (t.id === task.id ? { ...t, status } : t)) ?? null);
    const { error: err } = await getSupabase()!
      .from("campaign_tasks")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", task.id);
    if (err) {
      setTasks((all) => all?.map((t) => (t.id === task.id ? { ...t, status: task.status } : t)) ?? null);
      setSaveError(`Nie udało się zmienić statusu „${task.title}”. Spróbuj ponownie.`);
    }
  }

  const visible = useMemo(
    () =>
      (tasks ?? []).filter(
        (t) =>
          (owner === "all" || t.owner.includes(owner) || t.owner === "cały zespół") &&
          !(hideDone && (t.status === "done" || t.status === "skipped")),
      ),
    [tasks, owner, hideDone],
  );

  if (error) return <ErrorNote>Nie udało się pobrać kalendarza. Odśwież stronę, żeby spróbować ponownie.</ErrorNote>;
  if (!tasks) return <p role="status" className="text-ink-soft">Wczytywanie kalendarza…</p>;

  const done = tasks.filter((t) => t.status === "done").length;

  return (
    <Panel
      title={`Kalendarz kampanii · ${done} z ${tasks.length} zrobione`}
      action={
        <div className="flex flex-wrap items-end gap-4 text-sm">
          <label className="font-medium">
            Osoba
            <select value={owner} onChange={(e) => setOwner(e.target.value)} className={`${adminSelect} h-10`}>
              <option value="all">Wszyscy</option>
              {OWNERS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex h-10 items-center gap-2 font-medium">
            <input type="checkbox" checked={hideDone} onChange={(e) => setHideDone(e.target.checked)} className="size-4 accent-charcoal" />
            Ukryj zrobione
          </label>
        </div>
      }
    >
      <div aria-live="polite">{saveError && <ErrorNote>{saveError}</ErrorNote>}</div>

      <div className="grid gap-6">
        {CAMPAIGN_WEEKS.map((w) => {
          const weekTasks = visible.filter((t) => t.week === w.id);
          if (!weekTasks.length) return null;
          const isCurrent = w.id === currentWeek;
          return (
            <section key={w.id} aria-labelledby={`week-${w.id}`}>
              <h3 id={`week-${w.id}`} className="flex flex-wrap items-baseline gap-x-3 border-b border-ink/10 pb-2">
                <span className="font-display text-lg font-bold">{w.id}</span>
                <span className="text-sm text-ink-soft tabular-nums">{w.label}</span>
                <span className="text-sm text-ink-soft">{weekTasks[0].phase}</span>
                {isCurrent && <span className="rounded-full bg-gold/20 px-2 py-0.5 text-xs font-semibold text-gold-dark">ten tydzień</span>}
              </h3>
              <ul className="divide-y divide-ink/10">
                {weekTasks.map((t) => (
                  <li key={t.id} className="grid gap-2 py-3 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6">
                    <div>
                      <p className={t.status === "skipped" ? "text-ink-soft line-through" : ""}>
                        {t.kind === "checkpoint" && (
                          <span className="mr-2 rounded-full bg-gold/20 px-2 py-0.5 text-xs font-semibold text-gold-dark">
                            punkt kontrolny
                          </span>
                        )}
                        {t.title}
                      </p>
                      <p className="mt-0.5 text-sm text-ink-soft">
                        {t.channel} · {t.owner}
                      </p>
                    </div>
                    <label className="sr-only" htmlFor={`status-${t.id}`}>
                      Status: {t.title}
                    </label>
                    <select
                      id={`status-${t.id}`}
                      value={t.status}
                      onChange={(e) => changeStatus(t, e.target.value as Status)}
                      className={`h-9 rounded-full border-0 px-3 pr-8 text-sm font-semibold ${STATUS[t.status].className}`}
                    >
                      {(Object.keys(STATUS) as Status[]).map((s) => (
                        <option key={s} value={s}>
                          {STATUS[s].label}
                        </option>
                      ))}
                    </select>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        {!visible.length && <p className="text-ink-soft">Brak zadań dla wybranych filtrów.</p>}
      </div>
    </Panel>
  );
}
