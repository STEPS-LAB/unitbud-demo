"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";
import { getInfoContent } from "@/data/info/content";
import { INFO_CARD_HOVER_LIGHT } from "@/lib/infoCardHover";
import { cn } from "@/lib/utils";
import { InfoSectionDecor } from "./InfoSectionDecor";

const cardEase = [0.22, 1, 0.36, 1] as const;

export function PaymentSection() {
  const { locale } = useLocale();
  const c = getInfoContent(locale).payment;

  return (
    <section id="payment" className="section-padding relative scroll-mt-[152px] md:scroll-mt-[156px] overflow-hidden bg-white">
      <InfoSectionDecor />
      <div className="container-wide relative">
        <SectionHeader
          title={c.title}
          subtitle={c.subtitle}
          titleClassName="font-black uppercase tracking-[0.02em] md:whitespace-normal"
          showTitleMarker
          className="mb-10 md:mb-14"
        />

        <div className="relative grid grid-cols-1 gap-5 sm:gap-7 lg:grid-cols-3 lg:gap-8">
          <div className="pointer-events-none absolute left-[8%] right-[8%] top-[52px] hidden h-0.5 bg-gradient-to-r from-[#d9f0cf] via-[#77d14d]/80 to-[#d9f0cf] lg:block" aria-hidden />

          {c.steps.map((step, i) => (
            <motion.article
              key={`payment-${i}-${step.title}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: cardEase }}
              className={cn(
                "relative flex flex-col border border-[#e6e6e2] bg-white p-5 sm:p-6 md:p-8",
                INFO_CARD_HOVER_LIGHT,
              )}
              style={{ borderRadius: "var(--radius-site, 12px)" }}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8e8e88]">
                  {locale === "en" ? "Stage" : "Етап"} {i + 1}
                </span>
                <span className="rounded-lg border border-[#d8e9d1] bg-[#f7fcf4] px-3 py-1.5 text-xl font-black tabular-nums text-[#3f6f2b] md:text-2xl">
                  {step.pct}
                </span>
              </div>
              <h3
                className="text-lg font-bold tracking-tight text-[#131311] text-balance sm:text-xl md:text-2xl"
                style={{ fontFamily: "var(--font-display, Montserrat, Inter, sans-serif)" }}
              >
                {step.title}
              </h3>
              <p className="mt-4 flex-1 text-[15px] font-light leading-relaxed text-[#555552]">{step.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
