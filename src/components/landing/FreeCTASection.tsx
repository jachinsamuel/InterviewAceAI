'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export const FreeCTASection = () => {
  return (
    <section className="section-padding bg-dark-bg-2 border-t border-zinc-800/50">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-light-text mb-4">
            Ready to <span className="gradient-text">ace your interview?</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
            Start practicing right now. Everything is completely free — no credit card, no subscription, no limits.
          </p>
          <Link href="/interview">
            <Button size="lg" variant="primary" className="group">
              Start Free Mock Interview
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
