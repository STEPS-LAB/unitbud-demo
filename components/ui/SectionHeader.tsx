import { cn } from "@/lib/utils";
import { RevealOnScroll } from "./RevealOnScroll";

interface Props {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  /** With centered: title left on small screens, centered from md */
  responsiveAlign?: boolean;
  /** Light typography for use on dark / photo backgrounds */
  variant?: "default" | "onDark";
  /**
   * `subsection` — менший заголовок усередині розділу (h3, без «головного» маркера).
   */
  appearance?: "section" | "subsection";
  className?: string;
  titleClassName?: string;
  showTitleMarker?: boolean;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  centered = false,
  responsiveAlign = false,
  variant = "default",
  appearance = "section",
  className,
  titleClassName,
  showTitleMarker = false,
}: Props) {
  const onDark = variant === "onDark";
  const alignCentered = centered && !responsiveAlign;
  const alignResponsive = centered && responsiveAlign;
  const isSub = appearance === "subsection";
  const TitleTag = isSub ? "h3" : "h2";

  return (
    <div
      className={cn(
        isSub ? "mb-8 md:mb-10" : "mb-12 md:mb-16",
        alignCentered && "text-center",
        alignResponsive && "text-left md:text-center",
        !centered && "text-left",
        className,
      )}
    >
      {label && (
        <RevealOnScroll>
          <span className="section-label mb-4">{label}</span>
        </RevealOnScroll>
      )}
      {isSub ? (
        <RevealOnScroll delay={0.05}>
          <div
            className={cn(
              "mt-3 max-w-3xl border-l-2 border-[#77d14d] pl-4 md:pl-5",
              alignCentered && "mx-auto",
              alignResponsive && "md:mx-auto",
            )}
          >
            <TitleTag
              className={cn(
                "text-[1.125rem] font-semibold leading-snug tracking-tight text-balance md:text-xl",
                onDark ? "text-white" : "text-[#131311]",
                titleClassName,
              )}
              style={{ fontFamily: "var(--font-display, Montserrat, Inter, sans-serif)" }}
            >
              {title}
            </TitleTag>
            {subtitle ? (
              <p
                className={cn(
                  "mt-3 max-w-2xl text-[15px] leading-relaxed md:text-base",
                  onDark ? "text-white/78" : "text-[#555552]",
                )}
              >
                {subtitle}
              </p>
            ) : null}
          </div>
        </RevealOnScroll>
      ) : (
        <>
          <RevealOnScroll delay={0.05}>
            <div
              className={cn(
                "mt-3 flex items-center gap-4",
                alignCentered && "justify-center",
                alignResponsive && "justify-start md:justify-center",
                !centered && "justify-start",
              )}
            >
              {showTitleMarker ? <span className="h-10 w-2 shrink-0 bg-[#77d14d]" aria-hidden="true" /> : null}
              <TitleTag
                className={cn(
                  "text-3xl font-light leading-tight tracking-tight md:text-4xl lg:text-5xl",
                  onDark ? "text-white" : "text-[#131311]",
                  alignResponsive && "lg:whitespace-nowrap",
                  titleClassName,
                )}
                style={{ fontFamily: "var(--font-display, Montserrat, Inter, sans-serif)" }}
              >
                {title}
              </TitleTag>
            </div>
          </RevealOnScroll>
          {subtitle ? (
            <RevealOnScroll delay={0.1}>
              <p
                className={cn(
                  "mt-4 max-w-2xl text-base md:text-lg",
                  onDark ? "text-white/78" : "text-[#555552]",
                  showTitleMarker && !centered && "ml-6",
                  alignCentered && "mx-auto",
                  alignResponsive && "md:mx-auto",
                )}
              >
                {subtitle}
              </p>
            </RevealOnScroll>
          ) : null}
        </>
      )}
    </div>
  );
}
