'use client';
import Image from 'next/image';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

/**
 * Scroll-driven "wrap install": a plain white van gets wrapped with the real
 * Applied Graphics design as you scroll, with a squeegee edge sweeping across.
 * Soft feathered mask over matching white backgrounds hides any seam.
 * Content-safe: defaults to the fully-wrapped van if JS / motion is off.
 */
export function WrapReveal({
  blankSrc,
  wrappedSrc,
  alt,
}: {
  blankSrc: string;
  wrappedSrc: string;
  alt: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const r = root.current!;
      const bar = r.querySelector('.wr-bar') as HTMLElement;
      const lblBlank = r.querySelector('.wr-blank') as HTMLElement;
      const lblWrapped = r.querySelector('.wr-done') as HTMLElement;
      const hint = r.querySelector('.wr-hint') as HTMLElement;

      const set = (p: number) => {
        r.style.setProperty('--p', String(p));
        const c = Math.max(0, Math.min(100, p));
        bar.style.left = `${c}%`;
        bar.style.opacity = p > 1 && p < 99 ? '1' : '0';
        lblBlank.style.opacity = String(Math.max(0, 1 - p / 45));
        lblWrapped.style.opacity = String(Math.max(0, (p - 58) / 38));
        hint.style.opacity = String(Math.max(0, 1 - p / 22));
      };

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        set(110);
        return;
      }
      set(-12);
      const o = { p: -12 };
      gsap.to(o, {
        p: 112,
        ease: 'none',
        scrollTrigger: { trigger: r, start: 'top 80%', end: 'bottom 50%', scrub: 0.5 },
        onUpdate: () => set(o.p),
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      data-cursor
      className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-white shadow-card"
      style={{ ['--p' as string]: '110' }}
    >
      {/* white van base */}
      <Image src={blankSrc} alt={alt} fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" />

      {/* wrapped van, revealed by the moving mask */}
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage:
            'linear-gradient(90deg, #000 calc(var(--p) * 1%), transparent calc(var(--p) * 1% + 7%))',
          maskImage:
            'linear-gradient(90deg, #000 calc(var(--p) * 1%), transparent calc(var(--p) * 1% + 7%))',
        }}
      >
        <Image src={wrappedSrc} alt="" fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" />
      </div>

      {/* squeegee */}
      <div className="wr-bar pointer-events-none absolute top-0 z-10 h-full w-[3px] -translate-x-1/2 bg-brand" style={{ left: '110%', opacity: 0, boxShadow: '0 0 24px 2px rgba(232,32,46,0.6)' }}>
        <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-ink/85 text-bone backdrop-blur">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </span>
      </div>

      {/* labels */}
      <span className="wr-blank absolute left-4 top-4 rounded-full bg-ink/75 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-fog/85 backdrop-blur">
        Blank · wasted space
      </span>
      <span className="wr-done absolute bottom-4 left-4 rounded-full bg-brand px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white" style={{ opacity: 0 }}>
        Wrapped · working 24/7
      </span>
      <span className="wr-hint absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white/75 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink/70 backdrop-blur">
        Scroll to wrap
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
      </span>
    </div>
  );
}
