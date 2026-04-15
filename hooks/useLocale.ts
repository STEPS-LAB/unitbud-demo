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
      popular: "Популярні моделі",
      popularSub: "Найзатребуваніші проєкти нашого каталогу",
      why: "Чому обирають Unitbud",
      whySub: "Понад 10 років будуємо будинки мрії",
      process: "Як ми будуємо",
      processSub: "Прозорий та чіткий процес від першого дзвінка до ключів",
      reviews: "Відгуки клієнтів",
      reviewsSub: "Люди, які вже живуть у своєму будинку",
      faq: "Часті питання",
      faqSub: "Відповіді на найпоширеніші запитання",
      consultation: "Отримати безкоштовну консультацію",
      consultationSub: "Наш архітектор зв'яжеться з вами протягом хвилини",
      map: "Реалізовані об'єкти",
      mapSub: "Наші будинки по всій Україні",
      calculator: "Калькулятор вартості",
      calculatorSub: "Розрахуйте орієнтовну вартість вашого майбутнього будинку",
    },
    form: {
      name: "Ваше ім'я",
      phone: "Номер телефону",
      comment: "Коментар (необов'язково)",
      submit: "Отримати консультацію",
      success: "Ми зв'яжемось з вами протягом хвилини",
      successSub: "Дякуємо! Очікуйте дзвінка від нашого менеджера.",
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
      popular: "Popular Models",
      popularSub: "Most in-demand projects from our catalog",
      why: "Why Choose Unitbud",
      whySub: "Over 10 years building dream homes",
      process: "How We Build",
      processSub: "Transparent and clear process from first call to keys",
      reviews: "Client Reviews",
      reviewsSub: "People who already live in their home",
      faq: "FAQ",
      faqSub: "Answers to the most common questions",
      consultation: "Get a Free Consultation",
      consultationSub: "Our architect will contact you within a minute",
      map: "Completed Objects",
      mapSub: "Our homes across Ukraine",
      calculator: "Cost Calculator",
      calculatorSub: "Calculate the approximate cost of your future home",
    },
    form: {
      name: "Your name",
      phone: "Phone number",
      comment: "Comment (optional)",
      submit: "Get Consultation",
      success: "We'll contact you within a minute",
      successSub: "Thank you! Expect a call from our manager.",
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
