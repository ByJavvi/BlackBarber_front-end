import React, { createContext, useCallback, useContext, useState } from 'react';

const ToastContext = createContext(null);

const ICONS = {
  success: 'M5 13l4 4L19 7',
  error: 'M6 18L18 6M6 6l12 12',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
};

const STYLES = {
  success: 'border-green-500/50 text-green-300',
  error: 'border-red-500/50 text-red-300',
  info: 'border-barber-gold/50 text-barber-gold',
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const push = useCallback((message, type = 'success', duration = 3200) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => remove(id), duration);
  }, [remove]);

  const toast = {
    success: (m) => push(m, 'success'),
    error: (m) => push(m, 'error'),
    info: (m) => push(m, 'info'),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-80 max-w-[90vw]">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="alert"
            className={`flex items-start gap-3 bg-black-barber/95 backdrop-blur border ${STYLES[t.type]} rounded-lg shadow-lg px-4 py-3 animate-slide-in-right`}
          >
            <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={ICONS[t.type]} />
            </svg>
            <p className="text-sm text-gray-100 flex-1">{t.message}</p>
            <button onClick={() => remove(t.id)} className="text-gray-500 hover:text-gray-200 transition" aria-label="Cerrar">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast debe usarse dentro de <ToastProvider>');
  return ctx;
};
