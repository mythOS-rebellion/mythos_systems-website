import { Navigation } from '../components/Navigation';
import { DollarSign, Users, TrendingUp, Briefcase, Building2, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BIDChamberModal } from '../components/BIDChamberModal';
import { EarlyAdopterModal } from '../components/EarlyAdopterModal';
import { AffiliateModal } from '../components/AffiliateModal';
import { JobApplicationModal } from '../components/JobApplicationModal';
import { GetInvolvedModal } from '../components/GetInvolvedModal';
import { TubesBackground } from '../components/ui/neon-flow';
import ProceduralGroundBackground from '../components/ui/animated-pattern-cloud';

export function PartnerPage() {
  const [isBIDModalOpen, setIsBIDModalOpen] = useState(false);
  const [isEarlyAdopterModalOpen, setIsEarlyAdopterModalOpen] = useState(false);
  const [isAffiliateModalOpen, setIsAffiliateModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <TubesBackground className="min-h-[600px] bg-[#000000]" enableClickInteraction={!isMobile}>
          <div className="flex flex-col items-center justify-center w-full h-full min-h-[600px] pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 
                className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight drop-shadow-[0_0_20px_rgba(0,0,0,1)]"
                style={{ fontFamily: 'var(--font-headline)' }}
              >
                BUILD THE<br />
                REBELLION<br />
                WITH US
              </h1>
              <p className="text-2xl text-[#B0B0B0] max-w-4xl mx-auto leading-relaxed drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                We're not building MythOS alone. We're building it with the people who've been fighting for local all along: business improvement districts, chambers of commerce, community organizations, small business owners, creators, and anyone who believes local should win.
              </p>
            </div>
          </div>
        </TubesBackground>
      </section>

      <ProceduralGroundBackground>
      {/* Intro Section */}
      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-2xl text-white font-bold text-center mb-4" style={{ fontFamily: 'var(--font-headline)' }}>
            If you're ready to fight back against Big Tech monopolies,
          </p>
          <p className="text-2xl text-[#0047FF] font-bold text-center" style={{ fontFamily: 'var(--font-headline)' }}>
            here's how we work together.
          </p>
        </div>
      </section>

      {/* BIDs & Chambers Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0047FF]/5 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-lg bg-[#0047FF]/10">
                  <Briefcase className="w-8 h-8 text-[#0047FF]" />
                </div>
                <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-headline)' }}>
                  Business Improvement Districts & Chambers of Commerce
                </h2>
              </div>
              <p className="text-xl text-[#B0B0B0] mb-8 leading-relaxed">
                You've been advocating for local businesses long before we showed up. Now let's give your members the tools they actually need.
              </p>
            </div>

            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
                What We Offer:
              </h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#0047FF] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#B0B0B0]">Discounted MythOS Pro rates for all businesses in your district or chamber</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#0047FF] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#B0B0B0]">Free onboarding to The Network for every member</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#0047FF] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#B0B0B0]">Commission structures for businesses that sign up through your organization—your advocacy generates revenue that goes back into supporting local</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#0047FF] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#B0B0B0]">Co-branded marketing materials so your members know you brought them this solution</span>
                </li>
              </ul>
              
              <div className="border-t border-white/10 pt-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-headline)' }}>
                  Why Partner:
                </h3>
                <p className="text-[#B0B0B0] leading-relaxed">
                  Your members are already struggling to compete. We're giving them enterprise-level tools at small business prices. You get to deliver real value, not another networking event or newsletter sponsor.
                </p>
              </div>

              <button
                onClick={() => setIsBIDModalOpen(true)}
                className="w-full px-8 py-4 bg-[#0047FF] text-white rounded-lg hover:bg-[#0047FF]/90 transition-all font-semibold text-lg hover:shadow-lg hover:shadow-[#0047FF]/50"
              >
                Partner With Us - BIDs & Chambers
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Early Adopters Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-[#9D4EDD]/5 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1 bg-[#1A1A1A] border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
                What You Get:
              </h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#9D4EDD] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#B0B0B0]">2 weeks of MythOS Pro for free</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#9D4EDD] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#B0B0B0]">Free local discovery</span>
                </li>
              </ul>
              
              <div className="border-t border-white/10 pt-6 mb-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#9D4EDD] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-[#B0B0B0]"><span className="text-white font-semibold">Myth Credits</span> - currency given to local customers that joined The Network, to spend at your business</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setIsEarlyAdopterModalOpen(true)}
                className="w-full px-8 py-4 bg-[#7B2CBF] text-white rounded-lg hover:bg-[#7B2CBF]/90 transition-all font-semibold text-lg hover:shadow-lg hover:shadow-[#7B2CBF]/50"
              >
                Be First in Your City
              </button>
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-lg bg-[#9D4EDD]/10">
                  <Building2 className="w-8 h-8 text-[#9D4EDD]" />
                </div>
                <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-headline)' }}>
                  Small Businesses - Early Adopters
                </h2>
              </div>
              <p className="text-xl text-[#B0B0B0] mb-4 leading-relaxed">
                Launch with us.
              </p>
              <p className="text-xl text-[#B0B0B0] mb-4 leading-relaxed">
                Host your business on The Network before citywide rollout, accept Myth Credits from customers, and receive two weeks of MythOS Pro free.
              </p>
              <p className="text-xl text-[#B0B0B0] mb-4 leading-relaxed">
                Early presence means early visibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creators & Affiliates Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF4500]/5 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 rounded-lg bg-[#FF4500]/10">
                <TrendingUp className="w-8 h-8 text-[#FF4500]" />
              </div>
              <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-headline)' }}>
                Creators & Affiliates
              </h2>
            </div>
            <p className="text-xl text-[#B0B0B0] mb-8 leading-relaxed">
              If you have an audience that cares about supporting local, fighting monopolies, or just discovering their city differently—let's work together.
            </p>
            <button
              onClick={() => setIsAffiliateModalOpen(true)}
              className="px-10 py-5 bg-[#FF4500] text-white rounded-lg hover:bg-[#FF4500]/90 transition-all font-semibold text-lg hover:shadow-lg hover:shadow-[#FF4500]/50"
            >
              Join as an Affiliate
            </button>
          </div>
        </div>
      </section>

      {/* Join the Team Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-[#0047FF]/5 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 rounded-lg bg-[#0047FF]/10">
                <Users className="w-8 h-8 text-[#0047FF]" />
              </div>
              <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-headline)' }}>
                Join the Team
              </h2>
            </div>
            <p className="text-2xl text-[#B0B0B0] mb-4 leading-relaxed max-w-4xl mx-auto">
              We're hiring people who want to fight, not just work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-headline)' }}>
                What We're Building:
              </h3>
              <p className="text-[#B0B0B0] leading-relaxed">
                A company that proves you can compete with Big Tech without becoming Big Tech. Fair pay. Real equity. A mission that matters.
              </p>
            </div>

            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-headline)' }}>
                What We Need:
              </h3>
              <p className="text-[#B0B0B0] leading-relaxed">
                People who execute. People who care. People who understand that this isn't just another startup—it's a rebellion.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl text-[#B0B0B0] mb-6">
              MythOS is a lean, mission-driven team building infrastructure to take on trillion-dollar monopolies. If you're a developer, designer, marketer, operator, or just someone who refuses to watch local lose—we want to talk.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setIsJobModalOpen(true)}
                className="px-10 py-5 bg-[#0047FF] text-white rounded-lg hover:bg-[#0047FF]/90 transition-all font-semibold text-lg hover:shadow-lg hover:shadow-[#0047FF]/50"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0047FF]/20 via-[#9D4EDD]/20 to-[#FF4500]/20"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Heart className="w-16 h-16 text-[#FF4500] mx-auto mb-6" />
            <h2 
              className="text-5xl md:text-6xl font-bold text-white mb-8"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Let's Build This Together
            </h2>
          </div>
          <div className="space-y-4 text-xl text-[#B0B0B0] leading-relaxed mb-12 max-w-4xl mx-auto">
            <p>
              MythOS only works if we're all in this. Business districts. Business owners. Creators. Employees. Everyone who's been waiting for someone to actually fight back.
            </p>
            <p className="text-white text-2xl font-bold" style={{ fontFamily: 'var(--font-headline)' }}>
              That's us. That's you. That's this.
            </p>
          </div>

          <div className="text-3xl font-bold text-[#0047FF] mb-8" style={{ fontFamily: 'var(--font-headline)' }}>
            Ready to partner?
          </div>

          <button
            onClick={() => setIsContactModalOpen(true)}
            className="px-10 py-5 bg-[#FF4500] text-white text-lg font-bold rounded-lg hover:bg-[#FF4500]/90 transition-all duration-200 hover:shadow-lg hover:shadow-[#FF4500]/50"
          >
            Contact Us
          </button>
        </div>
      </section>
      </ProceduralGroundBackground>

      {/* Modals */}
      <BIDChamberModal isOpen={isBIDModalOpen} onClose={() => setIsBIDModalOpen(false)} />
      <EarlyAdopterModal isOpen={isEarlyAdopterModalOpen} onClose={() => setIsEarlyAdopterModalOpen(false)} />
      <AffiliateModal isOpen={isAffiliateModalOpen} onClose={() => setIsAffiliateModalOpen(false)} />
      <JobApplicationModal isOpen={isJobModalOpen} onClose={() => setIsJobModalOpen(false)} />
      <GetInvolvedModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}