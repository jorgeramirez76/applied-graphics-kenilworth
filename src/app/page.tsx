import Link from 'next/link';
import { WrapHero } from '@/components/WrapHero';
import { HeroPromiseStrip } from '@/components/HeroPromiseStrip';
import { Marquee } from '@/components/Marquee';
import { StatBar } from '@/components/StatBar';
import { SectionHeading } from '@/components/SectionHeading';
import { ServiceCard } from '@/components/ServiceCard';
import { ProjectCard } from '@/components/ProjectCard';
import { ReviewCard } from '@/components/ReviewCard';
import { CTASection } from '@/components/CTASection';
import { BrandStrip } from '@/components/BrandStrip';
import { EnvironmentalSection } from '@/components/EnvironmentalSection';
import { ProcessTimeline } from '@/components/ProcessTimeline';
import { Reveal } from '@/components/Reveal';
import { Icon } from '@/components/Icon';
import { Magnetic } from '@/components/motion/Magnetic';
import { FaqAccordion } from '@/components/FaqAccordion';
import { JsonLd } from '@/components/JsonLd';
import { faqSchema, breadcrumbSchema } from '@/lib/schema';
import { services, projectsWithImages, reviews, clients, serviceAreas } from '@/lib/data';

export default function HomePage() {
  const featured = projectsWithImages.filter((p) => p.featured).slice(0, 6);
  // Balanced preview — vehicles AND building interiors/exteriors.
  const previewSlugs = [
    'vehicle-wraps',
    'fleet-graphics',
    'interior-exterior-graphics',
    'architectural-finishes',
    'window-graphics',
    'banners-signs',
  ];
  const topServices = previewSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is (typeof services)[number] => Boolean(s));
  const topReviews = reviews.reviews.slice(0, 3);
  const marqueeItems = ['Vehicle Wraps', 'Wall Murals', 'Fleet Graphics', 'Storefronts', 'Window Graphics', 'Architectural Finishes', 'Building Signage', 'Color-Change'];

  return (
    <>
      <JsonLd data={[faqSchema(), breadcrumbSchema([{ name: 'Home', path: '/' }])]} />
      <WrapHero />

      <section className="relative overflow-hidden border-t border-white/[0.06] bg-carbon py-16">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-brand/10 blur-[140px]" />
        <div className="container relative flex flex-wrap items-center justify-between gap-8">
          <p className="max-w-xl font-display text-2xl uppercase leading-tight text-bone sm:text-3xl">
            That was a render. <span className="text-brand">Yours would be a real one</span>, measured
            and installed in our Kenilworth bay.
          </p>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <Link href="/contact" data-cursor className="btn-primary">
                Wrap My Vehicle <Icon name="ArrowRight" className="h-4 w-4" />
              </Link>
            </Magnetic>
            <Link href="/portfolio" data-cursor className="btn-outline">
              See real jobs
            </Link>
          </div>
        </div>
      </section>

      <HeroPromiseStrip />
      <Marquee items={marqueeItems} />
      <StatBar />
      <BrandStrip />

      {/* Services */}
      <section className="section bg-ink">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="What we do"
              title="Graphics that get you noticed."
              intro="We brand vehicles and buildings — inside and out. Wraps, wall murals, storefronts, windows and signage, all designed, printed and installed by one certified team."
            />
            <Reveal>
              <Magnetic>
                <Link href="/services" data-cursor className="btn-outline">
                  All Services <Icon name="ArrowRight" className="h-4 w-4" />
                </Link>
              </Magnetic>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topServices.map((s, i) => (
              <Reveal key={s.slug}>
                <ServiceCard service={s} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interior & exterior graphics — buildings, not just vehicles */}
      <EnvironmentalSection />

      {/* Featured work */}
      <section className="section bg-ink">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Selected work"
              title="On the road right now."
              intro="A sample of real projects. Photos are the clients’ own work, shown pending their approval."
            />
            <Reveal>
              <Magnetic>
                <Link href="/portfolio" data-cursor className="btn-outline">
                  Full Portfolio <Icon name="ArrowRight" className="h-4 w-4" />
                </Link>
              </Magnetic>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <Reveal key={p.id}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-carbon">
        <div className="container">
          <SectionHeading
            eyebrow="How we work"
            title="Concept to completion, under one roof."
            intro="No handoffs to third parties. Design, print and install — all in-house in Kenilworth."
          />
          <div className="mt-16">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      {/* Why choose — bento */}
      <section className="section bg-ink">
        <div className="container">
          <SectionHeading align="center" eyebrow="Why Applied Graphics" title="Proof, not promises." intro="A real Kenilworth shop with the certifications, warranty and track record to back every wrap." />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.whyChooseUs.map((w) => (
              <Reveal key={w.title}>
                <div className="flex h-full gap-4 rounded-2xl border border-white/[0.08] bg-graphite p-6 transition-colors hover:border-brand/30">
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

      {/* Reviews */}
      <section className="section bg-carbon">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Reviews"
              title="Customers who stuck around for decades."
              intro={`Rated ${reviews.aggregate.rating} / 5 across public listings, with a ${reviews.aggregate.facebookRecommendRate} recommend rate on Facebook.`}
            />
            <Reveal>
              <Magnetic>
                <Link href="/reviews" data-cursor className="btn-outline">
                  All Reviews <Icon name="ArrowRight" className="h-4 w-4" />
                </Link>
              </Magnetic>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {topReviews.map((r) => (
              <Reveal key={r.id}>
                <ReviewCard review={r} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="section bg-ink">
        <div className="container grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Service area" title="Based in Kenilworth. Working across the metro." intro={`${serviceAreas.summary} ${serviceAreas.headquarters.note}`} />
            <Reveal>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <Link href="/service-area" data-cursor className="btn-light">See Service Area</Link>
                </Magnetic>
                <Link href="/contact" data-cursor className="btn-outline">Request a Quote</Link>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <div className="flex flex-wrap gap-2 rounded-2xl border border-white/[0.08] bg-graphite p-7">
              {serviceAreas.unionCountyTowns.map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-fog/70">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-carbon">
        <div className="container grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="FAQ" title="Good questions, straight answers." />
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
