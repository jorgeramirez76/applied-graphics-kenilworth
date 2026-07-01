// Honest image-rights marker shown on every portfolio photo.
export function PermissionBadge({ status }: { status: string }) {
  if (status === 'provided') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-wider text-emerald-300 backdrop-blur ring-1 ring-emerald-400/25">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        AG project
      </span>
    );
  }
  if (status === 'own-brand-asset') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-wider text-fog/80 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        AG brand asset
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-wider text-amber-300 backdrop-blur ring-1 ring-amber-400/30">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      Photo pending approval
    </span>
  );
}
