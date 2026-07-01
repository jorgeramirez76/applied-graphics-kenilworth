'use client';
import { useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

/**
 * Smooth-scroll + global scroll-animation orchestrator.
 * - Lenis momentum scrolling, synced to GSAP ScrollTrigger.
 * - Reveals every `[data-reveal]` on scroll-in (staggered).
 * - Parallax for every `[data-parallax]` (value = yPercent target).
 * - Fully content-safe: respects prefers-reduced-motion and never leaves
 *   content hidden (CSS keeps `.reveal` visible; JS animates as enhancement).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // Init Lenis once.
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
      lenisRef.current = null;
    };
  }, []);

  // Reveals + parallax, rebuilt on every route.
  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      lenisRef.current?.scrollTo(0, { immediate: true });

      const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]');

      if (!reduce) {
        // Transform-only reveal — opacity stays 1, so content is NEVER hidden
        // (even if rAF/scroll triggers stall). Slides up on scroll-in.
        reveals.forEach((el) => {
          gsap.from(el, {
            y: 36,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          });
        });

        // Parallax layers.
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          const speed = parseFloat(el.dataset.parallax || '0');
          gsap.fromTo(
            el,
            { yPercent: -speed },
            {
              yPercent: speed,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          );
        });

        // SAFETY NET: content must never stay invisible. setTimeout (not the
        // rAF-driven ticker) + direct style write guarantees visibility even if
        // a trigger never fires or rAF is throttled.
        window.setTimeout(() => {
          reveals.forEach((el) => {
            if (parseFloat(getComputedStyle(el).opacity) < 0.1) {
              el.style.transition = 'opacity .6s ease, transform .6s ease';
              el.style.opacity = '1';
              el.style.transform = 'none';
            }
          });
        }, 4000);
      }

      // Recompute positions once fonts/images settle.
      if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
      ScrollTrigger.refresh();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return <>{children}</>;
}
