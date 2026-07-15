using Backend.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Features.Books
{
    public class BookService
    {
        private readonly ApplicationDbContext _context;

        public BookService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Obtener todos los libros (Filtra solo los que estén activos)
        public async Task<List<Book>> GetAllBooksAsync()
        {
            return await _context.Books
                                 .Where(b => b.Activo)
                                 .ToListAsync();
        }

        // Obtener libros por categoría (columna 'genero' en tu BD)
        public async Task<List<Book>> GetBooksByCategoryAsync(string category)
        {
            return await _context.Books
                                 .Where(b => b.Genero.ToLower() == category.ToLower() && b.Activo)
                                 .ToListAsync();
        }
    }
}