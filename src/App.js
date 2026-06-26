import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {LoginPage} from './components/LoginPage';
import {RegisterPage} from './components/RegisterPage';
import {MainLayout} from './components/MainLayout';
import { EmailPasswordPage } from './components/EmailPasswordPage';
import { NotFoundPage } from './components/NotFoundPage';
import { DashboardClient } from './components/DashboardClient';
import { DashboardAdmin } from './components/DashboardAdmin';
import { DashboardBarber } from './components/DashboardBarber';
import { ServiciosPage } from './components/Catalagos/Servicios';
import { BarberosPage } from './components/Catalagos/Barberos';
import { PerfumesPage } from './components/Catalagos/Perfumes';
import { PreferenciasClientePage } from './components/PreferenciasCliente';
import { PromocionesPage } from './components/Promociones';
import { UsuariosPage } from './components/Admin/Usuarios';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA PÚBLICA: Sin Navbar */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/email-recuperacion" element={<EmailPasswordPage />} />
        {/* RUTAS PRIVADAS: Todas estas usarán el MainLayout (con Navbar) */}
        <Route element={<MainLayout />}>
          {<Route path="/dashboard-client" element={<DashboardClient />} />}
          {<Route path="/dashboard-admin" element={<DashboardAdmin />} />}
          {<Route path="/dashboard-barbero" element={<DashboardBarber />} />}
          {<Route path="/servicios" element={<ServiciosPage />} />}
          {<Route path="/barberos" element={<BarberosPage />} />}
          {<Route path="/perfumes" element={<PerfumesPage />} />}
          {<Route path="/promociones" element={<PromocionesPage />} />}
          {<Route path="/prefs-cliente" element={<PreferenciasClientePage />} />}
          {<Route path="/usuarios" element={<UsuariosPage />} />}
        </Route>

        {/* Ruta para errores 404 opcional */}
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
