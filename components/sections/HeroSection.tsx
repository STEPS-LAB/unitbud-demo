"use client";

import { useEffect, useRef, useState, type MouseEventHandler, type TouchEventHandler } from "react";
import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";
import { useConsultationModal } from "@/components/shared/useConsultationModal";

const HERO_SLIDES = [
  {
    image: "/images/hero/hero2.webp",
    mobileImage: "/images/hero/hero-mobile2.webp",
    title: {
      uk: "КАРКАСНО-МОДУЛЬНІ БУДИНКИ ДЛЯ ЖИТТЯ ТА БІЗНЕСУ",
      en: "FRAME-MODULAR HOUSES FOR LIVING AND BUSINESS",
    },
    buttonLabel: {
      uk: "Залишити заявку",
      en: "Submit request",
    },
    action: "consultation",
  },
  {
    image: "/images/hero/hero3.webp",
    mobileImage: "/images/hero/hero-mobile3.webp",
    title: {
      uk: "Модульні будинки для цілорічного проживання",
      en: "Modular homes for year-round living",
    },
    buttonLabel: {
      uk: "Детальніше",
      en: "Details",
    },
    href: "/catalog",
  },
  {
    image: "/images/hero/hero1.webp",
    mobileImage: "/images/hero/hero-mobile1.webp?v=2",
    buttonLabel: {
      uk: "Детальніше",
      en: "Details",
    },
    href: "/uba-top",
  },
  {
    image: "/images/hero/hero4.webp",
    mobileImage: "/images/hero/hero-mobile4.webp",
    title: {
      uk: "Готові рішення для бізнесу",
      en: "Ready-made solutions for business",
    },
    buttonLabel: {
      uk: "Детальніше",
      en: "Details",
    },
    href: "/catalog",
  },
];

type HeroSlide = (typeof HERO_SLIDES)[number];

/**
 * LCP-критичне зображення hero. Рендериться плоским <picture>/<img> щоб:
 * - Уникнути подвійного завантаження (mobile + desktop) — на mobile браузер обирає один <source>.
 * - Обминути /_next/image для першого слайду (економимо cold-start latency Image Optimization Pipeline).
 * - Браузер отримує готовий WebP напряму з public/ з fetchpriority=high.
 */
function HeroSlideImage({
  slide,
  isFirst,
  altText,
  objectClass = "object-center",
}: {
  slide: HeroSlide;
  isFirst: boolean;
  altText: string;
  objectClass?: string;
}) {
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={slide.image} />
      <img
        src={slide.mobileImage}
        // alt має значення для LCP: Chrome рахує порожні alt як "decorative"
        // і може виключати картинку з LCP-кандидатів. Даємо значущий alt.
        alt={altText}
        // width/height допомагають LCP-алгоритму одразу знати розмір.
        width={580}
        height={1044}
        fetchPriority={isFirst ? "high" : "auto"}
        loading={isFirst ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        className={`absolute inset-0 h-full w-full object-cover ${objectClass}`}
      />
    </picture>
  );
}

export function HeroSection() {
  const { locale, tr } = useLocale();
  const [activeSlide, setActiveSlide] = useState(0);
  const { open: openModal, modal: consultationModal } = useConsultationModal();
  // Сусідні слайди вантажимо лише ПІСЛЯ LCP — щоб не конкурувати за мережу з LCP-картинкою.
  const [restReady, setRestReady] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (restReady) return;
    const w = window as unknown as { requestIdleCallback?: (cb: () => void) => number };
    const schedule = (cb: () => void) => {
      if (typeof w.requestIdleCallback === "function") {
        w.requestIdleCallback(cb);
      } else {
        window.setTimeout(cb, 1500);
      }
    };
    schedule(() => setRestReady(true));
  }, [restReady]);

  const handleNextSlide = () => {
    setRestReady(true);
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setRestReady(true);
    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleTouchStart: TouchEventHandler<HTMLElement> = (event) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
    touchEndXRef.current = null;
  };

  const handleTouchMove: TouchEventHandler<HTMLElement> = (event) => {
    touchEndXRef.current = event.touches[0]?.clientX ?? null;
  };

  const applySwipe = (startX: number | null, endX: number | null) => {
    if (startX === null || endX === null) {
      return;
    }

    const swipeDistance = startX - endX;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) < minSwipeDistance) {
      return;
    }

    if (swipeDistance > 0) {
      handleNextSlide();
      return;
    }

    handlePrevSlide();
  };

  const handleTouchEnd = () => {
    applySwipe(touchStartXRef.current, touchEndXRef.current);
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const handleMouseDown: MouseEventHandler<HTMLElement> = (event) => {
    touchStartXRef.current = event.clientX;
    touchEndXRef.current = null;
  };

  const handleMouseMove: MouseEventHandler<HTMLElement> = (event) => {
    if (touchStartXRef.current === null) {
      return;
    }

    touchEndXRef.current = event.clientX;
  };

  const handleMouseUpOrLeave: MouseEventHandler<HTMLElement> = () => {
    applySwipe(touchStartXRef.current, touchEndXRef.current);
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const currentSlide = HERO_SLIDES[activeSlide];

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] max-h-[1000px] flex items-center overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 flex will-change-transform"
          style={{
            width: `${HERO_SLIDES.length * 100}vw`,
            transform: `translate3d(-${activeSlide * 100}vw, 0, 0)`,
            transition: "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {HERO_SLIDES.map((slide, index) => {
            const isFirst = index === 0;
            // Першим рендеримо лише slide 0 — LCP. Решта — після idle або першої взаємодії.
            const shouldLoad = isFirst || restReady || index === activeSlide;

            return (
              <div key={slide.image} className="relative h-full w-screen shrink-0">
                {shouldLoad && (
                  <HeroSlideImage
                    slide={slide}
                    isFirst={isFirst}
                    altText={slide.title?.[locale] ?? ""}
                    objectClass={
                      isFirst ? "object-[center_42%] md:object-center" : "object-center"
                    }
                  />
                )}
              </div>
            );
          })}
        </div>
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(10,10,9,0.72) 0%, rgba(10,10,9,0.35) 55%, transparent 100%)",
          }}
        />
        <div className="absolute left-0 right-0 top-0 h-56 bg-gradient-to-b from-slate-900/70 via-slate-800/35 to-transparent" />
      </div>

      <div
        className={`relative z-20 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center ${
          activeSlide === 0
            ? "-translate-y-14 pt-0 md:translate-y-0 md:pt-24"
            : activeSlide === 1
              ? "-translate-y-10 md:translate-y-0"
              : ""
        }`}
      >
        {currentSlide.title ? (
          // ВАЖЛИВО: цей H2 — LCP-елемент на мобільному. Lantern (simulator
          // у Lighthouse) чекає на ВЕБ-ШРИФТ для "фінального" малювання LCP-тексту
          // навіть з font-display: swap — через це LCP тягнувся до 4.7 s.
          // Тому для саме LCP-елемента використовуємо ЧИСТО системний стек:
          // браузер малює його одразу після FCP без жодного fetch-а.
          <h2
            className="max-w-4xl text-3xl font-bold uppercase leading-[1.08] tracking-[0.03em] text-white sm:text-4xl md:text-5xl"
            style={{
              fontFamily:
                "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            {currentSlide.title?.[locale]}
          </h2>
        ) : null}

        <div
          className={`${currentSlide.title ? "mt-8" : ""} ${
            activeSlide === 2 ? "translate-y-52 md:translate-y-48" : ""
          }`}
        >
          <div className="flex flex-col items-center">
            {currentSlide.action === "consultation" ? (
              <button
                type="button"
                onClick={openModal}
                className="cta-press inline-flex min-w-[220px] items-center justify-center rounded-[8px] border-[3px] border-white bg-white/8 px-10 py-4 text-xl font-black uppercase tracking-[0.08em] text-white shadow-[0_10px_32px_rgba(0,0,0,0.2)] transition hover:bg-white/35 hover:backdrop-blur-md"
                // Hero-CTA — єдиний above-the-fold елемент, що використовував
                // Montserrat. Тепер system-ui: браузер не тягне woff2 у
                // критичному шляху LCP. Візуально uppercase+bold залишається.
                style={{
                  fontFamily:
                    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                }}
              >
                {currentSlide.buttonLabel[locale]}
              </button>
            ) : (
              <Link
                href={currentSlide.href ?? "/"}
                className="cta-press inline-flex min-w-[220px] items-center justify-center rounded-[8px] border-[3px] border-white bg-white/8 px-10 py-4 text-xl font-black uppercase tracking-[0.08em] text-white shadow-[0_10px_32px_rgba(0,0,0,0.2)] transition hover:bg-white/35 hover:backdrop-blur-md"
                style={{
                  fontFamily:
                    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                }}
              >
                {currentSlide.buttonLabel[locale]}
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 left-1/2 z-30 -translate-x-1/2">
        <button
          type="button"
          onClick={openModal}
          className="btn-primary btn-text-graphite text-sm px-5 py-2.5"
        >
          {tr.hero.cta2}
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 flex items-center gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur-sm">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => {
              setRestReady(true);
              setActiveSlide(index);
            }}
            aria-label={locale === "en" ? `Go to slide ${index + 1}` : `Перейти до слайду ${index + 1}`}
            className={`flex size-11 items-center justify-center rounded-full transition-colors ${
              activeSlide === index ? "bg-white/10" : "hover:bg-white/10"
            }`}
          >
            <span
              className={`h-2.5 rounded-full border border-white/70 transition-all duration-300 ${
                activeSlide === index ? "w-8 bg-white" : "w-2.5 bg-white/30 hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>

      {consultationModal}
    </section>
  );
}
