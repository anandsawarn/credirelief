import HeroSection from '../components/HeroSection';
import InquirySection from '../components/InquirySection';
import TrustGrid from '../components/TrustGrid';
import ProcessSection from '../components/ProcessSection';
import ServicesSection from '../components/ServicesSection';
import BanksSection from '../components/BanksSection';
import FaqContactSection from '../components/FaqContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <InquirySection />
      <TrustGrid />
      <ProcessSection />
      <ServicesSection />
      <BanksSection />
      <FaqContactSection />
    </>
  );
}