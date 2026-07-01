import { AnimatedHeading } from './motion/AnimatedHeading';

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  className = '',
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** retained for API compatibility — the site is dark-first now */
  light?: boolean;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}
    >
      {eyebrow && (
        <p className="eyebrow reveal" data-reveal>
          {eyebrow}
        </p>
      )}
      <AnimatedHeading
        text={title}
        className="mt-5 font-display text-[2.5rem] leading-[0.95] text-bone sm:text-5xl lg:text-[3.75rem]"
      />
      {intro && (
        <p className="reveal mt-6 text-lg leading-relaxed text-steel" data-reveal>
          {intro}
        </p>
      )}
    </div>
  );
}
