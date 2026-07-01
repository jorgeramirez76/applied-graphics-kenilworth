import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { ReviewCard } from '@/components/ReviewCard';
import { CTASection } from '@/components/CTASection';
import { Reveal } from '@/components/Reveal';
import { Icon } from '@/components/Icon';
import { CountUp } from '@/components/motion/CountUp';
import { JsonLd } from '@/components/JsonLd';
import { reviewsSchema, breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { reviews, site } from '@/lib/data';

export const metadata = pageMetadata({
  title: 'Reviews & Testimonials',
  description:
    'See what customers say about Applied Graphics Inc. — rated 4.9/5 across public listings, BBB A+ rated, with a 100% Facebook recommend rate.',
  path: '/reviews',
});

export default function ReviewsPage() {
  const a = reviews.aggregate;
  return (
    <>
      <JsonLd data={[reviewsSchema(), breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Reviews', path: '/reviews' }])]} />
      <PageHero
        crumb="Reviews"
        eyebrow="Reputation"
        index="05"
        title="Decades of repeat customers."
        intro="Some of our customers have worked with Mario and the crew for 10 and 20 years. Here’s a sample of public feedback."
      />

      {/* trust band */}
      <section className="border-y border-white/10 bg-carbon">
        <div className="container grid grid-cols-1 sm:grid-cols-3">
          {[
            { el: <CountUp value={a.rating} decimals={1} suffix=" / 5" />, label: 'Aggregate rating', sub: `${a.reviewCount} public reviews` },
            { el: <span className="text-brand">{a.bbbRating}</span>, label: 'BBB rating', sub: `Accredited since ${a.bbbAccreditedSince}` },
            { el: <span className="text-brand">{a.facebookRecommendRate}</span>, label: 'Recommend rate', sub: 'on Facebook' },
          ].map((t, i) => (
            <div key={t.label} data-reveal className={`reveal flex flex-col px-2 py-12 text-center ${i !== 0 ? 'sm:border-l border-white/10' : ''}`}>
              <span className="font-display text-5xl leading-none text-bone sm:text-6xl">{t.el}</span>
              <span className="spec mt-4 text-fog">{t.label}</span>
              <span className="mt-1 text-xs text-ash">{t.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* reviews */}
      <section className="section bg-ink">
        <div className="container">
          <SectionHeading eyebrow="In their words" title="What customers say." />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {reviews.reviews.map((r) => (
              <Reveal key={r.id}><ReviewCard review={r} /></Reveal>
            ))}
          </div>
          <p className="mt-7 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-ash">
            <Icon name="ShieldCheck" className="h-4 w-4" /> Reviews shown verbatim from public listings. {a.note}
          </p>
        </div>
      </section>

      {/* why choose */}
      <section className="section bg-carbon">
        <div className="container">
          <SectionHeading align="center" eyebrow="Why businesses choose us" title="The reasons behind the ratings." intro="Even where reviews are limited, the fundamentals speak for themselves." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.whyChooseUs.map((w) => (
              <Reveal key={w.title}>
                <div className="flex h-full gap-4 rounded-2xl border border-white/[0.08] bg-graphite p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-brand ring-1 ring-white/10">
                    <Icon name={w.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg uppercase leading-tight text-bone">{w.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-steel">{w.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Join them." intro={`Get a free quote, or call ${site.phoneDisplay} and talk to a real person about your project.`} />
    </>
  );
}
