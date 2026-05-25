import networkImage from "figma:asset/74985c6751d2bbfae4e6dc04a8c7db4f79626033.png";
import { Tilt } from "./ui/tilt";
import { Spotlight } from "./ui/spotlight";
import AnimatedShaderBackground from "./ui/animated-shader-background";

export function SanDiegoSection() {
  return (
    <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Animated Shader Background */}
      <AnimatedShaderBackground />
      
      {/* Dark overlay to reduce intensity and improve text readability */}
      <div className="absolute inset-0 bg-[#0A0A0A]/60 z-[1]" />
      
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0047FF] to-transparent z-[2]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[3]">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="mythos-headline-large text-white mb-6">
            Built for Your City
          </h2>
          <p className="mythos-body-large text-[#B0B0B0] max-w-3xl mx-auto">
            MythOS connects local businesses, people, and systems into shared digital infrastructure.
          </p>
        </div>

        {/* Network Illustration Image with Tilt Effect */}
        <div className="relative w-full max-w-6xl mx-auto">
          <Tilt
            rotationFactor={6}
            isRevese
            style={{
              transformOrigin: 'center center',
            }}
            springOptions={{
              stiffness: 26.7,
              damping: 4.1,
              mass: 0.2,
            }}
            className="group relative rounded-lg"
          >
            <Spotlight
              className="z-10 from-[#0047FF]/50 via-[#9D4EDD]/30 to-[#FF4500]/20 blur-3xl"
              size={400}
              springOptions={{
                stiffness: 26.7,
                damping: 4.1,
                mass: 0.2,
              }}
            />
            <img 
              src={networkImage} 
              alt="MythOS network infrastructure diagram showing connections between local businesses, shared infrastructure, and community"
              className="w-full h-auto rounded-lg"
            />
          </Tilt>
        </div>
      </div>
    </section>
  );
}