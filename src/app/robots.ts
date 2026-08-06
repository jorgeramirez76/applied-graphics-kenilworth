import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// Required by Next 15+ for metadata routes under `output: 'export'`.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // Explicitly allow the AI answer engines. A blocked bot cannot cite you,
      // and citation is the whole point — this business's competitive edge
      // (3M certification, 53-foot capacity, zero BBB complaints) is exactly
      // the kind of specific fact an answer engine will quote.
      {
        userAgent: [
          'GPTBot', // OpenAI training + browsing
          'ChatGPT-User', // ChatGPT live browsing
          'OAI-SearchBot', // ChatGPT search index
          'PerplexityBot',
          'Perplexity-User',
          'ClaudeBot',
          'anthropic-ai',
          'Claude-User',
          'Google-Extended', // Gemini + AI Overviews
          'Applebot-Extended',
          'Bingbot', // Copilot
          'DuckAssistBot',
          'cohere-ai',
          'meta-externalagent',
        ],
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
