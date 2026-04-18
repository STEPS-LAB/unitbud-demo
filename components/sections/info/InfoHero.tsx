"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { INFO_PILL_TRANSITION } from "@/lib/infoCardHover";
import { cn } from "@/lib/utils";
import { InfoSectionDecor } from "./InfoSectionDecor";

export function InfoHero() {
  const { tr } = useLocale();
  const p = tr.infoPage;
  const chips = [p.chipPay, p.chipDelivery, p.chipInstall, p.chipSauna, p.chipFaq];

  return (
    <section className="relative overflow-hidden bg-[#f5f5f3] pb-8 pt-[calc(88px+2.5rem)] md:pb-12 md:pt-[calc(88px+3.5rem)]">
      <InfoSectionDecor />
      <div className="container-wide relative">
        <nav className="mb-6 flex flex-wrap items-center gap-1 text-[13px] text-[#7c7c78] md:text-sm" aria-label="Breadcrumb">
          <Link href="/" className="transition-colors hover:text-[#77d14d]">
            {p.breadcrumbHome}
          </Link>
          <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden />
          <span className="font-medium text-[#131311]">{p.breadcrumbCurrent}</span>
        </nav>

        <div className="pointer-events-none absolute -left-2 top-[4.5rem] hidden h-32 w-px bg-gradient-to-b from-[#77d14d] via-[#77d14d]/50 to-transparent lg:block" aria-hidden />

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl text-4xl font-black uppercase leading-[1.05] tracking-[0.02em] text-[#131311] md:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-display, Montserrat, Inter, sans-serif)" }}
        >
          {p.heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-base font-light leading-relaxed text-[#555552] md:text-lg"
        >
          {p.heroIntro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {chips.map((label) => (
            <span
              key={label}
              className={cn(
                "rounded-full border border-[#e0e0dc] bg-white/85 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5a5a56] backdrop-blur-sm hover:border-[#77d14d]/50 hover:text-[#3f6f2b]",
                INFO_PILL_TRANSITION,
              )}
            >
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
