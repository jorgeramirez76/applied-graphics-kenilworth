import type { ReactNode } from 'react';

/**
 * Parallax wrapper. `speed` is the yPercent travelled across the viewport
 * (handled by the global SmoothScroll layer). Negative = moves up faster.
 */
export function Parallax({
  children,
  speed = -10,
  className = '',
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  return (
    <div data-parallax={String(speed)} className={className}>
      {children}
    </div>
  );
}
