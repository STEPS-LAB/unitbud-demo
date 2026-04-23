"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}

/**
 * Лёгкий reveal-on-scroll: IntersectionObserver + CSS-transition.
 * Замінює framer-motion у некритичних секціях, щоб прибрати ~100 КБ JS
 * з lazy-chunk'ів і пришвидшити TTI/LCP на мобільному.
 */
export function RevealOnScroll({ children, delay = 0, direction = "up", className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect prefers-reduced-motion — показуємо одразу без анімації.
    const reduced =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    // Fallback коли IntersectionObserver недоступний (дуже старі браузери) —
    // просто показуємо одразу, щоб контент не зник.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const translate = !visible
    ? direction === "up"
      ? "translate3d(0, 28px, 0)"
      : direction === "left"
        ? "translate3d(-28px, 0, 0)"
        : direction === "right"
          ? "translate3d(28px, 0, 0)"
          : "translate3d(0, 0, 0)"
    : "translate3d(0, 0, 0)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: translate,
        transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: visible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
