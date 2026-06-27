import React, { useEffect } from 'react';

/**
 * Modal genérico con animación (backdrop fade + contenido scale-in).
 * Cierra con ESC o clic fuera. Decora con las esquinas doradas de la marca.
 */
export const Modal = ({ open, onClose, title, children, footer, size = 'md' }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full ${sizes[size]} max-h-[90vh] overflow-y-auto bg-black-barber border border-barber-gold/60 rounded-xl shadow-2xl animate-scale-in font-serif text-gray-100`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-barber-gold/30 sticky top-0 bg-black-barber/95 backdrop-blur z-10">
          <h3 className="text-xl text-barber-gold tracking-wide">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-barber-gold hover:rotate-90 transition-all duration-200"
            aria-label="Cerrar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && (
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-barber-gold/30 sticky bottom-0 bg-black-barber/95 backdrop-blur">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
