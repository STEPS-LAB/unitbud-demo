"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";
import { formatPrice } from "@/lib/utils";
import { ConsultationModal } from "@/features/forms/ConsultationModal";

type Material = "frame" | "gasoblock" | "sip";
type Completion = "base" | "standard" | "premium";

const MATERIAL_LABELS: Record<Material, string> = {
  frame: "Каркасна",
  gasoblock: "Газобетон",
  sip: "SIP-панелі",
};
const COMPLETION_LABELS: Record<Completion, string> = {
  base: "Базова",
  standard: "Стандарт",
  premium: "Преміум",
};

// Price per m² base (UAH)
const BASE_PRICE: Record<Material, number> = {
  frame: 13500,
  gasoblock: 14800,
  sip: 15200,
};
const COMPLETION_COEFF: Record<Completion, number> = {
  base: 1,
  standard: 1.25,
  premium: 1.55,
};
const FLOOR_COEFF: Record<number, number> = {
  1: 1,
  2: 1.12,
  3: 1.22,
};

export function CalculatorSection() {
  const { tr } = useLocale();
  const [area, setArea] = useState(100);
  const [floors, setFloors] = useState(1);
  const [material, setMaterial] = useState<Material>("frame");
  const [completion, setCompletion] = useState<Completion>("standard");
  const [modalOpen, setModalOpen] = useState(false);

  const estimate = useMemo(() => {
    const base = BASE_PRICE[material] * area;
    const withFloors = base * (FLOOR_COEFF[floors] ?? 1);
    const withCompletion = withFloors * COMPLETION_COEFF[completion];
    return Math.round(withCompletion / 1000) * 1000;
  }, [area, floors, material, completion]);

  const SliderRow = ({
    label,
    value,
    min,
    max,
    step,
    unit,
    onChange,
  }: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit: string;
    onChange: (v: number) => void;
  }) => (
    <div>
      <div className="flex justify-between items-baseline mb-3">
        <label className="text-sm font-500 text-[#3a3a38]">{label}</label>
        <span className="text-lg font-300 text-[#131311]" style={{ fontFamily: "Montserrat, Inter, sans-serif" }}>
          {value} <span className="text-sm text-[#a8a8a3]">{unit}</span>
        </span>
      </div>
      <div className="relative h-1.5 bg-[#e8e8e5] rounded-full">
        <div
          className="absolute h-1.5 bg-[#728c4a] rounded-full"
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-1.5"
          style={{ zIndex: 2 }}
        />
      </div>
      <div className="flex justify-between mt-1.5 text-[11px] text-[#a8a8a3]">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  );

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
  }) => (
    <div>
      <label className="text-sm font-500 text-[#3a3a38] block mb-3">{label}</label>
      <div className="flex gap-2 flex-wrap">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={[
              "px-4 py-2 text-[13px] font-500 rounded-[4px] border transition-all duration-200",
              value === opt
                ? "bg-[#728c4a] border-[#728c4a] text-white"
                : "bg-white border-[#e8e8e5] text-[#555552] hover:border-[#728c4a] hover:text-[#728c4a]",
            ].join(" ")}
          >
            {labels[opt]}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section id="calculator" className="section-padding bg-[#f9f9f8]">
      <div className="container-wide">
        <SectionHeader
          label="Калькулятор"
          title={tr.sections.calculator}
          subtitle={tr.sections.calculatorSub}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-[#e8e8e5] rounded-[6px] p-7 space-y-8"
          >
            <SliderRow
              label="Площа будинку"
              value={area}
              min={50}
              max={300}
              step={5}
              unit="м²"
              onChange={setArea}
            />

            <div>
              <div className="flex justify-between items-baseline mb-3">
                <label className="text-sm font-500 text-[#3a3a38]">Кількість поверхів</label>
                <span className="text-lg font-300 text-[#131311]" style={{ fontFamily: "Montserrat, Inter, sans-serif" }}>
                  {floors}
                </span>
              </div>
              <div className="flex gap-3">
                {[1, 2, 3].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFloors(f)}
                    className={[
                      "flex-1 py-3 text-sm font-500 rounded-[4px] border transition-all duration-200",
                      floors === f
                        ? "bg-[#728c4a] border-[#728c4a] text-white"
                        : "bg-white border-[#e8e8e5] text-[#555552] hover:border-[#728c4a]",
                    ].join(" ")}
                  >
                    {f} {f === 1 ? "поверх" : "поверхи"}
                  </button>
                ))}
              </div>
            </div>

            <TabGroup
              label="Технологія будівництва"
              options={["frame", "gasoblock", "sip"] as Material[]}
              value={material}
              labels={MATERIAL_LABELS}
              onChange={setMaterial}
            />

            <TabGroup
              label="Комплектація"
              options={["base", "standard", "premium"] as Completion[]}
              value={completion}
              labels={COMPLETION_LABELS}
              onChange={setCompletion}
            />
          </motion.div>

          {/* Result */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:w-80 bg-[#131311] rounded-[6px] p-7 text-white sticky top-24"
          >
            <p className="text-[11px] font-600 uppercase tracking-[0.14em] text-white/45 mb-2">
              Орієнтовна вартість
            </p>
            <motion.p
              key={estimate}
              initial={{ scale: 0.96, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-300 text-white tracking-tight mb-1"
              style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
            >
              {formatPrice(estimate)}
            </motion.p>
            <p className="text-[12px] text-white/35 mb-7">
              * Орієнтовний розрахунок. Точна вартість після консультації.
            </p>

            <div className="space-y-2.5 mb-7">
              {[
                { label: "Площа", value: `${area} м²` },
                { label: "Поверхів", value: floors },
                { label: "Технологія", value: MATERIAL_LABELS[material] },
                { label: "Комплектація", value: COMPLETION_LABELS[completion] },
              ].map((row) => (
                <div key={row.label} className="flex justify-between text-[13px]">
                  <span className="text-white/45">{row.label}</span>
                  <span className="text-white/80">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="h-px bg-white/10 mb-7" />

            <button
              onClick={() => setModalOpen(true)}
              className="w-full bg-[#728c4a] hover:bg-[#44552b] text-white text-sm font-500 py-3.5 rounded-[4px] transition-colors duration-200"
            >
              Отримати точний розрахунок
            </button>
          </motion.div>
        </div>
      </div>

      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
