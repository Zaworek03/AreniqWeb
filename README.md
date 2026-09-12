# Areniq – strona www

Next.js 16 (static export) + TypeScript + Tailwind CSS 4 + Motion. Hostowane na GitHub Pages.

## Lokalnie

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # statyczna strona w out/
```

Podgląd z basePath jak na GitHub Pages:

```bash
NEXT_PUBLIC_BASE_PATH=/AreniqWeb npm run build && npx serve out
```

## Wdrożenie

Push na `main` uruchamia `.github/workflows/deploy.yml`.
Jednorazowo: **Settings → Pages → Source: GitHub Actions**.

## Własna domena (później)

1. `public/CNAME` z domeną.
2. W workflow: `NEXT_PUBLIC_BASE_PATH: ""`, `NEXT_PUBLIC_SITE_URL: https://domena`.
3. DNS u rejestratora + domena w Settings → Pages.

## Kolory i fonty

Wszystkie tokeny są w `src/app/globals.css` (`@theme`).
