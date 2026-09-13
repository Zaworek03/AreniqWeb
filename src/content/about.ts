import type { StaticImageData } from "next/image";

// Story and bios based on the Areniq Feed pitch deck. Photos: add `photo` per founder.

export const STORY = [
  "Konie najlepiej czują się przy stałym rytmie dnia, a wrzody żołądka dotyczą 40–60% koni sportowych. Tymczasem pensjonaty podają siano zwykle 2–3 razy dziennie, a na zawodach i w przydomowej stajni wszystko zależy od grafiku opiekuna.",
  "Areniq powstało, żeby ten rozdźwięk zmniejszyć. Łączymy mechatronikę, programowanie i doświadczenie ze sportu jeździeckiego. Tak powstał Areniq Feed: mobilny worek na siano, który otwiera się sam według ustawionego harmonogramu.",
] as const;

export type Founder = {
  name: string;
  initials: string;
  bio: string;
  photo?: StaticImageData;
};

export const FOUNDERS: Founder[] = [
  {
    name: "Oliwia Michalak",
    initials: "OM",
    bio: "Studentka mechatroniki, od wielu lat zaangażowana w sport jeździecki. Łączy wiedzę techniczną z dogłębną znajomością potrzeb branży.",
  },
  {
    name: "Magdalena Augustyniak",
    initials: "MA",
    bio: "Studentka sztucznej inteligencji, łącząca kompetencje z zakresu programowania, elektroniki i analizy danych.",
  },
  {
    name: "Bartosz Zawłocki",
    initials: "BZ",
    bio: "Student mechatroniki rozwijający własne projekty techniczne i prototypy, z doświadczeniem w projektowaniu, modelowaniu 3D i programowaniu.",
  },
];

export const VALUES = [
  {
    title: "Najpierw koń",
    text: "Każdą decyzję sprawdzamy pytaniem, czy służy zdrowiu i spokojowi zwierzęcia.",
  },
  {
    title: "Prosto w obsłudze",
    text: "Napełniasz, ustawiasz harmonogram, zawieszasz. Resztę robi urządzenie.",
  },
  {
    title: "Tam, gdzie jest koń",
    text: "Projektujemy z myślą o boksie, padoku i wyjazdach na zawody, nie tylko o jednym miejscu.",
  },
  {
    title: "Blisko ludzi z branży",
    text: "Rozmawiamy z właścicielami koni i stajniami, zanim cokolwiek trafi do produkcji.",
  },
] as const;
