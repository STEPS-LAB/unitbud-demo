"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale } from "@/hooks/useLocale";
import { INFO_PILL_TRANSITION } from "@/lib/infoCardHover";
import { cn } from "@/lib/utils";

const SECTION_IDS = [
  "payment",
  "delivery",
  "transport",
  "installation",
  "advantages",
  "about-modular",
  "fast-houses",
  "saunas",
  "faq",
] as const;

export function InfoSubNav() {
  const { tr } = useLocale();
  const p = tr.infoPage;
  const [active, setActive] = useState<string>(SECTION_IDS[0]);

  const items: { id: (typeof SECTION_IDS)[number]; label: string }[] = [
    { id: "payment", label: p.navPayment },
    { id: "delivery", label: p.navDelivery },
    { id: "transport", label: p.navTransport },
    { id: "installation", label: p.navInstallation },
    { id: "advantages", label: p.navAdvantages },
    { id: "about-modular", label: p.navModular },
    { id: "fast-houses", label: p.navFast },
    { id: "saunas", label: p.navSaunas },
    { id: "faq", label: p.navFaq },
  ];

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 88 - 56;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    setActive(id);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-38% 0px -52% 0px", threshold: [0, 0.15, 0.35, 0.55, 0.75, 1] },
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  return (
    <div
      className="sticky top-[88px] z-40 border-b border-[#e8e8e5] bg-white/90 shadow-[0_4px_24px_rgba(19,19,17,0.06)] backdrop-blur-md"
      role="navigation"
      aria-label="Info page sections"
    >
      <div className="container-wide py-3">
        <div className="scroll-x flex gap-2 pb-0.5 md:flex-wrap md:justify-center md:gap-2.5 md:overflow-visible md:pb-0">
          {items.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className={cn(
                  "no-outline shrink-0 rounded-full border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] md:px-4",
                  INFO_PILL_TRANSITION,
                  isActive
                    ? "border-[#77d14d] bg-[#77d14d] text-[#3a3a38] shadow-[0_6px_20px_rgba(119,209,77,0.35)]"
                    : "border-[#e6e6e2] bg-white text-[#555552] hover:border-[#77d14d]/60 hover:text-[#131311]",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
