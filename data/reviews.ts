import { Review } from "@/types";

/** Скорочені формулювання на основі відгуків з https://unitbud.com/uk/ */
export const reviews: Review[] = [
  {
    id: "1",
    name: "Олена Коваль",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    text: "Баня 23 м²: від першого дзвінка до монтажу все пройшло без нарікань, завжди були на зв’язку. Встановили вчасно — простора й затишна, залишились дуже задоволені.",
    textEn:
      "Our 23 m² sauna: from the first call to installation everything went smoothly, always responsive. Installed on time — spacious and cozy; we are very pleased.",
    date: "13 вересня 2024",
    dateEn: "September 13, 2024",
  },
  {
    id: "2",
    name: "Василь Мороз",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    text: "Обійшли багатьох виробників — тут сильніші шумоізоляція, стіни та оздоблення. Консультанти реально розуміють будівництво, а не лише продають. Замовили дім тут.",
    textEn:
      "We compared many manufacturers — better sound insulation, walls and finishing here. Consultants truly understand construction, not just sales. We ordered our home here.",
    date: "28 травня 2024",
    dateEn: "May 28, 2024",
  },
  {
    id: "3",
    name: "Тетяна Іванченко",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    rating: 5,
    text: "Будинок зібрали рівно за три місяці, як обіцяли — швидко й без зайвого стресу. Дякую команді та Анатолію за підтримку на всіх етапах.",
    textEn:
      "The house was ready in exactly three months, as promised — quick and stress-free. Thanks to the team and Anatoliy for support at every stage.",
    date: "9 травня 2024",
    dateEn: "May 9, 2024",
  },
  {
    id: "4",
    name: "Дмитро Savchenko",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 5,
    text: "Живемо в 75 м² від літа — узимку комфортно й тепло. Очікування повністю виправдані, будинком дуже задоволені.",
    textEn:
      "Living in our 75 m² since summer — warm and comfortable in winter. Expectations fully met; we love the house.",
    date: "29 лютого 2024",
    dateEn: "February 29, 2024",
  },
];
