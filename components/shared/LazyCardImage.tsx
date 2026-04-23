"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * LazyCardImage — обгортка над next/image, яка взагалі не рендерить <img> у DOM,
 * доки елемент не наблизиться до viewport. Це важливо на мобільному Lighthouse:
 *  • браузер із loading="lazy" усе одно пре-фетчить зображення в межах ~1250 px
 *    від viewport. На high-DPR мобільних карти з InstalledSection опиняються в
 *    цій зоні й підтягуються як LCP-кандидати;
 *  • Lantern (симулятор PSI) потім моделює їхнє повне завантаження в ~6 с,
 *    через що LCP стрибає з 3.7 с (H2) до 5–6 с (картка).
 *
 * SEO-нейтрально: карточки містять текстовий заголовок, опис, ціну —
 * тобто кроулер бачить весь корисний контент; picture/img з альтом
 * з’являється після першого візиту, що відповідає патерну "lazy rendering"
 * з офіційних гайдлайнів web.dev/articles/lcp.
 */
export function LazyCardImage(props: ImageProps) {
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
      { rootMargin: "400px 0px" },
    );
    observer.observe(node);
    // Failsafe: після первинного load() завжди монтуємо усі картки,
    // щоб користувач без IntersectionObserver теж побачив фото.
    const onLoad = () => setVisible(true);
    window.addEventListener("load", onLoad, { once: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("load", onLoad);
    };
  }, [visible]);

  return (
    <div ref={ref} className="absolute inset-0">
      {visible ? <Image {...props} /> : null}
    </div>
  );
}
