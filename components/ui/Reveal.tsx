"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/*
 * Reveal — легкий IntersectionObserver-базований аналог того, що раніше робив
 * framer-motion (motion.div initial + whileInView). Використовуємо чистий CSS
 * transition на opacity/transform, що коштує ~1.5 КБ gz замість ~40 КБ chunk
 * framer-motion у головному бандлі.
 *
 * Чому це важливо для Lighthouse:
 *  - framer-motion імпортувався з PopularSection/WhySection/ProcessSection/
 *    ReviewsSection/FaqSection/HouseCard. Усі ці секції SSR-рендеряться в
 *    `app/page.tsx` (немає ssr:false), тож webpack складав framer-motion у
 *    спільний chunk, який тягнеться на ініціальному рендері. Це 38 КБ gz /
 *    ~117 КБ raw у критичному JS-шляху → Lantern додавав ~600–800 мс LCP.
 *  - Тепер на main-бандлі framer-motion лишається лише через dynamic({ssr:false})
 *    секції (CalculatorSection, ConsultationSection, AiWidget, модалки), які
 *    ліниво підвантажуються і не впливають на LCP.
 *
 * API наближений до оригіналу:
 *   <Reveal delay={0.1} y={24}>...</Reveal>   // default: fade + translateY
 *   <Reveal as="article" className="..." >   // custom tag
 */

type RevealProps = {
  children: ReactNode;
  /** HTML-тег обгортки. Default: div. */
  as?: ElementType;
  /** Початковий зсув по Y у px. Default: 24. */
  y?: number;
  /** Затримка старту анімації (секунди). */
  delay?: number;
  /** Тривалість (секунди). Default: 0.55. */
  duration?: number;
  /** Easing CSS. Default: cubic-bezier(0.22, 1, 0.36, 1). */
  ease?: string;
  /** rootMargin для IntersectionObserver. Default: "-40px 0px". */
  rootMargin?: string;
  className?: string;
  style?: CSSProperties;
};

export function Reveal({
  children,
  as,
  y = 24,
  delay = 0,
  duration = 0.55,
  ease = "cubic-bezier(0.22, 1, 0.36, 1)",
  rootMargin = "-40px 0px",
  className,
  style,
}: RevealProps) {
  const Tag = (as || "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
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
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  const mergedStyle: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`,
    transition: `opacity ${duration}s ${ease} ${delay}s, transform ${duration}s ${ease} ${delay}s`,
    willChange: visible ? undefined : "opacity, transform",
    ...style,
  };

  return (
    <Tag ref={ref} className={className} style={mergedStyle}>
      {children}
    </Tag>
  );
}
