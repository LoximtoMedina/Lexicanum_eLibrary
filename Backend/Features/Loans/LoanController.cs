using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Features.Loans
{
    [ApiController]
    [Route("LibraryAPI/[controller]")] // https://localhost:xxxx/LibraryAPI/loan
    [Authorize]
    public class LoanController : ControllerBase
    {
        private readonly LoanService _service;

        public LoanController(LoanService service) => _service = service;

        [HttpGet] // GET: https://localhost:xxxx/LibraryAPI/loan
        public async Task<ActionResult<List<Loan>>> GetLoans() => Ok(await _service.GetLoansAsync());

        [HttpPost] // POST: https://localhost:xxxx/LibraryAPI/loan
        public async Task<ActionResult> CreateLoan(Loan loan)
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim != null) loan.UserId = int.Parse(userIdClaim);

            await _service.AddLoanAsync(loan);
            return CreatedAtAction(nameof(GetLoans), new { id = loan.LoanId }, loan);
        }

        [HttpPut("{id}")] // PUT: https://localhost:XXXX/LibraryAPI/loan/{id}
        public async Task<IActionResult> UpdateLoan(int id, Loan loan)
        {
            var success = await _service.UpdateLoanAsync(id, loan);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")] // DELETE: https://localhost:XXXX/LibraryAPI/loan/{id}
        public async Task<IActionResult> DeleteLoan(int id)
        {
            var success = await _service.DeleteLoanAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}