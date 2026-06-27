import React from 'react';

/** Píldora de estatus. `active` decide color verde / gris. */
export const StatusBadge = ({ active, activeLabel = 'Activo', inactiveLabel = 'Inactivo' }) => (
  <span
    className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-center border transition-colors duration-200 ${
      active
        ? 'bg-green-500/15 text-green-300 border-green-500/50'
        : 'bg-zinc-600/20 text-zinc-300 border-zinc-500/50'
    }`}
  >
    {active ? activeLabel : inactiveLabel}
  </span>
);

/** Badge con color y texto arbitrarios (estados de cita, etc.). */
export const Badge = ({ children, tone = 'gold' }) => {
  const tones = {
    gold: 'bg-barber-gold/15 text-barber-gold border-barber-gold/50',
    green: 'bg-green-500/15 text-green-300 border-green-500/50',
    blue: 'bg-blue-500/15 text-blue-300 border-blue-500/50',
    red: 'bg-red-500/15 text-red-300 border-red-500/50',
    gray: 'bg-zinc-600/20 text-zinc-300 border-zinc-500/50',
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${tones[tone]}`}>
      {children}
    </span>
  );
};

/** Estrellas para calificaciones (lectura). */
export const Stars = ({ value = 0, size = 'w-4 h-4' }) => (
  <span className="inline-flex gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <svg
        key={n}
        className={`${size} ${n <= value ? 'text-barber-gold' : 'text-zinc-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.36 4.18a1 1 0 00.95.69h4.4c.97 0 1.37 1.24.59 1.81l-3.56 2.59a1 1 0 00-.36 1.12l1.36 4.18c.3.92-.75 1.69-1.54 1.12l-3.56-2.59a1 1 0 00-1.18 0l-3.56 2.59c-.79.57-1.84-.2-1.54-1.12l1.36-4.18a1 1 0 00-.36-1.12L1.4 9.61c-.78-.57-.38-1.81.59-1.81h4.4a1 1 0 00.95-.69L9.05 2.93z" />
      </svg>
    ))}
  </span>
);
