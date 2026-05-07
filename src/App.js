import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {LoginPage} from './components/LoginPage'
import {MainLayout} from './components/MainLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA PÚBLICA: Sin Navbar */}
        <Route path="/login" element={<LoginPage />} />

        {/* RUTAS PRIVADAS: Todas estas usarán el MainLayout (con Navbar) */}
        <Route element={<MainLayout />}>
          {/* <Route path="/" element={<Dashboard />} />
          <Route path="/citas" element={<Citas />} />
          <Route path="/barberos" element={<Barberos />} /> */}
        </Route>

        {/* Ruta para errores 404 opcional */}
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
