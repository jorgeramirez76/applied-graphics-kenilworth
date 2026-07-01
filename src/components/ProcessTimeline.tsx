'use client';
import { useRef } from 'react';
import { Icon } from './Icon';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

const STEPS = [
  { n: '01', icon: 'PencilRuler', title: 'Design', body: 'Our in-house art department designs your wrap from concept to completion — guiding every step.' },
  { n: '02', icon: 'Palette', title: 'Print', body: 'We print on premium 3M materials up to 60″ wide and 150′ long — a depth of colour you can’t beat.' },
  { n: '03', icon: 'ShieldCheck', title: 'Install', body: '3M-certified installers apply every panel bubble- and wrinkle-free, in-shop or on the road.' },
  { n: '04', icon: 'MapPin', title: 'Deliver', body: 'Site surveys for big jobs, fleet scheduling, and re-orders that still match years later.' },
];

export function ProcessTimeline() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(
        '.proc-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: { trigger: '.proc-rail', start: 'top 65%', end: 'bottom 75%', scrub: true },
        },
      );
      gsap.utils.toArray<HTMLElement>('.proc-step').forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 70%',
          onEnter: () => step.classList.add('is-on'),
          onLeaveBack: () => step.classList.remove('is-on'),
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="proc-rail relative grid gap-x-12 gap-y-10 lg:grid-cols-[auto_1fr]">
      {/* rail */}
      <div className="absolute left-[27px] top-2 hidden h-[calc(100%-2rem)] w-px bg-white/10 lg:block">
        <div className="proc-fill absolute inset-0 origin-top bg-brand" />
      </div>

      <div className="hidden lg:block" />
      <div className="space-y-6">
        {STEPS.map((s) => (
          <div key={s.n} className="proc-step group flex gap-6 [&.is-on_.proc-node]:border-brand [&.is-on_.proc-node]:bg-brand [&.is-on_.proc-node]:text-white">
            <span className="proc-node relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/15 bg-carbon text-brand transition-colors duration-500">
              <Icon name={s.icon} className="h-6 w-6" />
            </span>
            <div className="flex-1 rounded-2xl border border-white/[0.08] bg-graphite p-6 transition-colors duration-500 group-[.is-on]:border-brand/30">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-brand">{s.n}</span>
                <h3 className="font-display text-2xl uppercase text-bone">{s.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-steel">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
