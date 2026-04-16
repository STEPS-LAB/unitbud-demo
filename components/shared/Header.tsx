"use client";

import { useState, useEffect, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { useScrolled } from "@/hooks/useScrolled";
import { useLocale } from "@/hooks/useLocale";
import dynamic from "next/dynamic";

const ConsultationModal = dynamic(
  () => import("@/features/forms/ConsultationModal").then((m) => m.ConsultationModal),
);

const navLinks = [
  { href: "/catalog", labelUk: "Модельний ряд", labelEn: "Models" },
  { href: "/#installed", labelUk: "Кейси", labelEn: "Cases" },
  { href: "/about", labelUk: "Про нас ▾", labelEn: "About ▾" },
  { href: "/info", labelUk: "Інфоцентр ▾", labelEn: "Info ▾" },
  { href: "/useful", labelUk: "Корисно знати", labelEn: "Useful" },
  { href: "/#contacts", labelUk: "Контакти", labelEn: "Contacts" },
];

export function Header() {
  // Keep header fully transparent only at the very top of the hero.
  // As soon as user starts scrolling, switch to frosted glass.
  const scrolled = useScrolled(8);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { locale, toggle } = useLocale();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const solidHeader = !isHome || scrolled || mobileOpen;
  const logoSrc = solidHeader ? "/logo-dark.svg" : "/logo.svg";
  const frosted = solidHeader;
  const headerSurface = !isHome
    ? "border-[#e8e8e5] bg-white shadow-[0_2px_20px_rgba(19,19,17,0.06)]"
    : frosted
      ? "border-[#e8e8e5]/80 bg-white/65"
      : "border-transparent bg-transparent";

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setMobileOpen(false);

    if (pathname !== "/") {
      return;
    }

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={[
          "fixed top-0 inset-x-0 z-50 h-[88px] border-b transition-[background-color,border-color,box-shadow,backdrop-filter,-webkit-backdrop-filter] duration-300 ease-out will-change-[background-color,border-color,backdrop-filter]",
          headerSurface,
        ].join(" ")}
        style={{
          backdropFilter: !isHome ? "none" : frosted ? "blur(18px) saturate(180%)" : "blur(0px) saturate(100%)",
          WebkitBackdropFilter: !isHome ? "none" : frosted ? "blur(18px) saturate(180%)" : "blur(0px) saturate(100%)",
        }}
      >
        <div className="container-wide flex h-full min-w-0 items-center justify-between gap-3 lg:gap-5">
          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center" onClick={handleLogoClick}>
            <Image
              src={logoSrc}
              alt="Unitbud logo"
              width={56}
              height={56}
              className="w-14 h-14 object-contain flex-shrink-0"
              priority
            />
          </Link>

          {/* Desktop Nav — рівні колонки на всю ширину між логотипом і правим блоком */}
          <nav className="mx-2 hidden min-w-0 flex-1 grid-cols-6 items-stretch gap-1 sm:gap-2 lg:grid xl:mx-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "flex min-h-[42px] w-full min-w-0 items-center justify-center px-1 text-center text-sm font-400 leading-tight transition-colors hover:text-[#77d14d]",
                  solidHeader ? "text-[#3a3a38]" : "text-white/90",
                ].join(" ")}
              >
                {locale === "uk" ? link.labelUk : link.labelEn}
              </Link>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden lg:flex shrink-0 items-center gap-4">
            {/* Locale */}
            <button
              onClick={toggle}
              className={[
                "text-[11px] font-600 uppercase tracking-widest border rounded-[3px] px-2 py-1 transition-colors",
                solidHeader
                  ? "border-[#555552] text-[#555552] hover:border-[#77d14d] hover:text-[#77d14d]"
                  : "border-white/40 text-white/70 hover:border-white hover:text-white",
              ].join(" ")}
              aria-label={locale === "en" ? "Language: English. Click to switch to Ukrainian." : "Мова: українська. Натисніть, щоб перейти на англійську."}
            >
              {locale === "uk" ? "UA" : "EN"}
            </button>

            {/* CTA */}
            <button
              onClick={() => setModalOpen(true)}
              className="btn-primary btn-text-graphite text-sm px-5 py-2.5"
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
                solidHeader
                  ? "border-[#555552] text-[#555552] hover:border-[#77d14d] hover:text-[#77d14d]"
                  : "border-white/40 text-white/80 hover:border-white hover:text-white",
              ].join(" ")}
              aria-label={locale === "en" ? "Language: English. Click to switch to Ukrainian." : "Мова: українська. Натисніть, щоб перейти на англійську."}
            >
              {locale === "uk" ? "UA" : "EN"}
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={[
                "p-2 rounded-[4px] transition-colors outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 focus-visible:ring-0",
                solidHeader ? "text-[#131311]" : "text-white",
              ].join(" ")}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence mode="wait" initial={false}>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.995 }}
            transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-20 pb-8 px-6 lg:hidden"
          >
            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ delay: 0.08 + i * 0.055, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
            <motion.a
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ delay: 0.24, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              href="tel:+380800000000"
              className="flex items-center gap-3 text-3xl font-300 tracking-tight text-[#131311] hover:text-[#77d14d] transition-colors pt-4 border-t border-[#f2f2f0]"
              style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
            >
              <Phone size={22} className="text-[#77d14d] flex-shrink-0" />
              0 800 000 000
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
