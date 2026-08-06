// Schema.org JSON-LD builders (LocalBusiness / Service / FAQPage / Breadcrumb / Review).
import { site, fullAddress, reviews } from './data';
import { SITE_URL } from './seo';
import { faqs } from './faqs';

const ID = `${SITE_URL}/#business`;
const SITE_ID = `${SITE_URL}/#website`;
const OWNER_ID = `${SITE_URL}/#owner`;

// Verified Google Business Profile identifiers. The Maps URL is the strongest
// single sameAs signal for disambiguating this Applied Graphics from the
// Amesbury MA and Sanford NC companies of the same name.
const GOOGLE_CID = '9574086148748279180';
export const GOOGLE_MAPS_URL = `https://www.google.com/maps?cid=${GOOGLE_CID}`;
export const GOOGLE_REVIEW_URL =
  'https://search.google.com/local/writereview?placeid=ChIJmViVYu-tw4kRjP0gaaD83YQ';

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: `${SITE_URL}/`,
    name: site.legalName,
    publisher: { '@id': ID },
    inLanguage: 'en-US',
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': OWNER_ID,
    name: site.ownerName,
    jobTitle: site.ownerTitle,
    worksFor: { '@id': ID },
  };
}

export function localBusinessSchema() {
  const sameAs = [
    site.officialWebsite,
    site.social.facebook,
    site.social.instagram,
    site.social.linkedin,
    site.trust.bbbProfile,
    GOOGLE_MAPS_URL,
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
    // Disambiguation: there are unrelated "Applied Graphics" companies in
    // Amesbury MA and Sanford NC. Pinning the legal name, the county and the
    // Google CID is what keeps an answer engine from merging the entities.
    legalName: 'Applied Graphics Co., Inc.',
    isicV4: '1811',
    founder: { '@id': OWNER_ID },
    employee: { '@id': OWNER_ID },
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
      'Box truck lettering',
      'Sprinter van wraps',
      'Large-format printing',
      '3M DI-NOC architectural finishes',
      'Window graphics and perforated window film',
      'Vehicle lettering',
      'Wall murals',
      'Storefront signage',
    ],
    hasCredential: site.certifications.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: c,
    })),
    // Capabilities an answer engine can quote directly when asked "can they
    // handle a box truck / a 53-foot trailer".
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Facility size', value: '6,000 sq ft indoor, heated and cooled' },
      { '@type': 'PropertyValue', name: 'Maximum vehicle height', value: '14 feet' },
      { '@type': 'PropertyValue', name: 'Maximum vehicle length', value: '53 feet' },
      { '@type': 'PropertyValue', name: 'Maximum print width', value: '60 inches' },
      { '@type': 'PropertyValue', name: 'Maximum print length', value: '150 feet' },
      { '@type': 'PropertyValue', name: 'In business since', value: '1978' },
    ],
  };
}

/**
 * The hero wrap install as a VideoObject. Answer engines and Google Video both
 * surface these, and it is the one asset on the site no competitor has.
 */
export function heroVideoSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'A blank cargo van being wrapped in Applied Graphics livery',
    description:
      'A scroll-controlled render showing a plain white high-roof cargo van taking on a full printed vinyl wrap, as installed by Applied Graphics Inc. of Kenilworth, New Jersey.',
    thumbnailUrl: [`${SITE_URL}/images/wrap-hero-wrapped.webp`],
    contentUrl: `${SITE_URL}/video/wrap-install.mp4`,
    encodingFormat: 'video/mp4',
    duration: 'PT4S',
    isFamilyFriendly: true,
    publisher: { '@id': ID },
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
