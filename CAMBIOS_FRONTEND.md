# BlackBarber Front-End — Complemento listo para consumir el backend

Se mantuvo **React + Tailwind** (CRA) y la identidad visual existente (negro/dorado, esquinas, tipografía serif). Se añadieron animaciones, microinteracciones, modales, páginas faltantes y una capa de datos lista para conectar a tu API.

## Cómo correr

```bash
cd BlackBarber_front-end
npm install
cp .env.example .env   # ajusta la URL si hace falta
npm start
```

## Conectar el backend real (1 cambio)

Toda la app consume datos a través de la fachada `src/api/index.js`, que decide entre **mocks** y **backend real** según `.env`:

```
REACT_APP_API_URL=http://localhost:5000   # URL base de tu BlackBarberAPI
REACT_APP_USE_MOCKS=true                   # cámbialo a "false" para usar el backend real
```

Con `REACT_APP_USE_MOCKS=false` las mismas pantallas empiezan a llamar los endpoints reales definidos en `src/api/endpoints.js` (los 45 endpoints del swagger ya están mapeados). No hay que tocar componentes.

> Mientras esté en `true`, los datos son simulados (`src/mocks/data.js`) y el CRUD funciona en memoria para que puedas navegar el flujo completo.

## Credenciales de prueba (modo mock)

El login acepta cualquier contraseña; el rol depende del correo:

- `yahiradmin@gmail.com` → **Admin** (ve todo)
- `carlos@blackbarber.com` → **Barbero**
- `mariana@gmail.com` → **Cliente**

## Estructura nueva

```
src/
├── api/
│   ├── client.js        # fetch + base URL + token JWT + manejo de errores
│   ├── endpoints.js     # los 45 endpoints del swagger, agrupados por controlador
│   └── index.js         # fachada: alterna mock / backend real de forma transparente
├── mocks/data.js        # datos simulados alineados a los DTOs
├── context/
│   ├── AuthContext.jsx  # sesión, token y redirección por rol
│   └── ToastContext.jsx # notificaciones animadas
├── elements/
│   ├── Modal.jsx, Button.jsx, ConfirmDialog.jsx,
│   ├── Spinner.jsx (Spinner + SkeletonRows + EmptyState),
│   ├── Badge.jsx (StatusBadge, Badge, Stars), FormField.jsx, KpiCard.jsx
└── utils/file.js        # base64 de imágenes, formato de moneda/fecha
```

## Qué se agregó / mejoró

**Autenticación y ruteo**
- `AuthContext` + `ProtectedRoute` con control de acceso por rol (Admin / Barbero / Cliente).
- Login, Registro y Recuperación con estado controlado, validación en vivo, medidor de fuerza de contraseña y feedback con toasts.

**Animaciones y microinteracciones (Tailwind/CSS puro, sin dependencias nuevas)**
- Keyframes en `tailwind.config.js`: fade-in, fade-in-up/down, scale-in, slide-in, shimmer, gold-glow, spin.
- Hover/active en botones y filas, transiciones de menú, skeletons con shimmer, scrollbar dorada y respeto a `prefers-reduced-motion`.

**Modales y CRUD**
- Servicios (con panel de añadidos y subida de imagen), Barberos (+ asignar perfil de usuario), Perfumes (imagen base64), Promociones, Usuarios (alta/edición/bloqueo), Citas (agendado con verificación de disponibilidad), Reseñas. Confirmación de borrado reutilizable.

**Páginas nuevas / completadas**
- `DashboardAdmin` y `DashboardBarber` (antes eran stubs) con KPIs del swagger.
- `DashboardClient` con historial de citas y preferencias.
- Nuevas: **Citas**, **Consultas** (buzón de contacto), **Días hábiles** (horarios) y **Reseñas**.
- `PreferenciasCliente` ahora es interactiva y persiste vía API.

## Nota
La estructura de respuesta asumida es `RespuestaDTO { estatus, descripcion }` y `RespuestaAutenticacionDTO { estatus, token }`. Si tu login devuelve además los datos del usuario (id, idRol, idBarbero), pásalos en la respuesta para que la redirección por rol y los dashboards usen el id real; si no, ajusta el mapeo en `src/components/LoginPage.jsx` y `src/context/AuthContext.jsx`.
```
