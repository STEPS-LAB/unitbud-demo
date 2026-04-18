"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/data/faq";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";
import dynamic from "next/dynamic";

const ConsultationModal = dynamic(
  () => import("@/features/forms/ConsultationModal").then((m) => m.ConsultationModal),
);

export function FaqSection() {
  const { locale, tr } = useLocale();
  const [openId, setOpenId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:grid-rows-[auto_auto] lg:gap-x-20 lg:gap-y-0 lg:items-start">
          {/* Title block: first on mobile, top-left on desktop */}
          <div className="order-1 lg:col-start-1 lg:row-start-1">
            <SectionHeader
              title={tr.sections.faq}
              subtitle={tr.sections.faqSub}
              titleClassName="font-black"
              showTitleMarker
              className="lg:mb-0"
            />
          </div>

          {/* FAQ list: after title on mobile, right column full height on desktop */}
          <div className="order-2 space-y-0 divide-y divide-[#e8e8e5] lg:col-start-2 lg:row-start-1 lg:row-span-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                >
                  <span className="text-[15px] font-600 text-[#131311] group-hover:text-[#77d14d] transition-colors">
                    {locale === "en" ? faq.questionEn ?? faq.question : faq.question}
                  </span>
                  <div className="flex-shrink-0 w-7 h-7 rounded-full border border-[#e8e8e5] flex items-center justify-center text-[#77d14d]">
                    {openId === faq.id ? <Minus size={14} strokeWidth={2} /> : <Plus size={14} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="pb-5 text-[14px] text-[#555552] leading-relaxed">
                        {locale === "en" ? faq.answerEn ?? faq.answer : faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* CTA: last on mobile, under title on desktop */}
          <div className="order-3 lg:col-start-1 lg:row-start-2">
            <p className="text-[14px] text-[#7c7c78] leading-relaxed">
              {locale === "en"
                ? "Didn't find the answer? Call us or leave a request, and we'll answer any question."
                : "Не знайшли відповідь? Зателефонуйте нам або залиште заявку — відповімо на будь-яке запитання."}
            </p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="mt-4 inline-flex btn-primary btn-text-graphite text-sm px-5 py-2.5"
            >
              {tr.common.consultation}
            </button>
          </div>
        </div>
      </div>

      {modalOpen && <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />}
    </section>
  );
}
