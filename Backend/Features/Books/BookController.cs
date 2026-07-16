using Microsoft.AspNetCore.Mvc;

namespace Backend.Features.Books
{
    [ApiController]
    [Route("LibraryAPI/[controller]")] // https://localhost:xxxx/LibraryAPI/book
    public class BookController : ControllerBase
    {
        private readonly BookService _bookService;

        public BookController(BookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet] // GET: https://localhost:xxxx/LibraryAPI/book
        public async Task<ActionResult<List<Book>>> GetBooks()
        {
            return Ok(await _bookService.GetAllBooksAsync());
        }

        [HttpPost] // POST: https://localhost:xxxx/LibraryAPI/book
        public async Task<ActionResult<Book>> CreateBook(Book book)
        {
            await _bookService.AddBookAsync(book);
            return CreatedAtAction(nameof(GetBooks), new { id = book.BookId }, book);
        }

        [HttpPut("{id}")] // PUT: https://localhost:XXXX/LibraryAPI/book/{id}
        public async Task<IActionResult> UpdateBook(int id, Book book)
        {
            var success = await _bookService.UpdateBookAsync(id, book);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")] // DELETE: https://localhost:XXXX/LibraryAPI/book/{id}
        public async Task<IActionResult> DeleteBook(int id)
        {
            var success = await _bookService.DeleteBookAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}