import barberApi from "../api/barberApi";
import { usuarioEndpoints } from "../api/endpoints";

/* ============ Servicios ============ */
export const serviciosApi = {
  // GET: api/servicios
  listar: async () => {
    try {
      const response = await barberApi.get('/servicio/obtenerServicios');
      return response.data; 
    } catch (error) {
      // Dejamos este log para que puedas ver el error real de red en la consola de F12
      console.error("DEBUG API ERROR:", error.toJSON ? error.toJSON() : error);
      throw new Error(error.response?.data?.message || 'Error al obtener los servicios');
    }
  },

  // POST: api/servicios
  crear: async (nuevoServicio) => {
    try {
      const response = await barberApi.post(usuarioEndpoints.SERVICIOS, nuevoServicio);
      return response.data; 
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear el servicio');
    }
  },

  // PUT: api/servicios/{id}
  editar: async (servicioEditado) => {
    try {
      const response = await barberApi.put(`${usuarioEndpoints.SERVICIOS}/${servicioEditado.id}`, servicioEditado);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al editar el servicio');
    }
  },

  // DELETE: api/servicios/{id}
  eliminar: async (id) => {
    try {
      const response = await barberApi.delete(`${usuarioEndpoints.SERVICIOS}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar el servicio');
    }
  },

  /* ==========================================
     usuarioEndpoints PARA LOS AÑADIDOS (Sub-tabla)
     ========================================== */

  // GET: api/servicios/anadidos/{servicioId}
  anadidos: async (servicioId) => {
    try {
      const response = await barberApi.get(`${usuarioEndpoints.SERVICIOS}/${servicioId}/anadidos`);
      return response.data; 
    } catch (error) {
      console.error("Error al listar añadidos:", error);
      return []; 
    }
  },

  // POST: api/servicios/anadidos
  crearAnadido: async (nuevoAnadido) => {
    try {
      const response = await barberApi.post(`${usuarioEndpoints.SERVICIOS}/anadidos`, nuevoAnadido);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear añadido');
    }
  },

  // DELETE: api/servicios/anadidos/{id}
  eliminarAnadido: async (id) => {
    try {
      const response = await barberApi.delete(`${usuarioEndpoints.SERVICIOS}/anadidos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar el añadido');
    }
  }
};