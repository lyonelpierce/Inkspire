import { LandingNavbar } from "@/components/LandingNavbar";
import { LandingHero } from "@/components/LandingHero";
import { LandingContent } from "@/components/LandingContent";
import { LandingPricing } from "@/components/LandingPricing";
import { LandingFooter } from "@/components/LandingFooter";
import { LandingFaq } from "@/components/LandingFaq";

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
      <LandingPricing />
      <LandingFaq />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
