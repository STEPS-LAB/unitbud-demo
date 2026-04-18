import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { MOBILE_STICKY_MAIN_PAD } from "@/lib/mobileSticky";
import { InfoHero } from "@/components/sections/info/InfoHero";
import { InfoSubNav } from "@/components/sections/info/InfoSubNav";
import { PaymentSection } from "@/components/sections/info/PaymentSection";
import { DeliverySection } from "@/components/sections/info/DeliverySection";
import { TransportRequirements } from "@/components/sections/info/TransportRequirements";
import { InstallationSection } from "@/components/sections/info/InstallationSection";
import { ModularAdvantagesSection } from "@/components/sections/info/ModularAdvantagesSection";
import { WhatIsModularSection } from "@/components/sections/info/WhatIsModularSection";
import { FastHousesSection } from "@/components/sections/info/FastHousesSection";
import { SaunaSection } from "@/components/sections/info/SaunaSection";

const InfoFaqSection = dynamic(() =>
  import("@/components/sections/info/InfoFaqSection").then((m) => m.InfoFaqSection),
);
const ConsultationSection = dynamic(() =>
  import("@/components/sections/ConsultationSection").then((m) => m.ConsultationSection),
);
const StickyBookingBar = dynamic(() =>
  import("@/components/shared/StickyBookingBar").then((m) => m.StickyBookingBar),
);
const AiWidget = dynamic(() => import("@/components/shared/AiWidget").then((m) => m.AiWidget));

export const metadata: Metadata = {
  title: "Інфоцентр",
  description:
    "Оплата, доставка та монтаж модульних будинків, переваги технології, модульні лазні та відповіді на часті питання — Unitbud.",
};

export default function InfoPage() {
  return (
    <>
      <Header />
      <main className={MOBILE_STICKY_MAIN_PAD}>
        <InfoHero />
        <InfoSubNav />
        <PaymentSection />
        <DeliverySection />
        <TransportRequirements />
        <InstallationSection />
        <ModularAdvantagesSection />
        <WhatIsModularSection />
        <FastHousesSection />
        <SaunaSection />
        <InfoFaqSection />
        <ConsultationSection />
      </main>
      <Footer className={MOBILE_STICKY_MAIN_PAD} />
      <StickyBookingBar />
      <AiWidget />
    </>
  );
}
