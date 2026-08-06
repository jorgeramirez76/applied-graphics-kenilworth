import type { Metadata } from 'next';

// Where the site actually lives. The deploy workflow sets NEXT_PUBLIC_SITE_URL
// from the Pages origin; when Applied Graphics points appliedgrafx.com here,
// change it there and every canonical, sitemap URL and JSON-LD @id follows.
//
// The fallback is deliberately the Pages URL, NOT appliedgrafx.com: defaulting
// a canonical to a domain we don't control would tell Google this content
// belongs to a site that currently fails TLS validation.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://jorgeramirez76.github.io/applied-graphics-kenilworth';

// Subpath when hosted under GitHub Pages (/<repo>); empty locally / on a domain.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

type PageSeo = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

// next.config sets trailingSlash:true, so /about is served at /about/. A canonical
// without the slash points at a URL that 308s — self-referencing canonicals have
// to match the URL that actually serves the page.
export const canonicalUrl = (path = '/') =>
  path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path.replace(/\/$/, '')}/`;

export function pageMetadata({
  title,
  description,
  path = '/',
  image = `${BASE_PATH}/og.jpg`,
}: PageSeo): Metadata {
  const url = canonicalUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Applied Graphics Inc.',
      type: 'website',
      locale: 'en_US',
      images: [{ url: image, width: 1200, height: 630, alt: 'Applied Graphics — vehicle wraps & large-format graphics, Kenilworth NJ' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
