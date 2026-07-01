import Image from 'next/image';
import Link from 'next/link';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { Icon } from './Icon';
import { Magnetic } from './motion/Magnetic';
import { projects, type Project } from '@/lib/data';

const byId = (id: string) => projects.find((p) => p.id === id);

function Tile({ p, className = '', big = false }: { p?: Project; className?: string; big?: boolean }) {
  if (!p?.image) return null;
  return (
    <figure data-cursor className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-graphite ${className}`}>
      <Image
        src={p.image}
        alt={p.alt}
        fill
        sizes={big ? '(max-width:1024px) 100vw, 1100px' : '(max-width:640px) 100vw, 33vw'}
        className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-90" />
      <figcaption className="absolute inset-x-0 bottom-0 p-5">
        <span className="rounded-full bg-brand px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
          {p.category}
        </span>
        <h3 className={`mt-2.5 font-display uppercase leading-tight text-bone ${big ? 'text-3xl' : 'text-lg'}`}>
          {p.title}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-fog/60">
          {p.client && <span className="text-fog/90">{p.client}</span>}
          {p.location && (
            <>
              {p.client && <span className="text-ash">·</span>}
              <span className="inline-flex items-center gap-1"><Icon name="MapPin" className="h-3 w-3" /> {p.location}</span>
            </>
          )}
        </p>
      </figcaption>
    </figure>
  );
}

export function EnvironmentalSection() {
  return (
    <section className="section relative overflow-hidden bg-ink">
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-brand/10 blur-[140px]" />
      <div className="container relative">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Interior & exterior graphics"
            title="We wrap whole spaces, not just vehicles."
            intro="Wall murals, window graphics, storefronts and equipment wraps — for local studios and national brands alike. We’ve put graphics everywhere from the World Cup at MetLife Stadium to Coca-Cola, Amazon, Delta and Costa Coffee."
          />
          <Reveal>
            <Magnetic>
              <Link href="/contact" data-cursor className="btn-outline">
                Brand Your Space <Icon name="ArrowRight" className="h-4 w-4" />
              </Link>
            </Magnetic>
          </Reveal>
        </div>

        <div className="mt-14 space-y-4">
          {/* hero: the full wall mural (wide collage) */}
          <Reveal>
            <Tile p={byId('notorious-wall-mural')} className="aspect-[16/9] sm:aspect-[16/7]" big />
          </Reveal>
          {/* featured: the World Cup cooler, full width */}
          <Reveal>
            <Tile p={byId('world-cup-cooler')} className="aspect-[16/10] sm:aspect-[16/8]" big />
          </Reveal>
          {/* supporting tiles */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal>
              <Tile p={byId('costa-coffee-machines')} className="aspect-[16/10]" />
            </Reveal>
            <Reveal>
              <Tile p={byId('notorious-window-graphics')} className="aspect-[16/10]" />
            </Reveal>
          </div>
        </div>

        {/* capability row */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: 'Building2', t: 'Wall murals', d: 'Floor-to-ceiling printed murals & graphics.' },
            { icon: 'PanelsTopLeft', t: 'Window & storefront', d: 'Cut vinyl, frosted & perforated film.' },
            { icon: 'Sparkles', t: 'Equipment wraps', d: 'Machines, coolers, kiosks & fixtures.' },
            { icon: 'Layers', t: '3M DI-NOC finishes', d: 'Architectural resurfacing without a reno.' },
          ].map((c) => (
            <Reveal key={c.t}>
              <div className="flex h-full gap-3.5 rounded-2xl border border-white/[0.08] bg-graphite p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ink text-brand ring-1 ring-white/10">
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-display text-base uppercase leading-tight text-bone">{c.t}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-steel">{c.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
