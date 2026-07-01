import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { Reveal } from '@/components/Reveal';
import { Icon } from '@/components/Icon';
import { Magnetic } from '@/components/motion/Magnetic';
import { JsonLd } from '@/components/JsonLd';
import { serviceSchema, breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { services } from '@/lib/data';

export const metadata = pageMetadata({
  title: 'Services — Vehicle Wraps, Fleet Graphics & Signage',
  description:
    'Full and partial vehicle wraps, fleet graphics, color-changes, food-truck wraps, race graphics, 3M DI-NOC architectural finishes, window graphics, banners and large-format printing — Kenilworth, NJ.',
  path: '/services',
});

const GROUPS = [
  { key: 'Wraps', label: 'Vehicle & Fleet Wraps' },
  { key: 'Signage', label: 'Signage & Architectural' },
  { key: 'Service', label: 'Design & Install' },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]),
          ...services.map((s) => serviceSchema(s)),
        ]}
      />
      <PageHero
        crumb="Services"
        eyebrow="What we do"
        index="02"
        title="Every surface. One certified team."
        intro="From a single color-change to a 500-vehicle fleet — plus storefronts, walls and windows. Designed, printed and installed in-house."
      />

      {/* sticky nav */}
      <div className="sticky top-[4.5rem] z-30 border-y border-white/10 bg-ink/85 backdrop-blur-xl">
        <div className="container flex gap-2 overflow-x-auto py-3">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="whitespace-nowrap rounded-full border border-white/10 bg-graphite px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide text-fog/60 transition-colors hover:border-brand/40 hover:text-brand"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>

      {GROUPS.map((g, gi) => {
        const items = services.filter((s) => s.category === g.key);
        if (!items.length) return null;
        return (
          <section key={g.key} className={`section ${gi % 2 === 0 ? 'bg-ink' : 'bg-carbon'}`}>
            <div className="container">
              <p className="eyebrow reveal" data-reveal>{g.label}</p>
              <div className="mt-10 space-y-6">
                {items.map((s) => (
                  <Reveal key={s.slug}>
                    <article id={s.slug} className="scroll-mt-32 grid gap-8 rounded-2xl border border-white/[0.08] bg-graphite p-7 lg:grid-cols-12 lg:p-10">
                      <div className="lg:col-span-7">
                        <div className="flex items-center gap-4">
                          <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-brand ring-1 ring-white/10">
                            <Icon name={s.icon} className="h-6 w-6" />
                          </span>
                          <h2 className="font-display text-3xl uppercase text-bone">{s.name}</h2>
                        </div>
                        <p className="mt-6 max-w-prose text-lg leading-relaxed text-steel">{s.long}</p>
                        <Magnetic>
                          <Link href={`/contact?service=${encodeURIComponent(s.name)}`} data-cursor className="btn-primary mt-7">
                            Quote this service <Icon name="ArrowRight" className="h-4 w-4" />
                          </Link>
                        </Magnetic>
                      </div>
                      <div className="lg:col-span-5">
                        <ul className="grid gap-3 rounded-xl border border-white/10 bg-ink/50 p-6">
                          {s.features.map((f) => (
                            <li key={f} className="flex items-start gap-3 text-sm text-fog/80">
                              <Icon name="Check" className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={2.5} />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CTASection title="Not sure which service you need?" intro="Tell us what you’re trying to accomplish and we’ll point you the right way — no pressure." />
    </>
  );
}
