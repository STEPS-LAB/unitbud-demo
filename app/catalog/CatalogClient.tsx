"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { houses } from "@/data/houses";
import { HouseCard } from "@/components/ui/HouseCard";
import { House } from "@/types";
import { useLocale } from "@/hooks/useLocale";
import { formatAreaSqm } from "@/lib/utils";

type Category = House["category"] | "all";
type SortKey = "price-asc" | "price-desc" | "area-asc" | "area-desc";

export function CatalogClient() {
  const { tr, locale } = useLocale();
  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState<SortKey>("price-asc");
  const [areaMin, setAreaMin] = useState(50);
  const [areaMax, setAreaMax] = useState(300);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const categories: { key: Category; label: string }[] = [
    { key: "all", label: tr.catalogPage.catAll },
    { key: "compact", label: tr.catalogPage.catCompact },
    { key: "comfort", label: tr.catalogPage.catComfort },
    { key: "premium", label: tr.catalogPage.catPremium },
    { key: "elite", label: tr.catalogPage.catElite },
  ];
  const sortOptions: { key: SortKey; label: string }[] = [
    { key: "price-asc", label: tr.catalogPage.sortPriceAsc },
    { key: "price-desc", label: tr.catalogPage.sortPriceDesc },
    { key: "area-asc", label: tr.catalogPage.sortAreaAsc },
    { key: "area-desc", label: tr.catalogPage.sortAreaDesc },
  ];

  const filtered = useMemo(() => {
    let list = houses.filter(
      (h) =>
        (category === "all" || h.category === category) &&
        h.area >= areaMin &&
        h.area <= areaMax
    );
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "area-asc") return a.area - b.area;
      if (sort === "area-desc") return b.area - a.area;
      return 0;
    });
    return list;
  }, [category, sort, areaMin, areaMax]);

  return (
    <div className="section-padding">
      <div className="container-wide">
        {/* Page header */}
        <div className="mb-10">
          <span className="section-label mb-3">{tr.nav.catalog}</span>
          <h1
            className="text-4xl md:text-5xl font-300 text-[#131311] tracking-tight mt-3"
            style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
          >
            {tr.catalogPage.title}
          </h1>
          <p className="mt-3 text-[#555552] text-base">
            {filtered.length} {tr.catalogPage.modelsInCatalog}
          </p>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap gap-3 items-center justify-between mb-8">
          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={[
                  "px-4 py-2 text-[13px] font-500 rounded-[4px] border transition-all duration-200",
                  category === c.key
                    ? "bg-[#77d14d] border-[#77d14d] text-white"
                    : "bg-white border-[#e8e8e5] text-[#555552] hover:border-[#77d14d]",
                ].join(" ")}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3 items-center">
            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="input-field py-2 text-[13px] w-auto pr-8"
              style={{ minWidth: "180px" }}
            >
              {sortOptions.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>

            {/* Filters toggle */}
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className="btn-outline py-2 px-4 text-[13px] flex items-center gap-2"
            >
              <SlidersHorizontal size={14} />
              {tr.catalogPage.filters}
              {filtersOpen && <X size={13} className="ml-0.5" />}
            </button>
          </div>
        </div>

        {/* Extended filters */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-[#f9f9f8] border border-[#e8e8e5] rounded-[6px] p-6 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-500 text-[#3a3a38] block mb-3">
                      {tr.catalogPage.areaFrom} {formatAreaSqm(areaMin, locale)}
                    </label>
                    <input
                      type="range"
                      min={50}
                      max={300}
                      step={10}
                      value={areaMin}
                      onChange={(e) => setAreaMin(Math.min(Number(e.target.value), areaMax - 10))}
                      className="w-full accent-[#77d14d]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-500 text-[#3a3a38] block mb-3">
                      {tr.catalogPage.areaTo} {formatAreaSqm(areaMax, locale)}
                    </label>
                    <input
                      type="range"
                      min={50}
                      max={300}
                      step={10}
                      value={areaMax}
                      onChange={(e) => setAreaMax(Math.max(Number(e.target.value), areaMin + 10))}
                      className="w-full accent-[#77d14d]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center text-[#7c7c78]"
            >
              <p className="text-xl mb-2">{tr.catalogPage.emptyTitle}</p>
              <p className="text-sm">{tr.catalogPage.emptySub}</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((house, i) => (
                <motion.div
                  key={house.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <HouseCard house={house} priority={i < 3} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
