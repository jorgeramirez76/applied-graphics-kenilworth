import Link from 'next/link';
import { Icon } from './Icon';
import type { Service } from '@/lib/data';

export function ServiceCard({ service, index }: { service: Service; index?: number }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      data-cursor
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-graphite p-7 transition-all duration-500 hover:border-brand/50 hover:bg-slate"
    >
      {/* hover glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/0 blur-3xl transition-all duration-500 group-hover:bg-brand/25" />

      <div className="flex items-center justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-brand ring-1 ring-white/10 transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
          <Icon name={service.icon} className="h-6 w-6" />
        </span>
        {index != null && (
          <span className="font-mono text-xs text-ash">/ {String(index + 1).padStart(2, '0')}</span>
        )}
      </div>

      <h3 className="relative mt-6 font-display text-2xl uppercase leading-tight text-bone">
        {service.name}
      </h3>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-steel">{service.short}</p>

      <span className="relative mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider2 text-brand">
        Learn more
        <Icon name="ArrowRight" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
      </span>
    </Link>
  );
}
