"use client";

import { motion } from "framer-motion";
import {
  DraftingCompass,
  House,
  UserRoundCheck,
  Trophy,
  Gem,
  Medal,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";

/** Same motion curve / duration as process timeline cards (`ProcessDesktopRow`). */
const processCardEase = [0.22, 1, 0.36, 1] as const;
const processCardDuration = 0.65;
const processCardViewport = { once: true, margin: "-80px" } as const;

const whyGridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.06,
    },
  },
};

const whyCardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: processCardDuration,
      ease: processCardEase,
    },
  },
};

export function WhySection() {
  const { locale, tr } = useLocale();
  const reasons = locale === "en"
    ? [
        {
          icon: Medal,
          title: "TOP-3 modular house maker",
          desc: "Unitbud is ranked among the leading modular house manufacturers in Ukraine according to UBA.TOP.",
        },
        {
          icon: DraftingCompass,
          title: "Free project design",
          desc: "You do not overpay for a new architectural project or edits. The final cost is agreed and fixed before contract signing.",
        },
        {
          icon: House,
          title: "Durable frame",
          desc: "We use a structural system designed for decades of comfortable living, with an enhanced quality control on every stage.",
        },
        {
          icon: UserRoundCheck,
          title: "Individual approach",
          desc: "Every house reflects your lifestyle: we adapt planning and design choices to your family needs and priorities.",
        },
        {
          icon: Trophy,
          title: "200+ completed projects",
          desc: "More than 10 years of expertise and over 200 homes delivered across Ukraine prove our reliability.",
        },
        {
          icon: Gem,
          title: "Premium materials",
          desc: "For interior and exterior finishing, we choose not only durable but tactilely aesthetic materials - from spruce wood accents to premium hardware.",
        },
      ]
    : [
        {
          icon: Medal,
          title: "ТОП-3 Виробник модульних будинків",
          desc: "Unitbud у рейтингу провідних виробників модульних будинків України за версією UBA.TOP",
        },
        {
          icon: DraftingCompass,
          title: "Безкоштовний проєкт",
          desc: "Ви не платите додатково за розробку нового архітектурного проєкту та внесення змін. Вартість будинку фіксується перед підписанням договору.",
        },
        {
          icon: House,
          title: "Довговічний каркас",
          desc: "Конструктив будинку розрахований на десятки років служби. На кожному етапі діє посилений контроль якості виконання.",
        },
        {
          icon: UserRoundCheck,
          title: "Індивідуальний підхід",
          desc: "Кожен будинок адаптуємо під ваш стиль життя: планування, матеріали та оздоблення підбираємо під ваші потреби.",
        },
        {
          icon: Trophy,
          title: "200+ реалізованих проєктів",
          desc: "Понад 10 років досвіду та понад 200 щасливих сімей по всій Україні — наш найкращий доказ.",
        },
        {
          icon: Gem,
          title: "Преміальні матеріали",
          desc: "Обираємо для оздоблення будинку не лише стійкі, а й тактильно-естетичні матеріали. Від використання деревини смереки на стінах до преміальної фурнітури",
        },
      ];

  return (
    <section id="why" className="section-padding bg-[#1b1b19]">
      <div className="container-wide">
        <SectionHeader
          title={tr.sections.why}
          centered
          titleClassName="font-black text-white"
          showTitleMarker
        />

        <motion.div
          className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={whyGridVariants}
          initial="hidden"
          whileInView="show"
          viewport={processCardViewport}
        >
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              variants={whyCardVariants}
              className="ios-motion-stable group rounded-2xl border border-[#dfdfda] bg-white p-6 md:p-7 shadow-[0_16px_42px_rgba(19,19,17,0.09)] transition md:hover:shadow-[0_20px_48px_rgba(19,19,17,0.13)] md:hover:-translate-y-[1%] md:transition-transform md:duration-500 md:ease-[0.22,1,0.36,1]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#131311] shadow-[0_10px_24px_rgba(19,19,17,0.32)] ring-1 ring-white/10">
                  <r.icon size={29} className="text-[#8bf160]" strokeWidth={2} />
                </div>
                <h3
                  className="text-[24px] leading-tight font-black tracking-tight text-[#131311] md:text-[30px]"
                  style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
                >
                  {r.title}
                </h3>
              </div>
              <p className="mt-4 text-[16px] text-[#555552] leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
