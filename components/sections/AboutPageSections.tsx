"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEventHandler,
} from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";
import { getAboutIntroParagraphs } from "@/data/aboutIntro";
import { aboutTeam, type TeamMember } from "@/data/aboutTeam";
import { productionSliderImages } from "@/data/aboutProduction";
import { cn } from "@/lib/utils";

function AboutIntroDecor() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `radial-gradient(ellipse 70% 50% at 12% 18%, rgba(119,209,77,0.09) 0%, transparent 55%),
            radial-gradient(circle at 92% 88%, rgba(119,209,77,0.05) 0%, transparent 40%)`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#131311 1px, transparent 1px), linear-gradient(90deg, #131311 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />
    </>
  );
}

function TeamBio({ member, locale }: { member: TeamMember; locale: "uk" | "en" }) {
  const name = locale === "en" ? member.nameEn : member.nameUk;
  const bio = locale === "en" ? member.bioEn : member.bioUk;
  const bullets = locale === "en" ? member.bioBulletsEn : member.bioBulletsUk;
  const footer = locale === "en" ? member.bioFooterEn : member.bioFooterUk;

  if (bullets?.length) {
    return (
      <div className="text-[14px] font-light leading-relaxed text-[#555552] md:text-[15px]">
        <p className="mb-2 italic text-[#6b6b66]">{bio}</p>
        <ul className="mb-2 list-disc space-y-1 pl-4">
          {bullets.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        {footer ? <p>{footer}</p> : null}
      </div>
    );
  }

  return <p className="text-[14px] font-light leading-relaxed text-[#555552] md:text-[15px]">{bio}</p>;
}

type AboutLabels = {
  statExperience: string;
  statExperienceYears: string;
  statHouses: string;
};

function TeamStatsRow({
  labels,
  experience,
  houses,
}: {
  labels: AboutLabels;
  experience: number;
  houses?: number;
}) {
  const labelClass =
    "text-left text-[11px] font-medium uppercase leading-snug tracking-[0.12em] text-[#b0b0aa] md:text-[12px]";
  const valueClass = "text-lg font-light text-[#131311]";
  const expValue = (
    <>
      <span className="tabular-nums">{experience}</span>
      <span className="font-light">&nbsp;{labels.statExperienceYears}</span>
    </>
  );

  if (houses != null) {
    return (
      <div className="grid grid-cols-2 gap-x-4 border-t border-[#efefec] px-6 py-5 md:gap-x-6 md:px-8">
        <div className={labelClass}>{labels.statExperience}</div>
        <div className={labelClass}>{labels.statHouses}</div>
        <div className={valueClass}>{expValue}</div>
        <div className={`${valueClass} tabular-nums`}>{houses}</div>
      </div>
    );
  }

  return (
    <div className="border-t border-[#efefec] px-6 py-5 md:px-8">
      <div className={labelClass}>{labels.statExperience}</div>
      <div className={`${valueClass} mt-1`}>{expValue}</div>
    </div>
  );
}

function TeamCard({ member, locale, labels }: { member: TeamMember; locale: "uk" | "en"; labels: AboutLabels }) {
  const name = locale === "en" ? member.nameEn : member.nameUk;
  const role = locale === "en" ? member.roleEn : member.roleUk;

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden border border-[#e6e6e2] bg-white shadow-[0_10px_40px_rgba(19,19,17,0.1)] transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(19,19,17,0.14)]"
      style={{ borderRadius: "var(--radius-site, 12px)" }}
    >
      <div className="grid flex-1 gap-6 p-6 md:grid-cols-[minmax(0,140px)_1fr] md:gap-8 md:p-8">
        <div
          className="relative mx-auto aspect-square w-full max-w-[200px] shrink-0 overflow-hidden bg-[#f0f0ed] md:mx-0 md:max-w-none"
          style={{ borderRadius: "var(--radius-site, 12px)" }}
        >
          <Image
            src={member.image}
            alt=""
            width={member.imageWidth}
            height={member.imageHeight}
            className="size-full object-cover"
            sizes="(max-width: 768px) 45vw, 200px"
          />
        </div>

        <div className="flex min-w-0 flex-col">
          <h3
            className="text-xl font-semibold tracking-tight text-[#131311] md:text-2xl"
            style={{ fontFamily: "var(--font-display, system-ui, sans-serif)" }}
          >
            {name}
          </h3>
          <p className="mt-1 text-sm text-[#7c7c78] md:text-[15px]">{role}</p>
          <div
            className={cn(
              "mt-4",
              member.bioBulletsUk == null && member.bioBulletsEn == null && "line-clamp-6 md:line-clamp-5",
            )}
          >
            <TeamBio member={member} locale={locale} />
          </div>
        </div>
      </div>

      <TeamStatsRow labels={labels} experience={member.stats.experience} houses={member.stats.houses} />
    </motion.article>
  );
}

const SWIPE_MIN_PX = 50;

function ProductionSlider({ alt }: { alt: string }) {
  const [index, setIndex] = useState(0);
  const n = productionSliderImages.length;
  const dragStartXRef = useRef<number | null>(null);
  const dragEndXRef = useRef<number | null>(null);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + n) % n);
    },
    [n],
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % n);
    }, 6500);
    return () => window.clearInterval(id);
  }, [n]);

  const applySwipeFromRefs = useCallback(() => {
    const startX = dragStartXRef.current;
    const endX = dragEndXRef.current;
    dragStartXRef.current = null;
    dragEndXRef.current = null;
    if (startX === null || endX === null) {
      return;
    }
    const delta = startX - endX;
    if (Math.abs(delta) < SWIPE_MIN_PX) {
      return;
    }
    if (delta > 0) {
      go(1);
    } else {
      go(-1);
    }
  }, [go]);

  const releasePointerSafe = (el: HTMLDivElement, pointerId: number) => {
    try {
      if (el.hasPointerCapture(pointerId)) {
        el.releasePointerCapture(pointerId);
      }
    } catch {
      /* ignore */
    }
  };

  const handlePointerDown: PointerEventHandler<HTMLDivElement> = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) {
      return;
    }
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartXRef.current = e.clientX;
    dragEndXRef.current = null;
  };

  const handlePointerMove: PointerEventHandler<HTMLDivElement> = (e) => {
    if (dragStartXRef.current === null) {
      return;
    }
    dragEndXRef.current = e.clientX;
  };

  const handlePointerUp: PointerEventHandler<HTMLDivElement> = (e) => {
    releasePointerSafe(e.currentTarget, e.pointerId);
    applySwipeFromRefs();
  };

  const handlePointerCancel: PointerEventHandler<HTMLDivElement> = (e) => {
    releasePointerSafe(e.currentTarget, e.pointerId);
    dragStartXRef.current = null;
    dragEndXRef.current = null;
  };

  return (
    <div className="relative">
      <div
        className="relative aspect-[16/10] w-full cursor-grab touch-pan-y overflow-hidden bg-[#e4e4e0] select-none active:cursor-grabbing md:aspect-[21/9]"
        style={{ borderRadius: "var(--radius-site, 12px)" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={productionSliderImages[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="pointer-events-none absolute inset-0"
          >
            <Image
              src={productionSliderImages[index]}
              alt={alt}
              fill
              draggable={false}
              className="pointer-events-none object-cover object-center"
              sizes="(max-width: 768px) 100vw, min(1200px, 92vw)"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" aria-hidden />
      </div>

      <button
        type="button"
        onClick={() => go(-1)}
        className="no-outline absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/90 text-[#131311] shadow-md backdrop-blur-sm transition hover:bg-white md:left-5 md:size-12"
        aria-label="Previous slide"
      >
        <ChevronLeft className="size-5 md:size-6" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        className="no-outline absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/90 text-[#131311] shadow-md backdrop-blur-sm transition hover:bg-white md:right-5 md:size-12"
        aria-label="Next slide"
      >
        <ChevronRight className="size-5 md:size-6" strokeWidth={1.5} />
      </button>

      <div className="mt-4 flex justify-center">
        <div className="flex items-center gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur-sm">
          {productionSliderImages.map((_, i) => (
            <button
              key={String(i)}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "no-outline flex size-11 items-center justify-center rounded-full transition-colors",
                i === index ? "bg-white/10" : "hover:bg-white/10",
              )}
              aria-label={`Slide ${i + 1}`}
            >
              <span
                className={cn(
                  "h-2.5 rounded-full border border-white/70 transition-all duration-300",
                  i === index ? "w-8 bg-white" : "w-2.5 bg-white/30 hover:bg-white/70",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AboutPageSections() {
  const { locale, tr } = useLocale();
  const a = tr.aboutPage;
  const paragraphs = getAboutIntroParagraphs(locale);
  const [lead, ...rest] = paragraphs;
  const sideQuote =
    locale === "en"
      ? "We combine engineering discipline with thoughtful architecture — so your home is built to last and feel right every day."
      : "Поєднуємо інженерну дисципліну з архітектурною увагою до деталей — щоб дім служив роками і відчувався «своїм» щодня.";

  return (
    <>
      <section className="section-padding relative overflow-hidden bg-[#f5f5f3]">
        <AboutIntroDecor />
        <div className="container-wide relative">
          <SectionHeader title={a.title} titleClassName="font-black uppercase tracking-[0.02em]" showTitleMarker className="mb-8 md:mb-10" />

          <div className="mb-10 flex flex-wrap gap-2">
            {[a.chip1, a.chip2, a.chip3].map((label) => (
              <span
                key={label}
                className="rounded-full border border-[#e0e0dc] bg-white/80 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#5a5a56] backdrop-blur-sm"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-14 lg:items-start">
            <div className="relative">
              <div className="pointer-events-none absolute -left-4 top-0 hidden h-full w-px bg-gradient-to-b from-[#77d14d] via-[#77d14d]/40 to-transparent lg:block" aria-hidden />
              <div className="space-y-5 md:space-y-6">
                {lead ? (
                  <p
                    className="text-lg font-light leading-relaxed text-[#131311] md:text-xl"
                    style={{ fontFamily: "var(--font-display, system-ui, sans-serif)" }}
                  >
                    {lead}
                  </p>
                ) : null}
                {rest.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ delay: Math.min(i * 0.04, 0.24), duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[15px] font-light leading-[1.75] text-[#555552] md:text-[16px]"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>
            </div>

            <aside className="relative lg:sticky lg:top-[calc(88px+1.5rem)]">
              <div
                className="relative overflow-hidden border border-[#e6e6e2] bg-white p-8 shadow-[0_20px_60px_rgba(19,19,17,0.06)] md:p-10"
                style={{ borderRadius: "var(--radius-site, 12px)" }}
              >
                <Quote className="absolute right-6 top-6 size-16 text-[#77d14d]/[0.12]" strokeWidth={1} aria-hidden />
                <div className="absolute left-0 top-0 h-full w-1 bg-[#77d14d]" aria-hidden />
                <p className="pl-5 text-[15px] font-light leading-relaxed text-[#3a3a38] md:text-base">{sideQuote}</p>
                <div className="mt-8 flex gap-10 border-t border-[#efefec] pt-8 pl-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8e8e88]">200+</p>
                    <p className="mt-1 text-sm text-[#555552]">{locale === "en" ? "projects" : "проєктів"}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8e8e88]">10+</p>
                    <p className="mt-1 text-sm text-[#555552]">{locale === "en" ? "years" : "років"}</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-wide">
          <SectionHeader title={a.teamTitle} titleClassName="font-black uppercase tracking-[0.02em]" showTitleMarker className="mb-10 md:mb-14" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            {aboutTeam.map((member) => (
              <TeamCard key={member.id} member={member} locale={locale} labels={a} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#f5f5f3]">
        <div className="container-wide">
          <SectionHeader
            title={a.productionTitle}
            subtitle={a.productionSub}
            titleClassName="font-black uppercase tracking-[0.02em]"
            showTitleMarker
            className="mb-8 md:mb-12"
          />
          <ProductionSlider alt={a.productionTitle} />
        </div>
      </section>
    </>
  );
}
