'use client';
import { useEffect, useRef } from 'react';

/**
 * Scroll-velocity-reactive marquee. Drifts continuously and speeds up / leans
 * with scroll velocity. Pure transform via rAF (no layout thrash).
 */
export function Marquee({
  items,
  baseSpeed = 0.6,
  className = '',
}: {
  items: string[];
  baseSpeed?: number;
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const doubled = [...items, ...items];

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let x = 0;
    let vel = 0;
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      const cur = window.scrollY;
      vel = cur - last;
      last = cur;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const loop = () => {
      const half = el.scrollWidth / 2;
      x -= baseSpeed + vel * 0.25;
      vel *= 0.9;
      if (half) {
        if (x <= -half) x += half;
        if (x > 0) x -= half;
      }
      el.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [baseSpeed]);

  return (
    <div className={`relative flex overflow-hidden border-y border-white/10 bg-ink py-6 ${className}`}>
      <div ref={track} className="flex shrink-0 items-center gap-12 whitespace-nowrap pr-12 will-change-transform">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="font-display text-2xl uppercase tracking-tight text-bone/25 sm:text-3xl">
              {item}
            </span>
            <span className="text-brand">✕</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
