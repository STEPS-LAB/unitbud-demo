"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/data/faq";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { useLocale } from "@/hooks/useLocale";
import { useConsultationModal } from "@/components/shared/useConsultationModal";

export function FaqSection() {
  const { locale, tr } = useLocale();
  const [openId, setOpenId] = useState<string | null>(null);
  const { open: openModal, modal: consultationModal } = useConsultationModal();

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
            {faqs.map((faq, i) => {
              const isOpen = openId === faq.id;
              return (
                <Reveal key={faq.id} y={16} delay={i * 0.05} duration={0.5}>
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] font-600 text-[#131311] group-hover:text-[#77d14d] transition-colors">
                      {locale === "en" ? faq.questionEn ?? faq.question : faq.question}
                    </span>
                    <div className="flex-shrink-0 w-7 h-7 rounded-full border border-[#e8e8e5] flex items-center justify-center text-[#77d14d]">
                      {isOpen ? <Minus size={14} strokeWidth={2} /> : <Plus size={14} />}
                    </div>
                  </button>

                  {/*
                   * CSS grid-rows-[0fr|1fr] trick: анімуємо висоту від 0 до auto
                   * без JS. Це вирішує той самий ефект, що AnimatePresence з
                   * framer-motion, але без ~40 КБ коду в бандлі.
                   */}
                  <div
                    className="grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 text-[14px] text-[#555552] leading-relaxed">
                        {locale === "en" ? faq.answerEn ?? faq.answer : faq.answer}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
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
              onClick={openModal}
              className="mt-4 inline-flex btn-primary btn-text-graphite text-sm px-5 py-2.5"
            >
              {tr.common.consultation}
            </button>
          </div>
        </div>
      </div>

      {consultationModal}
    </section>
  );
}
