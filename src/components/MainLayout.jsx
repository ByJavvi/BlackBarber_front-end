import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useAuth, ROLES } from '../context/AuthContext';

const I = {
  home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  scissors: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z',
  user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  perfume: 'M9 3h6v3H9zM7 9a3 3 0 013-3h4a3 3 0 013 3v9a3 3 0 01-3 3h-4a3 3 0 01-3-3z',
  promo: 'M7 7h.01M7 3h5a2 2 0 011.41.59l7 7a2 2 0 010 2.82l-5 5a2 2 0 01-2.82 0l-7-7A2 2 0 013 11V6a3 3 0 013-3z',
  calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  star: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  inbox: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4',
  clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  users: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4z',
};

const MENU = {
  [ROLES.ADMIN]: [
    { to: '/dashboard-admin', label: 'Inicio', icon: I.home },
    { to: '/servicios', label: 'Servicios', icon: I.scissors },
    { to: '/barberos', label: 'Barberos', icon: I.user },
    { to: '/perfumes', label: 'Perfumes', icon: I.perfume },
    { to: '/promociones', label: 'Promociones', icon: I.promo },
    { to: '/citas', label: 'Citas', icon: I.calendar },
    { to: '/resenas', label: 'Reseñas', icon: I.star },
    { to: '/consultas', label: 'Consultas', icon: I.inbox },
    { to: '/dias-habiles', label: 'Horarios', icon: I.clock },
    { to: '/usuarios', label: 'Usuarios', icon: I.users },
  ],
  [ROLES.BARBERO]: [
    { to: '/dashboard-barbero', label: 'Inicio', icon: I.home },
    { to: '/citas', label: 'Mi agenda', icon: I.calendar },
    { to: '/servicios', label: 'Servicios', icon: I.scissors },
    { to: '/promociones', label: 'Promociones', icon: I.promo },
    { to: '/resenas', label: 'Reseñas', icon: I.star },
  ],
  [ROLES.CLIENTE]: [
    { to: '/dashboard-client', label: 'Inicio', icon: I.home },
    { to: '/promociones', label: 'Promociones', icon: I.promo },
    { to: '/prefs-cliente', label: 'Mis preferencias', icon: I.user },
  ],
};

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => (typeof window !== 'undefined' ? window.innerWidth >= 768 : true));
  const { user } = useAuth();
  const items = MENU[user?.idRol] || MENU[ROLES.CLIENTE];

  const toggleSidebar = () => setIsSidebarOpen((v) => !v);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-barber-gold/15 text-barber-gold border-l-2 border-barber-gold'
        : 'text-stone-300 hover:bg-zinc-800 hover:text-white hover:translate-x-1'
    }`;

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col">
      <Navbar onMenuClick={toggleSidebar} />

      <div className="flex flex-1 relative pt-16">
        <aside className={`
          fixed left-0 z-40 bg-black-barber transition-all duration-300 ease-in-out
          top-16 right-0 border-b border-barber-gold
          ${isSidebarOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
          md:top-16 md:bottom-0 md:right-auto md:w-52 md:border-r md:border-b-0
          md:opacity-100 md:pointer-events-auto md:translate-y-0
          ${isSidebarOpen ? 'md:translate-x-0' : 'md:-translate-x-full'}
        `}>
          <nav className="p-3 space-y-1">
            {items.map((it) => (
              <NavLink key={it.to} to={it.to} className={linkClass} onClick={() => { if (window.innerWidth < 768) setIsSidebarOpen(false); }}>
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={it.icon} />
                </svg>
                <span className="text-sm">{it.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 top-16 md:hidden animate-fade-in" onClick={toggleSidebar} />
        )}

        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-52' : 'md:ml-0'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
