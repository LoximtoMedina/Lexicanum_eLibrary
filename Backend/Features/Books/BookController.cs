using Microsoft.AspNetCore.Mvc;

namespace Backend.Features.Books
{
    [ApiController]
    [Route("api/[controller]")] // La ruta base será /api/book
    public class BookController : ControllerBase
    {
        private readonly BookService _bookService;

        public BookController(BookService bookService)
        {
            _bookService = bookService;
        }

        // Obtener la tabla libros | GET: /api/book
        [HttpGet]
        public async Task<ActionResult<List<Book>>> GetBooks()
        {
            var books = await _bookService.GetBooksAsync();
            return Ok(books);
        }

        // Obtener la tabla libros filtrada por categoría | GET: /api/book/category/{Categoría}
        [HttpGet("category/{category}")]
        public async Task<ActionResult<List<Book>>> GetBooksByCategory(string category)
        {
            var books = await _bookService.GetBooksByCategoryAsync(category);

            if (books == null || books.Count == 0)
            {
                return NotFound($"No se encontraron libros en la categoría: {category}");
            }

            return Ok(books);
        }

        // Insertar un libro | POST: /api/book
        [HttpPost]
        public async Task<ActionResult<Book>> CreateBook(Book book)
        {
            await _bookService.AddBookAsync(book);
            return CreatedAtAction(nameof(GetBooks), new { id = book.IdLibro }, book);
        }

        // Editar la información de un libro | PUT: /api/book/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, Book book)
        {
            var success = await _bookService.UpdateBookAsync(id, book);
            if (!success) return NotFound();
            return NoContent();
        }

        // Eliminar un libro (soft delete) | DELETE: /api/book/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var success = await _bookService.SoftDeleteBookAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}