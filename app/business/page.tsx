import type { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { StickyBookingBar } from "@/components/shared/StickyBookingBar";
import { AiWidget } from "@/components/shared/AiWidget";
import { HouseCard } from "@/components/ui/HouseCard";
import { houses } from "@/data/houses";

export const metadata: Metadata = {
  title: "Проєкти для бізнесу",
  description:
    "Комерційні модульні рішення для офісів, глемпінгів, шоурумів і сервісних об'єктів у стилі Unitbud.",
};

const businessHouses = houses.filter((house) => house.area >= 100);

const businessDirections = [
  {
    title: "Модульні офіси",
    text: "Готові робочі простори з продуманою логістикою, вентиляцією та інженерією.",
  },
  {
    title: "Глемпінг і готельні модулі",
    text: "Комфортні будиночки для туристичних локацій з швидким запуском сезону.",
  },
  {
    title: "Шоуруми та точки продажу",
    text: "Сучасні комерційні модулі, що підсилюють бренд і працюють на конверсію.",
  },
];

export default function BusinessPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="section-padding border-b border-[#e8e8e5]">
          <div className="container-wide">
            <span className="section-label">Комерційні моделі</span>
            <h1
              className="mt-3 text-4xl md:text-5xl font-300 text-[#131311] tracking-tight"
              style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
            >
              Проєкти для бізнесу
            </h1>
            <p className="mt-4 max-w-3xl text-[#555552] leading-relaxed">
              Реалізуємо модульні комерційні об&apos;єкти з прогнозованими термінами, фіксованим бюджетом і
              високою якістю оздоблення. Від ідеї до запуску - одна команда.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {businessDirections.map((item) => (
                <article key={item.title} className="card-premium p-6">
                  <h2 className="text-xl text-[#131311] font-500">{item.title}</h2>
                  <p className="mt-2 text-sm text-[#555552]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-wide">
            <div className="flex items-end justify-between gap-4 mb-8">
              <h2
                className="text-3xl md:text-4xl font-300 text-[#131311] tracking-tight"
                style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
              >
                Рекомендовані моделі для бізнесу
              </h2>
              <p className="text-sm text-[#7c7c78]">{businessHouses.length} варіантів</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessHouses.map((house, idx) => (
                <HouseCard key={house.id} house={house} priority={idx < 3} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyBookingBar />
      <AiWidget />
    </>
  );
}
