using Backend.Features.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Features.Loans
{
    [ApiController]
    [Route("LibraryAPI/[controller]")]
    [Authorize]
    public class LoanController : ControllerBase
    {
        private readonly LoanService _service;

        public LoanController(LoanService service) => _service = service;

        [HttpGet]
        public async Task<ActionResult<List<Loan>>> GetLoans()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? User.FindFirst("id")?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized("Usuario no identificado en el token.");
            }

            var loans = await _service.GetLoansAsync(userId);
            return Ok(loans);
        }

        [HttpPost]
        public async Task<IActionResult> CreateLoan([FromBody] LoanDto loanDto)
        {
            // Obtener ID del usuario autenticado mediante el Token JWT
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? User.FindFirst("id")?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized("Usuario no identificado en el token.");
            }

            var (success, message) = await _service.CreateLoanWithValidationsAsync(userId, loanDto.BookId, loanDto.DevolutionDate);
            if (!success)
            {
                return BadRequest(message);
            }

            return Ok(new { message });
        }

        [HttpPost("return/{id}")]
        public async Task<IActionResult> ReturnLoan(int id)
        {
            var (success, message) = await _service.ReturnLoanAsync(id);
            if (!success)
            {
                return BadRequest(message);
            }

            return Ok(new { message });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLoan(int id, Loan loan)
        {
            var success = await _service.UpdateLoanAsync(id, loan);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoan(int id)
        {
            var success = await _service.DeleteLoanAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}