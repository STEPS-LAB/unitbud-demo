"use client";

import { useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { AI_WIDGET_BOTTOM_MOBILE } from "@/lib/mobileSticky";
import { CHROME_SLIDE_DURATION, CHROME_SLIDE_EASE } from "@/lib/slideChrome";
import { cn } from "@/lib/utils";

type Props = {
  /** Інші сторінки: керування opacity/transform ззовні. */
  overlayStyle?: CSSProperties;
  /** Головна: той самий виїзд знизу, що й у панелі консультації. */
  slideFromBottom?: boolean;
  slideOpen?: boolean;
};

const ROOT_CLASS = cn(
  "fixed right-4 z-30 will-change-transform lg:bottom-6 lg:right-6",
  AI_WIDGET_BOTTOM_MOBILE,
);

export function AiWidget({ overlayStyle, slideFromBottom, slideOpen = false }: Props) {
  const { locale, tr } = useLocale();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const initialMessage =
    locale === "en"
      ? "Hi! I'm Unitbud's AI assistant.\nI know everything about our houses.\nHow can I help you?"
      : "Привіт! Я AI-помічник Unitbud.\nЯ знаю все про наші будинки.\nЧим можу допомогти?";

  const inner = (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full right-0 mb-3 w-72 sm:w-80 overflow-hidden rounded-[8px] bg-white"
            style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.16)" }}
          >
            <div className="flex items-center justify-between bg-[#131311] px-4 py-3.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#77d14d]">
                  <span className="text-[10px] font-700 text-white">AI</span>
                </div>
                <div>
                  <p className="text-[13px] font-500 text-white">{locale === "en" ? "AI assistant" : "AI-помічник"}</p>
                  <p className="text-[10px] text-white/40">Unitbud Assistant</p>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="text-white/50 transition-colors hover:text-white">
                <X size={15} />
              </button>
            </div>

            <div className="min-h-[120px] p-4">
              <div className="flex gap-2.5">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#f4f6f0]">
                  <span className="text-[10px] font-700 text-[#77d14d]">AI</span>
                </div>
                <div className="rounded-[4px] rounded-tl-0 bg-[#f9f9f8] px-3.5 py-2.5 text-[13px] leading-relaxed text-[#3a3a38] whitespace-pre-line">
                  {initialMessage}
                </div>
              </div>
            </div>

            <div className="flex gap-2 border-t border-[#e8e8e5] px-3 py-2.5">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={tr.common.askAnything + "..."}
                className="flex-1 bg-transparent py-1 text-[13px] text-[#131311] outline-none placeholder:text-[#a8a8a3]"
                onKeyDown={(e) => {
                  if (e.key === "Enter") setInput("");
                }}
              />
              <button type="button" onClick={() => setInput("")} className="p-1.5 text-[#77d14d] transition-colors hover:text-[#4e8f31]">
                <Send size={14} />
              </button>
            </div>

            <div className="bg-[#f9f9f8] px-4 py-2 text-center">
              <p className="text-[10px] text-[#a8a8a3]">UI Demo · Real AI coming soon</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#77d14d] text-white transition-colors duration-200 hover:bg-[#4e8f31]"
        style={{ boxShadow: "0 4px 20px rgba(119,209,77,0.4)" }}
        aria-label={tr.common.askAnything}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={18} />
            </motion.div>
          ) : (
            <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={18} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {!open && (
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.4 }}
          className="pointer-events-none absolute top-1/2 right-full mr-3 -translate-y-1/2 rounded-[4px] bg-[#131311] px-3 py-1.5 text-[12px] font-500 whitespace-nowrap text-white"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}
        >
          {tr.common.askAnything}
          <div className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2 border-4 border-transparent border-l-[#131311]" />
        </motion.div>
      )}
    </>
  );

  if (slideFromBottom) {
    return (
      <motion.div
        className={ROOT_CLASS}
        initial={false}
        animate={{
          y: slideOpen ? 0 : "100%",
          opacity: slideOpen ? 1 : 0,
        }}
        transition={{ duration: CHROME_SLIDE_DURATION, ease: CHROME_SLIDE_EASE }}
        style={{ pointerEvents: slideOpen ? "auto" : "none" }}
      >
        {inner}
      </motion.div>
    );
  }

  return (
    <div className={ROOT_CLASS} style={overlayStyle}>
      {inner}
    </div>
  );
}
