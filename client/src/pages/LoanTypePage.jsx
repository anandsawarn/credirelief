import { Link, useParams } from 'react-router-dom';
import InquirySection from '../components/InquirySection';
import SectionHeader from '../components/SectionHeader';
import PageShell from '../components/PageShell';
import { loanTypes, navLinks, loanTypeDetails } from '../data/siteContent';
import { findBySlug, slugify } from '../utils/slugify';

export default function LoanTypePage() {
  const { loanTypeSlug } = useParams();
  const loanType = findBySlug(loanTypes, loanTypeSlug);
  const details = loanType ? loanTypeDetails[loanType] : null;

  if (!loanType) {
    return <PageMessage title="Loan type not found" description="Please choose a loan type from the homepage selector or cards." />;
  }

  return (
    <PageShell links={navLinks}>
      <section className="mt-6 rounded-4xl border border-white/10 bg-white/5 px-5 py-8 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow="Loan type detail"
          title={loanType}
          description={details?.description || `Complete guidance on ${loanType} settlement, risks, and eligibility.`}
        />

        {/* Key Info Cards */}
        {details && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-widest text-slate-400">Settlement Range</p>
              <p className="mt-3 text-lg font-bold text-cyan-300">{details.typicalSettlementRange}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-widest text-slate-400">Time to Resolve</p>
              <p className="mt-3 text-lg font-bold text-emerald-300">{details.timeToResolve}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-xs uppercase tracking-widest text-slate-400">Default Period</p>
              <p className="mt-3 text-sm font-bold text-white">View eligibility below</p>
            </div>
          </div>
        )}

        {/* Settlement Tips */}
        {details && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Settlement Tips & Strategies</h2>
            <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6">
              <ul className="space-y-3">
                {details.settlementTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-300">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Risk Factors */}
        {details && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Important Risk Factors</h2>
            <div className="rounded-3xl border border-red-500/30 bg-red-500/5 p-6">
              <ul className="space-y-3">
                {details.riskFactors.map((risk, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-red-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M13.477 14.89A6 6 0 15.572 13a1 1 0 101.414 1.414A8 8 0 1010 2a1 1 0 00-1.414 1.414A6 6 0 1113.477 14.89zM9 15a1 1 0 11-2 0 1 1 0 012 0zm1-4a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-300">{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Eligibility */}
        {details && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Eligibility Criteria</h2>
            <div className="rounded-3xl border border-blue-500/30 bg-blue-500/5 p-6">
              <ul className="grid gap-3 sm:grid-cols-2">
                {details.eligibility.map((criterion, index) => (
                  <li key={index} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <svg className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-slate-300">{criterion}</span>
                  </li>
                ))}
              </ul>
            </div>
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
          <h2 className="text-2xl font-bold text-white">Ready to settle your {loanType}?</h2>
          <p className="mt-3 text-slate-300">Our team has extensive experience with {loanType.toLowerCase()} settlements.</p>
          <Link
            to={`/?loanType=${slugify(loanType)}#contact`}
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

      <InquirySection initialLoanType={loanType} />
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