// Fachada de datos para la UI.
// Si REACT_APP_USE_MOCKS !== 'false' -> trabaja con datos simulados en memoria.
// Si está en 'false' -> delega en los endpoints reales (src/api/endpoints.js).
//
// Las pantallas SIEMPRE importan desde aquí (ej. `import { serviciosApi } from '../api'`),
// así el cambio mock -> backend real es transparente.
import { USE_MOCKS, setToken } from './client';
import * as ep from './endpoints';
import * as M from '../mocks/data';
import barberApi from './barberApi';
import { usuarioEndpoints } from './endpoints';

// Copias mutables en memoria (solo modo mock)
const db = {
  usuarios: [...M.mockUsuarios],
  barberos: [...M.mockBarberos],
  servicios: [...M.mockServicios],
  anadidos: JSON.parse(JSON.stringify(M.mockAnadidos)),
  perfumes: [...M.mockPerfumes],
  promociones: [...M.mockPromociones],
  citas: JSON.parse(JSON.stringify(M.mockCitasDetalladas)),
  consultas: [...M.mockConsultas],
  diasHabiles: [...M.mockDiasHabiles],
  resenas: [...M.mockResenas],
  preferencias: { ...M.mockPreferencias },
};

const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));
const ok = (descripcion = 'Operación realizada') => ({ estatus: true, descripcion });
const nextId = (arr) => (arr.length ? Math.max(...arr.map((x) => x.id || 0)) + 1 : 1);
const mock = async (fn) => { await delay(); return fn(); };

/* ============ Auth ============ */
export const authApi = {
  login: async (cred) => {
    if (!USE_MOCKS) {
      const r = await ep.usuarioEndpoints.login(cred);
      if (r?.token) setToken(r.token);
      return r;
    }
    return mock(() => {
      const u = db.usuarios.find((x) => x.correo === cred.email);
      if (!u) return { estatus: false, token: null };
      const fakeToken = btoa(`${u.correo}:${u.idRol}:${Date.now()}`);
      setToken(fakeToken);
      return { estatus: true, token: fakeToken, usuario: u };
    });
  },
  enviarEmailRecuperacion: (dto) =>
    USE_MOCKS ? mock(() => ok('Si el correo existe, enviamos instrucciones.')) : ep.usuarioEndpoints.enviarEmailRecuperacion(dto),
  restablecerPassword: (dto) =>
    USE_MOCKS ? mock(() => ok('Contraseña actualizada.')) : ep.usuarioEndpoints.restablecerPassword(dto),
};

/* ============ Usuarios ============ */
export const usuariosApi = {
  listar: () => (USE_MOCKS ? mock(() => db.usuarios) : ep.usuarioEndpoints.listado()),
  crear: (dto) => USE_MOCKS ? mock(() => { db.usuarios.push({ id: nextId(db.usuarios), estatus: 1, idRol: 3, horaCreacion: new Date().toISOString(), ...dto }); return ok('Usuario creado'); }) : ep.usuarioEndpoints.crear(dto),
  editar: (dto) => USE_MOCKS ? mock(() => { const i = db.usuarios.findIndex((x) => x.id === dto.id); if (i >= 0) db.usuarios[i] = { ...db.usuarios[i], ...dto }; return ok('Usuario actualizado'); }) : ep.usuarioEndpoints.editar(dto),
};

/* ============ Barberos ============ */
export const barberosApi = {
  listar: () => (USE_MOCKS ? mock(() => db.barberos) : ep.barberoEndpoints.listar()),
  crear: (dto) => USE_MOCKS ? mock(() => { db.barberos.push({ id: nextId(db.barberos), estatus: dto.estatus ?? 1, descripcionEstatus: 'Activo', nombreUsuario: null, ...dto }); return ok('Barbero creado'); }) : ep.barberoEndpoints.crear(dto),
  editar: (dto) => USE_MOCKS ? mock(() => { const i = db.barberos.findIndex((x) => x.id === dto.id); if (i >= 0) db.barberos[i] = { ...db.barberos[i], ...dto }; return ok('Barbero actualizado'); }) : ep.barberoEndpoints.editar(dto),
  eliminar: (id) => USE_MOCKS ? mock(() => { db.barberos = db.barberos.filter((x) => x.id !== id); return ok('Barbero eliminado'); }) : ep.barberoEndpoints.eliminar(id),
  asignarPerfil: (dto) => USE_MOCKS ? mock(() => { const b = db.barberos.find((x) => x.id === dto.idBarbero); if (b) { b.idUsuario = dto.idUsuario; const u = db.usuarios.find((x) => x.id === dto.idUsuario); b.nombreUsuario = u?.username || null; } return ok('Perfil asignado'); }) : ep.barberoEndpoints.asignarPerfil(dto),
};

/* ============ Perfumes ============ */
export const perfumesApi = {
  listar: () => (USE_MOCKS ? mock(() => db.perfumes) : ep.perfumeEndpoints.listar()),
  crear: (dto) => USE_MOCKS ? mock(() => { db.perfumes.push({ id: nextId(db.perfumes), disponible: dto.disponible ?? true, ...dto }); return ok('Perfume creado'); }) : ep.perfumeEndpoints.crear(dto),
  editar: (dto) => USE_MOCKS ? mock(() => { const i = db.perfumes.findIndex((x) => x.id === dto.id); if (i >= 0) db.perfumes[i] = { ...db.perfumes[i], ...dto }; return ok('Perfume actualizado'); }) : ep.perfumeEndpoints.editar(dto),
  eliminar: (id) => USE_MOCKS ? mock(() => { db.perfumes = db.perfumes.filter((x) => x.id !== id); return ok('Perfume eliminado'); }) : ep.perfumeEndpoints.eliminar(id),
};

/* ============ Promociones ============ */
export const promocionesApi = {
  listar: () => (USE_MOCKS ? mock(() => db.promociones) : ep.promocionEndpoints.listar()),
  vigentes: () => (USE_MOCKS ? mock(() => db.promociones.filter((p) => new Date(p.fechaFin) >= new Date())) : ep.promocionEndpoints.vigentes()),
  crear: (dto) => USE_MOCKS ? mock(() => { db.promociones.push({ id: nextId(db.promociones), ...dto }); return ok('Promoción creada'); }) : ep.promocionEndpoints.crear(dto),
  editar: (dto) => USE_MOCKS ? mock(() => { const i = db.promociones.findIndex((x) => x.id === dto.id); if (i >= 0) db.promociones[i] = { ...db.promociones[i], ...dto }; return ok('Promoción actualizada'); }) : ep.promocionEndpoints.editar(dto),
  eliminar: (id) => USE_MOCKS ? mock(() => { db.promociones = db.promociones.filter((x) => x.id !== id); return ok('Promoción eliminada'); }) : ep.promocionEndpoints.eliminar(id),
};

/* ============ Citas ============ */
export const citasApi = {
  detalladasPorUsuario: (idUsuario) => USE_MOCKS ? mock(() => db.citas.filter((c) => c.idCliente === idUsuario || true)) : ep.citaEndpoints.detalladasPorUsuario(idUsuario),
  detalladasPorBarbero: (idBarbero) => USE_MOCKS ? mock(() => db.citas.filter((c) => c.servicios?.some((s) => s.idBarbero === idBarbero) || true)) : ep.citaEndpoints.detalladasPorBarbero(idBarbero),
  porBarbero: (idBarbero) => USE_MOCKS ? mock(() => db.citas.map(({ servicios, nombreCliente, estatusDescripcion, total, ...c }) => c)) : ep.citaEndpoints.porBarbero(idBarbero),
  disponibilidad: (dto) => USE_MOCKS ? mock(() => ({ estatus: true, descripcion: 'Horario disponible' })) : ep.citaEndpoints.disponibilidadPorBarbero(dto),
  crear: (dto) => USE_MOCKS ? mock(() => ok('Cita agendada')) : ep.citaEndpoints.crear(dto),
};

/* ============ Consultas ============ */
export const consultasApi = {
  listar: () => (USE_MOCKS ? mock(() => db.consultas) : ep.consultaEndpoints.listar()),
  crear: (dto) => USE_MOCKS ? mock(() => { db.consultas.push({ id: nextId(db.consultas), estatus: 0, ...dto }); return ok('Consulta enviada'); }) : ep.consultaEndpoints.crear(dto),
  editar: (dto) => USE_MOCKS ? mock(() => { const i = db.consultas.findIndex((x) => x.id === dto.id); if (i >= 0) db.consultas[i] = { ...db.consultas[i], ...dto }; return ok('Consulta actualizada'); }) : ep.consultaEndpoints.editar(dto),
};

/* ============ Días hábiles ============ */
export const diasHabilesApi = {
  todos: () => (USE_MOCKS ? mock(() => db.diasHabiles) : ep.diasHabilesEndpoints.todos()),
  editar: (dto) => USE_MOCKS ? mock(() => { const i = db.diasHabiles.findIndex((x) => x.id === dto.id); if (i >= 0) db.diasHabiles[i] = { ...db.diasHabiles[i], ...dto }; return ok('Día actualizado'); }) : ep.diasHabilesEndpoints.editar(dto),
};

/* ============ Reseñas ============ */
export const resenasApi = {
  listar: () => (USE_MOCKS ? mock(() => db.resenas) : ep.resenaEndpoints.listar()),
  porCita: (idCita) => USE_MOCKS ? mock(() => db.resenas.filter((r) => r.idCita === idCita)) : ep.resenaEndpoints.porCita(idCita),
  crear: (dto) => USE_MOCKS ? mock(() => { db.resenas.push({ id: nextId(db.resenas), ...dto }); return ok('Reseña publicada'); }) : ep.resenaEndpoints.crear(dto),
  editar: (dto) => USE_MOCKS ? mock(() => { const i = db.resenas.findIndex((x) => x.id === dto.id); if (i >= 0) db.resenas[i] = { ...db.resenas[i], ...dto }; return ok('Reseña actualizada'); }) : ep.resenaEndpoints.editar(dto),
  eliminar: (id) => USE_MOCKS ? mock(() => { db.resenas = db.resenas.filter((x) => x.id !== id); return ok('Reseña eliminada'); }) : ep.resenaEndpoints.eliminar(id),
};

/* ============ Preferencias ============ */
export const preferenciasApi = {
  porUsuario: (id) => USE_MOCKS ? mock(() => db.preferencias[id] || null) : ep.preferenciasEndpoints.porUsuario(id),
  crearEditar: (dto) => USE_MOCKS ? mock(() => { db.preferencias[dto.idCliente] = { id: db.preferencias[dto.idCliente]?.id || nextId(Object.values(db.preferencias)), ...dto }; return ok('Preferencias guardadas'); }) : ep.preferenciasEndpoints.crearEditar(dto),
  eliminar: (id) => USE_MOCKS ? mock(() => ok('Preferencias eliminadas')) : ep.preferenciasEndpoints.eliminar(id),
};

/* ============ Dashboard ============ */
export const dashboardApi = {
  admin: () => (USE_MOCKS ? mock(() => M.mockDashboardAdmin) : ep.dashboardEndpoints.admin()),
  barbero: (idBarbero) => (USE_MOCKS ? mock(() => M.mockDashboardBarbero) : ep.dashboardEndpoints.barbero(idBarbero)),
};
