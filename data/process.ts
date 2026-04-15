import { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Консультація",
    titleEn: "Consultation",
    description:
      "Безкоштовна зустріч з архітектором. Обговорюємо ваші потреби, бюджет та побажання. Підбираємо оптимальний проєкт або розробляємо індивідуальний.",
    descriptionEn:
      "A free meeting with an architect. We discuss your needs, budget, and preferences. Then we select an optimal project or design a custom one.",
    duration: "1–3 дні",
    durationEn: "1-3 days",
    icon: "MessageCircle",
  },
  {
    id: 2,
    title: "Договір та проєкт",
    titleEn: "Contract and Design",
    description:
      "Підписання договору з фіксованою вартістю. Розробка або адаптація проєктної документації. Погодження всіх деталей планування та матеріалів.",
    descriptionEn:
      "Contract signing with a fixed budget. Design documentation is created or adapted. All planning and material details are approved together.",
    duration: "7–14 днів",
    durationEn: "7-14 days",
    icon: "FileText",
  },
  {
    id: 3,
    title: "Фундамент",
    titleEn: "Foundation",
    description:
      "Підготовка ділянки та заливка фундаменту. Вибір типу фундаменту залежно від ґрунту та проєкту. Постійний геодезичний контроль.",
    descriptionEn:
      "Site preparation and foundation works. Foundation type is chosen according to soil and project requirements. Continuous geodetic control is provided.",
    duration: "14–21 день",
    durationEn: "14-21 days",
    icon: "Layers",
  },
  {
    id: 4,
    title: "Коробка будинку",
    titleEn: "House Structure",
    description:
      "Монтаж каркасу, стін та покрівлі. Встановлення вікон та зовнішніх дверей. Утеплення та захист від атмосферних впливів.",
    descriptionEn:
      "Assembly of the frame, walls, and roof. Installation of windows and exterior doors. Insulation and weather protection are completed.",
    duration: "30–45 днів",
    durationEn: "30-45 days",
    icon: "Home",
  },
  {
    id: 5,
    title: "Оздоблення",
    titleEn: "Finishing",
    description:
      "Внутрішні інженерні системи: електрика, водопостачання, опалення. Чистове оздоблення стін, підлог та стелі. Встановлення сантехніки та освітлення.",
    descriptionEn:
      "Internal engineering systems: electricity, water supply, and heating. Final finishing of walls, floors, and ceilings. Installation of plumbing and lighting.",
    duration: "30–40 днів",
    durationEn: "30-40 days",
    icon: "Wrench",
  },
  {
    id: 6,
    title: "Здача ключів",
    titleEn: "Key Handover",
    description:
      "Фінальний огляд та підписання акту приймання-передачі. Навчання користування системами будинку. Гарантійне обслуговування протягом усього гарантійного терміну.",
    descriptionEn:
      "Final inspection and handover signing. We explain how to use all home systems. Warranty support continues throughout the full warranty period.",
    duration: "1–2 дні",
    durationEn: "1-2 days",
    icon: "Key",
  },
];
