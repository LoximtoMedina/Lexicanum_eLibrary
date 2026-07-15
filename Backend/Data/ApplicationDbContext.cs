using Microsoft.EntityFrameworkCore;
using Backend.Features.Books;

namespace Backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        // Agregar los DbSet para Users y Loans más adelante
    }
}