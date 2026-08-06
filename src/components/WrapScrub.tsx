'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { ScrollTrigger, useGSAP } from '@/lib/gsap';
import { asset } from '@/lib/asset';

const STAGES = [
  {
    n: '01',
    label: 'Blank',
    head: 'Right now it’s a white box.',
    sub: 'It drives the same route every day and nobody remembers it.',
  },
  {
    n: '02',
    label: 'Install',
    head: 'We design it, print it, install it.',
    sub: '3M cast vinyl, laid down by 3M-certified installers in our own heated bay.',
  },
  {
    n: '03',
    label: 'Working',
    head: 'Now it sells while you drive.',
    sub: '600+ visual impressions per mile driven — on every mile you were already driving.',
  },
];

/**
 * The signature scroll moment: a blank work van takes on its wrap as you scroll
 * down, and loses it again as you scroll up. Scroll position is mapped straight
 * onto video.currentTime, so it is inherently bidirectional.
 *
 * The MP4 is encoded all-keyframe (`-g 1 -bf 0`) — without that, seeking lands
 * on the nearest keyframe and the scrub visibly snaps.
 */
export function WrapScrub() {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        // No pin, no scrub — just show the finished wrap and the last stage.
        setReduced(true);
        return;
      }

      // Pick the encode by viewport so phones never pull the desktop file, and
      // only start fetching once the section is roughly a screen away.
      const pick = () =>
        window.innerWidth < 900 ? '/video/wrap-install-sm.mp4' : '/video/wrap-install.mp4';

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setSrc(asset(pick()));
            io.disconnect();
          }
        },
        { rootMargin: '120% 0px' },
      );
      io.observe(root.current!);
      return () => io.disconnect();
    },
    { scope: root },
  );

  // Wire the scrub only once the video can actually be seeked.
  useGSAP(
    () => {
      const video = videoRef.current;
      if (!ready || !video || !Number.isFinite(video.duration)) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Seeking to exactly `duration` fires `ended`, and the browser then reports
      // currentTime as 0 — which snaps the van back to bare white at the moment
      // it should be fully wrapped. Stop a couple of frames short instead.
      const last = video.duration - 2 / 24;

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom bottom',
        // scrub eases self.progress, so writing currentTime from it is already
        // damped — no separate tween needed.
        scrub: 0.55,
        onUpdate: (self) => {
          const p = self.progress;
          video.currentTime = Math.min(p * video.duration, last);
          root.current!.style.setProperty('--p', p.toFixed(4));
          const pct = root.current!.querySelector<HTMLElement>('.wrap-pct');
          if (pct) pct.textContent = String(Math.round(p * 100));
          // Three copy stages, each peaking at the middle of its own third.
          // The outer two hold full opacity past their midpoints so the copy
          // isn't half-faded at the very start and end of the section.
          for (let i = 0; i < STAGES.length; i++) {
            const mid = (i + 0.5) / STAGES.length;
            const held =
              (i === 0 && p < mid) || (i === STAGES.length - 1 && p > mid);
            const d = held ? 0 : Math.abs(p - mid) / (0.62 / STAGES.length);
            const el = root.current!.querySelector<HTMLElement>(`[data-stage="${i}"]`);
            if (el) {
              const o = Math.max(0, 1 - d);
              el.style.opacity = String(o);
              el.style.transform = `translate3d(0,${(1 - o) * 18}px,0)`;
            }
          }
        },
      });

      ScrollTrigger.refresh();
      return () => {
        st.kill();
      };
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section
      ref={root}
      aria-label="How a vehicle wrap goes on"
      className={`relative bg-ink ${reduced ? '' : 'wrap-track'}`}
      style={{ ['--p' as string]: reduced ? '1' : '0' }}
    >
      <div
        // Phones read the van above the copy (bottom-anchored); wide screens put
        // the copy beside it. Side-by-side on a 390px screen leaves no room for
        // the van at all.
        className={`flex items-end overflow-hidden pb-24 lg:items-center lg:pb-0 ${
          reduced ? 'relative py-28' : 'wrap-stage sticky top-0'
        }`}
      >
        {/* Poster underneath — what reduced-motion, no-JS and pre-load all see.
            Stays put until the video is actually seekable, so there is never a
            blank frame. */}
        <Image
          src={reduced ? '/images/wrap-demo-van-wrapped.webp' : '/images/wrap-demo-van-blank.webp'}
          alt={
            reduced
              ? 'A cargo van finished in a full printed vinyl wrap in the install bay.'
              : 'A plain white cargo van waiting in the install bay.'
          }
          fill
          sizes="100vw"
          className={`object-cover transition-opacity duration-500 ${ready ? 'opacity-0' : 'opacity-100'}`}
        />

        {src && (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            ref={videoRef}
            src={src}
            muted
            playsInline
            preload="auto"
            // A never-played video on iOS may not paint on seek; priming it with
            // a play/pause pair as soon as it can play fixes that.
            onCanPlay={(e) => {
              const v = e.currentTarget;
              v.play()
                .then(() => v.pause())
                .catch(() => {});
            }}
            onLoadedMetadata={() => setReady(true)}
            // Pushed right of centre so the van clears the copy column.
            className="absolute inset-0 h-full w-full object-cover object-center lg:object-[74%_center]"
            aria-hidden
          />
        )}

        {/* Copy scrim. The van carries its own dense lettering, so this has to
            be genuinely opaque on the left — a light gradient leaves the
            headline sitting unreadable on top of the wrap's own type. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink from-25% via-ink/85 to-ink/15 lg:bg-gradient-to-r lg:from-ink lg:from-0% lg:via-ink/75 lg:to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[62%] bg-gradient-to-r from-ink from-45% to-transparent lg:block" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

        <div className="container relative">
          <div className="max-w-xl lg:max-w-lg">
          <p className="eyebrow">The install</p>

          <div className="relative mt-5 h-[17rem] sm:h-[16rem] lg:h-[19rem]">
            {STAGES.map((s, i) => (
              <div
                key={s.n}
                data-stage={i}
                className="absolute inset-0"
                style={{ opacity: i === (reduced ? STAGES.length - 1 : 0) ? 1 : 0 }}
              >
                <p className="spec text-brand">
                  {s.n} — {s.label}
                </p>
                <h2 className="mt-3 max-w-[16ch] font-display text-4xl text-bone [text-wrap:balance] sm:text-5xl lg:text-6xl">
                  {s.head}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-steel">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Install progress rail — sits below a fixed-height stage stack, so
              that height has to clear the tallest stage (3 headline lines). */}
          <div className="mt-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/15">
              <div
                className="h-px bg-brand"
                style={{ width: 'calc(var(--p) * 100%)', boxShadow: '0 0 12px rgba(232,32,46,.8)' }}
              />
            </div>
            <span className="spec tabular-nums text-fog/70">
              <span className="wrap-pct" /> %
            </span>
          </div>

          <p className="spec mt-8 inline-flex items-center gap-2 text-steel/70">
            Scroll to wrap · scroll back to peel
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </p>
          </div>
        </div>
      </div>
    </section>
  );
}
