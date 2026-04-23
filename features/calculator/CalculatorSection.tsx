"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";
import { formatUsd } from "@/lib/utils";
import dynamic from "next/dynamic";

const ConsultationModal = dynamic(
  () => import("@/features/forms/ConsultationModal").then((m) => m.ConsultationModal),
);

type Material = "frame" | "gasoblock" | "sip";
type Completion = "comfort" | "premium" | "lux";
type ModelType = "residential" | "commercial" | "sauna";

const MATERIAL_LABELS: Record<Material, string> = {
  frame: "Каркасна",
  gasoblock: "Газобетон",
  sip: "SIP-панелі",
};

// Base $/m² — орієнтир для швидкого розрахунку (окремо від каталожних «від»).
const BASE_PRICE_USD: Record<Material, number> = {
  frame: 720,
  gasoblock: 785,
  sip: 845,
};

const COMPLETION_COEFF: Record<Completion, number> = {
  comfort: 1,
  premium: 1.28,
  lux: 1.62,
};

const MODEL_TYPE_COEFF: Record<ModelType, number> = {
  residential: 1,
  commercial: 1.1,
  sauna: 0.9,
};

const AREA_MIN = 20;
const AREA_MAX = 140;

/** Плавні ховери для кнопок калькулятора (лівий і правий блоки). */
const CALC_BTN_TRANSITION =
  "transition-[background-color,border-color,color,box-shadow,transform] duration-[580ms] ease-in-out";

export function CalculatorSection() {
  const { locale, tr } = useLocale();
  const [area, setArea] = useState(100);
  const [material, setMaterial] = useState<Material>("frame");
  const [completion, setCompletion] = useState<Completion>("comfort");
  const [modelType, setModelType] = useState<ModelType>("residential");
  const [modalOpen, setModalOpen] = useState(false);

  const materialLabels =
    locale === "en"
      ? { frame: "Frame", gasoblock: "Aerated concrete", sip: "SIP panels" }
      : MATERIAL_LABELS;

  const completionLabels: Record<Completion, string> = {
    comfort: tr.sections.calcComfort,
    premium: tr.sections.calcPremium,
    lux: tr.sections.calcLux,
  };

  const modelTypeLabels: Record<ModelType, string> = {
    residential: tr.sections.calcResidential,
    commercial: tr.sections.calcCommercial,
    sauna: tr.sections.calcSauna,
  };

  const estimate = useMemo(() => {
    const raw =
      BASE_PRICE_USD[material] *
      area *
      COMPLETION_COEFF[completion] *
      MODEL_TYPE_COEFF[modelType];
    return Math.round(raw / 500) * 500;
  }, [area, material, completion, modelType]);

  const areaPct = ((area - AREA_MIN) / (AREA_MAX - AREA_MIN)) * 100;

  const TabGroup = <T extends string>({
    label,
    options,
    value,
    labels,
    onChange,
  }: {
    label: string;
    options: T[];
    value: T;
    labels: Record<T, string>;
    onChange: (v: T) => void;
  }) => {
    const active = `bg-[#77d14d] text-white border-[#77d14d] shadow-none hover:bg-[#6bc945] hover:border-[#6bc945]`;
    const idle =
      "bg-white/[0.04] text-white/65 border-white/12 hover:border-[#77d14d]/35 hover:text-white/[0.8] hover:bg-white/[0.08]";

    return (
      <div>
        <label className="mb-3 block text-[11px] font-600 uppercase tracking-[0.16em] text-[#8fdf6a]/90">
          {label}
        </label>
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={[
                "no-outline rounded-[8px] border px-4 py-2.5 text-[13px] font-500 outline-none focus-visible:outline-none focus-visible:ring-0 active:scale-[0.985]",
                CALC_BTN_TRANSITION,
                value === opt ? active : idle,
              ].join(" ")}
            >
              {labels[opt]}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section
      id="calculator"
      className="section-padding relative overflow-hidden bg-[linear-gradient(165deg,#f7f6f3_0%,#ebe8e2_45%,#e4e1da_100%)]"
    >
      <div
        className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full opacity-[0.09]"
        style={{
          background: "radial-gradient(circle, #77d14d 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #77d14d 0%, transparent 70%)",
        }}
      />

      <div className="container-wide relative">
        <SectionHeader
          title={tr.sections.calculator}
          subtitle={tr.sections.calculatorSub}
          titleClassName="font-black"
          showTitleMarker
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-stretch lg:gap-10">
          {/* Controls — вужча колонка на десктопі */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative flex h-full flex-col overflow-hidden rounded-[8px] border border-[#77d14d]/28 bg-[linear-gradient(168deg,#1c1b18_0%,#12110f_48%,#0a0a09_100%)] p-7 shadow-[0_28px_80px_rgba(10,10,9,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] md:p-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(119,209,77,0.14),transparent)]" />

            <div className="relative space-y-9">
              {/* Площа + преміальний повзунок з «крутком» */}
              <div>
                <div className="mb-4 lg:hidden">
                  <p className="text-[11px] font-600 uppercase tracking-[0.18em] text-[#8fdf6a]/90">
                    {locale === "en" ? "Estimated investment" : "Орієнтовна вартість"}
                  </p>
                  <motion.p
                    key={estimate}
                    initial={{ scale: 0.97, opacity: 0.75 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.28 }}
                    className="mt-2 text-3xl font-300 tabular-nums tracking-tight text-white"
                    style={{ fontFamily: "var(--font-display, Montserrat, Inter, sans-serif)" }}
                  >
                    {formatUsd(estimate, locale)}
                  </motion.p>
                  <p className="mt-2.5 text-[11px] leading-snug text-white/45">{tr.sections.calcFromCalculatorNote}</p>
                  <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>

                <div className="mb-4 flex items-baseline justify-between gap-3">
                  <label className="text-[11px] font-600 uppercase tracking-[0.16em] text-[#8fdf6a]/90">
                    {locale === "en" ? "House area" : "Площа будинку"}
                  </label>
                  <span
                    className="text-2xl font-300 tabular-nums tracking-tight text-white"
                    style={{ fontFamily: "var(--font-display, Montserrat, Inter, sans-serif)" }}
                  >
                    {area}
                    <span className="ml-1.5 text-sm font-400 text-white/40">
                      {locale === "en" ? "m²" : "м²"}
                    </span>
                  </span>
                </div>

                <div className="relative py-1">
                  <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/[0.08]" />
                  <div
                    className="pointer-events-none absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#77d14d]"
                    style={{ width: `${areaPct}%` }}
                  />
                  <input
                    type="range"
                    min={AREA_MIN}
                    max={AREA_MAX}
                    step={5}
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="premium-area-range relative z-[1] block w-full"
                    aria-valuemin={AREA_MIN}
                    aria-valuemax={AREA_MAX}
                    aria-valuenow={area}
                    aria-label={locale === "en" ? "House area" : "Площа будинку"}
                  />
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-white/30">
                  <span>
                    {AREA_MIN} {locale === "en" ? "m²" : "м²"}
                  </span>
                  <span>
                    {AREA_MAX} {locale === "en" ? "m²" : "м²"}
                  </span>
                </div>
              </div>

              <TabGroup
                label={tr.sections.calcModelType}
                options={["residential", "commercial", "sauna"] as ModelType[]}
                value={modelType}
                labels={modelTypeLabels}
                onChange={setModelType}
              />

              <TabGroup
                label={locale === "en" ? "Completion package" : "Комплектація"}
                options={["comfort", "premium", "lux"] as Completion[]}
                value={completion}
                labels={completionLabels}
                onChange={setCompletion}
              />

              <TabGroup
                label={locale === "en" ? "Construction technology" : "Технологія будівництва"}
                options={["frame", "gasoblock", "sip"] as Material[]}
                value={material}
                labels={materialLabels}
                onChange={setMaterial}
              />
            </div>
          </motion.div>

          {/* Результат — ширша колонка */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-[8px] border border-white/70 bg-white/75 p-8 shadow-[0_24px_64px_rgba(19,19,17,0.12)] backdrop-blur-xl md:p-10"
          >
            <div className="absolute inset-x-0 top-0 h-[3px] bg-[#77d14d] opacity-90" />

            <p className="text-[11px] font-600 uppercase tracking-[0.18em] text-[#7c7c78]">
              {locale === "en" ? "Estimated investment" : "Орієнтовна вартість"}
            </p>

            <motion.p
              key={estimate}
              initial={{ scale: 0.97, opacity: 0.75 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.28 }}
              className="mt-2 text-4xl font-300 tracking-tight text-[#131311] md:text-[2.65rem]"
              style={{ fontFamily: "var(--font-display, Montserrat, Inter, sans-serif)" }}
            >
              {formatUsd(estimate, locale)}
            </motion.p>

            <p className="mt-2 max-w-md text-[11px] leading-snug text-[#a8a8a3]">{tr.sections.calcFromCalculatorNote}</p>

            <p className="mt-3 max-w-md text-[13px] leading-relaxed text-[#6f6f6a] transition-colors duration-300 ease-out">
              {locale === "en"
                ? "Transparent parameters, premium materials, and a clear path from estimate to keys — we’ll refine every figure on a personal call."
                : "Прозорі параметри, преміальні матеріали та зрозумілий шлях від орієнтиру до ключів — уточнимо кожну цифру на персональній розмові."}
            </p>

            <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-[#e0ddd6] to-transparent transition-opacity duration-300 ease-out" />

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: tr.common.area, value: `${area} ${locale === "en" ? "m²" : "м²"}` },
                { label: tr.sections.calcModelType, value: modelTypeLabels[modelType] },
                { label: tr.common.completion, value: completionLabels[completion] },
                { label: tr.common.technology, value: materialLabels[material] },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col gap-0.5 rounded-[8px] border border-[#eceae6] bg-[#fafaf9]/90 px-4 py-3 transition-[border-color,background-color,box-shadow] duration-300 ease-out hover:border-[#dedcd6] hover:bg-[#fafaf9] hover:shadow-[0_6px_20px_rgba(19,19,17,0.06)]"
                >
                  <span className="text-[10px] font-600 uppercase tracking-[0.12em] text-[#a8a8a3]">{row.label}</span>
                  <span className="text-[14px] font-500 text-[#131311]">{row.value}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 mb-12 text-[12px] leading-relaxed text-[#a8a8a3] transition-colors duration-300 ease-out md:mb-14">
              {locale === "en"
                ? "This is an approximate cost in USD — it may change. For an exact figure, you’re welcome to a free consultation."
                : "Це орієнтовна вартість у доларах — вона може змінитись. Щоб отримати точну суму, ласкаво запрошуємо на безкоштовну консультацію."}
            </p>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className={`btn-primary btn-text-graphite no-outline mt-auto w-full justify-center py-4 text-sm outline-none ${CALC_BTN_TRANSITION} hover:shadow-[0_10px_32px_rgba(36,36,34,0.28)] focus-visible:outline-none focus-visible:ring-0 active:scale-[0.99]`}
            >
              {locale === "en" ? "Get consultation" : "Отримати консультацію"}
            </button>
          </motion.div>
        </div>
      </div>

      {modalOpen && <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />}
    </section>
  );
}
