import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {LoginPage} from './components/LoginPage';
import {RegisterPage} from './components/RegisterPage';
import {MainLayout} from './components/MainLayout';
import { EmailPasswordPage } from './components/EmailPasswordPage';
import { NotFoundPage } from './components/NotFoundPage';

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
          {/* <Route path="/" element={<Dashboard />} />
          <Route path="/citas" element={<Citas />} />
          <Route path="/barberos" element={<Barberos />} /> */}
        </Route>

        {/* Ruta para errores 404 opcional */}
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
