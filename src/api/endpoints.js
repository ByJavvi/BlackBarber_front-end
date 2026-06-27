// Mapa de TODOS los endpoints del backend (swagger BlackBarberAPI).
// Cada función arma la ruta/método; el cuerpo se documenta con el DTO esperado.
import { apiGet, apiPost } from './client';

/* ===================== Usuario ===================== */
export const usuarioEndpoints = {
  // CredencialesUsuarioDTO { email, contrasena } -> RespuestaAutenticacionDTO { estatus, token }
  login: (cred) => apiPost('/api/usuario/login', cred),
  // UsuarioCreacionDTO { username, correo, contrasena }
  crear: (dto) => apiPost('/api/usuario/crearUsuario', dto),
  // UsuarioEdicionDTO { id, username, correo, contrasena, estatus }
  editar: (dto) => apiPost('/api/usuario/editarUsuario', dto),
  listado: () => apiGet('/api/usuario/obtenerListadoUsuarios'),
  // CorreoDTO { email }
  enviarEmailRecuperacion: (dto) => apiPost('/api/usuario/enviarEmailRecuperacion', dto),
  // RestablecerContrasenaDTO { correo, token, contrasena }
  restablecerPassword: (dto) => apiPost('/api/usuario/restablecerPassword', dto),
  disponibilidadUsername: (username) =>
    apiPost(`/api/usuario/obtenerDisponibilidadXUsername?username=${encodeURIComponent(username)}`),
  disponibilidadCorreo: (correo) =>
    apiPost(`/api/usuario/obtenerDisponibilidadXCorreo?correo=${encodeURIComponent(correo)}`),
};

/* ===================== Barbero ===================== */
export const barberoEndpoints = {
  listar: () => apiGet('/api/barbero/obtenerBarberos'),
  crear: (dto) => apiPost('/api/barbero/crearBarbero', dto), // BarberoDTO
  editar: (dto) => apiPost('/api/barbero/editarBarbero', dto),
  eliminar: (id) => apiGet(`/api/barbero/eliminarBarbero/${id}`),
  asignarPerfil: (dto) => apiPost('/api/barbero/asignarPerfilBarbero', dto), // AsignacionBarberoDTO { idUsuario, idBarbero }
};

/* ===================== Servicio ===================== */
export const servicioEndpoints = {
  listar: () => apiGet('/api/servicio/obtenerServicios'),
  anadidosDeServicio: (id) => apiGet(`/api/servicio/obtenerAnadidosServicios/${id}`),
  crear: (dto) => apiPost('/api/servicio/crearServicio', dto), // ServicioConArchivoDTO
  editar: (dto) => apiPost('/api/servicio/editarServicio', dto),
  eliminar: (id) => apiGet(`/api/servicio/eliminarServicio/${id}`),
  crearAnadido: (dto) => apiPost('/api/servicio/crearAnadidoServicio', dto), // AnadidoServicioDTO
  editarAnadido: (dto) => apiPost('/api/servicio/editarAnadidoServicio', dto),
  eliminarAnadido: (id) => apiGet(`/api/servicio/eliminarAnadidoServicio/${id}`),
};

/* ===================== Perfume ===================== */
export const perfumeEndpoints = {
  listar: () => apiGet('/api/perfume/obtenerPerfumes'),
  crear: (dto) => apiPost('/api/perfume/crearPerfume', dto), // PerfumeConArchivoDTO
  editar: (dto) => apiPost('/api/perfume/editarPerfume', dto),
  eliminar: (id) => apiGet(`/api/perfume/eliminarPerfume/${id}`),
};

/* ===================== Promocion ===================== */
export const promocionEndpoints = {
  listar: () => apiGet('/api/promocion/obtenerPromociones'),
  vigentes: () => apiGet('/api/promocion/obtenerPromocionesvigentes'),
  crear: (dto) => apiPost('/api/promocion/crearPromocion', dto), // PromocionDTO
  editar: (dto) => apiPost('/api/promocion/editarPromocion', dto),
  eliminar: (id) => apiGet(`/api/promocion/eliminarPromocion/${id}`),
};

/* ===================== Cita ===================== */
export const citaEndpoints = {
  crear: (dto) => apiPost('/api/cita/crearCita', dto), // CitaCreacionDTO
  porBarbero: (idBarbero) => apiGet(`/api/cita/obtenerCitasXbarbero/${idBarbero}`),
  detalladasPorUsuario: (idUsuario) => apiGet(`/api/cita/obtenerListadoDetalladoXUsuario/${idUsuario}`),
  detalladasPorBarbero: (idBarbero) => apiGet(`/api/cita/obtenerListadoDetalladoXBarbero/${idBarbero}`),
  disponibilidadPorBarbero: (dto) => apiPost('/api/cita/obtenerDisponibilidadXBarbero', dto), // HoraBarberoDTO
};

/* ===================== Consulta ===================== */
export const consultaEndpoints = {
  listar: () => apiGet('/api/consultas/obtenerConsultas'),
  crear: (dto) => apiPost('/api/consultas/crearConsulta', dto), // ConsultaDTO
  editar: (dto) => apiPost('/api/consultas/editarConsulta', dto),
};

/* ===================== Dashboard ===================== */
export const dashboardEndpoints = {
  admin: () => apiGet('/api/dashboard/dashboardAdmin'),
  barbero: (idBarbero) => apiGet(`/api/dashboard/dashboardBarbero/${idBarbero}`),
};

/* ===================== DiasHabiles ===================== */
export const diasHabilesEndpoints = {
  todos: () => apiGet('/api/diasHabiles/todos'),
  editar: (dto) => apiPost('/api/diasHabiles/editar', dto), // DiasHabilDTO
};

/* ===================== PreferenciasCliente ===================== */
export const preferenciasEndpoints = {
  crearEditar: (dto) => apiPost('/api/preferenciasCliente/crearEditar', dto), // PreferenciasClienteDTO
  porUsuario: (id) => apiGet(`/api/preferenciasCliente/obtenerXUsuario?id=${id}`),
  eliminar: (id) => apiPost(`/api/preferenciasCliente/eliminar?id=${id}`),
};

/* ===================== Resena ===================== */
export const resenaEndpoints = {
  listar: () => apiGet('/api/resena/ObtenerResenas'),
  porCita: (idCita) => apiGet(`/api/resena/ObtenerXCita/${idCita}`),
  crear: (dto) => apiPost('/api/resena/Crear', dto), // ResenaDTO
  editar: (dto) => apiPost('/api/resena/Editar', dto),
  eliminar: (id) => apiPost(`/api/resena/Eliminar?id=${id}`),
};
