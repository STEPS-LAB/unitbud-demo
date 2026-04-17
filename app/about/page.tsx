import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { AboutPageSections } from "@/components/sections/AboutPageSections";
import { MOBILE_STICKY_MAIN_PAD } from "@/lib/mobileSticky";

const ReviewsSection = dynamic(() =>
  import("@/components/sections/ReviewsSection").then((m) => m.ReviewsSection),
);
const ConsultationSection = dynamic(() =>
  import("@/components/sections/ConsultationSection").then((m) => m.ConsultationSection),
);
const StickyBookingBar = dynamic(() =>
  import("@/components/shared/StickyBookingBar").then((m) => m.StickyBookingBar),
);
const AiWidget = dynamic(() => import("@/components/shared/AiWidget").then((m) => m.AiWidget));

export const metadata: Metadata = {
  title: "Про нас",
  description:
    "Unitbud: команда, виробництво в Житомирі та модульні будинки під ключ. Ласкаво просимо до лідера в галузі каркасно-модульного будівництва.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className={`pt-[88px] ${MOBILE_STICKY_MAIN_PAD}`}>
        <AboutPageSections />
        <ReviewsSection />
        <ConsultationSection />
      </main>
      <Footer className={MOBILE_STICKY_MAIN_PAD} />
      <StickyBookingBar />
      <AiWidget />
    </>
  );
}
