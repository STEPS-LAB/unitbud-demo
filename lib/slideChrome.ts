/** Спільні параметри виїзду знизу для панелі консультації та AI на головній. */
export const CHROME_SLIDE_DURATION = 0.42;
export const CHROME_SLIDE_EASE = [0.22, 1, 0.36, 1] as const;
/** Такий самий easing, але у формі CSS-кривої — для нативних transition без framer-motion. */
export const CHROME_SLIDE_EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
