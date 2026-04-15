import type { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { StickyBookingBar } from "@/components/shared/StickyBookingBar";
import { AiWidget } from "@/components/shared/AiWidget";
import { CatalogClient } from "./CatalogClient";

export const metadata: Metadata = {
  title: "House Catalog",
  description:
    "Unitbud frame house catalog. Compact, Comfort, Premium and Elite series. Choose your perfect house.",
};

export default function CatalogPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <CatalogClient />
      </main>
      <Footer />
      <StickyBookingBar />
      <AiWidget />
    </>
  );
}
