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

  // Listen for service selections dispatched from other components (Hero stat card)
  useEffect(() => {
    function onSelectService(e) {
      const svc = e?.detail?.service;
      if (!svc) return;
      // Map service title to loan type and update selection
      const loan = serviceTitleToLoanType(svc);
      setSelectedLoanType(loan);
      // Prefill message only if user hasn't typed one
      setFormData((current) => ({
        ...current,
        message:
          current.message && current.message.trim().length > 0
            ? current.message
            : `I need help with ${loan} settlement for ${derivedBank}. Please contact me.`
      }));
      // Smooth-scroll to contact area
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el && typeof el.scrollIntoView === 'function') el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }

    window.addEventListener('select-service', onSelectService);
    return () => window.removeEventListener('select-service', onSelectService);
  }, [derivedBank]);

  // When loan type changes (eg. from service selection), prefill the message if empty
  useEffect(() => {
    setFormData((current) => {
      if (current.message && current.message.trim().length > 0) return current;
      return {
        ...current,
        message: `I need help with ${derivedLoanType} settlement for ${derivedBank}. Please contact me.`
      };
    });
  }, [derivedLoanType, derivedBank]);

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
    <section className="mt-6 rounded-4xl border border-slate-200 bg-white px-5 py-8 sm:px-8 lg:px-10">
      <SectionHeader
        eyebrow="Quick selector"
        title="Choose bank, choose loan type, and send your details"
        description="Fill the form with your contact details so the admin can receive your enquiry for settlement or new loan support."
      />

      <div className="mt-8 grid gap-5 xl:grid-cols-[1fr_1fr_1.1fr]">
        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
          <label className="text-sm font-medium text-slate-200" htmlFor="bank-selector">
            Bank selector
          </label>
          <select
            id="bank-selector"
            className="mt-3 w-full rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-0"
            value={selectedBank}
            onChange={(event) => setSelectedBank(event.target.value)}
          >
            {banks.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
          <p className="mt-4 text-sm leading-6 text-slate-700">
            Selected bank: <span className="text-slate-900">{selectedBank}</span>
          </p>
          <Link className="mt-4 inline-flex rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50" to={bankHref}>
            Open bank page
          </Link>
        </div>
        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
          <label className="text-sm font-medium text-slate-600" htmlFor="loan-type-selector">
            Loan type selector
          </label>
          <select
            id="loan-type-selector"
            className="mt-3 w-full rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-0"
            value={selectedLoanType}
            onChange={(event) => setSelectedLoanType(event.target.value)}
          >
            {loanTypes.map((loanType) => (
              <option key={loanType} value={loanType}>
                {loanType}
              </option>
            ))}
          </select>
          <p className="mt-4 text-sm leading-6 text-slate-700">
            Selected loan type: <span className="text-slate-900">{selectedLoanType}</span>
          </p>
          <Link className="mt-4 inline-flex rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50" to={loanHref}>
            Open loan page
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-100 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Contact now</p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900">Send your details to admin</h3>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Fill the form below. The selected bank and loan type will be included automatically, and the enquiry will be forwarded to admin email.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <input
              className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:col-span-2"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
              required
            />
            <input
              className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile number"
              required
            />
            <input
              className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
            />
            <textarea
              className="min-h-28 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:col-span-2"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us your issue or what kind of settlement/new loan help you need"
              required
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Now
            </a>
            <a
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              href={mailtoHref}
            >
              Email Now
            </a>
            <button
              className="rounded-xl bg-cyan-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Submit Form'}
            </button>
          </div>

          {status.message ? (
            <p className={`mt-4 text-sm ${status.type === 'error' ? 'text-red-500' : 'text-emerald-700'}`}>
              {status.message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}