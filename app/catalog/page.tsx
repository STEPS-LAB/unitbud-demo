import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { CatalogClient } from "./CatalogClient";
import { MOBILE_STICKY_MAIN_PAD } from "@/lib/mobileSticky";

const ConsultationSection = dynamic(() =>
  import("@/components/sections/ConsultationSection").then((m) => m.ConsultationSection),
);
const StickyBookingBar = dynamic(() =>
  import("@/components/shared/StickyBookingBar").then((m) => m.StickyBookingBar),
);
const AiWidget = dynamic(() =>
  import("@/components/shared/AiWidget").then((m) => m.AiWidget),
);

export const metadata: Metadata = {
  title: "House Catalog",
  description:
    "Unitbud catalog: residential, commercial, and bath models. Filter by area and explore frame-modular homes.",
};

export default function CatalogPage() {
  return (
    <>
      <Header />
      <main className={`pt-[88px] ${MOBILE_STICKY_MAIN_PAD}`}>
        <CatalogClient />
        <ConsultationSection />
      </main>
      <Footer />
      <StickyBookingBar />
      <AiWidget />
    </>
  );
}
