'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button, Card } from '../common/Button';
import { PRICING_TIERS } from '@/lib/constants';

export const PricingSection = () => {
  return (
    <section className="section-padding bg-dark-bg">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="badge mb-4 inline-block">Flexible Pricing</span>
          <h2 className="text-5xl sm:text-6xl font-black mb-6">
            Choose Your <span className="gradient-text">Perfect Plan</span>
          </h2>
          <p className="text-xl text-light-text/80 max-w-2xl mx-auto">
            Start free and upgrade anytime. No credit card required for the free tier.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {PRICING_TIERS.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={tier.highlighted ? 'md:col-span-2 lg:col-span-1 lg:scale-105' : ''}
            >
              <Card className={`h-full flex flex-col relative ${
                tier.highlighted ? 'border-primary/50 bg-gradient-to-b from-primary/10 to-dark-bg-2' : ''
              }`}>
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="badge">Most Popular</span>
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-light-text/60 mb-6">{tier.description}</p>

                  {/* Price */}
                  <div className="mb-8">
                    {tier.price !== null ? (
                      <div>
                        <span className="text-5xl font-black text-primary">${tier.price}</span>
                        <span className="text-light-text/60">{tier.period}</span>
                      </div>
                    ) : (
                      <div className="text-3xl font-bold">Custom Pricing</div>
                    )}
                  </div>

                  {/* CTA */}
                  <Button
                    variant={tier.highlighted ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full mb-8"
                  >
                    {tier.cta}
                  </Button>

                  {/* Features */}
                  <div className="space-y-4">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check size={20} className="text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-light-text/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-dark-bg-2 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, you can cancel your subscription anytime without any penalties or additional charges.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 30-day money-back guarantee if you\'re not satisfied with your subscription.',
              },
              {
                q: 'Can I switch between plans?',
                a: 'Absolutely! You can upgrade or downgrade your plan anytime, and we\'ll prorate the charges.',
              },
              {
                q: 'Do you offer student discounts?',
                a: 'Yes, students get 50% off any paid plan. Just verify your student email address.',
              },
            ].map((faq, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-2 text-primary">{faq.q}</h4>
                <p className="text-light-text/70">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
