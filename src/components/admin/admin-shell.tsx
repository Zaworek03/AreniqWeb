"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "@/components/logo";
import { getSupabase } from "@/lib/supabase";
import { CampaignCalendar } from "./campaign-calendar";
import { CampaignResults } from "./campaign-results";
import { ContentEditor } from "./content-editor";
import { WaitlistTable } from "./waitlist-table";

const TABS = [
  { id: "lista", label: "Lista oczekujących" },
  { id: "wyniki", label: "Wyniki kampanii" },
  { id: "kalendarz", label: "Kalendarz kampanii" },
  { id: "tresci", label: "Treści strony" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const isTab = (value: string): value is TabId => TABS.some((t) => t.id === value);

export function AdminShell({ email }: { email: string }) {
  // The active tab lives in the URL hash so a refresh or shared link opens the same view.
  const [tab, setTab] = useState<TabId>("lista");

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.slice(1);
      if (isTab(hash)) setTab(hash);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <div className="min-h-dvh">
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <Wordmark className="h-8 w-auto text-charcoal" />
            <span className="rounded-full bg-cloud px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase">Panel</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-ink-soft">{email}</span>
            <button
              type="button"
              onClick={() => getSupabase()?.auth.signOut()}
              className="font-semibold underline decoration-gold underline-offset-4 hover:text-charcoal-deep"
            >
              Wyloguj się
            </button>
          </div>
        </div>
        <nav aria-label="Sekcje panelu" className="mx-auto max-w-6xl overflow-x-auto px-5">
          <ul className="flex gap-1">
            {TABS.map((t) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  aria-current={tab === t.id ? "page" : undefined}
                  className="block border-b-2 border-transparent px-3 py-3 text-sm font-semibold whitespace-nowrap text-ink-soft hover:text-ink aria-[current=page]:border-gold aria-[current=page]:text-ink"
                >
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        {tab === "lista" && <WaitlistTable />}
        {tab === "wyniki" && <CampaignResults />}
        {tab === "kalendarz" && <CampaignCalendar />}
        {tab === "tresci" && <ContentEditor />}
      </div>
    </div>
  );
}
