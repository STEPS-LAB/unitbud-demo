import { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Консультація",
    titleEn: "Consultation",
    description:
      "Ми зв'яжемося з вами та допоможемо підібрати комплектацію будинку, яка ідеально відповідатиме вашим побажанням.",
    descriptionEn:
      "We contact you and help choose the home package that best matches your expectations.",
    duration: "Старт",
    durationEn: "Start",
    icon: "MessageCircle",
  },
  {
    id: 2,
    title: "Укладання договору",
    titleEn: "Contract Signing",
    description:
      "На цьому етапі ви обираєте оздоблення будинку, після чого укладається договір, де визначаються терміни, умови оплати та відповідальність сторін.",
    descriptionEn:
      "At this stage, you choose the finishing package, then we sign a contract with timelines, payment terms, and responsibilities.",
    duration: "Домовленості",
    durationEn: "Agreement",
    icon: "FileText",
  },
  {
    id: 3,
    title: "Виробництво",
    titleEn: "Production",
    description:
      "Будинок виготовляється на виробництві протягом 2-3 місяців завдяки сучасній технології виробництва.",
    descriptionEn:
      "The house is manufactured in production for 2-3 months using modern construction technology.",
    duration: "2-3 місяці",
    durationEn: "2-3 months",
    icon: "Hammer",
  },
  {
    id: 4,
    title: "Транспортування",
    titleEn: "Transportation",
    description:
      "Після виготовлення будинок доставляється на вашу ділянку.",
    descriptionEn:
      "After production, the house is delivered to your site.",
    duration: "Логістика",
    durationEn: "Logistics",
    icon: "Truck",
  },
  {
    id: 5,
    title: "Монтаж і підключення",
    titleEn: "Installation & Connection",
    description:
      "Завершальний етап - це монтаж будинку на підготовлену ділянку із підключенням до всіх комунікацій та підготовкою фундаменту.",
    descriptionEn:
      "Final stage: house installation on the prepared site with all utility connections and foundation preparation.",
    duration: "Фінал",
    durationEn: "Final",
    icon: "Wrench",
  },
];
