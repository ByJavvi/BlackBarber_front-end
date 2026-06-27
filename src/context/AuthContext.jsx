import React, { createContext, useContext, useEffect, useState } from 'react';
import { clearToken, getToken } from '../api/client';

const AuthContext = createContext(null);

// Roles: 1 = Admin, 2 = Barbero, 3 = Cliente
export const ROLES = { ADMIN: 1, BARBERO: 2, CLIENTE: 3 };

const STORE_KEY = 'bb_user';

const loadUser = () => {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadUser);

  useEffect(() => {
    if (user) localStorage.setItem(STORE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORE_KEY);
  }, [user]);

  const login = (usuario) => setUser(usuario);

  const logout = () => {
    clearToken();
    setUser(null);
  };

  const isAuthenticated = !!getToken() && !!user;

  const homeFor = (rol) => {
    if (rol === ROLES.ADMIN) return '/dashboard-admin';
    if (rol === ROLES.BARBERO) return '/dashboard-barbero';
    return '/dashboard-client';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, homeFor }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
};
