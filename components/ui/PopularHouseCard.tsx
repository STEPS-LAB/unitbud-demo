"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bath, BedDouble, Maximize2 } from "lucide-react";
import { House } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";

interface Props {
  house: House;
  priority?: boolean;
}

export function PopularHouseCard({ house, priority = false }: Props) {
  const { locale, tr } = useLocale();
  const isFirstPopularCard = house.id === "1";
  const categoryLabel =
    isFirstPopularCard
      ? tr.catalogPage.catPremium
      : house.category === "compact"
      ? tr.catalogPage.catComfort
      : house.category === "comfort"
        ? tr.catalogPage.catComfort
        : house.category === "premium"
          ? tr.catalogPage.catPremium
          : tr.catalogPage.catElite;

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-[#dfdfda] bg-[#f2f2f0] shadow-[0_16px_42px_rgba(19,19,17,0.09)] transition hover:shadow-[0_20px_48px_rgba(19,19,17,0.13)] md:hover:-translate-y-[1%] md:hover:shadow-[0_20px_48px_rgba(19,19,17,0.13)] md:will-change-transform md:transition-transform md:duration-500 md:ease-[0.22,1,0.36,1]"
    >
      <Link href={`/house/${house.slug}`} className="absolute inset-0 z-10" aria-label={`${house.name} ${tr.common.details}`} />

      <div className="relative aspect-[16/10] bg-[#f2f2f0]">
        <Image
          src={house.thumbnail}
          alt={house.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-[1.04]"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjJmMmYwIi8+PC9zdmc+"
        />

        <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-white/45 bg-white/30 px-3 py-1 text-[11px] font-600 uppercase tracking-wider text-[#3f3f3c] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_6px_16px_rgba(19,19,17,0.16)] backdrop-blur-md">
            {categoryLabel}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className="truncate text-[20px] font-semibold tracking-tight text-[#131311]"
              style={{ fontFamily: "var(--font-display, Montserrat, Inter, sans-serif)" }}
            >
              {house.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-[14px] leading-snug text-[#6f6f6a]">
              {locale === "en" ? house.descriptionEn ?? house.description : house.description}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-[#131311] px-3 py-1 text-[11px] font-600 tracking-wide text-white">
            {house.area} м²
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px] text-[#555552]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f6f6f4] px-3 py-1 ring-1 ring-black/5">
            <Maximize2 size={13} className="text-[#a8a8a3]" />
            {house.area} м²
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f6f6f4] px-3 py-1 ring-1 ring-black/5">
            <BedDouble size={13} className="text-[#a8a8a3]" />
            {house.bedrooms}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f6f6f4] px-3 py-1 ring-1 ring-black/5">
            <Bath size={13} className="text-[#a8a8a3]" />
            {house.bathrooms}
          </span>
        </div>

        <div className="my-4 h-px bg-[#ecece8]" />

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-[#a8a8a3]">{house.priceFrom ? tr.common.from : ""}</p>
            <p className="mt-0.5 text-[22px] font-600 tracking-tight text-[#131311]">{formatPrice(house.price)}</p>
          </div>

          <Link
            href={`/house/${house.slug}`}
            className="group/details relative z-20 inline-flex items-center gap-2 rounded-[8px] bg-[#131311] px-4 py-2 text-[13px] font-600 text-white transition-colors hover:bg-[#1f1f1d] active:scale-[0.98]"
          >
            {tr.common.details}
            <ArrowRight size={15} className="transition-transform duration-300 group-hover/details:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

