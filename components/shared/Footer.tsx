"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export function Footer() {
  const { tr } = useLocale();
  const catalog = [
    { href: "/catalog?cat=compact", label: tr.catalogPage.catCompact },
    { href: "/catalog?cat=comfort", label: tr.catalogPage.catComfort },
    { href: "/catalog?cat=premium", label: tr.catalogPage.catPremium },
    { href: "/catalog?cat=elite", label: tr.catalogPage.catElite },
  ];
  const company = [
    { href: "/#why", label: tr.footerText.about },
    { href: "/#process", label: tr.footerText.howWeBuild },
    { href: "/#installed", label: tr.footerText.projects },
    { href: "/#reviews", label: tr.footerText.reviews },
    { href: "/#faq", label: "FAQ" },
  ];
  const legal = [
    { href: "/privacy", label: tr.footerText.privacy },
    { href: "/terms", label: tr.footerText.terms },
  ];

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
              {tr.footerText.brandDesc}
            </p>
            <div className="space-y-3">
              <a
                href="tel:+380800000000"
                className="flex items-center gap-2.5 text-sm hover:text-white transition-colors"
              >
                <Phone size={14} className="text-[#77d14d] flex-shrink-0" />
                0 800 000 000
              </a>
              <a
                href="mailto:info@unitbud.com"
                className="flex items-center gap-2.5 text-sm hover:text-white transition-colors"
              >
                <Mail size={14} className="text-[#77d14d] flex-shrink-0" />
                info@unitbud.com
              </a>
              <div className="flex items-start gap-2.5 text-sm">
                <MapPin size={14} className="text-[#77d14d] flex-shrink-0 mt-0.5" />
                <span>{tr.footerText.address}</span>
              </div>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="text-white text-sm font-600 uppercase tracking-wider mb-5">
              {tr.footerText.catalog}
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
                <Link href="/catalog" className="text-[#77d14d] text-sm hover:text-[#95dc6a] transition-colors">
                  {tr.footerText.allModels} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-sm font-600 uppercase tracking-wider mb-5">
              {tr.footerText.company}
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
              {tr.footerText.contact}
            </h4>
            <p className="text-sm mb-5 leading-relaxed">
              {tr.footerText.ctaText}
            </p>
            <a
              href="/#contacts"
              className="inline-block bg-[#77d14d] text-[#3a3a38] hover:bg-[#3a3a38] hover:text-white text-sm font-600 px-5 py-2.5 rounded-[4px] transition-colors duration-200"
            >
              {tr.footerText.ctaButton}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px]">
            © {new Date().getFullYear()} Unitbud. {tr.footerText.allRights}
          </p>
          <div className="flex items-center gap-4">
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="text-[12px] hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
          <p className="text-[12px]">
            {tr.footer.dev}{" "}
            <a
              href="https://stepslab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#77d14d] hover:text-[#95dc6a] transition-colors font-500"
            >
              STEPS LAB
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
