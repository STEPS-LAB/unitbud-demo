"use client";

import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/*
 * Клієнт-враппери для важких нижче-fold-секцій (Calculator, Consultation).
 * ВАЖЛИВО: використовуємо React.lazy, а не next/dynamic.
 *
 * Причина: next/dynamic({ ssr: false }) через loadable-runtime після
 * hydration автоматично викликає `.preload()` на всі зареєстровані
 * lazy-компоненти — це підтягує chunks (react-hook-form + zod +
 * framer-motion, ~38 КБ gz) одразу після mount, ще до того як секція
 * дійшла до viewport. Lighthouse/Lantern зараховує це у критичний шлях
 * LCP (~150 мс).
 *
 * React.lazy поводиться інакше: chunk вантажиться ЛИШЕ коли компонент
 * реально рендериться у tree. Тому поки LazyMount не зробив setVisible,
 * chunk не запитується. Це прибирає framer-motion/zod з Lantern-LCP.
 */

const CalculatorSectionInner = lazy(() =>
  import("@/features/calculator/CalculatorSection").then((m) => ({
    default: m.CalculatorSection,
  })),
);

const ConsultationSectionInner = lazy(() =>
  import("@/components/sections/ConsultationSection").then((m) => ({
    default: m.ConsultationSection,
  })),
);

function reservedSpaceStyle(minHeight: number): CSSProperties {
  return {
    minHeight: `${minHeight}px`,
    width: "100%",
  };
}

function LazyMount({
  minHeight,
  children,
  rootMargin = "600px 0px",
}: {
  minHeight: number;
  children: ReactNode;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(node);

    const timer = window.setTimeout(() => setVisible(true), 4000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [visible, rootMargin]);

  return (
    <div ref={ref} style={visible ? undefined : reservedSpaceStyle(minHeight)}>
      {visible ? children : null}
    </div>
  );
}

export function DeferredCalculatorSection() {
  return (
    <LazyMount minHeight={640}>
      <Suspense fallback={<div style={reservedSpaceStyle(640)} aria-hidden />}>
        <CalculatorSectionInner />
      </Suspense>
    </LazyMount>
  );
}

export function DeferredConsultationSection() {
  return (
    <LazyMount minHeight={560}>
      <Suspense fallback={<div style={reservedSpaceStyle(560)} aria-hidden />}>
        <ConsultationSectionInner />
      </Suspense>
    </LazyMount>
  );
}
