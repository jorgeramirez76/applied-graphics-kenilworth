'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { Icon } from './Icon';
import { Magnetic } from './motion/Magnetic';
import { gsap, useGSAP } from '@/lib/gsap';
import { site, telHref } from '@/lib/data';

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.hero-eyebrow', { y: 24, opacity: 0, duration: 0.7 })
        .from('.hero-word', { yPercent: 120, duration: 1, stagger: 0.08 }, 0.1)
        .from('.hero-sub', { y: 24, opacity: 0, duration: 0.8 }, '-=0.55')
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.5')
        .from('.hero-trust', { y: 16, opacity: 0, duration: 0.6 }, '-=0.4')
        .fromTo(
          '.hero-visual',
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut' },
          0.35,
        )
        .from('.hero-chip', { scale: 0.6, opacity: 0, stagger: 0.12, ease: 'back.out(1.7)' }, '-=0.5')
        .from('.hero-scroll', { opacity: 0, duration: 0.6 }, '-=0.2');

      // subtle float on the van
      gsap.to('.hero-float', { y: -14, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });

      // SAFETY: if the intro is interrupted (e.g. background tab throttles rAF),
      // force every hero element fully visible after the intro should be done.
      window.setTimeout(() => {
        gsap.set(
          ['.hero-eyebrow', '.hero-word', '.hero-sub', '.hero-cta', '.hero-trust', '.hero-chip', '.hero-scroll'],
          { clearProps: 'opacity,transform' },
        );
        gsap.set('.hero-visual', { clearProps: 'clipPath' });
      }, 3200);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink pt-28 lg:pt-32"
    >
      {/* atmosphere */}
      <div className="absolute inset-0 bg-grid-faint bg-[size:46px_46px] opacity-40" />
      <div className="absolute -left-40 top-10 h-[40rem] w-[40rem] animate-drift rounded-full bg-brand/20 blur-[150px]" />
      <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-brand/[0.08] blur-[120px]" />
      {/* giant backdrop word */}
      <span
        data-parallax="8"
        className="pointer-events-none absolute -bottom-10 left-0 select-none whitespace-nowrap font-display text-[34vw] leading-none text-stroke opacity-[0.04] lg:text-[24vw]"
      >
        WRAPPED
      </span>

      <div className="container relative grid items-center gap-14 py-12 lg:grid-cols-12 lg:py-16">
        {/* copy */}
        <div className="lg:col-span-7">
          <p className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider2 text-fog/70">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-brand" />
            Kenilworth, NJ · Est. {site.founded}
          </p>

          <h1 className="mt-7 font-display text-[10.5vw] uppercase leading-[0.86] text-bone sm:text-7xl lg:text-[5rem] xl:text-[5.75rem]">
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="hero-word inline-block">The</span>{' '}
              <span className="hero-word inline-block">Wrap</span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="hero-word inline-block">With</span>{' '}
              <span className="hero-word inline-block">A</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="hero-word relative inline-block text-brand">
                Warranty<span className="text-bone">.</span>
              </span>
            </span>
          </h1>

          <p className="hero-sub mt-8 max-w-xl text-lg leading-relaxed text-steel">
            3M-certified graphics for your vehicles <span className="text-fog">and your building — inside
            and out.</span> Vehicle &amp; fleet wraps, wall murals, storefront &amp; window graphics,
            architectural finishes and large-format signage — all designed, printed and installed under one roof.
          </p>

          <div className="hero-sub mt-6 flex flex-wrap gap-2">
            {['Vehicle Wraps', 'Wall Murals', 'Storefronts', 'Window Graphics', 'Architectural Finishes'].map(
              (t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-fog/60">
                  {t}
                </span>
              ),
            )}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <span className="hero-cta inline-block">
              <Magnetic>
                <Link href="/contact" data-cursor className="btn-primary">
                  <Icon name="Send" className="h-4 w-4" /> Request a Quote
                </Link>
              </Magnetic>
            </span>
            <Link href="/portfolio" data-cursor className="hero-cta btn-outline">
              View Our Work
            </Link>
            <a href={telHref} data-cursor className="hero-cta btn-outline">
              <Icon name="Phone" className="h-4 w-4" /> Call Now
            </a>
          </div>

          <div className="hero-trust mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-6">
            {[
              ['ShieldCheck', '3M-Certified Installers'],
              ['Award', 'BBB A+ Rated'],
              ['Star', `${site.trust.aggregateRating} / 5 Reviews`],
            ].map(([icon, label]) => (
              <span key={label} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-fog/60">
                <Icon name={icon} className="h-4 w-4 text-brand" /> {label}
              </span>
            ))}
          </div>
        </div>

        {/* visual */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-md hero-float">
            <div className="hero-visual overflow-hidden rounded-2xl border border-white/10 bg-graphite p-2.5 shadow-glow">
              <div data-parallax="-6" className="relative aspect-[5/3.4] overflow-hidden rounded-xl">
                <Image
                  src="/images/applied-graphics-company-van.webp"
                  alt="Applied Graphics' own branded company van — a full-color vehicle wrap"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 440px"
                  className="scale-110 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                <span className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-wider text-bone/70">
                  ▢ Live install · Kenilworth bay
                </span>
              </div>
            </div>

            <div className="hero-chip absolute -bottom-6 -left-6 rounded-xl border border-brand/30 bg-brand px-4 py-3 text-white shadow-glow">
              <p className="font-display text-2xl leading-none">{site.industryStat.value}</p>
              <p className="mt-1 font-mono text-[9px] uppercase leading-tight tracking-wide">
                impressions
                <br /> / mile driven
              </p>
            </div>
            <div className="hero-chip absolute -right-4 -top-4 rounded-xl border border-white/10 bg-carbon px-3.5 py-2.5 text-bone shadow-card">
              <p className="font-display text-lg leading-none text-brand">48 yrs</p>
              <p className="font-mono text-[9px] uppercase tracking-wide text-steel">on the road</p>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="hero-scroll absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="font-mono text-[10px] uppercase tracking-wider2 text-steel">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-brand to-transparent" />
      </div>
    </section>
  );
}
