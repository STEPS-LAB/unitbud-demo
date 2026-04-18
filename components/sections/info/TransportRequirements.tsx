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
    <div className="section-padding relative overflow-hidden bg-white">
      <InfoSectionDecor />
      <div className="container-wide relative">
        <SectionHeader title={c.title} appearance="subsection" className="mb-8 md:mb-10" />

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
                  "flex flex-col border border-[#e6e6e2] bg-white p-5 sm:p-6",
                  INFO_CARD_HOVER_LIGHT,
                )}
                style={{ borderRadius: "var(--radius-site, 12px)" }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#e8e8e5] bg-white text-[#77d14d] shadow-sm transition-transform duration-500 ease-[0.22,1,0.36,1] md:group-hover:scale-105">
                  <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="text-base font-bold text-balance text-[#131311] sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-[#555552]">{item.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
