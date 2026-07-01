'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Icon } from './Icon';
import { telHref } from '@/lib/data';

/**
 * Sticky mobile call-to-action bar. Slides up once the user scrolls past the
 * hero and hides near the footer (so it doesn't double up with the footer CTA).
 * Mobile/tablet only — desktop has the always-visible header CTA.
 */
export function MobileCTABar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 180;
      setVisible(y > 480 && !nearBottom);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[72] transition-transform duration-300 ease-out lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div
        className="border-t border-white/10 bg-ink/95 backdrop-blur-xl"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="grid grid-cols-2 gap-2.5 p-3">
          <a
            href={telHref}
            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/25 bg-white/[0.05] px-3 py-3.5 font-mono text-[13px] font-medium uppercase tracking-wide text-bone transition-colors active:bg-white/15"
          >
            <Icon name="Phone" className="h-4 w-4 text-brand" /> Call
          </a>
          <Link href="/contact" className="btn-primary !gap-1.5 whitespace-nowrap !px-3 !py-3.5 !text-[12px] !tracking-wide">
            <Icon name="Send" className="h-4 w-4 shrink-0" /> Get a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
