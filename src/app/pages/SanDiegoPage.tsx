import { Navigation } from '../components/Navigation';
import { Zap, Calendar, Users, MapPin, Music, Heart } from 'lucide-react';
import { useState } from 'react';
import { EarlyAccessModal } from '../components/EarlyAccessModal';
import { StayUpdatedModal } from '../components/StayUpdatedModal';
import { GetInvolvedModal } from '../components/GetInvolvedModal';

export function SanDiegoPage() {
  const [isEarlyAccessModalOpen, setIsEarlyAccessModalOpen] = useState(false);
  const [isStayUpdatedModalOpen, setIsStayUpdatedModalOpen] = useState(false);
  const [isGetInvolvedModalOpen, setIsGetInvolvedModalOpen] = useState(false);

  const handleJoinRebellion = () => {
    setIsEarlyAccessModalOpen(true);
  };

  const handleStayUpdated = () => {
    setIsStayUpdatedModalOpen(true);
  };

  const handleGetInvolved = () => {
    setIsGetInvolvedModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0047FF]/20 via-[#9D4EDD]/10 to-transparent"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0047FF]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9D4EDD]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-6 py-2 border-2 border-[#0047FF] rounded-full">
            <span className="text-[#0047FF] font-bold tracking-wider">COMING 2026</span>
          </div>
          <h1 
            className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            SAN DIEGO:<br />
            THE REBELLION<br />
            STARTS HERE
          </h1>
        </div>
      </section>

      {/* You're First Section */}
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-l-4 border-[#FF4500] pl-8">
            <h2 
              className="text-5xl font-bold text-white mb-8"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              You're First.
            </h2>
            <div className="space-y-6 text-xl text-[#B0B0B0] leading-relaxed">
              <p>
                San Diego isn't just another launch city. You're <span className="text-white font-bold">THE launch city</span>. The first place in the world where The Network goes live. The first city to experience what happens when we rip down the ad walls and rebuild discovery from scratch.
              </p>
              <p>
                This is your city. This is your moment. And we're about to make it unforgettable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Ready Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#9D4EDD]/5 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-5xl font-bold text-white mb-4 text-center"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Get Ready
          </h2>
          <p className="text-xl text-[#B0B0B0] text-center mb-16 max-w-4xl mx-auto">
            We're not just dropping an app and disappearing. We're throwing down in San Diego like it's never been done before.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Street Festivals */}
            <div className="border border-white/10 rounded-lg p-8 hover:border-[#0047FF]/50 transition-all group">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-[#0047FF]/10 group-hover:bg-[#0047FF]/20 transition-all">
                  <Music className="w-6 h-6 text-[#0047FF]" />
                </div>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-headline)' }}>
                  Street festivals
                </h3>
              </div>
              <p className="text-[#B0B0B0] leading-relaxed">
                Block parties in North Park, Hillcrest, Gaslamp. Live music, local food, zero corporate sponsors. Just your city celebrating itself.
              </p>
            </div>

            {/* Campus Takeovers */}
            <div className="border border-white/10 rounded-lg p-8 hover:border-[#9D4EDD]/50 transition-all group">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-[#9D4EDD]/10 group-hover:bg-[#9D4EDD]/20 transition-all">
                  <Users className="w-6 h-6 text-[#9D4EDD]" />
                </div>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-headline)' }}>
                  Campus takeovers
                </h3>
              </div>
              <p className="text-[#B0B0B0] leading-relaxed">
                SDSU, USD, Point Loma—we're partnering with frats, sororities, and student orgs to throw events that actually matter. Not another corporate-sponsored mixer. Real parties. Real people. Real community.
              </p>
            </div>

            {/* Guerrilla Marketing */}
            <div className="border border-white/10 rounded-lg p-8 hover:border-[#FF4500]/50 transition-all group">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-[#FF4500]/10 group-hover:bg-[#FF4500]/20 transition-all">
                  <Zap className="w-6 h-6 text-[#FF4500]" />
                </div>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-headline)' }}>
                  Guerrilla marketing stunts
                </h3>
              </div>
              <p className="text-[#B0B0B0] leading-relaxed">
                We're hitting Balboa Park, Pacific Beach, La Jolla shores. Flash mobs. Pop-ups. Surprises around every corner. If you're in San Diego in 2026, you'll know we're here.
              </p>
            </div>

            {/* Free Merch */}
            <div className="border border-white/10 rounded-lg p-8 hover:border-[#0047FF]/50 transition-all group">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-[#0047FF]/10 group-hover:bg-[#0047FF]/20 transition-all">
                  <Heart className="w-6 h-6 text-[#0047FF]" />
                </div>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-headline)' }}>
                  Free merch drops
                </h3>
              </div>
              <p className="text-[#B0B0B0] leading-relaxed">
                First 1,000 downloads? You're getting gear. Limited edition. San Diego exclusive. Wear it proud.
              </p>
            </div>

            {/* Local Legends */}
            <div className="border border-white/10 rounded-lg p-8 hover:border-[#9D4EDD]/50 transition-all group">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-[#9D4EDD]/10 group-hover:bg-[#9D4EDD]/20 transition-all">
                  <MapPin className="w-6 h-6 text-[#9D4EDD]" />
                </div>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-headline)' }}>
                  Partnership with local legends
                </h3>
              </div>
              <p className="text-[#B0B0B0] leading-relaxed">
                We're teaming up with the businesses, community groups, and cultural centers that make this city what it is. The ones who've been here holding it down while Big Tech extracts wealth and attention. They're with us. And we're with them.
              </p>
            </div>

            {/* Events Calendar */}
            <div className="border border-white/10 rounded-lg p-8 hover:border-[#FF4500]/50 transition-all group">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-[#FF4500]/10 group-hover:bg-[#FF4500]/20 transition-all">
                  <Calendar className="w-6 h-6 text-[#FF4500]" />
                </div>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-headline)' }}>
                  Events calendar that never stops
                </h3>
              </div>
              <p className="text-[#B0B0B0] leading-relaxed">
                Concerts. Art shows. Markets. Meetups. All local, all community-driven, all listed on The Network so you never miss what's happening in your neighborhood again.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-2xl text-white font-bold mb-2" style={{ fontFamily: 'var(--font-headline)' }}>
              This isn't a product launch.
            </p>
            <p className="text-3xl text-[#0047FF] font-bold" style={{ fontFamily: 'var(--font-headline)' }}>
              This is a movement.
            </p>
            <p className="text-xl text-[#B0B0B0] mt-4">
              And San Diego is ground zero.
            </p>
          </div>
        </div>
      </section>

      {/* Discover Connect Live Section */}
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0047FF]/10 to-[#9D4EDD]/10 border border-white/10 rounded-2xl p-12">
            <h2 
              className="text-5xl font-bold text-white mb-8"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              Discover. Connect. Live.
            </h2>
            <div className="space-y-6 text-lg text-[#B0B0B0] leading-relaxed">
              <p>
                The Network isn't just about finding businesses—it's about finding your people.
              </p>
              <p>
                Meet up with neighbors at community events. Discover group activities you didn't know existed three blocks away. Join local clubs. Attend that underground art show. Find your crew at the weekly pickup basketball game. See what's actually happening in your city instead of what an algorithm tells you to care about.
              </p>
              <p className="text-white font-semibold text-xl">
                No ads. No extraction. Just real discovery and real connection.
              </p>
              <p className="text-[#0047FF] font-bold text-2xl" style={{ fontFamily: 'var(--font-headline)' }}>
                San Diego is about to feel alive again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-[#FF4500]/5 to-transparent"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-5xl font-bold text-white mb-12 text-center"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Why This Matters
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-6xl font-bold text-[#0047FF] mb-2" style={{ fontFamily: 'var(--font-headline)' }}>
                379K
              </div>
              <p className="text-[#B0B0B0]">
                Small businesses call San Diego home
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-[#9D4EDD] mb-2" style={{ fontFamily: 'var(--font-headline)' }}>
                98%
              </div>
              <p className="text-[#B0B0B0]">
                Of all businesses here are small businesses
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-[#FF4500] mb-2" style={{ fontFamily: 'var(--font-headline)' }}>
                60%
              </div>
              <p className="text-[#B0B0B0]">
                Of San Diegans employed by small businesses
              </p>
            </div>
          </div>

          <div className="space-y-6 text-lg text-[#B0B0B0] leading-relaxed">
            <p>
              But only <span className="text-white font-bold">1 in 4 small business jobs</span> pays enough to actually live here. The gap between local and corporate keeps growing.
            </p>
            <p>
              Meanwhile, the best spots in your neighborhood stay invisible while chains own the top of every search. You scroll feeds designed to keep you hooked instead of apps built to help you explore.
            </p>
            <p className="text-white text-2xl font-bold" style={{ fontFamily: 'var(--font-headline)' }}>
              We're fixing that. In 2026. Starting here.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0047FF]/20 via-[#9D4EDD]/20 to-[#FF4500]/20"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="text-6xl md:text-7xl font-bold text-white mb-8"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            This Is Your Rebellion
          </h2>
          <div className="space-y-6 text-xl text-[#B0B0B0] leading-relaxed mb-12 max-w-4xl mx-auto">
            <p>
              San Diego, you're not just the first city. You're the proof of concept. You're the blueprint. When this works here—and it will—the whole country follows.
            </p>
            <p className="text-white text-2xl font-bold" style={{ fontFamily: 'var(--font-headline)' }}>
              This is how local comes back.
            </p>
            <p className="text-white text-2xl font-bold" style={{ fontFamily: 'var(--font-headline)' }}>
              This is how community rebuilds.
            </p>
            <p className="text-white text-2xl font-bold" style={{ fontFamily: 'var(--font-headline)' }}>
              This is your city coming alive.
            </p>
          </div>

          <div className="text-4xl font-bold text-[#0047FF] mb-8" style={{ fontFamily: 'var(--font-headline)' }}>
            Ready?
          </div>

          <div className="flex flex-wrap gap-6 justify-center">
            <button
              onClick={handleJoinRebellion}
              className="px-10 py-5 bg-[#0047FF] text-white text-lg font-bold rounded-lg hover:bg-[#0047FF]/90 transition-all duration-200 hover:shadow-lg hover:shadow-[#0047FF]/50"
            >
              Join the Rebellion
            </button>
            <button
              onClick={handleStayUpdated}
              className="px-10 py-5 border-2 border-[#9D4EDD] text-[#9D4EDD] text-lg font-bold rounded-lg hover:bg-[#9D4EDD]/10 transition-all duration-200"
            >
              Stay Updated
            </button>
            <button
              onClick={handleGetInvolved}
              className="px-10 py-5 border-2 border-[#FF4500] text-[#FF4500] text-lg font-bold rounded-lg hover:bg-[#FF4500]/10 transition-all duration-200"
            >
              Get Involved
            </button>
          </div>
        </div>
      </section>

      {/* Modals */}
      <EarlyAccessModal isOpen={isEarlyAccessModalOpen} onClose={() => setIsEarlyAccessModalOpen(false)} />
      <StayUpdatedModal isOpen={isStayUpdatedModalOpen} onClose={() => setIsStayUpdatedModalOpen(false)} />
      <GetInvolvedModal isOpen={isGetInvolvedModalOpen} onClose={() => setIsGetInvolvedModalOpen(false)} />
    </div>
  );
}