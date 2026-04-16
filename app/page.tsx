import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { InstalledSection } from "@/components/sections/InstalledSection";
import { PopularSection } from "@/components/sections/PopularSection";
import { WhySection } from "@/components/sections/WhySection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CalculatorSection } from "@/features/calculator/CalculatorSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ConsultationSection } from "@/components/sections/ConsultationSection";
import { HomeStickyChrome } from "@/components/shared/HomeStickyChrome";
import { MOBILE_STICKY_MAIN_PAD } from "@/lib/mobileSticky";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className={MOBILE_STICKY_MAIN_PAD}>
        <HeroSection />
        <StatsBar />
        <InstalledSection />
        <PopularSection />
        <WhySection />
        <ProcessSection />
        <CalculatorSection />
        <ReviewsSection />
        <FaqSection />
        <ConsultationSection />
      </main>
      <Footer />
      <HomeStickyChrome />
    </>
  );
}
