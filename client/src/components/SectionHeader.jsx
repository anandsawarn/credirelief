export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="text-xs uppercase tracking-[0.4em] text-cyan-600">{eyebrow}</p>
      <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      <p className="text-sm leading-7 text-slate-700 sm:text-base">{description}</p>
    </div>
  );
}