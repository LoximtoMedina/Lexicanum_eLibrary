
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBooks } from '../services/api';
import { 
  FaBook, FaBuilding, FaUser, FaCalendarAlt, 
  FaTimes, FaThLarge, FaList 
} from 'react-icons/fa';
import './Libros.css';

export default function Libros() {
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  // Estado para alternar entre vista 'grid' (tarjetas) y 'tabla'
  const [vista, setVista] = useState('grid');

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const editorialFiltro = queryParams.get('editorial');

  useEffect(() => {
    const obtenerLibros = async () => {
        try {
        const respuesta = await getBooks();
        
        // SOLO mantenemos los libros que tengan título Y cuya propiedad active sea verdaderamente true
        const librosVisibles = respuesta.data.filter(libro => {
            const tieneTitulo = Boolean(libro.title && libro.title.trim() !== '');
            
            // Comprobamos si viene como 'active' o 'activo' y forzamos a que sea true
            const esActivo = libro.active === true || libro.activo === true;

            return tieneTitulo && esActivo;
        });

        setLibros(librosVisibles);
        } catch (err) {
        console.error("Error al obtener libros:", err);
        setError("No se pudieron cargar los libros del catálogo.");
        } finally {
        setCargando(false);
        }
    };

    obtenerLibros();
  }, []);

  const librosMostrados = editorialFiltro
    ? libros.filter(libro => libro.editorial && libro.editorial.toLowerCase() === editorialFiltro.toLowerCase())
    : libros;

  const limpiarFiltro = () => navigate('/libros');

  if (cargando) return <div className="lexi-libros__mensaje">Cargando catálogo...</div>;
  if (error) return <div className="lexi-libros__mensaje error">{error}</div>;

  return (
    <main className="lexi-libros">
      <header className="lexi-libros__header">
        <h1 className="lexi-libros__titulo">Catálogo de Libros</h1>
        <p className="lexi-libros__subtitulo">
          Explora la colección completa de publicaciones disponibles en nuestra plataforma.
        </p>

        {editorialFiltro && (
          <div className="lexi-libros__filtro-activo">
            <span>Editorial: <strong>{editorialFiltro}</strong></span>
            <button onClick={limpiarFiltro} className="lexi-libros__btn-limpiar">
              <FaTimes /> Quitar filtro
            </button>
          </div>
        )}

        {/* Barra de herramientas para cambiar el modo de vista */}
        <div className="lexi-libros__toolbar">
          <span className="lexi-libros__conteo">
            {librosMostrados.length} {librosMostrados.length === 1 ? 'libro encontrado' : 'libros encontrados'}
          </span>
          <div className="lexi-libros__vistas-toggle">
            <button 
              className={`lexi-libros__btn-vista ${vista === 'grid' ? 'activo' : ''}`}
              onClick={() => setVista('grid')}
              title="Vista en Tarjetas"
            >
              <FaThLarge />
            </button>
            <button 
              className={`lexi-libros__btn-vista ${vista === 'tabla' ? 'activo' : ''}`}
              onClick={() => setVista('tabla')}
              title="Vista en Tabla"
            >
              <FaList />
            </button>
          </div>
        </div>
      </header>

      {librosMostrados.length === 0 ? (
        <div className="lexi-libros__vacio">
          <p>No hay libros registrados para este criterio.</p>
          <button onClick={limpiarFiltro} className="lexi-libros__btn-volver">Ver todos</button>
        </div>
      ) : vista === 'grid' ? (

        /* ================= VISTA 1: TARJETAS ================= */
        <div className="lexi-libros__grid">
          {librosMostrados.map((libro) => (
            <article key={libro.bookId} className="lexi-libros__tarjeta">
              <div className="lexi-libros__badge-genero">{libro.genre || 'General'}</div>
              <h3 className="lexi-libros__nombre">{libro.title}</h3>
              
              <div className="lexi-libros__meta">
                <p><FaUser /> <span>{libro.author || 'Desconocido'}</span></p>
                <p><FaBuilding /> <span>{libro.editorial || 'Sin editorial'}</span></p>
                {libro.publicationYear > 0 && (
                  <p><FaCalendarAlt /> <span>{libro.publicationYear}</span></p>
                )}
              </div>

              <p className="lexi-libros__sinopsis">
                {libro.synopsis || 'Sin sinopsis disponible.'}
              </p>

              <div className="lexi-libros__pie">
                <span><FaBook /> Stock: {libro.stock ?? 0}</span>
              </div>
            </article>
          ))}
        </div>

      ) : (

        /* ================= VISTA 2: TABLA ================= */
        <div className="lexi-libros__tabla-contenedor">
          <table className="lexi-libros__tabla">
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Editorial</th>
                <th>Género</th>
                <th>Año</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {librosMostrados.map((libro) => (
                <tr key={libro.bookId}>
                  <td className="lexi-libros__col-titulo">{libro.title}</td>
                  <td>{libro.author || '—'}</td>
                  <td>{libro.editorial || '—'}</td>
                  <td><span className="lexi-libros__badge-tabla">{libro.genre || 'General'}</span></td>
                  <td>{libro.publicationYear > 0 ? libro.publicationYear : '—'}</td>
                  <td className="lexi-libros__col-stock">{libro.stock ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      )}
    </main>
  );
}