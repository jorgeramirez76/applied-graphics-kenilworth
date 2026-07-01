'use client';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';

/**
 * Drag-to-compare slider. Same real photo on both sides — the left is
 * desaturated/dimmed to represent a plain, unbranded vehicle ("wasted space"),
 * the right is the full-colour wrap. No fabricated before/after.
 */
export function CompareSlider({
  src,
  alt,
  leftLabel = 'Unbranded · wasted space',
  rightLabel = 'Wrapped · working 24/7',
}: {
  src: string;
  alt: string;
  leftLabel?: string;
  rightLabel?: string;
}) {
  const [pos, setPos] = useState(54);
  const ref = useRef<HTMLDivElement>(null);

  const setFromX = useCallback((clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    let p = ((clientX - r.left) / r.width) * 100;
    p = Math.max(5, Math.min(95, p));
    setPos(p);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    setFromX(e.clientX);
    const move = (ev: PointerEvent) => setFromX(ev.clientX);
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <div
      ref={ref}
      data-cursor
      className="group relative aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-2xl border border-white/10 bg-graphite"
    >
      {/* base: desaturated / dim */}
      <Image src={src} alt={alt} fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover [filter:grayscale(1)_brightness(0.42)_contrast(1.05)]" />
      <div className="absolute inset-0 bg-grid-faint bg-[size:22px_22px] opacity-30 mix-blend-overlay" />
      <span className="absolute bottom-4 left-4 rounded-full bg-ink/70 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-fog/70 backdrop-blur">
        {leftLabel}
      </span>

      {/* top: full colour, clipped */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={src} alt="" fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
        <span className="absolute bottom-4 left-4 rounded-full bg-brand px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
          {rightLabel}
        </span>
      </div>

      {/* handle */}
      <button
        type="button"
        onPointerDown={onPointerDown}
        aria-label="Drag to compare"
        className="absolute top-0 z-10 flex h-full w-10 -translate-x-1/2 cursor-ew-resize items-center justify-center"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-bone/80" />
        <span className="relative grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-ink/80 text-bone backdrop-blur transition-transform group-hover:scale-110">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 6-4 6 4 6M15 6l4 6-4 6" />
          </svg>
        </span>
      </button>
    </div>
  );
}
