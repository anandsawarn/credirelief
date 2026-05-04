import { Link, useParams } from 'react-router-dom';
import InquirySection from '../components/InquirySection';
import SectionHeader from '../components/SectionHeader';
import PageShell from '../components/PageShell';
import { navLinks, services } from '../data/siteContent';
import { findBySlug, slugify } from '../utils/slugify';

export default function ServicePage() {
  const { serviceSlug } = useParams();
  const service = findBySlug(services, serviceSlug, 'title');

  if (!service) {
    return <PageMessage title="Service not found" description="Please choose a service from the homepage service grid." />;
  }

  return (
    <PageShell links={navLinks}>
      <section className="mt-6 rounded-4xl border border-white/10 bg-white/5 px-5 py-8 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow="Service detail"
          title={service.title}
          description={service.description}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <h2 className="text-xl font-semibold text-white">What this service covers</h2>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {service.points.map((point) => (
                <li key={point} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Direct inquiry</p>
            <h3 className="mt-3 text-2xl font-bold text-white">Send a request for this service</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Use the homepage form to submit your details. The service selection can be matched with your settlement enquiry.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300" to={`/?loanType=${slugify(service.title)}#contact`}>
                Use form
              </Link>
              <Link className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10" to="/">
                Back home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <InquirySection initialLoanType={service.title} />
    </PageShell>
  );
}

function PageMessage({ title, description }) {
  return (
    <PageShell links={navLinks}>
      <section className="mt-6 rounded-4xl border border-white/10 bg-white/5 px-5 py-12 text-center sm:px-8 lg:px-10">
        <h1 className="text-3xl font-black text-white">{title}</h1>
        <p className="mt-4 text-sm leading-7 text-slate-300">{description}</p>
      </section>
    </PageShell>
  );
}