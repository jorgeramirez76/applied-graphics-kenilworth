'use client';
import { useEffect, useRef } from 'react';

/** Augmenting trailing cursor (ring + dot). Desktop / fine-pointer only. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const d = dot.current!;
    const r = ring.current!;
    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2,
      rx = mx,
      ry = my;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      d.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    };
    let raf = requestAnimationFrame(function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      r.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    });
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('a,button,[data-cursor],input,textarea,select');
      if (t) {
        r.style.width = '64px';
        r.style.height = '64px';
        r.style.borderColor = 'rgba(232,32,46,0.85)';
      }
    };
    const out = () => {
      r.style.width = '38px';
      r.style.height = '38px';
      r.style.borderColor = 'rgba(244,241,234,0.5)';
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring hidden lg:block" aria-hidden />
      <div ref={dot} className="cursor-dot hidden lg:block" aria-hidden />
    </>
  );
}
