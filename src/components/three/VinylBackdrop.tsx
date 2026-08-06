'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// The three.js chunk is ~290KB gzip — several times the rest of the site's JS.
// It must never be in the initial bundle, and `ssr: false` can only be set from
// a client component, hence this wrapper.
const VinylField = dynamic(() => import('./VinylField'), { ssr: false });

/**
 * Decides whether the WebGL backdrop is worth rendering at all, then hands off.
 * Everything underneath it is a CSS gradient that already looks finished, so
 * bailing out is never a visible failure.
 */
export function VinylBackdrop({ intensity = 1 }: { intensity?: number }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Don't hand a phone on a metered connection a WebGL context it didn't ask for.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;

    // Probe for a real WebGL2 context before mounting — some devices advertise
    // support and then fail to create one.
    try {
      const c = document.createElement('canvas');
      if (!c.getContext('webgl2')) return;
    } catch {
      return;
    }

    // Wait for the page to settle so the shader never competes with LCP.
    const id = window.setTimeout(() => setShow(true), 400);
    return () => window.clearTimeout(id);
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 animate-[fadein_1.2s_ease_forwards] opacity-0"
    >
      <VinylField intensity={intensity} />
    </div>
  );
}
