import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// Required by Next 15+ for metadata routes under `output: 'export'`.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // Allow AI answer engines (AEO/LLMO) — see research/local-seo.md
      { userAgent: ['GPTBot', 'OAI-SearchBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended'], allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
