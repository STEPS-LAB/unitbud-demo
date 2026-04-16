"use client";

import { useState, useCallback, useEffect } from "react";

export type Locale = "uk" | "en";

const translations = {
  uk: {
    nav: {
      catalog: "Каталог",
      about: "Про нас",
      projects: "Проєкти",
      process: "Процес",
      contacts: "Контакти",
    },
    cta: "Безкоштовна консультація",
    hero: {
      label: "Преміальне каркасне будівництво",
      h1: "Будинки, що\nстворюють стиль\nжиття",
      sub: "Від проєкту до ключів — під ключ. Терміни від 75 днів. Гарантія 10 років.",
      cta1: "Переглянути каталог",
      cta2: "Отримати консультацію",
    },
    stats: {
      houses: "збудованих будинків",
      years: "років на ринку",
      days: "середній термін",
      warranty: "гарантія",
    },
    sections: {
      installed: "Встановлені будинки",
      installedSub: "Реалізовані проєкти по всій Україні",
      popular: "Популярні моделі будинків",
      popularSub: "Найзатребуваніші проєкти нашого каталогу",
      why: "Чому обирають Unitbud",
      whySub: "Понад 10 років будуємо будинки мрії",
      process: "Процес придбання будинку",
      processSub: "5 прозорих кроків від консультації до монтажу і підключення",
      reviews: "Відгуки клієнтів",
      reviewsSub: "Люди, які вже живуть у своєму будинку",
      faq: "Часті питання",
      faqSub: "Відповіді на найпоширеніші запитання",
      consultation: "Отримайте безкоштовну консультацію",
      consultationSub: "Наш менеджер зв'яжеться з вами протягом хвилини",
      map: "Реалізовані об'єкти",
      mapSub: "Наші будинки по всій Україні",
      calculator: "Калькулятор вартості",
      calculatorSub: "Розрахуйте орієнтовну вартість вашого майбутнього будинку",
      mapLabel: "Карта",
      calcModelType: "Тип моделі",
      calcResidential: "Житлові",
      calcCommercial: "Комерційні",
      calcSauna: "Лазні",
      calcComfort: "Комфорт",
      calcPremium: "Преміум",
      calcLux: "Люкс",
    },
    form: {
      name: "Ваше ім'я",
      phone: "Номер телефону",
      comment: "Коментар (необов'язково)",
      submit: "Отримати консультацію",
      submitAnother: "Надіслати ще заявку",
      sending: "Відправляємо...",
      privacyLead: "Погоджуючись, ви приймаєте",
      privacyPolicy: "політику конфіденційності",
      close: "Закрити",
      success: "Ми зв'яжемось з вами протягом хвилини",
      successSub: "Дякуємо! Очікуйте дзвінка від нашого менеджера.",
    },
    common: {
      from: "від",
      details: "Детальніше",
      call: "Зателефонувати",
      consultation: "Безкоштовна консультація",
      allCatalog: "Весь каталог",
      allProjects: "Переглянути всі проєкти",
      step: "Крок",
      floor: "поверх",
      floors: "поверхи",
      area: "Площа",
      bedrooms: "Спальні",
      bathrooms: "Санвузли",
      technology: "Технологія",
      completion: "Комплектація",
      ukraine: "Україна",
      askAnything: "Запитайте що завгодно",
    },
    catalogPage: {
      title: "Наші будинки",
      modelsInCatalog: "моделей у каталозі",
      filters: "Фільтри",
      areaFrom: "Площа від",
      areaTo: "Площа до",
      emptyTitle: "Нічого не знайдено",
      emptySub: "Спробуйте змінити фільтри",
      sortPriceAsc: "Ціна: від низької",
      sortPriceDesc: "Ціна: від високої",
      sortAreaAsc: "Площа: від меншої",
      sortAreaDesc: "Площа: від більшої",
      catAll: "Всі",
      catCompact: "Компакт",
      catComfort: "Комфорт",
      catPremium: "Преміум",
      catElite: "Еліт",
    },
    housePage: {
      home: "Головна",
      catalog: "Каталог",
      aboutHouse: "Про будинок",
      features: "Особливості",
      specs: "Характеристики",
      backToCatalog: "Назад до каталогу",
      included: "* включно з монтажем та оздобленням",
      getConsultation: "Отримайте безкоштовну консультацію",
      frame: "Каркасна",
    },
    footerText: {
      brandDesc: "Преміальне каркасне будівництво. Від проєкту до ключів — під ключ.",
      address: "Київ, вул. Архітекторів, 1",
      catalog: "Каталог",
      company: "Компанія",
      contact: "Зв'язок",
      allModels: "Всі моделі",
      about: "Про нас",
      howWeBuild: "Як будуємо",
      projects: "Проєкти",
      reviews: "Відгуки",
      privacy: "Конфіденційність",
      terms: "Умови використання",
      ctaText: "Отримайте безкоштовну консультацію архітектора вже сьогодні.",
      ctaButton: "Отримати консультацію",
      allRights: "Всі права захищено.",
    },
    errors: {
      min2: "Мінімум 2 символи",
      max60: "Максимум 60 символів",
      lettersOnly: "Тільки літери",
      invalidPhone: "Введіть коректний номер",
    },
    notFound: {
      title: "Сторінку не знайдено",
      sub: "Можливо, сторінку було переміщено або видалено.",
      home: "На головну",
      toCatalog: "До каталогу",
    },
    footer: {
      dev: "Розроблено",
    },
  },
  en: {
    nav: {
      catalog: "Catalog",
      about: "About",
      projects: "Projects",
      process: "Process",
      contacts: "Contacts",
    },
    cta: "Free Consultation",
    hero: {
      label: "Premium Frame Construction",
      h1: "Homes that\ncreate your\nlifestyle",
      sub: "Turnkey from project to keys. From 75 days. 10-year warranty.",
      cta1: "Browse catalog",
      cta2: "Get consultation",
    },
    stats: {
      houses: "homes built",
      years: "years on market",
      days: "average timeline",
      warranty: "warranty",
    },
    sections: {
      installed: "Completed Projects",
      installedSub: "Realized projects across Ukraine",
      popular: "Popular House Models",
      popularSub: "Most in-demand projects from our catalog",
      why: "Why Choose Unitbud",
      whySub: "Over 10 years building dream homes",
      process: "Home Purchase Process",
      processSub: "5 clear steps from consultation to installation and connection",
      reviews: "Client Reviews",
      reviewsSub: "People who already live in their home",
      faq: "FAQ",
      faqSub: "Answers to the most common questions",
      consultation: "Receive Your Free Consultation",
      consultationSub: "Our manager will contact you within a minute",
      map: "Completed Objects",
      mapSub: "Our homes across Ukraine",
      calculator: "Cost Calculator",
      calculatorSub: "Calculate the approximate cost of your future home",
      mapLabel: "Map",
      calcModelType: "Model type",
      calcResidential: "Residential",
      calcCommercial: "Commercial",
      calcSauna: "Bath / sauna",
      calcComfort: "Comfort",
      calcPremium: "Premium",
      calcLux: "Lux",
    },
    form: {
      name: "Your name",
      phone: "Phone number",
      comment: "Comment (optional)",
      submit: "Get Consultation",
      submitAnother: "Send another request",
      sending: "Sending...",
      privacyLead: "By agreeing, you accept the",
      privacyPolicy: "privacy policy",
      close: "Close",
      success: "We'll contact you within a minute",
      successSub: "Thank you! Expect a call from our manager.",
    },
    common: {
      from: "from",
      details: "Details",
      call: "Call us",
      consultation: "Free Consultation",
      allCatalog: "Full catalog",
      allProjects: "View all projects",
      step: "Step",
      floor: "floor",
      floors: "floors",
      area: "Area",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      technology: "Technology",
      completion: "Completion",
      ukraine: "Ukraine",
      askAnything: "Ask anything",
    },
    catalogPage: {
      title: "Our houses",
      modelsInCatalog: "models in catalog",
      filters: "Filters",
      areaFrom: "Area from",
      areaTo: "Area to",
      emptyTitle: "Nothing found",
      emptySub: "Try changing filters",
      sortPriceAsc: "Price: low to high",
      sortPriceDesc: "Price: high to low",
      sortAreaAsc: "Area: smaller first",
      sortAreaDesc: "Area: larger first",
      catAll: "All",
      catCompact: "Compact",
      catComfort: "Comfort",
      catPremium: "Premium",
      catElite: "Elite",
    },
    housePage: {
      home: "Home",
      catalog: "Catalog",
      aboutHouse: "About the house",
      features: "Features",
      specs: "Specifications",
      backToCatalog: "Back to catalog",
      included: "* including installation and finishing",
      getConsultation: "Receive your free consultation",
      frame: "Frame",
    },
    footerText: {
      brandDesc: "Premium frame construction. Turnkey delivery from project to keys.",
      address: "Kyiv, Architects St, 1",
      catalog: "Catalog",
      company: "Company",
      contact: "Contact",
      allModels: "All models",
      about: "About",
      howWeBuild: "How we build",
      projects: "Projects",
      reviews: "Reviews",
      privacy: "Privacy",
      terms: "Terms of use",
      ctaText: "Get a free architect consultation today.",
      ctaButton: "Get consultation",
      allRights: "All rights reserved.",
    },
    errors: {
      min2: "Minimum 2 characters",
      max60: "Maximum 60 characters",
      lettersOnly: "Letters only",
      invalidPhone: "Enter a valid phone number",
    },
    notFound: {
      title: "Page not found",
      sub: "The page may have been moved or removed.",
      home: "Go home",
      toCatalog: "Go to catalog",
    },
    footer: {
      dev: "Developed by",
    },
  },
} as const;

export type Translations = typeof translations.uk;

let _locale: Locale = "uk";
let _listeners: Array<() => void> = [];

export function getLocale(): Locale {
  return _locale;
}

export function setLocale(l: Locale) {
  _locale = l;
  _listeners.forEach((fn) => fn());
}

export function t(locale: Locale): Translations {
  return translations[locale] as unknown as Translations;
}

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(_locale);

  const toggle = useCallback(() => {
    const next: Locale = _locale === "uk" ? "en" : "uk";
    setLocale(next);
    setLocaleState(next);
  }, []);

  useEffect(() => {
    const handler = () => setLocaleState(_locale);
    _listeners.push(handler);
    return () => {
      _listeners = _listeners.filter((fn) => fn !== handler);
    };
  }, []);

  return { locale, toggle, tr: t(locale) };
}
