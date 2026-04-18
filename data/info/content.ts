export type InfoLocale = "uk" | "en";

export type PaymentStep = { pct: string; title: string; body: string };
export type CostRow = { distance: string; price: string };
export type TransportItem = { title: string; body: string };
export type FoundationItem = { title: string; body: string };
export type AssemblyStep = { title: string; body: string };
export type AdvantageCard = { title: string; body: string };
export type LongSub = { heading: string; paragraphs: string[] };
export type LongSection = { title: string; lead: string; subs: LongSub[] };

export type InfoPageStrings = {
  payment: {
    title: string;
    subtitle: string;
    steps: PaymentStep[];
  };
  delivery: {
    title: string;
    paragraphs: string[];
    costTitle: string;
    costNote: string;
    costRows: CostRow[];
  };
  transport: {
    title: string;
    items: TransportItem[];
  };
  installation: {
    foundationTitle: string;
    foundationIntro: string;
    foundationItems: FoundationItem[];
    assemblyTitle: string;
    assemblySteps: AssemblyStep[];
  };
  advantages: {
    title: string;
    subtitle: string;
    cards: AdvantageCard[];
  };
  whatModular: LongSection;
  fastHouses: LongSection;
  sauna: LongSection & { advantageTitle: string; advantageCards: AdvantageCard[] };
};

const uk: InfoPageStrings = {
  payment: {
    title: "Оплата модульного будинку «20% · 60% · 20%»",
    subtitle:
      "Три етапи оплати прив'язані до реальних етапів робіт: бронювання та проєктування, старт виробництва, готовність до відправлення.",
    steps: [
      {
        pct: "20%",
        title: "Підтвердження замовлення",
        body:
          "Перший платіж підтверджує замовлення та запускає проєктування: планування під ваші побажання, графічні креслення та прототип. Так ми бронюємо місце в черзі виробництва.",
      },
      {
        pct: "60%",
        title: "Старт виробництва",
        body:
          "Другий платіж здійснюється, коли будинок переходить у фазу фізичного виробництва на заводі. Це покриває матеріали, роботу та операційні витрати циклу збірки.",
      },
      {
        pct: "20%",
        title: "Готовність до відправлення",
        body:
          "Фінальний платіж після повної готовності на виробництві та перед відправленням і монтажем. Ви можете переконатися в якості та повноті виконання перед останнім переказом.",
      },
    ],
  },
  delivery: {
    title: "Доставка та монтаж",
    paragraphs: [
      "Доставка зазвичай не входить у базову вартість будинку і може бути організована замовником або як додаткова послуга по Україні через перевірених перевізників.",
      "Перевезення модулів супроводжує команда завантаження/розвантаження; за допомогою крана модулі точно встановлюють на місце. Транспортна компанія може надати страхування цілісності вантажу.",
      "Монтаж модульного будинку зазвичай займає 1–2 дні залежно від розміру та складності. Збірку можна виконати самостійно або замовити у компанії — умови фіксуються в договорі.",
    ],
    costTitle: "Приблизна вартість доставки одного модуля",
    costNote:
      "Орієнтири залежать від відстані, габаритів та обраного перевізника. Точний розрахунок — після адреси та маршруту.",
    costRows: [
      { distance: "від 100 км", price: "від 500 $" },
      { distance: "від 200 км", price: "1000 $ – 1200 $" },
      { distance: "від 500 км", price: "1800 $ – 2200 $" },
    ],
  },
  transport: {
    title: "Важливі моменти під час транспортування",
    items: [
      {
        title: "Якісна дорога",
        body: "Маршрут має мати рівне покриття без критичних ям і обмежень для важкого транспорту.",
      },
      {
        title: "Під'їзд не менше 4 м",
        body: "Ширина під'їзної дороги та проїздів на ділянці — мінімум 4 метри для безпечного маневру.",
      },
      {
        title: "Висота 4,5 м",
        body: "На маршруті не повинно бути низьких гілок і проводів нижче ~4,5 м по висоті проїзду.",
      },
      {
        title: "Плавні повороти",
        body: "Геометрія поворотів має дозволяти розворот транспорту довжиною близько 11 м.",
      },
    ],
  },
  installation: {
    foundationTitle: "Основні вимоги до фундаменту",
    foundationIntro:
      "Фундамент — це не «додаток», а частина системи безпеки дому: від нього залежать рівність, довговічність і комфорт експлуатації.",
    foundationItems: [
      {
        title: "Надійність і стійкість",
        body: "Фундамент має забезпечувати стабільність модульного будинку на весь термін служби.",
      },
      {
        title: "Відповідність ґрунту",
        body: "Розрахунок ведуть з урахуванням несучої здатності ґрунту та гідрогеології ділянки.",
      },
      {
        title: "Водонепроникність",
        body: "Конструкція має запобігати капілярному підсмоктуванню та проникненню вологи в нижній контур будинку.",
      },
      {
        title: "Швидкий монтаж",
        body: "Рішення підбирають так, щоб на майданчику залишалося мінімум «мокрих» робіт і простій був коротким.",
      },
    ],
    assemblyTitle: "Етапи складання модульного будинку",
    assemblySteps: [
      {
        title: "Підготовка майданчика",
        body: "Очищення, вирівнювання, доступ для крана та транспорту, тимчасові майданчики для модулів.",
      },
      {
        title: "Транспортування модулів",
        body: "Доставка спеціальним транспортом, розвантаження краном або іншими механізмами згідно з планом.",
      },
      {
        title: "З'єднання модулів",
        body: "Стягування та герметизація стиків, вирівнювання геометрії та фіксація на опорах.",
      },
      {
        title: "Підключення комунікацій",
        body: "Вода, каналізація, електрика, опалення — згідно з проєктом і узгодженим переліком робіт.",
      },
      {
        title: "Завершальні роботи",
        body: "Фінішні шви, обходи, перевірка систем — після чого об'єкт готовий до введення в експлуатацію.",
      },
    ],
  },
  advantages: {
    title: "Переваги модульного будівництва",
    subtitle: "у порівнянні з більш традиційними будинками з цегли та піноблоку",
    cards: [
      {
        title: "Індивідуальне планування",
        body: "Розробка планування за вашим запитом згідно з обраним розміром будинку та сценарієм життя сім'ї.",
      },
      {
        title: "Можливість встановлення на свайний фундамент",
        body: "Свайні рішення часто швидші та економніші за масивні бетонні контури — без втрати несучої логіки.",
      },
      {
        title: "Технологія виготовлення",
        body: "Модульні будинки під ключ зазвичай готують за 2–3 місяці від підписання договору завдяки заводській збірці.",
      },
    ],
  },
  whatModular: {
    title: "Модульні будинки: що це і в чому причина популярності?",
    lead:
      "Сучасний ритм життя вимагає передбачуваних термінів і якості. Модульна технологія переносить основну частину робіт у цех — там, де контрольовані процеси, інструменти та клімат.",
    subs: [
      {
        heading: "Що таке модульний будинок?",
        paragraphs: [
          "Модульний будинок — це технологія, за якої секції виготовляють на заводі з дерев'яного каркасу та металу, а на ділянку привозять уже з високим ступенем готовності: оздоблення, вузли, інженерні контуры.",
          "На місці модулі з'єднують у єдиний об'єкт. Це скорочує «мокрі» процеси на ділянці, зменшує залежність від погоди та дає змогу паралелити виробництво і підготовку фундаменту.",
        ],
      },
      {
        heading: "Переваги будинків із модулів",
        paragraphs: [
          "Легка конструкція часто дозволяє раціональніший фундамент і менший слід на ландшафті.",
          "Заводська збірка знижує хаос на ділянці: менше сміття, менше сусідських конфліктів, більше передбачуваності бюджету.",
          "Типові рішення прискорюють старт, а індивідуалізація планування та матеріалів лишається доступною — баланс між швидкістю та унікальністю.",
        ],
      },
      {
        heading: "Етапи виробництва",
        paragraphs: [
          "Обирається типовий або індивідуальний проєкт; погоджуються комплектація та терміни.",
          "Готується фундамент; паралельно на заводі виготовляють модулі, проводять інженерні та оздоблювальні роботи в цеху.",
          "Після доставки виконують монтаж, підключення комунікацій та здачу об'єкта.",
        ],
      },
    ],
  },
  fastHouses: {
    title: "Швидкомонтовані будинки: чому вони затребувані?",
    lead:
      "Класичне будівництво часто розтягується через «мокрі» процеси: бетон, клей, штукатурка. Швидкомонтовані технології замінюють довге очікування сушіння на точну збірку готових вузлів.",
    subs: [
      {
        heading: "У чому секрет швидкості?",
        paragraphs: [
          "Коли основні вузли виготовлені заздалегідь, на ділянці залишається монтаж і підключення — це вимірювані дні, а не місяці невизначеності.",
          "Легкі конструкції зменшують потребу у важких фундаментах і великій кількості рейсів з матеріалами.",
        ],
      },
      {
        heading: "Різновиди",
        paragraphs: [
          "Збірні будинки збирають на майданчику з великих панелей та вузлів — як конструктор з деталей, уже підготовлених під дизайн.",
          "Модульні будинки складаються з блоків вищої заводської готовності: кожен модуль може містити повноцінні приміщення з інженерією.",
        ],
      },
      {
        heading: "Етапи будівництва",
        paragraphs: [
          "Проєкт і комплектація → фундамент і логістика → заводська збірка → доставка → монтаж і комунікації → приймання.",
        ],
      },
    ],
  },
  sauna: {
    title: "Сучасна функціональна модульна лазня — безпрограшне рішення",
    lead:
      "Класична лазня на ділянці — довго і дорого. Модульний формат дає передбачуваний термін, заводську якість і стильний силует без років будівельного хаосу.",
    advantageTitle: "Переваги модульних бань",
    advantageCards: [
      {
        title: "Індивідуальне планування",
        body: "Адаптація плану під ваш сценарій: парна, відпочинок, санвузол, тераса — згідно з обраним проєктом.",
      },
      {
        title: "Свайний фундамент",
        body: "Швидке введення опор без масивного котловану — менше простою та зазвичай нижча вартість підготовки.",
      },
      {
        title: "Технологія виготовлення",
        body: "Виробництво «під ключ» за 2–3 місяці від договору — зрозумілий графік і контроль якості в цеху.",
      },
    ],
    subs: [
      {
        heading: "Етапи та особливості будівництва",
        paragraphs: [
          "Після вибору площі та плану модулі виготовляють на виробництві, збирають у цеху, доставляють і встановлюють на ділянці.",
          "Далі — вентиляція, вода, електрика, утеплення та оздоблення деревиною відповідно до комплектації.",
        ],
      },
      {
        heading: "Практичність та ефективність",
        paragraphs: [
          "Монтаж займає від одного до кількох днів залежно від комплектації. Сучасні матеріали підтримують тепло та комфорт у парній.",
        ],
      },
      {
        heading: "Дизайн та оздоблення",
        paragraphs: [
          "Зовнішній вигляд і тактильність деревини формують преміальне відчуття. Можна узгодити фарбування та фактури під стиль ділянки.",
        ],
      },
      {
        heading: "Чому варто обирати готові модульні лазні",
        paragraphs: [
          "Заводський контроль якості, менше будсміття на ділянці, передбачуваний бюджет і мобільність рішення при зміні планів.",
        ],
      },
    ],
  },
};

const en: InfoPageStrings = {
  payment: {
    title: 'Modular home payment schedule "20% · 60% · 20%"',
    subtitle:
      "Three payments tied to real progress: booking and design, production start, readiness for dispatch.",
    steps: [
      {
        pct: "20%",
        title: "Order confirmation",
        body:
          "The first payment confirms the order and kicks off design: planning to your brief, drawings, and prototyping. It also reserves your place in the production queue.",
      },
      {
        pct: "60%",
        title: "Production start",
        body:
          "The second payment is due when the house enters physical factory production. It covers materials, labour, and operational costs of the build cycle.",
      },
      {
        pct: "20%",
        title: "Ready for dispatch",
        body:
          "The final payment after full factory completion and before shipping and installation. You can verify quality and completeness before the last transfer.",
      },
    ],
  },
  delivery: {
    title: "Delivery and installation",
    paragraphs: [
      "Delivery is often not included in the base house price and can be arranged by the client or as an add-on across Ukraine via trusted carriers.",
      "Module transport includes a loading/unloading crew; a crane places modules accurately on site. Carriers may offer cargo integrity insurance.",
      "Installation typically takes 1–2 days depending on size and complexity. You can self-build or order company assembly — terms are set in the contract.",
    ],
    costTitle: "Indicative delivery cost for one module",
    costNote:
      "Figures depend on distance, dimensions, and carrier. Exact pricing follows your address and route.",
    costRows: [
      { distance: "from 100 km", price: "from $500" },
      { distance: "from 200 km", price: "$1,000 – $1,200" },
      { distance: "from 500 km", price: "$1,800 – $2,200" },
    ],
  },
  transport: {
    title: "Key points during transport",
    items: [
      {
        title: "Good road surface",
        body: "The route should have stable paving without critical potholes or restrictions for heavy vehicles.",
      },
      {
        title: "Access width ≥ 4 m",
        body: "Driveways and on-site passages should be at least 4 metres wide for safe manoeuvring.",
      },
      {
        title: "4.5 m clearance",
        body: "No low branches or wires below ~4.5 m along the transport path.",
      },
      {
        title: "Smooth turns",
        body: "Geometry should allow turning for vehicles around 11 m long.",
      },
    ],
  },
  installation: {
    foundationTitle: "Main foundation requirements",
    foundationIntro:
      "The foundation is part of the home’s safety system: it drives levelness, durability, and everyday comfort.",
    foundationItems: [
      {
        title: "Strength and stability",
        body: "The foundation must keep the modular house stable for its entire service life.",
      },
      {
        title: "Soil match",
        body: "Design accounts for soil bearing capacity and site hydrogeology.",
      },
      {
        title: "Water tightness",
        body: "The design should limit capillary rise and moisture ingress into the lower building zone.",
      },
      {
        title: "Fast installation",
        body: "Solutions aim to minimise wet works on site and shorten idle time.",
      },
    ],
    assemblyTitle: "Modular house assembly stages",
    assemblySteps: [
      {
        title: "Site preparation",
        body: "Clearing, levelling, crane and truck access, temporary staging for modules.",
      },
      {
        title: "Module transport",
        body: "Delivery by specialised transport, unloading by crane or other agreed lifting means.",
      },
      {
        title: "Module connection",
        body: "Pulling joints together, sealing interfaces, checking geometry, fixing to supports.",
      },
      {
        title: "Utilities connection",
        body: "Water, drainage, electricity, heating — per project and agreed scope.",
      },
      {
        title: "Finishing works",
        body: "Final joints, trims, system checks — then handover for use.",
      },
    ],
  },
  advantages: {
    title: "Advantages of modular construction",
    subtitle: "compared with more traditional brick and foam-block houses",
    cards: [
      {
        title: "Individual planning",
        body: "Layout tailored to your brief and chosen house size and family lifestyle.",
      },
      {
        title: "Screw-pile foundation option",
        body: "Pile solutions are often faster and more economical than heavy concrete shells — without losing structural logic.",
      },
      {
        title: "Manufacturing technology",
        body: "Turnkey modular homes are typically produced in about 2–3 months from contract thanks to factory assembly.",
      },
    ],
  },
  whatModular: {
    title: "Modular homes: what they are and why they’re popular",
    lead:
      "Modern life demands predictable timelines and quality. Modular technology moves most work into the factory — where processes, tools, and climate are controlled.",
    subs: [
      {
        heading: "What is a modular house?",
        paragraphs: [
          "A modular home is built from factory-made sections using timber frames and metal, delivered to site with a high degree of finish: surfaces, nodes, and engineering rough-ins.",
          "On site, modules are joined into one building. That cuts wet trades on the plot, reduces weather risk, and lets foundation prep run in parallel with factory work.",
        ],
      },
      {
        heading: "Why modular stacks up",
        paragraphs: [
          "Light structures often allow a smarter foundation footprint and less landscape impact.",
          "Factory assembly means less site chaos: less waste, fewer neighbour issues, more budget predictability.",
          "Standard solutions speed up start, while layout and material personalisation stay available — speed without losing uniqueness.",
        ],
      },
      {
        heading: "Production stages",
        paragraphs: [
          "Choose a standard or custom project; agree specification and timeline.",
          "Prepare the foundation while modules are manufactured and finished in the factory.",
          "After delivery: installation, utilities hook-up, and handover.",
        ],
      },
    ],
  },
  fastHouses: {
    title: "Prefabricated houses: why demand is growing",
    lead:
      "Classic construction often drags because of wet trades: concrete, adhesives, plaster. Prefab replaces long drying with precise assembly of ready-made nodes.",
    subs: [
      {
        heading: "What makes it fast?",
        paragraphs: [
          "When major nodes are prefabricated, the site phase is installation and hook-up — measured in days, not months of uncertainty.",
          "Light structures reduce heavy foundations and endless material truck runs.",
        ],
      },
      {
        heading: "Types",
        paragraphs: [
          "Panel builds assemble large factory-made panels on site — like a kit where parts already match the design.",
          "Modular builds use higher-factory-readiness blocks; each module can contain full rooms with services.",
        ],
      },
      {
        heading: "Build stages",
        paragraphs: [
          "Design and spec → foundation and logistics → factory build → delivery → installation and utilities → acceptance.",
        ],
      },
    ],
  },
  sauna: {
    title: "A modern modular bath / sauna — a winning choice",
    lead:
      "A classic on-site bath takes time and budget. Modular format brings predictable timelines, factory quality, and a clean silhouette without years of construction mess.",
    advantageTitle: "Advantages of modular baths",
    advantageCards: [
      {
        title: "Individual planning",
        body: "Adapt the plan to your ritual: steam room, lounge, WC, terrace — aligned with the chosen project.",
      },
      {
        title: "Screw-pile foundation",
        body: "Fast piling without a deep pit — less downtime and usually lower site-prep cost.",
      },
      {
        title: "Manufacturing",
        body: "Turnkey production in about 2–3 months from contract — a clear schedule and in-factory quality control.",
      },
    ],
    subs: [
      {
        heading: "Stages and build specifics",
        paragraphs: [
          "After size and plan are set, modules are made in the factory, assembled in the hall, delivered, and installed on site.",
          "Next: ventilation, water, electrics, insulation, and timber finishes per specification.",
        ],
      },
      {
        heading: "Practicality and efficiency",
        paragraphs: [
          "On-site work can take from one to several days depending on specification. Modern materials help keep heat and comfort in the steam room.",
        ],
      },
      {
        heading: "Design and finishes",
        paragraphs: [
          "Exterior look and wood tactility create a premium feel. Paint and texture can match your plot’s style.",
        ],
      },
      {
        heading: "Why choose a ready modular bath",
        paragraphs: [
          "Factory quality control, less construction waste on site, predictable budget, and mobility if plans change.",
        ],
      },
    ],
  },
};

export function getInfoContent(locale: InfoLocale): InfoPageStrings {
  return locale === "en" ? en : uk;
}
