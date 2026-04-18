/** Radial + grid overlay used across /info sections (matches About intro decor). */
export function InfoSectionDecor() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `radial-gradient(ellipse 70% 50% at 12% 18%, rgba(119,209,77,0.09) 0%, transparent 55%),
            radial-gradient(circle at 92% 88%, rgba(119,209,77,0.05) 0%, transparent 40%)`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#131311 1px, transparent 1px), linear-gradient(90deg, #131311 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />
    </>
  );
}
