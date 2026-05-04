import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PageShell from './components/PageShell';
import HomePage from './pages/HomePage';
import BankPage from './pages/BankPage';
import ServicePage from './pages/ServicePage';
import LoanTypePage from './pages/LoanTypePage';
import SuccessPage from './pages/SuccessPage';
import { navLinks } from './data/siteContent';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageShell links={navLinks}><HomePage /></PageShell>} />
        <Route path="/bank/:bankSlug" element={<BankPage />} />
        <Route path="/service/:serviceSlug" element={<ServicePage />} />
        <Route path="/loan-type/:loanTypeSlug" element={<LoanTypePage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
