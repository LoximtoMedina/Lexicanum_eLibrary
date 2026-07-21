import axios from 'axios';

const api = axios.create({
    // Asegúrate de que este puerto sea el mismo que usa tu backend cuando corres en local
    baseURL: '100.107.57.23:7017' 
});

// Ejemplo de exportación de una función para obtener libros
export const getBooks = () => api.get('/book');

export default api;