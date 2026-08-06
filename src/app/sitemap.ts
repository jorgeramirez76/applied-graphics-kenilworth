import type { MetadataRoute } from 'next';
import { canonicalUrl } from '@/lib/seo';
import { longTailPages } from '@/lib/longtail';

// Required by Next 15+ for metadata routes under `output: 'export'`.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/clients',
    '/reviews',
    '/service-area',
    '/contact',
    ...longTailPages.map((p) => `/${p.slug}`),
  ];
  const now = new Date();
  return routes.map((path) => ({
    // Must match the trailing-slash form the static export actually serves.
    url: canonicalUrl(path || '/'),
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/contact' ? 0.9 : 0.7,
  }));
}
