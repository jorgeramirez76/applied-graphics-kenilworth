import Link from 'next/link';
import { Icon } from './Icon';
import { Magnetic } from './motion/Magnetic';
import { site, telHref, fullAddress, formatHours, mapsLink } from '@/lib/data';

export function Footer() {
  const year = new Date().getFullYear();
  const hours = formatHours();
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-carbon text-fog">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-brand/10 blur-[140px]" />

      {/* big closing CTA */}
      <div className="relative border-b border-white/10">
        <div className="container py-16 sm:py-20">
          <p className="eyebrow reveal" data-reveal>
            Ready when you are
          </p>
          <div className="mt-6 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <h2 className="reveal max-w-3xl font-display text-5xl uppercase leading-[0.92] text-bone sm:text-6xl lg:text-7xl" data-reveal>
              Let&rsquo;s put your brand <span className="text-brand">on the road.</span>
            </h2>
            <div className="reveal flex shrink-0 flex-wrap gap-3" data-reveal>
              <Magnetic>
                <Link href="/contact" data-cursor className="btn-primary">
                  Request a Quote <Icon name="ArrowRight" className="h-4 w-4" />
                </Link>
              </Magnetic>
              <a href={telHref} className="btn-outline">
                <Icon name="Phone" className="h-4 w-4" /> {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-brand font-display text-xl text-white" style={{ fontVariationSettings: "'wght' 900" }}>
              A
            </span>
            <span className="font-display text-lg uppercase text-bone">Applied Graphics</span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-steel">
            3M-certified vehicle wraps, fleet graphics and large-format signage — designed, printed and
            installed in Kenilworth, NJ since {site.founded}.
          </p>
          <div className="mt-6 flex gap-2.5">
            {site.social.facebook && (
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" data-cursor
                 className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-fog/70 transition-colors hover:border-brand hover:text-brand"
                 aria-label="Facebook">
                <span className="font-display text-sm">f</span>
              </a>
            )}
            {site.social.instagram && (
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" data-cursor
                 className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-fog/70 transition-colors hover:border-brand hover:text-brand"
                 aria-label="Instagram">
                <Icon name="Sparkles" className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="spec mb-5 text-brand">Explore</p>
          <ul className="space-y-3 text-sm">
            {[
              ['/about', 'About'],
              ['/services', 'Services'],
              ['/portfolio', 'Our Work'],
              ['/clients', 'Industries'],
              ['/reviews', 'Reviews'],
              ['/service-area', 'Service Area'],
              ['/contact', 'Request a Quote'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="link-sweep text-steel hover:text-bone">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="spec mb-5 text-brand">Contact</p>
          <ul className="space-y-3.5 text-sm text-steel">
            <li className="flex gap-2.5">
              <Icon name="MapPin" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
                {fullAddress}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Icon name="Phone" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <a href={telHref} className="hover:text-bone">{site.phoneDisplay}</a>
            </li>
            <li className="flex gap-2.5">
              <Icon name="Send" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              Fax {site.faxDisplay}
            </li>
          </ul>
        </div>

        <div>
          <p className="spec mb-5 text-brand">Hours</p>
          <ul className="space-y-2 text-sm text-steel">
            {hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span className="font-mono text-xs uppercase">{h.day.slice(0, 3)}</span>
                <span className={h.closed ? 'text-ash' : 'text-fog'}>{h.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-ash sm:flex-row">
          <p className="font-mono">
            © {year} {site.legalName} · Website by{' '}
            <a href="https://clickmingo.com" target="_blank" rel="noopener" className="hover:text-fog">
              ClickMingo
            </a>
          </p>
          <p className="font-mono uppercase tracking-wider">Kenilworth · Union County · NJ / NY Metro</p>
        </div>
      </div>
    </footer>
  );
}
