using System;
using System.Collections.Generic;

namespace LexicanumBackend.Models;

public partial class Libro
{
    public int IdLibro { get; set; }

    public string? Titulo { get; set; }

    public string? Autor { get; set; }

    public string? Genero { get; set; }

    public int? AnioPublicacion { get; set; }

    public int? CantidadDisponible { get; set; }

    public string? Editorial { get; set; }

    public string? Edicion { get; set; }

    public bool? Activo { get; set; }

    public virtual ICollection<Prestamo> Prestamos { get; set; } = new List<Prestamo>();
}
