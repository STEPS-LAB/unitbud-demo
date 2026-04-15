"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Clock,
  Eye,
  Hammer,
  Trophy,
  HeartHandshake,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";

export function WhySection() {
  const { locale, tr } = useLocale();
  const reasons = locale === "en"
    ? [
        { icon: ShieldCheck, title: "10-year warranty", desc: "Full warranty for structural elements. Our in-house quality control team monitors every stage." },
        { icon: Clock, title: "Contracted timelines", desc: "We fix deadlines in the contract and strictly follow them. Delay risk is on us." },
        { icon: Eye, title: "Full transparency", desc: "Daily photo reports, a client dashboard, and video calls with the site manager anytime." },
        { icon: Hammer, title: "In-house team", desc: "All work is done by our own crews. No subcontractors, only a proven team." },
        { icon: Trophy, title: "200+ completed projects", desc: "Over 10 years of experience and 200+ happy families across Ukraine." },
        { icon: HeartHandshake, title: "Post-handover support", desc: "We stay with you after key handover. Service support is available throughout warranty period." },
      ]
    : [
        {
          icon: ShieldCheck,
          title: "Гарантія 10 років",
          desc: "Повна гарантія на конструктивні елементи. Власний відділ контролю якості на кожному етапі будівництва.",
        },
        {
          icon: Clock,
          title: "Терміни з договором",
          desc: "Фіксуємо терміни в договорі та суворо їх дотримуємось. Затримка — наша відповідальність.",
        },
        {
          icon: Eye,
          title: "Повна прозорість",
          desc: "Щоденні фотозвіти, онлайн-кабінет клієнта та відеодзвінки з прорабом у будь-який момент.",
        },
        {
          icon: Hammer,
          title: "Власна бригада",
          desc: "Всі роботи виконуємо власними силами. Жодних субпідрядників — тільки перевірена команда.",
        },
        {
          icon: Trophy,
          title: "200+ реалізованих проєктів",
          desc: "Понад 10 років досвіду та понад 200 щасливих сімей по всій Україні — наш найкращий доказ.",
        },
        {
          icon: HeartHandshake,
          title: "Підтримка після здачі",
          desc: "Не зникаємо після здачі ключів. Сервісна служба на зв'язку впродовж всього гарантійного терміну.",
        },
      ];

  return (
    <section id="why" className="section-padding bg-[#f9f9f8]">
      <div className="container-wide">
        <SectionHeader
          label={locale === "en" ? "Benefits" : "Переваги"}
          title={tr.sections.why}
          subtitle={tr.sections.whySub}
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-[#e8e8e5] rounded-[6px] p-6 md:p-7 hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-10 h-10 rounded-[4px] bg-[#f4f6f0] flex items-center justify-center mb-5">
                <r.icon size={20} className="text-[#77d14d]" strokeWidth={1.5} />
              </div>
              <h3
                className="text-base font-500 text-[#131311] mb-2 tracking-tight"
                style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
              >
                {r.title}
              </h3>
              <p className="text-[14px] text-[#555552] leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
