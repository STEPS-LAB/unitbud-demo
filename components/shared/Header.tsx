"use client";

import { useState, useEffect, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { useScrolled } from "@/hooks/useScrolled";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const ConsultationModal = dynamic(
  () => import("@/features/forms/ConsultationModal").then((m) => m.ConsultationModal),
);

const navLinks = [
  { href: "/", labelUk: "Головна", labelEn: "Home" },
  { href: "/catalog", labelUk: "Модельний ряд", labelEn: "Models" },
  { href: "/#installed", labelUk: "Кейси", labelEn: "Cases" },
  { href: "/about", labelUk: "Про нас", labelEn: "About" },
  { href: "/info", labelUk: "Інфоцентр", labelEn: "Info" },
  { href: "/contacts", labelUk: "Контакти", labelEn: "Contacts" },
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

  const handleNavLinkClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    setMobileOpen(false);
    if (href === "/" && pathname === "/") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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

          {/* Desktop Nav — компактні інтервали між пунктами, група по центру */}
          <nav className="ml-4 hidden min-w-0 flex-1 flex-wrap items-center justify-center gap-x-3 gap-y-1.5 md:ml-8 md:gap-x-4 lg:flex lg:gap-x-5 xl:ml-10">
            {navLinks.map((link) => {
              const navLabel = locale === "uk" ? link.labelUk : link.labelEn;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleNavLinkClick(link.href)}
                  className={cn(
                    "relative inline-flex min-h-[44px] min-w-0 shrink-0 items-center justify-center rounded-lg px-2.5 py-1.5 text-center text-[15px] font-medium leading-snug tracking-tight antialiased md:px-3 md:py-2 md:text-base",
                    "outline-none transition-[color,background-color,box-shadow] duration-200 ease-out",
                    "focus-visible:ring-2 focus-visible:ring-[#77d14d]/45 focus-visible:ring-offset-0",
                    solidHeader
                      ? "text-[#4a4a46] hover:bg-[#77d14d]/[0.09] hover:text-[#4a7c23] hover:shadow-[inset_0_0_0_1px_rgba(119,209,77,0.14)]"
                      : "text-white/[0.9] hover:bg-white/[0.1] hover:text-white hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]",
                  )}
                >
                  {navLabel}
                </Link>
              );
            })}
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

      {/* Mobile Fullscreen Overlay (CSS transitions, no framer-motion) */}
      {mobileOpen && (
        <div
          className="mobile-menu-overlay fixed inset-0 z-40 bg-white flex flex-col pt-20 pb-8 px-6 lg:hidden"
        >
          <nav className="flex-1 flex flex-col justify-center gap-2">
            {navLinks.map((link, i) => (
              <div
                key={link.href}
                className="mobile-menu-item"
                style={{ animationDelay: `${80 + i * 55}ms` }}
              >
                <Link
                  href={link.href}
                  onClick={handleNavLinkClick(link.href)}
                  className="block text-3xl font-300 text-[#131311] tracking-tight py-3 border-b border-[#f2f2f0] hover:text-[#77d14d] transition-colors"
                  style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
                >
                  {locale === "uk" ? link.labelUk : link.labelEn}
                </Link>
              </div>
            ))}
          </nav>
          <a
            href="tel:+380800000000"
            className="mobile-menu-phone flex items-center gap-3 text-3xl font-300 tracking-tight text-[#131311] hover:text-[#77d14d] transition-colors pt-4 border-t border-[#f2f2f0]"
            style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
          >
            <Phone size={22} className="text-[#77d14d] flex-shrink-0" />
            0 800 000 000
          </a>
        </div>
      )}

      {modalOpen && <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />}
    </>
  );
}
