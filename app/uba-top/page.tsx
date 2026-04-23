import type { Metadata } from "next";
import Link from "next/link";
import { Award, ShieldCheck, Zap, Handshake } from "lucide-react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { StickyBookingBar } from "@/components/shared/StickyBookingBar";
import { AiWidget } from "@/components/shared/AiWidget";
import { MOBILE_STICKY_MAIN_PAD } from "@/lib/mobileSticky";

export const metadata: Metadata = {
  title: "Unitbud у рейтингу UBA.TOP",
  description:
    "Unitbud увійшов до рейтингу провідних виробників модульних будинків України за версією UBA.TOP.",
};

const reasons = [
  {
    title: "Технологічність і контроль якості",
    text: "Власний виробничий цикл та перевірка на кожному етапі: від розкрою до фінішного монтажу.",
    icon: ShieldCheck,
  },
  {
    title: "Енергоефективність",
    text: "Сучасні утеплювачі, продумана конструкція та комфортний мікроклімат у будь-яку пору року.",
    icon: Zap,
  },
  {
    title: "Швидкість реалізації",
    text: "Модульна технологія дозволяє запускати об'єкти у стислі терміни без втрати якості.",
    icon: Award,
  },
  {
    title: "Прозорість і партнерство",
    text: "Фіксована вартість, прогнозований процес і персональний підхід до кожного замовника.",
    icon: Handshake,
  },
];

export default function UbaTopPage() {
  return (
    <>
      <Header />
      <main className={`pt-24 ${MOBILE_STICKY_MAIN_PAD}`}>
        <section className="section-padding border-b border-[#e8e8e5]">
          <div className="container-narrow">
            <p className="section-label">Новина</p>
            <h1
              className="mt-4 text-4xl md:text-5xl font-300 text-[#131311] tracking-tight leading-tight"
              style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
            >
              Unitbud у рейтингу провідних виробників модульних будинків України за версією UBA.TOP
            </h1>
            <p className="mt-6 text-[#555552] leading-relaxed">
              Ми увійшли до рейтингу UBA.TOP як один із провідних виробників модульних будинків в Україні.
              Для нас це підтвердження якості, системного підходу та відповідальності перед кожним клієнтом.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <h2
              className="text-3xl md:text-4xl font-300 text-[#131311] tracking-tight"
              style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
            >
              Чому це важливо
            </h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {reasons.map((item) => (
                <article key={item.title} className="card-premium p-6">
                  <item.icon size={22} className="text-[#77d14d]" />
                  <h3 className="mt-4 text-xl text-[#131311] font-500">{item.title}</h3>
                  <p className="mt-2 text-[#555552] text-sm leading-relaxed">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-narrow">
            <div className="glass rounded-[8px] border border-[#e8e8e5] p-8">
              <h3
                className="text-2xl md:text-3xl font-300 text-[#131311] tracking-tight"
                style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
              >
                Плануєте модульний будинок?
              </h3>
              <p className="mt-3 text-[#555552]">
                Перейдіть у каталог моделей — житлові, комерційні та лазні рішення в одному місці.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/catalog" className="btn-primary">
                  Перейти в каталог
                </Link>
                <Link href="/#calculator" className="btn-outline">
                  Калькулятор вартості
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer className={MOBILE_STICKY_MAIN_PAD} />
      <StickyBookingBar />
      <AiWidget />
    </>
  );
}
