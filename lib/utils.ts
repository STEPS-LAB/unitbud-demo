import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Matches `Locale` from `@/hooks/useLocale` — kept here to avoid importing a client module into shared utils. */
export type FormatLocale = "uk" | "en";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, locale: FormatLocale = "uk"): string {
  if (price >= 1_000_000) {
    const millions = price / 1_000_000;
    const m = millions % 1 === 0 ? String(millions) : millions.toFixed(1);
    if (locale === "en") {
      return `${m}M UAH`;
    }
    return `${m} млн грн`;
  }
  if (locale === "en") {
    return new Intl.NumberFormat("en-US").format(price) + " UAH";
  }
  return new Intl.NumberFormat("uk-UA").format(price) + " грн";
}

/** USD for catalog models / calculator (e.g. «94 608 $»). */
export function formatUsd(price: number, locale: FormatLocale = "uk"): string {
  const loc = locale === "en" ? "en-US" : "uk-UA";
  return `${new Intl.NumberFormat(loc).format(price)} $`;
}

export function formatAreaSqm(area: number, locale: FormatLocale = "uk"): string {
  return `${area} ${locale === "en" ? "m²" : "м²"}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .trim();
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export const PHONE_MASK = "+38 (0__) ___-__-__";

export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  const local = digits.startsWith("38") ? digits.slice(2) : digits;
  const d = local.slice(0, 10);
  let out = "+38 (";
  if (d.length > 0) out += d.slice(0, 3);
  if (d.length >= 3) out += ") ";
  if (d.length > 3) out += d.slice(3, 6);
  if (d.length >= 6) out += "-";
  if (d.length > 6) out += d.slice(6, 8);
  if (d.length >= 8) out += "-";
  if (d.length > 8) out += d.slice(8, 10);
  return out;
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 12 && digits.startsWith("380");
}

export function isValidName(name: string): boolean {
  return /^[a-zA-Zа-яА-ЯіІїЇєЄёЁ\s'-]+$/.test(name) && name.trim().length >= 2;
}
