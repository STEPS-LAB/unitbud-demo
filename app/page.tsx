import dynamic from "next/dynamic";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { MOBILE_STICKY_MAIN_PAD } from "@/lib/mobileSticky";

const InstalledSection = dynamic(() =>
  import("@/components/sections/InstalledSection").then((m) => m.InstalledSection),
);
const PopularSection = dynamic(() =>
  import("@/components/sections/PopularSection").then((m) => m.PopularSection),
);
const WhySection = dynamic(() =>
  import("@/components/sections/WhySection").then((m) => m.WhySection),
);
const ProcessSection = dynamic(() =>
  import("@/components/sections/ProcessSection").then((m) => m.ProcessSection),
);
const CalculatorSection = dynamic(() =>
  import("@/features/calculator/CalculatorSection").then((m) => m.CalculatorSection),
);
const ReviewsSection = dynamic(() =>
  import("@/components/sections/ReviewsSection").then((m) => m.ReviewsSection),
);
const FaqSection = dynamic(() =>
  import("@/components/sections/FaqSection").then((m) => m.FaqSection),
);
const ConsultationSection = dynamic(() =>
  import("@/components/sections/ConsultationSection").then((m) => m.ConsultationSection),
);
const HomeStickyChrome = dynamic(() =>
  import("@/components/shared/HomeStickyChrome").then((m) => m.HomeStickyChrome),
);

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
      <Footer className={MOBILE_STICKY_MAIN_PAD} />
      <HomeStickyChrome />
    </>
  );
}
