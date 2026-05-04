export default function Footer() {
  return (
    <footer className="mt-6 border-t border-white/10 px-2 py-6 text-sm text-slate-400">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>Loan Settlement</p>
        <div className="flex flex-wrap gap-3">
          <a className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white transition hover:bg-white/10" href="https://wa.me/9220456112" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white transition hover:bg-white/10" href="mailto:credirelief@gmail.com">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}