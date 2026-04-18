"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";
import { getInfoContent } from "@/data/info/content";
import { INFO_CARD_HOVER_LIGHT } from "@/lib/infoCardHover";
import { cn } from "@/lib/utils";
import { InfoSectionDecor } from "./InfoSectionDecor";

export function FastHousesSection() {
  const { locale } = useLocale();
  const c = getInfoContent(locale).fastHouses;

  return (
    <section id="fast-houses" className="section-padding relative scroll-mt-[152px] md:scroll-mt-[156px] overflow-hidden bg-[#f5f5f3]">
      <InfoSectionDecor />
      <div className="container-wide relative">
        <SectionHeader
          title={c.title}
          titleClassName={cn(
            "min-w-0 flex-1 font-black uppercase text-balance hyphens-none",
            "tracking-tight text-[clamp(0.92rem,3.4vw+0.48rem,1.5rem)] leading-[1.12] sm:tracking-[0.02em] sm:text-3xl sm:leading-tight md:text-4xl lg:text-5xl",
          )}
          showTitleMarker
          className="mb-8 md:mb-10"
        />

        <div className="relative max-w-4xl">
          <div className="pointer-events-none absolute -left-3 top-0 hidden h-full w-px bg-gradient-to-b from-[#77d14d] via-[#77d14d]/35 to-transparent lg:block" aria-hidden />
          <div className="space-y-8 sm:space-y-10">
            {c.tagline ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-xl font-bold tracking-tight text-[#131311] md:text-2xl">{c.tagline}</h3>
                <div className="mt-4 space-y-4">
                  <p className="text-[15px] font-light leading-[1.75] text-[#555552] md:text-[16px]">{c.lead}</p>
                </div>
              </motion.div>
            ) : (
              <p className="text-[15px] font-light leading-[1.75] text-[#555552] md:text-[16px]">{c.lead}</p>
            )}
            {c.subs.map((sub, i) => (
              <motion.article
                key={sub.heading}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "rounded-2xl border border-[#e6e6e2] bg-white p-5 sm:p-6 md:p-8",
                  INFO_CARD_HOVER_LIGHT,
                )}
              >
                <h3 className="text-lg font-bold text-balance text-[#131311] sm:text-xl md:text-2xl">{sub.heading}</h3>
                <div className="mt-4 space-y-4">
                  {sub.paragraphs.map((para, j) => (
                    <p key={j} className="text-[15px] font-light leading-relaxed text-[#555552] md:text-[16px]">
                      {para}
                    </p>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
