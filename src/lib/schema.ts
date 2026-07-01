// Schema.org JSON-LD builders (LocalBusiness / Service / FAQPage / Breadcrumb / Review).
import { site, fullAddress, reviews } from './data';
import { SITE_URL } from './seo';
import { faqs } from './faqs';

const ID = `${SITE_URL}/#business`;

export function localBusinessSchema() {
  const sameAs = [
    site.officialWebsite,
    site.social.facebook,
    site.social.instagram,
    site.social.linkedin,
    site.trust.bbbProfile,
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': ID,
    name: site.legalName,
    alternateName: site.name,
    url: SITE_URL,
    image: `${SITE_URL}/og.jpg`,
    logo: `${SITE_URL}/icon.png`,
    telephone: site.phoneDisplay,
    faxNumber: site.faxDisplay,
    priceRange: '$$',
    foundingDate: site.founded,
    slogan: site.tagline,
    description: site.shortDescription,
    founder: { '@type': 'Person', name: site.ownerName },
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHoursSpecification: site.hours
      .filter((h) => h.open)
      .map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.day,
        opens: h.open,
        closes: h.close,
      })),
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Union County, New Jersey' },
      { '@type': 'State', name: 'New Jersey' },
      { '@type': 'City', name: 'New York' },
    ],
    sameAs,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: site.trust.aggregateRating,
      reviewCount: site.trust.aggregateReviewCount,
      bestRating: 5,
    },
    knowsAbout: [
      'Vehicle wraps',
      'Fleet graphics',
      'Large-format printing',
      '3M DI-NOC architectural finishes',
      'Window graphics',
      'Vehicle lettering',
    ],
  };
}

export function serviceSchema(s: { name: string; long: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    description: s.long,
    serviceType: s.name,
    provider: { '@type': 'LocalBusiness', '@id': ID, name: site.legalName },
    areaServed: 'New Jersey / New York metro',
    url: `${SITE_URL}/services#${s.slug}`,
  };
}

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function reviewsSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': ID,
    name: site.legalName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviews.aggregate.rating,
      reviewCount: reviews.aggregate.reviewCount,
      bestRating: 5,
    },
    review: reviews.reviews.map((r) => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
      author: { '@type': 'Person', name: r.author },
      datePublished: r.date,
      reviewBody: r.quote,
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
