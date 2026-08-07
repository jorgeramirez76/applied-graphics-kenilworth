// Commercial long-tail landing pages.
//
// These target the queries the competitor sweep found nobody in Union County has
// published against (box truck lettering, fleet graphics, sprinter van wraps,
// DI-NOC), and where Applied Graphics has genuinely differentiated substance —
// 3M certification, a 6,000 sq ft indoor bay, and 53-foot vehicle capacity.
//
// Every factual claim here traces to research/VERIFIED-FACTS.md.

export type LongTailSection = {
  heading: string;
  body: string;
  table?: { head: string[]; rows: string[][] };
};

export type LongTailPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  /** 40-60 words, self-contained — written to be quoted alone by an AI answer engine. */
  tldr: string;
  sections: LongTailSection[];
  faqs: { q: string; a: string }[];
  /** Which /services entry this page maps to, for internal linking. */
  serviceSlug: string;
};

import longTailData from '@data/longtail.json';

export const longTailPages = longTailData as LongTailPage[];

export const getLongTailPage = (slug: string) => longTailPages.find((p) => p.slug === slug);
