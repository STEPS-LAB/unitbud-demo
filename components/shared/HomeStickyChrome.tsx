"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { StickyBookingBar } from "@/components/shared/StickyBookingBar";
import { AiWidget } from "@/components/shared/AiWidget";

/**
 * Після повного виходу #hero з вьюпорта: панель і AI плавно виїжджають знизу (однакова логіка slideOpen).
 */
export function HomeStickyChrome() {
  const [chromeOpen, setChromeOpen] = useState(false);
  const rafRef = useRef<number | null>(null);

  useLayoutEffect(() => {
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
  }, []);

  return (
    <>
      <StickyBookingBar slideFromBottom slideOpen={chromeOpen} />
      <AiWidget slideFromBottom slideOpen={chromeOpen} />
    </>
  );
}
