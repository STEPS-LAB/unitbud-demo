"use client";

import { useEffect } from "react";
import { useLocale } from "@/hooks/useLocale";

/** Syncs `<html lang>` with the in-app locale (layout defaults to `uk`). */
export function DocumentLang() {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "uk";
  }, [locale]);

  return null;
}
