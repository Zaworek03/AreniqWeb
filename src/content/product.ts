// Copy and data for the home page. Specs are provisional until the team sends real values.

export const PROBLEMS = [
  {
    marker: "5:00",
    title: "Poranne karmienie",
    text: "Budzik przed świtem, żeby zdążyć do stajni przed pracą.",
  },
  {
    marker: "sob.",
    title: "Weekendy i wyjazdy",
    text: "Ktoś musi podać siano, nawet gdy nie ma Cię w mieście.",
  },
  {
    marker: "12 h",
    title: "Długie przerwy",
    text: "Wieczorne siano szybko znika i do rana koń stoi przy pustym żłobie. Długie przerwy bez paszy zwiększają ryzyko wrzodów i kolek.",
  },
] as const;

// `bag` is the illustration state for each step: fill, closed (1 = bottom rolled up), clock.
export const STEPS = [
  {
    title: "Napełnij worek",
    text: "Wieczorem wsyp do worka porcję siana. Dół worka jest zwinięty, więc nic nie wypada.",
    bag: { fill: 1, closed: 1, clock: 0 },
  },
  {
    title: "Ustaw godzinę",
    text: "Wybierz porę otwarcia, na przykład 6:00. Do tej chwili worek pozostaje zamknięty.",
    bag: { fill: 1, closed: 1, clock: 1 },
  },
  {
    title: "Worek otwiera się sam",
    text: "O ustawionej godzinie dół worka się rozwija, a siano spada na ziemię, prosto do konia.",
    bag: { fill: 1, closed: 0, clock: 1 },
  },
] as const;

export const BENEFITS = [
  {
    title: "Stałe pory karmienia",
    text: "Siano jest dostępne o tej samej godzinie każdego dnia, także w weekend.",
  },
  {
    title: "Mniej porannych dojazdów",
    text: "Jedno karmienie mniej na Twojej głowie i dłuższy sen.",
  },
  {
    title: "Zdrowszy żołądek konia",
    text: "Krótsze przerwy bez paszy to mniejsze ryzyko wrzodów i kolek.",
  },
  {
    title: "Spokój, gdy coś Cię zatrzyma",
    text: "Korek, dyżur albo wyjazd nie przesuwają śniadania Twojego konia.",
  },
] as const;

export const STABLE_POINTS = [
  {
    title: "Ta sama pora w całej stajni",
    text: "Wszystkie konie dostają siano jednocześnie, bez kolejki i nerwowego czekania przy boksach.",
  },
  {
    title: "Mniej porannych dyżurów",
    text: "Obsługa zaczyna dzień od innych obowiązków, a nie od rozwożenia siana.",
  },
  {
    title: "Oferta dla ośrodków w przygotowaniu",
    text: "Zapisz się i podaj liczbę koni. Chcemy poznać potrzeby stajni, zanim ustalimy warunki dla ośrodków.",
  },
] as const;

// TODO: replace with real specs from the team.
export const SPECS = [
  { label: "Pojemność", value: "do 10 kg siana" },
  { label: "Zasilanie", value: "wbudowany akumulator, ładowanie przez USB-C" },
  { label: "Czas pracy na baterii", value: "około miesiąca przy jednym otwarciu dziennie" },
  { label: "Ustawianie godziny", value: "na panelu urządzenia" },
  { label: "Montaż", value: "do ściany lub krat boksu, uchwyty w zestawie" },
  { label: "Materiały", value: "szara tkanina odporna na wilgoć" },
  { label: "Wymiary", value: "około 60 × 40 × 25 cm" },
  { label: "Temperatura pracy", value: "od −20 °C do 40 °C" },
] as const;

export const FAQ = [
  {
    q: "Kiedy worek będzie dostępny?",
    a: "Kończymy prace nad pierwszą serią. Osoby z listy oczekujących dowiedzą się o premierze jako pierwsze.",
  },
  {
    q: "Ile kosztuje?",
    a: "Cenę podamy przed premierą. Zapis na listę jest bezpłatny i do niczego nie zobowiązuje.",
  },
  {
    q: "Jak często trzeba ładować baterię?",
    a: "Około raz w miesiącu przy jednym otwarciu dziennie. Ładujesz ją kablem USB-C.",
  },
  {
    q: "Czy worek pasuje do mojego boksu?",
    a: "Worek mocuje się do ściany albo krat boksu uchwytami z zestawu. Jeśli masz nietypowy boks, napisz do nas.",
  },
  {
    q: "Czy koń może otworzyć worek wcześniej?",
    a: "Dół worka pozostaje zwinięty i zablokowany do ustawionej godziny. Szczegóły konstrukcji pokażemy przed premierą.",
  },
  {
    q: "Do czego użyjecie mojego adresu e-mail?",
    a: "Tylko do wiadomości o premierze worka Areniq. Z listy możesz wypisać się w każdej chwili.",
  },
] as const;
