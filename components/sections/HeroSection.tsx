"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { ConsultationModal } from "@/features/forms/ConsultationModal";

export function HeroSection() {
  const { tr } = useLocale();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative h-screen min-h-[600px] max-h-[1000px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85"
          alt="Unitbud premium home"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyZTNiMWUiLz48L3N2Zz4="
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(10,10,9,0.72) 0%, rgba(10,10,9,0.35) 55%, transparent 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10 pt-20">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="h-px w-8 bg-[#77d14d]" />
            <span className="text-[#95dc6a] text-[11px] font-600 tracking-[0.16em] uppercase">
              {tr.hero.label}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-white text-5xl sm:text-6xl md:text-7xl font-300 tracking-tight leading-[1.06] whitespace-pre-line"
            style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
          >
            {tr.hero.h1}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-white/70 text-base md:text-lg max-w-xl leading-relaxed"
          >
            {tr.hero.sub}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link href="/catalog" className="btn-primary">
              {tr.hero.cta1}
              <ChevronRight size={15} />
            </Link>
            <button
              onClick={() => setModalOpen(true)}
              className="btn-outline !border-white/40 !text-white hover:!border-white hover:!bg-white/10"
            >
              {tr.hero.cta2}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-[10px] font-500 tracking-[0.15em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>

      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
