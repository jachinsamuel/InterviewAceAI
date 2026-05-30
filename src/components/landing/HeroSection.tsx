'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PlayCircle, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse-soft" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl opacity-20 animate-pulse-soft" />

      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <span className="badge">🚀 AI-Powered Interview Prep</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
              Master Every
              <br />
              <span className="gradient-text">Interview with AI</span>
            </h1>

            <p className="text-xl text-light-text/80 mb-8 leading-relaxed max-w-lg">
              Practice real interviews, receive instant AI-powered feedback, and land your dream job. 
              Built with cutting-edge NLP and generative AI.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" variant="primary" className="w-full sm:w-auto">
                Start Free Interview
                <ArrowRight size={20} />
              </Button>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <PlayCircle size={20} />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-primary">50K+</div>
                <p className="text-sm text-light-text/60">Users Practicing</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">100M+</div>
                <p className="text-sm text-light-text/60">Interviews Completed</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">95%</div>
                <p className="text-sm text-light-text/60">Job Success Rate</p>
              </div>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-96 sm:h-[500px] rounded-2xl overflow-hidden glass-effect-dark">
              {/* Animated Interview Mockup */}
              <div className="w-full h-full bg-gradient-to-br from-dark-bg to-dark-bg-2 flex flex-col items-center justify-center p-8">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center mb-6"
                >
                  <span className="text-3xl">🤖</span>
                </motion.div>
                <p className="text-center text-light-text/80 mb-4">AI Interviewer is ready...</p>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex gap-2"
                >
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </motion.div>

                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [-20, 20, -20] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-8 right-8 bg-dark-bg-2 border border-gray-700 rounded-xl p-4 max-w-xs"
                >
                  <p className="text-sm text-light-text/80">
                    "Tell me about a recent project where you optimized performance"
                  </p>
                </motion.div>

                <motion.div
                  animate={{ y: [20, -20, 20] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.2 }}
                  className="absolute bottom-8 left-8 bg-primary/20 border border-primary/40 rounded-xl p-4 max-w-xs"
                >
                  <p className="text-sm text-primary">✓ Confidence: 92%</p>
                </motion.div>
              </div>
            </div>

            {/* Floating Element */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-8 -right-8 w-32 h-32 border border-primary/20 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
