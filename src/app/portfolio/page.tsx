import { PageHero } from '@/components/PageHero';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import { CTASection } from '@/components/CTASection';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import { projects, projectCategories } from '@/lib/data';

export const metadata = pageMetadata({
  title: 'Our Work — Vehicle Wrap & Graphics Portfolio',
  description:
    'A portfolio of vehicle wraps, fleet graphics, color-changes and mobile-unit projects by Applied Graphics Inc. of Kenilworth, NJ.',
  path: '/portfolio',
});

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Our Work', path: '/portfolio' }])} />
      <PageHero
        crumb="Our Work"
        eyebrow="Portfolio"
        index="03"
        title="Real wraps. Real vehicles. Real brands."
        intro="A selection of projects produced by Applied Graphics. Use the filters to browse by category."
      />

      <section className="section bg-ink">
        <div className="container">
          <div className="mb-10 flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-5 text-sm text-amber-200/90">
            <Icon name="ShieldCheck" className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <p>
              <strong className="text-amber-100">About these photos:</strong> images are Applied Graphics’ own
              published work, sourced from public profiles. Client brand names and logos belong to their owners.
              Each is marked “photo pending approval” until Applied Graphics confirms rights and supplies
              high-resolution originals — see the launch checklist.
            </p>
          </div>

          <PortfolioGallery projects={projects} categories={projectCategories} />
        </div>
      </section>

      <CTASection title="Want your vehicle in this gallery?" />
    </>
  );
}
