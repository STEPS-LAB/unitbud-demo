"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import dynamic from "next/dynamic";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";
import { infoHouseFaqs } from "@/data/info/infoFaqs";
import { infoSaunaFaqs } from "@/data/info/saunaFaqs";
import { INFO_PILL_TRANSITION } from "@/lib/infoCardHover";
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

  const ctaBlock = (
    <>
      <p className="text-[14px] leading-relaxed text-[#7c7c78]">{p.faqCtaLead}</p>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="mt-4 inline-flex btn-primary btn-text-graphite px-5 py-2.5 text-sm"
      >
        {tr.common.consultation}
      </button>
    </>
  );

  return (
    <section id="faq" className="section-padding relative scroll-mt-[152px] md:scroll-mt-[156px] bg-white">
      <div className="container-wide">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-x-20 lg:gap-y-0">
          <div className="order-1 flex w-full max-w-xl shrink-0 flex-col gap-0 lg:max-w-md">
            <SectionHeader
              title={tr.sections.faq}
              subtitle={tr.sections.faqSub}
              titleClassName="font-black"
              showTitleMarker
              className="mb-0 lg:mb-0"
            />
            <div className="mt-4 hidden lg:block">{ctaBlock}</div>
          </div>

          <div className="order-2 flex min-w-0 flex-1 flex-col gap-3">
            <div className="flex flex-wrap gap-2">
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

            <div className="min-w-0 space-y-0 divide-y divide-[#e8e8e5]">
              {list.map((faq, i) => (
                <motion.div
                  key={`${tab}-${faq.id}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    className="group flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-[15px] font-600 text-[#131311] transition-colors group-hover:text-[#77d14d]">
                      {locale === "en" ? faq.questionEn ?? faq.question : faq.question}
                    </span>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#e8e8e5] text-[#77d14d]">
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

          <div className="order-3 lg:hidden">{ctaBlock}</div>
        </div>
      </div>

      {modalOpen && <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />}
    </section>
  );
}
