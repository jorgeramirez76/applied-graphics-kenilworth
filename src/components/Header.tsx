'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icon } from './Icon';
import { Magnetic } from './motion/Magnetic';
import { site, telHref } from '@/lib/data';

const NAV = [
  { href: '/', label: 'Home', n: '01' },
  { href: '/about', label: 'About', n: '02' },
  { href: '/services', label: 'Services', n: '03' },
  { href: '/portfolio', label: 'Work', n: '04' },
  { href: '/clients', label: 'Industries', n: '05' },
  { href: '/reviews', label: 'Reviews', n: '06' },
  { href: '/service-area', label: 'Area', n: '07' },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 40, not 12: at 12 the bar goes solid within one thumb twitch, slamming
    // an opaque slab above the hero h1 the instant the tease starts.
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-[80]"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      {/* utility strip */}
      <div
        className={`pointer-events-auto hidden border-b border-white/5 transition-colors md:block ${
          scrolled ? 'bg-ink/0' : 'bg-ink/40'
        }`}
      >
        <div className="container flex h-9 items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="spec inline-flex items-center gap-1.5 text-fog/60">
              <span className="h-1.5 w-1.5 animate-blink rounded-full bg-brand" /> 3M-Certified · BBB A+ · Est. 1978
            </span>
          </div>
          <a href={telHref} className="spec link-sweep text-fog/70 hover:text-bone">
            {site.phoneDisplay}
          </a>
        </div>
      </div>

      {/* main bar */}
      <div
        className={`site-header-bar pointer-events-auto transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/10 bg-ink/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container flex h-16 items-center justify-between lg:h-[4.5rem]">
          <Logo />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative font-mono text-[12px] uppercase tracking-wider2 transition-colors ${
                    active ? 'text-brand' : 'text-fog/70 hover:text-bone'
                  }`}
                >
                  <span className="mr-1 text-[9px] text-steel/60">{item.n}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Magnetic>
              <Link href="/contact" data-cursor className="btn-primary !px-6 !py-3 text-[12px]">
                Request a Quote
              </Link>
            </Magnetic>
          </div>

          {/* Phones otherwise have no phone number in the header at any
              scroll position — the utility strip is hidden below md. */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={telHref}
              aria-label={`Call ${site.phoneDisplay}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-bone"
            >
              <Icon name="Phone" className="h-5 w-5 text-brand" strokeWidth={1.8} />
            </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-bone"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <Icon name={open ? 'X' : 'Menu'} className="h-5 w-5" strokeWidth={1.8} />
          </button>
          </div>
        </div>
      </div>

      {/* mobile sheet */}
      {open && (
        <div className="pointer-events-auto border-b border-white/10 bg-ink/95 backdrop-blur-xl lg:hidden">
          <nav className="container flex flex-col py-4" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 border-b border-white/5 py-3.5 font-display text-2xl uppercase ${
                  pathname === item.href ? 'text-brand' : 'text-bone'
                }`}
              >
                <span className="font-mono text-[10px] text-steel">{item.n}</span>
                {item.label}
              </Link>
            ))}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a href={telHref} className="btn-outline">
                <Icon name="Phone" className="h-4 w-4" /> Call
              </a>
              <Link href="/contact" className="btn-primary">
                Get a Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Applied Graphics — home" data-cursor>
      <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-brand">
        <span className="font-display text-2xl leading-none text-white" style={{ fontVariationSettings: "'wght' 900,'wdth' 120" }}>
          A
        </span>
        <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full" />
      </span>
      <span className="leading-none">
        <span className="block whitespace-nowrap font-display text-base uppercase tracking-tight text-bone sm:text-lg">
          Applied Graphics
        </span>
        <span className="spec block whitespace-nowrap text-[9px] text-brand">Wraps · Signage · Print</span>
      </span>
    </Link>
  );
}
