'use client';

import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { PricingSection } from '@/components/landing/PricingSection';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-dark-bg">
      <Header />
      <div className="pt-32">
        <PricingSection />
      </div>
      <Footer />
    </main>
  );
}
