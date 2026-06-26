import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const MainLayout = () => {
  // En PC inicia abierto (true), en móvil colapsado (false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col">      
      <Navbar onMenuClick={toggleSidebar} />
      
      <div className="flex flex-1 relative pt-16"> 
        
        {/* ASIDE CON COMPORTAMIENTO DUAL INTELIGENTE */}
        <aside className={`
          fixed left-0 z-40 bg-black-barber transition-all duration-300 ease-in-out
          /* =========================================================
             1. COMPORTAMIENTO MÓVIL (Cortina arriba -> abajo)
             ========================================================= */
          top-16 right-0 border-b border-barber-gold
          ${isSidebarOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0 pointer-events-none'
          }
          /* =========================================================
             2. COMPORTAMIENTO COMPUTADORA (Sidebar izquierda -> derecha)
             ========================================================= */
          md:top-16 md:bottom-0 md:right-auto md:w-40 md:border-r md:border-b-0
          md:opacity-100 md:pointer-events-auto md:translate-y-0
          ${isSidebarOpen 
            ? 'md:translate-x-0' 
            : 'md:-translate-x-full'
          }
        `}>
          <nav className="p-2 space-y-2">
            <a href="dashboard" className="block px-4 py-2 rounded hover:bg-zinc-800 text-stone-300 hover:text-white">Inicio</a>
            <a href="servicios" className="block px-4 py-2 rounded hover:bg-zinc-800 text-stone-300 hover:text-white">Servicios</a>
            <a href="barberos" className="block px-4 py-2 rounded hover:bg-zinc-800 text-stone-300 hover:text-white">Barberos</a>
            <a href="perfumes" className="block px-4 py-2 rounded hover:bg-zinc-800 text-stone-300 hover:text-white">Perfumes</a>
            <a href="promociones" className="block px-4 py-2 rounded hover:bg-zinc-800 text-stone-300 hover:text-white">Promociones</a>
            <a href="usuarios" className="block px-4 py-2 rounded hover:bg-zinc-800 text-stone-300 hover:text-white">Usuarios</a>
          </nav>
        </aside>

        {/* BACKDROP (Fondo oscuro): Solo se activa si está abierto en Móvil */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 top-16 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* CONTENIDO PRINCIPAL: Su margen cambia dinámicamente en PC */}
        <main className={`
          flex-1 transition-all duration-300 
          ${isSidebarOpen ? 'md:ml-40' : 'md:ml-0'}
        `}>
          <Outlet />
        </main>

      </div>
    </div>
  );
};