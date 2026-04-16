"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";

const FOOTER_NAV = [
  { href: "/", labelKey: "navHome" as const },
  { href: "/catalog", labelKey: "navModels" as const },
  { href: "/business", labelKey: "navBusiness" as const },
  { href: "/baths", labelKey: "navBaths" as const },
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

function SocialInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.5-9.4a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0ZM12 2.2c2.7 0 3 .01 4.05.06 1 .05 1.66.22 2.23.47.6.24 1.12.62 1.53 1.14.52.41.9.93 1.14 1.53.25.57.42 1.23.47 2.23.05 1.05.06 1.35.06 4.05s-.01 3-.06 4.05c-.05 1-.22 1.66-.47 2.23a3.9 3.9 0 0 1-1.14 1.53c-.41.52-.93.9-1.53 1.14-.57.25-1.23.42-2.23.47-1.05.05-1.35.06-4.05.06s-3-.01-4.05-.06c-1-.05-1.66-.22-2.23-.47a3.9 3.9 0 0 1-1.53-1.14 3.9 3.9 0 0 1-1.14-1.53c-.25-.57-.42-1.23-.47-2.23C2.21 15 2.2 14.7 2.2 12s.01-3 .06-4.05c.05-1 .22-1.66.47-2.23.24-.6.62-1.12 1.14-1.53.41-.52.93-.9 1.53-1.14.57-.25 1.23-.42 2.23-.47C9 2.21 9.3 2.2 12 2.2Z" />
    </svg>
  );
}

function SocialFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.9c0-.9.25-1.5 1.55-1.5H17V4.1c-.3 0-1.35-.1-2.55-.1-2.55 0-4.3 1.55-4.3 4.4v2.5H7.5v3.2H10V22h3.5Z" />
    </svg>
  );
}

/** Simple Icons (MIT) — офіційний силует Telegram */
function SocialTelegram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

/** Simple Icons (MIT) — monochrome для currentColor */
function SocialViber({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.187.696 6.7.633 9.817.57 12.933.488 18.776 6.12 20.36h.003l-.004 2.416s-.037.977.61 1.177c.777.242 1.234-.5 1.98-1.302.407-.44.972-1.084 1.397-1.58 3.85.326 6.812-.416 7.15-.525.776-.252 5.176-.816 5.892-6.657.74-6.02-.36-9.83-2.34-11.546-.596-.55-3.006-2.3-8.375-2.323 0 0-.395-.025-1.037-.017zm.058 1.693c.545-.004.88.017.88.017 4.542.02 6.717 1.388 7.222 1.846 1.675 1.435 2.53 4.868 1.906 9.897v.002c-.604 4.878-4.174 5.184-4.832 5.395-.28.09-2.882.737-6.153.524 0 0-2.436 2.94-3.197 3.704-.12.12-.26.167-.352.144-.13-.033-.166-.188-.165-.414l.02-4.018c-4.762-1.32-4.485-6.292-4.43-8.895.054-2.604.543-4.738 1.996-6.173 1.96-1.773 5.474-2.018 7.11-2.03zm.38 2.602c-.167 0-.303.135-.304.302 0 .167.133.303.3.305 1.624.01 2.946.537 4.028 1.592 1.073 1.046 1.62 2.468 1.633 4.334.002.167.14.3.307.3.166-.002.3-.138.3-.304-.014-1.984-.618-3.596-1.816-4.764-1.19-1.16-2.692-1.753-4.447-1.765zm-3.96.695c-.19-.032-.4.005-.616.117l-.01.002c-.43.247-.816.562-1.146.932-.002.004-.006.004-.008.008-.267.323-.42.638-.46.948-.008.046-.01.093-.007.14 0 .136.022.27.065.4l.013.01c.135.48.473 1.276 1.205 2.604.42.768.903 1.5 1.446 2.186.27.344.56.673.87.984l.132.132c.31.308.64.6.984.87.686.543 1.418 1.027 2.186 1.447 1.328.733 2.126 1.07 2.604 1.206l.01.014c.13.042.265.064.402.063.046.002.092 0 .138-.008.31-.036.627-.19.948-.46.004 0 .003-.002.008-.005.37-.33.683-.72.93-1.148l.003-.01c.225-.432.15-.842-.18-1.12-.004 0-.698-.58-1.037-.83-.36-.255-.73-.492-1.113-.71-.51-.285-1.032-.106-1.248.174l-.447.564c-.23.283-.657.246-.657.246-3.12-.796-3.955-3.955-3.955-3.955s-.037-.426.248-.656l.563-.448c.277-.215.456-.737.17-1.248-.217-.383-.454-.756-.71-1.115-.25-.34-.826-1.033-.83-1.035-.137-.165-.31-.265-.502-.297zm4.49.88c-.158.002-.29.124-.3.282-.01.167.115.312.282.324 1.16.085 2.017.466 2.645 1.15.63.688.93 1.524.906 2.57-.002.168.13.306.3.31.166.003.305-.13.31-.297.025-1.175-.334-2.193-1.067-2.994-.74-.81-1.777-1.253-3.05-1.346h-.024zm.463 1.63c-.16.002-.29.127-.3.287-.008.167.12.31.288.32.523.028.875.175 1.113.422.24.245.388.62.416 1.164.01.167.15.295.318.287.167-.008.295-.15.287-.317-.03-.644-.215-1.178-.58-1.557-.367-.378-.893-.574-1.52-.607h-.018z" />
    </svg>
  );
}

export function Footer() {
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
    <footer className="relative overflow-hidden bg-neutral-950 text-white/65 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
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
