import React, { useState, useEffect } from 'react';
import { getBooks } from '../services/api';
import TarjetaColeccion from '../components/TarjetaColeccion';
import './Colecciones.css';

export default function Colecciones() {
  const [colecciones, setColecciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerColecciones = async () => {
      try {
        const respuesta = await getBooks();
        const libros = respuesta.data;

        // 1. Filtrar SOLO los libros activos y con datos válidos
        const librosActivos = libros.filter(libro => {
          const tieneTitulo = Boolean(libro.title && libro.title.trim() !== '');
          const tieneGenero = Boolean(libro.genre && libro.genre.trim() !== '');
          
          // Condición estricta: active O activo debe ser true
          const esActivo = libro.active === true || libro.activo === true;

          return tieneTitulo && tieneGenero && esActivo;
        });

        // 2. Agrupar y contar cuántos libros ACTIVOS pertenecen a cada género
        const conteoGeneros = librosActivos.reduce((acc, libro) => {
          const genero = libro.genre.trim();
          acc[genero] = (acc[genero] || 0) + 1;
          return acc;
        }, {});

        // 3. Crear el arreglo de colecciones a mostrar
        const listaColecciones = Object.keys(conteoGeneros).map(nombre => ({
          nombre,
          totalLibros: conteoGeneros[nombre]
        }));

        setColecciones(listaColecciones);
      } catch (err) {
        console.error("Error al obtener colecciones:", err);
        setError("No se pudieron cargar las colecciones de la biblioteca.");
      } finally {
        setCargando(false);
      }
    };

    obtenerColecciones();
  }, []);

  if (cargando) return <div className="lexi-colecciones__mensaje">Cargando colecciones...</div>;
  if (error) return <div className="lexi-colecciones__mensaje error">{error}</div>;

  return (
    <main className="lexi-colecciones">
      <header className="lexi-colecciones__header">
        <h1 className="lexi-colecciones__titulo">Colecciones de la Biblioteca</h1>
        <p className="lexi-colecciones__subtitulo">
          Explora nuestros compendios especializados organizados por géneros y temáticas literarias.
        </p>
      </header>

      <div className="lexi-colecciones__grid">
        {colecciones.map((item, index) => (
          <TarjetaColeccion 
            key={index} 
            nombreColeccion={item.nombre} 
            cantidadLibros={item.totalLibros} 
          />
        ))}
      </div>
    </main>
  );
}