import type { Metadata } from 'next';

// Intended production domain. Override with NEXT_PUBLIC_SITE_URL at deploy time.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.appliedgrafx.com';

// Subpath when hosted under GitHub Pages (/<repo>); empty locally / on a domain.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

type PageSeo = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export function pageMetadata({
  title,
  description,
  path = '/',
  image = `${BASE_PATH}/og.jpg`,
}: PageSeo): Metadata {
  const url = `${SITE_URL}${path}`;
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
