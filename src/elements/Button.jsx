import React from 'react';

/**
 * Botón con microinteracciones (hover, active:scale, estado de carga con spinner).
 */
export const Button = ({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium px-4 py-2 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-barber-gold/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';
  const variants = {
    primary: 'bg-barber-gold-dark hover:bg-barber-gold text-gray-50 hover:shadow-[0_0_14px_rgba(228,161,78,0.45)]',
    ghost: 'bg-transparent border border-barber-gold/40 text-barber-gold hover:bg-barber-gold/10',
    danger: 'bg-red-600/80 hover:bg-red-500 text-white',
    subtle: 'bg-zinc-800 hover:bg-zinc-700 text-gray-200',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="w-4 h-4 animate-spin-slow" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      {children}
    </button>
  );
};
