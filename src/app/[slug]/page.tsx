import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { CTASection } from '@/components/CTASection';
import { JsonLd } from '@/components/JsonLd';
import { Icon } from '@/components/Icon';
import { Reveal } from '@/components/Reveal';
import { Magnetic } from '@/components/motion/Magnetic';
import { longTailPages, getLongTailPage } from '@/lib/longtail';
import { pageMetadata, SITE_URL } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { site, telHref, getService } from '@/lib/data';

// Static segments (/about, /services…) take precedence over this dynamic one,
// so it only ever resolves the long-tail slugs listed below.
export function generateStaticParams() {
  return longTailPages.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

// Next 15+ made `params` a Promise. Reading it synchronously yields undefined,
// which silently renders the not-found page while the build still reports success.
type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const page = getLongTailPage(slug);
  if (!page) return {};
  return pageMetadata({ title: page.title, description: page.description, path: `/${page.slug}` });
}

export default async function LongTailPage({ params }: Params) {
  const { slug } = await params;
  const page = getLongTailPage(slug);
  if (!page) notFound();
  const service = getService(page.serviceSlug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: page.h1, path: `/${page.slug}` },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: page.faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: page.h1,
            description: page.tldr,
            provider: { '@id': `${SITE_URL}/#business` },
            areaServed: [
              { '@type': 'AdministrativeArea', name: 'Union County, New Jersey' },
              { '@type': 'State', name: 'New Jersey' },
            ],
            url: `${SITE_URL}/${page.slug}/`,
          },
        ]}
      />

      <PageHero eyebrow={page.eyebrow} title={page.h1} crumb={page.eyebrow} />

      <section className="section bg-ink pt-0">
        <div className="container">
          {/* The quotable block. An answer engine lifting one passage off this
              page should land here: self-contained, names the company and the
              place, all numbers sourced. */}
          <div className="max-w-3xl rounded-2xl border-l-2 border-brand bg-graphite p-7 sm:p-8">
            <p className="spec text-brand">In short</p>
            <p className="mt-3 text-lg leading-relaxed text-fog">{page.tldr}</p>
          </div>

          <div className="mt-16 grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {page.sections.map((s) => (
                <Reveal key={s.heading}>
                  <div className="mb-12">
                    <h2 className="max-w-2xl font-display text-2xl uppercase leading-tight text-bone sm:text-3xl">
                      {s.heading}
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel">{s.body}</p>
                    {s.table && (
                      <div className="mt-6 overflow-x-auto rounded-xl border border-white/[0.08]">
                        <table className="w-full border-collapse text-left text-sm">
                          <thead>
                            <tr className="bg-carbon">
                              {s.table.head.map((h) => (
                                <th
                                  key={h}
                                  scope="col"
                                  className="whitespace-nowrap px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-fog/70"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {s.table.rows.map((row, i) => (
                              <tr key={i} className="border-t border-white/[0.06]">
                                {row.map((cell, j) => (
                                  <td
                                    key={j}
                                    className={`px-4 py-3 align-top ${
                                      j === 0 ? 'font-medium text-bone' : 'text-steel'
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}

              <div className="mt-16 border-t border-white/10 pt-10">
                <h2 className="font-display text-2xl uppercase text-bone sm:text-3xl">
                  Common questions
                </h2>
                <dl className="mt-8 space-y-7">
                  {page.faqs.map((f) => (
                    <div key={f.q}>
                      <dt className="font-display text-lg uppercase leading-tight text-bone">
                        {f.q}
                      </dt>
                      <dd className="mt-2 max-w-2xl text-base leading-relaxed text-steel">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Sticky proof rail */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <div className="rounded-2xl border border-white/[0.08] bg-graphite p-6">
                  <p className="spec text-brand">The shop</p>
                  <dl className="mt-4 space-y-3 text-sm">
                    {[
                      ['In business since', site.founded],
                      ['Facility', `${site.capabilities.facilitySqFt.toLocaleString()} sq ft, heated & cooled`],
                      ['Takes vehicles to', `${site.capabilities.maxVehicleHeightFt}′ H × ${site.capabilities.maxVehicleLengthFt}′ L`],
                      ['Prints to', `${site.capabilities.maxPrintWidthIn}″ × ${site.capabilities.maxPrintLengthFt}′`],
                      ['Installers', '3M-certified'],
                      ['BBB', `${site.trust.bbbRating}, since ${site.trust.bbbAccreditedSince}`],
                    ].map(([k, v]) => (
                      <div key={k as string} className="flex justify-between gap-4 border-b border-white/[0.06] pb-2.5">
                        <dt className="text-steel">{k}</dt>
                        <dd className="text-right font-medium text-bone">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6 grid gap-2.5">
                    <Magnetic>
                      <Link href="/contact" data-cursor className="btn-primary w-full">
                        <Icon name="Send" className="h-4 w-4" /> {site.ctas.quote}
                      </Link>
                    </Magnetic>
                    <a href={telHref} data-cursor className="btn-outline w-full">
                      <Icon name="Phone" className="h-4 w-4" /> {site.phoneDisplay}
                    </a>
                  </div>
                </div>

                {service && (
                  <Link
                    href="/services"
                    data-cursor
                    className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-carbon p-5 transition-colors hover:border-brand/30"
                  >
                    <span>
                      <span className="spec block text-steel">Related service</span>
                      <span className="mt-1 block font-display text-base uppercase text-bone">
                        {service.name}
                      </span>
                    </span>
                    <Icon name="ArrowRight" className="h-4 w-4 shrink-0 text-brand" />
                  </Link>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
