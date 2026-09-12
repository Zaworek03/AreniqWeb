"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { trackEvent } from "@/lib/analytics";
import { WAITLIST_STABLE_EVENT } from "@/lib/waitlist-events";

type Errors = { email?: string; consent?: string };
type Status = "idle" | "sending" | "sent" | "error";

// Formspree form ID (e.g. "xyzabcde"), injected at build time. Empty = form not connected yet.
const FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? "";

const field =
  "mt-2 block h-12 w-full rounded-xl bg-straw px-4 text-ink placeholder:text-ink-soft/70 " +
  "aria-[invalid=true]:shadow-[inset_0_0_0_2px_var(--color-hay)]";

export function Waitlist() {
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
    if (!email) next.email = "Wpisz adres e-mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Sprawdź adres e-mail, brakuje w nim części.";
    if (!data.get("consent")) next.consent = "Zaznacz zgodę, żebyśmy mogli napisać o premierze.";
    setErrors(next);

    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(next.email ? "#email" : "#consent")?.focus();
      return;
    }

    if (!FORMSPREE_FORM_ID) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Formspree ${res.status}`);
      form.reset();
      setHorses("");
      setStatus("sent");
      trackEvent("zapis-na-liste", { konie: String(data.get("horses") || "brak"), stajnia: showStableName ? "tak" : "nie" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="zapisy" tone="bottle" labelledBy="waitlist-title" containerClassName="grid gap-12 md:grid-cols-2 md:gap-16">
      <div>
        <h2 id="waitlist-title" className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          Zapisz się na listę oczekujących
        </h2>
        <p className="mt-6 max-w-md text-lg text-straw/80">
          Kończymy prace nad workiem Areniq. Zostaw adres e-mail, a powiadomimy Cię o premierze i cenie.
        </p>
      </div>

      {status === "sent" ? (
        <div role="status" className="self-start rounded-2xl bg-straw/10 p-8">
          <h3 className="font-display text-2xl font-semibold">Zapisano Cię na listę</h3>
          <p className="mt-3 text-straw/80">
            Napiszemy na podany adres, gdy ogłosimy premierę i cenę worka Areniq.
          </p>
        </div>
      ) : (
        <form noValidate onSubmit={onSubmit} className="space-y-6" aria-busy={status === "sending"}>
          <div>
            <label htmlFor="name" className="font-medium">
              Imię <span className="font-normal text-straw/70">(opcjonalnie)</span>
            </label>
            <input id="name" name="name" type="text" autoComplete="given-name" className={field} />
          </div>

          <div>
            <label htmlFor="email" className="font-medium">
              E-mail
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
              <p id="email-error" className="mt-2 text-hay">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="horses" className="font-medium">
              Ile masz koni? <span className="font-normal text-straw/70">(opcjonalnie)</span>
            </label>
            <select
              ref={horsesRef}
              id="horses"
              name="horses"
              value={horses}
              onChange={(e) => setHorses(e.target.value)}
              className={field}
            >
              <option value="">Wybierz</option>
              <option value="1">1</option>
              <option value="2-3">2–3</option>
              <option value="4-10">4–10</option>
              <option value="10+">Więcej niż 10</option>
            </select>
          </div>

          {showStableName && (
            <div>
              <label htmlFor="stable" className="font-medium">
                Nazwa stajni lub ośrodka <span className="font-normal text-straw/70">(opcjonalnie)</span>
              </label>
              <input id="stable" name="stable" type="text" autoComplete="organization" className={field} />
            </div>
          )}

          {/* Honeypot for bots; Formspree drops submissions that fill it. */}
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
                className="mt-1 size-5 shrink-0 accent-hay"
              />
              <label htmlFor="consent" className="text-straw/90">
                Zgadzam się, żeby Areniq napisało do mnie w sprawie premiery worka.
              </label>
            </div>
            {errors.consent && (
              <p id="consent-error" className="mt-2 text-hay">
                {errors.consent}
              </p>
            )}
          </div>

          <div aria-live="polite">
            {status === "error" && (
              <p className="mb-4 rounded-xl bg-straw/10 p-4 text-straw">
                {FORMSPREE_FORM_ID
                  ? "Nie udało się zapisać. Sprawdź połączenie z internetem i spróbuj ponownie."
                  : "Zapisy ruszą w ciągu kilku dni. Spróbuj ponownie wkrótce."}
              </p>
            )}
          </div>

          <Button type="submit" variant="light" disabled={status === "sending"} className="w-full disabled:opacity-70 sm:w-auto">
            {status === "sending" ? "Zapisywanie…" : "Zapisz się na listę"}
          </Button>
        </form>
      )}
    </Section>
  );
}
