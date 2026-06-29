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

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setErrors({ submit: 'Invalid email or password.' });
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch {
      setErrors({ submit: 'Login failed. Please try again.' });
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
                Welcome Back
              </h1>
              <p className="text-light-text/70">Sign in to continue your interview prep</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                Sign In
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </form>

            {/* Forgot Password Link */}
            <button
              type="button"
              className="w-full text-center text-sm text-primary/70 hover:text-primary transition-colors mt-4"
            >
              Forgot your password?
            </button>

            {/* Divider */}
            <div className="my-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-bg-2 text-light-text/60">New to InterviewAce?</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <Link href="/auth/signup" className="block">
              <Button
                variant="secondary"
                size="lg"
                className="w-full"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
