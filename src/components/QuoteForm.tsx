'use client';
import { useState } from 'react';
import { Icon } from './Icon';
import { site } from '@/lib/data';

const PROJECT_TYPES = [
  'Full Vehicle Wrap',
  'Partial Wrap / Lettering',
  'Fleet Graphics',
  'Color-Change Wrap',
  'Food Truck Wrap',
  'Race / Performance Graphics',
  'Architectural Finish / 3M DI-NOC',
  'Window Graphics',
  'Banners / Signs / Magnets',
  'Other / Not sure',
];

const BUDGETS = ['Under $1,000', '$1,000 – $2,500', '$2,500 – $5,000', '$5,000 – $10,000', '$10,000+', 'Not sure yet'];

type State = 'idle' | 'submitting' | 'success' | 'error';

export function QuoteForm() {
  const [state, setState] = useState<State>('idle');
  const [fileName, setFileName] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('submitting');
    const form = e.currentTarget;
    // Demo build has no backend — acknowledge the submission client-side.
    // Wire this to email/CRM at launch (see README "Going live").
    await new Promise((r) => setTimeout(r, 700));
    setState('success');
    form.reset();
    setFileName('');
  }

  if (state === 'success') {
    return (
      <div className="rounded-2xl border border-white/10 bg-graphite p-10 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand text-white">
          <Icon name="Check" className="h-8 w-8" strokeWidth={2.5} />
        </div>
        <h3 className="mt-6 font-display text-3xl uppercase text-bone">Request received</h3>
        <p className="mx-auto mt-3 max-w-md text-steel">
          Thanks — your request is in. Please allow up to one business day for review. Need us sooner? Call{' '}
          <a href={`tel:${site.phone}`} className="font-semibold text-brand">
            {site.phoneDisplay}
          </a>
          .
        </p>
        <button onClick={() => setState('idle')} className="btn-outline mt-7">
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-graphite p-6 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required placeholder="Your name" />
        <Field label="Business / Organization" name="business" placeholder="Company (optional)" />
        <Field label="Phone" name="phone" type="tel" required placeholder="(908) 555-0100" />
        <Field label="Email" name="email" type="email" required placeholder="you@email.com" />
        <Select label="Project type" name="projectType" options={PROJECT_TYPES} required />
        <Select label="Estimated budget" name="budget" options={BUDGETS} />
        <Field label="Target deadline" name="deadline" type="date" />
        <div className="flex flex-col">
          <label className="spec mb-2 text-fog/80">Artwork / logo</label>
          <label data-cursor className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/20 bg-ink/40 px-3 py-3 text-sm text-steel transition-colors hover:border-brand">
            <Icon name="Upload" className="h-4 w-4 shrink-0" />
            <span className="truncate">{fileName || 'Attach a file (optional)'}</span>
            <input type="file" name="artwork" className="sr-only" accept=".pdf,.ai,.eps,.png,.jpg,.jpeg,.svg" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')} />
          </label>
          <p className="mt-1.5 text-[11px] text-ash">Upload is a placeholder — enabled when the form is wired to email at launch.</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col">
        <label htmlFor="message" className="spec mb-2 text-fog/80">Project details</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about the vehicle(s), surface or project, quantity, and any deadlines."
          className="rounded-lg border border-white/10 bg-ink/40 px-4 py-3 text-sm text-bone outline-none transition-colors placeholder:text-ash focus:border-brand"
        />
      </div>

      {state === 'error' && (
        <p className="mt-4 rounded-lg border border-brand/30 bg-brand/10 px-4 py-3 text-sm text-brand-300">
          Something went wrong sending your request. Please call {site.phoneDisplay} and we’ll take care of you.
        </p>
      )}

      <button type="submit" disabled={state === 'submitting'} data-cursor className="btn-primary mt-7 w-full sm:w-auto">
        {state === 'submitting' ? 'Sending…' : 'Request My Quote'}
        {state !== 'submitting' && <Icon name="ArrowRight" className="h-4 w-4" />}
      </button>
      <p className="mt-3 font-mono text-[11px] text-ash">By submitting you agree to be contacted about your project. We never share your information.</p>
    </form>
  );
}

function Field({ label, name, type = 'text', required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="spec mb-2 text-fog/80">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-lg border border-white/10 bg-ink/40 px-4 py-3 text-sm text-bone outline-none transition-colors placeholder:text-ash focus:border-brand [color-scheme:dark]"
      />
    </div>
  );
}

function Select({ label, name, options, required }: { label: string; name: string; options: string[]; required?: boolean }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="spec mb-2 text-fog/80">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        className="rounded-lg border border-white/10 bg-ink/40 px-4 py-3 text-sm text-bone outline-none transition-colors focus:border-brand [color-scheme:dark]"
      >
        <option value="" disabled>Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
