
import React from 'react';
import { FaUniversity, FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';
import './TarjetaUniversidad.css';

export default function TarjetaUniversidad({ 
  nombre, 
  siglas, 
  ubicacion = "Honduras", 
  descripcion = "Institución académica vinculada al catálogo unificado de Lexicanum." 
}) {
  return (
    <article className="lexi-universidad__tarjeta">
      <div className="lexi-universidad__icono-wrapper">
        <FaUniversity />
      </div>

      {siglas && <span className="lexi-universidad__siglas">{siglas}</span>}

      <h3 className="lexi-universidad__nombre">{nombre}</h3>

      <div className="lexi-universidad__meta">
        <FaMapMarkerAlt />
        <span>{ubicacion}</span>
      </div>

      <p className="lexi-universidad__descripcion">
        {descripcion}
      </p>

      <div className="lexi-universidad__badge">
        <FaGraduationCap /> INSTITUCIÓN REGISTRADA
      </div>
    </article>
  );
}