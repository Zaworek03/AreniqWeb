# Areniq – strona www

Next.js 16 (static export) + TypeScript + Tailwind CSS 4 + Motion. Hostowane na GitHub Pages.

## Lokalnie

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # statyczna strona w out/
```

Podgląd zbudowanej strony pod `/AreniqWeb/`, tak jak na GitHub Pages:

```bash
NEXT_PUBLIC_BASE_PATH=/AreniqWeb npm run build
mkdir -p .preview && ln -sfn ../out .preview/AreniqWeb        # jednorazowo, katalog jest w .gitignore
python3 -m http.server 4173 --directory .preview             # http://localhost:4173/AreniqWeb/
```

## Wdrożenie

Push na `main` uruchamia `.github/workflows/deploy.yml`.
Jednorazowo: **Settings → Pages → Source: GitHub Actions**.

## Formularz listy oczekujących (Formspree)

1. Załóż formularz na [formspree.io](https://formspree.io) i skopiuj jego ID (część adresu po `/f/`).
2. W repo: **Settings → Secrets and variables → Actions → Variables → New repository variable**,
   nazwa `FORMSPREE_FORM_ID`, wartość to ID.
3. Uruchom ponownie workflow (albo zrób push).

Bez tej zmiennej formularz sprawdza pola, ale pokazuje komunikat, że zapisy jeszcze nie działają.
Lokalnie: `NEXT_PUBLIC_FORMSPREE_FORM_ID=twoje_id npm run dev`.

Po podłączeniu Supabase (niżej) formularz zapisuje do bazy, a Formspree przestaje być używany.

## Panel administratora (Supabase)

Adres: `/admin/` (na GitHub Pages `…/AreniqWeb/admin/`). Nie ma do niego linków i jest wyłączony
z wyszukiwarek, ale **to nie jest zabezpieczenie**: dostęp chronią logowanie i reguły RLS w Supabase.
Zakładki: lista oczekujących (filtry, eksport CSV), wyniki kampanii, kalendarz kampanii, FAQ z publikacją.

### 1. Projekt i baza

1. Załóż projekt na [supabase.com](https://supabase.com), region **Frankfurt (eu-central-1)** (dane osobowe, RODO).
2. **SQL Editor** → wklej całość `supabase/migrations/001_admin.sql` → **Run**.
3. **Authentication → Sign In / Providers → Email**: wyłącz **Allow new users to sign up**.
4. **Authentication → Users → Add user → Create new user**: trzy konta (e-mail + hasło, zaznacz *Auto Confirm User*).
5. W SQL Editor dopisz konta do administratorów (odkomentuj i uzupełnij ostatni blok migracji):
   ```sql
   insert into public.admins (user_id, email)
   select id, email from auth.users where email in ('a@…', 'b@…', 'c@…')
   on conflict do nothing;
   ```

### 2. Zmienne dla strony

**Project Settings → API**: skopiuj *Project URL* i klucz *anon public*. W repo GitHub dodaj zmienne
(Variables, jak `FORMSPREE_FORM_ID`): `SUPABASE_URL` i `SUPABASE_ANON_KEY`. Oba są publiczne z założenia.
**Nigdy** nie wklejaj nigdzie klucza `service_role`.

Lokalnie: plik `.env.local` z `NEXT_PUBLIC_SUPABASE_URL=…` i `NEXT_PUBLIC_SUPABASE_ANON_KEY=…` (jest w `.gitignore`).

### 3. Przycisk „Publikuj na stronie”

Uruchamia workflow wdrożenia, który pobiera FAQ z bazy przy buildzie (gdy baza nie odpowiada, używa `src/content/pl.ts` i `en.ts`).

1. GitHub → **Settings → Developer settings → Fine-grained tokens**: token tylko do repo `AreniqWeb`,
   uprawnienie **Contents: Read and write**.
2. Z [Supabase CLI](https://supabase.com/docs/guides/cli):
   ```bash
   supabase login
   supabase link --project-ref <ref projektu>
   supabase secrets set GITHUB_TOKEN=<token> GITHUB_REPO=Zaworek03/AreniqWeb
   supabase functions deploy publish-site
   ```

### Import dotychczasowych zapisów z Formspree

Eksport CSV z Formspree → Supabase **Table Editor → waitlist → Insert → Import data from CSV**.
Kolumny: `email`, `name`, `horses`, `stable`, `created_at`, `consent` (= `true`), `lang` (= `pl`).

## Statystyki odwiedzin (Umami, bez ciasteczek)

1. Załóż konto na [cloud.umami.is](https://cloud.umami.is), dodaj stronę i skopiuj **Website ID**.
2. Dodaj zmienną repo `UMAMI_WEBSITE_ID` (tak jak `FORMSPREE_FORM_ID`) i uruchom workflow.

Bez zmiennej skrypt się nie ładuje. Zliczane zdarzenia: `cta-hero`, `cta-dla-stajni` (kliknięcia)
i `zapis-na-liste` (udany zapis: liczba koni, stajnia, język, kraj).

## Treści i wersje językowe

- Polska wersja: `/`, `/o-nas/`. Angielska: `/en/`, `/en/about/` (przełącznik PL/EN w nagłówku).
- Wszystkie teksty: `src/content/pl.ts` (źródło) i `src/content/en.ts` (ten sam kształt, sprawdza TypeScript).
- FAQ można też zmieniać w panelu (`/admin/#tresci`, osobno PL i EN); build bierze wersję z bazy, a gdy jej nie ma, z tych plików.
- Obrazki do udostępniania: `/og.png` i `/en/og.png`, generowane przy buildzie (`src/lib/og-image.tsx`).
- Kraj w formularzu zapisu jest zapisywany jako kod ISO (`PL`, `DE`, …, `OTHER`), nazwy w `src/lib/countries.ts`.
- Trzy główne layouty (`(site)` pl, `(en)` en, `(admin)`) wymagają wspólnej strony 404: `src/app/global-not-found.tsx`
  (flaga `experimental.globalNotFound` w `next.config.ts`).

## Własna domena (później)

1. `public/CNAME` z domeną.
2. W workflow: `NEXT_PUBLIC_BASE_PATH: ""`, `NEXT_PUBLIC_SITE_URL: https://domena`.
3. DNS u rejestratora + domena w Settings → Pages.

## Kolory i fonty

Wszystkie tokeny są w `src/app/globals.css` (`@theme`).
