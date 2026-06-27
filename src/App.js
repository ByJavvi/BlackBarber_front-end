import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { MainLayout } from './components/MainLayout';
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
import { CitasPage } from './components/Citas';
import { ConsultasPage } from './components/Consultas';
import { DiasHabilesPage } from './components/DiasHabiles';
import { ResenasPage } from './components/Resenas';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ROLES } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS: Sin Navbar */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/email-recuperacion" element={<EmailPasswordPage />} />

        {/* RUTAS PRIVADAS: protegidas + MainLayout (con Navbar) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard-client" element={<DashboardClient />} />
            <Route path="/promociones" element={<PromocionesPage />} />
            <Route path="/prefs-cliente" element={<PreferenciasClientePage />} />
            <Route path="/citas" element={<CitasPage />} />
            <Route path="/resenas" element={<ResenasPage />} />

            {/* Solo Admin / Barbero */}
            <Route element={<ProtectedRoute roles={[ROLES.ADMIN, ROLES.BARBERO]} />}>
              <Route path="/dashboard-barbero" element={<DashboardBarber />} />
              <Route path="/servicios" element={<ServiciosPage />} />
              <Route path="/perfumes" element={<PerfumesPage />} />
            </Route>

            {/* Solo Admin */}
            <Route element={<ProtectedRoute roles={[ROLES.ADMIN]} />}>
              <Route path="/dashboard-admin" element={<DashboardAdmin />} />
              <Route path="/barberos" element={<BarberosPage />} />
              <Route path="/consultas" element={<ConsultasPage />} />
              <Route path="/dias-habiles" element={<DiasHabilesPage />} />
              <Route path="/usuarios" element={<UsuariosPage />} />
            </Route>
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
