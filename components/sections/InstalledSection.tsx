"use client";

import { useRef, useState, useCallback, type UIEventHandler, type MouseEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { installedHouses } from "@/data/houses";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";

export function InstalledSection() {
  const { locale, tr } = useLocale();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const [cardImageIndex, setCardImageIndex] = useState<Record<string, number>>({});

  const changeCardImage = useCallback(
    (e: MouseEvent, houseId: string, direction: "prev" | "next", totalImages: number) => {
      e.preventDefault();
      e.stopPropagation();
      setCardImageIndex((prev) => {
        const current = prev[houseId] ?? 0;
        const next =
          direction === "next"
            ? (current + 1) % totalImages
            : (current - 1 + totalImages) % totalImages;
        return { ...prev, [houseId]: next };
      });
    },
    [],
  );

  const getCompletionLabel = (category: string) => {
    if (category === "premium" || category === "elite") {
      return locale === "en" ? "Premium" : "Преміум";
    }

    return locale === "en" ? "Comfort" : "Комфорт";
  };

  const getSliderMetrics = (slider: HTMLDivElement, firstCard: HTMLElement) => {
    const cardWidth = firstCard.offsetWidth;
    const gap = 24; // tailwind gap-6
    const centerOffset = Math.max(0, (slider.clientWidth - cardWidth) / 2);
    return { cardWidth, gap, centerOffset };
  };

  const scrollByCard = (direction: "prev" | "next") => {
    const slider = sliderRef.current;
    if (!slider) {
      return;
    }

    const firstCard = slider.querySelector<HTMLElement>("[data-installed-card]");
    if (!firstCard) {
      return;
    }

    const { cardWidth, gap } = getSliderMetrics(slider, firstCard);
    const scrollValue = cardWidth + gap;
    slider.scrollBy({
      left: direction === "next" ? scrollValue : -scrollValue,
      behavior: "smooth",
    });
  };

  const scrollToCard = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) {
      return;
    }

    const firstCard = slider.querySelector<HTMLElement>("[data-installed-card]");
    if (!firstCard) {
      return;
    }

    const { cardWidth, gap, centerOffset } = getSliderMetrics(slider, firstCard);
    slider.scrollTo({
      left: Math.max(0, index * (cardWidth + gap) - centerOffset),
      behavior: "smooth",
    });
  };

  const handleSliderScroll: UIEventHandler<HTMLDivElement> = (event) => {
    const slider = event.currentTarget;
    const firstCard = slider.querySelector<HTMLElement>("[data-installed-card]");
    if (!firstCard) {
      return;
    }

    const { cardWidth, gap, centerOffset } = getSliderMetrics(slider, firstCard);
    const rawIndex = Math.round((slider.scrollLeft + centerOffset) / (cardWidth + gap));
    const nextActiveCard = Math.max(0, Math.min(installedHouses.length - 1, rawIndex));
    setActiveCard(nextActiveCard);
  };

  return (
    <section id="installed" className="section-padding bg-[#f2f2f0]">
      <div className="container-wide">
        <SectionHeader
          title={tr.sections.installed}
          titleClassName="font-black"
          showTitleMarker
        />

        <div className="relative mx-auto w-full max-w-none">
          <div className="-mx-5 -mt-3 -mb-12 md:hidden">
            <div
              ref={sliderRef}
              onScroll={handleSliderScroll}
              className="flex gap-6 overflow-x-auto px-5 pt-3 pb-12 scroll-pl-5 md:px-12 md:pt-6 md:pb-14 md:scroll-pl-12 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
          {installedHouses.map((house, i) => (
            <motion.div
              key={house.id}
              data-installed-card
              className="w-full shrink-0 snap-start"
            >
              <Link
                href={`/house/${house.slug}`}
                className="group flex h-full flex-col rounded-[16px] border border-[#dfdfda] bg-[#ffffff] p-4 shadow-[0_16px_42px_rgba(19,19,17,0.09)] transition hover:shadow-[0_20px_48px_rgba(19,19,17,0.13)] md:hover:-translate-y-[1%] md:hover:shadow-[0_20px_48px_rgba(19,19,17,0.13)] md:will-change-transform md:transition-transform md:duration-500 md:ease-[0.22,1,0.36,1]"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[10px]">
                  {(() => {
                    const images = house.images.length > 0 ? house.images : [house.thumbnail];
                    const currentIdx = cardImageIndex[house.id] ?? 0;
                    const hasMultiple = images.length > 1;
                    return (
                      <>
                        <AnimatePresence mode="sync" initial={false}>
                          <motion.div
                            key={`${house.id}-${currentIdx}`}
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={images[currentIdx]}
                              alt={`${house.name} — ${currentIdx + 1}/${images.length}`}
                              className="h-full w-full object-cover"
                              loading="eager"
                              fetchPriority={i < 3 ? "high" : "auto"}
                            />
                          </motion.div>
                        </AnimatePresence>

                        {hasMultiple && (
                          <>
                            <button
                              type="button"
                              onClick={(e) => changeCardImage(e, house.id, "prev", images.length)}
                              className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#131311] shadow-md backdrop-blur-sm transition hover:bg-white"
                              aria-label={locale === "en" ? "Previous photo" : "Попереднє фото"}
                            >
                              <ChevronLeft size={18} />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => changeCardImage(e, house.id, "next", images.length)}
                              className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#131311] shadow-md backdrop-blur-sm transition hover:bg-white"
                              aria-label={locale === "en" ? "Next photo" : "Наступне фото"}
                            >
                              <ChevronRight size={18} />
                            </button>
                            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                              {images.map((_, idx) => (
                                <span
                                  key={idx}
                                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                                    idx === currentIdx ? "w-4 bg-white" : "w-1.5 bg-white/50"
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    );
                  })()}
                </div>

                <div className="mt-6 flex flex-1 flex-col">
                  <h3
                    className="min-h-16 text-[25px] leading-[1.2] font-500 text-[#131311] tracking-tight"
                    style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
                  >
                    {house.name}
                  </h3>

                  <div
                    className="mt-5 border-t border-[#e9e9e4] text-[15px] text-[#62625d]"
                    style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
                  >
                    <div className="flex items-center justify-between py-4 border-b border-[#ededea]">
                      <span>{locale === "en" ? "Area" : "Площа"}</span>
                      <span className="font-500 text-[#44443f]">{house.area} м²</span>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-[#ededea]">
                      <span>{locale === "en" ? "Completion" : "Комплектація"}</span>
                      <span className="font-500 text-[#44443f]">{getCompletionLabel(house.category)}</span>
                    </div>
                    <div className="flex min-h-[72px] items-center justify-between py-4">
                      <span>{locale === "en" ? "Location" : "Розташування"}</span>
                      <span className="font-500 text-[#44443f] text-right">
                        {locale === "en" ? house.locationEn ?? house.location : house.location}
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto pt-7">
                    <span
                      className="inline-flex w-full items-center justify-center rounded-[8px] bg-[#131311] px-4 py-2 text-sm font-semibold uppercase tracking-[0.04em] text-white shadow-[0_10px_24px_rgba(19,19,17,0.28)] transition hover:bg-[#2a2a28] transition-transform group-active:scale-[0.98]"
                      style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
                    >
                      {locale === "en" ? "View" : "Переглянути"}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
            </div>
          </div>

          <div className="mx-auto mt-6 flex w-fit items-center justify-center gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur-sm md:hidden">
            {installedHouses.map((house, index) => (
              <button
                key={`installed-dot-${house.id}`}
                type="button"
                onClick={() => scrollToCard(index)}
                aria-label={locale === "en" ? `Go to card ${index + 1}` : `Перейти до картки ${index + 1}`}
                className={`h-2.5 rounded-full border border-white/70 transition-all duration-300 ${
                  activeCard === index ? "w-8 bg-white" : "w-2.5 bg-white/30 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 md:gap-6 md:pt-6">
            {installedHouses.map((house, i) => (
              <motion.div key={`installed-grid-${house.id}`} className="w-full">
                <Link
                  href={`/house/${house.slug}`}
                  className="group flex h-full flex-col rounded-[16px] border border-[#dfdfda] bg-[#ffffff] p-5 shadow-[0_16px_42px_rgba(19,19,17,0.09)] transition hover:shadow-[0_20px_48px_rgba(19,19,17,0.13)] md:hover:-translate-y-[1%] md:will-change-transform md:transition-transform md:duration-500 md:ease-[0.22,1,0.36,1]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[10px]">
                    {(() => {
                      const images = house.images.length > 0 ? house.images : [house.thumbnail];
                      const currentIdx = cardImageIndex[house.id] ?? 0;
                      const hasMultiple = images.length > 1;
                      return (
                        <>
                          <AnimatePresence mode="sync" initial={false}>
                            <motion.div
                              key={`${house.id}-grid-${currentIdx}`}
                              className="absolute inset-0"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.35, ease: "easeInOut" }}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={images[currentIdx]}
                                alt={`${house.name} — ${currentIdx + 1}/${images.length}`}
                                className="h-full w-full object-cover"
                                loading="eager"
                                fetchPriority={i < 3 ? "high" : "auto"}
                              />
                            </motion.div>
                          </AnimatePresence>

                          {hasMultiple && (
                            <>
                              <button
                                type="button"
                                onClick={(e) => changeCardImage(e, house.id, "prev", images.length)}
                                className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#131311] shadow-md backdrop-blur-sm transition hover:bg-white"
                                aria-label={locale === "en" ? "Previous photo" : "Попереднє фото"}
                              >
                                <ChevronLeft size={18} />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => changeCardImage(e, house.id, "next", images.length)}
                                className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#131311] shadow-md backdrop-blur-sm transition hover:bg-white"
                                aria-label={locale === "en" ? "Next photo" : "Наступне фото"}
                              >
                                <ChevronRight size={18} />
                              </button>
                              <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                                {images.map((_, idx) => (
                                  <span
                                    key={idx}
                                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                                      idx === currentIdx ? "w-4 bg-white" : "w-1.5 bg-white/50"
                                    }`}
                                  />
                                ))}
                              </div>
                            </>
                          )}
                        </>
                      );
                    })()}
                  </div>

                  <div className="mt-6 flex flex-1 flex-col">
                    <h3
                      className="min-h-16 text-[25px] leading-[1.2] font-500 text-[#131311] tracking-tight"
                      style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
                    >
                      {house.name}
                    </h3>

                    <div
                      className="mt-5 border-t border-[#e9e9e4] text-[15px] text-[#62625d]"
                      style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
                    >
                      <div className="flex items-center justify-between py-4 border-b border-[#ededea]">
                        <span>{locale === "en" ? "Area" : "Площа"}</span>
                        <span className="font-500 text-[#44443f]">{house.area} м²</span>
                      </div>
                      <div className="flex items-center justify-between py-4 border-b border-[#ededea]">
                        <span>{locale === "en" ? "Completion" : "Комплектація"}</span>
                        <span className="font-500 text-[#44443f]">{getCompletionLabel(house.category)}</span>
                      </div>
                      <div className="flex min-h-[72px] items-center justify-between py-4">
                        <span>{locale === "en" ? "Location" : "Розташування"}</span>
                        <span className="font-500 text-[#44443f] text-right">
                          {locale === "en" ? house.locationEn ?? house.location : house.location}
                        </span>
                      </div>
                    </div>

                    <div className="mt-auto pt-7">
                      <span
                        className="inline-flex w-full items-center justify-center rounded-[8px] bg-[#131311] px-4 py-2 text-sm font-semibold uppercase tracking-[0.04em] text-white shadow-[0_10px_24px_rgba(19,19,17,0.28)] transition hover:bg-[#2a2a28] transition-transform group-active:scale-[0.98]"
                        style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
                      >
                        {locale === "en" ? "View" : "Переглянути"}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/catalog"
            className="cta-press no-outline group inline-flex items-center gap-2 rounded-[8px] border-none bg-[#77d14d] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(119,209,77,0.35)] transition hover:bg-[#62b23f] hover:shadow-[0_12px_28px_rgba(98,178,63,0.4)]"
          >
            <span>{tr.common.allProjects}</span>
            <ArrowRight size={16} className="transition-transform md:group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
