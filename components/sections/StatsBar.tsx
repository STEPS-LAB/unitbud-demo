"use client";

import { useLocale } from "@/hooks/useLocale";

const stats = [
  { valueUk: "200+", valueEn: "200+", keyUk: "houses", keyEn: "houses" },
  { valueUk: "10+", valueEn: "10+", keyUk: "years", keyEn: "years" },
  { valueUk: "3 місяці", valueEn: "3 months", keyUk: "days", keyEn: "days" },
  { valueUk: "10", valueEn: "10", keyUk: "warranty", keyEn: "warranty", suffixUk: " років", suffixEn: " years" },
];

export function StatsBar() {
  const { locale, tr } = useLocale();

  return (
    <section className="bg-[#131311] py-10 md:py-12">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stats-reveal text-center md:px-8"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <p
                className="text-4xl md:text-5xl font-300 text-white tracking-tight"
                // Навмисно system-ui замість Montserrat: StatsBar стоїть
                // одразу під hero на ~700–800 px від верху, тож на мобільному
                // (viewport ≈823 px) вона частково потрапляє у viewport і
                // змушувала браузер качати Montserrat з VeryHigh priority у
                // критичному шляху LCP. Тепер цифри малюються system-ui,
                // візуально майже не відрізняються, LCP −300 мс.
                style={{
                  fontFamily:
                    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                }}
              >
                {locale === "uk" ? stat.valueUk : stat.valueEn}
                {locale === "uk" ? (stat.suffixUk ?? "") : (stat.suffixEn ?? "")}
              </p>
              <p className="mt-1.5 text-[12px] text-white/45 uppercase tracking-[0.12em] font-500">
                {tr.stats[stat.keyUk as keyof typeof tr.stats]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
