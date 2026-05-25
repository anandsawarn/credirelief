import StatCard from './StatCard';
import MiniCard from './MiniCard';
import { loanTypes, settlements } from '../data/siteContent';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../utils/slugify';

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section id="home" className="relative overflow-hidden rounded-4xl border border-slate-200 bg-white px-5 py-8 shadow-sm sm:px-8 lg:px-12 lg:py-12">
      <div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm text-cyan-500">
            <span className="h-2 w-2 rounded-full bg-cyan-500" />
            Facing pressure from lenders or recovery agents?
          </div>

          <div className="space-y-5">
            <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              A clear, lawful path to settle your loan quickly.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-700 sm:text-lg">
              We negotiate with lenders, protect you from aggressive recovery practices, and secure verified closure with documented outcomes.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a className="rounded-2xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-500" href="#services">
              Get Started
            </a>
            <a className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50" href="#process">
              View Process
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard value="5000+" label="successful settlements" />
            <StatCard
              value="6"
              label="main service categories"
              items={loanTypes}
              onSelect={(service) => {
                  // Dispatch a global event so the inquiry form can pick it up without navigation
                  window.dispatchEvent(new CustomEvent('select-service', { detail: { service } }));
                }}
            />
            <StatCard value="24/7" label="lead capture readiness" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Real Settlements. Real Results.</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Settlement proof</h2>
              </div>
              <div className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
                Verified
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {settlements.map((s, idx) => (
                <div key={idx} className="aspect-4/3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-[0.35em] text-slate-500">{s.bank}</span>
                        <span className="text-xs rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">Verified</span>
                      </div>

                      <h3 className="mt-3 text-sm font-semibold text-slate-900">{s.settledAmount} settled</h3>
                      <p className="mt-2 text-sm text-slate-600">{s.summary}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <small className="text-xs text-slate-500">{s.date}</small>
                      <a className="text-sm font-medium text-cyan-600 hover:underline" href="#">View</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <MiniCard title="Structured help" text="From lender pressure to closure, the flow stays clear." />
            <MiniCard title="Dedicated support" text="One expert can guide the case from start to finish." />
          </div>
        </div>
      </div>
    </section>
  );
}