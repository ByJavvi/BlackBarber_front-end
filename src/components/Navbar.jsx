import React from 'react';
import esquina from '../assets/esquina.svg'

export const Navbar = ({ onMenuClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-black-barber border-b border-barber-gold pl-4 flex items-center justify-between z-50">
      
      {/* Sección Izquierda: Botón Hamburguesa + Nombre */}
      <div className="flex items-center gap-4">
        {/* Botón menú: Solo se ve en móviles (hidden md:block lo esconde en PC) */}
        <button 
          onClick={onMenuClick}
          className="text-barber-gold-dark p-2 hover:text-barber-gold hover:bg-zinc-800 rounded transition duration-200"
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <span className="font-serif text-xl tracking-wider text-gray-50 font-bold select-none">
          BLACK BARBER
        </span>
      </div>

      {/* Sección Derecha: Usuario / Cerrar Sesión */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-stone-400 hidden sm:inline">Bienvenido</span>
        <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-barber-gold flex items-center justify-center text-barber-gold font-bold text-sm">
          U
        </div>
        <img src={esquina} alt="Esquina" className='w-14 h-14 -rotate-90 p-1'/>
      </div>

    </header>
  );
};