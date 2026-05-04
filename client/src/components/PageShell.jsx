import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsAppButton from './FloatingWhatsAppButton';

export default function PageShell({ links, children }) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.16),transparent_34%),linear-gradient(180deg,#0b1220_0%,#0f172a_38%,#111827_100%)] text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <Navbar links={links} />
        {children}
        <Footer />
      </div>
      <FloatingWhatsAppButton />
    </main>
  );
}