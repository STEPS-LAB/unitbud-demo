"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/data/process";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";
import { MessageCircle, FileText, Wrench, Hammer, Truck } from "lucide-react";

const iconMap = {
  MessageCircle,
  FileText,
  Hammer,
  Truck,
  Wrench,
};

export function ProcessSection() {
  const { locale, tr } = useLocale();

  return (
    <section
      id="process"
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
            {processSteps.map((step, i) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap];
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-8"
                >
                  <div className={isEven ? "block" : "invisible"}>
                    <motion.article
                      whileHover={{ y: -6, scale: 1.01 }}
                      transition={{ duration: 0.25 }}
                      className="group rounded-2xl border border-[#e6eee2] bg-white px-8 py-7 shadow-[0_10px_30px_rgba(19,19,17,0.08)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(19,19,17,0.14)]"
                    >
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <span className="inline-flex items-center gap-2 rounded-lg border border-[#d8e9d1] bg-[#f7fcf4] px-3 py-1.5 text-[12px] font-800 text-[#3f6f2b] shadow-[0_6px_16px_rgba(119,209,77,0.14)]">
                          {tr.common.step} {step.id}
                        </span>
                        <span className="text-[12px] font-600 text-[#6a6a66]">
                          {locale === "en" ? step.durationEn ?? step.duration : step.duration}
                        </span>
                      </div>
                      <h3 className="mb-3 text-[30px] leading-[1.08] font-800 tracking-[0.02em] text-[#131311]">
                        {locale === "en" ? step.titleEn ?? step.title : step.title}
                      </h3>
                      <p className="text-[17px] leading-relaxed text-[#3a3a38]">
                        {locale === "en" ? step.descriptionEn ?? step.description : step.description}
                      </p>
                    </motion.article>
                  </div>

                  <motion.div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-[#77d14d] bg-white shadow-[0_12px_28px_rgba(119,209,77,0.35)]">
                    <Icon size={42} className="text-[#62b23f]" strokeWidth={1.9} />
                  </motion.div>

                  <div className={!isEven ? "block" : "invisible"}>
                    <motion.article
                      whileHover={{ y: -6, scale: 1.01 }}
                      transition={{ duration: 0.25 }}
                      className="group rounded-2xl border border-[#e6eee2] bg-white px-8 py-7 shadow-[0_10px_30px_rgba(19,19,17,0.08)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(19,19,17,0.14)]"
                    >
                      <div className="mb-4 flex items-center justify-between gap-4">
                        <span className="inline-flex items-center gap-2 rounded-lg border border-[#d8e9d1] bg-[#f7fcf4] px-3 py-1.5 text-[12px] font-800 text-[#3f6f2b] shadow-[0_6px_16px_rgba(119,209,77,0.14)]">
                          {tr.common.step} {step.id}
                        </span>
                        <span className="text-[12px] font-600 text-[#6a6a66]">
                          {locale === "en" ? step.durationEn ?? step.duration : step.duration}
                        </span>
                      </div>
                      <h3 className="mb-3 text-[30px] leading-[1.08] font-800 tracking-[0.02em] text-[#131311]">
                        {locale === "en" ? step.titleEn ?? step.title : step.title}
                      </h3>
                      <p className="text-[17px] leading-relaxed text-[#3a3a38]">
                        {locale === "en" ? step.descriptionEn ?? step.description : step.description}
                      </p>
                    </motion.article>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="md:hidden mt-10 space-y-4">
          {processSteps.map((step, i) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                whileHover={{ y: -3 }}
                className="relative overflow-hidden rounded-2xl border border-[#deecda] bg-white p-5 shadow-[0_8px_24px_rgba(19,19,17,0.08)]"
              >
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#77d14d] via-[#9be07d] to-[#77d14d]" />
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-[#77d14d] bg-[#f5fbf2] shadow-[0_8px_18px_rgba(119,209,77,0.28)]">
                    <Icon size={28} className="text-[#62b23f]" strokeWidth={1.9} />
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-lg border border-[#d8e9d1] bg-[#f7fcf4] px-3 py-1.5 text-[11px] font-800 text-[#3f6f2b] shadow-[0_6px_14px_rgba(119,209,77,0.12)]">
                    {tr.common.step} {step.id}
                  </span>
                </div>
                <h3 className="mb-2 text-[23px] font-800 leading-tight tracking-[0.02em] text-[#131311]">
                  {locale === "en" ? step.titleEn ?? step.title : step.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[#3a3a38]">
                  {locale === "en" ? step.descriptionEn ?? step.description : step.description}
                </p>
                <p className="mt-4 text-[12px] font-600 text-[#6a6a66]">
                  {locale === "en" ? step.durationEn ?? step.duration : step.duration}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
