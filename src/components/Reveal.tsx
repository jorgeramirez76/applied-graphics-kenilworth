import type { ReactNode } from 'react';

/**
 * Reveal wrapper — visible by default (CSS). The global SmoothScroll layer
 * animates `[data-reveal]` elements in on scroll. If JS/animation is
 * unavailable the content simply renders in place. Never gates visibility.
 */
export function Reveal({
  children,
  className = '',
}: {
  children: ReactNode;
  /** retained for API compatibility (stagger is handled globally) */
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <div data-reveal className={`reveal ${className}`}>
      {children}
    </div>
  );
}
