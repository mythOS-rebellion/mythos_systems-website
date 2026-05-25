'use client';

import React, { useEffect, useMemo, useRef } from 'react';

type CityPulseBackgroundProps = {
  className?: string;
  /** Base density of nodes (higher = more nodes) */
  density?: number; // default 1.0
  /** Visual intensity 0..1 */
  intensity?: number; // default 0.85
  /** Main glow color (blue) */
  primary?: string; // default '#2F6BFF'
  /** Accent glow color (orange) */
  accent?: string; // default '#FF5A1F'
  /** If true, reduces motion for accessibility */
  respectReducedMotion?: boolean; // default true
};

type Node = {
  x: number;
  y: number;
  neighbors: number[];
  pulse: number; // 0..1 pulse brightness
};

type Packet = {
  from: number;
  to: number;
  t: number; // 0..1 progress along edge
  speed: number;
  hueMix: number; // 0..1 (0=primary,1=accent)
  width: number;
  headGlow: number;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function hexToRgb(hex: string) {
  const h = hex.replace('#', '').trim();
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const num = parseInt(full, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function mixRgb(a: { r: number; g: number; b: number }, b: { r: number; g: number; b: number }, t: number) {
  return {
    r: Math.round(lerp(a.r, b.r, t)),
    g: Math.round(lerp(a.g, b.g, t)),
    b: Math.round(lerp(a.b, b.b, t)),
  };
}

function rgba(rgb: { r: number; g: number; b: number }, alpha: number) {
  return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
}

export default function CityPulseBackground({
  className,
  density = 1.0,
  intensity = 0.85,
  primary = '#2F6BFF',
  accent = '#FF5A1F',
  respectReducedMotion = true,
}: CityPulseBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const colors = useMemo(() => {
    return {
      primary: hexToRgb(primary),
      accent: hexToRgb(accent),
    };
  }, [primary, accent]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const media = respectReducedMotion ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    let reduceMotion = !!media?.matches;

    const onMedia = () => {
      reduceMotion = !!media?.matches;
    };
    media?.addEventListener?.('change', onMedia);

    // --- Sizing ---
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap for perf
    let w = 0;
    let h = 0;

    // --- World ---
    let nodes: Node[] = [];
    let packets: Packet[] = [];

    // For subtle drift
    let time = 0;
    let last = performance.now();

    // Config (tuned to look "premium", not "arcade")
    const cfg = {
      gridCell: 90 / density,              // base spacing
      jitter: 2 * density,                 // node offset from grid - reduced for even lines
      linkChance: 0.72,                     // chance to connect to right/down neighbor
      diagChance: 0.12,                     // chance to add diagonal
      maxNeighbors: 4,
      nodeRadius: 1.35,
      nodeGlow: 6,
      lineWidth: 1,
      lineAlpha: 0.08 * intensity,          // faint lines (important)
      gridAlpha: 0.05 * intensity,          // even fainter background grid
      packetSpawnRate: reduceMotion ? 0.0 : 4.5 * density, // per second baseline - increased significantly for more packets
      packetSpeedMin: 0.25,
      packetSpeedMax: 0.8,
    };

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildGraph();
    }

    function buildGraph() {
      nodes = [];
      packets = [];

      // Add some padding so edges don't feel cut off
      const pad = 40;
      const cell = cfg.gridCell;
      const cols = Math.ceil((w + pad * 2) / cell);
      const rows = Math.ceil((h + pad * 2) / cell);

      // Create nodes on a grid with slight jitter
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const x = gx * cell - pad + (Math.random() - 0.5) * cfg.jitter;
          const y = gy * cell - pad + (Math.random() - 0.5) * cfg.jitter;
          nodes.push({ x, y, neighbors: [], pulse: 0 });
        }
      }

      const idx = (gx: number, gy: number) => gy * cols + gx;

      // Connect nodes primarily right/down (city grid feel)
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const a = idx(gx, gy);
          const aNode = nodes[a];

          const tryLink = (b: number, chance: number) => {
            if (b < 0 || b >= nodes.length) return;
            if (Math.random() > chance) return;
            if (aNode.neighbors.length >= cfg.maxNeighbors) return;
            const bNode = nodes[b];
            if (bNode.neighbors.length >= cfg.maxNeighbors) return;

            // undirected
            if (!aNode.neighbors.includes(b)) aNode.neighbors.push(b);
            if (!bNode.neighbors.includes(a)) bNode.neighbors.push(a);
          };

          // Right, Down
          if (gx + 1 < cols) tryLink(idx(gx + 1, gy), cfg.linkChance);
          if (gy + 1 < rows) tryLink(idx(gx, gy + 1), cfg.linkChance);

          // Occasional diagonal for organic routing
          if (cfg.diagChance > 0 && gx + 1 < cols && gy + 1 < rows) {
            tryLink(idx(gx + 1, gy + 1), cfg.diagChance);
          }
          if (cfg.diagChance > 0 && gx - 1 >= 0 && gy + 1 < rows) {
            tryLink(idx(gx - 1, gy + 1), cfg.diagChance * 0.7);
          }
        }
      }
    }

    function spawnPacket() {
      if (nodes.length === 0) return;

      // pick a node with neighbors
      let from = Math.floor(Math.random() * nodes.length);
      let attempts = 0;
      while (nodes[from].neighbors.length === 0 && attempts < 25) {
        from = Math.floor(Math.random() * nodes.length);
        attempts++;
      }
      const neigh = nodes[from].neighbors;
      if (neigh.length === 0) return;

      const to = neigh[Math.floor(Math.random() * neigh.length)];

      packets.push({
        from,
        to,
        t: 0,
        speed: lerp(cfg.packetSpeedMin, cfg.packetSpeedMax, Math.random()),
        hueMix: Math.random() < 0.35 ? 1 : 0, // more orange packets - increased from 0.18 to 0.35
        width: lerp(1.2, 2.2, Math.random()),
        headGlow: lerp(0.35, 0.75, Math.random()) * intensity,
      });

      // node pulse
      nodes[from].pulse = clamp(nodes[from].pulse + 0.65, 0, 1);
    }

    function step(dt: number) {
      // spawn rate (poisson-ish)
      if (!reduceMotion) {
        const spawnProb = cfg.packetSpawnRate * dt; // dt in seconds
        // allow multi-spawn if dt big
        if (Math.random() < spawnProb) spawnPacket();
        if (spawnProb > 1 && Math.random() < (spawnProb - 1)) spawnPacket();
      }

      // decay node pulses
      for (const n of nodes) {
        n.pulse *= 0.94;
        if (n.pulse < 0.01) n.pulse = 0;
      }

      // move packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += p.speed * dt * (reduceMotion ? 0 : 1);

        // add slight easing to feel premium
        if (p.t >= 1) {
          // arrive -> pulse destination & sometimes hop again
          nodes[p.to].pulse = clamp(nodes[p.to].pulse + 1.2, 0, 1);

          const nextOptions = nodes[p.to].neighbors.filter((n) => n !== p.from);
          if (!reduceMotion && nextOptions.length > 0 && Math.random() < 0.55) {
            // chain hop
            p.from = p.to;
            p.to = nextOptions[Math.floor(Math.random() * nextOptions.length)];
            p.t = 0;
            p.speed *= lerp(0.92, 1.08, Math.random());
          } else {
            packets.splice(i, 1);
          }
        }
      }
    }

    function draw() {
      // Clear with a very subtle vignette-like fade
      ctx.clearRect(0, 0, w, h);

      // Background grid (faint street feel)
      ctx.save();
      ctx.globalAlpha = cfg.gridAlpha;
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0.22)';
      const grid = cfg.gridCell;
      const offsetX = (time * 6) % grid; // slow drift
      const offsetY = (time * 4) % grid;
      for (let x = -grid; x < w + grid; x += grid) {
        ctx.beginPath();
        ctx.moveTo(x + offsetX, 0);
        ctx.lineTo(x + offsetX, h);
        ctx.stroke();
      }
      for (let y = -grid; y < h + grid; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y + offsetY);
        ctx.lineTo(w, y + offsetY);
        ctx.stroke();
      }
      ctx.restore();

      // Links
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.lineWidth = cfg.lineWidth;
      ctx.strokeStyle = `rgba(255,255,255,${cfg.lineAlpha})`;
      ctx.beginPath();
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (const j of a.neighbors) {
          if (j < i) continue; // draw once
          const b = nodes[j];
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
        }
      }
      ctx.stroke();
      ctx.restore();

      // Node glow + pulse
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (const n of nodes) {
        const pulse = n.pulse;
        const baseAlpha = 0.12 * intensity;
        const glowAlpha = baseAlpha + pulse * 0.35 * intensity;

        // inner dot
        ctx.fillStyle = `rgba(255,255,255,${baseAlpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, cfg.nodeRadius, 0, Math.PI * 2);
        ctx.fill();

        // glow halo (color shifts slightly)
        const c = mixRgb(colors.primary, colors.accent, clamp(pulse * 0.35, 0, 1));
        const r = cfg.nodeGlow + pulse * 10;
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r);
        grad.addColorStop(0, rgba(c, glowAlpha));
        grad.addColorStop(1, rgba(c, 0));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Packets traveling node-to-node
      if (!reduceMotion) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        for (const p of packets) {
          const a = nodes[p.from];
          const b = nodes[p.to];

          // Smoothstep for premium movement
          const t = p.t;
          const tt = t * t * (3 - 2 * t);

          const x = lerp(a.x, b.x, tt);
          const y = lerp(a.y, b.y, tt);

          const c = mixRgb(colors.primary, colors.accent, p.hueMix);
          const alpha = 0.55 * intensity;

          // head glow
          const headR = 18 * p.headGlow;
          const g = ctx.createRadialGradient(x, y, 0, x, y, headR);
          g.addColorStop(0, rgba(c, alpha));
          g.addColorStop(1, rgba(c, 0));
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, headR, 0, Math.PI * 2);
          ctx.fill();

          // crisp head dot
          ctx.fillStyle = rgba(c, 0.85 * intensity);
          ctx.beginPath();
          ctx.arc(x, y, p.width, 0, Math.PI * 2);
          ctx.fill();

          // faint trailing line segment behind head
          const tx = lerp(a.x, b.x, clamp(tt - 0.08, 0, 1));
          const ty = lerp(a.y, b.y, clamp(tt - 0.08, 0, 1));
          ctx.strokeStyle = rgba(c, 0.22 * intensity);
          ctx.lineWidth = 1.15;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(x, y);
          ctx.stroke();
        }

        ctx.restore();
      }

      // Soft top "atmosphere" gradient to make content pop
      ctx.save();
      const atmos = ctx.createLinearGradient(0, 0, 0, h);
      atmos.addColorStop(0, 'rgba(0,0,0,0.55)');
      atmos.addColorStop(0.45, 'rgba(0,0,0,0.18)');
      atmos.addColorStop(1, 'rgba(0,0,0,0.62)');
      ctx.fillStyle = atmos;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    }

    function loop(now: number) {
      const dtMs = now - last;
      last = now;

      // clamp dt for stability
      const dt = clamp(dtMs / 1000, 0, 0.033);

      time += dt;
      step(dt);
      draw();

      rafRef.current = requestAnimationFrame(loop);
    }

    // Observe container resize
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas.parentElement ?? canvas);

    resize();
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      media?.removeEventListener?.('change', onMedia);
    };
  }, [density, intensity, colors, respectReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
}