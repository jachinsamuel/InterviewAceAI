'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './Button';

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

export const Header = () => {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const userName = session?.user?.name || 'User';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/#features' },
    { label: 'How It Works', href: '/#how-it-works' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-dark-bg/80 backdrop-blur-xl">
      <nav className="container-max flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
        >
          <AceMark className="text-primary transition-opacity duration-200 group-hover:opacity-80" />
          <span className="hidden sm:inline text-[15px] font-semibold tracking-tight text-light-text">
            InterviewAce
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13px] font-medium text-light-text/50 hover:text-light-text/90 transition-colors duration-150"
              aria-label={`Navigate to ${item.label}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Auth Buttons */}
          {isLoggedIn ? (
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-[13px] text-light-text/50">
                {userName}
              </span>
              <Link href="/dashboard">
                <Button size="sm" variant="outline">
                  Dashboard
                </Button>
              </Link>
              <Button size="sm" variant="secondary" onClick={() => signOut()}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/auth/login">
                <Button size="sm" variant="ghost">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" variant="primary">
                  Get Started
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1.5 rounded-md hover:bg-white/[0.06] transition-colors duration-150 text-light-text/60"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-dark-bg-2">
          <div className="container-max py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[13px] font-medium py-2 px-2 rounded-md text-light-text/50 hover:text-light-text/90 hover:bg-white/[0.04] transition-colors duration-150"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-3 mt-2 border-t border-white/[0.06]">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="flex-1">
                    <Button size="sm" variant="secondary" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => signOut()}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="flex-1">
                    <Button size="sm" variant="secondary" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup" className="flex-1">
                    <Button size="sm" variant="primary" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
