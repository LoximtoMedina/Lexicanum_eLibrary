using System;
using System.Collections.Generic;

namespace LexicanumBackend.Models;

public partial class Usuario
{
    public int IdUsuario { get; set; }

    public string? Nombre { get; set; }

    public string? Correo { get; set; }

    public string? FechaRegistro { get; set; }

    public string ContraseniaUsuario { get; set; } = null!;

    public bool? Activo { get; set; }

    public virtual ICollection<Prestamo> Prestamos { get; set; } = new List<Prestamo>();
}
