import React from 'react';

/**
 * Button Component - Primary
 */
export const ButtonPrimary = ({ children, onClick, disabled, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-lg font-semibold transition-all disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
);

/**
 * Button Component - Secondary
 */
export const ButtonSecondary = ({ children, onClick, disabled, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-6 py-3 bg-secondary hover:bg-secondary/80 text-white rounded-lg font-semibold transition-all disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
);

/**
 * Button Component - Outline
 */
export const ButtonOutline = ({ children, onClick, disabled, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-6 py-3 border-2 border-primary text-primary hover:bg-primary/10 rounded-lg font-semibold transition-all disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
);

/**
 * Button Component - Danger
 */
export const ButtonDanger = ({ children, onClick, disabled, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
);

/**
 * Button Component - Like
 */
export const ButtonLike = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-16 h-16 rounded-full bg-accent-like/20 hover:bg-accent-like/30 text-accent-like text-2xl font-bold transition-all disabled:opacity-50 flex items-center justify-center"
  >
    ❤️
  </button>
);

/**
 * Button Component - Skip
 */
export const ButtonSkip = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-16 h-16 rounded-full bg-accent-skip/20 hover:bg-accent-skip/30 text-accent-skip text-2xl font-bold transition-all disabled:opacity-50 flex items-center justify-center"
  >
    ✕
  </button>
);
