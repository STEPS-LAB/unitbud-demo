"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export function AiWidget() {
  const { locale, tr } = useLocale();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const initialMessage =
    locale === "en"
      ? "Hi! I'm Unitbud's AI assistant.\nI know everything about our houses.\nHow can I help you?"
      : "Привіт! Я AI-помічник Unitbud.\nЯ знаю все про наші будинки.\nЧим можу допомогти?";

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50">
      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full right-0 mb-3 w-72 sm:w-80 bg-white rounded-[8px] overflow-hidden"
            style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.16)" }}
          >
            {/* Header */}
            <div className="bg-[#131311] px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#77d14d] flex items-center justify-center">
                  <span className="text-white text-[10px] font-700">AI</span>
                </div>
                <div>
                  <p className="text-white text-[13px] font-500">{locale === "en" ? "AI assistant" : "AI-помічник"}</p>
                  <p className="text-white/40 text-[10px]">Unitbud Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Messages */}
            <div className="p-4 min-h-[120px]">
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#f4f6f0] flex-shrink-0 flex items-center justify-center">
                  <span className="text-[#77d14d] text-[10px] font-700">AI</span>
                </div>
                <div className="bg-[#f9f9f8] rounded-[4px] rounded-tl-0 px-3.5 py-2.5 text-[13px] text-[#3a3a38] leading-relaxed whitespace-pre-line">
                  {initialMessage}
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-[#e8e8e5] px-3 py-2.5 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={tr.common.askAnything + "..."}
                className="flex-1 text-[13px] text-[#131311] placeholder-[#a8a8a3] outline-none bg-transparent py-1"
                onKeyDown={(e) => { if (e.key === "Enter") setInput(""); }}
              />
              <button
                onClick={() => setInput("")}
                className="p-1.5 text-[#77d14d] hover:text-[#4e8f31] transition-colors"
              >
                <Send size={14} />
              </button>
            </div>

            <div className="bg-[#f9f9f8] px-4 py-2 text-center">
              <p className="text-[10px] text-[#a8a8a3]">UI Demo · Real AI coming soon</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((v) => !v)}
        className="w-12 h-12 bg-[#77d14d] hover:bg-[#4e8f31] rounded-full text-white flex items-center justify-center transition-colors duration-200"
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

      {/* Label tooltip */}
      {!open && (
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.4 }}
          className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-[#131311] text-white text-[12px] font-500 px-3 py-1.5 rounded-[4px] whitespace-nowrap pointer-events-none"
          style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}
        >
          {tr.common.askAnything}
          <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-full border-4 border-transparent border-l-[#131311]" />
        </motion.div>
      )}
    </div>
  );
}
