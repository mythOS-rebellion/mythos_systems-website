import { useState } from 'react';

/**
 * Mylo Orb - the Arrakis-style desert-moon planet from MythOS Pro.
 * Ported from mythOS-pro/components/mylo/MyloOrb3DPlanet.tsx (pure CSS, no deps).
 * styled-jsx converted to a scoped <style>, keyframes namespaced (mylo-*),
 * and a `size` prop added (the orb is authored at 280px and scaled to fit).
 */
export function MyloOrb({ size = 360 }: { size?: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex items-center justify-center" style={{ width: size, height: size }}>
      <div style={{ transform: `scale(${size / 280})` }}>
        <div className="relative" style={{ width: '280px', height: '280px', perspective: '1000px' }}>
          {/* Outer Atmosphere Glow */}
          <div
            className="absolute inset-0 rounded-full transition-all duration-700"
            style={{
              background: 'radial-gradient(circle, rgba(234, 88, 12, 0.4), rgba(194, 65, 12, 0.2), transparent 70%)',
              filter: 'blur(30px)',
              transform: isHovered ? 'scale(1.3)' : 'scale(1.2)',
              opacity: isHovered ? 0.9 : 0.6,
              animation: 'mylo-pulse-glow 4s ease-in-out infinite',
            }}
          />

          {/* Main 3D Sphere */}
          <button
            onClick={() => setIsActive((v) => !v)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative focus:outline-none"
            style={{ width: '280px', height: '280px', transformStyle: 'preserve-3d', cursor: 'pointer' }}
            aria-label="Mylo"
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                transformStyle: 'preserve-3d',
                animation: isActive ? 'mylo-spin 30s linear infinite' : 'mylo-spin 60s linear infinite',
                boxShadow: `0 0 60px rgba(234, 88, 12, 0.6), 0 0 120px rgba(194, 65, 12, 0.3), inset -40px -40px 80px rgba(0, 0, 0, 0.9), inset 40px 40px 80px rgba(255, 237, 213, 0.3)`,
                background: `radial-gradient(circle at 35% 35%, rgba(255, 237, 213, 0.9) 0%, rgba(251, 191, 36, 0.8) 10%, rgba(249, 115, 22, 0.7) 25%, rgba(234, 88, 12, 0.9) 45%, rgba(194, 65, 12, 1) 65%, rgba(120, 40, 10, 1) 80%, rgba(40, 20, 10, 1) 95%)`,
              }}
            >
              {/* Texture 1: sand dunes */}
              <div
                className="absolute inset-0 rounded-full opacity-60"
                style={{
                  background: `radial-gradient(ellipse 100px 60px at 25% 30%, rgba(255, 237, 213, 0.8), transparent 50%), radial-gradient(ellipse 80px 50px at 60% 45%, rgba(251, 191, 36, 0.6), transparent 50%), radial-gradient(ellipse 70px 40px at 40% 70%, rgba(234, 88, 12, 0.5), transparent 50%), radial-gradient(ellipse 90px 55px at 70% 25%, rgba(255, 237, 213, 0.4), transparent 50%), radial-gradient(ellipse 60px 35px at 20% 65%, rgba(194, 65, 12, 0.6), transparent 50%)`,
                  animation: 'mylo-drift-texture 40s linear infinite',
                }}
              />
              {/* Texture 2: dark swirls */}
              <div
                className="absolute inset-0 rounded-full opacity-70"
                style={{
                  background: `radial-gradient(ellipse 120px 70px at 15% 40%, rgba(20, 10, 5, 0.8), transparent 60%), radial-gradient(ellipse 100px 60px at 75% 60%, rgba(40, 20, 10, 0.7), transparent 60%), radial-gradient(ellipse 80px 50px at 50% 20%, rgba(30, 15, 8, 0.6), transparent 60%), radial-gradient(ellipse 90px 55px at 30% 80%, rgba(50, 25, 12, 0.65), transparent 60%)`,
                  animation: 'mylo-drift-shadows 50s linear infinite reverse',
                }}
              />
              {/* Texture 3: bright highlights */}
              <div
                className="absolute inset-0 rounded-full opacity-50"
                style={{
                  background: `radial-gradient(ellipse 60px 40px at 40% 35%, rgba(255, 250, 240, 0.9), transparent 50%), radial-gradient(ellipse 50px 30px at 65% 50%, rgba(255, 237, 213, 0.7), transparent 50%), radial-gradient(ellipse 45px 28px at 25% 55%, rgba(255, 245, 225, 0.6), transparent 50%), radial-gradient(ellipse 55px 35px at 75% 30%, rgba(255, 250, 240, 0.5), transparent 50%)`,
                  animation: 'mylo-drift-highlights 35s linear infinite',
                  mixBlendMode: 'overlay',
                }}
              />
              {/* Texture 4: orange energy veins */}
              <div
                className="absolute inset-0 rounded-full opacity-40"
                style={{
                  background: `radial-gradient(ellipse 150px 3px at 30% 45%, rgba(249, 115, 22, 0.9), transparent 70%), radial-gradient(ellipse 120px 2px at 60% 55%, rgba(234, 88, 12, 0.8), transparent 70%), radial-gradient(ellipse 100px 2px at 45% 65%, rgba(251, 146, 60, 0.7), transparent 70%), radial-gradient(ellipse 130px 3px at 25% 35%, rgba(249, 115, 22, 0.6), transparent 70%)`,
                  animation: 'mylo-pulse-veins 3s ease-in-out infinite',
                  mixBlendMode: 'screen',
                }}
              />
              {/* Top highlight */}
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: 'radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.4), transparent 30%)', opacity: 0.8 }}
              />
              {/* Bottom shadow */}
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: 'radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.7), transparent 50%)', opacity: 0.9 }}
              />
              {/* Terminator line */}
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: 'linear-gradient(135deg, transparent 45%, rgba(0, 0, 0, 0.6) 50%, transparent 55%)', opacity: 0.5 }}
              />
              {isActive && (
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(251, 191, 36, 0.6), transparent 60%)', animation: 'mylo-pulse-active 2s ease-in-out infinite', mixBlendMode: 'screen' }}
                />
              )}
            </div>

            {/* Atmosphere rim light */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                border: '2px solid rgba(234, 88, 12, 0.3)',
                boxShadow: 'inset 0 0 40px rgba(234, 88, 12, 0.2), 0 0 40px rgba(234, 88, 12, 0.3)',
                opacity: isHovered ? 1 : 0.7,
                transition: 'opacity 0.3s ease',
              }}
            />
          </button>

          {/* Orbit ring */}
          <div
            className="absolute left-1/2 top-1/2 pointer-events-none"
            style={{
              width: '340px',
              height: '340px',
              transform: 'translate(-50%, -50%) rotateX(75deg)',
              border: '1px solid rgba(234, 88, 12, 0.2)',
              borderRadius: '50%',
              opacity: isHovered ? 0.6 : 0.3,
              transition: 'opacity 0.5s ease',
            }}
          />
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes mylo-spin { from { transform: rotateY(0deg) rotateZ(0deg); } to { transform: rotateY(360deg) rotateZ(360deg); } }
        @keyframes mylo-drift-texture { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes mylo-drift-shadows { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes mylo-drift-highlights { from { transform: rotate(0deg) scale(1); } 50% { transform: rotate(180deg) scale(1.05); } to { transform: rotate(360deg) scale(1); } }
        @keyframes mylo-pulse-veins { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        @keyframes mylo-pulse-glow { 0%, 100% { opacity: 0.6; transform: scale(1.2); } 50% { opacity: 0.9; transform: scale(1.3); } }
        @keyframes mylo-pulse-active { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
      `,
        }}
      />
    </div>
  );
}
