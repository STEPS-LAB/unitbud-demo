"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { houses } from "@/data/houses";
import { PopularHouseCard } from "@/components/ui/PopularHouseCard";
import { House, type ResidentialModelLine } from "@/types";
import type { Translations } from "@/hooks/useLocale";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";

type ResidentialLineFilter = ResidentialModelLine | "all";
type CatalogSegment = House["catalogSegment"];
type CatalogSegmentTab = CatalogSegment | "all";
type SortKey = "price-asc" | "price-desc" | "area-asc" | "area-desc";

const AREA_MIN = 20;
const AREA_MAX = 140;
const AREA_STEP = 5;

/** Порядок: Всі → дачні → хай-тек → скандинавські */
const RESIDENTIAL_LINE_FILTERS: ResidentialLineFilter[] = ["all", "house92", "mb102", "mb92"];

function residentialFilterLabel(cp: Translations["catalogPage"], line: ResidentialLineFilter): string {
  if (line === "all") return cp.catAll;
  switch (line) {
    case "mb102":
      return cp.residentialFilterMb102;
    case "mb92":
      return cp.residentialFilterMb92;
    case "house92":
      return cp.residentialFilterHouse92;
  }
}

function AreaSliderRow({
  label,
  value,
  onChange,
  locale,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  locale: "uk" | "en";
}) {
  const pct = ((value - AREA_MIN) / (AREA_MAX - AREA_MIN)) * 100;

  return (
    <div>
      <div className="mb-[0.675rem] flex items-baseline justify-between gap-3">
        <span className="text-[11px] font-600 uppercase tracking-[0.16em] text-[#8fdf6a]/90">{label}</span>
        <span
          className="text-xl font-300 tabular-nums tracking-tight text-white"
          style={{ fontFamily: "var(--font-display, system-ui, sans-serif)" }}
        >
          {value}
          <span className="ml-1.5 text-sm font-400 text-white/40">{locale === "en" ? "m²" : "м²"}</span>
        </span>
      </div>
      <div className="relative py-[0.225rem]">
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/[0.08]" />
        <div
          className="pointer-events-none absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#77d14d]"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={AREA_MIN}
          max={AREA_MAX}
          step={AREA_STEP}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="premium-area-range relative z-[1] block w-full"
          aria-label={label}
        />
      </div>
    </div>
  );
}

export function CatalogClient() {
  const { tr, locale } = useLocale();
  const searchParams = useSearchParams();
  const [segment, setSegment] = useState<CatalogSegmentTab>("residential");
  const [sort, setSort] = useState<SortKey>("price-asc");
  const [areaMin, setAreaMin] = useState(AREA_MIN);
  const [areaMax, setAreaMax] = useState(AREA_MAX);
  const [sortOpen, setSortOpen] = useState(false);
  const sortWrapRef = useRef<HTMLDivElement>(null);
  const [residentialFilter, setResidentialFilter] = useState<ResidentialLineFilter>("all");
  const [residentialLinesOpen, setResidentialLinesOpen] = useState(true);

  const segmentTabs: { key: CatalogSegmentTab; label: string }[] = [
    { key: "all", label: tr.catalogPage.catAll },
    { key: "residential", label: tr.sections.calcResidential },
    { key: "commercial", label: tr.sections.calcCommercial },
    { key: "sauna", label: tr.sections.calcSauna },
  ];

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: "price-asc", label: tr.catalogPage.sortPriceAsc },
    { key: "price-desc", label: tr.catalogPage.sortPriceDesc },
    { key: "area-asc", label: tr.catalogPage.sortAreaAsc },
    { key: "area-desc", label: tr.catalogPage.sortAreaDesc },
  ];

  const currentSortLabel = sortOptions.find((s) => s.key === sort)?.label ?? "";

  const setAreaMinSafe = (n: number) => {
    const v = Math.min(n, areaMax - AREA_STEP);
    setAreaMin(v);
  };
  const setAreaMaxSafe = (n: number) => {
    const v = Math.max(n, areaMin + AREA_STEP);
    setAreaMax(v);
  };

  useEffect(() => {
    if (!sortOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (sortWrapRef.current && !sortWrapRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [sortOpen]);

  useEffect(() => {
    const segmentParam = searchParams.get("segment");
    if (segmentParam === "all" || segmentParam === "residential" || segmentParam === "commercial" || segmentParam === "sauna") {
      setSegment(segmentParam);
      return;
    }

    const filterParam = searchParams.get("filter");
    if (filterParam === "commercial") {
      setSegment("commercial");
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = houses.filter((h) => {
      if (h.area < areaMin || h.area > areaMax) return false;
      if (segment === "all") return true;
      if (h.catalogSegment !== segment) return false;
      if (
        segment === "residential" &&
        residentialFilter !== "all" &&
        h.residentialLine !== residentialFilter
      ) {
        return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "area-asc") return a.area - b.area;
      if (sort === "area-desc") return b.area - a.area;
      return 0;
    });
    return list;
  }, [segment, sort, areaMin, areaMax, residentialFilter]);

  const tabActive =
    "bg-[#77d14d] border-[#77d14d] text-white shadow-none hover:bg-[#6bc945] hover:border-[#6bc945]";
  const tabIdle =
    "bg-white border-[#e8e8e5] text-[#555552] hover:border-[#77d14d]/45 hover:text-[#3a3a38]";

  return (
    <div className="section-padding bg-[#f2f2f0]">
      <div className="container-wide">
        <div className="mb-10">
          <span className="section-label mb-3">{tr.nav.catalog}</span>
          <h1
            className="mt-3 text-4xl font-300 tracking-tight text-[#131311] md:text-5xl"
            style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
          >
            {tr.catalogPage.title}
          </h1>
          <p className="mt-3 text-base text-[#555552]">
            {filtered.length} {tr.catalogPage.modelsInCatalog}
          </p>
        </div>

        <div className="mb-10 space-y-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {segmentTabs.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSegment(s.key)}
                  className={cn(
                    "rounded-[8px] border px-4 py-2.5 text-[13px] font-500 outline-none transition-[background-color,border-color,color,box-shadow] duration-200",
                    "focus-visible:outline-none focus-visible:ring-0",
                    segment === s.key ? tabActive : tabIdle,
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div ref={sortWrapRef} className="relative shrink-0">
              <button
                type="button"
                onClick={() => setSortOpen((o) => !o)}
                className={cn(
                  "flex min-w-[200px] items-center justify-between gap-3 rounded-[8px] border border-[#dfdfda] bg-white px-4 py-2.5 text-left text-[13px] font-500 text-[#131311]",
                  "shadow-[0_4px_18px_rgba(19,19,17,0.06)] transition-[border-color,box-shadow] hover:border-[#c8c8c3] hover:shadow-[0_8px_24px_rgba(19,19,17,0.08)]",
                  sortOpen && "border-[#77d14d] shadow-[0_0_0_3px_rgba(119,209,77,0.15)]",
                )}
                aria-expanded={sortOpen}
                aria-haspopup="listbox"
                aria-label={tr.catalogPage.sortButton}
              >
                <span className="truncate">{currentSortLabel}</span>
                <ChevronDown
                  size={16}
                  className={cn("shrink-0 text-[#7c7c78] transition-transform", sortOpen && "rotate-180")}
                  aria-hidden
                />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.ul
                    role="listbox"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 z-30 mt-2 min-w-full overflow-hidden rounded-[8px] border border-[#e8e8e5] bg-white py-1 shadow-[0_16px_48px_rgba(19,19,17,0.14)]"
                  >
                    {sortOptions.map((opt) => (
                      <li key={opt.key} role="option" aria-selected={sort === opt.key}>
                        <button
                          type="button"
                          className={cn(
                            "w-full px-4 py-2.5 text-left text-[13px] transition-colors",
                            sort === opt.key
                              ? "bg-[#eefae8] font-600 text-[#2d6a1f]"
                              : "font-500 text-[#555552] hover:bg-[#f9f9f8] hover:text-[#131311]",
                          )}
                          onClick={() => {
                            setSort(opt.key);
                            setSortOpen(false);
                          }}
                        >
                          {opt.label}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>

          {segment === "residential" && (
            <div className="overflow-hidden rounded-[8px] border border-[#e8e8e5] bg-white shadow-[0_4px_22px_rgba(19,19,17,0.05)]">
              <button
                type="button"
                onClick={() => setResidentialLinesOpen((o) => !o)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#fafaf9] md:px-6 md:py-5"
                aria-expanded={residentialLinesOpen}
                aria-controls="catalog-residential-lines"
                id="catalog-residential-lines-heading"
                aria-label={`${tr.catalogPage.residentialModelsTitle} — ${residentialLinesOpen ? tr.catalogPage.residentialModelsCollapse : tr.catalogPage.residentialModelsExpand}`}
              >
                <span
                  className="text-[11px] font-600 uppercase tracking-[0.2em] text-[#131311]"
                  style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
                >
                  {tr.catalogPage.residentialModelsTitle}
                </span>
                <ChevronDown
                  size={18}
                  className={cn(
                    "shrink-0 text-[#7c7c78] transition-transform duration-300 ease-out",
                    residentialLinesOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>

              <AnimatePresence initial={false}>
                {residentialLinesOpen && (
                  <motion.div
                    id="catalog-residential-lines"
                    role="region"
                    aria-labelledby="catalog-residential-lines-heading"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden border-t border-[#ebebe8]"
                  >
                    <div className="px-5 pb-5 pt-1 md:px-6 md:pb-6">
                      <fieldset className="min-w-0 border-0 p-0 m-0">
                        <legend className="sr-only">{tr.catalogPage.residentialModelsTitle}</legend>
                        <div className="grid grid-cols-1 gap-x-10 gap-y-0.5 sm:grid-cols-2 lg:grid-cols-4">
                          {RESIDENTIAL_LINE_FILTERS.map((line) => {
                            const id = `res-line-${line}`;
                            const selected = residentialFilter === line;
                            return (
                              <label
                                key={line}
                                htmlFor={id}
                                className={cn(
                                  "flex cursor-pointer items-start gap-3 rounded-[6px] px-1 py-3 transition-colors md:py-3.5",
                                  "-mx-1 hover:bg-[#fafaf9]/90",
                                )}
                              >
                                <input
                                  id={id}
                                  type="radio"
                                  name="residential-model-line"
                                  value={line}
                                  checked={selected}
                                  onChange={() => setResidentialFilter(line)}
                                  className="sr-only"
                                />
                                <span
                                  className={cn(
                                    "relative mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 bg-white transition-[border-color,box-shadow] duration-200",
                                    selected
                                      ? "border-[#77d14d] shadow-[0_0_0_3px_rgba(119,209,77,0.12)]"
                                      : "border-[#d8d8d4]",
                                  )}
                                  aria-hidden
                                >
                                  <span
                                    className={cn(
                                      "h-2 w-2 rounded-full bg-[#77d14d] transition-transform duration-200",
                                      selected ? "scale-100" : "scale-0",
                                    )}
                                  />
                                </span>
                                <span
                                  className={cn(
                                    "min-w-0 flex-1 text-[14px] font-400 leading-snug tracking-tight transition-colors duration-200 sm:text-[15px]",
                                    selected ? "text-[#131311]" : "text-[#6b6b67]",
                                  )}
                                  style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
                                >
                                  {residentialFilterLabel(tr.catalogPage, line)}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </fieldset>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <div className="relative overflow-hidden rounded-[8px] border border-[#77d14d]/28 bg-[linear-gradient(168deg,#1c1b18_0%,#12110f_48%,#0a0a09_100%)] p-[1.35rem] shadow-[0_28px_80px_rgba(10,10,9,0.18),inset_0_1px_0_rgba(255,255,255,0.06)] md:p-[1.8rem]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(119,209,77,0.12),transparent)]" />
            <div className="relative grid gap-[2.25rem] md:grid-cols-2 md:gap-[2.7rem]">
              <AreaSliderRow
                label={tr.catalogPage.areaFrom}
                value={areaMin}
                locale={locale}
                onChange={setAreaMinSafe}
              />
              <AreaSliderRow
                label={tr.catalogPage.areaTo}
                value={areaMax}
                locale={locale}
                onChange={setAreaMaxSafe}
              />
            </div>
            <div className="relative mt-[0.9rem] flex justify-between text-[11px] text-white/30">
              <span>
                {AREA_MIN} {locale === "en" ? "m²" : "м²"}
              </span>
              <span>
                {AREA_MAX} {locale === "en" ? "m²" : "м²"}
              </span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center text-[#7c7c78]"
            >
              <p className="mb-2 text-xl">{tr.catalogPage.emptyTitle}</p>
              <p className="text-sm">{tr.catalogPage.emptySub}</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((house, i) => (
                <motion.div
                  key={house.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <PopularHouseCard house={house} priority={i < 3} surface="white" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
