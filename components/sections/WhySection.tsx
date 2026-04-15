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

const reasons = [
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

export function WhySection() {
  const { tr } = useLocale();

  return (
    <section id="why" className="section-padding bg-[#f9f9f8]">
      <div className="container-wide">
        <SectionHeader
          label="Переваги"
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
