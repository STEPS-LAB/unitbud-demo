"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BedDouble,
  Bath,
  Maximize2,
  Layers,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { House } from "@/types";
import { formatPrice } from "@/lib/utils";
import { ConsultationModal } from "@/features/forms/ConsultationModal";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface Props {
  house: House;
}

export function HousePageClient({ house }: Props) {
  const [activeImg, setActiveImg] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const prev = () => setActiveImg((i) => (i - 1 + house.images.length) % house.images.length);
  const next = () => setActiveImg((i) => (i + 1) % house.images.length);

  return (
    <div className="section-padding">
      <div className="container-wide">
        {/* Breadcrumb */}
        <RevealOnScroll>
          <div className="flex items-center gap-2 text-sm text-[#7c7c78] mb-8">
            <Link href="/" className="hover:text-[#728c4a] transition-colors">Головна</Link>
            <span>/</span>
            <Link href="/catalog" className="hover:text-[#728c4a] transition-colors">Каталог</Link>
            <span>/</span>
            <span className="text-[#131311]">{house.name}</span>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
          {/* Left: Gallery + Description */}
          <div>
            {/* Main image */}
            <RevealOnScroll>
              <div className="relative aspect-[16/10] bg-[#f2f2f0] rounded-[6px] overflow-hidden mb-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImg}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={house.images[activeImg]}
                      alt={`${house.name} — фото ${activeImg + 1}`}
                      fill
                      className="object-cover"
                      priority={activeImg === 0}
                      sizes="(max-width: 1024px) 100vw, 65vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Arrows */}
                {house.images.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}

                {/* Counter */}
                <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[12px] font-500 px-2.5 py-1 rounded-[3px]">
                  {activeImg + 1} / {house.images.length}
                </div>
              </div>
            </RevealOnScroll>

            {/* Thumbnails */}
            {house.images.length > 1 && (
              <div className="flex gap-2 mb-10">
                {house.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={[
                      "relative flex-1 aspect-[4/3] rounded-[4px] overflow-hidden border-2 transition-all",
                      i === activeImg
                        ? "border-[#728c4a]"
                        : "border-transparent opacity-60 hover:opacity-100",
                    ].join(" ")}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="100px" />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <RevealOnScroll>
              <h2
                className="text-xl font-500 text-[#131311] mb-4 tracking-tight"
                style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
              >
                Про будинок
              </h2>
              <p className="text-[15px] text-[#555552] leading-relaxed mb-8">
                {house.description}
              </p>
            </RevealOnScroll>

            {/* Features */}
            <RevealOnScroll>
              <h2
                className="text-xl font-500 text-[#131311] mb-4 tracking-tight"
                style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
              >
                Особливості
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {house.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[14px] text-[#3a3a38]">
                    <CheckCircle2 size={15} className="text-[#728c4a] mt-0.5 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            {/* Specs table */}
            <RevealOnScroll>
              <h2
                className="text-xl font-500 text-[#131311] mb-4 tracking-tight"
                style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
              >
                Характеристики
              </h2>
              <div className="border border-[#e8e8e5] rounded-[6px] overflow-hidden">
                {Object.entries(house.specs).map(([key, value], i) => (
                  <div
                    key={key}
                    className={[
                      "flex items-center justify-between px-5 py-3.5 text-[14px]",
                      i % 2 === 0 ? "bg-white" : "bg-[#f9f9f8]",
                    ].join(" ")}
                  >
                    <span className="text-[#7c7c78]">{key}</span>
                    <span className="text-[#131311] font-500">{value}</span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: Sticky sidebar */}
          <div>
            <div className="sticky top-24">
              <RevealOnScroll direction="right">
                <div
                  className="bg-white border border-[#e8e8e5] rounded-[6px] p-7 mb-4"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
                >
                  {/* Tag */}
                  {house.tag && (
                    <div className="inline-block bg-[#f4f6f0] text-[#728c4a] text-[11px] font-600 uppercase tracking-wider px-2.5 py-1 rounded-[3px] mb-4">
                      {house.tag}
                    </div>
                  )}

                  <h1
                    className="text-2xl font-500 text-[#131311] tracking-tight mb-1"
                    style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
                  >
                    {house.name}
                  </h1>
                  <p className="text-sm text-[#7c7c78] mb-6">{house.style}</p>

                  {/* Quick specs */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { icon: Maximize2, label: "Площа", value: `${house.area} м²` },
                      { icon: BedDouble, label: "Спальні", value: house.bedrooms },
                      { icon: Bath, label: "Санвузли", value: house.bathrooms },
                    ].map((spec) => (
                      <div
                        key={spec.label}
                        className="bg-[#f9f9f8] rounded-[4px] p-3 text-center"
                      >
                        <spec.icon
                          size={16}
                          className="text-[#728c4a] mx-auto mb-1.5"
                          strokeWidth={1.5}
                        />
                        <p className="text-[11px] text-[#a8a8a3] mb-0.5">{spec.label}</p>
                        <p className="text-[13px] font-500 text-[#131311]">{spec.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-[#555552] mb-6">
                    <Layers size={14} className="text-[#a8a8a3]" />
                    {house.floors} {house.floors === 1 ? "поверх" : "поверхи"}
                    <span className="text-[#d4d4d0] mx-1">·</span>
                    <span className="capitalize">{house.material === "frame" ? "Каркасна" : house.material}</span>
                  </div>

                  {/* Price */}
                  <div className="h-px bg-[#e8e8e5] mb-5" />
                  <div className="mb-6">
                    <p className="text-[11px] uppercase tracking-widest text-[#a8a8a3] mb-1">
                      {house.priceFrom ? "від" : ""}
                    </p>
                    <p
                      className="text-3xl font-300 text-[#131311] tracking-tight"
                      style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
                    >
                      {formatPrice(house.price)}
                    </p>
                    <p className="text-[12px] text-[#a8a8a3] mt-1">
                      * включно з монтажем та оздобленням
                    </p>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => setModalOpen(true)}
                    className="btn-primary w-full justify-center py-4 mb-3"
                  >
                    Отримати безкоштовну консультацію
                  </button>
                  <a
                    href="tel:+380800000000"
                    className="btn-outline w-full justify-center py-3.5 text-sm"
                  >
                    Зателефонувати
                  </a>
                </div>

                {/* Back link */}
                <Link
                  href="/catalog"
                  className="flex items-center gap-1.5 text-sm text-[#7c7c78] hover:text-[#728c4a] transition-colors"
                >
                  <ArrowLeft size={14} />
                  Назад до каталогу
                </Link>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
