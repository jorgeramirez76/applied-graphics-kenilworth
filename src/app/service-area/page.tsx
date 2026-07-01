import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { CTASection } from '@/components/CTASection';
import { Reveal } from '@/components/Reveal';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { serviceAreas, mapsEmbedSrc, mapsLink, fullAddress } from '@/lib/data';

export const metadata = pageMetadata({
  title: 'Service Area — Kenilworth, Union County & the NJ/NY Metro',
  description:
    'Applied Graphics is based in Kenilworth, NJ and serves all of Union County and the surrounding New Jersey and New York metro, with reach into Philadelphia, Connecticut and Boston.',
  path: '/service-area',
});

export default function ServiceAreaPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Service Area', path: '/service-area' }])} />
      <PageHero
        crumb="Service Area"
        eyebrow="Where we work"
        index="06"
        title="Local in Kenilworth. Regional by design."
        intro={serviceAreas.summary}
      />

      <section className="section bg-ink">
        <div className="container grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-white/10 bg-graphite p-8">
              <p className="eyebrow">Home base</p>
              <h2 className="mt-3 font-display text-3xl uppercase text-bone">Union County, NJ</h2>
              <p className="mt-3 text-steel">{serviceAreas.headquarters.note}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {serviceAreas.unionCountyTowns.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-fog/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-graphite">
              <iframe
                title={`Map to Applied Graphics, ${fullAddress}`}
                src={mapsEmbedSrc}
                className="h-72 w-full border-0 grayscale invert-[0.92] lg:h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex items-center justify-between gap-3 p-5">
                <p className="text-sm text-steel">{fullAddress}</p>
                <a href={mapsLink} target="_blank" rel="noopener noreferrer" data-cursor className="btn-outline !px-4 !py-2 text-[11px]">
                  Directions <Icon name="ExternalLink" className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-carbon">
        <div className="container">
          <SectionHeading eyebrow="Beyond Union County" title="Nearby counties we cover." />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {serviceAreas.nearbyRegions.map((r) => (
              <Reveal key={r.label}>
                <div className="h-full rounded-2xl border border-white/[0.08] bg-graphite p-6">
                  <h3 className="font-display text-xl uppercase text-bone">{r.label}</h3>
                  <p className="mt-2 text-sm text-steel">{r.examples.join(' · ')}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 grid gap-6 rounded-2xl border border-white/10 bg-ink p-8 md:grid-cols-2 md:items-center">
              <div>
                <p className="eyebrow">Regional &amp; national</p>
                <h3 className="mt-3 font-display text-2xl uppercase text-bone">We travel for the right project.</h3>
              </div>
              <div>
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.extendedRegions.map((r) => (
                    <span key={r} className="rounded-full border border-white/10 bg-graphite px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-fog/70">{r}</span>
                  ))}
                </div>
                <p className="mt-4 text-sm text-steel">{serviceAreas.nationalNote}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection title="Serving your town?" intro="If you’re anywhere in the NJ/NY metro, we’ve got you covered. Ask us about your location." />
    </>
  );
}
