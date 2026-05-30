'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      isLoading = false,
      className = '',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-primary text-white hover:opacity-90',
      secondary: 'bg-dark-bg-2 text-light-text border border-gray-700 hover:border-primary',
      outline: 'bg-transparent text-primary border border-primary hover:bg-primary/10',
      ghost: 'bg-transparent text-light-text hover:bg-white/10',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {isLoading ? <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full" /> : icon}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'light';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, variant = 'default', className = '', ...props }, ref) => {
    const styles = {
      default: 'input-field',
      light: 'input-field-light',
    };

    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium mb-2">{label}</label>}
        <input ref={ref} className={`${styles[variant]} ${className}`} {...props} />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'light' | 'glass';
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    const styles = {
      default: 'card',
      light: 'card-light',
      glass: 'glass-effect',
    };

    return (
      <div ref={ref} className={`${styles[variant]} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

interface DropdownProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  error?: string;
}

export const Dropdown = ({ label, value, options, onChange, error }: DropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="input-field flex items-center justify-between bg-dark-bg-2 border border-gray-700 text-light-text"
      >
        <span>{options.find((opt) => opt.value === value)?.label || label}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-dark-bg-2 border border-gray-700 rounded-lg overflow-hidden z-50">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-light-text hover:bg-primary/20 transition-colors"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Badge = ({ children, className = '', ...props }: BadgeProps) => {
  return (
    <div className={`badge ${className}`} {...props}>
      {children}
    </div>
  );
};

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner = ({ size = 'md' }: LoadingSpinnerProps) => {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className={`${sizes[size]} border-primary/30 border-t-primary rounded-full animate-spin`} />
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children, footer }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dark-bg-2 rounded-xl max-w-md w-full border border-gray-700 animate-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
        {footer && <div className="p-6 border-t border-gray-700 flex gap-3">{footer}</div>}
      </div>
    </div>
  );
};
