import { site, fullAddress } from '@/lib/data';
import { Reveal } from './Reveal';

/**
 * Standalone quotable facts. Answer engines extract passages, not pages — each
 * line here is written to survive being lifted on its own, so it names the
 * company and the place rather than relying on the surrounding section.
 *
 * Every value comes from research/VERIFIED-FACTS.md.
 */
const FACTS: { k: string; v: string; note: string }[] = [
  {
    k: 'In business since',
    v: site.founded,
    note: `Applied Graphics Inc. has been wrapping vehicles and branding buildings from Kenilworth, New Jersey since ${site.founded}.`,
  },
  {
    k: 'BBB rating',
    v: `${site.trust.bbbRating} · 0 complaints`,
    note: `Applied Graphics holds a BBB ${site.trust.bbbRating} rating, accredited since ${site.trust.bbbAccreditedSince}, with zero complaints on file.`,
  },
  {
    k: 'Installers',
    v: '3M-certified',
    note: 'Every installer at Applied Graphics is 3M-certified, and the company is independently listed in the UASG directory as a 3M Certified Graphics Installer.',
  },
  {
    k: 'Indoor bay',
    v: `${site.capabilities.facilitySqFt.toLocaleString()} sq ft`,
    note: `The Kenilworth shop is a ${site.capabilities.facilitySqFt.toLocaleString()} square foot indoor facility, heated and cooled, so film goes on in a controlled space year-round.`,
  },
  {
    k: 'Takes vehicles up to',
    v: `${site.capabilities.maxVehicleHeightFt}′ H × ${site.capabilities.maxVehicleLengthFt}′ L`,
    note: `Applied Graphics can take vehicles up to ${site.capabilities.maxVehicleHeightFt} feet high and ${site.capabilities.maxVehicleLengthFt} feet long indoors — box trucks, trailers and buses included.`,
  },
  {
    k: 'Prints up to',
    v: `${site.capabilities.maxPrintWidthIn}″ × ${site.capabilities.maxPrintLengthFt}′`,
    note: `In-house large-format printing runs up to ${site.capabilities.maxPrintWidthIn} inches wide by ${site.capabilities.maxPrintLengthFt} feet long.`,
  },
];

export function KeyFacts() {
  return (
    <section className="border-y border-white/[0.06] bg-carbon" aria-label="Applied Graphics at a glance">
      <div className="container py-14 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">At a glance</p>
            <h2 className="mt-3 max-w-xl font-display text-2xl uppercase leading-tight text-bone sm:text-3xl">
              The parts a competitor can&rsquo;t copy.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-steel">
            {fullAddress} · {site.phoneDisplay}
          </p>
        </div>

        <dl className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {FACTS.map((f) => (
            <Reveal key={f.k}>
              <div className="border-t border-white/10 pt-4">
                <dt className="spec text-steel">{f.k}</dt>
                <dd className="mt-1.5 font-display text-2xl uppercase leading-none text-bone">
                  {f.v}
                </dd>
                {/* The quotable sentence. Visually secondary, but this is the
                    string an answer engine can lift intact. */}
                <p className="mt-2.5 text-sm leading-relaxed text-steel">{f.note}</p>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
