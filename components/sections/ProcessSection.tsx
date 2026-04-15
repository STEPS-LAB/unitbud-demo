"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/data/process";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";
import {
  MessageCircle,
  FileText,
  Layers,
  Home,
  Wrench,
  Key,
} from "lucide-react";

const iconMap = {
  MessageCircle,
  FileText,
  Layers,
  Home,
  Wrench,
  Key,
};

export function ProcessSection() {
  const { tr } = useLocale();

  return (
    <section id="process" className="section-padding bg-white">
      <div className="container-wide">
        <SectionHeader
          label="Процес"
          title={tr.sections.process}
          subtitle={tr.sections.processSub}
        />

        {/* Desktop: vertical timeline */}
        <div className="hidden md:block relative">
          {/* Vertical line */}
          <div className="absolute left-[23px] top-4 bottom-4 w-px bg-[#e8e8e5]" />

          <div className="space-y-0">
            {processSteps.map((step, i) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex gap-8 pb-10 last:pb-0"
                >
                  {/* Dot */}
                  <div className="flex-shrink-0 relative z-10 w-12 h-12 rounded-full bg-white border-2 border-[#e8e8e5] flex items-center justify-center mt-1 transition-colors">
                    <Icon size={18} className="text-[#77d14d]" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8 border-b border-[#f2f2f0] last:border-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[11px] font-600 text-[#77d14d] uppercase tracking-wider">
                        Крок {step.id}
                      </span>
                      <span className="h-px flex-1 bg-[#f2f2f0]" />
                      <span className="text-[12px] text-[#a8a8a3]">{step.duration}</span>
                    </div>
                    <h3
                      className="text-lg font-500 text-[#131311] mb-2 tracking-tight"
                      style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[14px] text-[#555552] leading-relaxed max-w-xl">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden scroll-x flex gap-4 pb-4 -mx-5 px-5">
          {processSteps.map((step, i) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="flex-shrink-0 w-64 bg-[#f9f9f8] border border-[#e8e8e5] rounded-[6px] p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-white border border-[#e8e8e5] flex items-center justify-center">
                    <Icon size={16} className="text-[#77d14d]" strokeWidth={1.5} />
                  </div>
                  <span className="text-[11px] font-600 text-[#77d14d] uppercase tracking-wider">
                    Крок {step.id}
                  </span>
                </div>
                <h3
                  className="text-base font-500 text-[#131311] mb-2"
                  style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-[13px] text-[#555552] leading-relaxed">{step.description}</p>
                <p className="mt-3 text-[11px] text-[#a8a8a3]">{step.duration}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
