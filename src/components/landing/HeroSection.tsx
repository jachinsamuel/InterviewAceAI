'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const } },
};

const CONVERSATION = [
  { role: 'interviewer', text: "Let's start with system design. How would you design a URL shortener that handles 100M daily requests?" },
  { role: 'candidate', text: "I'd begin by clarifying requirements — read-heavy workload, so I'd optimize for fast lookups. I'd use a hash-based approach with Base62 encoding…" },
  { role: 'interviewer', text: "Good start. How would you handle collisions in your hashing strategy?" },
  { role: 'candidate', text: "I'd use a combination of a counter-based approach with MD5 hashing, then check for collisions in the database before confirming…" },
  { role: 'feedback', text: "Clarity: Excellent · Structure: Strong · Depth: 8/10 — consider discussing cache invalidation strategy" },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 bg-dark-bg">
      {/* Subtle gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px]" />
      </div>


      <div className="container-max relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-[4.5rem] font-bold leading-[1.08] tracking-tight text-center mb-6"
          >
            <span className="text-light-text">Stop practicing alone.</span>
            <br />
            <span className="gradient-text">Start practicing right.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-lg text-zinc-400 text-center max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Interview prep that actually works. Our AI conducts realistic mock interviews, 
            analyzes your responses in real-time, and gives you the feedback that gets you hired.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-20"
          >
            <Link href="/interview">
              <Button size="lg" variant="primary" className="group">
                Start Free Interview
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="secondary">
                See how it works
              </Button>
            </Link>
          </motion.div>

          {/* Interview mockup — terminal style */}
          <motion.div
            variants={fadeUp}
            className="relative max-w-3xl mx-auto"
          >
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl shadow-black/40">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800/80 bg-zinc-900/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                </div>
                <span className="text-xs text-zinc-500 ml-2 font-mono">interview-session — system-design</span>
              </div>

              {/* Conversation */}
              <div className="p-5 space-y-4 font-mono text-sm max-h-[340px] overflow-hidden">
                {CONVERSATION.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.3, duration: 0.5 }}
                  >
                    {msg.role === 'interviewer' && (
                      <div className="flex gap-3">
                        <span className="text-primary shrink-0 select-none">AI ›</span>
                        <span className="text-zinc-300">{msg.text}</span>
                      </div>
                    )}
                    {msg.role === 'candidate' && (
                      <div className="flex gap-3 pl-2">
                        <span className="text-zinc-500 shrink-0 select-none">You ›</span>
                        <span className="text-zinc-400">{msg.text}</span>
                      </div>
                    )}
                    {msg.role === 'feedback' && (
                      <div className="mt-2 px-3 py-2 rounded-md bg-primary/[0.08] border border-primary/20">
                        <span className="text-primary/80 text-xs">{msg.text}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Bottom fade */}
              <div className="h-8 bg-gradient-to-t from-zinc-950 to-transparent -mt-8 relative z-10" />
            </div>

            {/* Glow behind mockup */}
            <div className="absolute -inset-4 bg-primary/[0.03] rounded-2xl blur-2xl -z-10" />
          </motion.div>

          {/* Honest feature badges */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-3 mt-16 pt-12 border-t border-zinc-800/50"
          >
            {['100% Free', 'No Credit Card Required', 'Unlimited Practice'].map((badge, i) => (
              <div
                key={i}
                className="px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 font-medium"
              >
                {badge}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
