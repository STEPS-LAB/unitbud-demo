"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export function InfoHero() {
  const { tr } = useLocale();
  const p = tr.infoPage;

  return (
    <section className="relative isolate min-h-[240px] overflow-hidden pb-8 pt-[calc(88px+1.75rem)] sm:min-h-[260px] sm:pb-10 sm:pt-[calc(88px+2.25rem)] md:min-h-[320px] md:pb-14 md:pt-[calc(88px+3.5rem)]">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <Image
          src="/info.webp"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Те саме тонування, що в ConsultationSection (bgcons overlay) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/42 via-black/48 to-black/54" aria-hidden />
      </div>

      <div className="container-wide relative">
        <nav className="mb-5 flex flex-wrap items-center gap-1 text-[13px] text-white/65 sm:mb-6 md:text-sm" aria-label="Breadcrumb">
          <Link
            href="/"
            className="-mx-1 inline-flex min-h-[44px] min-w-[44px] items-center rounded-md px-2 text-white/80 transition-colors duration-500 ease-[0.22,1,0.36,1] md:hover:text-[#9ee86f]"
          >
            {p.breadcrumbHome}
          </Link>
          <ChevronRight className="size-3.5 shrink-0 text-white/40" aria-hidden />
          <span className="font-medium text-white">{p.breadcrumbCurrent}</span>
        </nav>

        <div className="pointer-events-none absolute -left-2 top-[4.5rem] hidden h-32 w-px bg-gradient-to-b from-[#77d14d] via-[#77d14d]/50 to-transparent lg:block" aria-hidden />

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl text-[clamp(1.55rem,4.2vw+0.6rem,2.25rem)] font-black uppercase leading-[1.08] tracking-[0.02em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] sm:text-4xl md:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-display, Montserrat, Inter, sans-serif)" }}
        >
          {p.heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-base font-light leading-relaxed text-white/78 md:text-lg"
        >
          {p.heroIntro}
        </motion.p>
      </div>
    </section>
  );
}
