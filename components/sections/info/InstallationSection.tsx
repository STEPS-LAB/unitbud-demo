"use client";

import { motion } from "framer-motion";
import { ClipboardList, Link2, Plug, Sparkles, Truck } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";
import { getInfoContent } from "@/data/info/content";
import { INFO_CARD_HOVER_LIGHT } from "@/lib/infoCardHover";
import { cn } from "@/lib/utils";
import { InfoSectionDecor } from "./InfoSectionDecor";

const RAIL_W = 52;
const LINE_LEFT = RAIL_W / 2 - 1;

const assemblyIcons = [ClipboardList, Truck, Link2, Plug, Sparkles] as const;

export function InstallationSection() {
  const { locale } = useLocale();
  const c = getInfoContent(locale).installation;

  return (
    <section id="installation" className="section-padding relative scroll-mt-[156px] overflow-hidden bg-[#f5f5f3]">
      <InfoSectionDecor />
      <div className="container-wide relative">
        <SectionHeader
          title={c.foundationTitle}
          subtitle={c.foundationIntro}
          titleClassName="font-black uppercase tracking-[0.02em]"
          showTitleMarker
          className="mb-10 md:mb-12"
        />

        <div className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.foundationItems.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative overflow-hidden border border-[#e6e6e2] bg-white p-6",
                INFO_CARD_HOVER_LIGHT,
              )}
              style={{ borderRadius: "var(--radius-site, 12px)" }}
            >
              <span className="absolute right-4 top-4 text-5xl font-black tabular-nums text-[#77d14d]/[0.12]">
                {i + 1}
              </span>
              <h3 className="relative pr-12 text-base font-bold text-[#131311] md:text-lg">{item.title}</h3>
              <p className="relative mt-3 text-sm font-light leading-relaxed text-[#555552]">{item.body}</p>
            </motion.article>
          ))}
        </div>

        <SectionHeader
          title={c.assemblyTitle}
          titleClassName="font-black uppercase tracking-[0.02em]"
          showTitleMarker
          className="mb-10 md:mb-14"
        />

        <div className="hidden md:block relative mt-8">
          <div className="pointer-events-none absolute left-1/2 top-3 bottom-3 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#d9f0cf] via-[#77d14d] to-[#d9f0cf]" aria-hidden />
          <div className="space-y-8">
            {c.assemblySteps.map((step, index) => {
              const Icon = assemblyIcons[index] ?? ClipboardList;
              const isEven = index % 2 === 0;
              const card = (
                <motion.article
                  className={cn(
                    "rounded-2xl border border-[#e6eee2] bg-white px-7 py-6",
                    INFO_CARD_HOVER_LIGHT,
                  )}
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className="rounded-lg border border-[#d8e9d1] bg-[#f7fcf4] px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-[#3f6f2b]">
                      {locale === "en" ? "Step" : "Крок"} {index + 1}
                    </span>
                  </div>
                  <h3 className="mb-2 text-2xl font-extrabold tracking-tight text-[#131311]">{step.title}</h3>
                  <p className="text-[16px] leading-relaxed text-[#3a3a38]">{step.body}</p>
                </motion.article>
              );
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-6 lg:gap-10"
                >
                  <div className={isEven ? "min-w-0" : "invisible pointer-events-none min-w-0"}>{card}</div>
                  <div className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-[#77d14d] bg-white shadow-[0_12px_28px_rgba(119,209,77,0.32)]">
                    <Icon size={36} className="text-[#62b23f]" strokeWidth={1.85} aria-hidden />
                  </div>
                  <div className={!isEven ? "min-w-0" : "invisible pointer-events-none min-w-0"}>{card}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="md:hidden relative mt-6">
          <div
            className="pointer-events-none absolute top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#d9f0cf] via-[#77d14d] to-[#d9f0cf]"
            style={{ left: LINE_LEFT }}
            aria-hidden
          />
          <div>
            {c.assemblySteps.map((step, index) => {
              const Icon = assemblyIcons[index] ?? ClipboardList;
              const isLast = index === c.assemblySteps.length - 1;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-16px" }}
                  transition={{ delay: index * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex gap-3 ${isLast ? "" : "pb-7"}`}
                >
                  <div className="relative z-10 flex shrink-0 justify-center" style={{ width: RAIL_W }}>
                    <div className="flex h-[48px] w-[48px] items-center justify-center rounded-2xl border-[3px] border-[#77d14d] bg-white shadow-[0_8px_20px_rgba(119,209,77,0.26)]">
                      <Icon size={24} className="text-[#62b23f]" strokeWidth={1.85} aria-hidden />
                    </div>
                  </div>
                  <motion.article
                    className={cn(
                      "min-w-0 flex-1 rounded-2xl border border-[#e6eee2] bg-white px-4 py-4",
                      INFO_CARD_HOVER_LIGHT,
                    )}
                  >
                    <span className="inline-flex rounded-lg border border-[#d8e9d1] bg-[#f7fcf4] px-2 py-0.5 text-[10px] font-extrabold uppercase text-[#3f6f2b]">
                      {locale === "en" ? "Step" : "Крок"} {index + 1}
                    </span>
                    <h3 className="mt-2 text-lg font-extrabold text-[#131311]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#3a3a38]">{step.body}</p>
                  </motion.article>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
