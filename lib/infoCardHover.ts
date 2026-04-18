/**
 * Hover motion aligned with home: `WhySection`, `InstalledSection`, `PopularHouseCard`
 * — smooth shadow + slight lift on md+ (`duration-500`, ease `[0.22,1,0.36,1]`).
 */
export const INFO_CARD_HOVER_LIGHT =
  "group shadow-[0_16px_42px_rgba(19,19,17,0.09)] transition hover:shadow-[0_20px_48px_rgba(19,19,17,0.13)] md:hover:-translate-y-[1%] md:will-change-transform md:transition-transform md:duration-500 md:ease-[0.22,1,0.36,1]" as const;

/** Dark cards (`ModularAdvantagesSection`) — same motion curve, shadows for dark UI */
export const INFO_CARD_HOVER_DARK =
  "group shadow-[0_16px_42px_rgba(0,0,0,0.35)] transition hover:shadow-[0_24px_56px_rgba(0,0,0,0.52)] md:hover:-translate-y-[1%] md:will-change-transform md:transition-transform md:duration-500 md:ease-[0.22,1,0.36,1]" as const;

/** Large FAQ list panel — subtle lift, same timing */
export const INFO_PANEL_HOVER =
  "shadow-[0_12px_40px_rgba(19,19,17,0.06)] transition hover:shadow-[0_20px_48px_rgba(19,19,17,0.1)] md:hover:-translate-y-[0.5%] md:will-change-transform md:transition-transform md:duration-500 md:ease-[0.22,1,0.36,1]" as const;

/** Pills / chips — no shadow lift, smooth color & border only */
export const INFO_PILL_TRANSITION =
  "transition-all duration-500 ease-[0.22,1,0.36,1]" as const;
