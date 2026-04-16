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
  className,
  titleClassName,
  showTitleMarker = false,
}: Props) {
  const onDark = variant === "onDark";
  const alignCentered = centered && !responsiveAlign;
  const alignResponsive = centered && responsiveAlign;

  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
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
          <h2
            className={cn(
              "text-3xl font-light leading-tight tracking-tight md:text-4xl lg:text-5xl",
              onDark ? "text-white" : "text-[#131311]",
              alignResponsive && "lg:whitespace-nowrap",
              titleClassName,
            )}
            style={{ fontFamily: "var(--font-display, Montserrat, Inter, sans-serif)" }}
          >
            {title}
          </h2>
        </div>
      </RevealOnScroll>
      {subtitle && (
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
      )}
    </div>
  );
}
