"use client";

import { motion } from "framer-motion";
import { CornerUpRight, Ruler, Route, TreePine } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";
import { getInfoContent } from "@/data/info/content";
import { INFO_CARD_HOVER_LIGHT } from "@/lib/infoCardHover";
import { cn } from "@/lib/utils";
import { InfoSectionDecor } from "./InfoSectionDecor";

const icons = [Route, Ruler, TreePine, CornerUpRight] as const;

export function TransportRequirements() {
  const { locale } = useLocale();
  const c = getInfoContent(locale).transport;

  return (
    <section id="transport" className="section-padding relative scroll-mt-[152px] md:scroll-mt-[156px] overflow-hidden bg-white">
      <InfoSectionDecor />
      <div className="container-wide relative">
        <SectionHeader
          title={c.title}
          titleClassName="font-black uppercase tracking-[0.02em]"
          showTitleMarker
          className="mb-10 md:mb-14"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {c.items.map((item, i) => {
            const Icon = icons[i] ?? Route;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-24px" }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "flex flex-col border border-[#e6e6e2] bg-[#fafaf8] p-5 sm:p-6 md:hover:border-[#77d14d]/35 md:hover:bg-white",
                  INFO_CARD_HOVER_LIGHT,
                )}
                style={{ borderRadius: "var(--radius-site, 12px)" }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#e8e8e5] bg-white text-[#77d14d] shadow-sm transition-[transform,border-color] duration-500 ease-[0.22,1,0.36,1] md:group-hover:scale-105 md:group-hover:border-[#77d14d]/30">
                  <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="text-base font-bold text-balance text-[#131311] sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-[#555552]">{item.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
