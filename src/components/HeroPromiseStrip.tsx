import Link from 'next/link';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import { site } from '@/lib/data';

// The three install beats that used to crossfade over the scrub, now static —
// nothing is allowed on the picture, so they live here, under it.
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

const TAGS = ['Vehicle Wraps', 'Wall Murals', 'Storefronts', 'Window Graphics', 'Architectural Finishes'];

const TRUST: [string, string][] = [
  ['ShieldCheck', '3M-Certified Installers'],
  ['Award', 'BBB A+ Rated'],
  ['Star', `${site.trust.aggregateRating} / 5 Reviews`],
];

/** Everything the visitor needs right after the hero: what we do, the three
 *  install beats, proof, and the non-money CTA. */
export function HeroPromiseStrip() {
  return (
    <section className="border-t border-white/[0.06] bg-carbon">
      <div className="container py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="max-w-prose text-base leading-relaxed text-fog">{site.shortDescription}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-fog/60"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/10 pt-6">
              {TRUST.map(([icon, label]) => (
                <span key={label} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-fog/60">
                  <Icon name={icon} className="h-4 w-4 text-brand" /> {label}
                </span>
              ))}
            </div>
            <Link href="/portfolio" data-cursor className="btn-outline mt-8">
              View Our Work <Icon name="ArrowRight" className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-3 lg:col-span-7">
            {STAGES.map((s) => (
              <Reveal key={s.n}>
                <div className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-graphite p-6">
                  <p className="spec text-brand">
                    {s.n} — {s.label}
                  </p>
                  <h2 className="mt-3 font-display text-xl uppercase leading-tight text-bone">{s.head}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-steel">{s.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
