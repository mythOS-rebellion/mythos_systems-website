import React from 'react';

/**
 * A flickering neon sign - adapted from the neon-lighting component.
 * White "tube" with a colored glow (default MythOS orange). Intensity is
 * dialed down from the original so it reads as a tasteful hook, not a rave.
 */
interface NeonSignProps {
  text: string;
  color?: string;
  intensity?: number;
  className?: string;
  sizeClass?: string;
}

export function NeonSign({
  text,
  color = '#FF4500',
  intensity = 0.5,
  className = '',
  sizeClass = 'text-2xl md:text-4xl',
}: NeonSignProps) {
  return (
    <div
      className={`inline-flex ${className}`}
      style={
        {
          '--neon-text-color': color,
          '--neon-border-color': color,
          '--neon-intensity': intensity,
        } as React.CSSProperties
      }
    >
      <span
        className={`${sizeClass} select-none rounded-2xl border-2 border-white/80 px-6 py-3 font-light uppercase italic tracking-[0.12em] text-white md:px-9 md:py-4`}
        style={{ animation: 'mylo-neon-flicker 2.6s infinite alternate' }}
      >
        {text}
      </span>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes mylo-neon-flicker {
          0%, 18%, 22%, 25%, 53%, 57%, 100% {
            text-shadow:
              0 0 calc(0.4rem * var(--neon-intensity, 1)) #fff,
              0 0 calc(1.2rem * var(--neon-intensity, 1)) var(--neon-text-color),
              0 0 calc(2.4rem * var(--neon-intensity, 1)) var(--neon-text-color),
              0 0 calc(4rem * var(--neon-intensity, 1)) var(--neon-text-color);
            box-shadow:
              0 0 calc(0.4rem * var(--neon-intensity, 1)) rgba(255,255,255,0.6),
              inset 0 0 calc(0.4rem * var(--neon-intensity, 1)) rgba(255,255,255,0.4),
              0 0 calc(1.6rem * var(--neon-intensity, 1)) var(--neon-border-color),
              inset 0 0 calc(1.2rem * var(--neon-intensity, 1)) var(--neon-border-color);
          }
          20%, 24%, 55% { text-shadow: none; box-shadow: none; }
        }
      `,
        }}
      />
    </div>
  );
}
