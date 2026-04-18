"use client";

import { motion } from "framer-motion";
import { Layers, PencilRuler, Timer } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";
import { getInfoContent } from "@/data/info/content";
import { INFO_CARD_HOVER_DARK } from "@/lib/infoCardHover";
import { cn } from "@/lib/utils";

const icons = [PencilRuler, Layers, Timer] as const;

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ModularAdvantagesSection() {
  const { locale } = useLocale();
  const c = getInfoContent(locale).advantages;

  return (
    <section id="advantages" className="section-padding relative scroll-mt-[156px] overflow-hidden bg-[#1b1b19]">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(ellipse 60% 40% at 20% 0%, rgba(119,209,77,0.12) 0%, transparent 50%)`,
        }}
        aria-hidden
      />
      <div className="container-wide relative">
        <SectionHeader
          title={c.title}
          subtitle={c.subtitle}
          centered
          titleClassName="font-black text-white uppercase tracking-[0.02em]"
          showTitleMarker
          className="[&_.h-10]:bg-[#77d14d]"
        />

        <motion.div
          className="mx-auto mt-4 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {c.cards.map((card, i) => {
            const Icon = icons[i] ?? PencilRuler;
            return (
              <motion.article
                key={card.title}
                variants={cardVariants}
                className={cn(
                  "flex flex-col rounded-2xl border border-[#2a2a28] bg-[#232320] p-6 text-center hover:border-[#77d14d]/35 md:p-7",
                  INFO_CARD_HOVER_DARK,
                )}
              >
                <div className="mx-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#131311] shadow-[0_10px_24px_rgba(0,0,0,0.45)] ring-1 ring-white/10 transition-[box-shadow,ring-color] duration-500 ease-[0.22,1,0.36,1] group-hover:ring-[#77d14d]/30">
                  <Icon size={28} className="text-[#8bf160]" strokeWidth={2} aria-hidden />
                </div>
                <h3
                  className="mt-5 text-lg font-black leading-snug tracking-tight text-white md:text-xl"
                  style={{ fontFamily: "var(--font-display, Montserrat, Inter, sans-serif)" }}
                >
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-[14px] font-light leading-relaxed text-white/72 md:text-[15px]">{card.body}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
