import axios from 'axios';

const api = axios.create({
  // Incluimos la ruta base de la API
  baseURL: 'http://100.107.57.23:8080/LibraryAPI' 
});

// Peticiones
export const getBooks = () => api.get('/book');
export const getUsers = () => api.get('/user');
export const getUniversities = () => api.get('/university');
export const getLoans = () => api.get('/loan');

export default api;