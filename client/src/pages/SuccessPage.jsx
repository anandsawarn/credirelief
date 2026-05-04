import { Link, useSearchParams } from 'react-router-dom';
import PageShell from '../components/PageShell';
import SectionHeader from '../components/SectionHeader';
import { navLinks, contactDetails } from '../data/siteContent';

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || 'User';
  const email = searchParams.get('email') || '';
  const bank = searchParams.get('bank') || '';
  const loanType = searchParams.get('loanType') || '';

  return (
    <PageShell links={navLinks}>
      <section className="mt-12 rounded-4xl border border-white/10 bg-white/5 px-5 py-12 sm:px-8 lg:px-10">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-emerald-400 bg-emerald-500/10">
              <svg className="h-10 w-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Header */}
          <h1 className="text-4xl font-bold text-white md:text-5xl">Thank You!</h1>
          <p className="mt-3 text-lg text-slate-300">
            Your enquiry has been successfully submitted to our team.
          </p>

          {/* Details Card */}
          <div className="mt-10 rounded-3xl border border-white/10 bg-slate-950/60 p-8 text-left">
            <h2 className="text-xl font-semibold text-white">What Happens Next?</h2>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-4">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-sm font-semibold text-cyan-300">
                  1
                </span>
                <div>
                  <p className="font-medium text-white">Our team will review your case</p>
                  <p className="mt-1 text-sm text-slate-400">We'll assess your settlement options and prepare a customized plan.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-sm font-semibold text-cyan-300">
                  2
                </span>
                <div>
                  <p className="font-medium text-white">You'll receive a call within 24 hours</p>
                  <p className="mt-1 text-sm text-slate-400">Our settlement specialist will discuss your case and answer all questions.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-sm font-semibold text-cyan-300">
                  3
                </span>
                <div>
                  <p className="font-medium text-white">Settlement negotiation begins</p>
                  <p className="mt-1 text-sm text-slate-400">We'll directly negotiate with the lender on your behalf.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-sm font-semibold text-cyan-300">
                  4
                </span>
                <div>
                  <p className="font-medium text-white">Closure & credit recovery</p>
                  <p className="mt-1 text-sm text-slate-400">Once settled, you'll get documented closure and guidance for rebuilding credit.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Submitted Details */}
          {(name || email || bank || loanType) && (
            <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/40 p-8">
              <h3 className="text-lg font-semibold text-white">Your Submission Details</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {name && (
                  <div className="rounded-xl bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-slate-400">Name</p>
                    <p className="mt-2 font-medium text-white">{name}</p>
                  </div>
                )}
                {email && (
                  <div className="rounded-xl bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-slate-400">Email</p>
                    <p className="mt-2 font-medium text-white break-all">{email}</p>
                  </div>
                )}
                {bank && (
                  <div className="rounded-xl bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-slate-400">Bank</p>
                    <p className="mt-2 font-medium text-white">{bank}</p>
                  </div>
                )}
                {loanType && (
                  <div className="rounded-xl bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-slate-400">Loan Type</p>
                    <p className="mt-2 font-medium text-white">{loanType}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contact Info */}
          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/40 p-8">
            <h3 className="text-lg font-semibold text-white">Need Immediate Assistance?</h3>
            <p className="mt-3 text-slate-300">Reach out directly via WhatsApp or Email</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/${contactDetails.whatsapp}?text=Hi, I submitted my enquiry on your website. Can you help?`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.935 1.22c-1.545.93-2.732 2.37-3.408 3.98-.805 2.02-.938 4.18-.37 6.15.608 1.97 1.725 3.75 3.276 5.103 1.552 1.353 3.532 2.288 5.657 2.666 2.125.378 4.365.265 6.38-.367 1.585-.489 3.02-1.32 4.18-2.396 1.16-1.076 2.02-2.39 2.51-3.8.493-1.41.634-2.91.455-4.35-.218-1.844-.962-3.577-2.148-4.977-1.186-1.4-2.78-2.41-4.54-2.894-1.76-.484-3.659-.418-5.42.2m2.896 6.568c-.256-.128-.614-.16-.93-.058-.316.102-.588.328-.765.618-.178.29-.226.62-.135.927.09.306.297.56.567.717.27.156.61.19.92.09.31-.1.57-.325.74-.61.17-.285.22-.615.13-.922-.089-.306-.295-.56-.567-.717m4.056-1.203c-.29.146-.54.398-.71.71-.17.312-.21.666-.12.996.09.33.318.605.616.78.298.175.655.215.98.115.325-.1.595-.335.78-.65.185-.315.23-.676.13-1.006-.1-.33-.33-.605-.64-.78zm-.928 3.49c-.132.066-.246.174-.32.304-.075.13-.103.277-.08.42.023.143.1.27.217.358.117.088.268.13.414.12.145-.01.282-.07.378-.164.096-.094.152-.221.16-.355-.002-.09-.026-.18-.067-.26-.042-.08-.108-.146-.188-.19-.08-.043-.17-.065-.26-.064-.064 0-.127.01-.188.032" />
                </svg>
                Chat on WhatsApp
              </a>
              <a
                href={`mailto:${contactDetails.email}?subject=Follow-up: My Enquiry Submission&body=Hi, I submitted my enquiry on your website. Can you please follow up?`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="rounded-xl bg-cyan-400 px-8 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Back to Home
            </Link>
            <Link
              to="/?#contact"
              className="rounded-xl border border-white/20 bg-white/5 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Submit Another Enquiry
            </Link>
          </div>

          {/* Info Message */}
          <p className="mt-8 text-sm text-slate-400">
            Your details have been securely sent to{' '}
            <span className="font-medium text-cyan-300">{contactDetails.email}</span>. Our team will reach out
            shortly.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
