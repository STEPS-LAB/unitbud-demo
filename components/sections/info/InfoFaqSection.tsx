"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import dynamic from "next/dynamic";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";
import { infoHouseFaqs } from "@/data/info/infoFaqs";
import { infoSaunaFaqs } from "@/data/info/saunaFaqs";
import { INFO_PANEL_HOVER, INFO_PILL_TRANSITION } from "@/lib/infoCardHover";
import { cn } from "@/lib/utils";

const ConsultationModal = dynamic(
  () => import("@/features/forms/ConsultationModal").then((m) => m.ConsultationModal),
);

type Tab = "houses" | "saunas";

export function InfoFaqSection() {
  const { locale, tr } = useLocale();
  const p = tr.infoPage;
  const [tab, setTab] = useState<Tab>("houses");
  const [openId, setOpenId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const list = tab === "houses" ? infoHouseFaqs : infoSaunaFaqs;
  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section id="faq" className="section-padding relative scroll-mt-[152px] md:scroll-mt-[156px] bg-[#f5f5f3]">
      <div className="container-wide">
        <SectionHeader
          title={tr.sections.faq}
          subtitle={p.faqSub}
          titleClassName="font-black"
          showTitleMarker
          className="mb-8 md:mb-10"
        />

        <div className="mb-6 flex flex-wrap gap-2 sm:mb-8">
          <button
            type="button"
            onClick={() => {
              setTab("houses");
              setOpenId(null);
            }}
            className={cn(
              "no-outline flex min-h-[44px] items-center justify-center rounded-full border px-5 text-[12px] font-semibold uppercase tracking-[0.12em]",
              INFO_PILL_TRANSITION,
              tab === "houses"
                ? "border-[#77d14d] bg-[#77d14d] text-[#3a3a38] shadow-[0_6px_20px_rgba(119,209,77,0.3)]"
                : "border-[#e0e0dc] bg-white text-[#555552] md:hover:border-[#77d14d]/50",
            )}
          >
            {p.faqTabHouses}
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("saunas");
              setOpenId(null);
            }}
            className={cn(
              "no-outline flex min-h-[44px] items-center justify-center rounded-full border px-5 text-[12px] font-semibold uppercase tracking-[0.12em]",
              INFO_PILL_TRANSITION,
              tab === "saunas"
                ? "border-[#77d14d] bg-[#77d14d] text-[#3a3a38] shadow-[0_6px_20px_rgba(119,209,77,0.3)]"
                : "border-[#e0e0dc] bg-white text-[#555552] md:hover:border-[#77d14d]/50",
            )}
          >
            {p.faqTabSaunas}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
          <div className="order-2 lg:order-1">
            <p className="text-[14px] leading-relaxed text-[#7c7c78]">{p.faqCtaLead}</p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="mt-4 inline-flex btn-primary btn-text-graphite text-sm px-5 py-2.5"
            >
              {tr.common.consultation}
            </button>
          </div>

          <div
            className={cn(
              "order-1 space-y-0 divide-y divide-[#e8e8e5] rounded-2xl border border-[#e8e8e5] bg-white px-2 lg:order-2 lg:px-4",
              INFO_PANEL_HOVER,
            )}
          >
            {list.map((faq, i) => (
              <motion.div
                key={`${tab}-${faq.id}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.03, 0.2), duration: 0.45 }}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="group flex w-full min-h-[52px] items-center justify-between gap-3 py-4 text-left transition-colors duration-500 ease-[0.22,1,0.36,1] sm:gap-4 sm:py-5 md:min-h-0"
                >
                  <span className="min-w-0 flex-1 pr-2 text-left text-[15px] font-semibold text-[#131311] transition-colors duration-500 ease-[0.22,1,0.36,1] md:group-hover:text-[#77d14d]">
                    {locale === "en" ? faq.questionEn ?? faq.question : faq.question}
                  </span>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#e8e8e5] text-[#77d14d] transition-[border-color,background-color] duration-500 ease-[0.22,1,0.36,1] md:group-hover:border-[#77d14d]/40">
                    {openId === faq.id ? <Minus size={14} strokeWidth={2} /> : <Plus size={14} />}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="pb-5 text-[14px] leading-relaxed text-[#555552]">
                        {locale === "en" ? faq.answerEn ?? faq.answer : faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
