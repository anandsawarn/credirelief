import { useState } from 'react';

export default function StatCard({ value, label, items = [], onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
      <div className="text-3xl font-extrabold text-slate-900">{value}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.28em] text-slate-500">{label}</div>

      {items && items.length > 0 ? (
        <div className="mt-3 text-sm text-slate-700">
          <button
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-cyan-700 hover:underline"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            View services
          </button>

          <ul className={`mt-2 space-y-1 ${open ? '' : 'hidden'}`}>
            {items.map((it) => (
              <li key={it}>
                <button
                  type="button"
                  className="text-sm text-slate-600 hover:text-cyan-700"
                  onClick={() => onSelect ? onSelect(it) : null}
                >
                  {it}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}