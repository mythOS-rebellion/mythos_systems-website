import { Navigation } from '../components/Navigation';
import { FinalCTA } from '../components/FinalCTA';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function AboutUsPage() {
  const sanDiegoImage = 'https://images.unsplash.com/photo-1669624064892-1a4e662eb829?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYW4lMjBEaWVnbyUyMGRvd250b3duJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzcwMzk5ODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080';

  return (
    <div className="min-h-screen bg-[#000000]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0047FF]/10 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
              This is How Local Comes Back
            </h1>
            <p className="text-xl text-[#B0B0B0] max-w-3xl mx-auto">
              Digital infrastructure for local economies. Built to fight monopolies.
            </p>
          </div>
        </div>
      </section>

      {/* Why We Started Section */}
      <section className="py-20 bg-[#000000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-[#FF4500]/20 border border-[#FF4500]/30 rounded-full text-[#FF4500] font-bold mb-6">
              WHY WE STARTED
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
              The Problem is Distribution
            </h2>
            <div className="space-y-4 text-lg text-[#B0B0B0]">
              <p>
                Local businesses lose not because they're worse, but because they don't control distribution. The best barber in town can't compete with a chain's search rankings. The neighborhood café with the perfect espresso gets buried under corporate ad spend. Quality doesn't matter when the algorithms decide who gets seen.
              </p>
              <p>
                The same systems that killed local commerce killed community. Apps built to maximize engagement keep you scrolling feeds instead of walking streets. Designed for extraction, not exploration. Your attention gets monetized, your data gets sold, and wealth flows out of your neighborhood to data centers thousands of miles away.
              </p>
              <p>
                But visibility is only half the battle. Corporate chains have entire teams—marketing, sales, tech, operations. Small business owners are juggling twenty roles at once. While monopolies deploy custom software and AI infrastructure to stay ahead, local businesses are stuck with tools that weren't built for them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We're Building Section */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-[#0047FF]/20 border border-[#0047FF]/30 rounded-full text-[#0047FF] font-bold mb-6">
              WHAT WE'RE BUILDING
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
              Digital Infrastructure That Levels the Field
            </h2>
          </div>
          
          <div className="space-y-6 text-lg text-[#B0B0B0]">
            <p>
              Tools that give small businesses the same visibility chains pay millions for. AI that handles the work of an entire team, tailored specifically for how local businesses actually operate. Systems designed for circulation, not extraction.
            </p>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-20 bg-[#000000]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-[#9D4EDD]/20 border border-[#9D4EDD]/30 rounded-full text-[#9D4EDD] font-bold mb-6">
              WHY IT MATTERS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
              Strong Local Economies Build Strong Communities
            </h2>
          </div>
          
          <div className="space-y-6 text-lg text-[#B0B0B0]">
            <p>
              When you find the best taco spot three blocks away instead of the chain pushed to the top of your search, money stays in your neighborhood. When you explore instead of scroll, you meet people. Real connection happens in real places.
            </p>
          </div>
        </div>
      </section>

      {/* Where We're Going Section */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-[#0047FF]/20 border border-[#0047FF]/30 rounded-full text-[#0047FF] font-bold mb-6">
              WHERE WE'RE GOING
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
              San Diego, DFW, 2026. Then We Scale.
            </h2>
          </div>
          
          <div className="space-y-6 text-lg text-[#B0B0B0] text-center">
            <p className="text-white font-bold text-xl">
              This is infrastructure. This is how local comes back.
            </p>
          </div>
        </div>
      </section>

      {/* Built by Rebels Section */}
      <section className="py-20 bg-[#000000]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12" style={{ fontFamily: 'var(--font-headline)' }}>
            Built By Rebels
          </h2>
          <div className="space-y-6 text-lg text-[#B0B0B0]">
            <p>
              We don't play by Big Tech's rules because their rules were designed to keep you losing. While they optimize for extraction, we build for circulation. While they design for addiction, we design for exploration. While they consolidate power, we distribute it.
            </p>
            <p>
              Being a rebel isn't about being loud - it's about refusing to accept that local has to lose. It's about building infrastructure that actually serves communities instead of mining them. It's about believing that the best business in your neighborhood should win, not the one with the biggest ad budget.
            </p>
            <p>
              We're rebels because we had to be. Because no one else was building this. Because waiting for the system to fix itself meant watching more neighborhoods die.
            </p>
            <p className="text-white font-bold text-xl text-center mt-8">
              Are you a rebel too?
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <FinalCTA />
    </div>
  );
}