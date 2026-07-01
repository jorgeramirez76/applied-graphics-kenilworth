import Image from 'next/image';
import { Icon } from './Icon';
import { PermissionBadge } from './PermissionBadge';
import type { Project } from '@/lib/data';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <figure
      data-cursor
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-graphite"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
          />
        ) : (
          <PlaceholderArt label={project.category} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent opacity-90" />

        {/* top row */}
        <div className="absolute inset-x-3 top-3 flex items-start justify-between">
          <span className="rounded-full bg-brand px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
            {project.category}
          </span>
          <PermissionBadge status={project.permissionStatus} />
        </div>

        {/* hover prompt */}
        <span className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-bone text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <Icon name="ArrowRight" className="h-4 w-4 -rotate-45" strokeWidth={2} />
        </span>
      </div>

      <figcaption className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-xl uppercase leading-tight text-bone">{project.title}</h3>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 font-mono text-[11px] uppercase tracking-wide text-fog/60">
          {project.client && project.clientVerified && (
            <span className="text-fog/90">{project.client}</span>
          )}
          {project.location && (
            <span className="inline-flex items-center gap-1">
              <Icon name="MapPin" className="h-3 w-3" /> {project.location}
            </span>
          )}
        </p>
      </figcaption>
    </figure>
  );
}

function PlaceholderArt({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-grid-faint bg-[size:24px_24px] bg-slate">
      <div className="text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-ink text-brand ring-1 ring-white/10">
          <Icon name="Sparkles" className="h-5 w-5" />
        </span>
        <p className="spec mt-3 px-6 text-ash">{label} · image to be supplied</p>
      </div>
    </div>
  );
}
