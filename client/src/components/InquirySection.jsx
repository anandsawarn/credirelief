import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import SectionHeader from './SectionHeader';
import { banks, contactDetails, loanTypes } from '../data/siteContent';
import { findBySlug, serviceTitleToLoanType, slugify } from '../utils/slugify';

const defaultBank = banks[0];
const defaultLoanType = loanTypes[0];

export default function InquirySection({ initialBank = defaultBank, initialLoanType = defaultLoanType }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryBank = searchParams.get('bank');
  const queryLoanType = searchParams.get('loanType');
  const queryService = searchParams.get('service');

  const derivedBank = queryBank ? findBySlug(banks, queryBank) ?? initialBank : initialBank;
  const derivedLoanType = queryLoanType
    ? findBySlug(loanTypes, queryLoanType) ?? initialLoanType
    : queryService
      ? serviceTitleToLoanType(queryService)
      : initialLoanType;

  const [selectedBank, setSelectedBank] = useState(derivedBank);
  const [selectedLoanType, setSelectedLoanType] = useState(derivedLoanType);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setSelectedBank(derivedBank);
  }, [derivedBank]);

  useEffect(() => {
    setSelectedLoanType(derivedLoanType);
  }, [derivedLoanType]);

  const encodedMessage = useMemo(() => {
    const message = `Hi, I need help with ${selectedLoanType} settlement for ${selectedBank}. Please contact me.`;
    return encodeURIComponent(message);
  }, [selectedBank, selectedLoanType]);

  const whatsappHref = `https://wa.me/${contactDetails.whatsapp}?text=${encodedMessage}`;
  const mailtoHref = `mailto:${contactDetails.email}?subject=${encodeURIComponent(
    `${selectedLoanType} settlement enquiry - ${selectedBank}`
  )}&body=${encodedMessage}`;

  const bankHref = `/bank/${slugify(selectedBank)}`;
  const loanHref = `/loan-type/${slugify(selectedLoanType)}`;

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          bank: selectedBank,
          loanType: selectedLoanType,
          source: 'homepage-inquiry'
        })
      });

      // Try to parse JSON body safely; handle empty or non-JSON responses
      let payload = {};
      try {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          payload = await response.json();
        } else {
          const text = await response.text();
          try {
            payload = text ? JSON.parse(text) : {};
          } catch (parseErr) {
            payload = { message: text };
          }
        }
      } catch (parseError) {
        payload = {};
      }

      if (!response.ok) {
        throw new Error(payload.message || response.statusText || 'Lead submission failed');
      }

      // Redirect to success page with details as query params
      const params = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        bank: selectedBank,
        loanType: selectedLoanType
      });
      
      navigate(`/success?${params.toString()}`);
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Something went wrong while sending the form.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  }

  return (
    <section className="mt-6 rounded-4xl border border-white/10 bg-white/5 px-5 py-8 sm:px-8 lg:px-10">
      <SectionHeader
        eyebrow="Quick selector"
        title="Choose bank, choose loan type, and send your details"
        description="Fill the form with your contact details so the admin can receive your enquiry for settlement or new loan support."
      />

      <div className="mt-8 grid gap-5 xl:grid-cols-[1fr_1fr_1.1fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
          <label className="text-sm font-medium text-slate-200" htmlFor="bank-selector">
            Bank selector
          </label>
          <select
            id="bank-selector"
            className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none ring-0"
            value={selectedBank}
            onChange={(event) => setSelectedBank(event.target.value)}
          >
            {banks.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            Selected bank: <span className="text-white">{selectedBank}</span>
          </p>
          <Link className="mt-4 inline-flex rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10" to={bankHref}>
            Open bank page
          </Link>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
          <label className="text-sm font-medium text-slate-200" htmlFor="loan-type-selector">
            Loan type selector
          </label>
          <select
            id="loan-type-selector"
            className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none ring-0"
            value={selectedLoanType}
            onChange={(event) => setSelectedLoanType(event.target.value)}
          >
            {loanTypes.map((loanType) => (
              <option key={loanType} value={loanType}>
                {loanType}
              </option>
            ))}
          </select>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            Selected loan type: <span className="text-white">{selectedLoanType}</span>
          </p>
          <Link className="mt-4 inline-flex rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10" to={loanHref}>
            Open loan page
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-cyan-300/20 bg-[linear-gradient(180deg,rgba(8,47,73,0.96),rgba(15,23,42,0.98))] p-5">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70">Contact now</p>
          <h3 className="mt-3 text-xl font-semibold text-white">Send your details to admin</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Fill the form below. The selected bank and loan type will be included automatically, and the enquiry will be forwarded to admin email.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <input
              className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 sm:col-span-2"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
              required
            />
            <input
              className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile number"
              required
            />
            <input
              className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
            />
            <textarea
              className="min-h-28 rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 sm:col-span-2"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us your issue or what kind of settlement/new loan help you need"
              required
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Now
            </a>
            <a
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              href={mailtoHref}
            >
              Email Now
            </a>
            <button
              className="rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Submit Form'}
            </button>
          </div>

          {status.message ? (
            <p className={`mt-4 text-sm ${status.type === 'error' ? 'text-red-300' : 'text-emerald-300'}`}>
              {status.message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}