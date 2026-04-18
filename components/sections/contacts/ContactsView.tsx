"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ExternalLink, Mail, Phone } from "lucide-react";
import { useLocale, type Translations } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  contactSocialHref,
  googleMapsEmbedSrc,
  googleMapsExternalHref,
} from "@/data/contacts";
import {
  SocialFacebook,
  SocialInstagram,
  SocialPinterest,
  SocialTelegram,
  SocialTiktok,
  SocialViber,
  SocialYoutube,
} from "@/components/icons/SocialBrandIcons";

type SocialIcon = ComponentType<{ className?: string }>;

const socialLeft: Array<{ id: keyof typeof contactSocialHref; Icon: SocialIcon }> = [
  { id: "instagram", Icon: SocialInstagram },
  { id: "youtube", Icon: SocialYoutube },
  { id: "viber", Icon: SocialViber },
  { id: "tiktok", Icon: SocialTiktok },
];

const socialRight: Array<{ id: keyof typeof contactSocialHref; Icon: SocialIcon }> = [
  { id: "facebook", Icon: SocialFacebook },
  { id: "telegram", Icon: SocialTelegram },
  { id: "pinterest", Icon: SocialPinterest },
];

function socialLabel(cp: Translations["contactsPage"], id: string): string {
  const m: Record<string, string> = {
    instagram: cp.socialInstagram,
    youtube: cp.socialYoutube,
    viber: cp.socialViber,
    tiktok: cp.socialTiktok,
    facebook: cp.socialFacebook,
    telegram: cp.socialTelegram,
    pinterest: cp.socialPinterest,
  };
  return m[id] ?? id;
}

function ContactDivider() {
  return <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d4d4d0] to-transparent" aria-hidden />;
}

function SocialRow({ href, label, Icon }: { href: string; label: string; Icon: SocialIcon }) {
  const isAppScheme = href.startsWith("viber:");
  return (
    <a
      href={href}
      {...(isAppScheme ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className="group flex min-h-[44px] items-center gap-3 py-2 text-[#131311] transition-colors duration-300 hover:text-[#77d14d]"
    >
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e8e8e5] bg-[#f6f6f4] text-[#3a3a38]",
          "transition-[border-color,background-color,color,transform,box-shadow] duration-300 ease-[0.22,1,0.36,1]",
          "group-hover:-translate-y-0.5 group-hover:scale-[1.04] group-hover:border-[#77d14d] group-hover:bg-[#77d14d]/12 group-hover:text-[#77d14d]",
          "group-hover:shadow-[0_10px_28px_rgba(119,209,77,0.22)]",
        )}
      >
        <Icon className="size-[18px] transition-transform duration-300 ease-[0.22,1,0.36,1] group-hover:scale-110" aria-hidden />
      </span>
      <span className="text-[13px] font-semibold uppercase tracking-[0.14em] transition-transform duration-300 ease-[0.22,1,0.36,1] group-hover:translate-x-0.5">
        {label}
      </span>
    </a>
  );
}

export function ContactsView() {
  const { tr } = useLocale();
  const cp = tr.contactsPage;
  const ft = tr.footerText;

  return (
    <>
      {/* ── Секція 1: канали зв’язку ───────────────────────── */}
      <section className="relative isolate overflow-hidden pb-16 pt-[calc(88px+2rem)] md:pb-20 md:pt-[calc(88px+2.75rem)]">
        <div
          className="pointer-events-none absolute -right-[20%] -top-[40%] h-[min(90vw,520px)] w-[min(90vw,520px)] rounded-full opacity-90"
          style={{
            background: "radial-gradient(circle at 40% 40%, rgba(119, 209, 77, 0.14), transparent 62%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-[25%] bottom-[-35%] h-[min(70vw,420px)] w-[min(70vw,420px)] rounded-full opacity-80"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(19, 19, 17, 0.04), transparent 58%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-[8%] top-[38%] hidden h-40 w-px bg-gradient-to-b from-[#77d14d]/50 via-[#77d14d]/15 to-transparent lg:block"
          aria-hidden
        />

        <div className="container-wide relative">
          <nav
            className="mb-8 flex flex-wrap items-center gap-1 text-[13px] text-[#7c7c78] md:mb-10 md:text-sm"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="-mx-1 inline-flex min-h-[44px] min-w-[44px] items-center rounded-md px-2 text-[#555552] transition-colors duration-300 hover:text-[#77d14d]"
            >
              {cp.breadcrumbHome}
            </Link>
            <ChevronRight className="size-3.5 shrink-0 text-[#d4d4d0]" aria-hidden />
            <span className="font-medium text-[#131311]">{cp.breadcrumbCurrent}</span>
          </nav>

          <SectionHeader
            title={cp.breadcrumbCurrent}
            subtitle={cp.intro}
            titleClassName="font-black"
            showTitleMarker
            className="mb-10 md:mb-12"
          />

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-12 md:mt-14"
          >
            <span
              className="pointer-events-none absolute left-5 top-5 z-[1] h-9 w-9 border-l-2 border-t-2 border-[#77d14d]/40 md:left-7 md:top-7"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute bottom-5 right-5 z-[1] h-9 w-9 border-r-2 border-b-2 border-[#77d14d]/40 md:bottom-7 md:right-7"
              aria-hidden
            />

            <div
              className={cn(
                "relative overflow-hidden rounded-[var(--radius-site)] border border-[#e8e8e5]/95",
                "bg-white/85 backdrop-blur-[10px]",
                "shadow-[0_8px_32px_rgba(19,19,17,0.06),0_28px_80px_rgba(19,19,17,0.09),0_2px_0_rgba(119,209,77,0.06)]",
              )}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.5]"
                style={{
                  background:
                    "linear-gradient(125deg, rgba(119,209,77,0.04) 0%, transparent 42%, transparent 58%, rgba(19,19,17,0.02) 100%)",
                }}
                aria-hidden
              />

              <div className="relative grid gap-0 md:grid-cols-2">
                <div className="border-b border-[#ebebe8] p-7 md:border-b-0 md:border-r md:p-9 lg:p-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a8a8a3]">
                    {cp.phoneLabel}
                  </p>
                  <a
                    href="tel:+380671067506"
                    className="group relative mt-2 block text-xl font-medium tracking-tight text-[#131311] transition-[padding-left,color] duration-300 ease-out hover:pl-9 hover:text-[#77d14d] md:text-2xl"
                  >
                    <Phone
                      className="pointer-events-none absolute left-1 top-1/2 size-6 -translate-y-1/2 text-[#77d14d] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span className="relative">{ft.phoneDisplay}</span>
                  </a>
                </div>
                <div className="border-b border-[#ebebe8] p-7 md:border-b-0 md:p-9 lg:p-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a8a8a3]">
                    {cp.emailLabel}
                  </p>
                  <a
                    href={`mailto:${ft.emailDisplay}`}
                    className="group relative mt-2 block text-xl font-medium tracking-tight text-[#131311] transition-[padding-left,color] duration-300 ease-out hover:pl-9 hover:text-[#77d14d] md:text-2xl"
                  >
                    <Mail
                      className="pointer-events-none absolute left-1 top-1/2 size-6 -translate-y-1/2 text-[#77d14d] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span className="relative">{ft.emailDisplay}</span>
                  </a>
                </div>
              </div>

              <div className="px-7 md:px-9 lg:px-10">
                <ContactDivider />
              </div>

              <div className="p-7 pt-6 md:p-9 md:pt-7 lg:p-10 lg:pt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a8a8a3]">
                  {cp.socialNetworksTitle}
                </p>
                <div className="relative mt-4 grid gap-x-10 gap-y-1 md:grid-cols-2">
                  <div className="space-y-0.5">
                    {socialLeft.map((s) => (
                      <SocialRow
                        key={s.id}
                        href={contactSocialHref[s.id]}
                        label={socialLabel(cp, s.id)}
                        Icon={s.Icon}
                      />
                    ))}
                  </div>
                  <div className="space-y-0.5 md:pt-0">
                    {socialRight.map((s) => (
                      <SocialRow
                        key={s.id}
                        href={contactSocialHref[s.id]}
                        label={socialLabel(cp, s.id)}
                        Icon={s.Icon}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Секція 2: карта ─────────────────────────────────── */}
      <section className="relative border-t border-[#ebebe8] bg-[#fafaf8] py-14 md:py-16">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-90"
          aria-hidden
        />
        <div className="container-wide">
          <div className="mb-8 flex flex-col justify-between gap-6 md:mb-10 md:flex-row md:items-start md:gap-10">
            <h2
              className="max-w-xs text-xl font-semibold uppercase tracking-[0.12em] text-[#131311] md:text-2xl"
              style={{ fontFamily: "var(--font-display, Montserrat, Inter, sans-serif)" }}
            >
              {cp.officeLabel}
            </h2>
            <div className="max-w-xl md:text-right">
              <p className="text-lg font-medium leading-snug text-[#131311] md:text-xl">{cp.officeLine1}</p>
              <p className="mt-1 text-lg font-medium leading-snug text-[#131311] md:text-xl">{cp.officeLine2}</p>
              <p className="mt-3 text-sm text-[#7c7c78]">{cp.officeNote}</p>
              <a
                href={googleMapsExternalHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#555552] transition-colors hover:text-[#77d14d]"
              >
                {cp.mapOpenExternal}
                <ExternalLink className="size-4 shrink-0 opacity-80" aria-hidden />
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[var(--radius-site)] border border-[#e0e0dc] bg-[#e8e8e5] shadow-[0_10px_40px_rgba(19,19,17,0.08),0_24px_72px_rgba(19,19,17,0.12),0_2px_0_rgba(119,209,77,0.07)]"
          >
            <div
              className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] ring-1 ring-inset ring-black/[0.04]"
              aria-hidden
            />
            <div className="relative aspect-[16/10] min-h-[280px] w-full md:aspect-[21/9] md:min-h-[340px]">
              <iframe
                title={cp.mapIframeTitle}
                src={googleMapsEmbedSrc}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
