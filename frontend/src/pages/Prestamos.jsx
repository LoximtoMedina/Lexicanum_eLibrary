import { getBooks, getLoans, createLoan } from '../services/api';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  FaHistory, 
  FaHandHolding, 
  FaUndoAlt, 
  FaBook, 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaClock 
} from 'react-icons/fa';
import './Prestamos.css';

export default function Prestamos() {
  const location = useLocation();
  
  // Pestaña activa
  const pestanaInicial = location.state?.pestana || 'historial';
  const [pestanaActiva, setPestanaActiva] = useState(pestanaInicial);

  // Estados de datos
  const [libros, setLibros] = useState([]);
  const [prestamos, setPrestamos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Usuario de sesión para el formulario
  const usuarioSesion = JSON.parse(localStorage.getItem('usuarioLexicanum')) || {
    name: "Usuario Visitante",
    email: "usuario@ejemplo.com"
  };

  // Estados del Formulario
  const [libroSeleccionado, setLibroSeleccionado] = useState('');
  const [fechaPrestamo, setFechaPrestamo] = useState('');
  const [fechaDevolucionEsperada, setFechaDevolucionEsperada] = useState('');

  // Sincronizar pestaña desde el Navbar
  useEffect(() => {
    if (location.state?.pestana) {
      setPestanaActiva(location.state.pestana);
    }
  }, [location.state]);

  useEffect(() => {
    // Definir fechas predeterminadas
    const hoy = new Date();
    const fechaHoyStr = hoy.toISOString().split('T')[0];
    
    const unMesDespues = new Date();
    unMesDespues.setMonth(unMesDespues.getMonth() + 1);
    const fechaUnMesStr = unMesDespues.toISOString().split('T')[0];

    setFechaPrestamo(fechaHoyStr);
    setFechaDevolucionEsperada(fechaUnMesStr);

    // Cargar datos
    const cargarDatos = async () => {
      try {
        const [resLibros, resPrestamos] = await Promise.all([
          getBooks(),
          getLoans()
        ]);

        const librosActivos = (resLibros.data || []).filter(
          libro => libro.active === true || libro.activo === true
        );
        setLibros(librosActivos);
        setPrestamos(resPrestamos.data || []);
      } catch (err) {
        console.error("Error al cargar datos:", err);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const handleSolicitarPrestamo = async (e) => {
    e.preventDefault();

    // Validación: No permitir más de 3 libros en préstamo
    if (librosPorDevolver.length >= 3) {
      alert("Has alcanzado el límite máximo de 3 libros en préstamo a la vez. Debes devolver al menos uno antes de solicitar otro.");
      return;
    }

    // Validación: Asegurarse de que se haya seleccionado un libro
    if (!libroSeleccionado) {
      alert("Por favor selecciona un libro.");
      return;
    }

    try {
      // Estructura que espera tu modelo Loan en el backend
      const nuevoPrestamo = {
        bookId: parseInt(libroSeleccionado),
        devolutionDate: new Date(fechaDevolucionEsperada).toISOString()
      };

      await createLoan(nuevoPrestamo);
      
      alert("¡Préstamo registrado con éxito!");
      setLibroSeleccionado('');
      
      // Recargar los préstamos para que aparezca en el historial inmediatamente
      const resPrestamos = await getLoans();
      setPrestamos(resPrestamos.data || []);
      
      setPestanaActiva('historial');
    } catch (err) {
      console.error("Error al registrar el préstamo:", err);
      alert("Hubo un error al registrar el préstamo.");
    }
  };

  const handleDevolverLibro = (e) => {
    e.preventDefault();
    if (!libroSeleccionado) {
      alert("Por favor selecciona el libro a devolver.");
      return;
    }
    alert(`¡Devolución registrada para: ${libroSeleccionado}!`);
    setLibroSeleccionado('');
    setPestanaActiva('historial');
  };

  const librosPorDevolver = prestamos.filter(
    p => (p.status || p.estado || '').toLowerCase() !== 'devuelto'
  );
  const librosDevueltos = prestamos.filter(
    p => (p.status || p.estado || '').toLowerCase() === 'devuelto'
  );

  return (
    <div className="lexi-prestamos-layout">
      {/* BARRA LATERAL IZQUIERDA (SOLO PESTAÑAS) */}
      <aside className="lexi-prestamos__sidebar">
        <nav className="lexi-prestamos__nav">
          <button 
            className={`lexi-prestamos__nav-btn ${pestanaActiva === 'historial' ? 'activo' : ''}`}
            onClick={() => { setPestanaActiva('historial'); setLibroSeleccionado(''); }}
          >
            <FaHistory /> Inicio / Historial
          </button>

          <button 
            className={`lexi-prestamos__nav-btn ${pestanaActiva === 'pedir' ? 'activo' : ''}`}
            onClick={() => { setPestanaActiva('pedir'); setLibroSeleccionado(''); }}
          >
            <FaHandHolding /> Pedir Préstamo
          </button>

          <button 
            className={`lexi-prestamos__nav-btn ${pestanaActiva === 'devolver' ? 'activo' : ''}`}
            onClick={() => { setPestanaActiva('devolver'); setLibroSeleccionado(''); }}
          >
            <FaUndoAlt /> Devolver Libro
          </button>
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL DERECHO */}
      <main className="lexi-prestamos__main">
        {cargando ? (
          <div className="lexi-prestamos__cargando">Cargando información...</div>
        ) : (
          <>
            {/* HISTORIAL */}
            {pestanaActiva === 'historial' && (
              <div className="lexi-prestamos__seccion">
                <h2 className="lexi-prestamos__titulo-seccion">Resumen de Préstamos</h2>
                <p className="lexi-prestamos__subtext">Consulta los libros pendientes y devoluciones registradas.</p>

                <div className="lexi-prestamos__bloque">
                  <h3 className="lexi-prestamos__subtitulo warning">
                    <FaClock /> Libros por devolver
                  </h3>
                  {librosPorDevolver.length === 0 ? (
                    <p className="lexi-prestamos__vacio">No tienes libros pendientes de devolución.</p>
                  ) : (
                    <div className="lexi-prestamos__lista">
                      {librosPorDevolver.map((item, idx) => (
                        <div key={idx} className="lexi-prestamos__item-card por-devolver">
                          <FaBook className="icono-libro" />
                          <div className="info">
                            <h4>{item.bookTitle || item.libro || "Libro en préstamo"}</h4>
                            <span>Fecha Límite: {item.endDate || item.fechaDevolucion || "En fecha"}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="lexi-prestamos__bloque">
                  <h3 className="lexi-prestamos__subtitulo success">
                    <FaCheckCircle /> Libros devueltos
                  </h3>
                  {librosDevueltos.length === 0 ? (
                    <p className="lexi-prestamos__vacio">Aún no registras devoluciones previas.</p>
                  ) : (
                    <div className="lexi-prestamos__lista">
                      {librosDevueltos.map((item, idx) => (
                        <div key={idx} className="lexi-prestamos__item-card devuelto">
                          <FaBook className="icono-libro" />
                          <div className="info">
                            <h4>{item.bookTitle || item.libro || "Libro completado"}</h4>
                            <span>Entregado con éxito</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PEDIR PRÉSTAMO */}
            {pestanaActiva === 'pedir' && (
              <div className="lexi-prestamos__seccion">
                <h2 className="lexi-prestamos__titulo-seccion">Pedir Préstamo de Libro</h2>
                
                <form onSubmit={handleSolicitarPrestamo} className="lexi-prestamos__form">
                  <div className="lexi-prestamos__campo">
                    <label>Nombre del Solicitante</label>
                    <input type="text" value={usuarioSesion.name} readOnly className="input-disabled" />
                  </div>

                  <div className="lexi-prestamos__campo">
                    <label>Seleccionar Libro Disponible</label>
                    <select 
                      value={libroSeleccionado} 
                      onChange={(e) => setLibroSeleccionado(e.target.value)}
                      required
                    >
                      <option value="">-- Selecciona un libro --</option>
                      {libros.map((libro) => (
                        <option key={libro.bookId || libro.id} value={libro.id || libro.bookId}>
                          {libro.title} {libro.author ? `— ${libro.author}` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="lexi-prestamos__campo">
                    <label><FaCalendarAlt /> Fecha de Préstamo (Hoy)</label>
                    <input type="date" value={fechaPrestamo} readOnly className="input-disabled" />
                  </div>

                  <div className="lexi-prestamos__campo">
                    <label><FaCalendarAlt /> Fecha de Devolución Esperada (+1 Mes)</label>
                    <input 
                      type="date" 
                      value={fechaDevolucionEsperada} 
                      onChange={(e) => setFechaDevolucionEsperada(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="lexi-prestamos__btn-submit">
                    Completar Préstamo
                  </button>
                </form>
              </div>
            )}

            {/* DEVOLVER LIBRO */}
            {pestanaActiva === 'devolver' && (
              <div className="lexi-prestamos__seccion">
                <h2 className="lexi-prestamos__titulo-seccion">Devolver Libro</h2>
                
                <form onSubmit={handleDevolverLibro} className="lexi-prestamos__form">
                  <div className="lexi-prestamos__campo">
                    <label>Nombre del Usuario</label>
                    <input type="text" value={usuarioSesion.name} readOnly className="input-disabled" />
                  </div>

                  <div className="lexi-prestamos__campo">
                    <label>Seleccionar Libro a Devolver</label>
                    <select 
                      value={libroSeleccionado} 
                      onChange={(e) => setLibroSeleccionado(e.target.value)}
                      required
                    >
                      <option value="">-- Selecciona un libro prestado --</option>
                      {librosPorDevolver.map((item, idx) => (
                        <option key={idx} value={item.bookTitle || item.libro}>
                          {item.bookTitle || item.libro}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="lexi-prestamos__campo">
                    <label><FaCalendarAlt /> Fecha de Devolución (Hoy)</label>
                    <input type="date" value={fechaPrestamo} readOnly className="input-disabled" />
                  </div>

                  <button type="submit" className="lexi-prestamos__btn-submit devolver">
                    Registrar Devolución
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}