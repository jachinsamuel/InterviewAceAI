'use client';

import React from 'react';
import { motion } from 'framer-motion';

const CAPABILITIES = [
  {
    title: 'AI-Powered Interviews',
    description:
      'Practice with an AI interviewer that adapts to your experience level. Get technical, behavioral, and system design questions tailored to your target role.',
    icon: (
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
        <div className="w-4 h-4 rounded-md bg-primary/60 rotate-45" />
      </div>
    ),
  },
  {
    title: 'Real-Time Feedback',
    description:
      'Receive instant analysis on your answers as you go. Our AI evaluates clarity, technical depth, and communication style — so you know exactly what to improve.',
    icon: (
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
        <div className="flex gap-0.5 items-end h-4">
          <div className="w-1 h-2 rounded-full bg-primary/60" />
          <div className="w-1 h-3 rounded-full bg-primary/60" />
          <div className="w-1 h-4 rounded-full bg-primary/60" />
        </div>
      </div>
    ),
  },
  {
    title: 'Track Your Progress',
    description:
      'Review past sessions, see how your scores evolve over time, and identify recurring weak spots. Structured practice leads to measurable improvement.',
    icon: (
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
        <div className="w-4 h-4 rounded-full border-2 border-primary/60 border-t-transparent" />
      </div>
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const CapabilitiesSection = () => {
  return (
    <section className="section-padding bg-dark-bg">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-light-text mb-4">
            What you <span className="gradient-text">get</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto">
            Everything you need to walk into your next interview with confidence.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {CAPABILITIES.map((cap, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="h-full p-8 rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm flex flex-col">
                {cap.icon}

                <h3 className="text-lg font-semibold text-light-text mb-3">
                  {cap.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
