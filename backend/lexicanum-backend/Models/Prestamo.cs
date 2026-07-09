using System;
using System.Collections.Generic;

namespace LexicanumBackend.Models;

public partial class Prestamo
{
    public int IdPrestamo { get; set; }

    public int? IdUsuario { get; set; }

    public int? IdLibro { get; set; }

    public DateOnly? FechaPrestamo { get; set; }

    public DateOnly? FechaDevolucionEsperada { get; set; }

    public string? Estado { get; set; }

    public int? LibrosPrestados { get; set; }

    public string? Penalizacion { get; set; }

    public virtual Libro? IdLibroNavigation { get; set; }

    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
