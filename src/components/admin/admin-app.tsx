"use client";

import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { AdminShell } from "./admin-shell";
import { LoginForm } from "./login-form";

type Access = "checking" | "admin" | "denied";

export function AdminApp() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  // Result of the admin check, remembered per user so a new session reads as "checking" again.
  const [checked, setChecked] = useState<{ userId: string; access: Exclude<Access, "checking"> } | null>(null);
  const access: Access = session && checked?.userId === session.user.id ? checked.access : "checking";

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => data.subscription.unsubscribe();
  }, []);

  // Being signed in is not enough: the account must also be listed in public.admins.
  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase || !session) return;
    let cancelled = false;
    const userId = session.user.id;
    supabase.rpc("is_admin").then(({ data, error }) => {
      if (!cancelled) setChecked({ userId, access: !error && data === true ? "admin" : "denied" });
    });
    return () => {
      cancelled = true;
    };
  }, [session]);

  if (!isSupabaseConfigured) {
    return (
      <Card title="Panel administratora">
        <p className="text-ink-soft">
          Panel nie jest jeszcze połączony z Supabase. Dodaj zmienne <code>NEXT_PUBLIC_SUPABASE_URL</code> i{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> (instrukcja w README).
        </p>
      </Card>
    );
  }

  if (session === undefined || (session && access === "checking")) {
    return (
      <Card title="Panel administratora">
        <p role="status" className="text-ink-soft">
          Sprawdzanie sesji…
        </p>
      </Card>
    );
  }

  if (!session) {
    return (
      <Card title="Zaloguj się">
        <LoginForm />
      </Card>
    );
  }

  if (access === "denied") {
    return (
      <Card title="Brak dostępu">
        <p className="text-ink-soft">
          Konto {session.user.email} nie ma uprawnień administratora. Poproś współzałożyciela o dodanie go do listy
          administratorów.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => getSupabase()?.auth.signOut()}>
          Wyloguj się
        </Button>
      </Card>
    );
  }

  return <AdminShell email={session.user.email ?? ""} />;
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-6 py-16">
      <Wordmark className="h-10 w-auto self-start text-charcoal" />
      <h1 className="mt-10 font-display text-3xl font-extrabold tracking-tight">{title}</h1>
      <div className="mt-6">{children}</div>
    </div>
  );
}
