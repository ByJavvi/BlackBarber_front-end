import { Outlet } from 'react-router-dom';
import {Navbar} from './Navbar';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-zinc-950">
      <Navbar /> 
      <main className="p-4">
        <Outlet /> {/* Aquí caen las páginas con Navbar */}
      </main>
    </div>
  );
};
