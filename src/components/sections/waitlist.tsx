"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type Errors = { email?: string; consent?: string };

const field =
  "mt-2 block h-12 w-full rounded-xl bg-straw px-4 text-ink placeholder:text-ink-soft/70 " +
  "focus-visible:outline-hay aria-[invalid=true]:shadow-[inset_0_0_0_2px_var(--color-hay)]";

export function Waitlist() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const next: Errors = {};
    if (!email) next.email = "Wpisz adres e-mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Sprawdź adres e-mail, brakuje w nim części.";
    if (!data.get("consent")) next.consent = "Zaznacz zgodę, żebyśmy mogli napisać o premierze.";
    setErrors(next);

    if (Object.keys(next).length) {
      e.currentTarget.querySelector<HTMLElement>(next.email ? "#email" : "#consent")?.focus();
      return;
    }
    // TODO (stage 4): send to Formspree / Web3Forms.
    setSent(true);
  }

  return (
    <section id="zapisy" aria-labelledby="waitlist-title" className="bg-bottle py-20 text-straw sm:py-28">
      <Container className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 id="waitlist-title" className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Zapisz się na listę oczekujących
          </h2>
          <p className="mt-6 max-w-md text-lg text-straw/80">
            Kończymy prace nad workiem Areniq. Zostaw adres e-mail, a powiadomimy Cię o premierze i cenie.
          </p>
        </div>

        {sent ? (
          <div role="status" className="self-start rounded-2xl bg-straw/10 p-8">
            <h3 className="font-display text-2xl font-semibold">Formularz jest jeszcze w budowie</h3>
            <p className="mt-3 text-straw/80">
              Dane są poprawne, ale na razie nigdzie ich nie wysyłamy. Zapisy ruszą przed publikacją strony.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-6 font-semibold text-hay underline underline-offset-4"
            >
              Wróć do formularza
            </button>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} className="space-y-6">
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
              <select id="horses" name="horses" defaultValue="" className={field}>
                <option value="">Wybierz</option>
                <option value="1">1</option>
                <option value="2-3">2–3</option>
                <option value="4-10">4–10</option>
                <option value="10+">Więcej niż 10</option>
              </select>
            </div>

            <div>
              <div className="flex gap-3">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
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

            <Button type="submit" variant="light" className="w-full sm:w-auto">
              Zapisz się na listę
            </Button>
          </form>
        )}
      </Container>
    </section>
  );
}
