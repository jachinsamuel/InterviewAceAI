'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES } from '@/lib/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/* ---------- Mini visuals for the two large cards ---------- */

const CodeSnippetVisual = () => (
  <div className="mt-6 rounded-lg bg-zinc-950 border border-zinc-800/50 p-4 font-mono text-xs overflow-hidden">
    <div className="space-y-1.5 text-zinc-500">
      <div><span className="text-primary/70">const</span> <span className="text-zinc-300">question</span> = generateFromResume(profile);</div>
      <div><span className="text-primary/70">const</span> <span className="text-zinc-300">difficulty</span> = adaptToLevel(responses);</div>
      <div className="text-zinc-600">{"// AI adapts in real-time to your skill level"}</div>
      <div><span className="text-primary/70">await</span> <span className="text-zinc-300">interview</span>.ask(question, {'{'} difficulty {'}'});</div>
    </div>
  </div>
);

const WaveformVisual = () => (
  <div className="mt-6 flex items-end gap-[3px] h-16">
    {[40, 65, 30, 80, 55, 90, 45, 70, 35, 85, 50, 75, 60, 40, 70, 55, 90, 35, 65, 80, 45, 55, 70, 40, 85].map((h, i) => (
      <motion.div
        key={i}
        className="flex-1 rounded-full bg-primary/30"
        initial={{ height: 4 }}
        whileInView={{ height: `${h}%` }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 + i * 0.03, duration: 0.4, ease: 'easeOut' }}
      />
    ))}
  </div>
);

export const FeaturesSection = () => {
  const features = FEATURES.slice(0, 6);

  return (
    <section id="features" className="section-padding bg-dark-bg">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-light-text mb-4">
            Everything you need to
            <br />
            <span className="gradient-text">ace the interview</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Built for engineers who take preparation seriously. Not another flashcard app.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Large card 1 — spans 2 columns */}
          {features[0] && (
            <motion.div variants={fadeUp} className="lg:col-span-2 group">
              <div className="h-full p-8 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors duration-300">
                <div className="text-xs font-medium text-primary/80 uppercase tracking-wider mb-3">
                  {features[0].title}
                </div>
                <h3 className="text-xl font-semibold text-light-text mb-2">
                  Adaptive AI that matches your level
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {features[0].description}
                </p>
                <CodeSnippetVisual />
              </div>
            </motion.div>
          )}

          {/* Large card 2 — spans 2 columns */}
          {features[1] && (
            <motion.div variants={fadeUp} className="lg:col-span-2 group">
              <div className="h-full p-8 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors duration-300">
                <div className="text-xs font-medium text-primary/80 uppercase tracking-wider mb-3">
                  {features[1].title}
                </div>
                <h3 className="text-xl font-semibold text-light-text mb-2">
                  Real-time voice analysis and feedback
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {features[1].description}
                </p>
                <WaveformVisual />
              </div>
            </motion.div>
          )}

          {/* 4 smaller cards */}
          {features.slice(2).map((feature) => (
            <motion.div key={feature.id} variants={fadeUp} className="group">
              <div className="h-full p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors duration-300">
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <h3 className="text-base font-semibold text-light-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ============================================================
   HOW IT WORKS — Vertical timeline, 4 steps, minimal
   ============================================================ */

const STEPS = [
  {
    number: '01',
    title: 'Upload your resume',
    description: 'Share your resume and target role. Our AI analyzes your background to generate personalized interview questions.',
  },
  {
    number: '02',
    title: 'Choose your interview type',
    description: 'Technical, behavioral, system design, or HR — select the format and difficulty that matches your goal.',
  },
  {
    number: '03',
    title: 'Practice with AI',
    description: 'Our AI interviewer adapts in real-time. Answer via voice or text, just like the real thing.',
  },
  {
    number: '04',
    title: 'Get actionable feedback',
    description: 'Receive detailed analysis on clarity, technical depth, communication style, and areas to improve.',
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding bg-dark-bg-2">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-light-text mb-4">
              How it <span className="gradient-text">works</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
              From upload to offer letter. Four simple steps that transform how you prepare.
            </p>
          </motion.div>

          {/* Right — timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-zinc-800" />

            <div className="space-y-12">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative pl-16"
                >
                  {/* Number circle */}
                  <div className="absolute left-0 top-0.5 w-10 h-10 rounded-full border border-zinc-700 bg-dark-bg-2 flex items-center justify-center">
                    <span className="text-sm font-mono font-medium text-primary">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-light-text mb-2">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
