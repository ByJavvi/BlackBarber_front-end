import axios from 'axios';

const barberApi = axios.create({
  baseURL: 'https://localhost:7294/api', // Reemplaza con el puerto real de tu API en .NET
  headers: {
    'Content-Type': 'application/json',
  },
});

export default barberApi;