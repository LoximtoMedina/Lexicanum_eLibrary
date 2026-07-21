import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Importamos el icono de usuario
import './NavBar.css';

function Navbar() {
  // Estado para controlar si el menú de servicios está abierto o cerrado
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Función para alternar el estado (abrir/cerrar)
  const toggleMenu = (e) => {
    e.preventDefault(); // Evita que la página salte al hacer clic en el enlace
    setMenuAbierto(!menuAbierto);
  };

  return (
    <nav className="lexi-nav">
      {/* Enlaces del lado izquierdo */}
      <ul className="lexi-nav__menu lexi-nav__menu--izquierdo">
        {/* NUEVA: Sección de Usuario (a la izquierda de HOME) */}
        <li className="lexi-nav__item lexi-nav__item--usuario">
          <Link to="/perfil" className="lexi-nav__enlace-usuario">
            <FaUserCircle className="lexi-nav__usuario-icono" />
            <span className="lexi-nav__usuario-texto">Mi Perfil</span>
          </Link>
        </li>

        <li className="lexi-nav__item">
          <Link to="/" className="lexi-nav__enlace">HOME</Link>
        </li>
        
        {/* Agregamos el evento onClick y una clase condicional */}
        <li className="lexi-nav__item lexi-nav__item--dropdown">
          <a href="#servicios" className="lexi-nav__enlace" onClick={toggleMenu}>
            SERVICIOS <span className={`lexi-nav__flecha ${menuAbierto ? 'lexi-nav__flecha--abierto' : ''}`}>▼</span>
          </a>

          {/* Menú Desplegable: Solo se renderiza si menuAbierto es true */}
          {menuAbierto && (
            <ul className="lexi-nav__submenu">
              <li className="lexi-nav__submenu-item">
                <a href="#prestamos" className="lexi-nav__submenu-enlace">Préstamos de Libros</a>
              </li>
              <li className="lexi-nav__submenu-item">
                <a href="#salas" className="lexi-nav__submenu-enlace">Lectura en línea</a>
              </li>
              <li className="lexi-nav__submenu-item">
                <a href="#Soporte" className="lexi-nav__submenu-enlace">Lectura sin conexión</a>
              </li>
            </ul>
          )}
        </li>

        <li className="lexi-nav__item">
          <Link to="/editoriales" className="lexi-nav__enlace">EDITORIALES</Link>
        </li>
      </ul>

      {/* Logotipo Centrado */}
      <Link to="/" className="lexi-nav__logo" style={{ textDecoration: 'none' }}>
        <span className="lexi-nav__logo-prefix">L</span>
        <span className="lexi-nav__logo-texto">exicanum</span>
      </Link>

      {/* Enlaces del lado derecho */}
      <ul className="lexi-nav__menu lexi-nav__menu--derecho">
        <li className="lexi-nav__item">
          <Link to="/universidades" className="lexi-nav__enlace">UNIVERSIDADES</Link>
        </li>
        <li className="lexi-nav__item">
          <Link to="/colecciones" className="lexi-nav__enlace">COLECCIONES</Link>
        </li>
        <li className="lexi-nav__item">
          <Link to="/libros" className="lexi-nav__enlace">LIBROS</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;