import SectionHeader from './SectionHeader';
import { services } from '../data/siteContent';
import { Link } from 'react-router-dom';
import { slugify } from '../utils/slugify';

export default function ServicesSection() {
  return (
    <section id="services" className="mt-6">
      <SectionHeader
        eyebrow="Trusted by 5000+ clients"
        title="Our main service categories"
        description="Clear, focused settlement services covering the six primary loan types. Click a card to learn more."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
              <span className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-xs text-cyan-700">
                Service
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-700">{service.description}</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {service.points.map((point) => (
                <li key={point} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="inline-flex rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500" to={`/service/${slugify(service.title)}`}>
                View details
              </Link>
              <a className="inline-flex rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50" href="#contact">
                Enquire Now
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}