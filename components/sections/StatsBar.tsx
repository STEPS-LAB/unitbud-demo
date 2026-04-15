"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/hooks/useLocale";

const stats = [
  { value: "200+", keyUk: "houses", keyEn: "houses" },
  { value: "10+", keyUk: "years", keyEn: "years" },
  { value: "90", keyUk: "days", keyEn: "days" },
  { value: "10", keyUk: "warranty", keyEn: "warranty", suffix: " років" },
];

export function StatsBar() {
  const { locale, tr } = useLocale();

  return (
    <section className="bg-[#131311] py-10 md:py-12">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center md:px-8"
            >
              <p
                className="text-4xl md:text-5xl font-300 text-white tracking-tight"
                style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
              >
                {stat.value}
                {stat.suffix && locale === "uk" ? stat.suffix : ""}
              </p>
              <p className="mt-1.5 text-[12px] text-white/45 uppercase tracking-[0.12em] font-500">
                {tr.stats[stat.keyUk as keyof typeof tr.stats]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
