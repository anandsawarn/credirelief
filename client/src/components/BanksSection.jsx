import SectionHeader from './SectionHeader';
import { banks } from '../data/siteContent';
import { Link } from 'react-router-dom';
import { slugify } from '../utils/slugify';

export default function BanksSection() {
  return (
    <section id="banks" className="mt-6 rounded-4xl border border-slate-200 bg-white px-5 py-8 sm:px-8 lg:px-10">
      <SectionHeader
        eyebrow="Bank wise settlement"
        title="Pages and flow for specific banks and NBFCs"
        description="The reference site includes bank-specific settlement routes. The frontend should surface those clearly so each lender gets its own path later."
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {banks.map((bank) => (
          <Link
            key={bank}
            to={`/bank/${slugify(bank)}`}
            className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm text-slate-700 transition hover:border-cyan-200/50 hover:bg-white"
          >
            {bank}
          </Link>
        ))}
      </div>
    </section>
  );
}