import { cn } from "@/lib/utils";
import { RevealOnScroll } from "./RevealOnScroll";

interface Props {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ label, title, subtitle, centered = false, className }: Props) {
  return (
    <div className={cn("mb-12 md:mb-16", centered && "text-center", className)}>
      {label && (
        <RevealOnScroll>
          <span className="section-label mb-4">{label}</span>
        </RevealOnScroll>
      )}
      <RevealOnScroll delay={0.05}>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-tight mt-3"
          style={{ fontFamily: "var(--font-display, Montserrat, Inter, sans-serif)" }}
        >
          {title}
        </h2>
      </RevealOnScroll>
      {subtitle && (
        <RevealOnScroll delay={0.1}>
          <p className="mt-4 text-base md:text-lg text-[#555552] max-w-2xl" style={centered ? { margin: "1rem auto 0" } : {}}>
            {subtitle}
          </p>
        </RevealOnScroll>
      )}
    </div>
  );
}
