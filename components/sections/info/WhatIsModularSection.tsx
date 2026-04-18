"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";
import { getInfoContent } from "@/data/info/content";
import { INFO_CARD_HOVER_LIGHT } from "@/lib/infoCardHover";
import { cn } from "@/lib/utils";
import { InfoSectionDecor } from "./InfoSectionDecor";

export function WhatIsModularSection() {
  const { locale } = useLocale();
  const c = getInfoContent(locale).whatModular;
  const sideQuote =
    locale === "en"
      ? "Factory precision meets architectural intent — fewer surprises on site, more time living."
      : "Заводська точність і архітектурний задум — менше сюрпризів на ділянці, більше часу на життя.";

  return (
    <section id="about-modular" className="section-padding relative scroll-mt-[156px] overflow-hidden bg-white">
      <InfoSectionDecor />
      <div className="container-wide relative">
        <SectionHeader
          title={c.title}
          titleClassName="font-black uppercase tracking-[0.02em] text-balance"
          showTitleMarker
          className="mb-10 md:mb-14"
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-14 lg:items-start">
          <div className="relative">
            <div className="pointer-events-none absolute -left-3 top-0 hidden h-full w-px bg-gradient-to-b from-[#77d14d] via-[#77d14d]/40 to-transparent lg:block" aria-hidden />
            <p
              className="text-lg font-light leading-relaxed text-[#131311] md:text-xl"
              style={{ fontFamily: "var(--font-display, Montserrat, Inter, sans-serif)" }}
            >
              {c.lead}
            </p>
            <div className="mt-10 space-y-10">
              {c.subs.map((sub, i) => (
                <motion.div
                  key={sub.heading}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-24px" }}
                  transition={{ delay: Math.min(i * 0.05, 0.2), duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="text-xl font-bold tracking-tight text-[#131311] md:text-2xl">{sub.heading}</h3>
                  <div className="mt-4 space-y-4">
                    {sub.paragraphs.map((para, j) => (
                      <p key={j} className="text-[15px] font-light leading-[1.75] text-[#555552] md:text-[16px]">
                        {para}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <aside className="relative lg:sticky lg:top-[calc(88px+5.5rem)]">
            <div
              className={cn(
                "relative overflow-hidden border border-[#e6e6e2] bg-[#fafaf8] p-8 md:p-10",
                INFO_CARD_HOVER_LIGHT,
              )}
              style={{ borderRadius: "var(--radius-site, 12px)" }}
            >
              <Quote className="absolute right-6 top-6 size-14 text-[#77d14d]/[0.15]" strokeWidth={1} aria-hidden />
              <div className="absolute left-0 top-0 h-full w-1 bg-[#77d14d]" aria-hidden />
              <p className="pl-5 text-[15px] font-light leading-relaxed text-[#3a3a38] md:text-base">{sideQuote}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
