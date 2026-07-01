'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/lib/data';

export function PortfolioGallery({
  projects,
  categories,
}: {
  projects: Project[];
  categories: string[];
}) {
  const [active, setActive] = useState<string>('All');
  const filters = ['All', ...categories];
  const shown = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Filter projects">
        {filters.map((f) => {
          const isActive = active === f;
          const count = f === 'All' ? projects.length : projects.filter((p) => p.category === f).length;
          return (
            <button
              key={f}
              type="button"
              role="tab"
              data-cursor
              aria-selected={isActive}
              onClick={() => setActive(f)}
              className={`rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-wider2 transition-colors ${
                isActive
                  ? 'bg-brand text-white'
                  : 'border border-white/10 bg-graphite text-fog/60 hover:border-white/30 hover:text-bone'
              }`}
            >
              {f} <span className={isActive ? 'text-white/70' : 'text-ash'}>{count}</span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {shown.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </motion.div>

      {shown.length === 0 && <p className="mt-12 text-center text-steel">No projects in this category yet.</p>}
    </div>
  );
}
