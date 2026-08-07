import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { StatBar } from '@/components/StatBar';
import { CTASection } from '@/components/CTASection';
import { ProcessTimeline } from '@/components/ProcessTimeline';
import { Reveal } from '@/components/Reveal';
import { Icon } from '@/components/Icon';
import { Magnetic } from '@/components/motion/Magnetic';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/data';

export const metadata = pageMetadata({
  title: 'About Us',
  description:
    'Applied Graphics Inc. has designed, printed and installed vehicle wraps and large-format graphics in Kenilworth, NJ since 1978 — 3M-certified installers, BBB A+ with zero complaints.',
  path: '/about',
});

const CAPS = [
  '6,000 sq ft indoor, heated & cooled facility',
  'Vehicles up to 14′ high × 53′ long',
  'Eco-friendly printing materials & systems',
  'On-the-road / on-site installation',
  'Prints up to 60″ wide × 150′ long',
  'One custom piece to a fleet of 500',
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])} />
      <PageHero
        crumb="About"
        eyebrow={`Since ${site.founded}`}
        index="01"
        title="A Kenilworth shop built on doing it right."
        intro="Applied Graphics, Inc. was founded to help businesses navigate the complex advertising landscape — and to share in our clients’ success. Decades later, that’s still the job."
      />

      {/* Story */}
      <section className="section bg-ink">
        <div className="container grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Our story" title="Experience you can see at a glance." />
            <div className="reveal mt-8 space-y-5 text-lg leading-relaxed text-steel" data-reveal>
              <p>
                We offer more than three decades of experience backed by a proven track record of excellence.
                We use state-of-the-art, eco-friendly printing materials and systems that carry the best
                warranty in the business — so the work doesn’t just look good on day one, it holds up.
              </p>
              <p>
                Our fully staffed art department can design a wrap that commands attention on the road. From
                concept to completion we guide you through every step. Whether it’s one custom art piece or a
                fleet of 500, we’re prepared to give you the results you’re after — because we’ve done it so
                many times before.
              </p>
              <p>
                Not just vehicles, either. Our installers are trained on all surfaces: wall murals, storefront
                windows, banners, kiosks and 3M DI-NOC architectural finishes. Can’t come to us? We’ll come to
                you and wrap on the road.
              </p>
              <blockquote className="border-l-2 border-brand pl-6">
                <p className="font-display text-2xl uppercase leading-tight text-bone">
                  “Our experience guarantees your satisfaction.”
                </p>
                <footer className="spec mt-3 text-fog/70">
                  {site.ownerName}, {site.ownerTitle} — Applied Graphics Inc.
                </footer>
              </blockquote>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <div className="rounded-2xl border border-white/10 bg-graphite p-8">
                <p className="eyebrow">Capabilities</p>
                <h3 className="mt-3 font-display text-2xl uppercase text-bone">Big shop, certified crew.</h3>
                <ul className="mt-6 space-y-3.5">
                  {CAPS.map((c) => (
                    <li key={c} className="flex items-start gap-3 text-sm text-fog/85">
                      <Icon name="Check" className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={2.5} />
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-2 border-t border-white/10 pt-6">
                  {site.certifications.map((c) => (
                    <span key={c} className="rounded-full bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-fog/70 ring-1 ring-white/10">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <StatBar />

      {/* Process */}
      <section className="section bg-carbon">
        <div className="container">
          <SectionHeading align="center" eyebrow="How we work" title="Concept to completion, under one roof." intro="No handoffs to third parties — design, print and install are all in-house." />
          <div className="mx-auto mt-16 max-w-4xl">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      {/* Local roots */}
      <section className="section bg-ink">
        <div className="container grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Local roots" title="Proudly made in Kenilworth, NJ." intro="Stop by to check out our facility, printers, designers and friendly staff. We’re 27 minutes from Manhattan with easy highway access — convenient for businesses across Union County and the wider NJ / NY metro." />
            <Reveal>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic><Link href="/service-area" data-cursor className="btn-light">Where we work</Link></Magnetic>
                <Link href="/portfolio" data-cursor className="btn-outline">See our work</Link>
              </div>
            </Reveal>
            {/* Entity disambiguation. There are unrelated "Applied Graphics"
                companies in Amesbury MA and Sanford NC; without this an answer
                engine will happily merge the three. Written as a plain, useful
                statement rather than an SEO note. */}
            <Reveal>
              <p className="mt-8 max-w-xl border-l-2 border-white/10 pl-5 text-sm leading-relaxed text-steel">
                Applied Graphics Inc. — registered in New Jersey as Applied Graphics Co., Inc. —
                has worked from {site.address.street} in {site.address.city}, {site.address.county},
                New Jersey since {site.founded}, and can be reached at {site.phoneDisplay}. It is an
                independent New Jersey company, and is not affiliated with the similarly named
                graphics firms in Amesbury, Massachusetts or Sanford, North Carolina.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-graphite p-2.5">
              <div className="relative aspect-[5/3] overflow-hidden rounded-xl">
                <Image src="/images/applied-graphics-company-van.webp" alt="Applied Graphics branded company van outside the Kenilworth NJ shop" fill sizes="(max-width: 1024px) 90vw, 560px" className="object-cover" />
              </div>
            </div>
            <p className="mt-3 font-mono text-[11px] text-ash">Team photos and a shop tour can be added once Applied Graphics provides them — see the launch checklist.</p>
          </Reveal>
        </div>
      </section>

      <CTASection title="Come see what we can do." />
    </>
  );
}
