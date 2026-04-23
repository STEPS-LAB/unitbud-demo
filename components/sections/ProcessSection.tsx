"use client";

import { processSteps } from "@/data/process";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { useLocale } from "@/hooks/useLocale";
import type { Locale, Translations } from "@/hooks/useLocale";
import type { ProcessStep } from "@/types";
import { MessageCircle, FileText, Wrench, Hammer, Truck, type LucideIcon } from "lucide-react";

const RAIL_W = 52;
const LINE_LEFT = RAIL_W / 2 - 1;

const iconMap = {
  MessageCircle,
  FileText,
  Hammer,
  Truck,
  Wrench,
} satisfies Record<string, LucideIcon>;

function ProcessDesktopRow({
  step,
  index,
  locale,
  tr,
}: {
  step: ProcessStep;
  index: number;
  locale: Locale;
  tr: Translations;
}) {
  const Icon = iconMap[step.icon as keyof typeof iconMap];
  const isEven = index % 2 === 0;

  const title = locale === "en" ? step.titleEn ?? step.title : step.title;
  const description = locale === "en" ? step.descriptionEn ?? step.description : step.description;
  const duration = locale === "en" ? step.durationEn ?? step.duration : step.duration;

  function renderCard() {
    return (
      <article
        className="group rounded-2xl border border-[#e6eee2] bg-white px-8 py-7 shadow-[0_10px_30px_rgba(19,19,17,0.08)] transition-shadow duration-300 md:hover:shadow-[0_20px_50px_rgba(19,19,17,0.14)] md:hover:-translate-y-[6px] md:transition-transform md:duration-300 md:ease-[0.22,1,0.36,1]"
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <span className="inline-flex items-center rounded-lg border border-[#d8e9d1] bg-[#f7fcf4] px-3 py-1.5 text-[12px] font-800 text-[#3f6f2b] shadow-[0_6px_16px_rgba(119,209,77,0.14)]">
            {tr.common.step} {step.id}
          </span>
          <span className="text-[12px] font-600 text-[#6a6a66]">{duration}</span>
        </div>
        <h3 className="mb-3 text-[30px] leading-[1.08] font-800 tracking-[0.02em] text-[#131311]">{title}</h3>
        <p className="text-[17px] leading-relaxed text-[#3a3a38]">{description}</p>
      </article>
    );
  }

  return (
    <Reveal
      y={28}
      delay={index * 0.08}
      duration={0.65}
      rootMargin="-80px 0px"
      className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-8"
    >
      <div className={isEven ? "block min-w-0" : "invisible pointer-events-none min-w-0"}>{renderCard()}</div>

      <div className="relative z-10 flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-[#77d14d] bg-white shadow-[0_12px_28px_rgba(119,209,77,0.35)]">
        <Icon size={42} className="text-[#62b23f]" strokeWidth={1.9} />
      </div>

      <div className={!isEven ? "block min-w-0" : "invisible pointer-events-none min-w-0"}>{renderCard()}</div>
    </Reveal>
  );
}

function ProcessMobileRow({
  step,
  index,
  locale,
  tr,
  isLast,
}: {
  step: ProcessStep;
  index: number;
  locale: Locale;
  tr: Translations;
  isLast: boolean;
}) {
  const Icon = iconMap[step.icon as keyof typeof iconMap];
  const title = locale === "en" ? step.titleEn ?? step.title : step.title;
  const description = locale === "en" ? step.descriptionEn ?? step.description : step.description;
  const duration = locale === "en" ? step.durationEn ?? step.duration : step.duration;

  return (
    <Reveal
      y={16}
      delay={index * 0.07}
      duration={0.5}
      rootMargin="-20px 0px"
      className={`relative flex gap-3 ${isLast ? "" : "pb-8"}`}
    >
      <div
        className="relative z-10 flex shrink-0 justify-center pt-0.5"
        style={{ width: RAIL_W }}
      >
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl border-[3px] border-[#77d14d] bg-white shadow-[0_8px_20px_rgba(119,209,77,0.28)]">
          <Icon size={26} className="text-[#62b23f]" strokeWidth={1.9} />
        </div>
      </div>

      <article
        className="min-w-0 flex-1 rounded-2xl border border-[#e6eee2] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(19,19,17,0.07)] transition-transform duration-200 md:hover:-translate-y-[2px]"
      >
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-lg border border-[#d8e9d1] bg-[#f7fcf4] px-2.5 py-1 text-[11px] font-800 text-[#3f6f2b]">
            {tr.common.step} {step.id}
          </span>
          <span className="text-[11px] font-600 text-[#6a6a66]">{duration}</span>
        </div>
        <h3 className="mb-2 text-[20px] font-800 leading-snug tracking-[0.04em] text-[#131311]">{title}</h3>
        <p className="text-[14px] leading-relaxed text-[#3a3a38] break-words">{description}</p>
      </article>
    </Reveal>
  );
}

export function ProcessSection() {
  const { locale, tr } = useLocale();

  return (
    <section
      id="process"
      data-lazy-paint="true"
      className="section-padding bg-gradient-to-b from-[#ffffff] via-[#f9fbf8] to-[#ffffff]"
    >
      <div className="container-wide">
        <SectionHeader
          title={tr.sections.process}
          subtitle={tr.sections.processSub}
          titleClassName="font-black"
          showTitleMarker
        />

        <div className="hidden md:block relative mt-16">
          <div className="pointer-events-none absolute left-1/2 top-3 bottom-3 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#d9f0cf] via-[#77d14d] to-[#d9f0cf]" />

          <div className="space-y-10">
            {processSteps.map((step, i) => (
              <ProcessDesktopRow key={step.id} step={step} index={i} locale={locale} tr={tr} />
            ))}
          </div>
        </div>

        <div className="md:hidden relative mt-10">
          <div
            className="pointer-events-none absolute top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#d9f0cf] via-[#77d14d] to-[#d9f0cf]"
            style={{ left: LINE_LEFT }}
            aria-hidden
          />

          <div>
            {processSteps.map((step, i) => (
              <ProcessMobileRow
                key={step.id}
                step={step}
                index={i}
                locale={locale}
                tr={tr}
                isLast={i === processSteps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
