using Microsoft.EntityFrameworkCore;
using Backend.Features.Books;
using Backend.Data;

namespace Backend.Features.Books
{
    public class BookService
    {
        private readonly ApplicationDbContext _context;

        public BookService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Book>> GetBooksAsync()
        {
            return await _context.Books.ToListAsync();
        }

        public async Task<Book?> GetByIdAsync(int id)
        {
            return await _context.Books.FirstOrDefaultAsync(b => b.BookId == id && b.Active == true);
        }

        public async Task<Book> AddBookAsync(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return book;
        }

        public async Task<bool> UpdateBookAsync(int id, Book bookData)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null || book.Active == false) return false;

            book.Title = bookData.Title;
            book.Author = bookData.Author;
            book.Synopsis = bookData.Synopsis;
            book.Genre = bookData.Genre;
            book.PublicationYear = bookData.PublicationYear;
            book.Stock = bookData.Stock;
            book.Editorial = bookData.Editorial;
            book.Edition = bookData.Edition;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteBookAsync(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null) return false;

            book.Active = false;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}