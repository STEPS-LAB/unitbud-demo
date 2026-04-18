"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const stripRef = useRef<HTMLDivElement>(null);

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
    // Header 88px + sticky sub-nav (~min 60px on mobile with 44px touch targets)
    const top = el.getBoundingClientRect().top + window.scrollY - 88 - 60;
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

  /** Горизонтальний ряд вкладок на мобільному: прокручуємо до активної, щоб вона була в зоні видимості. */
  useLayoutEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const scrollActiveIntoView = () => {
      if (typeof window.matchMedia === "undefined") return;
      if (!window.matchMedia("(max-width: 767px)").matches) return;
      const btn = strip.querySelector<HTMLElement>(`[data-info-pill="${active}"]`);
      btn?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    };

    scrollActiveIntoView();
    const mq = window.matchMedia("(max-width: 767px)");
    const onMq = () => scrollActiveIntoView();
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, [active]);

  return (
    <div
      className="sticky top-[88px] z-40 border-b border-[#e8e8e5] bg-white/90 shadow-[0_4px_24px_rgba(19,19,17,0.06)] backdrop-blur-md"
      role="navigation"
      aria-label="Info page sections"
    >
      <div className="container-wide py-2.5 md:py-3">
        <div
          ref={stripRef}
          className="scroll-x flex gap-2 pb-1 md:flex-wrap md:justify-center md:gap-2.5 md:overflow-visible md:pb-0"
        >
          {items.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                type="button"
                data-info-pill={id}
                onClick={() => scrollTo(id)}
                className={cn(
                  "no-outline flex min-h-[44px] shrink-0 items-center justify-center rounded-full border px-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] md:min-h-0 md:px-4 md:py-2",
                  INFO_PILL_TRANSITION,
                  isActive
                    ? "border-[#77d14d] bg-[#77d14d] text-[#3a3a38] shadow-[0_6px_20px_rgba(119,209,77,0.35)]"
                    : "border-[#e6e6e2] bg-white text-[#555552] md:hover:border-[#77d14d]/60 md:hover:text-[#131311]",
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
