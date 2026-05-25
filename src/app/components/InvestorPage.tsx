import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { ArrowLeft } from 'lucide-react';
import marketBreakdownImage from 'figma:asset/e727667a189a41947835a54a63ec66de6fc9200e.png';
import revenueModelImage from 'figma:asset/d249db809f8fd3a89b5acf6694df028194d89681.png';
import { InvestorDeckModal } from './InvestorDeckModal';
import { useState } from 'react';

export function InvestorPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleBackToHome = () => {
    (window as any).navigateTo?.('home');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navigation />
      
      {/* Back to home link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <button 
          onClick={handleBackToHome}
          className="flex items-center gap-2 text-[#B0B0B0] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to home</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="mythos-headline-large text-white mb-6">
          Investing in the infrastructure of local economies
        </h1>
      </section>

      {/* Why MythOS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <h2 className="mythos-headline-medium text-white mb-8">
          Why MythOS
        </h2>
        <div className="space-y-6 text-[#B0B0B0] mythos-body-base max-w-2xl">
          <p>
            Local economies are fragmented. Small businesses are overpowered by large platforms. Cities lack shared digital infrastructure.
          </p>
          <p>
            There is a need for local-first systems that compound city by city.
          </p>
        </div>
      </section>

      {/* What We're Building */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <h2 className="mythos-headline-medium text-white mb-8">
          What We're Building
        </h2>
        <div className="space-y-4 max-w-2xl">
          <div className="flex gap-4">
            <div className="w-1.5 bg-[#0047FF] flex-shrink-0"></div>
            <p className="text-[#B0B0B0] mythos-body-base">
              A consumer-facing local city network
            </p>
          </div>
          <div className="flex gap-4">
            <div className="w-1.5 bg-[#0047FF] flex-shrink-0"></div>
            <p className="text-[#B0B0B0] mythos-body-base">
              A business operating system for small businesses
            </p>
          </div>
          <div className="flex gap-4">
            <div className="w-1.5 bg-[#0047FF] flex-shrink-0"></div>
            <p className="text-[#B0B0B0] mythos-body-base">
              Shared digital infrastructure that scales city by city
            </p>
          </div>
        </div>
      </section>

      {/* Current Status */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <h2 className="mythos-headline-medium text-white mb-8">
          Current Status
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
          <div className="bg-[#1A1A1A] border border-white/10 p-6 rounded">
            <p className="text-white font-medium mb-2">MythOS Pro MVP in development set to launch soon. The Network MVP built and in app store (waiting for public launch).</p>
            <p className="text-[#B0B0B0] text-sm">Building the core infrastructure</p>
          </div>
          <div className="bg-[#1A1A1A] border border-white/10 p-6 rounded">
            <p className="text-white font-medium mb-2">Early access list is live</p>
            <p className="text-[#B0B0B0] text-sm">Growing city by city interest</p>
            <p className="text-[#B0B0B0] text-sm">Collecting LOIs and Signed commitments</p>
            <p className="text-[#B0B0B0] text-sm">Testing with Beta Users</p>
          </div>
          <div className="bg-[#1A1A1A] border border-white/10 p-6 rounded">
            <p className="text-white font-medium mb-2">City by city rollout planned</p>
            <p className="text-[#B0B0B0] text-sm">MythOS Pro launches first in Dallas and San Diego, Then The Network launches in San Diego</p>
          </div>
          <div className="bg-[#1A1A1A] border border-white/10 p-6 rounded">
            <p className="text-white font-medium mb-2">Engaging strategic partners</p>
            <p className="text-[#B0B0B0] text-sm">Building the right foundation</p>
          </div>
        </div>
      </section>

      {/* Market Breakdown & Revenue Model */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <h2 className="mythos-headline-medium text-white mb-12 text-center">
          Market Opportunity
        </h2>
        <div className="space-y-8">
          {/* San Diego Market Breakdown */}
          <div className="bg-[#111111] border border-[#0047FF]/30 rounded-lg overflow-hidden">
            <img 
              src={marketBreakdownImage} 
              alt="San Diego Market Breakdown" 
              className="w-full h-auto"
            />
          </div>
          
          {/* Year 1 Revenue Model */}
          <div className="bg-[#111111] border border-[#0047FF]/30 rounded-lg overflow-hidden">
            <img 
              src={revenueModelImage} 
              alt="Year 1 Revenue Model" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Investor Fit */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <h2 className="mythos-headline-medium text-white mb-8">
          Investor Fit
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
          {/* Good fit */}
          <div>
            <h3 className="text-[#9D4EDD] font-semibold mb-4">Good fit if you are:</h3>
            <ul className="space-y-3 text-[#B0B0B0] mythos-body-base">
              <li className="flex gap-3">
                <span className="text-[#9D4EDD] flex-shrink-0">→</span>
                <span>Long-term oriented</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#9D4EDD] flex-shrink-0">→</span>
                <span>An operator, founder, or strategic thinker</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#9D4EDD] flex-shrink-0">→</span>
                <span>Interested in rebuilding local economies through infrastructure</span>
              </li>
            </ul>
          </div>
          
          {/* Not a fit */}
          <div>
            <h3 className="text-[#FF4500] font-semibold mb-4">Not a fit if you are:</h3>
            <ul className="space-y-3 text-[#B0B0B0] mythos-body-base">
              <li className="flex gap-3">
                <span className="text-[#FF4500] flex-shrink-0">→</span>
                <span>Looking for short-term hype or quick exits</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF4500] flex-shrink-0">→</span>
                <span>Unaligned with long-term, city-first systems</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Investor CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="max-w-2xl">
          {/* Primary CTA */}
          <button 
            className="w-full sm:w-auto px-12 py-4 bg-[#0047FF] text-white rounded font-semibold hover:bg-[#0047FF]/90 transition-all hover:shadow-xl hover:shadow-[#0047FF]/50 transform hover:-translate-y-0.5 mb-16"
            onClick={() => setIsModalOpen(true)}
          >
            Request the Deck
          </button>

          {/* Secondary Contact */}
          <div>
            <h3 className="text-white font-medium mb-6 text-lg">
              Start a conversation
            </h3>
            <div className="space-y-2 text-[#B0B0B0]">
              <p className="text-white font-medium">Nate Adams</p>
              <p className="text-sm">Founder & CEO</p>
              <p className="text-sm">
                <a 
                  href="mailto:nateadams@mythosrebellion.com" 
                  className="hover:text-white transition-colors underline decoration-white/20 hover:decoration-white"
                >
                  nateadams@mythosrebellion.com
                </a>
              </p>
              <p className="text-sm">
                <a 
                  href="tel:+12144309485" 
                  className="hover:text-white transition-colors underline decoration-white/20 hover:decoration-white"
                >
                  214-430-9485
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <InvestorDeckModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}