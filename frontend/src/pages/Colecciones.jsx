import React from 'react';
import { 
  FaBook, 
  FaDragon, 
  FaGhost, 
  FaGraduationCap, 
  FaAward, 
  FaChild 
} from 'react-icons/fa';
import './Colecciones.css';

function Colecciones() {
  // Datos estáticos basados en la clasificación de los géneros
  const categorias = [
    {
      id: 'narrativa-ficcion',
      titulo: 'Narrativa Ficción y Novelas',
      descripcion: 'Explora grandes obras de realismo mágico, novelas históricas, ficción absurda y cuentos clásicos.',
      icono: <FaBook />,
      cantidad: '15 libros'
    },
    {
      id: 'fantasia-ciencia-ficcion',
      titulo: 'Fantasía y Ciencia Ficción',
      descripcion: 'Viaja a mundos alternativos con colecciones de fantasía épica, tecnología futurista y distopías impactantes.',
      icono: <FaDragon />,
      cantidad: '10 libros'
    },
    {
      id: 'misterio-terror',
      titulo: 'Misterio, Suspenso y Terror',
      descripcion: 'Adéntrate en la intriga con novelas psicológicas, suspenso atrapante y relatos de terror gótico.',
      icono: <FaGhost />,
      cantidad: '6 libros'
    },
    {
      id: 'no-ficcion-academico',
      titulo: 'No Ficción y Académico',
      descripcion: 'Amplía tu conocimiento con ensayos históricos, tratados filosóficos y lecturas de autoayuda.',
      icono: <FaGraduationCap />,
      cantidad: '3 libros'
    },
    {
      id: 'poesia-clasicos',
      titulo: 'Poesía y Clásicos',
      descripcion: 'Grandes epopeyas históricas y obras literarias inmortales que han trascendido a través del tiempo.',
      icono: <FaAward />,
      cantidad: '1 libro'
    },
    {
      id: 'infantil-juvenil',
      titulo: 'Literatura Infantil y Juvenil',
      descripcion: 'Lecturas seleccionadas para los más jóvenes, desde cuentos ilustrados hasta novelas de aprendizaje.',
      icono: <FaChild />,
      cantidad: '2 libros'
    }
  ];

  const handleCategoriaClick = (id) => {
    // Por ahora solo muestra un log. Aquí irá la lógica de filtrado o navegación al conectar el backend
    console.log(`Clic en la colección: ${id}`);
  };

  return (
    <div className="lexi-colecciones">
      <header className="lexi-colecciones__header">
        <h2 className="lexi-colecciones__titulo">Colecciones de la Biblioteca</h2>
        <p className="lexi-colecciones__subtitulo">
          Explora nuestros compendios especializados organizados por géneros y temáticas literarias.
        </p>
      </header>

      <div className="lexi-colecciones__grid">
        {categorias.map((cat) => (
          <div 
            key={cat.id} 
            className="lexi-colecciones__tarjeta"
            onClick={() => handleCategoriaClick(cat.id)}
          >
            <div className="lexi-colecciones__icono-wrapper">
              {cat.icono}
            </div>
            <h3 className="lexi-colecciones__tarjeta-titulo">{cat.titulo}</h3>
            <p className="lexi-colecciones__tarjeta-desc">{cat.descripcion}</p>
            <span className="lexi-colecciones__tarjeta-badge">{cat.cantidad}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Colecciones;