import React from 'react';
import { 
  FaDragon, 
  FaBook, 
  FaChild, 
  FaHeart, 
  FaMicroscope, 
  FaGhost, 
  FaLandmark, 
  FaTheaterMasks, 
  FaMagic, 
  FaBookmark 
} from 'react-icons/fa';
import './TarjetaColeccion.css';

// Mapeo dinámico de íconos según el género exacto de la API
const obtenerIconoYDescripcion = (genero) => {
  const g = genero.toLowerCase();

  if (g.includes('fantasía')) {
    return {
      icono: <FaDragon />,
      desc: "Viaja a mundos alternativos con colecciones de fantasía épica y magia."
    };
  }
  if (g.includes('misterio') || g.includes('suspenso')) {
    return {
      icono: <FaGhost />,
      desc: "Adéntrate en la intriga con novelas de suspenso atrapante y acertijos."
    };
  }
  if (g.includes('infantil')) {
    return {
      icono: <FaChild />,
      desc: "Relatos y fábulas llenas de imaginación, amistad y aprendizajes."
    };
  }
  if (g.includes('romance')) {
    return {
      icono: <FaHeart />,
      desc: "Obras románticas, relaciones y pasiones a través de diferentes épocas."
    };
  }
  if (g.includes('divulgación') || g.includes('ciencia') || g.includes('autoayuda')) {
    return {
      icono: <FaMicroscope />,
      desc: "Conocimiento, ciencia y herramientas para el desarrollo personal."
    };
  }
  if (g.includes('historia')) {
    return {
      icono: <FaLandmark />,
      desc: "Un recorrido fascinante por la evolución humana y eventos históricos."
    };
  }
  if (g.includes('realismo mágico') || g.includes('absurdo')) {
    return {
      icono: <FaMagic />,
      desc: "Cuentos y sagas donde lo cotidiano se entrelaza con lo insólito."
    };
  }
  if (g.includes('drama') || g.includes('novela') || g.includes('clásico')) {
    return {
      icono: <FaTheaterMasks />,
      desc: "Grandes obras literarias, conflictos profundos y clásicos inolvidables."
    };
  }

  return {
    icono: <FaBookmark />,
    desc: "Explora los libros disponibles en este compendio especializado."
  };
};

export default function TarjetaColeccion({ nombreColeccion, cantidadLibros }) {
  const { icono, desc } = obtenerIconoYDescripcion(nombreColeccion);

  return (
    <article className="lexi-coleccion__tarjeta">
      <div className="lexi-coleccion__icono-wrapper">
        {icono}
      </div>

      <h3 className="lexi-coleccion__titulo">
        {nombreColeccion}
      </h3>

      <p className="lexi-coleccion__descripcion">
        {desc}
      </p>

      <div className="lexi-coleccion__badge">
        {cantidadLibros} {cantidadLibros === 1 ? 'LIBRO' : 'LIBROS'}
      </div>
    </article>
  );
}