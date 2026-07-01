import type { Metadata } from 'next';
import { Archivo, Hanken_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { Cursor } from '@/components/motion/Cursor';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { MobileCTABar } from '@/components/MobileCTABar';
import { localBusinessSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/seo';
import { site } from '@/lib/data';

const display = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-display',
  display: 'swap',
});
const body = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Applied Graphics Inc. | Vehicle Wraps & Signage in Kenilworth, NJ',
    template: '%s | Applied Graphics Inc.',
  },
  description: site.shortDescription,
  keywords: [
    'vehicle wraps Kenilworth NJ',
    'fleet graphics New Jersey',
    'car wraps Union County',
    'truck lettering NJ',
    '3M certified vehicle wraps',
    'large format printing Kenilworth',
    'food truck wraps NJ',
    'architectural finishes 3M DI-NOC',
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  applicationName: site.legalName,
  formatDetection: { telephone: true, address: true, email: true },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <JsonLd data={localBusinessSchema()} />
        <ScrollProgress />
        <Cursor />
        <MobileCTABar />
        <SmoothScroll>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
