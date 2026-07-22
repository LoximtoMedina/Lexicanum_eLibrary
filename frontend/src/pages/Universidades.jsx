import React, { useState, useEffect } from 'react';
import { getUniversities } from '../services/api';
import TarjetaUniversidad from '../components/TarjetaUniversidad';
import './Universidades.css';

export default function Universidades() {
  const [universidades, setUniversidades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerUniversidades = async () => {
      try {
        const respuesta = await getUniversities();
        const datos = respuesta.data;

        // Filtrar registros válidos y activos (si la entidad incluye 'active' o 'activo')
        const universidadesValidas = datos.filter(uni => {
          const tieneNombre = Boolean(uni.name || uni.nombre || uni.universityName);
          const esActivo = uni.active !== false && uni.activo !== false;
          return tieneNombre && esActivo;
        });

        setUniversidades(universidadesValidas);
      } catch (err) {
        console.error("Error al obtener universidades:", err);
        setError("No se pudieron cargar las universidades desde el servidor.");
      } finally {
        setCargando(false);
      }
    };

    obtenerUniversidades();
  }, []);

  if (cargando) return <div className="lexi-universidades__mensaje">Cargando universidades...</div>;
  if (error) return <div className="lexi-universidades__mensaje error">{error}</div>;

  return (
    <main className="lexi-universidades">
      <header className="lexi-universidades__header">
        <h1 className="lexi-universidades__titulo">Universidades Afiliadas</h1>
        <p className="lexi-universidades__subtitulo">
          Instituciones educativas conectadas al ecosistema de recursos bibliográficos de Lexicanum.
        </p>
      </header>

      {universidades.length === 0 ? (
        <div className="lexi-universidades__mensaje">
          No hay universidades registradas actualmente.
        </div>
      ) : (
        <div className="lexi-universidades__grid">
          {universidades.map((uni, index) => (
            <TarjetaUniversidad 
              key={uni.universityId || uni.id || index}
              nombre={uni.name || uni.nombre || uni.universityName}
              siglas={uni.acronym || uni.siglas || uni.code}
              ubicacion={uni.location || uni.ubicacion || uni.city || "Honduras"}
              descripcion={uni.description || uni.descripcion || "Institución académica vinculada al catálogo unificado de Lexicanum."}
            />
          ))}
        </div>
      )}
    </main>
  );
}