"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getSupabase } from "@/lib/supabase";
import { adminField } from "./ui";

export function LoginForm() {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    if (!email || !password) {
      setError("Wpisz e-mail i hasło.");
      return;
    }
    setSending(true);
    setError("");
    const { error: authError } = await getSupabase()!.auth.signInWithPassword({ email, password });
    setSending(false);
    if (authError) {
      setError(
        authError.status === 400
          ? "Nieprawidłowy e-mail lub hasło."
          : "Nie udało się zalogować. Sprawdź połączenie z internetem i spróbuj ponownie.",
      );
    }
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5" aria-busy={sending}>
      <div>
        <label htmlFor="admin-email" className="font-medium">
          E-mail
        </label>
        <input id="admin-email" name="email" type="email" autoComplete="username" className={adminField} />
      </div>
      <div>
        <label htmlFor="admin-password" className="font-medium">
          Hasło
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          className={adminField}
        />
      </div>
      <div aria-live="polite">{error && <p className="rounded-xl bg-cloud p-3 text-ink">{error}</p>}</div>
      <Button type="submit" disabled={sending} className="w-full disabled:opacity-70">
        {sending ? "Logowanie…" : "Zaloguj się"}
      </Button>
    </form>
  );
}
