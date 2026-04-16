"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, Quote, Star } from "lucide-react";
import { reviews } from "@/data/reviews";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";

function ReviewDecor({ className }: { className?: string }) {
  return (
    <svg
      className={cn("pointer-events-none text-white/[0.06]", className)}
      viewBox="0 0 88 88"
      fill="none"
      aria-hidden
    >
      <path d="M0 1h40M1 0v40" stroke="currentColor" strokeWidth="1" />
      <path d="M88 87H48M87 88V48" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function ReviewsSection() {
  const { locale, tr } = useLocale();

  return (
    <section id="reviews" className="section-padding relative overflow-hidden bg-[#131311]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle at 18% 22%, rgba(119,209,77,0.1) 0%, transparent 42%),
            radial-gradient(circle at 88% 78%, rgba(119,209,77,0.05) 0%, transparent 38%)`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      <div className="container-wide relative">
        <SectionHeader
          title={tr.sections.reviews}
          subtitle={tr.sections.reviewsSub}
          titleClassName="font-black"
          showTitleMarker
          className="mb-12 md:mb-16 [&_h2]:text-white [&_.section-label]:text-[#95dc6a] [&_p]:text-white/45"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {reviews.map((review, i) => {
            const body = locale === "en" ? (review.textEn ?? review.text) : review.text;
            const dateLabel = locale === "en" ? (review.dateEn ?? review.date) : review.date;
            const metaParts = [
              review.location ? (locale === "en" ? (review.locationEn ?? review.location) : review.location) : null,
              review.houseModel ?? null,
            ].filter(Boolean);

            return (
              <motion.article
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-48px" }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="group flex min-h-0 overflow-hidden border border-white/[0.1] bg-[#252523] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
              >
                {/* суцільна смуга однакової ширини на всю висоту картки */}
                <div className="w-1 shrink-0 self-stretch bg-[#77d14d]" aria-hidden />

                <div className="relative flex min-w-0 flex-1 flex-col p-6 md:p-8">
                  <ReviewDecor className="absolute left-3 top-3 size-14 md:left-4 md:top-4" />
                  <ReviewDecor className="absolute bottom-3 right-3 size-14 rotate-180 md:bottom-4 md:right-4" />

                  <Quote
                    className="pointer-events-none absolute right-5 top-5 size-10 text-[#77d14d]/[0.1] transition-colors duration-500 group-hover:text-[#77d14d]/16 md:right-7 md:top-7 md:size-11"
                    strokeWidth={1}
                    aria-hidden
                  />

                  <div className="relative flex gap-0.5 pl-1" aria-label={`${review.rating} / 5`}>
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="size-3 fill-[#77d14d]/45 text-[#77d14d]/65" strokeWidth={0} />
                    ))}
                  </div>

                  <p className="relative mt-4 flex-1 pl-1 text-[14px] font-light leading-relaxed tracking-tight text-white/88 md:text-[15px]">
                    {body}
                  </p>

                  <div className="relative mt-6 flex flex-wrap items-center gap-4 border-t border-white/[0.08] pt-5">
                    <div className="relative size-11 shrink-0 overflow-hidden rounded-full ring-1 ring-white/12">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        width={44}
                        height={44}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">{review.name}</p>
                      <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-white/45">
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="size-3.5 shrink-0 opacity-75" strokeWidth={1.5} aria-hidden />
                          {dateLabel}
                        </span>
                        {metaParts.length > 0 ? (
                          <>
                            <span className="text-white/25" aria-hidden>
                              ·
                            </span>
                            <span>{metaParts.join(" · ")}</span>
                          </>
                        ) : null}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
