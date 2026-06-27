import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import esquina from '../assets/esquina.svg';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const inicial = (user?.username || 'U').charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-black-barber border-b border-barber-gold pl-4 flex items-center justify-between z-50 animate-fade-in-down">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="text-barber-gold-dark p-2 hover:text-barber-gold hover:bg-zinc-800 rounded transition-all duration-200 active:scale-90"
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="font-serif text-xl tracking-wider text-gray-50 font-bold select-none">BLACK BARBER</span>
      </div>

      <div className="flex items-center gap-2 relative" ref={ref}>
        <span className="text-sm text-stone-400 hidden sm:inline">Bienvenido{user?.username ? `, ${user.username}` : ''}</span>
        <button
          onClick={() => setOpen(!open)}
          className="w-9 h-9 rounded-full bg-amber-500/20 border border-barber-gold flex items-center justify-center text-barber-gold font-bold text-sm hover:bg-amber-500/30 hover:scale-105 transition-all duration-200"
        >
          {inicial}
        </button>
        <img src={esquina} alt="" className="w-14 h-14 -rotate-90 p-1" />

        {open && (
          <div className="absolute right-2 top-14 w-52 bg-black-barber border border-barber-gold/50 rounded-lg shadow-2xl py-1 animate-scale-in origin-top-right font-serif z-50">
            <div className="px-4 py-2 border-b border-barber-gold/20">
              <p className="text-gray-100 text-sm font-medium truncate">{user?.username || 'Invitado'}</p>
              <p className="text-gray-500 text-xs truncate">{user?.correo || ''}</p>
            </div>
            <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-left text-stone-300 hover:bg-zinc-800 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
