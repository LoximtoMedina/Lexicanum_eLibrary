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

        // GET: /api/book
        [HttpGet]
        public async Task<ActionResult<List<Book>>> GetBooks()
        {
            var books = await _bookService.GetAllBooksAsync();
            return Ok(books);
        }

        // GET: /api/book/category/Fantasía
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
    }
}