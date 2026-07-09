using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace LexicanumBackend.Models;

public partial class PostgresContext : DbContext
{
    public PostgresContext()
    {
    }

    public PostgresContext(DbContextOptions<PostgresContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Libro> Libros { get; set; }

    public virtual DbSet<Prestamo> Prestamos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=100.69.251.29;Database=postgres;Username=postgres;Password=1234");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Libro>(entity =>
        {
            entity.HasKey(e => e.IdLibro).HasName("libros_pkey");

            entity.ToTable("libros");

            entity.Property(e => e.IdLibro).HasColumnName("id_libro");
            entity.Property(e => e.Activo)
                .HasDefaultValue(true)
                .HasColumnName("activo");
            entity.Property(e => e.AnioPublicacion).HasColumnName("anio_publicacion");
            entity.Property(e => e.Autor).HasColumnName("autor");
            entity.Property(e => e.CantidadDisponible).HasColumnName("cantidad_disponible");
            entity.Property(e => e.Edicion).HasColumnName("edicion");
            entity.Property(e => e.Editorial).HasColumnName("editorial");
            entity.Property(e => e.Genero).HasColumnName("genero");
            entity.Property(e => e.Titulo).HasColumnName("titulo");
        });

        modelBuilder.Entity<Prestamo>(entity =>
        {
            entity.HasKey(e => e.IdPrestamo).HasName("prestamos_pkey");

            entity.ToTable("prestamos");

            entity.Property(e => e.IdPrestamo)
                .ValueGeneratedNever()
                .HasColumnName("id_prestamo");
            entity.Property(e => e.Estado)
                .HasMaxLength(15)
                .HasDefaultValueSql("'activo'::character varying")
                .HasColumnName("estado");
            entity.Property(e => e.FechaDevolucionEsperada).HasColumnName("fecha_devolucion_esperada");
            entity.Property(e => e.FechaPrestamo).HasColumnName("fecha_prestamo");
            entity.Property(e => e.IdLibro).HasColumnName("id_libro");
            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.LibrosPrestados).HasColumnName("libros_prestados");
            entity.Property(e => e.Penalizacion)
                .HasMaxLength(2)
                .HasDefaultValueSql("'No'::character varying")
                .HasColumnName("penalizacion");

            entity.HasOne(d => d.IdLibroNavigation).WithMany(p => p.Prestamos)
                .HasForeignKey(d => d.IdLibro)
                .HasConstraintName("prestamos_id_libro_fkey");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Prestamos)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("prestamos_id_usuario_fkey");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("usuarios_pkey");

            entity.ToTable("usuarios");

            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.Activo)
                .HasDefaultValue(true)
                .HasColumnName("activo");
            entity.Property(e => e.ContraseniaUsuario)
                .HasMaxLength(255)
                .HasColumnName("contrasenia_usuario");
            entity.Property(e => e.Correo).HasColumnName("correo");
            entity.Property(e => e.FechaRegistro).HasColumnName("fecha_registro");
            entity.Property(e => e.Nombre).HasColumnName("nombre");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
