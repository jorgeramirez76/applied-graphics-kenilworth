'use client';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

/** Counts a number up from 0 when it scrolls into view. SSR shows the final value. */
export function CountUp({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      const fmt = (n: number) =>
        prefix +
        n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) +
        suffix;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.textContent = fmt(value);
        return;
      }
      const o = { v: 0 };
      gsap.to(o, {
        v: value,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        onUpdate: () => (el.textContent = fmt(o.v)),
      });
    },
    { scope: ref, dependencies: [value] },
  );

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
