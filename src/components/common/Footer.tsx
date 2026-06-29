'use client';

import React from 'react';
import Link from 'next/link';

const AceMark = ({ className = '' }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10 1L18.5 10L10 19L1.5 10L10 1Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M10 6L7 14H8.5L9.2 12H10.8L11.5 14H13L10 6ZM9.6 11L10 9.5L10.4 11H9.6Z"
      fill="currentColor"
    />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="border-t border-white/[0.06] bg-dark-bg-2">
      <div className="container-max py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <AceMark className="text-primary" />
              <span className="text-[15px] font-semibold tracking-tight text-light-text">
                InterviewAce
              </span>
            </div>
            <p className="text-light-text/40 text-[13px] leading-relaxed max-w-[240px]">
              AI-powered interview preparation that helps you land the role you deserve.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-[13px] font-medium text-light-text/70 uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <Link href="/interview" className="text-light-text/40 hover:text-light-text/80 transition-colors duration-150">
                  Practice Interviews
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-light-text/40 hover:text-light-text/80 transition-colors duration-150">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-light-text/40 hover:text-light-text/80 transition-colors duration-150">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[12px] text-light-text/30">
              © 2026 InterviewAce. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
