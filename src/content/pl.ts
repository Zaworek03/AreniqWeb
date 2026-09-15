// Polish copy: the source of truth. Product facts only from the Areniq Feed pitch deck;
// anything not decided yet (price, capacity, dimensions, launch date) stays off the page.
// en.ts must match this shape (type Dictionary).

import type { StaticImageData } from "next/image";
import type { IconName } from "@/components/icons";

export type Founder = { name: string; initials: string; bio: string; photo?: StaticImageData };
type Item = { title: string; text: string };
type Bag = { fill: number; armed: number; hung: number; open: number };
export type PluralForms = { one: string; few: string; many: string; other: string };

export const PRODUCT_NAME = "Areniq Feed";

export const pl = {
  meta: {
    title: "Areniq Feed – automatyczny, mobilny podajnik siana dla koni",
    description:
      "Areniq Feed to mobilny worek na siano z modułem elektronicznym i ryglem, który otwiera się sam według ustawionego harmonogramu tygodniowego.",
    ogAlt: "Areniq Feed: automatyczny, mobilny podajnik siana dla koni",
    ogHeadline: "Siano podane na czas. Nawet gdy Cię nie ma.",
    // Used if Archivo can't be fetched at build: the built-in font has no Polish glyphs.
    ogFallbackHeadline: "Siano podane na czas.",
  },

  chrome: {
    skipLink: "Przejdź do treści",
    nav: { how: "Jak to działa", schedule: "Harmonogram", specs: "Parametry", faq: "FAQ", about: "O nas" },
    navLabel: "Główna",
    navMobileLabel: "Główna (mobilna)",
    homeLabel: "Areniq, strona główna",
    openMenu: "Otwórz menu",
    closeMenu: "Zamknij menu",
    cta: "Zapisz się na listę",
    languageSwitch: { label: "English", short: "EN", hrefLang: "en" },
    footer: {
      tagline: "Areniq Feed: automatyczny, mobilny podajnik siana dla koni.",
      siteHeading: "Strona",
      contactHeading: "Kontakt",
      footerNavLabel: "Stopka",
      fundingAlt:
        "Fundusze Europejskie dla Polski Wschodniej, Rzeczpospolita Polska, Dofinansowane przez Unię Europejską",
      closing: "Zrobione z myślą o koniach i ich ludziach.",
    },
  },

  hero: {
    title: "Siano podane na czas. Nawet gdy Cię nie ma.",
    lead: "Automatyczny, mobilny podajnik siana dla koni. Ustawiasz harmonogram tygodniowy, a worek otwiera się sam o zaplanowanej porze: w boksie, na padoku i na zawodach.",
    ctaSecondary: "Zobacz, jak działa",
    note: "Zapis jest bezpłatny i do niczego nie zobowiązuje.",
    bagLabel:
      "Areniq Feed zawieszony na drążku. O zaplanowanej porze rygiel się zwalnia, dół worka otwiera się i siano spada na ziemię.",
    badgeLabel: "Harmonogram",
    badgeValue: "PN · 06:00",
  },

  problem: {
    title: "Koń potrzebuje regularności. Grafik stajni nie zawsze na to pozwala.",
    items: [
      {
        icon: "calendar",
        title: "Sztywny harmonogram stajni",
        text: "Pensjonaty zwykle zapewniają tylko 2–3 zaplanowane porcje siana dziennie.",
      },
      {
        icon: "pulse",
        title: "Zdrowie układu pokarmowego",
        text: "Wrzody żołądka dotyczą 40–60% koni sportowych (Merck Veterinary Manual). Regularność karmienia ma kluczowe znaczenie.",
      },
      {
        icon: "moon",
        title: "Zawody wielodniowe",
        text: "Zawodnik sam odpowiada za karmienie konia, co zabiera mu czas na odpoczynek.",
      },
      {
        icon: "home",
        title: "Stajnia przydomowa",
        text: "Natłok codziennych obowiązków utrudnia trzymanie się stałych, punktualnych pór karmienia.",
      },
    ] as { icon: IconName; title: string; text: string }[],
  },

  how: {
    title: "Jak to działa",
    lead: "Cztery kroki. Potem worek działa sam, według harmonogramu.",
    illustrationLabel:
      "Ilustracja czterech kroków: worek napełniony sianem, z ustawionym harmonogramem, zawieszony, a o zaplanowanej porze otwarty, z sianem na ziemi.",
    // `bag` is the illustration state for each step (0–1): fill, armed (schedule set), hung, open.
    steps: [
      {
        title: "Napełnij worek",
        text: "Umieść przygotowaną porcję siana i zabezpiecz worek ryglem.",
        bag: { fill: 1, armed: 0, hung: 0, open: 0 },
      },
      {
        title: "Ustaw harmonogram",
        text: "Wybierz dni tygodnia i godziny otwarcia bezpośrednio w ustawieniach.",
        bag: { fill: 1, armed: 1, hung: 0, open: 0 },
      },
      {
        title: "Zawieś w wybranym miejscu",
        text: "W boksie, na padoku albo podczas wyjazdu na zawody.",
        bag: { fill: 1, armed: 1, hung: 1, open: 0 },
      },
      {
        title: "Automatyczne podanie",
        text: "Rygiel zwalnia się o zaplanowanej porze, dół worka się otwiera i siano spada na ziemię. Bez udziału opiekuna.",
        bag: { fill: 1, armed: 1, hung: 1, open: 1 },
      },
    ] as (Item & { bag: Bag })[],
  },

  schedule: {
    title: "Harmonogram tygodniowy",
    lead: "To sedno Areniq Feed. Wybierasz dni tygodnia i dowolną liczbę godzin, a każdy termin włączasz i wyłączasz osobno, bez utraty ustawień.",
    useCasesTitle: "Sprawdza się",
    useCases: [
      { icon: "home", label: "W boksie" },
      { icon: "pin", label: "Na padoku" },
      { icon: "calendar", label: "Podczas zawodów" },
      { icon: "moon", label: "W nocy" },
      { icon: "toggle", label: "Na co dzień" },
    ] as { icon: IconName; label: string }[],
    cardTitle: "Harmonogram",
    activeCount: "Aktywne terminy:",
    cardNote: "Przykładowy widok ustawień. Kliknij, żeby włączyć lub wyłączyć termin.",
    /** Example schedule shown in the interactive card (from the deck). */
    sample: [
      { day: "PN", dayLabel: "Poniedziałek", time: "07:00", on: true },
      { day: "WT", dayLabel: "Wtorek", time: "08:30", on: false },
      { day: "ŚR", dayLabel: "Środa", time: "18:00", on: false },
      { day: "CZ", dayLabel: "Czwartek", time: "09:15", on: false },
      { day: "PT", dayLabel: "Piątek", time: "19:30", on: false },
      { day: "SO", dayLabel: "Sobota", time: "12:00", on: true },
      { day: "ND", dayLabel: "Niedziela", time: "17:45", on: false },
    ],
  },

  benefits: {
    title: "Regularne karmienie, gdziekolwiek jest koń",
    items: [
      {
        title: "Regularne karmienie",
        text: "Siano pojawia się o zaplanowanych porach, także między porcjami podawanymi w stajni.",
      },
      {
        title: "Bez udziału opiekuna",
        text: "Rygiel zwalnia się sam. Nie musisz być w stajni, żeby koń dostał siano na czas.",
      },
      {
        title: "Mobilny",
        text: "Zabierasz go tam, gdzie jest koń: do boksu, na padok i na wyjazd na zawody.",
      },
      {
        title: "Elastyczny harmonogram",
        text: "Różne godziny w różne dni. Terminy włączasz i wyłączasz bez utraty ustawień.",
      },
    ] as Item[],
  },

  calculator: {
    title: "Ile czasu zyskasz w roku?",
    lead: "Ustaw swój poranek. Liczymy dojazd w obie strony i samo karmienie.",
    commute: "Dojazd do stajni w jedną stronę",
    feeding: "Karmienie na miejscu",
    days: "Poranki w tygodniu, które przejmie worek",
    minutes: "min",
    // Plural forms by Intl.PluralRules category; {n}-style placeholders are filled in the component.
    dayForms: { one: "dzień", few: "dni", many: "dni", other: "dni" } as PluralForms,
    hourForms: { one: "godzina", few: "godziny", many: "godzin", other: "godziny" } as PluralForms,
    morningForms: { one: "poranek", few: "poranki", many: "poranków", other: "poranka" } as PluralForms,
    perYear: "rocznie",
    result: "To {mornings} {morningWord} w roku, w które siano czeka na konia bez Twojego udziału.",
    assumption: "Szacunek przy założeniu, że worek przejmuje całe poranne karmienie przez {weeks} tygodnie w roku.",
  },

  specs: {
    title: "Parametry",
    note: "Pojemność, wymiary i cenę podamy przed premierą.",
    items: [
      { label: "Konstrukcja", value: "worek na siano z modułem elektronicznym i ryglem" },
      { label: "Harmonogram", value: "tygodniowy: wybór dni i dowolnej liczby godzin, każdy termin włączany osobno" },
      { label: "Otwieranie", value: "automatyczne, rygiel zwalnia się o zaplanowanej porze" },
      { label: "Zasilanie", value: "ładowanie przez USB-C" },
      { label: "Czas pracy", value: "do 2 tygodni na jednym ładowaniu" },
      { label: "Zastosowanie", value: "boks, padok, wyjazdy na zawody" },
    ],
  },

  stables: {
    title: "Masz stajnię albo pensjonat?",
    lead: "Pensjonaty podają siano zwykle 2–3 razy dziennie. Areniq Feed pozwala dołożyć kolejne porcje o zaplanowanych porach, bez dodatkowej pracy obsługi.",
    cta: "Zapisz stajnię na listę",
    items: [
      {
        title: "Dodatkowe porcje między karmieniami",
        text: "Pensjonat podaje siano 2–3 razy dziennie. Areniq Feed może podać kolejną porcję o dowolnej porze.",
      },
      {
        title: "Mniej porannych dyżurów",
        text: "Obsługa zaczyna dzień od innych obowiązków, a nie od rozwożenia siana.",
      },
      {
        title: "Oferta dla ośrodków w przygotowaniu",
        text: "Zapisz się i podaj liczbę koni. Chcemy poznać potrzeby stajni, zanim ustalimy warunki dla ośrodków.",
      },
    ] as Item[],
  },

  faq: {
    title: "Pytania i odpowiedzi",
    items: [
      {
        q: "Kiedy Areniq Feed będzie dostępny?",
        a: "Pracujemy nad pierwszą serią i zaczynamy od sprzedaży w Polsce. Osoby z listy oczekujących dowiedzą się o premierze jako pierwsze.",
      },
      {
        q: "Ile kosztuje?",
        a: "Cenę podamy przed premierą. Kupujesz urządzenie jednorazowo, bez subskrypcji. Zapis na listę jest bezpłatny i do niczego nie zobowiązuje.",
      },
      { q: "Jak często trzeba ładować baterię?", a: "Jedno ładowanie przez USB-C wystarcza na maksymalnie 2 tygodnie pracy." },
      {
        q: "Czy mogę ustawić różne godziny w różne dni?",
        a: "Tak. Wybierasz dni tygodnia i dowolną liczbę godzin, a każdy termin możesz osobno włączyć lub wyłączyć bez utraty ustawień.",
      },
      {
        q: "Gdzie mogę używać worka?",
        a: "Areniq Feed jest mobilny: sprawdzi się w boksie, na padoku i podczas wyjazdów na zawody.",
      },
      {
        q: "Czy koń może dostać się do siana wcześniej?",
        a: "Worek jest zabezpieczony ryglem, który zwalnia się dopiero o zaplanowanej porze.",
      },
      {
        q: "Do czego użyjecie mojego adresu e-mail?",
        a: "Tylko do wiadomości o premierze Areniq Feed. Z listy możesz wypisać się w każdej chwili.",
      },
    ],
  },

  waitlist: {
    title: "Zapisz się na listę oczekujących",
    lead: "Pracujemy nad pierwszą serią Areniq Feed. Zostaw adres e-mail, a powiadomimy Cię o premierze i cenie.",
    sentTitle: "Zapisano Cię na listę",
    sentText: "Napiszemy na podany adres, gdy ogłosimy premierę i cenę Areniq Feed.",
    optional: "(opcjonalnie)",
    name: "Imię",
    email: "E-mail",
    horses: "Ile masz koni?",
    choose: "Wybierz",
    horsesMore: "Więcej niż 10",
    stable: "Nazwa stajni lub ośrodka",
    country: "Kraj",
    otherCountry: "Inny kraj",
    consent: "Zgadzam się, żeby zespół Areniq napisał do mnie w sprawie premiery Areniq Feed.",
    errors: {
      emailMissing: "Wpisz adres e-mail.",
      emailInvalid: "Sprawdź adres e-mail, brakuje w nim części.",
      consent: "Zaznacz zgodę, żebyśmy mogli napisać o premierze.",
      network: "Nie udało się zapisać. Sprawdź połączenie z internetem i spróbuj ponownie.",
      notConnected: "Zapisy ruszą w ciągu kilku dni. Spróbuj ponownie wkrótce.",
    },
    submit: "Zapisz się na listę",
    sending: "Zapisywanie…",
  },

  about: {
    metaTitle: "O nas",
    metaDescription:
      "Za Areniq stoją trzy osoby: Oliwia Michalak, Bartosz Zawłocki i Magda Augustyniak. Poznaj naszą historię i wartości.",
    title: "Troje studentów, jeden cel: siano podane na czas.",
    storyTitle: "Dlaczego powstało Areniq",
    story: [
      "Konie najlepiej czują się przy stałym rytmie dnia, a wrzody żołądka dotyczą 40–60% koni sportowych. Tymczasem pensjonaty podają siano zwykle 2–3 razy dziennie, a na zawodach i w przydomowej stajni wszystko zależy od grafiku opiekuna.",
      "Areniq powstało, żeby ten rozdźwięk zmniejszyć. Łączymy mechatronikę, programowanie i doświadczenie ze sportu jeździeckiego. Tak powstał Areniq Feed: mobilny worek na siano, który otwiera się sam według ustawionego harmonogramu.",
    ],
    teamTitle: "Założyciele",
    teamLead:
      "Areniq to wspólny projekt trzech osób. Mechatronika, sztuczna inteligencja i sport jeździecki w jednym zespole.",
    founders: [
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
    ] as Founder[],
    valuesTitle: "Czym się kierujemy",
    values: [
      { title: "Najpierw koń", text: "Każdą decyzję sprawdzamy pytaniem, czy służy zdrowiu i spokojowi zwierzęcia." },
      { title: "Prosto w obsłudze", text: "Napełniasz, ustawiasz harmonogram, zawieszasz. Resztę robi urządzenie." },
      {
        title: "Tam, gdzie jest koń",
        text: "Projektujemy z myślą o boksie, padoku i wyjazdach na zawody, nie tylko o jednym miejscu.",
      },
      {
        title: "Blisko ludzi z branży",
        text: "Rozmawiamy z właścicielami koni i stajniami, zanim cokolwiek trafi do produkcji.",
      },
    ] as Item[],
    ctaTitle: "Chcesz wiedzieć o premierze?",
    ctaText: "Zapisz się na listę oczekujących. Napiszemy, gdy Areniq Feed będzie gotowy.",
  },

  notFound: {
    title: "Nie ma takiej strony",
    text: "Adres mógł się zmienić. Wróć na stronę główną.",
    cta: "Strona główna",
  },
};

export type Dictionary = typeof pl;
