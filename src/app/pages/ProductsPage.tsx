import { Navigation } from '../components/Navigation';
import { FinalCTA } from '../components/FinalCTA';
import { Smartphone, Briefcase, Sparkles, Zap } from 'lucide-react';
import mythosProDashboard from 'figma:asset/b1d9c1aa522c744ea594f4f54537ababa600b31c.png';
import mythosProAnalytics from 'figma:asset/224c4783487e44600ffd000a8f550e372587cf50.png';
import myloPhone from 'figma:asset/e8dd1b1c46b4e6cb84e767dbd40eef495629d198.png';
import networkCommunities from 'figma:asset/eb5f05cf855f85399eab057bbea38412373ab147.png';
import networkPulse from 'figma:asset/cf7318d5c03b5b607eef7cff785636959416d1ea.png';
import networkMap from 'figma:asset/275259ca2405960447664508beeb1bd72c317899.png';

export function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#000000]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0047FF]/10 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
              Products Built for Rebellion
            </h1>
            <p className="text-xl text-[#B0B0B0] max-w-3xl mx-auto">
              Everything you need to break free from Big Tech monopolies and rebuild your local economy
            </p>
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#0047FF] to-transparent"></div>

      {/* The Network Section */}
      <section className="py-16 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0047FF]/20 border border-[#0047FF]/30 rounded-full mb-6">
              <Smartphone className="w-5 h-5 text-[#0047FF]" />
              <span className="text-[#0047FF] font-semibold">FREE FOREVER</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
              The Network
            </h2>
            
            <p className="text-xl text-[#B0B0B0] mb-8 leading-relaxed max-w-3xl mx-auto">
              A hyperlocal discovery app that reconnects you with your city. Find events, businesses, and hidden gems near you
            </p>
            
            <div className="space-y-4 max-w-2xl mx-auto mb-12">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#0047FF] rounded-full mt-2"></div>
                <p className="text-[#B0B0B0]">Connect with local residents and community groups</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#0047FF] rounded-full mt-2"></div>
                <p className="text-[#B0B0B0]">Find events and things to do in your city</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#0047FF] rounded-full mt-2"></div>
                <p className="text-[#B0B0B0]">Turn your night out into a night to remember</p>
              </div>
            </div>
          </div>
          
          {/* Network App Screenshots - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="rounded-2xl border border-[#0047FF]/30 overflow-hidden bg-[#000000]">
              <img 
                src={networkCommunities} 
                alt="The Network Communities" 
                className="w-full h-auto"
              />
            </div>
            
            <div className="rounded-2xl border border-[#0047FF]/30 overflow-hidden bg-[#000000]">
              <img 
                src={networkPulse} 
                alt="The Network Local Pulse" 
                className="w-full h-auto"
              />
            </div>
            
            <div className="rounded-2xl border border-[#0047FF]/30 overflow-hidden bg-[#000000]">
              <img 
                src={networkMap} 
                alt="The Network Map" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MythOS Pro Section */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Images */}
            <div className="relative order-2 lg:order-1 space-y-6">
              {/* Dashboard Image */}
              <div className="rounded-2xl border border-[#0047FF]/30 overflow-hidden bg-[#000000]">
                <img 
                  src={mythosProDashboard} 
                  alt="MythOS Pro Business Dashboard" 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Analytics Image */}
              <div className="rounded-2xl border border-[#0047FF]/30 overflow-hidden bg-[#000000]">
                <img 
                  src={mythosProAnalytics} 
                  alt="MythOS Pro Analytics" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#9D4EDD]/20 border border-[#9D4EDD]/30 rounded-full mb-6">
                <Zap className="w-5 h-5 text-[#9D4EDD]" />
                <span className="text-[#9D4EDD] font-semibold">$100/MONTH</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
                MythOS Pro
              </h2>
              
              <p className="text-xl text-[#B0B0B0] mb-8 leading-relaxed">
                AI-powered business automations that handles front desk roles, scheduling, CRM, reviews, analytics and more. Everything local businesses need at a fraction of enterprise software costs.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#9D4EDD] rounded-full mt-2"></div>
                  <p className="text-[#B0B0B0]">Complete business automations powered by Mylo</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#9D4EDD] rounded-full mt-2"></div>
                  <p className="text-[#B0B0B0]">Real-time analytics and business intelligence</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#9D4EDD] rounded-full mt-2"></div>
                  <p className="text-[#B0B0B0]">Make smarter decisions with Mylo's insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mylo AI Section */}
      <section className="py-20 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF4500]/20 border border-[#FF4500]/30 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-[#FF4500]" />
              <span className="text-[#FF4500] font-semibold">AI ASSISTANT</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
              Meet Mylo
            </h2>
            
            <p className="text-xl text-[#B0B0B0] max-w-3xl mx-auto mb-12 leading-relaxed">
              Your AI business assistant that automates the tedious work so you can focus on what matters - running your business and serving your community.
            </p>
          </div>
          
          {/* Mylo Phone Image */}
          <div className="flex justify-center mb-16">
            <div className="max-w-sm rounded-2xl border border-[#FF4500]/30 overflow-hidden bg-[#000000]">
              <img 
                src={myloPhone} 
                alt="Mylo AI Assistant Interface" 
                className="w-full h-auto"
              />
            </div>
          </div>
          
          {/* Mylo Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-[#111111] border border-[#FF4500]/30 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#FF4500]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-[#FF4500]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Intelligent Automation</h3>
              <p className="text-[#B0B0B0]">Handles marketing, scheduling, and customer management automatically</p>
            </div>
            
            <div className="bg-[#111111] border border-[#FF4500]/30 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#FF4500]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-[#FF4500]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Always Learning</h3>
              <p className="text-[#B0B0B0]">Adapts to your business and learns from your local market</p>
            </div>
            
            <div className="bg-[#111111] border border-[#FF4500]/30 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-[#FF4500]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-[#FF4500]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Human-Centric</h3>
              <p className="text-[#B0B0B0]">Designed to augment your work, not replace human connection</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <FinalCTA />
    </div>
  );
}