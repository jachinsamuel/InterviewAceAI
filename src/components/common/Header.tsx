'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from './Button';

interface HeaderProps {
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
  isLoggedIn?: boolean;
  userName?: string;
}

export const Header = ({
  isDarkMode = true,
  onThemeToggle,
  isLoggedIn = false,
  userName = 'User',
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'How It Works', href: '/#how-it-works' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-gray-800 bg-dark-bg/80 backdrop-blur-md">
      <nav className="container-max flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl hover:opacity-80 transition">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-black">AI</span>
          </div>
          <span className="hidden sm:inline">InterviewAce</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="nav-item text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-lg hover:bg-gray-800/50 transition"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Auth Buttons */}
          {isLoggedIn ? (
            <div className="hidden sm:flex items-center gap-3">
              <div className="px-4 py-2 text-sm font-medium text-light-text/80">
                Welcome, {userName}
              </div>
              <Button size="sm" variant="outline">
                Dashboard
              </Button>
              <Button size="sm" variant="secondary">
                Logout
              </Button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Button size="sm" variant="ghost">
                Sign In
              </Button>
              <Button size="sm" variant="primary">
                Get Started
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-800/50 rounded-lg transition"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-dark-bg-2">
          <div className="container-max py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="nav-item text-sm font-medium py-2 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-4 border-t border-gray-800">
              {isLoggedIn ? (
                <>
                  <Button size="sm" variant="secondary" className="flex-1">
                    Dashboard
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" variant="secondary" className="flex-1">
                    Sign In
                  </Button>
                  <Button size="sm" variant="primary" className="flex-1">
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
