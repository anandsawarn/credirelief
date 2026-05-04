import SectionHeader from './SectionHeader';
import { processSteps } from '../data/siteContent';

function ProcessCard({ index, title, description }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-400/15 text-sm font-black text-cyan-200 ring-1 ring-cyan-300/20">
          {index}
        </span>
        <h3 className="text-base font-semibold text-white">{title}</h3>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-300">{description}</p>
    </article>
  );
}

export default function ProcessSection() {
  return (
    <section id="process" className="mt-6 rounded-4xl border border-white/10 bg-white/5 px-5 py-8 sm:px-8 lg:px-10">
      <SectionHeader
        eyebrow="Settlement, backed by process"
        title="A clear process built to reduce stress and improve trust"
        description="The reference site leans heavily on trust, proof, and process. This layout mirrors that approach so the client side feels familiar and conversion-focused."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {processSteps.map((step, index) => (
          <ProcessCard key={step.title} index={index + 1} title={step.title} description={step.description} />
        ))}
      </div>
    </section>
  );
}