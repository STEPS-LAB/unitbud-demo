"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Maximize2 } from "lucide-react";
import { installedHouses } from "@/data/houses";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";
import { formatPrice } from "@/lib/utils";

export function InstalledSection() {
  const { tr } = useLocale();

  return (
    <section id="installed" className="section-padding bg-[#f9f9f8]">
      <div className="container-wide">
        <SectionHeader
          label="Реалізовані проєкти"
          title={tr.sections.installed}
          subtitle={tr.sections.installedSub}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {installedHouses.map((house, i) => (
            <motion.div
              key={house.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/house/${house.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-[#e8e8e5]">
                  <motion.div
                    className="h-full"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={house.thumbnail}
                      alt={house.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZThlOGU1Ii8+PC9zdmc+"
                    />
                  </motion.div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* Location badge */}
                  {house.location && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-[12px] font-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <MapPin size={12} />
                      {house.location}
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3
                        className="text-base font-500 text-[#131311] tracking-tight"
                        style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
                      >
                        {house.name}
                      </h3>
                      <p className="flex items-center gap-1.5 mt-1 text-[13px] text-[#7c7c78]">
                        <Maximize2 size={12} />
                        {house.area} м²
                        {house.location && (
                          <>
                            <span className="text-[#d4d4d0]">·</span>
                            {house.location}
                          </>
                        )}
                      </p>
                    </div>
                    <p className="text-[15px] font-500 text-[#131311] text-right whitespace-nowrap ml-2">
                      {formatPrice(house.price)}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/catalog" className="btn-outline">
            Переглянути всі проєкти
          </Link>
        </div>
      </div>
    </section>
  );
}
