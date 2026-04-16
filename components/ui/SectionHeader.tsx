import { cn } from "@/lib/utils";
import { RevealOnScroll } from "./RevealOnScroll";

interface Props {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
  showTitleMarker?: boolean;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  centered = false,
  className,
  titleClassName,
  showTitleMarker = false,
}: Props) {
  return (
    <div className={cn("mb-12 md:mb-16", centered && "text-center", className)}>
      {label && (
        <RevealOnScroll>
          <span className="section-label mb-4">{label}</span>
        </RevealOnScroll>
      )}
      <RevealOnScroll delay={0.05}>
        <div className={cn("mt-3 flex items-center gap-4", centered && "justify-center")}>
          {showTitleMarker ? <span className="h-10 w-2 bg-[#77d14d]" aria-hidden="true" /> : null}
          <h2
            className={cn("text-3xl font-light leading-tight tracking-tight md:text-4xl lg:text-5xl", titleClassName)}
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
              "mt-4 max-w-2xl text-base text-[#555552] md:text-lg",
              showTitleMarker && !centered && "ml-6",
            )}
            style={centered ? { margin: "1rem auto 0" } : {}}
          >
            {subtitle}
          </p>
        </RevealOnScroll>
      )}
    </div>
  );
}
