import SectionHeader from './SectionHeader';
import { contactDetails, faqs } from '../data/siteContent';

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}

export default function FaqContactSection() {
  return (
    <section id="faq" className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-4xl border border-white/10 bg-white/5 px-5 py-8 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow="Frequently asked questions"
          title="Reduce uncertainty before the first enquiry"
          description="FAQ content is a major conversion lever on the reference site, so the homepage should address concerns early."
        />

        <div className="mt-8 space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-white/10 bg-slate-950/55 p-5 open:bg-slate-950/75">
              <summary className="cursor-pointer list-none text-base font-semibold text-white">
                <span>{faq.question}</span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-300">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <div id="contact" className="rounded-4xl border border-cyan-300/20 bg-[linear-gradient(180deg,rgba(8,47,73,0.96),rgba(15,23,42,0.98))] p-6 shadow-2xl shadow-cyan-950/30 sm:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Breathe easy</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-white">Let&apos;s move forward.</h2>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          Use the form above to send your details to admin. If you prefer a quick action, use the WhatsApp or email buttons below.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            className="rounded-xl bg-cyan-400 px-5 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-300"
            href={`https://wa.me/${contactDetails.whatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp Us
          </a>
          <a className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-center font-semibold text-white transition hover:bg-white/10" href={`mailto:${contactDetails.email}`}>
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
}