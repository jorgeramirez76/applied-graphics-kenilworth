'use client';
import { useRef, type ElementType } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

/**
 * Word-mask reveal heading — each word rises out of an overflow-hidden mask on
 * scroll-in. Content-safe: words render in place if JS/animation is off.
 */
export function AnimatedHeading({
  text,
  as: Tag = 'h2',
  className = '',
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const words = ref.current!.querySelectorAll('.ah-word');
      // immediateRender:false → words stay visible until the trigger fires, so
      // they are NEVER stuck hidden (content-safe) and still mask-rise on scroll.
      gsap.from(words, {
        yPercent: 118,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.07,
        delay,
        immediateRender: false,
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as never} className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em]">
          <span className="ah-word inline-block">{w}&nbsp;</span>
        </span>
      ))}
    </Tag>
  );
}
