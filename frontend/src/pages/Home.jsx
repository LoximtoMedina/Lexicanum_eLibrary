
import {useState} from 'react';
import { FaBuilding, FaUniversity, FaBookOpen, FaHeadset } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Home.css'

function Home() {
  return (
    <div className="lexi-home">
      {/* Sección de Bienvenida / Hero Section */}
      <header className="lexi-home__hero">
        <div className="lexi-home__hero-contenido">
          <h2 className="lexi-home__hero-titulo">Bienvenidos a Lexicanum</h2>
          <p className="lexi-home__hero-subtitulo">
            Tu portal digital de acceso al conocimiento. Explora miles de recursos académicos, 
            libros digitales y herramientas de investigación en un solo lugar.
          </p>
        </div>
      </header>

      {/* Sección de Accesos Directos */}
      <section className="lexi-home__seccion-accesos">
        <h3 className="lexi-home__seccion-titulo">Explorar la Biblioteca</h3>
        
        <div className="lexi-home__cuadricula">
          {/* Tarjeta 1: Editoriales */}
          <a href="#editoriales" className="lexi-home__tarjeta">
            <div className="lexi-home__tarjeta-icono-wrapper">
              <FaBuilding className="lexi-home__tarjeta-icono-svg" />
            </div>
            <h4 className="lexi-home__tarjeta-titulo">Editoriales</h4>
            <p className="lexi-home__tarjeta-desc">Descubre las editoriales que ofrece la plataforma.</p>
          </a>

          {/* Tarjeta 2: Universidades */}
          <a href="#universidades" className="lexi-home__tarjeta">
            <div className="lexi-home__tarjeta-icono-wrapper">
              <FaUniversity className="lexi-home__tarjeta-icono-svg" />
            </div>
            <h4 className="lexi-home__tarjeta-titulo">Universidades</h4>
            <p className="lexi-home__tarjeta-desc">Explora las universidades que tienen acceso a nuestra plataforma.</p>
          </a>

          {/* Tarjeta 3: Colecciones modificada en Home.jsx */}
          <Link to="/colecciones" className="lexi-home__tarjeta">
            <div className="lexi-home__tarjeta-icono-wrapper">
              <FaBookOpen className="lexi-home__tarjeta-icono-svg" />
            </div>
            <h4 className="lexi-home__tarjeta-titulo">Colecciones</h4>
            <p className="lexi-home__tarjeta-desc">Explora las colecciones de libros que tienes disponibles.</p>
          </Link>

          {/* Tarjeta 4: Contacto */}
          <a href="#contacto" className="lexi-home__tarjeta">
            <div className="lexi-home__tarjeta-icono-wrapper">
              <FaHeadset className="lexi-home__tarjeta-icono-svg" />
            </div>
            <h4 className="lexi-home__tarjeta-titulo">Contacto & Soporte</h4>
            <p className="lexi-home__tarjeta-desc">¿Tienes dudas o necesitas ayuda? Ponte en contacto con nosotros.</p>
          </a>
        </div>
      </section>

      {/* Sección Informativa Inferior */}
      <section className="lexi-home__informacion">
        <div className="lexi-home__info-bloque">
          <h3>Sobre Nuestra Plataforma</h3>
          <p>
            Lexicanum es un sistema de gestión y consulta diseñado para optimizar el acceso a material bibliográfico 
            de alta calidad. Nos enfocamos en ofrecer una experiencia de usuario fluida, integrada y con herramientas 
            avanzadas para estudiantes, docentes e investigadores.
          </p>
        </div>
        <div className="lexi-home__info-bloque">
          <h3>Horarios y Disponibilidad</h3>
          <p>
            Nuestros servidores y el catálogo digital están disponibles las 24 horas del día, los 7 días de la semana. 
            El servicio de soporte técnico y reserva física de salas opera de lunes a viernes en horario administrativo.
          </p>
        </div>
      </section>

      {/* Mini Footer de Créditos / Desarrolladores */}
      <footer className="lexi-home__footer">
        <div className="lexi-home__footer-linea"></div>
        <p className="lexi-home__footer-texto">
          © {new Date().getFullYear()} Lexicanum eLibrary. Desarrollado por:
        </p>
        <div className="lexi-home__desarrolladores">
          <span className="lexi-home__dev-nombre">Yafet Alessandro Flores Zavala</span>
          <span className="lexi-home__dev-separador">•</span>
          <span className="lexi-home__dev-nombre">Cristian Josué Medina Galeano</span>
          <span className="lexi-home__dev-separador">•</span>
          <span className="lexi-home__dev-nombre">Iván Ernesto Machado Obando</span>
        </div>
      </footer>

    </div>
  );
}

export default Home;