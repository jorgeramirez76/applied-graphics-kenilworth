import { PageHero } from '@/components/PageHero';
import { QuoteForm } from '@/components/QuoteForm';
import { Reveal } from '@/components/Reveal';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { site, telHref, fullAddress, formatHours, mapsEmbedSrc, mapsLink } from '@/lib/data';

export const metadata = pageMetadata({
  title: 'Request a Quote / Contact',
  description:
    'Request a free vehicle wrap or signage quote from Applied Graphics Inc., 718 B Jefferson Ave, Kenilworth, NJ. Call (908) 620-9600, Mon–Fri 9–5.',
  path: '/contact',
});

export default function ContactPage() {
  const hours = formatHours();
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])} />
      <PageHero
        crumb="Contact"
        eyebrow="Request a Quote"
        index="07"
        title="Let’s talk about your project."
        intro="Send a few details and we’ll get back to you — usually within one business day. Prefer to talk it through? Call us."
      />

      <section className="section bg-ink">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <QuoteForm />
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <div className="space-y-5">
                <div className="rounded-2xl border border-white/10 bg-graphite p-8">
                  <h2 className="font-display text-2xl uppercase text-bone">Applied Graphics Inc.</h2>
                  <ul className="mt-6 space-y-4 text-sm">
                    <li className="flex gap-3">
                      <Icon name="MapPin" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                      <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="text-fog/85 hover:text-bone">{fullAddress}</a>
                    </li>
                    <li className="flex gap-3">
                      <Icon name="Phone" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                      <a href={telHref} className="text-fog/85 hover:text-bone">{site.phoneDisplay}</a>
                    </li>
                    <li className="flex gap-3">
                      <Icon name="Send" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                      <span className="text-fog/85">Fax {site.faxDisplay}</span>
                    </li>
                    <li className="flex gap-3">
                      <Icon name="Mail" className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                      <span className="text-ash">Email coming at launch — use the form or call for now.</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-graphite p-8">
                  <p className="eyebrow">Hours</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {hours.map((h) => (
                      <li key={h.day} className="flex justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
                        <span className="font-mono text-xs uppercase text-steel">{h.day}</span>
                        <span className={h.closed ? 'text-ash' : 'font-semibold text-fog'}>{h.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/10 bg-graphite">
                  <iframe
                    title={`Map to Applied Graphics, ${fullAddress}`}
                    src={mapsEmbedSrc}
                    className="h-56 w-full border-0 grayscale invert-[0.92]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
