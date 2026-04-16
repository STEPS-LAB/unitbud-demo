import type { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { StickyBookingBar } from "@/components/shared/StickyBookingBar";
import { AiWidget } from "@/components/shared/AiWidget";
import { ConsultationSection } from "@/components/sections/ConsultationSection";
import { CatalogClient } from "./CatalogClient";

export const metadata: Metadata = {
  title: "House Catalog",
  description:
    "Unitbud catalog: residential, commercial, and bath models. Filter by area and explore frame-modular homes.",
};

export default function CatalogPage() {
  return (
    <>
      <Header />
      <main className="pt-[88px]">
        <CatalogClient />
        <ConsultationSection />
      </main>
      <Footer />
      <StickyBookingBar />
      <AiWidget />
    </>
  );
}
