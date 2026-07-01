import { brands } from '@/lib/data';

// Plain <img> isn't auto-prefixed by Next's basePath — do it manually so
// logos resolve when served from a GitHub Pages subpath.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function BrandStrip() {
  return (
    <section className="border-b border-white/10 bg-carbon">
      <div className="container py-12">
        <p className="eyebrow reveal text-center" data-reveal>
          {brands.intro}
        </p>
        <div className="mt-9 grid grid-cols-2 items-center gap-x-8 gap-y-9 sm:grid-cols-3 lg:grid-cols-6">
          {brands.brands.map((b) => (
            <div key={b.name} data-reveal className="group reveal flex flex-col items-center text-center">
              <div className="flex h-11 items-center justify-center gap-2.5">
                {b.logo ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${BASE}/logos/${b.logo}`}
                      alt={`${b.name} logo`}
                      className="h-9 w-9 shrink-0 opacity-70 brightness-0 invert transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <span className="font-display text-lg uppercase leading-none text-bone/75 transition-colors duration-300 group-hover:text-bone">
                      {b.name}
                    </span>
                  </>
                ) : (
                  <span className="font-display text-xl uppercase leading-none text-bone/70 transition-colors duration-300 group-hover:text-bone">
                    {b.name}
                  </span>
                )}
              </div>
              <p className="spec mt-2.5 text-ash">{b.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
