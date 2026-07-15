
import React from 'react';
import { FaExternalLinkAlt, FaCompass, FaBookOpen } from 'react-icons/fa';
import './Editoriales.css';

function Editoriales() {
  // Información estructurada de las legendarias editoriales de tu lista
  const editorialesData = [
    {
      nombre: "Bloomsbury Publishing",
      pais: "Reino Unido (Londres)",
      hito: "Editora original de la saga 'Harry Potter'",
      descripcion: "Fundada en 1986, esta editorial británica alcanzó fama mundial instantánea a finales de los 90 tras aceptar publicar a J.K. Rowling cuando múltiples casas editoras la habían rechazado.",
      enlace: "https://es.wikipedia.org/wiki/Bloomsbury_Publishing"
    },
    {
      nombre: "George Allen & Unwin",
      pais: "Reino Unido (Londres)",
      hito: "Casa original de 'El Señor de los Anillos' y 'El Hobbit'",
      descripcion: "Una de las casas editoriales más influyentes del siglo XX. Es eternamente reconocida por su estrecha relación con J.R.R. Tolkien, publicando sus obras maestras de la Tierra Media.",
      enlace: "https://en.wikipedia.org/wiki/George_Allen_%26_Unwin"
    },
    {
      nombre: "Editorial Sudamericana",
      pais: "Argentina (Buenos Aires)",
      hito: "Publicó la primera edición de 'Cien años de soledad'",
      descripcion: "Fundada en 1939 por intelectuales argentinos y españoles exiliados. Se convirtió en el corazón literario de Sudamérica y pieza fundamental del 'Boom Latinoamericano'.",
      enlace: "https://es.wikipedia.org/wiki/Editorial_Sudamericana"
    },
    {
      nombre: "El Mensajero Ruso",
      pais: "Imperio Ruso (Moscú)",
      hito: "Cuna de 'Crimen y castigo' y 'Guerra y paz'",
      descripcion: "Aunque operaba como una revista literaria mensual en el siglo XIX, fue la plataforma que imprimió por primera vez y por entregas las obras más gigantescas de Dostoyevski y Tolstói.",
      enlace: "https://es.wikipedia.org/wiki/El_Mensajero_Ruso"
    },
    {
      nombre: "Charles Scribner's Sons",
      pais: "Estados Unidos (Nueva York)",
      hito: "Editora de Hemingway y F. Scott Fitzgerald",
      descripcion: "Fundada en 1846, esta legendaria firma neoyorquina descubrió y pulió a los mayores talentos de la 'Generación Perdida' estadounidense del siglo pasado.",
      enlace: "https://es.wikipedia.org/wiki/Charles_Scribner%27s_Sons"
    },
    {
      nombre: "Reynal & Hitchcock",
      pais: "Estados Unidos (Nueva York)",
      hito: "Primeros en publicar 'El Principito'",
      descripcion: "Casa editorial estadounidense célebre por haber publicado en 1943 la primera edición oficial (tanto en inglés como en francés) de la obra maestra de Antoine de Saint-Exupéry.",
      enlace: "https://en.wikipedia.org/wiki/Reynal_%26_Hitchcock"
    },
    {
      nombre: "Editorial Seix Barral",
      pais: "España (Barcelona)",
      hito: "Pilar del Boom Latinoamericano",
      descripcion: "Establecida en 1911, es una de las editoriales literarias en español más prestigiosas de la historia, propulsora de grandes premios literarios y de la narrativa hispánica moderna.",
      enlace: "https://es.wikipedia.org/wiki/Seix_Barral"
    },
    {
      nombre: "Lackington, Hughes, Harding & Co.",
      pais: "Reino Unido (Londres)",
      hito: "Impresores originales de 'Frankenstein' (1818)",
      descripcion: "Famosa librería e imprenta londinense del siglo XIX, dirigida por James Lackington. Pasó a la inmortalidad al publicar de manera anónima la obra cumbre de Mary Shelley.",
      enlace: "https://en.wikipedia.org/wiki/James_Lackington"
    },
    {
      nombre: "Kurt Wolff Verlag",
      pais: "Alemania (Leipzig)",
      hito: "Primera editorial de Franz Kafka",
      descripcion: "Sello de vanguardia crucial para el expresionismo alemán a inicios del siglo XX. Kurt Wolff fue el primer editor con la visión de publicar 'La metamorfosis' en 1915.",
      enlace: "https://es.wikipedia.org/wiki/Kurt_Wolff"
    }
  ];

  return (
    <div className="lexi-editoriales">
      <header className="lexi-editoriales__header">
        <h2 className="lexi-editoriales__titulo">Editoriales Históricas</h2>
        <p className="lexi-editoriales__subtitulo">
          Conoce las legendarias imprentas y casas editoras que descubrieron y llevaron al papel los libros más trascendentales de la literatura universal.
        </p>
      </header>

      <div className="lexi-editoriales__grid">
        {editorialesData.map((editorial, index) => (
          <div key={index} className="lexi-editoriales__tarjeta">
            <div className="lexi-editoriales__tarjeta-cabecera">
              <span className="lexi-editoriales__badge-pais">
                <FaCompass /> {editorial.pais}
              </span>
              <h3 className="lexi-editoriales__nombre">{editorial.nombre}</h3>
              <p className="lexi-editoriales__hito">
                <FaBookOpen /> {editorial.hito}
              </p>
            </div>
            
            <div className="lexi-editoriales__tarjeta-cuerpo">
              <p className="lexi-editoriales__descripcion">{editorial.descripcion}</p>
            </div>

            <div className="lexi-editoriales__tarjeta-pie">
              <a 
                href={editorial.enlace} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="lexi-editoriales__enlace-mas"
              >
                Saber más <FaExternalLinkAlt className="lexi-editoriales__icono-enlace" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Editoriales;