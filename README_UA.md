# Unitbud — Преміальний сайт нерухомості

Ультра-преміальний, mobile-first маркетинговий сайт для Unitbud — компанії з преміального каркасного будівництва.

## Технологічний стек

- **Next.js 16** (App Router, Server Components)
- **React 19** з TypeScript
- **Tailwind CSS v4** — дизайн-токени в CSS
- **Framer Motion** — мікро-анімації, scroll reveal, переходи
- **React Hook Form + Zod** — валідація форм з маскою телефону
- **next/font** — Inter + Montserrat без CLS
- **next/image** — WebP/AVIF, blur-заглушки

## Архітектура

```
/app
  /catalog          → Каталог будинків (фільтр + сортування)
  /house/[slug]     → Сторінка будинку (SSG)
  /privacy          → Політика конфіденційності
  layout.tsx        → Кореневий layout: шрифти, метадані, GA
  page.tsx          → Головна сторінка (всі секції)
  sitemap.ts        → Динамічна карта сайту
  robots.ts         → Robots.txt

/components
  /ui               → HouseCard, SectionHeader, RevealOnScroll
  /sections         → Hero, Stats, Installed, Popular, Why,
                      Process, Reviews, FAQ, Consultation
  /shared           → Header, Footer, StickyBookingBar, AiWidget, Analytics

/features
  /calculator       → Інтерактивний калькулятор вартості
  /forms            → ConsultationModal (багаторазовий)
  /map              → Інтерактивна карта України з маркерами

/data               → Статичні дані: будинки, відгуки, FAQ, процес, карта
/hooks              → useScrolled, useInView, useLocale (UA/EN)
/types              → TypeScript інтерфейси
/lib                → cn(), formatPrice(), formatPhone(), валідатори
```

## Запуск

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Змінні середовища

Створіть `.env.local`:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX   # Google Analytics 4 (необов'язково)
```

## Деплой на Vercel

```bash
npm i -g vercel
vercel --prod
```

Або підключіть GitHub репозиторій до Vercel для автоматичного CI/CD.

## Дизайн-система

| Токен | Значення | Використання |
|---|---|---|
| `#728c4a` | Брендовий зелений | Основні CTA, акценти |
| `#44552b` | Темний зелений | Стани при наведенні |
| `#131311` | Майже чорний | Заголовки |
| `#555552` | Сірий | Основний текст |
| `#f9f9f8` | Офф-вайт | Поверхневий фон |

Типографіка: **Montserrat** (відображення, жирність 300–600) + **Inter** (тіло)

## Функціонал

- Mobile-first, ідеально на iOS/Android/планшетах
- Glassmorphism шапка (прозора → склоподібна при прокрутці)
- Повноекранний hero з анімованим текстом
- Анімована панель статистики
- Каталог будинків з фільтром + сортуванням
- Сторінки будинків: галерея, характеристики, бічна панель CTA
- Інтерактивний калькулятор вартості
- Інтерактивна карта України з попапами
- Таймлайн процесу: вертикальний (десктоп) + горизонтальний скрол (мобільний)
- Картки відгуків (темна тема)
- Плавний акордеон FAQ
- Форми консультації: маска телефону, валідація, екран успіху
- AI чат-віджет (UI демо)
- Нижня панель бронювання (лише мобільний)
- UA / EN миттєве перемикання мови
- Повний SEO: метадані, OpenGraph, sitemap.xml, robots.txt
- Інтеграція Google Analytics 4

---

Розроблено [STEPS LAB](https://stepslab.com)
