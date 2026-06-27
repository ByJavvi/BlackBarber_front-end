import React from 'react';

/**
 * Tarjeta de KPI con animación de entrada y micro-hover.
 * `delay` (ms) escalona la aparición de varias tarjetas.
 */
export const KpiCard = ({ title, value, hint, icon, tone = 'gold', delay = 0, progress }) => {
  const tones = {
    gold: 'text-barber-gold',
    green: 'text-green-400',
    blue: 'text-blue-400',
    red: 'text-red-400',
  };
  return (
    <div
      className="group border border-gray-700 hover:border-barber-gold/60 rounded-xl p-5 bg-zinc-900/60 hover:bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs uppercase tracking-wider text-gray-400">{title}</p>
        {icon && (
          <svg className={`w-5 h-5 ${tones[tone]} opacity-70 group-hover:opacity-100 group-hover:scale-110 transition`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
          </svg>
        )}
      </div>
      <p className={`text-3xl md:text-4xl font-bold mt-2 ${tones[tone]}`}>{value}</p>
      {hint && <p className="text-sm text-gray-500 mt-1">{hint}</p>}
      {typeof progress === 'number' && (
        <div className="w-full h-2 mt-4 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-barber-gold-dark to-barber-gold rounded-full transition-all duration-700" style={{ width: `${Math.min(100, progress)}%` }} />
        </div>
      )}
    </div>
  );
};
