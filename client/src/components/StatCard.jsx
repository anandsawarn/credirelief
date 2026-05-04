export default function StatCard({ value, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4">
      <div className="text-2xl font-black text-white">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-400">{label}</div>
    </div>
  );
}