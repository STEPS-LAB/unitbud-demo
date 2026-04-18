"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";
import { getInfoContent } from "@/data/info/content";
import { INFO_CARD_HOVER_LIGHT } from "@/lib/infoCardHover";
import { cn } from "@/lib/utils";
import { InfoSectionDecor } from "./InfoSectionDecor";

export function DeliverySection() {
  const { locale } = useLocale();
  const c = getInfoContent(locale).delivery;

  return (
    <section id="delivery" className="section-padding relative scroll-mt-[152px] md:scroll-mt-[156px] overflow-hidden bg-[#f5f5f3]">
      <InfoSectionDecor />
      <div className="container-wide relative">
        <SectionHeader
          title={c.title}
          titleClassName="font-black uppercase tracking-[0.02em]"
          showTitleMarker
          className="mb-10 md:mb-14"
        />

        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14 lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            {c.paragraphs.map((p, idx) => (
              <p key={idx} className="text-[15px] font-light leading-relaxed text-[#555552] md:text-[16px]">
                {p}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative overflow-hidden border border-[#e6e6e2] bg-white p-5 sm:p-6 md:p-8",
              INFO_CARD_HOVER_LIGHT,
            )}
            style={{ borderRadius: "var(--radius-site, 12px)" }}
          >
            <div className="absolute left-0 top-0 h-full w-1 bg-[#77d14d]" aria-hidden />
            <h3
              className="pl-4 text-lg font-bold uppercase tracking-[0.06em] text-[#131311] md:text-xl"
              style={{ fontFamily: "var(--font-display, Montserrat, Inter, sans-serif)" }}
            >
              {c.costTitle}
            </h3>
            <p className="mt-3 pl-4 text-sm text-[#7c7c78]">{c.costNote}</p>
            <ul className="mt-6 space-y-0 divide-y divide-[#efefec] pl-4">
              {c.costRows.map((row) => (
                <li
                  key={row.distance}
                  className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3.5 first:pt-0 transition-colors duration-500 ease-[0.22,1,0.36,1] sm:py-4 md:hover:bg-[#fafaf8]/80"
                >
                  <span className="min-w-0 text-[14px] font-medium text-[#131311] sm:text-[15px]">{row.distance}</span>
                  <span className="text-right text-[14px] font-semibold tabular-nums text-[#3f6f2b] sm:text-[15px]">
                    {row.price}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
