import { Navigation } from '../components/Navigation';
import { MythosHero } from '../components/ui/mythos-hero';
import { SanDiegoSection } from '../components/SanDiegoSection';
import { HowItWorks } from '../components/HowItWorks';
import { PricingSection } from '../components/PricingSection';
import { StatsSection } from '../components/StatsSection';
import { FinalCTA } from '../components/FinalCTA';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navigation />
      <MythosHero />
      <SanDiegoSection />
      <StatsSection />
      <HowItWorks />
      <PricingSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
