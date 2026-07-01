import { faqs } from '@/lib/faqs';
import { Icon } from './Icon';

export function FaqAccordion() {
  return (
    <div className="border-t border-white/10">
      {faqs.map((f, i) => (
        <details key={f.q} className="group border-b border-white/10 py-6" data-reveal>
          <summary data-cursor className="flex cursor-pointer list-none items-start justify-between gap-6">
            <span className="flex items-start gap-4">
              <span className="font-mono text-xs text-brand">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-display text-xl uppercase leading-tight text-bone transition-colors group-hover:text-brand">
                {f.q}
              </span>
            </span>
            <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 text-brand transition-transform duration-300 group-open:rotate-45">
              <Icon name="ChevronRight" className="h-4 w-4 -rotate-45 group-open:rotate-0" />
            </span>
          </summary>
          <p className="mt-4 max-w-prose pl-9 text-[15px] leading-relaxed text-steel">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
