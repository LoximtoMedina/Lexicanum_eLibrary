using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Features.Loans;

[Table("prestamos")]
public class Loan
{
    [Key]
    [Column("id_prestamo")]
    public int IdPrestamo { get; set; }

    [Column("id_usuario")]
    public int IdUsuario { get; set; }

    [Column("id_libro")]
    public int IdLibro { get; set; }

    [Column("fecha_prestamo")]
    public DateTime FechaPrestamo { get; set; }

    [Column("fecha_devolucion_esperada")]
    public DateTime FechaDevolucionEsperada { get; set; }

    [Column("estado")]
    public string Estado { get; set; } = string.Empty;

    [Column("libros_prestados")]
    public int LibrosPrestados { get; set; }

    [Column("penalizacion")]
    public string Penalizacion { get; set; } = string.Empty;
}