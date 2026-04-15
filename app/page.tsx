import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { StickyBookingBar } from "@/components/shared/StickyBookingBar";
import { AiWidget } from "@/components/shared/AiWidget";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { InstalledSection } from "@/components/sections/InstalledSection";
import { PopularSection } from "@/components/sections/PopularSection";
import { WhySection } from "@/components/sections/WhySection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CalculatorSection } from "@/features/calculator/CalculatorSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { MapSection } from "@/features/map/MapSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ConsultationSection } from "@/components/sections/ConsultationSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsBar />
        <InstalledSection />
        <PopularSection />
        <WhySection />
        <ProcessSection />
        <CalculatorSection />
        <ReviewsSection />
        <MapSection />
        <FaqSection />
        <ConsultationSection />
      </main>
      <Footer />
      <StickyBookingBar />
      <AiWidget />
    </>
  );
}
