"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { useScrolled } from "@/hooks/useScrolled";
import { useLocale } from "@/hooks/useLocale";
import { ConsultationModal } from "@/features/forms/ConsultationModal";

const navLinks = [
  { href: "/catalog", labelUk: "Каталог", labelEn: "Catalog" },
  { href: "/#installed", labelUk: "Проєкти", labelEn: "Projects" },
  { href: "/#process", labelUk: "Як будуємо", labelEn: "Process" },
  { href: "/#calculator", labelUk: "Калькулятор", labelEn: "Calculator" },
  { href: "/#contacts", labelUk: "Контакти", labelEn: "Contacts" },
];

export function Header() {
  // Keep header fully transparent only at the very top of the hero.
  // As soon as user starts scrolling, switch to frosted glass.
  const scrolled = useScrolled(8);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { locale, toggle } = useLocale();
  const logoSrc = scrolled || mobileOpen ? "/logo-dark.svg" : "/logo.svg";
  const frosted = scrolled || mobileOpen;

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={[
          "fixed top-0 inset-x-0 z-50 h-[88px] border-b border-transparent transition-[background-color,border-color,backdrop-filter,-webkit-backdrop-filter] duration-300 ease-out will-change-[background-color,border-color,backdrop-filter]",
          frosted
            ? "border-[#e8e8e5]/80 bg-white/65"
            : "bg-transparent",
        ].join(" ")}
        style={{
          backdropFilter: frosted ? "blur(18px) saturate(180%)" : "blur(0px) saturate(100%)",
          WebkitBackdropFilter: frosted ? "blur(18px) saturate(180%)" : "blur(0px) saturate(100%)",
        }}
      >
        <div className="container-wide h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group" onClick={() => setMobileOpen(false)}>
            <Image
              src={logoSrc}
              alt="Unitbud logo"
              width={56}
              height={56}
              className="w-14 h-14 object-contain flex-shrink-0"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "text-sm font-400 transition-colors hover:text-[#77d14d]",
                  scrolled ? "text-[#3a3a38]" : "text-white/90",
                ].join(" ")}
              >
                {locale === "uk" ? link.labelUk : link.labelEn}
              </Link>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Phone */}
            <a
              href="tel:+380800000000"
              className={[
                "flex items-center gap-1.5 text-sm font-500 transition-colors hover:text-[#77d14d]",
                scrolled ? "text-[#3a3a38]" : "text-white/90",
              ].join(" ")}
            >
              <Phone size={14} />
              0 800 000 000
            </a>

            {/* Locale */}
            <button
              onClick={toggle}
              className={[
                "text-[11px] font-600 uppercase tracking-widest border rounded-[3px] px-2 py-1 transition-colors",
                scrolled
                  ? "border-[#d4d4d0] text-[#555552] hover:border-[#77d14d] hover:text-[#77d14d]"
                  : "border-white/40 text-white/70 hover:border-white hover:text-white",
              ].join(" ")}
            >
              {locale === "uk" ? "EN" : "UA"}
            </button>

            {/* CTA */}
            <button
              onClick={() => setModalOpen(true)}
              className="btn-primary text-sm px-5 py-2.5"
            >
              {locale === "uk" ? "Консультація" : "Consultation"}
            </button>
          </div>

          {/* Mobile Right */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              className={[
                "text-[11px] font-600 uppercase tracking-widest border rounded-[3px] px-2 py-1 transition-colors",
                scrolled || mobileOpen
                  ? "border-[#d4d4d0] text-[#555552] hover:border-[#77d14d] hover:text-[#77d14d]"
                  : "border-white/40 text-white/80 hover:border-white hover:text-white",
              ].join(" ")}
              aria-label="Toggle language"
            >
              {locale === "uk" ? "EN" : "UA"}
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={[
                "p-2 rounded-[4px] transition-colors",
                scrolled || mobileOpen ? "text-[#131311]" : "text-white",
              ].join(" ")}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-20 pb-8 px-6 lg:hidden"
          >
            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-3xl font-300 text-[#131311] tracking-tight py-3 border-b border-[#f2f2f0] hover:text-[#77d14d] transition-colors"
                    style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
                  >
                    {locale === "uk" ? link.labelUk : link.labelEn}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="space-y-4"
            >
              <a
                href="tel:+380800000000"
                className="flex items-center gap-2 text-base text-[#3a3a38] hover:text-[#77d14d] transition-colors"
              >
                <Phone size={16} className="text-[#77d14d]" />
                0 800 000 000
              </a>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setModalOpen(true); setMobileOpen(false); }}
                  className="btn-primary flex-1"
                >
                  {locale === "uk" ? "Безкоштовна консультація" : "Free Consultation"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
