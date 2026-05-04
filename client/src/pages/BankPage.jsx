import { Link, useParams } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import InquirySection from '../components/InquirySection';
import PageShell from '../components/PageShell';
import { banks, navLinks, bankDetails } from '../data/siteContent';
import { findBySlug, slugify } from '../utils/slugify';

export default function BankPage() {
  const { bankSlug } = useParams();
  const bank = findBySlug(banks, bankSlug);
  const details = bank ? bankDetails[bank] : null;

  if (!bank) {
    return (
      <PageMessage title="Bank not found" description="Please choose a bank from the homepage bank grid." />
    );
  }

  return (
    <PageShell links={navLinks}>
      <section className="mt-6 rounded-4xl border border-white/10 bg-white/5 px-5 py-8 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow="Bank wise settlement"
          title={`${bank} settlement page`}
          description={`Complete guidance on settlement, processing time, success rates, and FAQs for ${bank}.`}
        />

        {/* Key Metrics */}
        {details && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-widest text-slate-400">Approval Time</p>
              <p className="mt-3 text-2xl font-bold text-cyan-300">{details.approvalTime}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-widest text-slate-400">Success Rate</p>
              <p className="mt-3 text-2xl font-bold text-emerald-300">{details.successRate}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-widest text-slate-400">Avg Settlement</p>
              <p className="mt-3 text-lg font-bold text-white">{details.averageSettlement}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-widest text-slate-400">Typical Range</p>
              <p className="mt-3 text-sm font-bold text-white">Of outstanding amount</p>
            </div>
          </div>
        )}

        {/* Settlement Process */}
        {details && (
          <div className="mt-8">
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
              <h2 className="text-2xl font-bold text-white">Settlement Process</h2>
              <ol className="mt-6 space-y-4">
                {details.settlementProcess.map((step, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-cyan-400/20 text-cyan-300 font-semibold text-sm">
                      {index + 1}
                    </span>
                    <span className="text-slate-300">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* Key Points */}
        {details && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {details.keyPoints.map((point, index) => (
              <div key={index} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                <div className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-slate-300">{point}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Testimonial */}
        {details && (
          <div className="mt-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6">
            <p className="text-sm font-medium text-emerald-300">✓ Real case result</p>
            <p className="mt-4 text-lg text-white italic">&quot;{details.testimonial}&quot;</p>
          </div>
        )}

        {/* FAQs */}
        {details && details.faq && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {details.faq.map((item, index) => (
                <details key={index} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 group cursor-pointer">
                  <summary className="flex items-start gap-3 font-semibold text-white marker:text-cyan-300">
                    <span className="grow">{item.q}</span>
                  </summary>
                  <p className="mt-4 text-sm text-slate-300">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-10 rounded-3xl border border-cyan-300/20 bg-[linear-gradient(180deg,rgba(8,47,73,0.6),rgba(15,23,42,0.8))] p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Ready to settle with {bank}?</h2>
          <p className="mt-3 text-slate-300">Fill the form below and our team will help you with your settlement.</p>
          <Link
            to={`/?bank=${slugify(bank)}#contact`}
            className="mt-6 inline-flex rounded-xl bg-cyan-400 px-8 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Open Settlement Form
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10" to="/">
            Back home
          </Link>
        </div>
      </section>

      <InquirySection initialBank={bank} />
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