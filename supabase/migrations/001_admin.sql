-- Areniq admin panel: admins, waitlist, campaign tasks and metrics, editable site content.
-- Run once in Supabase: SQL Editor → paste → Run. Safe to re-run (idempotent where possible).
-- Access rules live here (RLS), not in the static site: the browser only ever holds the public anon key.

-- ─── Admins ──────────────────────────────────────────────────────────────────
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "admins read admins" on public.admins;
create policy "admins read admins" on public.admins for select to authenticated using (public.is_admin());

-- ─── Waitlist ────────────────────────────────────────────────────────────────
create table if not exists public.waitlist (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text check (char_length(name) <= 100),
  email text not null check (char_length(email) <= 254 and email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  horses text check (horses in ('1', '2-3', '4-10', '10+')),
  stable text check (char_length(stable) <= 150),
  country text check (char_length(country) <= 60),
  lang text not null default 'pl' check (lang in ('pl', 'en')),
  source text check (char_length(source) <= 200),
  consent boolean not null check (consent)
);
create unique index if not exists waitlist_email_unique on public.waitlist (lower(email));
alter table public.waitlist enable row level security;

-- Anyone may add themselves; nobody but admins may read, change or delete.
drop policy if exists "public insert waitlist" on public.waitlist;
create policy "public insert waitlist" on public.waitlist for insert to anon, authenticated with check (true);
drop policy if exists "admins read waitlist" on public.waitlist;
create policy "admins read waitlist" on public.waitlist for select to authenticated using (public.is_admin());
drop policy if exists "admins delete waitlist" on public.waitlist;
create policy "admins delete waitlist" on public.waitlist for delete to authenticated using (public.is_admin());

-- ─── Campaign tasks (plan "Siano o czasie", T40–T52) ─────────────────────────
create table if not exists public.campaign_tasks (
  id bigint generated always as identity primary key,
  week text not null,
  phase text not null,
  title text not null,
  channel text not null default '',
  owner text not null default '',
  kind text not null default 'task' check (kind in ('task', 'checkpoint')),
  status text not null default 'todo' check (status in ('todo', 'doing', 'done', 'skipped')),
  sort int not null default 0,
  updated_at timestamptz not null default now()
);
alter table public.campaign_tasks enable row level security;
drop policy if exists "admins all campaign_tasks" on public.campaign_tasks;
create policy "admins all campaign_tasks" on public.campaign_tasks for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ─── Weekly metrics entered by hand (Instagram, stables, media) ──────────────
create table if not exists public.campaign_metrics (
  week text primary key,
  ig_followers int check (ig_followers >= 0),
  ig_non_pl_pct numeric(5, 2) check (ig_non_pl_pct between 0 and 100),
  stable_talks int check (stable_talks >= 0),
  stable_tests int check (stable_tests >= 0),
  media_mentions int check (media_mentions >= 0),
  notes text check (char_length(notes) <= 2000),
  updated_at timestamptz not null default now()
);
alter table public.campaign_metrics enable row level security;
drop policy if exists "admins all campaign_metrics" on public.campaign_metrics;
create policy "admins all campaign_metrics" on public.campaign_metrics for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ─── Editable site content (read at build time) ──────────────────────────────
create table if not exists public.site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);
alter table public.site_content enable row level security;
drop policy if exists "public read site_content" on public.site_content;
create policy "public read site_content" on public.site_content for select to anon, authenticated using (true);
drop policy if exists "admins write site_content" on public.site_content;
create policy "admins write site_content" on public.site_content for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ─── Seed: campaign calendar (only when empty) ───────────────────────────────
insert into public.campaign_tasks (week, phase, title, channel, owner, kind, sort)
select * from (values
  ('T40', 'Start', 'Wersja EN strony z formularzem zapisu (pole „kraj”, zgoda GDPR)', 'Strona', 'B', 'task', 1),
  ('T40', 'Start', 'Linki UTM dla każdego kanału, pomiar bazowy (obserwujący, zapisy, ruch w Umami)', 'Strona', 'B, M', 'task', 2),
  ('T40', 'Start', 'Bio i wyróżnione relacje na IG, szablony grafik, 6 postów na zapas', 'Instagram', 'M', 'task', 3),
  ('T40', 'Start', 'Lista 30 stajni i 15 grup na FB z regulaminami; oznakowanie FEPW w umowie', 'Relacje', 'O', 'task', 4),
  ('T41', 'Faza 1 · Problem', 'Karuzela „Kim jesteśmy”: trzy osoby i jeden problem', 'Instagram', 'O, M', 'task', 1),
  ('T41', 'Faza 1 · Problem', 'Reel „Siano o 22:00, a śniadanie o 7:00”', 'IG, TikTok', 'B', 'task', 2),
  ('T41', 'Faza 1 · Problem', 'Ankieta w relacjach: „Ile razy dziennie Twój koń dostaje siano?”', 'IG Stories', 'M', 'task', 3),
  ('T42', 'Faza 1 · Problem', 'Karuzela „2–3 porcje dziennie. A co w nocy?”', 'Instagram', 'M', 'task', 1),
  ('T42', 'Faza 1 · Problem', 'Pytanie po angielsku: „How long does your horse wait for hay overnight?”', 'r/Equestrian, grupy EN', 'M', 'task', 2),
  ('T42', 'Faza 1 · Problem', 'Pytania do dyskusji w 5 grupach FB', 'Grupy FB', 'O', 'task', 3),
  ('T42', 'Faza 1 · Problem', 'Pierwsze 10 wiadomości do pensjonatów', 'Relacje', 'O', 'task', 4),
  ('T43', 'Faza 1 · Problem', 'Karuzela o układzie pokarmowym konia (Merck Veterinary Manual, bez obietnic)', 'Instagram', 'M, O', 'task', 1),
  ('T43', 'Faza 1 · Problem', 'Reel z warsztatu: jak powstaje prototyp (po decyzji o patencie)', 'IG, TikTok', 'B', 'task', 2),
  ('T44', 'Faza 1 · Problem', 'Karuzela z wynikami ankiety z T41', 'Instagram', 'M', 'task', 1),
  ('T44', 'Faza 1 · Problem', 'Informacja do biura prasowego uczelni', 'Uczelnia', 'B', 'task', 2),
  ('T44', 'Faza 1 · Problem', 'Przegląd KPI #1', 'Zespół', 'M', 'checkpoint', 3),
  ('T45', 'Faza 2 · Rozwiązanie', 'Reel „Jak to działa” w 4 krokach, napisy PL i EN', 'IG, TikTok, FB', 'B', 'task', 1),
  ('T45', 'Faza 2 · Rozwiązanie', 'Ten sam film w 5 grupach FB z pytaniem „co byście zmienili?”', 'Grupy FB', 'O', 'task', 2),
  ('T46', 'Faza 2 · Rozwiązanie', 'Post na długi weekend: „Wyjeżdżasz 11 listopada? Kto nakarmi konia?”', 'Instagram', 'O', 'task', 1),
  ('T46', 'Faza 2 · Rozwiązanie', 'Karuzela o harmonogramie tygodniowym', 'Instagram', 'M, B', 'task', 2),
  ('T46', 'Faza 2 · Rozwiązanie', 'Test w stajni #1: nagranie w realnych warunkach', 'Relacje', 'O, B', 'task', 3),
  ('T47', 'Faza 2 · Rozwiązanie', 'Reel z testu w stajni', 'IG, TikTok', 'B', 'task', 1),
  ('T47', 'Faza 2 · Rozwiązanie', 'Karuzela „Dla pensjonatów”', 'IG, wiadomości do stajni', 'O', 'task', 2),
  ('T47', 'Faza 2 · Rozwiązanie', 'Informacja prasowa PL + EN', 'PR', 'M', 'task', 3),
  ('T48', 'Faza 2 · Rozwiązanie', 'Rozmowa z właścicielem stajni testowej: cytat i zdjęcia', 'IG, strona', 'O', 'task', 1),
  ('T48', 'Faza 2 · Rozwiązanie', 'Pytania i odpowiedzi w relacjach', 'IG Stories', 'cały zespół', 'task', 2),
  ('T48', 'Faza 2 · Rozwiązanie', 'Przegląd KPI #2', 'Zespół', 'M', 'checkpoint', 3),
  ('T49', 'Faza 3 · Lista', 'Start akcji „Dołącz do listy”', 'Instagram', 'M', 'task', 1),
  ('T49', 'Faza 3 · Lista', 'E-mail #1 do zapisanych (PL lub EN)', 'E-mail', 'M', 'task', 2),
  ('T49', 'Faza 3 · Lista', 'Relacja z wydarzenia jeździeckiego (np. Cavaliada Poznań, potwierdzić termin)', 'IG Stories', 'O', 'task', 3),
  ('T50', 'Faza 3 · Lista', 'Reel „Zawody wielodniowe”, napisy EN', 'IG, TikTok', 'B, O', 'task', 1),
  ('T50', 'Faza 3 · Lista', 'Akcja „Oznacz swoją stajnię”', 'IG, grupy FB', 'O', 'task', 2),
  ('T51', 'Faza 3 · Lista', 'Post „Święta w stajni: kto karmi 24–26 grudnia?”', 'IG, grupy FB', 'O', 'task', 1),
  ('T51', 'Faza 3 · Lista', 'Karuzela z liczbą osób na liście (jeśli wynik dobrze wygląda)', 'Instagram', 'M', 'task', 2),
  ('T51', 'Faza 3 · Lista', 'E-mail #2: życzenia i zapowiedź 2027', 'E-mail', 'M', 'task', 3),
  ('T52', 'Faza 3 · Lista', 'Reel z podsumowaniem roku zespołu Areniq', 'IG, TikTok', 'cały zespół', 'task', 1),
  ('T52', 'Faza 3 · Lista', 'Raport końcowy', 'Zespół', 'M', 'checkpoint', 2)
) as seed (week, phase, title, channel, owner, kind, sort)
where not exists (select 1 from public.campaign_tasks);

-- ─── After creating the three accounts (Authentication → Users → Add user) ───
-- insert into public.admins (user_id, email)
-- select id, email from auth.users where email in ('pierwszy@example.com', 'drugi@example.com', 'trzeci@example.com')
-- on conflict do nothing;
