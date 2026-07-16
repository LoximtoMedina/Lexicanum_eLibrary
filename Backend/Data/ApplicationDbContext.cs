using Backend.Features.Books;
using Backend.Features.Loans;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options){}

        public DbSet<Book> Books { get; set; }
        public DbSet<Loan> Loans { get; set; }

    }
}