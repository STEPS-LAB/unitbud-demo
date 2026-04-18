"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const StickyBookingBar = dynamic(
  () => import("@/components/shared/StickyBookingBar").then((m) => m.StickyBookingBar),
  { ssr: false },
);
const AiWidget = dynamic(
  () => import("@/components/shared/AiWidget").then((m) => m.AiWidget),
  { ssr: false },
);

/**
 * Після повного виходу #hero з вьюпорта: панель і AI плавно виїжджають знизу (однакова логіка slideOpen).
 * Монтаж вмісту відкладено до idle, аби не блокувати LCP/TTI на головній.
 */
export function HomeStickyChrome() {
  const [mounted, setMounted] = useState(false);
  const [chromeOpen, setChromeOpen] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const idle = (cb: () => void) => {
      const ric = (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback;
      if (typeof ric === "function") {
        ric(cb);
      } else {
        window.setTimeout(cb, 800);
      }
    };
    idle(() => setMounted(true));
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
    <>
      <StickyBookingBar slideFromBottom slideOpen={chromeOpen} />
      <AiWidget slideFromBottom slideOpen={chromeOpen} />
    </>
  );
}
