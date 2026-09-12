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

## Statystyki odwiedzin (Umami, bez ciasteczek)

1. Załóż konto na [cloud.umami.is](https://cloud.umami.is), dodaj stronę i skopiuj **Website ID**.
2. Dodaj zmienną repo `UMAMI_WEBSITE_ID` (tak jak `FORMSPREE_FORM_ID`) i uruchom workflow.

Bez zmiennej skrypt się nie ładuje. Zliczane zdarzenia: `cta-hero`, `cta-dla-stajni` (kliknięcia)
i `zapis-na-liste` (udany zapis, z liczbą koni).

## Treści

- Strona główna: `src/content/product.ts` (parametry są orientacyjne).
- O nas: `src/content/about.ts` (opisy i zdjęcia założycieli).
- Obrazek do udostępniania (OpenGraph): `src/app/og.png/route.tsx`, generowany przy buildzie.

## Własna domena (później)

1. `public/CNAME` z domeną.
2. W workflow: `NEXT_PUBLIC_BASE_PATH: ""`, `NEXT_PUBLIC_SITE_URL: https://domena`.
3. DNS u rejestratora + domena w Settings → Pages.

## Kolory i fonty

Wszystkie tokeny są w `src/app/globals.css` (`@theme`).
