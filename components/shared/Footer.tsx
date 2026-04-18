"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import {
  SocialFacebook,
  SocialInstagram,
  SocialTelegram,
  SocialViber,
} from "@/components/icons/SocialBrandIcons";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";

const FOOTER_NAV = [
  { href: "/", labelKey: "navHome" as const },
  { href: "/catalog", labelKey: "navModels" as const },
  { href: "/#installed", labelKey: "navInstalled" as const },
  { href: "/about", labelKey: "navAbout" as const },
  { href: "/info", labelKey: "navInfo" as const },
  { href: "/useful", labelKey: "navUseful" as const },
];

const iconClass = "mt-0.5 size-[15px] shrink-0 text-[#77d14d]";

/** Текст заголовка секції футера (після зеленої смужки). Ім'я збережено для сумісності зі старими збірками / HMR. */
const footerColumnLabel =
  "text-sm font-600 uppercase tracking-[0.12em] text-white";

function FooterSectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-6 w-2 shrink-0 bg-[#77d14d]" aria-hidden />
      <span className={footerColumnLabel}>{title}</span>
    </div>
  );
}

type FooterProps = {
  /** Напр. `MOBILE_STICKY_MAIN_PAD`, коли під футером фіксована мобільна панель. */
  className?: string;
};

export function Footer({ className }: FooterProps) {
  const { tr } = useLocale();
  const ft = tr.footerText;
  const legal = [
    { href: "/privacy", label: ft.privacy },
    { href: "/terms", label: ft.terms },
  ];

  const social = [
    {
      href: "https://www.instagram.com/unitbud/",
      label: "Instagram",
      Icon: SocialInstagram,
    },
    {
      href: "https://www.facebook.com/unitbud",
      label: "Facebook",
      Icon: SocialFacebook,
    },
    {
      href: "https://t.me/unitbud",
      label: "Telegram",
      Icon: SocialTelegram,
    },
    {
      href: "viber://chat?number=%2B380671067506",
      label: "Viber",
      Icon: SocialViber,
    },
  ];

  const linkMuted = "text-sm text-white/65 hover:text-white transition-colors";

  const mid = Math.ceil(FOOTER_NAV.length / 2);
  const navCol1 = FOOTER_NAV.slice(0, mid);
  const navCol2 = FOOTER_NAV.slice(mid);

  return (
    <footer
      className={cn(
        "relative overflow-hidden bg-neutral-950 text-white/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          background: `radial-gradient(ellipse 70% 45% at 50% -30%, rgba(119, 209, 77, 0.12), transparent 55%)`,
        }}
        aria-hidden
      />

      <div className="container-wide relative py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16">
          {/* Brand + description */}
          <div>
            <Link href="/" className="inline-flex items-center mb-5">
              <Image
                src="/logo.svg"
                alt="Unitbud logo"
                width={56}
                height={56}
                className="w-14 h-14 object-contain"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-white/70">{ft.brandDesc}</p>
          </div>

          {/* Navigation — два стовпці */}
          <div>
            <FooterSectionHeading title={ft.navigation} />
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <ul className="space-y-3">
                {navCol1.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkMuted}>
                      {ft[item.labelKey]}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {navCol2.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkMuted}>
                      {ft[item.labelKey]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Контакти — заголовок як на макеті: зелена смуга + білий текст */}
          <div>
            <FooterSectionHeading title={ft.contactsTitle} />
            <ul className="mb-6 space-y-3.5">
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin className={iconClass} strokeWidth={2} aria-hidden />
                <span>{ft.address}</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <Clock className={iconClass} strokeWidth={2} aria-hidden />
                <span>{ft.workingHours}</span>
              </li>
              <li>
                <a href="tel:+380671067506" className={cn("flex items-center gap-2.5", linkMuted)}>
                  <Phone className="size-[15px] shrink-0 text-[#77d14d]" strokeWidth={2} aria-hidden />
                  <span className="text-white/70">{ft.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${ft.emailDisplay}`}
                  className={cn("flex items-center gap-2.5", linkMuted)}
                >
                  <Mail className="size-[15px] shrink-0 text-[#77d14d]" strokeWidth={2} aria-hidden />
                  <span className="text-white/70">{ft.emailDisplay}</span>
                </a>
              </li>
            </ul>
            <div className="flex flex-wrap gap-2">
              {social.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className={cn(
                    "flex size-10 items-center justify-center rounded-[8px] border border-white/12",
                    "bg-white/[0.04] text-white/75 transition-[background-color,border-color,color]",
                    "duration-200 hover:border-[#77d14d]/35 hover:bg-white/[0.08] hover:text-white",
                  )}
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-wide flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-xs text-white/55 sm:text-left">
            © {new Date().getFullYear()} Unitbud. {ft.allRights}{" "}
            {tr.footer.dev}{" "}
            <a
              href="https://stepslab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-500 text-[#77d14d] transition-colors hover:text-[#95dc6a]"
            >
              STEPS LAB
            </a>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-end">
            {legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs text-white/55 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
