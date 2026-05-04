import { useState } from 'react';
import NavLink from './NavLink';

export default function Navbar({ links }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:px-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/15 text-cyan-300 ring-1 ring-cyan-300/20">
              <span className="text-lg font-black">S</span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/75">Loan Settlement</p>
              <p className="text-sm text-slate-300">Debt relief and verified closure support</p>
            </div>
          </div>

          <button
            type="button"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 lg:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>

          <nav className="hidden flex-wrap items-center gap-2 text-sm text-slate-300 lg:flex">
            {links.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden flex-wrap gap-2 lg:flex">
            <a
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              href="https://wa.me/9220456112"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a
              className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              href="mailto:credirelief@gmail.com"
            >
              Email
            </a>
          </div>
        </div>

        {isMenuOpen ? (
          <div
            id="mobile-nav"
            className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/90 p-4 lg:hidden"
          >
            <nav className="grid gap-2 text-sm text-slate-300">
              {links.map((link) => (
                <NavLink
                  key={link.label}
                  href={link.href}
                  className="rounded-xl bg-white/5 px-4 py-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="grid gap-2 sm:grid-cols-2">
              <a
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-white/10"
                href="https://wa.me/9220456112"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <a
                className="rounded-xl bg-cyan-400 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                href="mailto:credirelief@gmail.com"
                onClick={() => setIsMenuOpen(false)}
              >
                Email
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}