"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { popularHouses } from "@/data/houses";
import { HouseCard } from "@/components/ui/HouseCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";

export function PopularSection() {
  const { tr } = useLocale();

  return (
    <section id="popular" className="section-padding bg-white">
      <div className="container-wide">
        <div className="flex items-end justify-between mb-12 md:mb-16 flex-wrap gap-4">
          <SectionHeader
            label={tr.nav.catalog}
            title={tr.sections.popular}
            subtitle={tr.sections.popularSub}
            className="mb-0"
          />
          <Link
            href="/catalog"
            className="text-sm font-500 text-[#77d14d] hover:text-[#4e8f31] transition-colors flex items-center gap-1.5"
          >
            {tr.common.allCatalog} →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularHouses.slice(0, 3).map((house, i) => (
            <motion.div
              key={house.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <HouseCard house={house} priority={i === 0} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
