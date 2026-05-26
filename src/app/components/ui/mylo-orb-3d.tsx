import { useRef, useState, Suspense, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";

interface MyloOrb3DProps {
  showText?: boolean;
  customText?: string;
  onOrbClick?: () => void;
  /** When provided, status text follows panel open state (Listening... vs Say Hey Mylo) and resets when panel closes */
  panelOpen?: boolean;
  size?: number;
  /** Hex color ("#C1440E"). Hue-rotates the shader so merchant-picked colors
   *  keep the orb's depth and highlights. Null/undefined = default Mars orange. */
  primaryColor?: string | null;
}

// Hex of the default orb color — the Mars orange this orb was originally
// designed around. All hue-shifts are measured relative to this hue.
const DEFAULT_ORB_HEX = "#C1440E";

/** Convert "#RRGGBB" (or "RRGGBB") to an HSL triple in [0..1]. */
function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const clean = hex.replace(/^#/, "").trim();
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return { h: h / 6, s, l };
}

const DEFAULT_ORB_HSL = hexToHsl(DEFAULT_ORB_HEX)!;

/** Hue delta in [-1..1] that should be passed to the shader for `color`. */
function hueDeltaFor(color: string | null | undefined): number {
  if (!color) return 0;
  const hsl = hexToHsl(color);
  if (!hsl) return 0;
  // For near-monochrome picks (white/grey), skip rotation — the orb would
  // lose all its orange character without any hue to shift onto.
  if (hsl.s < 0.05) return 0;
  let delta = hsl.h - DEFAULT_ORB_HSL.h;
  if (delta > 0.5) delta -= 1;
  if (delta < -0.5) delta += 1;
  return delta;
}

// Custom shader for Arrakis-style desert planet texture
const ArrakisMaterial = shaderMaterial(
  {
    time: 0,
    glowIntensity: 1.0,
    // Hue rotation applied at the end of the fragment shader so merchant-picked
    // orb colors keep the shader's depth and highlights. 0 = no shift = default
    // Mars orange.
    uHueShift: 0.0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    uniform float glowIntensity;
    uniform float uHueShift;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    // 3D Noise function - seamless on sphere
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      
      i = mod289(i);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }
    
    // Fractal Brownian Motion using 3D noise
    float fbm(vec3 p) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      
      for(int i = 0; i < 5; i++) {
        value += amplitude * snoise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }
    
    void main() {
      // Use 3D position directly - no UV seams!
      vec3 pos = normalize(vPosition);
      
      // Base surface texture (visible grain)
      vec3 basePos = pos * 4.5 + vec3(time * 0.008, time * 0.006, time * 0.005);
      float baseTexture = fbm(basePos);
      baseTexture = baseTexture * 0.2 + 0.55; // Range: 0.55 to 0.75 (clean orange)
      
      // DARK SPOTS - scattered, textured (NO pure black)
      vec3 darkSpotPos = pos * 3.0 + vec3(time * 0.004, time * 0.003, 0.0);
      float darkPlacement = fbm(darkSpotPos);
      // Balanced threshold for moderate coverage
      float darkMask = smoothstep(0.62, 0.72, darkPlacement);
      // Add detailed texture to dark spots
      vec3 darkTexturePos = pos * 15.0;
      float darkGrain = snoise(darkTexturePos) * 0.5 + 0.5;
      float darkDetail = fbm(pos * 8.0 + vec3(time * 0.002, 0.0, time * 0.003)) * 0.5 + 0.5;
      float darkTexture = mix(darkGrain, darkDetail, 0.5);
      // Apply dark spots - INCREASED to 20% (balanced)
      float darkSpots = darkMask * darkTexture * 0.20;
      
      // LIGHT/SAND SPOTS - scattered, more prominent, textured
      vec3 lightSpotPos = pos * 3.5 + vec3(-time * 0.005, time * 0.006, time * 0.004);
      float lightPlacement = fbm(lightSpotPos);
      // Lower threshold = more coverage
      float lightMask = smoothstep(0.55, 0.68, lightPlacement);
      // Add detailed texture to light spots
      vec3 lightTexturePos = pos * 18.0 + vec3(5.2, 3.8, 4.1);
      float lightGrain = snoise(lightTexturePos) * 0.5 + 0.5;
      float lightDetail = fbm(pos * 10.0 + vec3(time * 0.003, time * 0.002, 0.0)) * 0.5 + 0.5;
      float lightTexture = mix(lightGrain, lightDetail, 0.6);
      // Apply light spots - INCREASED to 50% (was 40%)
      float lightSpots = lightMask * lightTexture * 0.5;
      
      // HORIZONTAL STREAKS ONLY (Saturn-like bands)
      // Main horizontal bands using Y-coordinate
      vec3 streakPos = pos * 2.0 + vec3(time * 0.012, 0.0, time * 0.008);
      float streakNoise = snoise(streakPos) * 2.0;
      
      // Create horizontal bands that wrap around sphere
      float streaks = sin(pos.y * 12.0 + streakNoise);
      streaks = streaks * 0.5 + 0.5; // Normalize
      streaks = pow(streaks, 2.5); // Soften for subtle effect
      
      // Low opacity (12%)
      streaks *= 0.12;
      
      // Combine surface
      float surface = baseTexture;
      surface -= darkSpots; // Subtract scattered dark spots (limited)
      surface += lightSpots; // Add scattered light spots
      surface += streaks; // Add subtle streaks
      
      // Internal light flashes - emanating from origin points (~30% livelier)
      // Flash 1: Pulsing energy wave
      vec3 flashOrigin1 = vec3(sin(time * 0.65) * 0.8, cos(time * 0.55) * 0.6, sin(time * 0.40) * 0.7);
      float dist1 = distance(pos, normalize(flashOrigin1));
      float pulse1 = sin(time * 2.3) * 0.5 + 0.5;
      float flash1 = (1.0 - smoothstep(0.0, 2.0, dist1)) * pulse1;

      // Flash 2: Different timing and position
      vec3 flashOrigin2 = vec3(cos(time * 0.75) * 0.7, sin(time * 0.90) * 0.9, cos(time * 0.65) * 0.6);
      float dist2 = distance(pos, normalize(flashOrigin2));
      float pulse2 = sin(time * 2.8 + 1.5) * 0.5 + 0.5;
      float flash2 = (1.0 - smoothstep(0.0, 2.0, dist2)) * pulse2;

      // Flash 3: Slower, more intense
      vec3 flashOrigin3 = vec3(sin(time * 0.55) * 0.9, cos(time * 1.05) * 0.5, sin(time * 0.80) * 0.8);
      float dist3 = distance(pos, normalize(flashOrigin3));
      float pulse3 = sin(time * 1.7 + 3.0) * 0.5 + 0.5;
      float flash3 = (1.0 - smoothstep(0.0, 2.2, dist3)) * pulse3;
      
      // Center bright core with concentric rings (like the reference image)
      vec3 centerPos3D = vec3(0.0, 0.0, 0.0);
      float distToCenter = distance(pos, centerPos3D);
      
      // Sharp bright center
      float centerCore = 1.0 - smoothstep(0.0, 0.4, distToCenter);
      centerCore = pow(centerCore, 3.0);
      
      // Concentric rings around center
      float rings = sin(distToCenter * 25.0 - time * 2.0) * 0.5 + 0.5;
      rings = pow(rings, 3.0) * centerCore; // Only visible near center
      
      // Combine flashes - brightest at origin, fades across orb (boosted ~15%)
      float combustion = (flash1 * 0.28 + flash2 * 0.24 + flash3 * 0.28);
      
      // Combine: surface texture + flashes + center core
      float pattern = surface * 0.7 + combustion * 0.3;
      pattern += centerCore * 1.2; // Strong bright center
      pattern += rings * 0.6; // Add ring detail
      
      // Distance from center for energy core
      float distFromCenter = length(pos);
      float centerGlow = 1.0 - smoothstep(0.0, 1.3, distFromCenter);
      centerGlow = pow(centerGlow, 2.5);
      
      // Hue shift — low-frequency FBM that slowly drifts, giving the orb
      // regions of warmer/cooler orange instead of one flat hue.
      float hueShift = fbm(pos * 1.2 + vec3(time * 0.04, time * 0.03, -time * 0.05));
      hueShift = smoothstep(-0.35, 0.35, hueShift); // 0..1 mask

      // Color palette - NO pure black, all visible colors. Mid-range oranges
      // interpolate between a deep-ember track and a warm-amber track driven
      // by hueShift so different regions of the sphere read at different heat.
      vec3 darkBrown = vec3(0.35, 0.18, 0.08);      // Dark spots (NOT black)
      vec3 baseOrange   = mix(vec3(0.72, 0.30, 0.08), vec3(0.95, 0.50, 0.18), hueShift);
      vec3 brightOrange = mix(vec3(0.90, 0.48, 0.18), vec3(1.00, 0.68, 0.32), hueShift);
      vec3 glowOrange   = mix(vec3(0.95, 0.62, 0.28), vec3(1.00, 0.82, 0.48), hueShift);
      vec3 sandLight = vec3(0.98, 0.88, 0.72);      // Light sand spots
      vec3 coreWhite = vec3(1.0, 0.95, 0.85);       // Bright center
      
      // Map pattern to colors - centered around orange (no black values)
      vec3 baseColor;
      if (pattern < 0.45) {
        // Dark spots (brown, NOT black)
        baseColor = mix(darkBrown, baseOrange, pattern / 0.45);
      } else if (pattern < 0.65) {
        // Main orange base (most of the sphere)
        baseColor = mix(baseOrange, brightOrange, (pattern - 0.45) / 0.2);
      } else if (pattern < 0.8) {
        // Bright areas
        baseColor = mix(brightOrange, glowOrange, (pattern - 0.65) / 0.15);
      } else if (pattern < 0.95) {
        // Light sand spots
        baseColor = mix(glowOrange, sandLight, (pattern - 0.8) / 0.15);
      } else {
        // Flash peaks and center
        baseColor = mix(sandLight, coreWhite, (pattern - 0.95) / 0.3);
      }
      
      // Strong bright center
      baseColor = mix(baseColor, coreWhite, centerCore * 0.9);
      
      // Lighting calculation
      vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
      float diff = max(dot(vNormal, lightDir), 0.0);
      
      // Realistic planetary lighting
      vec3 ambient = baseColor * 0.45;
      vec3 diffuse = baseColor * diff * 0.75;
      vec3 finalColor = ambient + diffuse;
      
      // Strong atmospheric rim glow (like reference image)
      float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
      rim = pow(rim, 2.0); // Softer falloff for stronger glow
      vec3 rimColor = vec3(1.0, 0.55, 0.20) * rim * 1.2 * glowIntensity; // Much stronger
      
      // Bright center with ring detail
      vec3 centerRingColor = vec3(1.0, 0.90, 0.70) * rings * 0.8;
      vec3 centerCoreColor = vec3(1.0, 0.95, 0.85) * centerCore * 1.5;
      
      finalColor += rimColor + centerRingColor + centerCoreColor;

      // Hue-rotate the finished color. Near-white highlights (low saturation)
      // are left untouched by construction of the HSV roundtrip, so the
      // bright core and flash peaks still read as white.
      if (abs(uHueShift) > 0.0001) {
        // rgb → hsv
        vec4 K = vec4(0.0, -1.0/3.0, 2.0/3.0, -1.0);
        vec4 p = mix(vec4(finalColor.bg, K.wz), vec4(finalColor.gb, K.xy), step(finalColor.b, finalColor.g));
        vec4 q = mix(vec4(p.xyw, finalColor.r), vec4(finalColor.r, p.yzx), step(p.x, finalColor.r));
        float d = q.x - min(q.w, q.y);
        float e = 1.0e-10;
        vec3 hsv = vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
        hsv.x = fract(hsv.x + uHueShift);
        // hsv → rgb
        vec3 pp = abs(fract(hsv.xxx + K.xyz) * 6.0 - K.www);
        finalColor = hsv.z * mix(K.xxx, clamp(pp - K.xxx, 0.0, 1.0), hsv.y);
      }

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ ArrakisMaterial });

// Custom shader element (R3F v8 / React 18)
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      arrakisMaterial: any;
    }
  }
}

// The actual 3D Sphere component
function ArrakisOrb({ isActive, isHovered, hueShift }: { isActive: boolean; isHovered: boolean; hueShift: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  // Animation loop
  useFrame((state) => {
    if (meshRef.current) {
      // Slower rotation on Y-axis (~60s per rotation normally, ~30s when active)
      const rotationSpeed = isActive ? 0.0055 : 0.0028;
      meshRef.current.rotation.y += rotationSpeed;

      // Subtle wobble
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }

    // Update shader time uniform
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
      materialRef.current.glowIntensity = isActive ? 1.5 : (isHovered ? 1.2 : 1.0);
      materialRef.current.uHueShift = hueShift;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <arrakisMaterial ref={materialRef} />
    </Sphere>
  );
}

// Shared vertex utilities for the halo + flare point sprites. Positions are
// computed entirely in the vertex shader so we do zero per-frame CPU work.
const POINT_FRAGMENT = `
  uniform float uOpacity;
  varying float vHue;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.0, d);

    // Six-stop orange palette picked by per-particle hue in [0,1].
    vec3 color;
    if      (vHue < 0.15) color = vec3(0.55, 0.25, 0.08);   // deep ember
    else if (vHue < 0.35) color = vec3(0.88, 0.42, 0.14);   // burnt orange
    else if (vHue < 0.60) color = vec3(1.00, 0.60, 0.25);   // brand orange
    else if (vHue < 0.80) color = vec3(1.00, 0.75, 0.40);   // amber
    else if (vHue < 0.95) color = vec3(1.00, 0.88, 0.65);   // pale gold
    else                  color = vec3(1.00, 0.97, 0.88);   // sand white

    gl_FragColor = vec4(color, soft * vAlpha * uOpacity);
  }
`;

// --- Halo: sparse points orbiting just outside the sphere shell ------------
const HALO_COUNT = 500;

// Reference canvas width at which point sizes are authored. Smaller canvases
// (e.g. the 140px corner orb) scale gl_PointSize down proportionally so dots
// read at the same relative-to-orb size regardless of mount size.
const REFERENCE_WIDTH = 330;

function HaloParticles() {
  const { size } = useThree();
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(HALO_COUNT * 3); // vertex shader overrides
    const aRadius = new Float32Array(HALO_COUNT);
    const aPhase = new Float32Array(HALO_COUNT);
    const aSpeed = new Float32Array(HALO_COUNT);
    const aTilt = new Float32Array(HALO_COUNT);
    const aHue = new Float32Array(HALO_COUNT);
    for (let i = 0; i < HALO_COUNT; i++) {
      aRadius[i] = 2.08 + Math.random() * 0.28; // thin shell at 2.08..2.36
      aPhase[i] = Math.random() * Math.PI * 2;
      aSpeed[i] = 0.05 + Math.random() * 0.18; // slow orbit
      aTilt[i] = (Math.random() - 0.5) * Math.PI; // random orbit plane
      aHue[i] = Math.random();
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aRadius", new THREE.BufferAttribute(aRadius, 1));
    g.setAttribute("aPhase", new THREE.BufferAttribute(aPhase, 1));
    g.setAttribute("aSpeed", new THREE.BufferAttribute(aSpeed, 1));
    g.setAttribute("aTilt", new THREE.BufferAttribute(aTilt, 1));
    g.setAttribute("aHue", new THREE.BufferAttribute(aHue, 1));
    return g;
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: 22 * (size.width / REFERENCE_WIDTH) },
          uOpacity: { value: 0.75 },
        },
        vertexShader: `
          attribute float aRadius;
          attribute float aPhase;
          attribute float aSpeed;
          attribute float aTilt;
          attribute float aHue;
          uniform float uTime;
          uniform float uSize;
          varying float vHue;
          varying float vAlpha;

          void main() {
            float angle = aPhase + uTime * aSpeed;
            // Orbit in XZ plane, then rotate around X by aTilt to vary the orbital plane.
            vec3 base = vec3(cos(angle), 0.0, sin(angle)) * aRadius;
            float c = cos(aTilt), s = sin(aTilt);
            vec3 pos = vec3(base.x, base.y * c - base.z * s, base.y * s + base.z * c);

            vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPos;
            // Size attenuates with depth so near specks read as coming toward camera.
            gl_PointSize = uSize * (1.0 / max(-mvPos.z, 0.1));

            vHue = aHue;
            vAlpha = 0.75; // steady halo opacity
          }
        `,
        fragmentShader: POINT_FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  // Keep point size proportional to canvas if it ever resizes.
  useEffect(() => {
    material.uniforms.uSize.value = 22 * (size.width / REFERENCE_WIDTH);
  }, [size.width, material]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return <points geometry={geometry} material={material} />;
}

// --- Flares: rare brief emissions from the surface --------------------------
// Only ~0-1 visible at any moment. Intentionally sparse — should read as an
// occasional flare, not a constant stream.
const FLARE_COUNT = 5;
const FLARE_LIFETIME = 1.2;

function FlarePoints() {
  const { size } = useThree();
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(FLARE_COUNT * 3);
    const aBirth = new Float32Array(FLARE_COUNT);
    const aDir = new Float32Array(FLARE_COUNT * 3);
    const aSpeed = new Float32Array(FLARE_COUNT);
    const aHue = new Float32Array(FLARE_COUNT);
    const FLARE_CYCLE = 10.0;
    for (let i = 0; i < FLARE_COUNT; i++) {
      // Spread births across the full cycle so emissions are evenly paced
      // with quiet gaps between them.
      aBirth[i] = (i / FLARE_COUNT) * FLARE_CYCLE + Math.random() * 0.4;
      // Uniform random direction on unit sphere.
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      aDir[i * 3 + 0] = Math.sin(phi) * Math.cos(theta);
      aDir[i * 3 + 1] = Math.cos(phi);
      aDir[i * 3 + 2] = Math.sin(phi) * Math.sin(theta);
      aSpeed[i] = 1.4 + Math.random() * 0.6; // faster — flare shoots outward
      aHue[i] = 0.55 + Math.random() * 0.45; // bias bright
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aBirth", new THREE.BufferAttribute(aBirth, 1));
    g.setAttribute("aDir", new THREE.BufferAttribute(aDir, 3));
    g.setAttribute("aSpeed", new THREE.BufferAttribute(aSpeed, 1));
    g.setAttribute("aHue", new THREE.BufferAttribute(aHue, 1));
    return g;
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: 36 * (size.width / REFERENCE_WIDTH) },
          uOpacity: { value: 0.85 },
          uLifetime: { value: FLARE_LIFETIME },
          uCycle: { value: 10.0 }, // full cycle per particle — gives quiet gaps
        },
        vertexShader: `
          attribute float aBirth;
          attribute vec3 aDir;
          attribute float aSpeed;
          attribute float aHue;
          uniform float uTime;
          uniform float uSize;
          uniform float uLifetime;
          uniform float uCycle;
          varying float vHue;
          varying float vAlpha;

          void main() {
            // Each particle cycles every uCycle seconds but is only visible for
            // uLifetime of that window. With 5 particles × 6s cycle × 1.2s
            // visible each, on average ~1 flare visible at a time — sometimes
            // zero, sometimes two briefly overlapping.
            float localT = mod(uTime - aBirth, uCycle);
            if (localT > uLifetime) {
              // Park offscreen during the quiet phase.
              gl_Position = vec4(0.0, 0.0, -1000.0, 1.0);
              gl_PointSize = 0.0;
              vHue = 0.0;
              vAlpha = 0.0;
              return;
            }
            float age = localT / uLifetime;

            // Ease-out so the flare accelerates off the surface, then decelerates.
            float travel = 1.0 - pow(1.0 - age, 2.0);
            float r = 2.0 + travel * 1.6 * aSpeed;
            vec3 pos = aDir * r;

            vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPos;
            // Shrink as it ages so the tail of the flare feels like it's fading.
            gl_PointSize = uSize * (1.0 / max(-mvPos.z, 0.1)) * (1.0 - age * 0.7);

            vHue = aHue;
            // Sharp in, fast out — brief blip rather than a lingering glow.
            vAlpha = smoothstep(0.0, 0.08, age) * (1.0 - smoothstep(0.35, 0.95, age));
          }
        `,
        fragmentShader: POINT_FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useEffect(() => {
    material.uniforms.uSize.value = 36 * (size.width / REFERENCE_WIDTH);
  }, [size.width, material]);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return <points geometry={geometry} material={material} />;
}

// Scene setup with lighting
function Scene({ isActive, isHovered, hueShift }: { isActive: boolean; isHovered: boolean; hueShift: number }) {
  return (
    <>
      {/* Ambient light - soft overall illumination */}
      <ambientLight intensity={0.4} />

      {/* Main directional light - sun */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        color="#FFD4A3"
      />

      {/* Fill light from opposite side */}
      <directionalLight
        position={[-3, -3, -3]}
        intensity={0.3}
        color="#FF6B1A"
      />

      {/* Rim light for edge glow */}
      <pointLight
        position={[0, 0, 5]}
        intensity={0.8}
        color="#FF8C42"
        distance={10}
      />

      {/* The Arrakis Orb */}
      <ArrakisOrb isActive={isActive} isHovered={isHovered} hueShift={hueShift} />

      {/* Particle halo orbiting just outside the sphere shell */}
      <HaloParticles />

      {/* Solar-flare escapees emitting from the surface */}
      <FlarePoints />
    </>
  );
}

// Loading fallback
function Loader() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 animate-pulse" />
    </div>
  );
}

// Main component with error boundary
export default function MyloOrb3D({ showText = true, customText, onOrbClick, panelOpen, size, primaryColor }: MyloOrb3DProps) {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const bounceControls = useAnimationControls();
  const moodControls = useAnimationControls();
  const reduceMotion = useReducedMotion();
  const orbMood: string = 'idle';
  const hueShift = useMemo(() => hueDeltaFor(primaryColor ?? null), [primaryColor]);

  // Drive mood animations (celebrate glow, alert shake) on every orb instance —
  // home page, corner, preview, etc. The shader canvas is never touched.
  useEffect(() => {
    if (reduceMotion) return;
    if (orbMood === 'celebrate') {
      moodControls.start({
        filter: [
          'drop-shadow(0 0 20px rgba(255, 215, 0, 0.2))',
          'drop-shadow(0 0 80px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 140px rgba(255, 184, 77, 0.6))',
          'drop-shadow(0 0 20px rgba(255, 215, 0, 0.2))',
        ],
        x: 0,
        transition: { duration: 1.6, ease: 'easeOut' },
      });
    } else if (orbMood === 'alert') {
      moodControls.start({
        filter: [
          'drop-shadow(0 0 20px rgba(239, 68, 68, 0.2))',
          'drop-shadow(0 0 70px rgba(239, 68, 68, 0.9))',
          'drop-shadow(0 0 20px rgba(239, 68, 68, 0.2))',
        ],
        x: [0, -6, 6, -4, 4, 0],
        transition: { duration: 0.7, ease: 'easeOut' },
      });
    } else {
      moodControls.start({
        filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))',
        x: 0,
        transition: { duration: 0.2 },
      });
    }
  }, [orbMood, moodControls, reduceMotion]);

  const handleClick = () => {
    // Imperative scale bounce — ~180ms total. Skipped for reduced-motion users.
    if (!reduceMotion) {
      bounceControls.start({
        scale: [1, 0.92, 1.05, 1],
        transition: {
          duration: 0.18,
          times: [0, 0.39, 0.72, 1],
          ease: [0.22, 1, 0.36, 1],
        },
      });
    }
    setIsActive(!isActive);
    if (onOrbClick) onOrbClick();
  };

  const showListening = panelOpen !== undefined ? panelOpen : isActive;

  return (
    <div className="text-center">
      {/* 3D Canvas — nested motion divs: outer drives mood (filter + shake),
          inner drives click bounce (scale). Shader Canvas is never touched. */}
      <motion.div
        className="mx-auto cursor-pointer mylo-orb-container"
        animate={moodControls}
        style={{
          width: size ? `${size}px` : "100%",
          height: size ? `${size}px` : "100%",
          marginBottom: showText ? "1.5rem" : "0",
          willChange: 'filter, transform',
        }}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={bounceControls}
          style={{
            width: '100%',
            height: '100%',
            filter: size && size > 200
              ? (isHovered
                  ? 'drop-shadow(0 0 50px rgba(255, 107, 26, 0.45)) drop-shadow(0 0 100px rgba(255, 107, 26, 0.28))'
                  : 'drop-shadow(0 0 34px rgba(255, 107, 26, 0.28)) drop-shadow(0 0 70px rgba(255, 107, 26, 0.14))')
              : 'none',
            transition: 'filter 0.5s ease',
            willChange: 'transform',
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <Scene isActive={isActive} isHovered={isHovered} hueShift={hueShift} />
            </Suspense>
          </Canvas>
        </motion.div>
      </motion.div>

      {/* Status Text */}
      {(showText || customText) && (
        <p className="text-sm tracking-wide text-gray-300 font-light transition-all duration-300 mt-2">
          {customText
            ? customText
            : showListening
              ? "Listening..."
              : 'Say "Hey Mylo" or Click to Start'}
        </p>
      )}
    </div>
  );
}
