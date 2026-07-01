import Link from 'next/link';
import { Icon } from './Icon';
import { AnimatedHeading } from './motion/AnimatedHeading';
import { Magnetic } from './motion/Magnetic';
import { site, telHref } from '@/lib/data';

export function CTASection({
  title = 'Get a free, no-pressure quote.',
  intro = 'Tell us about your vehicle, fleet or storefront — we usually reply within one business day.',
}: {
  title?: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-grid-faint bg-[size:48px_48px] opacity-50" />
      <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[140px]" />
      <div className="container relative py-24 text-center sm:py-32">
        <p className="eyebrow reveal inline-block" data-reveal>
          Request a Quote
        </p>
        <AnimatedHeading
          text={title}
          className="mx-auto mt-6 max-w-4xl font-display text-5xl uppercase leading-[0.92] text-bone sm:text-6xl lg:text-7xl"
        />
        <p className="reveal mx-auto mt-7 max-w-xl text-lg text-steel" data-reveal>
          {intro}
        </p>
        <div className="reveal mt-10 flex flex-wrap justify-center gap-3" data-reveal>
          <Magnetic>
            <Link href="/contact" data-cursor className="btn-primary">
              <Icon name="Send" className="h-4 w-4" /> Request a Quote
            </Link>
          </Magnetic>
          <a href={telHref} className="btn-outline">
            <Icon name="Phone" className="h-4 w-4" /> {site.phoneDisplay}
          </a>
        </div>
        <p className="spec reveal mt-8 text-ash" data-reveal>
          3M-Certified · BBB A+ · Serving Union County &amp; the NJ / NY Metro
        </p>
      </div>
    </section>
  );
}
