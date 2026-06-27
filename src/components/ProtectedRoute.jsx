import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Protege rutas privadas. Si no hay sesión, redirige a /login.
 * Opcionalmente restringe por rol (array de idRol permitidos).
 */
export const ProtectedRoute = ({ roles }) => {
  const { isAuthenticated, user, homeFor } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user?.idRol)) {
    return <Navigate to={homeFor(user?.idRol)} replace />;
  }
  return <Outlet />;
};
