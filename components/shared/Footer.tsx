import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

const catalog = [
  { href: "/catalog?cat=compact", label: "Компакт" },
  { href: "/catalog?cat=comfort", label: "Комфорт" },
  { href: "/catalog?cat=premium", label: "Преміум" },
  { href: "/catalog?cat=elite", label: "Еліт" },
];

const company = [
  { href: "/#why", label: "Про нас" },
  { href: "/#process", label: "Як будуємо" },
  { href: "/#installed", label: "Проєкти" },
  { href: "/#reviews", label: "Відгуки" },
  { href: "/#faq", label: "FAQ" },
];

const legal = [
  { href: "/privacy", label: "Конфіденційність" },
  { href: "/terms", label: "Умови використання" },
];

export function Footer() {
  return (
    <footer className="bg-[#0a0a09] text-white/60">
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-5">
              <Image
                src="/logo.svg"
                alt="Unitbud logo"
                width={56}
                height={56}
                className="w-14 h-14 object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Преміальне каркасне будівництво. Від проєкту до ключів — під ключ.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+380800000000"
                className="flex items-center gap-2.5 text-sm hover:text-white transition-colors"
              >
                <Phone size={14} className="text-[#728c4a] flex-shrink-0" />
                0 800 000 000
              </a>
              <a
                href="mailto:info@unitbud.com"
                className="flex items-center gap-2.5 text-sm hover:text-white transition-colors"
              >
                <Mail size={14} className="text-[#728c4a] flex-shrink-0" />
                info@unitbud.com
              </a>
              <div className="flex items-start gap-2.5 text-sm">
                <MapPin size={14} className="text-[#728c4a] flex-shrink-0 mt-0.5" />
                <span>Київ, вул. Архітекторів, 1</span>
              </div>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="text-white text-sm font-600 uppercase tracking-wider mb-5">
              Каталог
            </h4>
            <ul className="space-y-3">
              {catalog.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/catalog" className="text-[#728c4a] text-sm hover:text-[#91a668] transition-colors">
                  Всі моделі →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-sm font-600 uppercase tracking-wider mb-5">
              Компанія
            </h4>
            <ul className="space-y-3">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-white text-sm font-600 uppercase tracking-wider mb-5">
              Зв'язок
            </h4>
            <p className="text-sm mb-5 leading-relaxed">
              Отримайте безкоштовну консультацію архітектора вже сьогодні.
            </p>
            <a
              href="/#contacts"
              className="inline-block bg-[#728c4a] hover:bg-[#44552b] text-white text-sm font-500 px-5 py-2.5 rounded-[4px] transition-colors duration-200"
            >
              Отримати консультацію
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px]">
            © {new Date().getFullYear()} Unitbud. Всі права захищено.
          </p>
          <div className="flex items-center gap-4">
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="text-[12px] hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
          <p className="text-[12px]">
            Розроблено{" "}
            <a
              href="https://stepslab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#728c4a] hover:text-[#91a668] transition-colors font-500"
            >
              STEPS LAB
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
