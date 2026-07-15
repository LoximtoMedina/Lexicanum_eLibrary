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

        // Obtener todos los libros (Filtra solo los que estén activos).
        public async Task<List<Book>> GetBooksAsync()
        {
            return await _context.Books.Where(b => b.Activo).ToListAsync();
        }

        // Obtener libros por categoría (columna 'genero' en tu BD).
        public async Task<List<Book>> GetBooksByCategoryAsync(string category)
        {
            return await _context.Books.Where(b => b.Genero.ToLower() == category.ToLower() && b.Activo).ToListAsync();
        }

        public async Task<Book> AddBookAsync(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return book;
        }

        // Actualizar la información de un libro.
        public async Task<bool> UpdateBookAsync(int id, Book bookData)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null) return false;

            book.Titulo = bookData.Titulo;
            book.Autor = bookData.Autor;
            book.Genero = bookData.Genero;
            book.AnioPublicacion = bookData.AnioPublicacion;
            book.CantidadDisponible = bookData.CantidadDisponible;
            book.Editorial = bookData.Editorial;
            book.Edicion = bookData.Edicion;

            await _context.SaveChangesAsync();
            return true;
        }

        // Realiza Soft Delete, es decir, marca un libro como inactivo en lugar de eliminarlo físicamente.
        public async Task<bool> SoftDeleteBookAsync(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null) return false;

            book.Activo = false;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}