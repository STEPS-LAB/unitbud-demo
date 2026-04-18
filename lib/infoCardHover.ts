/**
 * Card motion aligned with home — hover (shadow + lift) only from `md:` so touch devices
 * do not keep “stuck” hover states.
 */
export const INFO_CARD_HOVER_LIGHT =
  "group shadow-[0_16px_42px_rgba(19,19,17,0.09)] transition md:hover:shadow-[0_20px_48px_rgba(19,19,17,0.13)] md:hover:-translate-y-[1%] md:will-change-transform md:transition-transform md:duration-500 md:ease-[0.22,1,0.36,1]" as const;

export const INFO_CARD_HOVER_DARK =
  "group shadow-[0_16px_42px_rgba(0,0,0,0.35)] transition md:hover:shadow-[0_24px_56px_rgba(0,0,0,0.52)] md:hover:-translate-y-[1%] md:will-change-transform md:transition-transform md:duration-500 md:ease-[0.22,1,0.36,1]" as const;

export const INFO_PANEL_HOVER =
  "shadow-[0_12px_40px_rgba(19,19,17,0.06)] transition md:hover:shadow-[0_20px_48px_rgba(19,19,17,0.1)] md:hover:-translate-y-[0.5%] md:will-change-transform md:transition-transform md:duration-500 md:ease-[0.22,1,0.36,1]" as const;

export const INFO_PILL_TRANSITION =
  "transition-all duration-500 ease-[0.22,1,0.36,1]" as const;
