"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { popularHouses } from "@/data/houses";
import { PopularHouseCard } from "@/components/ui/PopularHouseCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";

export function PopularSection() {
  const { tr } = useLocale();

  return (
    <section id="popular" className="section-padding bg-white">
      <div className="container-wide">
        <div className="mb-12 flex flex-wrap items-start justify-between gap-4 md:mb-16">
          <SectionHeader
            title={tr.sections.popular}
            titleClassName="font-black"
            showTitleMarker
            className="mb-0"
          />
          <Link
            href="/catalog"
            className="cta-press no-outline group inline-flex items-center gap-2 rounded-[8px] border-none bg-[#77d14d] px-6 py-3 text-sm font-semibold text-[#3a3a38] shadow-[0_10px_24px_rgba(119,209,77,0.35)] transition hover:bg-[#62b23f] hover:text-[#2a2a28] hover:shadow-[0_12px_28px_rgba(98,178,63,0.4)] active:scale-[0.98] md:mt-5"
          >
            {tr.common.allCatalog}
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {popularHouses.slice(0, 3).map((house, i) => (
            <motion.div
              key={house.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <PopularHouseCard house={house} priority={i === 0} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
