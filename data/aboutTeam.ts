/** Портрети та профілі з https://unitbud.com/uk/about/ */

export type TeamMember = {
  id: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  nameUk: string;
  nameEn: string;
  roleUk: string;
  roleEn: string;
  bioUk: string;
  bioEn: string;
  /** Для біографій з маркованим списком (напр. інженер-технолог) */
  bioBulletsUk?: readonly string[];
  bioBulletsEn?: readonly string[];
  bioFooterUk?: string;
  bioFooterEn?: string;
  stats: { experience: number; age: number; houses?: number };
  expertHref: string;
};

export const aboutTeam: readonly TeamMember[] = [
  {
    id: "sokorchuk",
    image: "https://unitbud.com/wp-content/webp-express/webp-images/uploads/2024/11/img_9391-scaled.jpg.webp",
    imageWidth: 1835,
    imageHeight: 2560,
    nameUk: "Олег Сокорчук",
    nameEn: "Oleh Sokorchuk",
    roleUk: "Керівник технічного відділу, співзасновник компанії",
    roleEn: "Head of technical department, co-founder",
    bioUk:
      "Керівництво технічними відділами. Найм і навчання персоналу проєктних та виробничих відділів. Контроль реалізації технічної документації та проєктів, участь у розробці нових моделей продукції.",
    bioEn:
      "Leads technical departments. Hiring and training staff in design and production departments. Oversees technical documentation and projects, and contributes to developing new product models.",
    stats: { experience: 15, age: 40 },
    expertHref: "https://unitbud.com/uk/eksperty/sokorchuk-oleg/",
  },
  {
    id: "denysov",
    image: "https://unitbud.com/wp-content/webp-express/webp-images/uploads/2024/06/imrrg_0652.jpg.webp",
    imageWidth: 671,
    imageHeight: 671,
    nameUk: "Анатолій Денисов",
    nameEn: "Anatoliy Denysov",
    roleUk: "Керівник відділу продажів",
    roleEn: "Head of sales",
    bioUk:
      "Навчався в Державному університеті «Житомирська політехніка», має вищу освіту за спеціальностями «Право» та «Товарознавство». З 2007 року в продажах різних груп товарів; у нерухомості — з 2019 року.",
    bioEn:
      "Graduate of Zhytomyr Polytechnic State University (Law and Commodity Science). In sales since 2007; in real estate since 2019.",
    stats: { experience: 5, age: 34 },
    expertHref: "https://unitbud.com/uk/eksperty/denisov-anatoliy/",
  },
  {
    id: "rakovych",
    image: "https://unitbud.com/wp-content/webp-express/webp-images/uploads/2024/10/img_3418.jpg.webp",
    imageWidth: 977,
    imageHeight: 1220,
    nameUk: "Марина Ракович",
    nameEn: "Maryna Rakovych",
    roleUk: "Менеджер з продажів",
    roleEn: "Sales manager",
    bioUk:
      "Знання технік продажу, стратегій переговорів, роботи з запереченнями та пошуку рішень вигідних для всіх сторін. Освіта: Житомирський технологічний коледж та Житомирська політехніка — художник-конструктор (дизайнер) та фінансист.",
    bioEn:
      "Sales techniques, negotiation strategy, handling objections, and win-win deals. Educated as designer (artist-constructor) and financier at Zhytomyr Polytechnic and related college.",
    stats: { experience: 6, age: 33 },
    expertHref: "https://unitbud.com/uk/eksperty/rakovych-maryna/",
  },
  {
    id: "volotivskyi",
    image: "https://unitbud.com/wp-content/uploads/2023/06/photo_5246986899724290400_y.webp",
    imageWidth: 960,
    imageHeight: 1280,
    nameUk: "Ігор Волотівський",
    nameEn: "Ihor Volotivskyi",
    roleUk: "Головний архітектор",
    roleEn: "Chief architect",
    bioUk:
      "Зосереджений на проєктуванні модульних будинків: інноваційні та функціональні простори з сучасними технологіями та концепціями. Мета — житло, що відповідає потребам і бюджету клієнтів, з комфортом і надійністю.",
    bioEn:
      "Focused on modular home design — innovative, functional spaces using modern technologies and concepts, balancing client needs, budget, comfort, and reliability.",
    stats: { experience: 15, age: 38, houses: 164 },
    expertHref: "https://unitbud.com/uk/eksperty/volotivskiy-igor/",
  },
  {
    id: "koval",
    image: "https://unitbud.com/wp-content/uploads/2023/06/avatar_user_4_1686899511.webp",
    imageWidth: 960,
    imageHeight: 1280,
    nameUk: "Олександр Коваль",
    nameEn: "Oleksandr Koval",
    roleUk: "Інженер-конструктор",
    roleEn: "Design engineer",
    bioUk:
      "Будував багатоповерхові будинки на 9 і 16 поверхів за монолітною технологією в Києві та Харкові. Будував заводи «Вібросепаратор» та «ВторЧерМет» у Житомирі; брав участь у ремонті цехів заводу ім. Малишева в Харкові.",
    bioEn:
      "Built 9- and 16-story monolithic residential buildings in Kyiv and Kharkiv; built the Vibroseparator and VtorCherMet plants in Zhytomyr; participated in workshop repairs at the Malyshev plant in Kharkiv.",
    stats: { experience: 45, age: 68, houses: 230 },
    expertHref: "https://unitbud.com/uk/eksperty/koval-oleksandr/",
  },
  {
    id: "baranovskyi",
    image: "https://unitbud.com/wp-content/uploads/2023/06/avatar_user_5_1686900323.webp",
    imageWidth: 1076,
    imageHeight: 1079,
    nameUk: "Володимир Барановський",
    nameEn: "Volodymyr Baranovskyi",
    roleUk: "Інженер-технолог",
    roleEn: "Process engineer",
    bioUk: "Великі об'єкти, які будував:",
    bioEn: "Major projects he has built:",
    bioBulletsUk: [
      "Базу будівельних матеріалів площею 2500 м², також облаштування території 4000 м².",
      "«Автоцентр Тойота» у Житомирі.",
      "Магазини та комерційні приміщення.",
      "Велику кількість заміських котеджів.",
      "СТО з металоконструкцій і сендвіч-панелей.",
    ],
    bioBulletsEn: [
      "A 2,500 m² building materials base plus 4,000 m² of site improvement.",
      "Toyota Autocenter in Zhytomyr.",
      "Retail and commercial premises.",
      "A large number of suburban cottages.",
      "Service stations using steel structures and sandwich panels.",
    ],
    bioFooterUk: "Виконав понад 90 проєктів для комерційних об'єктів.",
    bioFooterEn: "Completed over 90 projects for commercial clients.",
    stats: { experience: 33, age: 64, houses: 90 },
    expertHref: "https://unitbud.com/uk/eksperty/baranovskiy-volodimir/",
  },
] as const;
