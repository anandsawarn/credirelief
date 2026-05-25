import { useState, useEffect, useRef } from 'react';
import NavLink from './NavLink';
import logo from '../assets/logo.png';

export default function Navbar({ links }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const TOP_THRESHOLD = 20; // px near top always expanded
    const UP_DELTA = 5; // px of upward scroll to force expand
    const lastY = { current: window.scrollY };

    function onScroll() {
      const y = window.scrollY;

      // Always expanded near top
      if (y <= TOP_THRESHOLD) {
        setIsShrunk(false);
        lastY.current = y;
        return;
      }

      // If user scrolled up at least UP_DELTA, expand
      if (y < lastY.current - UP_DELTA) {
        setIsShrunk(false);
      } else if (y > lastY.current) {
        // scrolling down -> shrink
        setIsShrunk(true);
      }

      lastY.current = y;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border border-slate-200 px-4 ${isShrunk ? 'py-2' : 'py-4'} shadow-sm shadow-slate-200 sm:px-6 transition-all duration-300 ease-in-out`}
      style={{ willChange: 'padding, box-shadow', background: 'var(--surface)', color: 'var(--text)' }}
    >
      {/* logo pinned to extreme left of viewport */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <div className={`${isShrunk ? 'h-10 w-10' : 'h-12 w-12'} rounded-full overflow-hidden bg-transparent flex items-center justify-center transition-all duration-300 ease-in-out`} style={{ willChange: 'width, height' }}>
          <img src={logo} alt="Loan Settlement" className="h-full w-full object-contain" />
        </div>
      </div>

      <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${isShrunk ? 'pl-14' : 'pl-16'}`}>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Loan Settlement</p>
                <p className="text-sm text-slate-700">Debt relief • Verified closure</p>
              </div>
            </div>

          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 lg:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>

          <nav className="hidden flex-wrap items-center gap-4 text-sm text-slate-700 lg:flex">
            {links.map((link) => (
              <NavLink key={link.label} href={link.href} className="text-slate-700 hover:text-cyan-600">
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden flex-wrap gap-3 lg:flex">
            <a
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              href="https://wa.me/9220456112"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a
              className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500"
              href="mailto:credirelief@gmail.com"
            >
              Email
            </a>
          </div>
        </div>

        {isMenuOpen ? (
          <div
            id="mobile-nav"
            className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 lg:hidden"
          >
            <nav className="grid gap-2 text-sm text-slate-700">
              {links.map((link) => (
                <NavLink
                  key={link.label}
                  href={link.href}
                  className="rounded-xl bg-slate-50 px-4 py-3 text-slate-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="grid gap-2 sm:grid-cols-2">
              <a
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                href="https://wa.me/9220456112"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <a
                className="rounded-xl bg-cyan-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-cyan-500"
                href="mailto:credirelief@gmail.com"
                onClick={() => setIsMenuOpen(false)}
              >
                Email
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
    </header>
  );
}