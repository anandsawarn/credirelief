import StatCard from './StatCard';
import MiniCard from './MiniCard';

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 px-5 py-8 shadow-2xl shadow-cyan-950/20 sm:px-8 lg:px-12 lg:py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_30%)]" />
      <div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            Facing pressure from lenders or recovery agents?
          </div>

          <div className="space-y-5">
            <h1 className="max-w-2xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
              A lawful way forward when loan stress starts taking over.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              We help people navigate settlement conversations, lender communication, and verified loan closure with a process-first approach.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a className="rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300" href="#services">
              Get Started
            </a>
            <a className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10" href="#process">
              View Process
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard value="100+" label="successful settlements" />
            <StatCard value="6" label="main service categories" />
            <StatCard value="24/7" label="lead capture readiness" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5 shadow-xl shadow-slate-950/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Real Settlements. Real Results.</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Settlement proof wall</h2>
              </div>
              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                Verified
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {['01', '02', '03', '04'].map((item) => (
                <div
                  key={item}
                  className="aspect-4/3 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.18),rgba(15,23,42,0.9))] p-4"
                >
                  <div className="flex h-full flex-col justify-between">
                    <span className="text-xs uppercase tracking-[0.35em] text-cyan-100/60">Letter {item}</span>
                    <div className="space-y-2">
                      <div className="h-2 w-3/4 rounded-full bg-white/30" />
                      <div className="h-2 w-1/2 rounded-full bg-white/20" />
                      <div className="h-2 w-5/6 rounded-full bg-cyan-300/30" />
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