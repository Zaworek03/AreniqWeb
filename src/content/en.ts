// English copy, translated from pl.ts without adding facts. Have a fluent speaker review before launch.

import type { Dictionary } from "./pl";

export const en: Dictionary = {
  meta: {
    title: "Areniq Feed – an automatic, portable hay feeder for horses",
    description:
      "Areniq Feed is a portable hay bag with an electronic module and a bolt that opens on its own, following the weekly schedule you set.",
    ogAlt: "Areniq Feed: an automatic, portable hay feeder for horses",
    ogHeadline: "Hay on time. Even when you’re not there.",
    ogFallbackHeadline: "Hay on time.",
  },

  chrome: {
    skipLink: "Skip to content",
    nav: { how: "How it works", schedule: "Schedule", specs: "Specs", faq: "FAQ", about: "About us" },
    navLabel: "Main",
    navMobileLabel: "Main (mobile)",
    homeLabel: "Areniq, home page",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    cta: "Join the waitlist",
    languageSwitch: { label: "Polski", short: "PL", hrefLang: "pl" },
    footer: {
      tagline: "Areniq Feed: an automatic, portable hay feeder for horses.",
      siteHeading: "Site",
      contactHeading: "Contact",
      footerNavLabel: "Footer",
      fundingAlt: "European Funds for Eastern Poland, Republic of Poland, Co-funded by the European Union",
      closing: "Made with horses and their people in mind.",
    },
  },

  hero: {
    title: "Hay on time. Even when you’re not there.",
    lead: "An automatic, portable hay feeder for horses. Set a weekly schedule and the bag opens on its own at the planned time: in the stable, in the paddock and at competitions.",
    ctaSecondary: "See how it works",
    note: "Joining is free and you’re not committing to anything.",
    bagLabel:
      "Areniq Feed hanging from a rail. At the planned time the bolt releases, the bottom of the bag opens and the hay falls to the ground.",
    badgeLabel: "Schedule",
    badgeValue: "MON · 06:00",
  },

  problem: {
    title: "Horses need routine. Stable timetables don’t always allow for it.",
    items: [
      {
        icon: "calendar",
        title: "Rigid stable timetables",
        text: "Livery yards usually provide only 2–3 scheduled hay portions a day.",
      },
      {
        icon: "pulse",
        title: "Digestive health",
        text: "Gastric ulcers affect 40–60% of sport horses (Merck Veterinary Manual). Regular feeding is key.",
      },
      {
        icon: "moon",
        title: "Multi-day competitions",
        text: "Riders are responsible for feeding their horse themselves, which cuts into their rest.",
      },
      {
        icon: "home",
        title: "Home stables",
        text: "With so many daily chores, it’s hard to stick to fixed, punctual feeding times.",
      },
    ],
  },

  how: {
    title: "How it works",
    lead: "Four steps. After that, the bag works on its own, following the schedule.",
    illustrationLabel:
      "Illustration of four steps: the bag filled with hay, with a schedule set, hung up, and at the planned time open, with hay on the ground.",
    steps: [
      {
        title: "Fill the bag",
        text: "Put in a prepared portion of hay and secure the bag with the bolt.",
        bag: { fill: 1, armed: 0, hung: 0, open: 0 },
      },
      {
        title: "Set the schedule",
        text: "Choose the days of the week and opening times directly in the settings.",
        bag: { fill: 1, armed: 1, hung: 0, open: 0 },
      },
      {
        title: "Hang it where you need it",
        text: "In the stable, in the paddock or when you travel to a competition.",
        bag: { fill: 1, armed: 1, hung: 1, open: 0 },
      },
      {
        title: "Automatic feeding",
        text: "At the planned time the bolt releases, the bottom of the bag opens and the hay falls to the ground. No one needs to be there.",
        bag: { fill: 1, armed: 1, hung: 1, open: 1 },
      },
    ],
  },

  schedule: {
    title: "Weekly schedule",
    lead: "This is the heart of Areniq Feed. Choose the days of the week and any number of times, and switch each slot on or off separately without losing your settings.",
    useCasesTitle: "Works well",
    useCases: [
      { icon: "home", label: "In the stable" },
      { icon: "pin", label: "In the paddock" },
      { icon: "calendar", label: "At competitions" },
      { icon: "moon", label: "At night" },
      { icon: "toggle", label: "Every day" },
    ],
    cardTitle: "Schedule",
    activeCount: "Active slots:",
    cardNote: "Example settings view. Click to switch a slot on or off.",
    sample: [
      { day: "MO", dayLabel: "Monday", time: "07:00", on: true },
      { day: "TU", dayLabel: "Tuesday", time: "08:30", on: false },
      { day: "WE", dayLabel: "Wednesday", time: "18:00", on: false },
      { day: "TH", dayLabel: "Thursday", time: "09:15", on: false },
      { day: "FR", dayLabel: "Friday", time: "19:30", on: false },
      { day: "SA", dayLabel: "Saturday", time: "12:00", on: true },
      { day: "SU", dayLabel: "Sunday", time: "17:45", on: false },
    ],
  },

  benefits: {
    title: "Regular feeding, wherever your horse is",
    items: [
      { title: "Regular feeding", text: "Hay arrives at the planned times, including between the portions the stable provides." },
      { title: "No one needs to be there", text: "The bolt releases on its own. You don’t have to be at the stable for your horse to get hay on time." },
      { title: "Portable", text: "Take it wherever your horse is: to the stable, the paddock and away to competitions." },
      { title: "Flexible schedule", text: "Different times on different days. Switch slots on and off without losing your settings." },
    ],
  },

  calculator: {
    title: "How much time will you save in a year?",
    lead: "Set up your morning. We count the round trip and the feeding itself.",
    commute: "Travel to the stable, one way",
    feeding: "Feeding on site",
    days: "Mornings a week the bag takes over",
    minutes: "min",
    dayForms: { one: "day", few: "days", many: "days", other: "days" },
    hourForms: { one: "hour", few: "hours", many: "hours", other: "hours" },
    morningForms: { one: "morning", few: "mornings", many: "mornings", other: "mornings" },
    perYear: "a year",
    result: "That’s {mornings} {morningWord} a year when the hay waits for your horse without you.",
    assumption: "Estimate assuming the bag takes over the whole morning feed for {weeks} weeks a year.",
  },

  specs: {
    title: "Specs",
    note: "We’ll share capacity, dimensions and price before launch.",
    items: [
      { label: "Design", value: "hay bag with an electronic module and a bolt" },
      { label: "Schedule", value: "weekly: choose the days and any number of times, each slot switched on separately" },
      { label: "Opening", value: "automatic, the bolt releases at the planned time" },
      { label: "Power", value: "USB-C charging" },
      { label: "Battery life", value: "up to 2 weeks on a single charge" },
      { label: "Use", value: "stable, paddock, travelling to competitions" },
    ],
  },

  stables: {
    title: "Do you run a stable or livery yard?",
    lead: "Livery yards usually feed hay 2–3 times a day. Areniq Feed lets you add more portions at planned times, with no extra work for your staff.",
    cta: "Add your stable to the list",
    items: [
      {
        title: "Extra portions between feeds",
        text: "Your yard feeds hay 2–3 times a day. Areniq Feed can deliver another portion at any time.",
      },
      { title: "Fewer early-morning shifts", text: "Staff start the day with other jobs instead of handing out hay." },
      {
        title: "An offer for yards is in the works",
        text: "Sign up and tell us how many horses you have. We want to understand stables' needs before we set terms for yards.",
      },
    ],
  },

  faq: {
    title: "Questions and answers",
    items: [
      {
        q: "When will Areniq Feed be available?",
        a: "We’re working on the first production run and starting with sales in Poland. People on the waitlist will be the first to hear about the launch.",
      },
      {
        q: "How much does it cost?",
        a: "We’ll announce the price before launch. You buy the device once, with no subscription. Joining the waitlist is free and you’re not committing to anything.",
      },
      { q: "How often does the battery need charging?", a: "A single USB-C charge lasts up to 2 weeks." },
      {
        q: "Can I set different times on different days?",
        a: "Yes. Choose the days of the week and any number of times, and switch each slot on or off separately without losing your settings.",
      },
      {
        q: "Where can I use the bag?",
        a: "Areniq Feed is portable: it works in the stable, in the paddock and when you travel to competitions.",
      },
      {
        q: "Can my horse get to the hay early?",
        a: "The bag is secured with a bolt that only releases at the planned time.",
      },
      {
        q: "What will you use my email address for?",
        a: "Only for news about the Areniq Feed launch. You can leave the list at any time.",
      },
    ],
  },

  waitlist: {
    title: "Join the waitlist",
    lead: "We’re working on the first run of Areniq Feed. Leave your email address and we’ll let you know about the launch and the price.",
    sentTitle: "You’re on the list",
    sentText: "We’ll write to you when we announce the launch and price of Areniq Feed.",
    optional: "(optional)",
    name: "First name",
    email: "Email",
    horses: "How many horses do you have?",
    choose: "Choose",
    horsesMore: "More than 10",
    stable: "Stable or yard name",
    country: "Country",
    otherCountry: "Another country",
    consent: "I agree that the Areniq team may email me about the Areniq Feed launch.",
    errors: {
      emailMissing: "Enter your email address.",
      emailInvalid: "Check your email address, part of it is missing.",
      consent: "Tick the box so we can write to you about the launch.",
      network: "We couldn’t sign you up. Check your internet connection and try again.",
      notConnected: "Sign-ups open in a few days. Please try again soon.",
    },
    submit: "Join the waitlist",
    sending: "Signing up…",
  },

  about: {
    metaTitle: "About us",
    metaDescription:
      "Areniq is three people: Oliwia Michalak, Bartosz Zawłocki and Magda Augustyniak. Read our story and what we stand for.",
    title: "Three students, one goal: hay on time.",
    storyTitle: "Why we started Areniq",
    story: [
      "Horses do best with a steady daily rhythm, and gastric ulcers affect 40–60% of sport horses. Yet livery yards usually feed hay 2–3 times a day, and at competitions or in a home stable everything depends on the carer’s timetable.",
      "Areniq was founded to close that gap. We combine mechatronics, programming and experience in equestrian sport. The result is Areniq Feed: a portable hay bag that opens on its own, following the schedule you set.",
    ],
    teamTitle: "Founders",
    teamLead: "Areniq is a joint project of three people. Mechatronics, artificial intelligence and equestrian sport in one team.",
    founders: [
      {
        name: "Oliwia Michalak",
        initials: "OM",
        bio: "Mechatronics student, involved in equestrian sport for many years. She combines technical knowledge with a deep understanding of what the industry needs.",
      },
      {
        name: "Magdalena Augustyniak",
        initials: "MA",
        bio: "Artificial intelligence student with skills in programming, electronics and data analysis.",
      },
      {
        name: "Bartosz Zawłocki",
        initials: "BZ",
        bio: "Mechatronics student who builds his own technical projects and prototypes, with experience in design, 3D modelling and programming.",
      },
    ],
    valuesTitle: "What guides us",
    values: [
      { title: "The horse comes first", text: "We test every decision by asking whether it serves the animal’s health and calm." },
      { title: "Simple to use", text: "Fill it, set the schedule, hang it up. The device does the rest." },
      {
        title: "Wherever the horse is",
        text: "We design for the stable, the paddock and trips to competitions, not just one place.",
      },
      {
        title: "Close to the people who know horses",
        text: "We talk to horse owners and stables before anything goes into production.",
      },
    ],
    ctaTitle: "Want to hear about the launch?",
    ctaText: "Join the waitlist. We’ll write when Areniq Feed is ready.",
  },

  notFound: {
    title: "Page not found",
    text: "The address may have changed. Go back to the home page.",
    cta: "Home page",
  },
};
