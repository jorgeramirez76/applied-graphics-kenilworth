import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { CTASection } from '@/components/CTASection';
import { Reveal } from '@/components/Reveal';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { clients } from '@/lib/data';

export const metadata = pageMetadata({
  title: 'Industries & Clients We Serve',
  description:
    'Applied Graphics serves contractors, fleets, food trucks, healthcare programs, auto enthusiasts, retailers and more across New Jersey and the NY metro.',
  path: '/clients',
});

export default function ClientsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Industries', path: '/clients' }])} />
      <PageHero
        crumb="Industries"
        eyebrow="Who we work with"
        index="04"
        title="From handymen to healthcare fleets."
        intro="Applied Graphics builds graphics for businesses of every size across the region. Here are the industries we serve most — and a few brands we’ve put on the road."
      />

      <section className="section bg-ink">
        <div className="container">
          <SectionHeading eyebrow="Industries served" title="Built for working brands." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {clients.industries.map((ind) => (
              <Reveal key={ind.name}>
                <div className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-graphite p-6 transition-colors hover:border-brand/30">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-brand ring-1 ring-white/10">
                    <Icon name={ind.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg uppercase leading-tight text-bone">{ind.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel">{ind.blurb}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-carbon">
        <div className="container">
          <SectionHeading eyebrow="Selected projects" title="Brands we’ve helped put on the road." intro={clients.intro} />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clients.verifiedClients.map((c) => (
              <Reveal key={c.name}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-graphite p-6">
                  <div>
                    <h3 className="font-display text-xl uppercase leading-tight text-bone">{c.name}</h3>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider2 text-brand">{c.industry}</p>
                    <p className="mt-3 text-sm text-steel">{c.project}</p>
                  </div>
                  <p className="mt-5 flex items-center gap-1.5 border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-wide text-ash">
                    <Icon name="ShieldCheck" className="h-3.5 w-3.5" /> {c.source} · pending approval
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Your industry not listed?" intro="If it has a surface, we can brand it. Tell us what you do and we’ll show you what’s possible." />
    </>
  );
}
