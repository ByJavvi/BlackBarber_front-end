// Cliente HTTP central. Todas las peticiones pasan por aquí.
// Configura la URL base en el archivo .env (REACT_APP_API_URL).

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export const USE_MOCKS = (process.env.REACT_APP_USE_MOCKS ?? 'true') !== 'false';

const TOKEN_KEY = 'bb_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
};
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

/**
 * Wrapper de fetch con base URL, JSON y Authorization automático.
 * Lanza un Error con .descripcion cuando el backend responde con error.
 */
export async function request(path, { method = 'GET', body, headers = {}, isForm = false } = {}) {
  const token = getToken();
  const finalHeaders = { ...headers };
  if (!isForm) finalHeaders['Content-Type'] = 'application/json';
  if (token) finalHeaders['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: finalHeaders,
    body: isForm ? body : body != null ? JSON.stringify(body) : undefined,
  });

  let data = null;
  const text = await res.text();
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }

  if (!res.ok) {
    const message = (data && (data.descripcion || data.message)) || `Error ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}

export const apiGet = (path, opts) => request(path, { ...opts, method: 'GET' });
export const apiPost = (path, body, opts) => request(path, { ...opts, method: 'POST', body });
