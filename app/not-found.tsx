"use client";

import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { useLocale } from "@/hooks/useLocale";

export default function NotFound() {
  const { tr } = useLocale();
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-md">
          <p
            className="text-8xl font-300 text-[#e8e8e5] mb-6 leading-none"
            style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
          >
            404
          </p>
          <h1
            className="text-2xl font-500 text-[#131311] mb-4 tracking-tight"
            style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
          >
            {tr.notFound.title}
          </h1>
          <p className="text-[#7c7c78] text-sm mb-8">
            {tr.notFound.sub}
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/" className="btn-primary">
              {tr.notFound.home}
            </Link>
            <Link href="/catalog" className="btn-outline">
              {tr.notFound.toCatalog}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
