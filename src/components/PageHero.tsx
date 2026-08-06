import Link from 'next/link';
import { AnimatedHeading } from './motion/AnimatedHeading';
import { VinylBackdrop } from './three/VinylBackdrop';

export function PageHero({
  eyebrow,
  title,
  intro,
  crumb,
  index,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  crumb: string;
  index?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pt-32 lg:pt-44">
      <div className="absolute -left-32 -top-24 h-[28rem] w-[28rem] animate-drift rounded-full bg-brand/15 blur-[130px]" />
      {/* WebGL "liquid vinyl" — moved here when the homepage hero became the
          real van. Self-gating (WebGL2 probe, save-data, reduced motion). */}
      <VinylBackdrop intensity={0.7} />
      <div className="absolute inset-0 bg-ink/40" />
      <div className="absolute inset-0 bg-grid-faint bg-[size:48px_48px] opacity-40" />
      {index && (
        <span className="pointer-events-none absolute -right-4 top-20 select-none font-display text-[26vw] leading-none text-white/[0.025] lg:text-[18vw]">
          {index}
        </span>
      )}

      <div className="container relative pb-16 sm:pb-24">
        <nav aria-label="Breadcrumb" className="spec text-fog/50">
          <Link href="/" className="link-sweep hover:text-bone">
            Home
          </Link>
          <span className="px-2 text-brand">/</span>
          <span className="text-fog/80">{crumb}</span>
        </nav>
        <p className="eyebrow reveal mt-8 inline-block" data-reveal>
          {eyebrow}
        </p>
        <AnimatedHeading
          text={title}
          className="mt-4 max-w-4xl font-display text-[2.75rem] uppercase leading-[0.92] text-bone sm:text-6xl lg:text-7xl"
        />
        {intro && (
          <p className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-steel" data-reveal>
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
