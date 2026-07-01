'use client';
import { useEffect, useRef } from 'react';

/** Thin scroll-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div
      ref={bar}
      className="fixed left-0 top-0 z-[75] h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-300"
      aria-hidden
    />
  );
}
