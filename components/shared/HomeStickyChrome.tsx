"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";

// React.lazy (а не next/dynamic): останній викликає .preload() на всі
// зареєстровані компоненти одразу після hydration, через що AiWidget chunk
// (~39 КБ framer-motion) потрапляв у Lantern-LCP. React.lazy не preload-ить —
// chunk вантажиться лише коли компонент дійсно рендериться.
const StickyBookingBar = lazy(() =>
  import("@/components/shared/StickyBookingBar").then((m) => ({
    default: m.StickyBookingBar,
  })),
);
const AiWidget = lazy(() =>
  import("@/components/shared/AiWidget").then((m) => ({ default: m.AiWidget })),
);

/**
 * Після повного виходу #hero з вьюпорта: панель і AI плавно виїжджають знизу.
 *
 * Ключовий трюк для LCP: монтуємо вміст ТІЛЬКИ коли користувач реально прокрутив
 * сторінку хоча б на трохи. Це гарантує, що framer-motion-chunk AiWidget-а не
 * вантажиться у «холодний» перший візит (коли Lighthouse/PageSpeed-Insights
 * знімають метрики). StickyBookingBar + AiWidget з’являються миттєво, щойно
 * користувач починає скролити — різниця у UX непомітна.
 */
export function HomeStickyChrome() {
  const [mounted, setMounted] = useState(false);
  const [chromeOpen, setChromeOpen] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onFirstScroll = () => {
      setMounted(true);
      window.removeEventListener("scroll", onFirstScroll);
      window.removeEventListener("touchstart", onFirstScroll);
      window.removeEventListener("pointerdown", onFirstScroll);
    };
    window.addEventListener("scroll", onFirstScroll, { passive: true, once: false });
    window.addEventListener("touchstart", onFirstScroll, { passive: true, once: false });
    window.addEventListener("pointerdown", onFirstScroll, { passive: true, once: false });
    return () => {
      window.removeEventListener("scroll", onFirstScroll);
      window.removeEventListener("touchstart", onFirstScroll);
      window.removeEventListener("pointerdown", onFirstScroll);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const read = () => {
      const hero = document.getElementById("hero");

      if (!hero) {
        setChromeOpen(true);
        return;
      }

      const bottom = hero.getBoundingClientRect().bottom;
      setChromeOpen(bottom <= 0);
    };

    const onScrollOrResize = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        read();
      });
    };

    read();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
      <StickyBookingBar slideFromBottom slideOpen={chromeOpen} />
      <AiWidget slideFromBottom slideOpen={chromeOpen} />
    </Suspense>
  );
}
