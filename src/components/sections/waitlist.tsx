"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/content";
import { trackEvent } from "@/lib/analytics";
import { countryOptions } from "@/lib/countries";
import type { Locale } from "@/lib/i18n";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { WAITLIST_STABLE_EVENT } from "@/lib/waitlist-events";

type Errors = { email?: string; consent?: string };
type Status = "idle" | "sending" | "sent" | "error";

// Formspree form ID (e.g. "xyzabcde"), injected at build time. Used only until Supabase is configured.
const FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? "";

/** UTM source/campaign of the current visit, so the admin panel can tell which channel brought the sign-up. */
function visitSource() {
  const params = new URLSearchParams(window.location.search);
  return [params.get("utm_source"), params.get("utm_medium"), params.get("utm_campaign")].filter(Boolean).join(" / ") || null;
}

async function submitSignup(data: FormData, stable: boolean, locale: Locale) {
  const supabase = getSupabase();
  if (!supabase) {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`Formspree ${res.status}`);
    return;
  }
  const text = (key: string) => String(data.get(key) ?? "").trim() || null;
  const { error } = await supabase.from("waitlist").insert({
    name: text("name"),
    email: String(data.get("email")).trim(),
    horses: text("horses"),
    stable: stable ? text("stable") : null,
    country: text("country"),
    lang: locale,
    source: visitSource(),
    consent: true,
  });
  // 23505 = this e-mail is already on the list: for the visitor that is still a success.
  if (error && error.code !== "23505") throw error;
}

const field =
  "mt-2 block h-12 w-full rounded-xl bg-mist px-4 text-ink placeholder:text-ink-soft/70 " +
  "aria-[invalid=true]:shadow-[inset_0_0_0_2px_var(--color-gold-light)]";

export function Waitlist({ t, locale }: { t: Dictionary["waitlist"]; locale: Locale }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [horses, setHorses] = useState("");
  const [stableIntent, setStableIntent] = useState(false);
  const horsesRef = useRef<HTMLSelectElement>(null);
  const showStableName = stableIntent || horses === "4-10" || horses === "10+";

  // "Zapisz stajnię na listę" elsewhere on the page: reveal the stable field and move focus
  // to the horses question once the anchor scroll has settled.
  useEffect(() => {
    const onStable = () => {
      setStableIntent(true);
      setStatus((current) => (current === "sent" ? "idle" : current));
      window.setTimeout(() => horsesRef.current?.focus({ preventScroll: true }), 700);
    };
    window.addEventListener(WAITLIST_STABLE_EVENT, onStable);
    return () => window.removeEventListener(WAITLIST_STABLE_EVENT, onStable);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const next: Errors = {};
    if (!email) next.email = t.errors.emailMissing;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t.errors.emailInvalid;
    if (!data.get("consent")) next.consent = t.errors.consent;
    setErrors(next);

    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(next.email ? "#email" : "#consent")?.focus();
      return;
    }

    if (!isSupabaseConfigured && !FORMSPREE_FORM_ID) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      // Bots fill the hidden field; show them success without storing anything.
      if (!data.get("_gotcha")) await submitSignup(data, showStableName, locale);
      form.reset();
      setHorses("");
      setStatus("sent");
      trackEvent("zapis-na-liste", {
        konie: String(data.get("horses") || "brak"),
        stajnia: showStableName ? "tak" : "nie",
        jezyk: locale,
        kraj: String(data.get("country") || "brak"),
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="zapisy" tone="charcoal" labelledBy="waitlist-title" containerClassName="grid gap-12 md:grid-cols-2 md:gap-16">
      <div>
        <h2 id="waitlist-title" className="font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
          {t.title}
        </h2>
        <p className="mt-6 max-w-md text-lg text-mist/80">
          {t.lead}
        </p>
      </div>

      {status === "sent" ? (
        <div role="status" className="self-start rounded-2xl bg-mist/10 p-8">
          <h3 className="font-display text-2xl font-semibold">{t.sentTitle}</h3>
          <p className="mt-3 text-mist/80">
            {t.sentText}
          </p>
        </div>
      ) : (
        <form noValidate onSubmit={onSubmit} className="space-y-6" aria-busy={status === "sending"}>
          <div>
            <label htmlFor="name" className="font-medium">
              {t.name} <span className="font-normal text-mist/70">{t.optional}</span>
            </label>
            <input id="name" name="name" type="text" autoComplete="given-name" className={field} />
          </div>

          <div>
            <label htmlFor="email" className="font-medium">
              {t.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={field}
            />
            {errors.email && (
              <p id="email-error" className="mt-2 text-gold-light">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="horses" className="font-medium">
              {t.horses} <span className="font-normal text-mist/70">{t.optional}</span>
            </label>
            <select
              ref={horsesRef}
              id="horses"
              name="horses"
              value={horses}
              onChange={(e) => setHorses(e.target.value)}
              className={field}
            >
              <option value="">{t.choose}</option>
              <option value="1">1</option>
              <option value="2-3">2–3</option>
              <option value="4-10">4–10</option>
              <option value="10+">{t.horsesMore}</option>
            </select>
          </div>

          {showStableName && (
            <div>
              <label htmlFor="stable" className="font-medium">
                {t.stable} <span className="font-normal text-mist/70">{t.optional}</span>
              </label>
              <input id="stable" name="stable" type="text" autoComplete="organization" className={field} />
            </div>
          )}

          <div>
            <label htmlFor="country" className="font-medium">
              {t.country} <span className="font-normal text-mist/70">{t.optional}</span>
            </label>
            <select id="country" name="country" defaultValue="" autoComplete="country" className={field}>
              <option value="">{t.choose}</option>
              {countryOptions(locale, t.otherCountry).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Honeypot for bots: submissions that fill it are never stored. */}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

          <div>
            <div className="flex gap-3">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                value="tak"
                required
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? "consent-error" : undefined}
                className="mt-1 size-5 shrink-0 accent-gold-light"
              />
              <label htmlFor="consent" className="text-mist/90">
                {t.consent}
              </label>
            </div>
            {errors.consent && (
              <p id="consent-error" className="mt-2 text-gold-light">
                {errors.consent}
              </p>
            )}
          </div>

          <div aria-live="polite">
            {status === "error" && (
              <p className="mb-4 rounded-xl bg-mist/10 p-4 text-mist">
                {isSupabaseConfigured || FORMSPREE_FORM_ID
                  ? t.errors.network
                  : t.errors.notConnected}
              </p>
            )}
          </div>

          <Button type="submit" variant="light" disabled={status === "sending"} className="w-full disabled:opacity-70 sm:w-auto">
            {status === "sending" ? t.sending : t.submit}
          </Button>
        </form>
      )}
    </Section>
  );
}
