"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, ArrowRight } from "lucide-react";
import { mapPoints } from "@/data/map-points";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";
import { formatPrice } from "@/lib/utils";
import { MapPoint } from "@/types";

// Pseudo map with relative positioning
// Ukraine bounding box approximate: lat 44.4–52.4, lng 22.1–40.2
const LAT_MIN = 44.4, LAT_MAX = 52.4;
const LNG_MIN = 22.1, LNG_MAX = 40.2;

function toPercent(lat: number, lng: number) {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * 100;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * 100;
  return { x: Math.max(4, Math.min(96, x)), y: Math.max(4, Math.min(96, y)) };
}

export function MapSection() {
  const { tr } = useLocale();
  const [active, setActive] = useState<MapPoint | null>(null);

  return (
    <section id="map" className="section-padding bg-white">
      <div className="container-wide">
        <SectionHeader
          label="Карта"
          title={tr.sections.map}
          subtitle={tr.sections.mapSub}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[6px] overflow-hidden border border-[#e8e8e5] bg-[#f4f6f0]"
          style={{ height: "clamp(320px, 50vw, 560px)" }}
        >
          {/* Stylized Ukraine map SVG background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <svg viewBox="0 0 400 300" className="w-full h-full" style={{ maxWidth: "80%" }}>
              <rect x="40" y="60" width="320" height="180" rx="40" fill="#77d14d" />
              <text x="200" y="160" textAnchor="middle" fill="#2e3b1e" fontSize="24" fontFamily="Montserrat, sans-serif">
                Україна
              </text>
            </svg>
          </div>

          {/* Grid lines */}
          <div className="absolute inset-0 opacity-20">
            {[25, 50, 75].map((p) => (
              <div key={`h${p}`} className="absolute left-0 right-0 border-t border-[#77d14d]/20" style={{ top: `${p}%` }} />
            ))}
            {[25, 50, 75].map((p) => (
              <div key={`v${p}`} className="absolute top-0 bottom-0 border-l border-[#77d14d]/20" style={{ left: `${p}%` }} />
            ))}
          </div>

          {/* Map label */}
          <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-[4px] px-3 py-1.5 text-[11px] font-600 text-[#555552] uppercase tracking-wider">
            Україна
          </div>

          {/* Pins */}
          {mapPoints.map((point) => {
            const pos = toPercent(point.lat, point.lng);
            return (
              <motion.button
                key={point.id}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                whileHover={{ scale: 1.2 }}
                onClick={() => setActive(active?.id === point.id ? null : point)}
              >
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-full bg-[#77d14d]/30 animate-ping" style={{ animationDuration: "2s" }} />
                <div
                  className={[
                    "relative z-10 w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                    active?.id === point.id
                      ? "bg-[#77d14d] border-[#77d14d] text-white scale-110"
                      : "bg-white border-[#77d14d] text-[#77d14d] hover:bg-[#77d14d] hover:text-white",
                  ].join(" ")}
                >
                  <MapPin size={14} fill="currentColor" />
                </div>
                {/* City label */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap text-[10px] font-600 text-[#3a3a38] bg-white/90 px-1.5 py-0.5 rounded-[2px] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {point.city}
                </div>
              </motion.button>
            );
          })}

          {/* Popup */}
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-72 bg-white rounded-[6px] overflow-hidden"
                style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.14)" }}
              >
                <div className="relative h-36 bg-[#f2f2f0]">
                  <Image
                    src={active.image}
                    alt={active.title}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => setActive(null)}
                    className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <X size={13} className="text-[#555552]" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-sm font-500 text-[#131311]" style={{ fontFamily: "Montserrat, Inter, sans-serif" }}>
                    {active.title}
                  </p>
                  <p className="text-[12px] text-[#7c7c78] mt-0.5 mb-3">{active.city} · {active.area} м²</p>
                  <div className="flex items-center justify-between">
                    <p className="text-base font-500 text-[#131311]">{formatPrice(active.price)}</p>
                    <Link
                      href={`/house/${active.slug}`}
                      className="flex items-center gap-1 text-[13px] font-500 text-[#77d14d] hover:text-[#4e8f31] transition-colors"
                    >
                      Детальніше <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
