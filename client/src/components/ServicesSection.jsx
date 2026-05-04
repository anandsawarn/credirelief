import SectionHeader from './SectionHeader';
import { services } from '../data/siteContent';
import { Link } from 'react-router-dom';
import { slugify } from '../utils/slugify';

export default function ServicesSection() {
  return (
    <section id="services" className="mt-6">
      <SectionHeader
        eyebrow="Trusted by thousands"
        title="Service categories to match the reference site"
        description="Each card can later become its own detail page, but the homepage should already present the main settlement categories clearly."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6 shadow-lg shadow-slate-950/20">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold text-white">{service.title}</h3>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
                Service
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-300">{service.description}</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {service.points.map((point) => (
                <li key={point} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="inline-flex rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300" to={`/service/${slugify(service.title)}`}>
                View details
              </Link>
              <a className="inline-flex rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10" href="#contact">
                Enquire Now
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}