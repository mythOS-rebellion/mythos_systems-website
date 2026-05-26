import { Smartphone, Zap, Brain } from 'lucide-react';

export function ProductCards() {
  const products = [
    {
      icon: Smartphone,
      color: '#0047FF',
      glowColor: 'rgba(0, 71, 255, 0.3)',
      title: 'Reconnect With Your City',
      subtitle: 'THE NETWORK (For Users)',
      description: 'Find local businesses, events, and communities on a real-time map. No ad walls. No corporate chains drowning out your neighborhood.',
    },
    {
      icon: Zap,
      color: '#FF4500',
      glowColor: 'rgba(255, 69, 0, 0.3)',
      title: 'Own the Power of the Monopolies',
      subtitle: 'MythOS PRO (For Businesses)',
      description: 'Let Mylo work for you. Autonomous AI-powered marketing, payroll, scheduling, reviews, market research, and much more - at $100/month instead of $3,700.',
    },
    {
      icon: Brain,
      color: '#9D4EDD',
      glowColor: 'rgba(157, 78, 221, 0.3)',
      title: 'AI That Actually Knows Your City',
      subtitle: 'MYLO PREMIUM (For Power Users)',
      description: 'Upgrade to Mylo Premium ($20/month) for a personal AI assistant that learns your neighborhood. Or let Mylo run your business ($100/month with MythOS Pro) - autonomous marketing, scheduling, and insights that compete with Big Tech.',
    },
  ];

  return (
    <section id="features" className="py-24 bg-[#000000] relative">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#9D4EDD] to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mythos-headline-large text-white text-center mb-16">
          Everything You Need to Support Local
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={index}
                className="group relative bg-[#1A1A1A] rounded-lg p-8 border transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                style={{
                  borderColor: product.color,
                  boxShadow: `0 0 20px ${product.glowColor}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 40px ${product.glowColor}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 20px ${product.glowColor}`;
                }}
              >
                {/* Icon */}
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${product.color}20`, border: `2px solid ${product.color}` }}
                >
                  <Icon size={32} style={{ color: product.color }} />
                </div>

                {/* Subtitle */}
                <div 
                  className="text-xs font-bold tracking-wider mb-2 mythos-mono"
                  style={{ color: product.color }}
                >
                  {product.subtitle}
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-headline)' }}>
                  {product.title}
                </h3>

                {/* Description */}
                <p className="text-[#B0B0B0] leading-relaxed">
                  {product.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}