// Datos simulados alineados a los DTOs del swagger.
// Se usan mientras REACT_APP_USE_MOCKS !== 'false'.

export const mockUsuarios = [
  { id: 1, username: 'Yahir', correo: 'yahiradmin@gmail.com', passwordHash: '***', horaCreacion: '2026-01-10T13:50:45', estatus: 1, idRol: 1 },
  { id: 2, username: 'Carlos', correo: 'carlos@blackbarber.com', passwordHash: '***', horaCreacion: '2026-02-02T09:12:00', estatus: 1, idRol: 2 },
  { id: 3, username: 'Diego', correo: 'diego@blackbarber.com', passwordHash: '***', horaCreacion: '2026-03-15T17:30:10', estatus: 1, idRol: 2 },
  { id: 4, username: 'Mariana', correo: 'mariana@gmail.com', passwordHash: '***', horaCreacion: '2026-04-20T11:05:33', estatus: 0, idRol: 3 },
];

export const mockBarberos = [
  { id: 1, nombre: 'Carlos "El Tijeras"', idUsuario: 2, estatus: 1, nombreUsuario: 'Carlos', descripcionEstatus: 'Activo' },
  { id: 2, nombre: 'Diego Navaja', idUsuario: 3, estatus: 1, nombreUsuario: 'Diego', descripcionEstatus: 'Activo' },
  { id: 3, nombre: 'Luis Fade', idUsuario: null, estatus: 0, nombreUsuario: null, descripcionEstatus: 'Inactivo' },
];

export const mockServicios = [
  { id: 1, nombre: 'Corte clásico', descripcion: 'Corte clásico para caballero', idTipo: 1, precioBase: 90, horas: 1, base64: null, estatus: 1 },
  { id: 2, nombre: 'Fade premium', descripcion: 'Degradado de alta precisión', idTipo: 1, precioBase: 150, horas: 1, base64: null, estatus: 1 },
  { id: 3, nombre: 'Afeitado navaja', descripcion: 'Afeitado clásico con toalla caliente', idTipo: 2, precioBase: 120, horas: 1, base64: null, estatus: 1 },
  { id: 4, nombre: 'Diseño de barba', descripcion: 'Perfilado y diseño de barba', idTipo: 2, precioBase: 80, horas: 1, base64: null, estatus: 0 },
];

export const mockAnadidos = {
  1: [
    { id: 11, nombre: 'Lavado', descripcion: 'Lavado con shampoo premium', idPerteneciente: 1, precio: 20 },
    { id: 12, nombre: 'Línea de diseño', descripcion: 'Línea decorativa', idPerteneciente: 1, precio: 15 },
  ],
  2: [{ id: 21, nombre: 'Mascarilla negra', descripcion: 'Mascarilla facial', idPerteneciente: 2, precio: 35 }],
  3: [],
  4: [],
};

export const mockPerfumes = [
  { id: 1, nombre: 'Red State', descripcion: 'Aroma fresco y cítrico', base64: null, disponible: true },
  { id: 2, nombre: 'Black Oud', descripcion: 'Amaderado intenso para la noche', base64: null, disponible: true },
  { id: 3, nombre: 'Blue Ice', descripcion: 'Acuático y ligero', base64: null, disponible: false },
];

export const mockPromociones = [
  { id: 1, descripcion: 'Si eres el último en firmar a Messi tu corte es gratis', fechaInicio: '2026-03-26', fechaFin: '2026-11-30' },
  { id: 2, descripcion: '2x1 en corte + barba los martes', fechaInicio: '2026-06-01', fechaFin: '2026-07-31' },
  { id: 3, descripcion: 'Combo padre e hijo -20%', fechaInicio: '2026-05-01', fechaFin: '2026-06-15' },
];

export const mockCitasDetalladas = [
  {
    id: 101, fechaInicio: '2026-06-26T10:00:00', fechaTermino: '2026-06-26T11:00:00',
    idCliente: 4, estatus: 2, nombreCliente: 'Mariana', estatusDescripcion: 'Confirmada', total: 170,
    servicios: [
      { id: 1, idCita: 101, idBarbero: 1, idServicio: 1, precio: 90, nombreBarbero: 'Carlos "El Tijeras"', nombreServicio: 'Corte clásico' },
      { id: 2, idCita: 101, idBarbero: 1, idServicio: 4, precio: 80, nombreBarbero: 'Carlos "El Tijeras"', nombreServicio: 'Diseño de barba' },
    ],
  },
  {
    id: 102, fechaInicio: '2026-06-26T12:30:00', fechaTermino: '2026-06-26T13:30:00',
    idCliente: 4, estatus: 1, nombreCliente: 'Mariana', estatusDescripcion: 'Pendiente', total: 150,
    servicios: [
      { id: 3, idCita: 102, idBarbero: 2, idServicio: 2, precio: 150, nombreBarbero: 'Diego Navaja', nombreServicio: 'Fade premium' },
    ],
  },
  {
    id: 103, fechaInicio: '2026-06-20T16:00:00', fechaTermino: '2026-06-20T17:00:00',
    idCliente: 4, estatus: 3, nombreCliente: 'Mariana', estatusDescripcion: 'Completada', total: 120,
    servicios: [
      { id: 4, idCita: 103, idBarbero: 1, idServicio: 3, precio: 120, nombreBarbero: 'Carlos "El Tijeras"', nombreServicio: 'Afeitado navaja' },
    ],
  },
];

export const mockConsultas = [
  { id: 1, nombre: 'Roberto Méndez', correo: 'roberto@gmail.com', mensaje: '¿Atienden sin cita los domingos?', estatus: 0 },
  { id: 2, nombre: 'Ana Lucía', correo: 'ana.lucia@gmail.com', mensaje: 'Quisiera cotizar un paquete para boda.', estatus: 1 },
  { id: 3, nombre: 'Tomás Ruiz', correo: 'tomas@hotmail.com', mensaje: '¿Tienen tarjeta de regalo?', estatus: 0 },
];

export const mockDiasHabiles = [
  { id: 1, nombre: 'Lunes', habil: true, horaInicio: '09:00:00', horaFin: '19:00:00' },
  { id: 2, nombre: 'Martes', habil: true, horaInicio: '09:00:00', horaFin: '19:00:00' },
  { id: 3, nombre: 'Miércoles', habil: true, horaInicio: '09:00:00', horaFin: '19:00:00' },
  { id: 4, nombre: 'Jueves', habil: true, horaInicio: '09:00:00', horaFin: '19:00:00' },
  { id: 5, nombre: 'Viernes', habil: true, horaInicio: '09:00:00', horaFin: '20:00:00' },
  { id: 6, nombre: 'Sábado', habil: true, horaInicio: '10:00:00', horaFin: '18:00:00' },
  { id: 7, nombre: 'Domingo', habil: false, horaInicio: '00:00:00', horaFin: '00:00:00' },
];

export const mockResenas = [
  { id: 1, idUsuario: 4, idCita: 103, calificacion: 5, comentario: '¡Excelente fade! Volveré sin duda.' },
  { id: 2, idUsuario: 2, idCita: 101, calificacion: 4, comentario: 'Muy buen servicio, un poco de espera.' },
];

export const mockPreferencias = {
  4: { id: 1, numeroNavaja: 2, sprayAntiIrritacion: true, idPerfume: 1, idCliente: 4 },
};

export const mockDashboardAdmin = {
  serviciosActivos: 3, extrasServicios: 3, barberostotal: 3, barberosActivos: 2,
  citasDeldia: 8, porcentajeCitas: 72, ingresosDeldia: 4250.5, porcentajeXTicket: 12.4,
};

export const mockDashboardBarbero = {
  citasDeldia: 5, citasEnCurso: 1, citasPorAtender: 3, proximaCita: '12:30 PM',
  citasAtendidas: 1, calidadRitmo: 'Buen ritmo', disponibilidad: 'Disponible',
  descripcionDisponibilidad: 'Aceptando nuevas citas hoy',
};
