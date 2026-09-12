import type { StaticImageData } from "next/image";

// TODO: story, bios and photos from the founders. Until then the copy stays general.

export const STORY = [
  "Konie najlepiej czują się przy stałym rytmie dnia. Ludzie, którzy się nimi opiekują, mają pracę, rodziny i grafiki, które nie zawsze się z tym rytmem zgadzają.",
  "Areniq powstało, żeby ten rozdźwięk zmniejszyć. Zaczęliśmy od pory, która sprawia najwięcej kłopotu: porannego karmienia. Tak powstał worek na siano, który otwiera się sam o ustawionej godzinie.",
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
    bio: "Miejsce na krótki opis: zakres pracy w Areniq i związek ze światem koni.",
  },
  {
    name: "Bartosz Zawłocki",
    initials: "BZ",
    bio: "Miejsce na krótki opis: zakres pracy w Areniq i związek ze światem koni.",
  },
  {
    name: "Magda Augustyniak",
    initials: "MA",
    bio: "Miejsce na krótki opis: zakres pracy w Areniq i związek ze światem koni.",
  },
];

export const VALUES = [
  {
    title: "Najpierw koń",
    text: "Każdą decyzję sprawdzamy pytaniem, czy służy zdrowiu i spokojowi zwierzęcia.",
  },
  {
    title: "Prosto w obsłudze",
    text: "Urządzenie ma działać bez instrukcji na dziesięć stron. Napełniasz, ustawiasz, gotowe.",
  },
  {
    title: "Odporne na stajnię",
    text: "Kurz, wilgoć, mróz i ciekawski koń to warunki, dla których projektujemy od pierwszego szkicu.",
  },
  {
    title: "Blisko ludzi z branży",
    text: "Rozmawiamy z właścicielami koni i stajniami, zanim cokolwiek trafi do produkcji.",
  },
] as const;
