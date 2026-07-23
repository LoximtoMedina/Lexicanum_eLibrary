import React, { useEffect, useState } from 'react';

export default function GutenbergReader({ titulo }) {
  const [embedUrl, setEmbedUrl] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [errorLectura, setErrorLectura] = useState(false);

  useEffect(() => {
    let cancelado = false;

    const obtenerLibroGutenberg = async () => {
      setCargando(true);
      setErrorLectura(false);

      try {
        // 1. Consultar Gutendex sin restringir idioma
        const query = encodeURIComponent(titulo.trim());
        const res = await fetch(`https://gutendex.com/books/?search=${query}`);
        const data = await res.json();

        if (cancelado) return;

        if (data.results && data.results.length > 0) {
          const libro = data.results[0];
          const formats = libro.formats;

          // 2. Buscar cualquier formato HTML disponible
          const htmlKey = Object.keys(formats).find(key => key.includes('text/html'));

          if (htmlKey && formats[htmlKey]) {
            const urlSegura = formats[htmlKey].replace('http://', 'https://');
            setEmbedUrl(urlSegura);
          } else {
            setErrorLectura(true);
          }
        } else {
          setErrorLectura(true);
        }
      } catch (err) {
        console.error("Error al conectar con Gutendex:", err);
        if (!cancelado) setErrorLectura(true);
      } finally {
        if (!cancelado) setCargando(false);
      }
    };

    if (titulo) {
      obtenerLibroGutenberg();
    }

    return () => {
      cancelado = true;
    };
  }, [titulo]);

  if (cargando) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
        Obteniendo libro desde Proyecto Gutenberg...
      </div>
    );
  }

  if (errorLectura || !embedUrl) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', color: '#ef4444' }}>
        No se encontró una versión digital disponible para este libro.
      </div>
    );
  }

  return (
    <iframe
      src={embedUrl}
      title={`Lectura de ${titulo}`}
      width="100%"
      height="100%"
      style={{
        border: 'none',
        minHeight: '550px',
        display: 'block',
        backgroundColor: '#ffffff'
      }}
      allowFullScreen
    />
  );
}