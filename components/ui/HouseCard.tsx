"use client";

import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Maximize2, ArrowRight } from "lucide-react";
import { House } from "@/types";
import { formatAreaSqm, formatUsd } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

interface Props {
  house: House;
  priority?: boolean;
}

export function HouseCard({ house, priority = false }: Props) {
  const { locale, tr } = useLocale();
  const displayName = locale === "en" ? house.nameEn ?? house.name : house.name;
  const categoryLabel =
    house.category === "compact"
      ? tr.catalogPage.catCompact
      : house.category === "comfort"
        ? tr.catalogPage.catComfort
        : house.category === "premium"
          ? tr.catalogPage.catPremium
          : tr.catalogPage.catElite;

  return (
    <div
      className="group bg-white border border-[#e8e8e5] rounded-[6px] overflow-hidden transition-transform md:hover:-translate-y-[1%] md:will-change-transform md:duration-500 md:ease-[0.22,1,0.36,1]"
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-[#f2f2f0]">
        <div className="h-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:scale-[1.04]">
          <Image
            src={house.thumbnail}
            alt={displayName}
            fill
            sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 34vw"
            quality={68}
            className="object-cover"
            priority={priority}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjJmMmYwIi8+PC9zdmc+"
          />
        </div>

        {/* Tag */}
        {house.tag && (
          <div className="absolute top-3 left-3 bg-[#77d14d] text-white text-[11px] font-600 tracking-wide px-2.5 py-1 rounded-[3px]">
            {locale === "en" ? house.tagEn ?? house.tag : house.tag}
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 right-3 bg-white/85 backdrop-blur-sm text-[#555552] text-[11px] font-500 uppercase tracking-wider px-2 py-1 rounded-[3px]">
          {categoryLabel}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3
          className="text-lg font-medium text-[#131311] mb-1 tracking-tight"
          style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
        >
          {displayName}
        </h3>
        <p className="text-[13px] text-[#7c7c78] mb-4">{locale === "en" ? house.styleEn ?? house.style : house.style}</p>

        {/* Specs row */}
        <div className="flex items-center gap-4 text-[13px] text-[#555552] mb-5">
          <span className="flex items-center gap-1.5">
            <Maximize2 size={13} className="text-[#a8a8a3]" />
            {formatAreaSqm(house.area, locale)}
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble size={13} className="text-[#a8a8a3]" />
            {house.bedrooms}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath size={13} className="text-[#a8a8a3]" />
            {house.bathrooms}
          </span>
        </div>

        {/* Separator */}
        <div className="h-px bg-[#e8e8e5] mb-5" />

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-[#a8a8a3] uppercase tracking-widest mb-0.5">
              {house.priceFrom ? tr.common.from : ""}
            </p>
            <p className="text-xl font-500 text-[#131311] tracking-tight">
              {formatUsd(house.price, locale)}
            </p>
          </div>
          <Link
            href="/mb75"
            className="flex items-center gap-1.5 text-[13px] font-500 text-[#77d14d] hover:text-[#4e8f31] transition-colors group/arrow"
          >
            {tr.common.details}
            <ArrowRight
              size={14}
              className="transition-transform group-hover/arrow:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
