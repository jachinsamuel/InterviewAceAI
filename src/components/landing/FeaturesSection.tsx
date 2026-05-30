'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES } from '@/lib/constants';
import * as Icons from 'lucide-react';
import { Card } from '../common/Button';

export const FeaturesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="features" className="section-padding bg-dark-bg-2">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge mb-4 inline-block">10+ Premium Features</span>
          <h2 className="text-5xl sm:text-6xl font-black mb-6">
            Everything You Need to <span className="gradient-text">Ace Every Interview</span>
          </h2>
          <p className="text-xl text-light-text/80 max-w-2xl mx-auto">
            From technical interviews to HR rounds, our AI-powered platform covers all aspects
            of interview preparation with real-time feedback and analytics.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {FEATURES.map((feature) => {
            const IconComponent = Icons[feature.icon as keyof typeof Icons] as any;

            return (
              <motion.div key={feature.id} variants={itemVariants}>
                <Card className="h-full hover:border-primary/50">
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                      <IconComponent size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-light-text/70 flex-1">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-light-text/60 mb-4">
            Ready to transform your interview preparation?
          </p>
          <button className="btn-primary">Start Your First Interview</button>
        </motion.div>
      </div>
    </section>
  );
};

export const HowItWorksSection = () => {
  const HOW_IT_WORKS = [
    {
      step: 1,
      title: 'Upload Your Resume',
      description: 'Start by uploading your resume for AI analysis and skill extraction',
    },
    {
      step: 2,
      title: 'Choose Role & Skills',
      description: 'Select your target role and the specific skills you want to practice',
    },
    {
      step: 3,
      title: 'AI Conducts Interview',
      description: 'Realistic AI interviewer asks adaptive questions tailored to you',
    },
    {
      step: 4,
      title: 'Answer via Voice or Text',
      description: 'Respond naturally as you would in a real interview setting',
    },
    {
      step: 5,
      title: 'Receive Detailed Feedback',
      description: 'Get comprehensive analysis on your performance and areas to improve',
    },
    {
      step: 6,
      title: 'Improve and Retry',
      description: 'Practice again with improved difficulty and new questions',
    },
  ];

  return (
    <section id="how-it-works" className="section-padding bg-dark-bg">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge mb-4 inline-block">Simple 6-Step Process</span>
          <h2 className="text-5xl sm:text-6xl font-black mb-6">
            How <span className="gradient-text">InterviewAce</span> Works
          </h2>
          <p className="text-xl text-light-text/80 max-w-2xl mx-auto">
            Get started in minutes and begin mastering interviews with our intuitive platform
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Step Connector */}
              {index < HOW_IT_WORKS.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-8 w-8 h-0.5 bg-primary/20" />
              )}

              <Card className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center font-bold text-white">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-light-text/70">{item.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
