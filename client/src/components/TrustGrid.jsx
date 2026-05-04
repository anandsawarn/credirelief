function TrustCard({ title, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/65 p-5">
      <div className="mb-4 h-12 w-12 rounded-2xl bg-cyan-400/10 ring-1 ring-cyan-300/20" />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
    </div>
  );
}

export default function TrustGrid() {
  return (
    <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <TrustCard title="Direct lender negotiation" text="Structured conversations with banks and recovery teams." />
      <TrustCard title="Verified settlement records" text="Documented closure instead of vague promises." />
      <TrustCard title="Credit recovery guidance" text="Support after settlement to help rebuild stability." />
      <TrustCard title="Legal-backed process" text="A compliant path aligned with policy and process." />
    </section>
  );
}