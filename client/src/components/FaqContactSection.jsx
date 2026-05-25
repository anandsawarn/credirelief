import SectionHeader from './SectionHeader';
import { contactDetails, faqs } from '../data/siteContent';

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm">
      <span className="text-slate-600">{label}</span>
      <span className="font-medium text-slate-900">{value}</span>
    </div>
  );
}

export default function FaqContactSection() {
  return (
    <section id="faq" className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-4xl border border-slate-200 bg-white px-5 py-8 sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow="Frequently asked questions"
          title="Reduce uncertainty before the first enquiry"
          description="FAQ content is a major conversion lever on the reference site, so the homepage should address concerns early."
        />

        <div className="mt-8 space-y-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-slate-100 bg-white p-5 open:bg-slate-50">
              <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
                <span>{faq.question}</span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <div id="contact" className="rounded-4xl border border-slate-200 bg-white p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Breathe easy</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Let&apos;s move forward.</h2>
        <p className="mt-4 text-sm leading-7 text-slate-700">
          Use the form above to send your details to admin. If you prefer a quick action, use the WhatsApp or email buttons below.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            className="rounded-xl bg-cyan-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-cyan-500"
            href={`https://wa.me/${contactDetails.whatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp Us
          </a>
          <a className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50" href={`mailto:${contactDetails.email}`}>
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
}