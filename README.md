# Unitbud — Premium Real Estate Website

Ultra-premium, mobile-first marketing website for Unitbud — a premium frame house construction company.

## Tech Stack

- **Next.js 16** (App Router, Server Components)
- **React 19** with TypeScript
- **Tailwind CSS v4** — design tokens in CSS
- **Framer Motion** — micro-interactions, scroll reveals, transitions
- **React Hook Form + Zod** — form validation with phone masking
- **next/font** — Inter + Montserrat with zero CLS
- **next/image** — automatic WebP/AVIF, blur placeholders

## Architecture

```
/app
  /catalog          → Filtered house catalog (client-side filter+sort)
  /house/[slug]     → House detail page (SSG with generateStaticParams)
  /privacy          → Privacy policy
  layout.tsx        → Root layout: fonts, metadata, GA
  page.tsx          → Home page (all sections)
  sitemap.ts        → Dynamic sitemap
  robots.ts         → Robots.txt

/components
  /ui               → HouseCard, SectionHeader, RevealOnScroll
  /sections         → Hero, Stats, Installed, Popular, Why,
                      Process, Reviews, FAQ, Consultation
  /shared           → Header, Footer, StickyBookingBar, AiWidget, Analytics

/features
  /calculator       → Interactive price calculator
  /forms            → ConsultationModal (reusable)
  /map              → Interactive Ukraine map with pins

/data               → Static data: houses, reviews, FAQ, process steps, map points
/hooks              → useScrolled, useInView, useLocale (UA/EN)
/types              → TypeScript interfaces
/lib                → cn(), formatPrice(), formatPhone(), validators
```

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX   # Google Analytics 4 (optional)
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

Or connect GitHub repo to Vercel for automatic CI/CD.

## Design System

| Token | Value | Usage |
|---|---|---|
| `#728c4a` | Brand green | Primary CTAs, accents |
| `#44552b` | Brand dark | Hover states |
| `#131311` | Near-black | Headlines |
| `#555552` | Gray | Body text |
| `#f9f9f8` | Off-white | Surface bg |

Typography: **Montserrat** (display, weight 300–600) + **Inter** (body)

## Features

- Mobile-first, iOS/Android/tablet perfect
- Glassmorphism header (transparent → glass on scroll)
- Fullscreen hero with animated text overlay
- Animated stats bar
- House catalog with filter + sort
- House detail pages with image gallery, specs, sticky sidebar CTA
- Interactive price calculator (area / floors / material / completion)
- Interactive Ukraine map with popup previews
- Process timeline: vertical desktop + horizontal scroll mobile
- Premium dark-theme review cards
- Smooth FAQ accordion
- Consultation forms: phone mask, name validation, success screen
- AI chat widget (UI demo)
- Sticky bottom booking bar (mobile only)
- UA / EN instant language toggle
- Full SEO: metadata, OpenGraph, sitemap.xml, robots.txt
- Google Analytics 4 integration

---

Developed by [STEPS LAB](https://stepslab.com)
