"use client";

import { useEffect, useRef, useState, type MouseEventHandler, type TouchEventHandler } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";

const ConsultationModal = dynamic(
  () => import("@/features/forms/ConsultationModal").then((m) => m.ConsultationModal),
);

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

export function HeroSection() {
  const { locale, tr } = useLocale();
  const [activeSlide, setActiveSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
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
            const isVisible = index === activeSlide;
            const isAdjacent =
              index === (activeSlide + 1) % HERO_SLIDES.length ||
              index === (activeSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
            const shouldLoad = index === 0 || isVisible || isAdjacent;

            return (
              <div key={slide.image} className="relative h-full w-screen shrink-0">
                {shouldLoad && (
                  <>
                    <Image
                      src={slide.mobileImage}
                      alt={`Hero slide ${index + 1}`}
                      fill
                      priority={index === 0}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      sizes="100vw"
                      className="md:hidden object-cover object-center"
                    />
                    <Image
                      src={slide.image}
                      alt={`Hero slide ${index + 1}`}
                      fill
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="100vw"
                      className={`hidden md:block ${
                        index === 0 ? "object-cover object-[center_42%] md:object-center" : "object-cover object-center"
                      }`}
                    />
                  </>
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
          <h2
            className="max-w-4xl text-3xl font-black uppercase leading-[1.08] tracking-[0.03em] text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
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
                onClick={() => setModalOpen(true)}
                className="cta-press inline-flex min-w-[220px] items-center justify-center rounded-[8px] border-[3px] border-white bg-white/8 px-10 py-4 text-xl font-black uppercase tracking-[0.08em] text-white shadow-[0_10px_32px_rgba(0,0,0,0.2)] transition hover:bg-white/35 hover:backdrop-blur-md"
                style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
              >
                {currentSlide.buttonLabel[locale]}
              </button>
            ) : (
              <Link
                href={currentSlide.href ?? "/"}
                className="cta-press inline-flex min-w-[220px] items-center justify-center rounded-[8px] border-[3px] border-white bg-white/8 px-10 py-4 text-xl font-black uppercase tracking-[0.08em] text-white shadow-[0_10px_32px_rgba(0,0,0,0.2)] transition hover:bg-white/35 hover:backdrop-blur-md"
                style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
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
          onClick={() => setModalOpen(true)}
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
            onClick={() => setActiveSlide(index)}
            aria-label={locale === "en" ? `Go to slide ${index + 1}` : `Перейти до слайду ${index + 1}`}
            className={`h-2.5 rounded-full border border-white/70 transition-all duration-300 ${
              activeSlide === index ? "w-8 bg-white" : "w-2.5 bg-white/30 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
