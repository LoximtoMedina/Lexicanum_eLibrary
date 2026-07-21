import React, { useState, useEffect } from 'react';
import { getBooks } from '../services/api';
import TarjetaEditorial from '../components/TarjetaEdit'; 
import './Editoriales.css';

export default function Editoriales() {
  const [editoriales, setEditoriales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerEditoriales = async () => {
      try {
        const respuesta = await getBooks();
        const libros = respuesta.data;

        // 1. Filtrar SOLO los libros activos y con título/editorial válidos
        const librosActivos = libros.filter(libro => {
          const tieneTitulo = Boolean(libro.title && libro.title.trim() !== '');
          const tieneEditorial = Boolean(libro.editorial && libro.editorial.trim() !== '');
          
          // Condición estricta: active O activo debe ser verdaderamente true
          const esActivo = libro.active === true || libro.activo === true;

          return tieneTitulo && tieneEditorial && esActivo;
        });

        // 2. Agrupar y contar libros activos por editorial
        const conteoPorEditorial = librosActivos.reduce((acc, libro) => {
          const nombreEditorial = libro.editorial.trim();
          acc[nombreEditorial] = (acc[nombreEditorial] || 0) + 1;
          return acc;
        }, {});

        // 3. Crear el arreglo final para mostrar en las tarjetas
        const listaEditoriales = Object.keys(conteoPorEditorial).map(editorial => ({
          nombre: editorial,
          totalLibros: conteoPorEditorial[editorial]
        }));

        setEditoriales(listaEditoriales);
      } catch (err) {
        console.error("Error al obtener las editoriales:", err);
        setError("No se pudieron cargar las editoriales del catálogo.");
      } finally {
        setCargando(false);
      }
    };

    obtenerEditoriales();
  }, []);

  if (cargando) return <div className="lexi-editoriales__mensaje">Cargando editoriales...</div>;
  if (error) return <div className="lexi-editoriales__mensaje error">{error}</div>;

  return (
    <main className="lexi-editoriales">
      <header className="lexi-editoriales__header">
        <h1 className="lexi-editoriales__titulo">Editoriales Asociadas</h1>
        <p className="lexi-editoriales__subtitulo">
          Conoce las casas editoriales encargadas de la publicación de las obras en nuestro catálogo.
        </p>
      </header>

      <div className="lexi-editoriales__grid">
        {editoriales.map((item, index) => (
          <TarjetaEditorial 
            key={index}
            nombreEditorial={item.nombre}
            cantidadLibros={item.totalLibros}
          />
        ))}
      </div>
    </main>
  );
}