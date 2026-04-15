"use client";

import { useState, useEffect } from "react";

export function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const hysteresis = 12;
    const enterAt = threshold + hysteresis;
    const exitAt = Math.max(0, threshold - hysteresis);

    const handler = () => {
      const y = Math.max(window.scrollY, 0);

      setScrolled((prev) => {
        if (!prev) return y > enterAt;
        return y > exitAt;
      });
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return scrolled;
}
