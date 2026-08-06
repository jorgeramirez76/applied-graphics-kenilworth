'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { asset } from '@/lib/asset';
import { site, telHref } from '@/lib/data';
import { Icon } from './Icon';
import { Magnetic } from './motion/Magnetic';

const FPS = 18;

/**
 * The hero IS the wrap install. A blank van takes on the full Applied Graphics
 * livery as you scroll down and peels back to white as you scroll up.
 *
 * The plate holds exactly three children — blank poster, wrapped poster,
 * video — and nothing else, ever. "Not blocked by anything" is a structural
 * guarantee (the type is a flex SIBLING of the plate), not a measured
 * clearance. If a child of .cine-plate is not one of those three, it is a bug.
 *
 * Layer model: posters crossfade via --p as the floor (works pre-video, on
 * save-data, in Low Power Mode); the all-keyframe video takes over the moment
 * its first seek completes.
 */
export function WrapHero() {
  const track = useRef<HTMLElement>(null);
  const plate = useRef<HTMLDivElement>(null);
  const wrappedImg = useRef<HTMLImageElement>(null);
  const video = useRef<HTMLVideoElement | null>(null);
  const videoReady = useRef(false);
  const fetchStarted = useRef(false);
  const seekPending = useRef(false);
  const seekTarget = useRef(0);
  const tease = useRef<gsap.core.Tween | null>(null);

  // Header blur costs a full-viewport backdrop-filter per scrubbed frame and
  // blurs nothing over flat ink — globals.css disables it while this is set.
  useEffect(() => {
    document.documentElement.dataset.hero = '';
    return () => {
      delete document.documentElement.dataset.hero;
    };
  }, []);

  useGSAP(
    () => {
      const root = track.current!;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduce) {
        // Finished product, no runway: wrapped poster at full opacity, rail at
        // 100%, stat visible. No video element, no MP4 fetch, no pin.
        root.style.setProperty('--p', '1');
        root.dataset.stage = '2';
        return;
      }

      const coarse = window.matchMedia('(pointer: coarse)').matches;
      root.classList.add('is-scrub');
      if (coarse) root.classList.add('is-short');

      const killTease = () => {
        if (tease.current) {
          tease.current.kill();
          tease.current = null;
        }
      };

      const lastSafe = () => {
        const v = video.current!;
        // Seeking to exactly `duration` fires `ended` and the browser then
        // reports currentTime 0 — snapping the van back to bare white at the
        // exact moment it should be fully wrapped. Keep this clamp.
        return v.duration - 2 / FPS;
      };

      // iOS throttles seeks and silently drops per-rAF currentTime writes;
      // coalesce so there is never more than one in flight.
      const commitSeek = () => {
        const v = video.current!;
        seekPending.current = false;
        if (Math.abs(v.currentTime - seekTarget.current) >= (1 / FPS) * 0.5) {
          v.currentTime = seekTarget.current;
        }
      };
      const seek = (t: number) => {
        const v = video.current;
        if (!v) return;
        seekTarget.current = Math.min(t, lastSafe());
        if (v.seeking) {
          seekPending.current = true;
          return;
        }
        commitSeek();
      };

      const paint = (p: number) => {
        killTease();
        root.style.setProperty('--p', p.toFixed(4));
        // Wrap completes at 88%; the last ~12% of the track dwells on the
        // finished van — the beat where the eye reads the vinyl's own
        // APPLIEDGRAFX.COM and 908-620-9600.
        const t = Math.min(p / 0.88, 1);
        if (video.current?.isConnected && videoReady.current) {
          seek(t * video.current.duration);
        } else if (wrappedImg.current) {
          wrappedImg.current.style.opacity = String(t);
        }
        const s = p < 0.12 ? '0' : p < 0.86 ? '1' : '2';
        if (root.dataset.stage !== s) root.dataset.stage = s;
      };

      const st = ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        // Lenis already eases at 1.15s; heavier damping here means a thumb
        // flick finishes seeking after the finger has carried the visitor
        // past the section.
        scrub: coarse ? 0.2 : 0.4,
        invalidateOnRefresh: true,
        onUpdate: (self) => paint(self.progress),
        onRefresh: (self) => paint(self.progress),
      });

      // ----- The tease: the effect plays with zero user input -----
      // A poster crossfade, NOT a video seek — zero seeks, works before the
      // MP4 arrives, works on 2G and in Low Power Mode. First real scroll
      // kills it via paint().
      if (window.scrollY < 4) {
        const proxy = { v: 0 };
        tease.current = gsap.to(proxy, {
          v: 0.62,
          duration: 1.25,
          delay: 0.65,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: 1,
          onUpdate: () => {
            root.style.setProperty('--p', proxy.v.toFixed(4));
            if (wrappedImg.current) wrappedImg.current.style.opacity = String(proxy.v);
          },
        });
      }

      paint(st.progress); // frame-0 state exists before any scroll event

      // ----- Video: blob-sourced, imperative, opt-in -----
      const nav = navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      };
      if (nav.connection?.saveData || /(^|-)2g/.test(nav.connection?.effectiveType || '')) {
        return () => st.kill();
      }

      let objectUrl: string | null = null;

      const mountVideo = (url: string) => {
        // React's JSX `muted` does not reliably land before first load —
        // create the element imperatively so every attribute is set first.
        const v = document.createElement('video');
        v.muted = true;
        v.defaultMuted = true;
        v.playsInline = true;
        v.setAttribute('playsinline', '');
        v.setAttribute('webkit-playsinline', '');
        v.preload = 'auto';
        v.disablePictureInPicture = true;
        v.setAttribute('aria-hidden', 'true');
        v.className = 'cine-media cine-video';
        plate.current!.appendChild(v);

        v.addEventListener(
          'loadeddata',
          async () => {
            try {
              // iOS refuses to paint seeks on a never-played video; Low Power
              // Mode rejects this play(), which the watchdog below handles.
              await v.play();
              v.pause();
            } catch {
              /* watchdog decides */
            }
            v.currentTime = 0.0001;
          },
          { once: true },
        );
        v.addEventListener(
          'seeked',
          () => {
            videoReady.current = true;
            video.current = v;
            if (wrappedImg.current) wrappedImg.current.style.opacity = '0';
            v.dataset.ready = '1';
            paint(st.progress);
          },
          { once: true },
        );
        v.addEventListener('seeked', () => {
          if (seekPending.current) commitSeek();
        });
        // Low Power Mode can leave a video that will never paint on seek —
        // drop it and let the two-poster crossfade keep the effect alive.
        window.setTimeout(() => {
          if (!videoReady.current) {
            v.remove();
            video.current = null;
          }
        }, 2000);

        v.src = url;
        v.load();
      };

      const kickFetch = () => {
        if (fetchStarted.current) return;
        fetchStarted.current = true;
        // Aspect, not width: a 768x1024 tablet has the same portrait fitting
        // problem as a phone — and this matches the CSS clamp exactly.
        const portrait = window.matchMedia('(max-aspect-ratio: 5/4)').matches;
        const url = asset(portrait ? '/video/wrap-install-sm.mp4' : '/video/wrap-install.mp4');
        // Blob source: every scrub seek becomes a memory seek (no Range
        // round-trips mid-drag), and iOS's metadata-only preload starvation
        // never applies. Never <link rel="preload" as="video">.
        fetch(url, { priority: 'low' } as RequestInit)
          .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
          .then((b) => {
            objectUrl = URL.createObjectURL(b);
            mountVideo(objectUrl);
          })
          .catch(() => {
            /* posters keep the effect alive */
          });
      };

      // After load + a belt timeout + first input — never in the critical chain.
      const onLoad = () => kickFetch();
      if (document.readyState === 'complete') queueMicrotask(kickFetch);
      else window.addEventListener('load', onLoad, { once: true });
      const belt = window.setTimeout(kickFetch, 2500);
      const inputEvts: (keyof WindowEventMap)[] = ['wheel', 'touchstart', 'pointerdown'];
      inputEvts.forEach((e) =>
        window.addEventListener(e, kickFetch, { once: true, passive: true }),
      );

      return () => {
        st.kill();
        killTease();
        window.clearTimeout(belt);
        window.removeEventListener('load', onLoad);
        inputEvts.forEach((e) => window.removeEventListener(e, kickFetch));
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      };
    },
    { scope: track },
  );

  const blank = asset('/images/wrap-hero-blank.webp');
  const blankSm = asset('/images/wrap-hero-blank-sm.webp');
  const wrapped = asset('/images/wrap-hero-wrapped.webp');
  const wrappedSm = asset('/images/wrap-hero-wrapped-sm.webp');

  return (
    <section
      ref={track}
      id="wrap-hero"
      className="cine-track bg-ink"
      aria-label="Applied Graphics vehicle wrap install"
      style={{ ['--p' as string]: '0' }}
      data-stage="0"
    >
      {/* No manual <link rel=preload>: Next 16 auto-hoists preloads for both
          plate <img>s (verified in out/index.html), and hand-written ones just
          duplicated them. */}
      <div className="cine-stage">
        {/* 1 — TITLE. A flex sibling of the plate: it can never overlap the van. */}
        <div className="cine-title container">
          <p className="eyebrow">3M-Certified · Kenilworth, NJ · Est. {site.founded}</p>
          <h1 className="mt-4 font-display text-[clamp(2rem,8.6vw,3.6rem)] uppercase leading-[0.92] tracking-[-0.015em] text-bone">
            The Wrap With A{' '}
            <span className="text-brand">
              Warranty<span className="text-bone">.</span>
            </span>
          </h1>
          <p className="cine-sub mt-3 max-w-[46ch] text-[13px] leading-snug text-steel sm:text-sm">
            {site.subTagline}
          </p>
        </div>

        {/* 2 — PLATE. Exactly three children, forever. */}
        <div className="cine-platewrap">
          <div ref={plate} className="cine-plate">
            {/* Hand-written img, not next/image: the custom loader ignores
                width, so next/image would emit a srcset of identical URLs. */}
            <img
              className="cine-media"
              width={1440}
              height={810}
              src={blank}
              srcSet={`${blankSm} 854w, ${blank} 1440w`}
              sizes="100vw"
              fetchPriority="high"
              decoding="sync"
              alt="A plain white cargo van waiting in the Applied Graphics install bay in Kenilworth, New Jersey."
            />
            <img
              ref={wrappedImg}
              className="cine-media cine-wrapped"
              width={1440}
              height={810}
              src={wrapped}
              srcSet={`${wrappedSm} 854w, ${wrapped} 1440w`}
              sizes="100vw"
              decoding="async"
              alt="The same van finished in a full red and black Applied Graphics vinyl wrap."
            />
            {/* <video> injected imperatively at z-20 once its blob arrives */}
          </div>
        </div>

        {/* 3 — RAIL */}
        <div className="cine-rail container">
          <div className="cine-progress" aria-hidden />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="grid w-full grid-cols-2 items-center gap-2.5 sm:flex sm:w-auto sm:gap-3">
              <Magnetic>
                <Link href="/contact" data-cursor className="btn-primary w-full whitespace-nowrap !px-5 sm:w-auto sm:!px-7">
                  <Icon name="Send" className="h-4 w-4 shrink-0" /> {site.ctas.quote}
                </Link>
              </Magnetic>
              <a href={telHref} data-cursor className="btn-outline w-full whitespace-nowrap !px-5 sm:w-auto sm:!px-7">
                <Icon name="Phone" className="h-4 w-4 shrink-0" />
                <span className="sm:hidden">Call</span>
                <span className="hidden sm:inline">{site.phoneDisplay}</span>
              </a>
            </div>
            <div className="cine-swap min-h-6">
              <p className="cine-hint spec text-steel/80" aria-hidden>
                Scroll to wrap · scroll back to peel ↓
              </p>
              <p className="cine-stat spec text-fog">
                <span className="text-brand">{site.industryStat.value}</span>{' '}
                {site.industryStat.label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
