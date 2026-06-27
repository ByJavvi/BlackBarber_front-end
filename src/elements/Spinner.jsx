import React from 'react';

export const Spinner = ({ className = 'w-8 h-8', label }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-10 text-barber-gold">
    <svg className={`${className} animate-spin-slow`} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
    {label && <span className="text-sm text-gray-400 animate-pulse">{label}</span>}
  </div>
);

/** Filas esqueleto para tablas durante la carga. */
export const SkeletonRows = ({ cols = 5, rows = 4 }) => (
  <tbody className="divide-y divide-gray-700">
    {Array.from({ length: rows }).map((_, r) => (
      <tr key={r}>
        {Array.from({ length: cols }).map((__, c) => (
          <td key={c} className="px-2 py-3 border-r border-gray-700/50">
            <div className="h-4 rounded skeleton" />
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);

/** Estado vacío reutilizable. */
export const EmptyState = ({ message = 'Sin registros por ahora', icon = true }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-12 text-gray-500 animate-fade-in">
    {icon && (
      <svg className="w-12 h-12 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    )}
    <p className="text-sm">{message}</p>
  </div>
);
