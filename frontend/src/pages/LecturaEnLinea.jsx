import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBooks } from '../services/api';
import { 
  FaBookOpen, FaTimes, FaThLarge, FaList, FaEye 
} from 'react-icons/fa';
import './LecturaEnLinea.css';
import GutenbergReader from '../components/GutenbergReader';

export default function LecturaEnLinea() {
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [vista, setVista] = useState('grid');
  
  // Estado para el modal de lectura
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const editorialFiltro = queryParams.get('editorial');

  useEffect(() => {
    const obtenerLibros = async () => {
      try {
        const respuesta = await getBooks();
        
        const librosVisibles = respuesta.data.filter(libro => {
          const tieneTitulo = Boolean(libro.title && libro.title.trim() !== '');
          const esActivo = libro.active === true || libro.activo === true;
          return tieneTitulo && esActivo;
        });

        setLibros(librosVisibles);
      } catch (err) {
        console.error("Error al obtener libros:", err);
        setError("No se pudieron cargar los libros para lectura en línea.");
      } finally {
        setCargando(false);
      }
    };

    obtenerLibros();
  }, []);

  const librosMostrados = editorialFiltro
    ? libros.filter(libro => libro.editorial && libro.editorial.toLowerCase() === editorialFiltro.toLowerCase())
    : libros;

  const limpiarFiltro = () => navigate('/lectura-en-linea');

  // Función para abrir el visor con la URL del PDF o visor estático de prueba
  const abrirLector = (libro) => {
   setLibroSeleccionado(libro);
  };

  const cerrarLector = () => setLibroSeleccionado(null);

  if (cargando) return <div className="lexi-lectura__mensaje">Cargando biblioteca digital...</div>;
  if (error) return <div className="lexi-lectura__mensaje error">{error}</div>;

  return (
    <main className="lexi-lectura">
      <header className="lexi-lectura__header">
        <h1 className="lexi-lectura__titulo">Lectura en Línea</h1>
        <p className="lexi-lectura__subtitulo">
          Accede libremente al contenido digital de tus obras preferidas.
        </p>

        {editorialFiltro && (
          <div className="lexi-lectura__filtro-activo">
            <span>Editorial: <strong>{editorialFiltro}</strong></span>
            <button onClick={limpiarFiltro} className="lexi-lectura__btn-limpiar">
              <FaTimes /> Quitar filtro
            </button>
          </div>
        )}

        <div className="lexi-lectura__toolbar">
          <span className="lexi-lectura__conteo">
            {librosMostrados.length} {librosMostrados.length === 1 ? 'libro disponible' : 'libros disponibles'}
          </span>
          <div className="lexi-lectura__vistas-toggle">
            <button 
              className={`lexi-lectura__btn-vista ${vista === 'grid' ? 'activo' : ''}`}
              onClick={() => setVista('grid')}
              title="Vista en Tarjetas"
            >
              <FaThLarge />
            </button>
            <button 
              className={`lexi-lectura__btn-vista ${vista === 'tabla' ? 'activo' : ''}`}
              onClick={() => setVista('tabla')}
              title="Vista en Tabla"
            >
              <FaList />
            </button>
          </div>
        </div>
      </header>

      {librosMostrados.length === 0 ? (
        <div className="lexi-lectura__vacio">
          <p>No hay libros disponibles para este criterio.</p>
          <button onClick={limpiarFiltro} className="lexi-lectura__btn-volver">Ver todos</button>
        </div>
      ) : vista === 'grid' ? (

        /* ================= VISTA 1: TARJETAS (Sólo Nombre y Sinopsis) ================= */
        <div className="lexi-lectura__grid">
          {librosMostrados.map((libro) => (
            <article key={libro.bookId} className="lexi-lectura__tarjeta">
              <div className="lexi-lectura__contenido">
                <h3 className="lexi-lectura__nombre">{libro.title}</h3>
                <p className="lexi-lectura__sinopsis">
                  {libro.synopsis || 'Sin sinopsis disponible.'}
                </p>
              </div>

              <button 
                className="lexi-lectura__btn-leer"
                onClick={() => abrirLector(libro)}
              >
                <FaBookOpen /> Leer ahora
              </button>
            </article>
          ))}
        </div>

      ) : (

        /* ================= VISTA 2: TABLA (Sólo Nombre y Sinopsis) ================= */
        <div className="lexi-lectura__tabla-contenedor">
          <table className="lexi-lectura__tabla">
            <thead>
              <tr>
                <th>Título</th>
                <th>Sinopsis</th>
                <th style={{ textAlign: 'center' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {librosMostrados.map((libro) => (
                <tr key={libro.bookId}>
                  <td className="lexi-lectura__col-titulo">{libro.title}</td>
                  <td className="lexi-lectura__col-sinopsis">
                    {libro.synopsis || 'Sin sinopsis disponible.'}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      className="lexi-lectura__btn-leer-tabla"
                      onClick={() => abrirLector(libro)}
                    >
                      <FaEye /> Leer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      )}

        {/* MODAL / VISOR DE LECTURA EN LÍNEA */}
        {libroSeleccionado && (
        <div className="lexi-lectura__modal-overlay">
            <div className="lexi-lectura__modal-contenido">
            <header className="lexi-lectura__modal-header">
            <div>
                <h2 style={{ color: '#ffffff', margin: 0 }}>{libroSeleccionado.title}</h2>
                <span className="lexi-lectura__modal-subtitulo">
                Powered by Gutenberg Project
                </span>
            </div>
            <button onClick={cerrarLector} className="lexi-lectura__btn-cerrar">
                <FaTimes />
            </button>
            </header>

            <div className="lexi-lectura__visor-body">
                <GutenbergReader 
                titulo={libroSeleccionado.title} 
                isbn={libroSeleccionado.isbn} 
                />
            </div>
            </div>
        </div>
        )}
    </main>
  );
}