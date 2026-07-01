import { Icon } from './Icon';

type Review = {
  quote: string;
  author: string;
  context?: string;
  date?: string;
};

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-graphite p-8">
      <span className="pointer-events-none absolute -right-2 -top-6 font-display text-[8rem] leading-none text-brand/10">
        &rdquo;
      </span>
      <div className="flex items-center gap-1 text-brand" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon key={i} name="Star" className="h-4 w-4 fill-current" strokeWidth={0} />
        ))}
      </div>
      <blockquote className="relative mt-5 flex-1 text-[15px] leading-relaxed text-fog/85">
        {review.quote}
      </blockquote>
      <figcaption className="mt-6 border-t border-white/10 pt-5">
        <p className="font-mono text-xs uppercase tracking-wider2 text-bone">{review.author}</p>
        {review.context && <p className="mt-1 text-xs text-ash">{review.context}</p>}
      </figcaption>
    </figure>
  );
}
