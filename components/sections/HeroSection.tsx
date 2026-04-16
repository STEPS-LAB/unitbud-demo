"use client";

import { useEffect, useRef, useState, type MouseEventHandler, type TouchEventHandler } from "react";
import Image from "next/image";
import Link from "next/link";
import { ConsultationModal } from "@/features/forms/ConsultationModal";

const HERO_SLIDES = [
  {
    image: "/images/hero/hero2.webp",
    mobileImage: "/images/hero/hero-mobile2.webp",
    title: "КАРКАСНО-МОДУЛЬНІ БУДИНКИ ДЛЯ ЖИТТЯ ТА БІЗНЕСУ",
    buttonLabel: "Залишити заявку",
    action: "consultation",
  },
  {
    image: "/images/hero/hero3.webp",
    mobileImage: "/images/hero/hero-mobile3.webp",
    title: "Модульні будинки для цілорічного проживання",
    buttonLabel: "Детальніше",
    href: "/catalog",
  },
  {
    image: "/images/hero/hero1.webp",
    mobileImage: "/images/hero/hero-mobile1.webp?v=2",
    buttonLabel: "Детальніше",
    href: "/uba-top",
  },
  {
    image: "/images/hero/hero4.webp",
    mobileImage: "/images/hero/hero-mobile4.webp",
    title: "Готові рішення для бізнесу",
    buttonLabel: "Детальніше",
    href: "/business",
  },
];

export function HeroSection() {
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
        {HERO_SLIDES.map((slide, index) => (
          <div key={slide.image}>
            <Image
              src={slide.mobileImage}
              alt={`Hero slide ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`md:hidden object-cover object-center transition-opacity duration-1000 ${
                activeSlide === index ? "opacity-100" : "opacity-0"
              }`}
            />
            <Image
              src={slide.image}
              alt={`Hero slide ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className={`hidden md:block ${
                index === 0 ? "object-cover object-[center_42%] md:object-center" : "object-cover object-center"
              } transition-opacity duration-1000 ${
                activeSlide === index ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        ))}
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
            {currentSlide.title}
          </h2>
        ) : null}

        <div
          className={`${currentSlide.title ? "mt-8" : ""} ${
            activeSlide === 2 ? "translate-y-52 md:translate-y-0" : ""
          }`}
        >
          <div className="flex flex-col items-center">
            {currentSlide.action === "consultation" ? (
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex min-w-[220px] items-center justify-center rounded-[8px] border-[3px] border-white bg-white/8 px-10 py-4 text-xl font-black uppercase tracking-[0.08em] text-white shadow-[0_10px_32px_rgba(0,0,0,0.2)] transition hover:bg-white/35 hover:backdrop-blur-md"
                style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
              >
                {currentSlide.buttonLabel}
              </button>
            ) : (
              <Link
                href={currentSlide.href ?? "/"}
                className="inline-flex min-w-[220px] items-center justify-center rounded-[8px] border-[3px] border-white bg-white/8 px-10 py-4 text-xl font-black uppercase tracking-[0.08em] text-white shadow-[0_10px_32px_rgba(0,0,0,0.2)] transition hover:bg-white/35 hover:backdrop-blur-md"
                style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
              >
                {currentSlide.buttonLabel}
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 left-1/2 z-30 -translate-x-1/2">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex min-w-[220px] items-center justify-center rounded-[8px] border-[3px] border-emerald-300 bg-emerald-600/25 px-10 py-4 text-xl font-black uppercase tracking-[0.08em] text-white shadow-[0_10px_32px_rgba(0,0,0,0.2)] transition hover:bg-emerald-600/35"
          style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
        >
          Отримати консультацію
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 flex items-center gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur-sm">
        {HERO_SLIDES.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => setActiveSlide(index)}
            aria-label={`Перейти до слайду ${index + 1}`}
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
