import React from 'react';

const baseInput =
  'w-full rounded-md border-2 border-[#f1d7ba]/60 focus:border-barber-gold bg-transparent px-3 py-2 outline-none transition-colors duration-200 text-gray-100 placeholder:text-gray-500';

export const Field = ({ label, error, children, className = '' }) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    {label && <label className="text-barber-gold text-sm">{label}</label>}
    {children}
    {error && <span className="text-xs text-red-400 animate-fade-in">{error}</span>}
  </div>
);

export const Input = ({ label, error, className = '', ...props }) => (
  <Field label={label} error={error}>
    <input className={`${baseInput} ${error ? 'border-red-500/70' : ''} ${className}`} {...props} />
  </Field>
);

export const Textarea = ({ label, error, className = '', ...props }) => (
  <Field label={label} error={error}>
    <textarea className={`${baseInput} resize-y min-h-[90px] ${error ? 'border-red-500/70' : ''} ${className}`} {...props} />
  </Field>
);

export const Select = ({ label, error, children, className = '', ...props }) => (
  <Field label={label} error={error}>
    <select className={`${baseInput} ${className}`} {...props}>
      {children}
    </select>
  </Field>
);

/** Selector de calificación interactivo (1-5 estrellas). */
export const StarRating = ({ value = 0, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        onClick={() => onChange?.(n)}
        className="transition-transform duration-150 hover:scale-125 active:scale-95"
        aria-label={`${n} estrellas`}
      >
        <svg
          className={`w-7 h-7 ${n <= value ? 'text-barber-gold' : 'text-zinc-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.36 4.18a1 1 0 00.95.69h4.4c.97 0 1.37 1.24.59 1.81l-3.56 2.59a1 1 0 00-.36 1.12l1.36 4.18c.3.92-.75 1.69-1.54 1.12l-3.56-2.59a1 1 0 00-1.18 0l-3.56 2.59c-.79.57-1.84-.2-1.54-1.12l1.36-4.18a1 1 0 00-.36-1.12L1.4 9.61c-.78-.57-.38-1.81.59-1.81h4.4a1 1 0 00.95-.69L9.05 2.93z" />
        </svg>
      </button>
    ))}
  </div>
);
