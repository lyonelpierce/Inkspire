import { LandingNavbar } from "@/components/LandingNavbar";
import { LandingHero } from "@/components/LandingHero";
import { LandingContent } from "@/components/LandingContent";
import { LandingPricing } from "@/components/LandingPricing";

const LandingPage = () => {
  return (
    <div className="h-full ">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
      <LandingPricing />
    </div>
  );
};

export default LandingPage;
