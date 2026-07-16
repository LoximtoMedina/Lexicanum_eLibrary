using Microsoft.AspNetCore.Mvc;

namespace Backend.Features.Loans
{
    [ApiController]
    [Route("LibraryAPI/[controller]")] // https://localhost:xxxx/LibraryAPI/loan
    public class LoanController : ControllerBase
    {
        private readonly LoanService _service;

        public LoanController(LoanService service) => _service = service;

        [HttpGet] // GET: https://localhost:xxxx/LibraryAPI/loan
        public async Task<ActionResult<List<Loan>>> GetAll() => Ok(await _service.GetAllAsync());

        [HttpPost] // POST: https://localhost:xxxx/LibraryAPI/university
        public async Task<ActionResult> Create(Loan loan)
        {
            await _service.AddAsync(loan);
            return CreatedAtAction(nameof(GetAll), new { id = loan.LoanId }, loan);
        }

        [HttpPut("{id}")] // PUT: https://localhost:XXXX/LibraryAPI/loan/{id}
        public async Task<IActionResult> Update(int id, Loan loan)
        {
            var success = await _service.UpdateAsync(id, loan);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")] // DELETE: https://localhost:XXXX/LibraryAPI/loan/{id}
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}