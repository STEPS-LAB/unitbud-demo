"use client";

import { motion } from "framer-motion";
import { Droplets, Flame, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";
import { getInfoContent } from "@/data/info/content";
import { INFO_CARD_HOVER_LIGHT } from "@/lib/infoCardHover";
import { cn } from "@/lib/utils";
import { InfoSectionDecor } from "./InfoSectionDecor";

const advIcons = [Sparkles, Droplets, Flame] as const;

export function SaunaSection() {
  const { locale } = useLocale();
  const c = getInfoContent(locale).sauna;

  return (
    <section id="saunas" className="section-padding relative scroll-mt-[152px] md:scroll-mt-[156px] overflow-hidden bg-white">
      <InfoSectionDecor />
      <div className="container-wide relative">
        <SectionHeader
          title={c.title}
          titleClassName="font-black uppercase tracking-[0.02em] text-balance leading-tight break-words"
          showTitleMarker
          className="mb-8 md:mb-10"
        />

        <div className="max-w-3xl space-y-8 sm:space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-xl font-bold tracking-tight text-balance text-[#131311] md:text-2xl">{c.introQuote}</h3>
            <div className="mt-4 space-y-4">
              <p className="text-[15px] font-light leading-[1.75] text-[#555552] md:text-[16px]">{c.lead}</p>
            </div>
          </motion.div>
          {c.subs.map((sub, i) => (
            <motion.div
              key={sub.heading}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-lg font-bold text-[#131311] md:text-xl">{sub.heading}</h3>
              <div className="mt-3 space-y-3">
                {sub.paragraphs.map((para, j) => (
                  <p key={j} className="max-w-3xl text-[15px] font-light leading-relaxed text-[#555552] md:text-[16px]">
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 border-t border-[#efefec] pt-10 sm:mt-16 sm:pt-14">
          <SectionHeader title={c.advantageTitle} appearance="subsection" className="mb-8 md:mb-10" />
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
            {c.advantageCards.map((card, i) => {
              const Icon = advIcons[i] ?? Sparkles;
              return (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-24px" }}
                  transition={{ delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "flex flex-col border border-[#e6e6e2] bg-white p-5 sm:p-6",
                    INFO_CARD_HOVER_LIGHT,
                  )}
                  style={{ borderRadius: "var(--radius-site, 12px)" }}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#131311] text-[#8bf160] shadow-md transition-transform duration-500 ease-[0.22,1,0.36,1] md:group-hover:scale-105">
                    <Icon size={22} strokeWidth={2} aria-hidden />
                  </div>
                  <h4 className="mt-4 text-lg font-bold text-[#131311]">{card.title}</h4>
                  <p className="mt-2 flex-1 text-sm font-light leading-relaxed text-[#555552]">{card.body}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
