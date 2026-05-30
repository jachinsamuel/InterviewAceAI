'use client';

import React from 'react';
import Link from 'next/link';
import { Code, Heart, Briefcase, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-dark-bg-2">
      <div className="container-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-black">AI</span>
              </div>
              <span className="font-bold text-lg">InterviewAce</span>
            </div>
            <p className="text-light-text/60 text-sm">
              Master every interview with AI-powered preparation
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-light-text/60">
              <li>
                <Link href="/#features" className="hover:text-primary transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-primary transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="hover:text-primary transition">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-light-text/60">
              <li>
                <Link href="/about" className="hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-primary transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-light-text/60">
              <li>
                <Link href="/privacy" className="hover:text-primary transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-primary transition">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-primary transition">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Copyright */}
            <p className="text-sm text-light-text/60">
              © 2025 InterviewAce AI. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a
                href="https://twitter.com/interviewace"
                className="text-light-text/60 hover:text-primary transition"
                aria-label="Twitter"
              >
                <Heart size={18} />
              </a>
              <a
                href="https://github.com/interviewace"
                className="text-light-text/60 hover:text-primary transition"
                aria-label="GitHub"
              >
                <Code size={18} />
              </a>
              <a
                href="https://linkedin.com/company/interviewace"
                className="text-light-text/60 hover:text-primary transition"
                aria-label="LinkedIn"
              >
                <Briefcase size={18} />
              </a>
              <a
                href="mailto:hello@interviewace.ai"
                className="text-light-text/60 hover:text-primary transition"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
