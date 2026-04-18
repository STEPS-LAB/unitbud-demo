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
    <section id="fast-houses" className="section-padding relative scroll-mt-[156px] overflow-hidden bg-[#f5f5f3]">
      <InfoSectionDecor />
      <div className="container-wide relative">
        <SectionHeader
          title={c.title}
          titleClassName="font-black uppercase tracking-[0.02em] text-balance"
          showTitleMarker
          className="mb-10 md:mb-14"
        />

        <div className="relative max-w-4xl">
          <div className="pointer-events-none absolute -left-3 top-0 hidden h-full w-px bg-gradient-to-b from-[#77d14d] via-[#77d14d]/35 to-transparent lg:block" aria-hidden />
          <p
            className="text-lg font-light leading-relaxed text-[#131311] md:text-xl"
            style={{ fontFamily: "var(--font-display, Montserrat, Inter, sans-serif)" }}
          >
            {c.lead}
          </p>

          <div className="mt-10 space-y-10">
            {c.subs.map((sub, i) => (
              <motion.article
                key={sub.heading}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={cn("rounded-2xl border border-[#e6e6e2] bg-white p-6 md:p-8", INFO_CARD_HOVER_LIGHT)}
              >
                <h3 className="text-xl font-bold text-[#131311] md:text-2xl">{sub.heading}</h3>
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
