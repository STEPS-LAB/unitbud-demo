import nextDynamic from "next/dynamic";
import { Header } from "@/components/shared/Header";

// Навмисно force-dynamic: це активує experimental.inlineCss (див. next.config.ts).
// Для prerendered-сторінок Next.js не інлайнить CSS, щоб не дублювати його в
// статичному HTML + RSC payload. SSR-час додається ~100-200 мс, але натомість
// ми виграємо ~700 мс LCP/FCP через зняття render-blocking CSS <link>.
// Контент на сторінці статичний (тексти, картинки), тому "dynamic" не шкодить
// — просто HTML рендериться на льоту при кожному запиті (кешується на CDN
// Vercel як ISR-подібний resource).
export const dynamic = "force-dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { MOBILE_STICKY_MAIN_PAD } from "@/lib/mobileSticky";

const Footer = nextDynamic(() =>
  import("@/components/shared/Footer").then((m) => m.Footer),
);

const InstalledSection = nextDynamic(() =>
  import("@/components/sections/InstalledSection").then((m) => m.InstalledSection),
);
const PopularSection = nextDynamic(() =>
  import("@/components/sections/PopularSection").then((m) => m.PopularSection),
);
const WhySection = nextDynamic(() =>
  import("@/components/sections/WhySection").then((m) => m.WhySection),
);
const ProcessSection = nextDynamic(() =>
  import("@/components/sections/ProcessSection").then((m) => m.ProcessSection),
);
// Важкі нижче-fold секції з формами (zod + react-hook-form) винесено в
// client-only обгортки, щоб їх ~68 КБ JS не вантажилися в критичному шляху.
// Див. components/shared/DeferredFormSections.tsx.
const DeferredCalculatorSection = nextDynamic(() =>
  import("@/components/shared/DeferredFormSections").then((m) => m.DeferredCalculatorSection),
);
const ReviewsSection = nextDynamic(() =>
  import("@/components/sections/ReviewsSection").then((m) => m.ReviewsSection),
);
const FaqSection = nextDynamic(() =>
  import("@/components/sections/FaqSection").then((m) => m.FaqSection),
);
const DeferredConsultationSection = nextDynamic(() =>
  import("@/components/shared/DeferredFormSections").then((m) => m.DeferredConsultationSection),
);
const HomeStickyChrome = nextDynamic(() =>
  import("@/components/shared/HomeStickyChrome").then((m) => m.HomeStickyChrome),
);

export default function HomePage() {
  return (
    <>
      {/*
        LCP preload hints — браузер починає тягнути hero-картинку ще під час
        парсингу HTML, до гідрації JS. Media-атрибути гарантують, що на
        мобільному тягнеться лише mobile-версія, а на desktop — desktop.
        React 19 hoist-ить ці <link> у <head>.
      */}
      <link
        rel="preload"
        as="image"
        href="/images/hero/hero-mobile2.webp"
        fetchPriority="high"
        media="(max-width: 767px)"
      />
      <link
        rel="preload"
        as="image"
        href="/images/hero/hero2.webp"
        fetchPriority="high"
        media="(min-width: 768px)"
      />
      <Header />
      <main className={MOBILE_STICKY_MAIN_PAD}>
        <HeroSection />
        <StatsBar />
        <InstalledSection />
        <PopularSection />
        <WhySection />
        <ProcessSection />
        <DeferredCalculatorSection />
        <ReviewsSection />
        <FaqSection />
        <DeferredConsultationSection />
      </main>
      <Footer className={MOBILE_STICKY_MAIN_PAD} />
      <HomeStickyChrome />
    </>
  );
}
