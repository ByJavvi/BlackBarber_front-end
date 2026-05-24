import React from 'react';

export const ProgressBar = ({ percentage = 60 }) => {
  return (
    <div className="w-full px-2">
      <div className="w-full h-3 bg-gradient-to-b from-zinc-800 to-zinc-950 rounded-full border border-amber-500/20 p-[2px] shadow-inner">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-amber-600 via-[#E4A14E] to-amber-300 shadow-[0_0_12px_rgba(228,161,78,0.4)] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />

      </div>
    </div>
  );
};