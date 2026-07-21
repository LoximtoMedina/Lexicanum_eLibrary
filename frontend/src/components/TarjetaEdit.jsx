import React from 'react';
import { FaGlobeAmericas, FaBook, FaExternalLinkAlt } from 'react-icons/fa';
import './TarjetaEdit.css'; // Si usas un CSS independiente de tarjeta

export default function TarjetaEditorial({ 
  nombreEditorial, 
  cantidadLibros, 
  pais = "Internacional", 
  descripcion = "Descubre el catálogo completo de títulos publicados por esta editorial en nuestra plataforma." 
}) {
  return (
    <article className="lexi-editoriales__tarjeta">
      <div className="lexi-editoriales__tarjeta-body">
        {/* Badge de País/Ubicación */}
        <div className="lexi-editoriales__badge-pais">
          <FaGlobeAmericas />
          <span>{pais}</span>
        </div>

        {/* Nombre de la Editorial */}
        <h3 className="lexi-editoriales__nombre" title={nombreEditorial}>
          {nombreEditorial}
        </h3>

        {/* Total de libros */}
        <div className="lexi-editoriales__hito">
          <FaBook />
          <span>{cantidadLibros} {cantidadLibros === 1 ? 'libro disponible' : 'libros disponibles'}</span>
        </div>

        {/* Descripción corta */}
        <p className="lexi-editoriales__descripcion">
          {descripcion}
        </p>
      </div>

      {/* Pie de la tarjeta con acción */}
      <div className="lexi-editoriales__tarjeta-pie">
        <a href="#ver-libros" className="lexi-editoriales__enlace-mas">
          Ver publicaciones
          <FaExternalLinkAlt className="lexi-editoriales__icono-enlace" />
        </a>
      </div>
    </article>
  );
}