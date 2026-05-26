import { MapPin, Award, TrendingUp } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: MapPin,
      title: 'Reconnect With Your City',
      description: 'Download The Network and discover local businesses, events, and communities in real-time.',
      color: '#0047FF',
    },
    {
      number: '02',
      icon: Award,
      title: 'Support Local, Earn Rebel Points',
      description: 'Every purchase at small businesses earns you rewards and builds your city\'s economy.',
      color: '#FF4500',
    },
    {
      number: '03',
      icon: TrendingUp,
      title: 'Break Free, Build Community',
      description: 'Escape the brain rot loop of global feeds. Businesses compete with Big Tech and win. Communities thrive. You get your city back.',
      color: '#9D4EDD',
    },
  ];

  return (
    <section className="py-24 bg-[#000000] relative">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF4500] to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mythos-headline-large text-white text-center mb-16">
          Empower Your Community in 3 Simple Steps
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting lines - desktop only */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0047FF] via-[#FF4500] to-[#9D4EDD] opacity-30"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Number badge */}
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0 border-4"
                  style={{ 
                    backgroundColor: '#000000',
                    borderColor: step.color,
                    boxShadow: `0 0 20px ${step.color}50`
                  }}
                >
                  <span className="text-2xl font-bold mythos-mono" style={{ color: step.color }}>
                    {step.number}
                  </span>
                </div>

                {/* Card content */}
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                    <Icon size={24} style={{ color: step.color }} />
                    <h3 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-headline)' }}>
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-[#B0B0B0] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}