"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TouchEvent as ReactTouchEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { House } from "@/types";
import { formatUsd } from "@/lib/utils";
import { ConsultationModal } from "@/features/forms/ConsultationModal";
import { ConsultationSection } from "@/components/sections/ConsultationSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useLocale } from "@/hooks/useLocale";

interface Props {
  house: House;
}

const PACKAGE_COPY = {
  uk: {
    sectionTitle: "Варіанти комплектації",
    more: "Детальніше",
    items: [
      {
        title: "Базова",
        description:
          "Будинок з завершеним зовнішнім оздобленням, утеплений, готовий до створення власного інтер'єру. По будинку розведено інженерні мережі. Вам залишається лише зробити внутрішнє оздоблення стін, стелі та підлоги.",
        price: "18 441 $",
      },
      {
        title: "Комфорт",
        description:
          "Готовий будинок з повністю виконаним ремонтом. Стіни оздоблені деревиною (імітація бруса смереки), підлога вкрита ламінатом, стеля — натяжна (колір визначаєте Ви). Санвузол оздоблений керамічною плиткою. Встановлене внутрішнє та зовнішнє освітлення, електрофурнітура, тепла підлога по всій площі будинку, електрощитові, рекуператори повітря, сантехніка, підігрів водовідведення, водовідведення з даху. Додатково можна встановити піч-камін.",
        price: "25 596 $",
      },
      {
        title: "Преміум",
        description:
          "Повністю готовий будинок із преміальним ремонтом. Стіни оздоблені гіпсокартоном та фарбовані у відтінки, які виберете Ви. Встановлені вікна та двері преміальної якості. Вмонтована тепла підлога по всій площі будинку, електрощитові, електрофурнітура, рекуператори повітря, сантехніка, підігрів водовідведення, водовідведення з даху. Додатково можна встановити піч-камін.",
        price: "27 351 $",
      },
    ],
  },
  en: {
    sectionTitle: "Configuration options",
    more: "More details",
    items: [
      {
        title: "Base",
        description:
          "House with finished exterior, insulated, ready for your interior. Utilities are roughed in. You finish walls, ceiling, and flooring inside.",
        price: "$18,441",
      },
      {
        title: "Comfort",
        description:
          "Turnkey home with full interior finish: wood wall finish (spruce log imitation), laminate floors, stretch ceiling (colour of your choice), tiled bathroom, indoor and outdoor lighting, electrics, underfloor heating, panels, MVHR, plumbing, heated drainage, roof drainage. Optional fireplace stove.",
        price: "$25,596",
      },
      {
        title: "Premium",
        description:
          "Fully finished home with premium interior: drywall walls painted in colours you choose, premium windows and doors, underfloor heating throughout, panels, electrics, MVHR, plumbing, heated drainage, roof drainage. Optional fireplace stove.",
        price: "$27,351",
      },
    ],
  },
} as const;

const ADVANTAGES_COPY = {
  uk: [
    {
      title: "Встановлення на будь-якій місцевості",
      desc: "Будинок можна встановлювати, як на дачних так і на присадибних ділянках (гори, схили)",
    },
    {
      title: "Індивідуальне планування",
      desc: "Розробка індивідуального планування за бажанням замовника, згідно обраного розміру будинку",
    },
    {
      title: "Ціна",
      desc: "При однакових характеристиках, зовнішньому та внутрішньому оздоблені - модульний будинок в 2,5 рази дешевшій, ніж будинок з цегли чи газоблоку",
    },
    {
      title: "Максимальна якість",
      desc: "Так, як будинок збирається на виробництві - це дає змогу контролювати процес збирання будинку на кожному етапі та дозволяє отримати максимальну якість за короткий термін",
    },
  ],
  en: [
    {
      title: "Installation on any site",
      desc: "The house can be placed on dacha plots and homesteads alike, including hills and slopes.",
    },
    {
      title: "Custom layout",
      desc: "Individual layout design on request, matched to the home size you choose.",
    },
    {
      title: "Price",
      desc: "With comparable specs and interior and exterior finishes, a modular home costs about 2.5× less than brick or aerated concrete.",
    },
    {
      title: "Maximum quality",
      desc: "Because the house is assembled in the factory, we can control every assembly step and deliver top quality in a short time.",
    },
  ],
} as const;

export function Mb75PageClient({ house }: Props) {
  const { locale, tr } = useLocale();
  const displayName = locale === "en" ? house.nameEn ?? house.name : house.name;
  const [activeImg, setActiveImg] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const galleryTouchRef = useRef<{ x: number; y: number } | null>(null);
  const lightboxTouchRef = useRef<{ x: number; y: number } | null>(null);
  const suppressGalleryLightboxTapRef = useRef(false);

  const copy = PACKAGE_COPY[locale === "en" ? "en" : "uk"];
  const advantages = ADVANTAGES_COPY[locale === "en" ? "en" : "uk"];
  const descriptionParagraphs =
    locale === "en"
      ? (house.descriptionEn ?? house.description).split(/\n\n+/).filter(Boolean)
      : house.description.split(/\n\n+/).filter(Boolean);

  const prev = useCallback(
    () => setActiveImg((i) => (i - 1 + house.images.length) % house.images.length),
    [house.images.length],
  );
  const next = useCallback(() => setActiveImg((i) => (i + 1) % house.images.length), [house.images.length]);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const SWIPE_MIN_PX = 50;

  const onGalleryTouchStart = useCallback(
    (e: ReactTouchEvent) => {
      suppressGalleryLightboxTapRef.current = false;
      if (house.images.length < 2) return;
      const t = e.touches[0];
      if (!t) return;
      galleryTouchRef.current = { x: t.clientX, y: t.clientY };
    },
    [house.images.length],
  );

  const onGalleryTouchEnd = useCallback(
    (e: ReactTouchEvent) => {
      if (house.images.length < 2 || !galleryTouchRef.current) {
        galleryTouchRef.current = null;
        return;
      }
      const t = e.changedTouches[0];
      if (!t) {
        galleryTouchRef.current = null;
        return;
      }
      const dx = t.clientX - galleryTouchRef.current.x;
      const dy = t.clientY - galleryTouchRef.current.y;
      galleryTouchRef.current = null;
      if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      suppressGalleryLightboxTapRef.current = true;
      if (dx > 0) prev();
      else next();
    },
    [house.images.length, prev, next],
  );

  const onLightboxTouchStart = useCallback(
    (e: ReactTouchEvent) => {
      if (house.images.length < 2) return;
      const t = e.touches[0];
      if (!t) return;
      lightboxTouchRef.current = { x: t.clientX, y: t.clientY };
    },
    [house.images.length],
  );

  const onLightboxTouchEnd = useCallback(
    (e: ReactTouchEvent) => {
      if (house.images.length < 2 || !lightboxTouchRef.current) {
        lightboxTouchRef.current = null;
        return;
      }
      const t = e.changedTouches[0];
      if (!t) {
        lightboxTouchRef.current = null;
        return;
      }
      const dx = t.clientX - lightboxTouchRef.current.x;
      const dy = t.clientY - lightboxTouchRef.current.y;
      lightboxTouchRef.current = null;
      if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      if (dx > 0) prev();
      else next();
    },
    [house.images.length, prev, next],
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, closeLightbox, prev, next]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxOpen]);

  const specsEntries = Object.entries(locale === "en" ? house.specsEn ?? house.specs : house.specs).filter(
    ([key]) => !/поверх|floor/i.test(key),
  );

  return (
    <>
      <div className="section-padding">
        <div className="container-wide">
        <RevealOnScroll>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-sm text-[#7c7c78]">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <Link href="/" className="transition-colors hover:text-[#77d14d]">
                {tr.housePage.home}
              </Link>
              <span>/</span>
              <Link href="/catalog" className="transition-colors hover:text-[#77d14d]">
                {tr.housePage.catalog}
              </Link>
              <span>/</span>
              <span className="truncate text-[#131311]">{displayName}</span>
            </div>
            <Link
              href="/catalog"
              className="inline-flex shrink-0 items-center gap-1.5 transition-colors hover:text-[#77d14d]"
            >
              <ArrowLeft size={14} />
              {tr.housePage.backToCatalog}
            </Link>
          </div>
        </RevealOnScroll>

        <SectionHeader
          title={displayName}
          subtitle={locale === "en" ? house.styleEn ?? house.style : house.style}
          showTitleMarker
          titleClassName="font-black"
          className="mb-10 md:mb-12"
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div>
            <RevealOnScroll>
              <div
                className="relative mb-3 aspect-[16/10] touch-pan-y overflow-hidden rounded-[6px] bg-[#f2f2f0]"
                onTouchStart={onGalleryTouchStart}
                onTouchEnd={onGalleryTouchEnd}
                onTouchCancel={() => {
                  galleryTouchRef.current = null;
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (suppressGalleryLightboxTapRef.current) {
                      suppressGalleryLightboxTapRef.current = false;
                      return;
                    }
                    setLightboxOpen(true);
                  }}
                  className="group relative block h-full w-full cursor-zoom-in text-left"
                  aria-label={locale === "en" ? "Open fullscreen photo" : "Відкрити фото на весь екран"}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImg}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={house.images[activeImg] ?? house.thumbnail}
                        alt={`${displayName} — ${locale === "en" ? "photo" : "фото"} ${activeImg + 1}`}
                        fill
                        className="object-cover transition duration-300 group-hover:brightness-[0.97]"
                        priority={activeImg === 0}
                        sizes="(max-width: 1024px) 100vw, 65vw"
                      />
                    </motion.div>
                  </AnimatePresence>
                </button>

                {house.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        prev();
                      }}
                      className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white"
                      aria-label={locale === "en" ? "Previous photo" : "Попереднє фото"}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        next();
                      }}
                      className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white"
                      aria-label={locale === "en" ? "Next photo" : "Наступне фото"}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#131311] shadow-sm transition-colors hover:bg-white"
                  aria-label={locale === "en" ? "Fullscreen" : "На весь екран"}
                >
                  <Maximize2 size={16} />
                </button>

                <div className="pointer-events-none absolute bottom-3 right-3 rounded-[3px] bg-black/50 px-2.5 py-1 text-[12px] font-500 text-white backdrop-blur-sm">
                  {activeImg + 1} / {house.images.length}
                </div>
              </div>
            </RevealOnScroll>

            {house.images.length > 1 && (
              <div className="mb-10 flex gap-2">
                {house.images.map((img, i) => (
                  <button
                    key={`${img}-${i}`}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    className={[
                      "relative aspect-[4/3] flex-1 overflow-hidden rounded-[4px] border-2 transition-all",
                      i === activeImg ? "border-[#77d14d]" : "border-transparent opacity-60 hover:opacity-100",
                    ].join(" ")}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="100px" />
                  </button>
                ))}
              </div>
            )}

            <RevealOnScroll>
              <h2
                className="mb-4 text-xl font-500 tracking-tight text-[#131311]"
                style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
              >
                {tr.housePage.descriptionTitle}
              </h2>
              <div className="mb-10 space-y-4 text-[15px] leading-relaxed text-[#555552]">
                {descriptionParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <h2
                className="mb-6 text-xl font-500 tracking-tight text-[#131311]"
                style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
              >
                {tr.housePage.features}
              </h2>
              <ul className="mb-10 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
                {advantages.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#77d14d]"
                      aria-hidden
                    />
                    <div className="min-w-0">
                      <p
                        className="text-[16px] font-600 leading-snug text-[#131311]"
                        style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
                      >
                        {item.title}
                      </p>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-[#555552]">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>

            <RevealOnScroll>
              <h2
                className="mb-4 text-xl font-500 tracking-tight text-[#131311]"
                style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
              >
                {tr.housePage.specs}
              </h2>
              <div className="overflow-hidden rounded-[6px] border border-[#e8e8e5]">
                {specsEntries.map(([key, value], i) => (
                  <div
                    key={key}
                    className={[
                      "flex items-center justify-between px-5 py-3.5 text-[14px]",
                      i % 2 === 0 ? "bg-white" : "bg-[#f9f9f8]",
                    ].join(" ")}
                  >
                    <span className="text-[#7c7c78]">{key}</span>
                    <span className="font-500 text-[#131311]">{value}</span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          <div>
            <div className="sticky top-24">
              <RevealOnScroll direction="right">
                <div
                  className="mb-4 rounded-[6px] border border-[#e8e8e5] bg-white p-7"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
                >
                  {house.tag && (
                    <div className="mb-4 inline-block rounded-[3px] bg-[#f3fbef] px-2.5 py-1 text-[11px] font-600 uppercase tracking-wider text-[#77d14d]">
                      {locale === "en" ? house.tagEn ?? house.tag : house.tag}
                    </div>
                  )}

                  <div className="mb-6">
                    <p className="mb-1 text-[11px] uppercase tracking-widest text-[#a8a8a3]">
                      {house.priceFrom ? tr.common.from : ""}
                    </p>
                    <p
                      className="text-3xl font-300 tracking-tight text-[#131311]"
                      style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
                    >
                      {formatUsd(house.price, locale)}
                    </p>
                    <p className="mt-1 text-[12px] text-[#a8a8a3]">{tr.housePage.included}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="btn-primary btn-text-graphite mb-3 w-full justify-center py-4"
                  >
                    {tr.housePage.getConsultation}
                  </button>
                  <a href="tel:+380800000000" className="btn-outline flex w-full justify-center py-3.5 text-sm">
                    {tr.common.call}
                  </a>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-16 border-t border-[#e8e8e5] bg-[#f2f2f0] py-14 md:mt-20 md:py-20">
        <div className="container-wide">
          <SectionHeader
            title={copy.sectionTitle}
            showTitleMarker
            titleClassName="font-black"
            className="mb-10 md:mb-12"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {copy.items.map((item, idx) => (
              <RevealOnScroll key={item.title} delay={idx * 0.06}>
                <article className="flex h-full flex-col rounded-[6px] border border-[#e8e8e5] bg-white p-6 shadow-[0_4px_22px_rgba(19,19,17,0.05)] md:p-7">
                  <h3
                    className="text-lg font-bold tracking-tight text-[#131311]"
                    style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <div className="my-4 h-px bg-[#e0e0dc]" />
                  <p className="flex-1 text-[14px] leading-relaxed text-[#555552]">{item.description}</p>
                  <div className="my-4 h-px bg-[#e0e0dc]" />
                  <p
                    className="mb-5 text-xl font-300 text-[#131311]"
                    style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
                  >
                    {item.price}
                  </p>
                  <a
                    href="#contacts"
                    className="btn-primary btn-text-graphite mt-auto flex w-full justify-center py-3.5 text-[13px] font-600 uppercase tracking-wide"
                  >
                    {copy.more}
                  </a>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
      </div>

      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={locale === "en" ? "Photo viewer" : "Перегляд фото"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex cursor-default flex-col bg-[#0c0c0b]/55 backdrop-blur-xl backdrop-saturate-150"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute right-4 top-4 z-[200] flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white shadow-[0_4px_24px_rgba(0,0,0,0.25)] backdrop-blur-md transition-colors hover:bg-white/25"
              aria-label={locale === "en" ? "Close" : "Закрити"}
            >
              <X size={22} />
            </button>

            <div className="relative z-[50] flex min-h-0 flex-1 cursor-default items-center justify-center p-4 pt-16">
              <div
                className="relative h-full w-full max-h-[min(85vh,900px)] max-w-[1400px] touch-pan-y"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={onLightboxTouchStart}
                onTouchEnd={onLightboxTouchEnd}
                onTouchCancel={() => {
                  lightboxTouchRef.current = null;
                }}
              >
                <Image
                  src={house.images[activeImg] ?? house.thumbnail}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>

            {house.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-2 top-1/2 z-[200] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-md transition-colors hover:bg-white/25 md:left-6"
                  aria-label={locale === "en" ? "Previous" : "Попереднє"}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-2 top-1/2 z-[200] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-md transition-colors hover:bg-white/25 md:right-6"
                  aria-label={locale === "en" ? "Next" : "Наступне"}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <div className="relative z-[200] pb-6 text-center text-sm font-500 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {activeImg + 1} / {house.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConsultationSection />
    </>
  );
}
