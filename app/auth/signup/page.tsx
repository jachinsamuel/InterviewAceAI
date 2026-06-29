'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button, Input } from '@/components/common/Button';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { signIn } from 'next-auth/react';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        const result = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (!result?.error) {
          router.push('/dashboard');
          router.refresh();
        } else {
          setErrors({ submit: 'Account created, but automatic login failed.' });
        }
      } else {
        setErrors({ submit: data.error?.message || 'Signup failed' });
      }
    } catch {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen bg-dark-bg flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center py-12 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-1/3 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/5 rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl opacity-15" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Card Container */}
          <div className="p-8 rounded-2xl border border-primary/10 bg-dark-bg-2 backdrop-blur-md hover:border-primary/20 transition-colors">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-light-text to-light-text/70 bg-clip-text text-transparent">
                Join InterviewAce
              </h1>
              <p className="text-light-text/70">Start preparing for your dream interviews today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Full Name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />

              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                required
              />

              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-error/10 border border-error/30 text-error text-sm"
                >
                  {errors.submit}
                </motion.div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full group"
                isLoading={isLoading}
              >
                Create Account
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </form>

            {/* Divider */}
            <div className="my-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-bg-2 text-light-text/60">Already have an account?</span>
              </div>
            </div>

            {/* Sign In Link */}
            <Link href="/auth/login" className="block">
              <Button
                variant="secondary"
                size="lg"
                className="w-full"
              >
                Sign In
              </Button>
            </Link>

            {/* Footer Note */}
            <p className="text-center text-light-text/50 text-xs mt-6">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
