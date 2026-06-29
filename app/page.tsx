'use client';

import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection, HowItWorksSection } from '@/components/landing/FeaturesSection';
import { CapabilitiesSection } from '@/components/landing/TestimonialsSection';
import { FreeCTASection } from '@/components/landing/FreeCTASection';

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CapabilitiesSection />
      <FreeCTASection />
      <Footer />
    </main>
  );
}

