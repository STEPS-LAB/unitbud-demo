"use client";

import { useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ConsultationModal = dynamic(
  () => import("@/features/forms/ConsultationModal").then((m) => m.ConsultationModal),
);
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";
import { CHROME_SLIDE_DURATION, CHROME_SLIDE_EASE } from "@/lib/slideChrome";

const BAR_PANEL_CLASS =
  "lg:hidden fixed bottom-0 inset-x-0 z-30 flex border-t border-[#e8e8e5] bg-white px-4 py-3";

type Props = {
  /** Інші сторінки: без sticky-bar, якщо задано — керування opacity ззовні. */
  overlayStyle?: CSSProperties;
  /** Головна: виїзд знизу за slideOpen (без sticky-bar / overlayStyle). */
  slideFromBottom?: boolean;
  slideOpen?: boolean;
};

export function StickyBookingBar({ overlayStyle, slideFromBottom, slideOpen = false }: Props) {
  const { tr } = useLocale();
  const [open, setOpen] = useState(false);

  const button = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="btn-primary btn-text-graphite w-full py-3 text-sm"
    >
      {tr.common.consultation}
    </button>
  );

  return (
    <>
      {slideFromBottom ? (
        <motion.div
          className={cn(BAR_PANEL_CLASS, "will-change-transform")}
          initial={false}
          animate={{
            y: slideOpen ? 0 : "100%",
            opacity: slideOpen ? 1 : 0,
          }}
          transition={{ duration: CHROME_SLIDE_DURATION, ease: CHROME_SLIDE_EASE }}
          style={{ pointerEvents: slideOpen ? "auto" : "none" }}
        >
          {button}
        </motion.div>
      ) : (
        <div
          className={cn(BAR_PANEL_CLASS, overlayStyle == null && "sticky-bar")}
          style={overlayStyle}
        >
          {button}
        </div>
      )}

      {open && <ConsultationModal open={open} onClose={() => setOpen(false)} />}
    </>
  );
}
