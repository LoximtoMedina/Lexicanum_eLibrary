using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Features.Books
{
    [Table("libros")] // Nombre exacto de la tabla en Postgres
    public class Book
    {
        [Key]
        [Column("id_libro")]
        public int IdLibro { get; set; }

        [Column("titulo")]
        public string Titulo { get; set; } = string.Empty;

        [Column("autor")]
        public string Autor { get; set; } = string.Empty;

        [Column("genero")]
        public string Genero { get; set; } = string.Empty;

        [Column("anio_publicacion")]
        public int AnioPublicacion { get; set; }

        [Column("cantidad_disponible")]
        public int CantidadDisponible { get; set; }

        [Column("editorial")]
        public string Editorial { get; set; } = string.Empty;

        [Column("edicion")]
        public string Edicion { get; set; } = string.Empty;

        [Column("activo")]
        public bool Activo { get; set; } = true;
    }
}