import axios from 'axios';

const api = axios.create({
    // Asegúrate de que este puerto sea el mismo que usa tu backend cuando corres en local
    baseURL: 'https://localhost:7017/LibraryAPI' 
});

// Ejemplo de exportación de una función para obtener libros
export const getBooks = () => api.get('/book');

export default api;