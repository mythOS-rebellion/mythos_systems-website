import { motion } from "motion/react";
import networkImage from "figma:asset/74985c6751d2bbfae4e6dc04a8c7db4f79626033.png";
import { Tilt } from "./ui/tilt";
import { Spotlight } from "./ui/spotlight";

export function SanDiegoSection() {
  return (
    <section className="py-24 bg-[#000000] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[3]">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="mythos-headline-large text-white mb-6">
            Built for Your City
          </h2>
          <p className="mythos-body-large text-[#B0B0B0] max-w-3xl mx-auto">
            MythOS connects local businesses, people, and systems into shared digital infrastructure.
          </p>
        </motion.div>

        {/* Network Illustration Image with Tilt Effect */}
        <motion.div
          className="relative w-full max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}