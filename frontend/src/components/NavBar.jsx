import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; 
import SidebarUsuario from './SidebarUsuario';
import './NavBar.css';

function Navbar() {
  // Estado para el menú desplegable de Servicios
  const [menuAbierto, setMenuAbierto] = useState(false);
  
  // Estado para controlar la apertura del Sidebar de Perfil
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  // Función para alternar el menú de servicios
  const toggleMenu = (e) => {
    e.preventDefault();
    setMenuAbierto(!menuAbierto);
  };

  return (
    <>
      <nav className="lexi-nav">
        {/* Enlaces del lado izquierdo */}
        <ul className="lexi-nav__menu lexi-nav__menu--izquierdo">
          
          {/* Botón de Perfil que activa el Sidebar */}
          <li className="lexi-nav__item lexi-nav__item--usuario">
            <button 
              type="button"
              className="lexi-nav__enlace-usuario lexi-nav__btn-reset"
              onClick={() => setSidebarAbierto(true)}
            >
              <FaUserCircle className="lexi-nav__usuario-icono" />
            </button>
          </li>

          <li className="lexi-nav__item">
            <Link to="/" className="lexi-nav__enlace">HOME</Link>
          </li>
          
          {/* Menú desplegable de Servicios */}
          <li className="lexi-nav__item lexi-nav__item--dropdown">
            <a href="#servicios" className="lexi-nav__enlace" onClick={toggleMenu}>
              SERVICIOS <span className={`lexi-nav__flecha ${menuAbierto ? 'lexi-nav__flecha--abierto' : ''}`}>▼</span>
            </a>

            {menuAbierto && (
              <ul className="lexi-nav__submenu">
                {JSON.parse(localStorage.getItem('usuarioLexicanum')) && (
                  <li className="lexi-nav__submenu-item">
                    <Link 
                      to="/prestamos" 
                      className="lexi-nav__submenu-enlace"
                      onClick={() => setMenuAbierto(false)}
                    >
                      Préstamos de Libros
                    </Link>
                  </li>
                )}
                <li className="lexi-nav__submenu-item">
                  <Link 
                    to="/lectura-en-linea" 
                    className="lexi-nav__submenu-enlace"
                    onClick={() => setMenuAbierto(false)}
                  >
                    Lectura en línea
                  </Link>
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

      {/* Componente del Sidebar Desplegable */}
      <SidebarUsuario 
        isOpen={sidebarAbierto} 
        onClose={() => setSidebarAbierto(false)} 
      />
    </>
  );
}

export default Navbar;