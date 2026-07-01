import { CountUp } from './motion/CountUp';

type Stat = {
  value?: string;
  count?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub?: string;
};

const DEFAULT_STATS: Stat[] = [
  { count: 48, suffix: '+', label: 'Years on the road', sub: 'Established 1978' },
  { value: 'A+', label: 'BBB rating', sub: 'Accredited 2008' },
  { value: '3M', label: 'Certified installers', sub: 'MCS warranty' },
  { count: 6000, label: 'Sq ft facility', sub: 'Heated & cooled' },
];

export function StatBar({ stats = DEFAULT_STATS }: { stats?: Stat[]; variant?: string }) {
  return (
    <section className="relative border-y border-white/10 bg-carbon">
      <div className="container grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            data-reveal
            className={`reveal flex flex-col px-2 py-10 sm:px-4 sm:py-14 ${
              i !== 0 ? 'border-l border-white/10' : ''
            } ${i === 2 ? 'lg:border-l border-white/10' : ''}`}
          >
            <span className="font-display text-5xl leading-none text-bone sm:text-6xl">
              {s.count != null ? (
                <CountUp value={s.count} prefix={s.prefix} suffix={s.suffix} />
              ) : (
                <span className="text-brand">{s.value}</span>
              )}
            </span>
            <span className="spec mt-4 text-fog">{s.label}</span>
            {s.sub && <span className="mt-1 text-xs text-ash">{s.sub}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
