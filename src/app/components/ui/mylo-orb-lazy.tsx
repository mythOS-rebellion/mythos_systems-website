import { lazy, Suspense, useEffect, useRef, useState } from 'react';

// Code-split the WebGL orb (three.js + R3F + drei) into its own chunk so it
// is NOT in the initial homepage bundle. The chunk is fetched only once the
// orb scrolls near the viewport (IntersectionObserver), then mounted.
const MyloOrb3D = lazy(() => import('./mylo-orb-3d'));

function OrbFallback({ size }: { size: number }) {
  // Lightweight stand-in shown while the orb chunk loads (no layout shift).
  return (
    <div className="flex items-center justify-center" style={{ width: size, height: size }}>
      <div
        className="rounded-full"
        style={{
          width: size * 0.62,
          height: size * 0.62,
          background:
            'radial-gradient(circle at 40% 35%, rgba(255,200,120,0.5), rgba(234,88,12,0.55) 45%, rgba(120,40,10,0.85) 80%)',
          boxShadow: '0 0 70px rgba(234,88,12,0.35)',
          filter: 'blur(1px)',
        }}
      />
    </div>
  );
}

export function MyloOrbLazy({ size = 420 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: '500px' }, // start fetching the chunk before it's on screen
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center" style={{ width: size, height: size }}>
      {show ? (
        <Suspense fallback={<OrbFallback size={size} />}>
          <MyloOrb3D size={size} showText={false} />
        </Suspense>
      ) : (
        <OrbFallback size={size} />
      )}
    </div>
  );
}
