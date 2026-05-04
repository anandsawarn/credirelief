export default function MiniCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
    </div>
  );
}