using Microsoft.AspNetCore.Mvc;

namespace Backend.Features.Universities
{
    [ApiController]
    [Route("LibraryAPI/[controller]")] // https://localhost:xxxx/LibraryAPI/university
    public class UniversityController : ControllerBase
    {
        private readonly UniversityService _universityService;
        public UniversityController(UniversityService service) => _universityService = service;

        [HttpGet] // GET: https://localhost:xxxx/LibraryAPI/university
        public async Task<ActionResult<List<University>>> GetUniversities() => Ok(await _universityService.GetUniversitiesAsync());

        [HttpPost] // POST: https://localhost:xxxx/LibraryAPI/university
        public async Task<ActionResult> CreateUniversity(University university)
        {
            await _universityService.AddUniversityAsync(university);
            return CreatedAtAction(nameof(GetUniversities), new { id = university.Id }, university);
        }

        [HttpPut("{id}")] // PUT: https://localhost:XXXX/LibraryAPI/university/{id}
        public async Task<IActionResult> UpdateUniversity(int id, University university)
        {
            var success = await _universityService.UpdateUniversityAsync(id, university);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")] // DELETE: https://localhost:XXXX/LibraryAPI/university/{id}
        public async Task<IActionResult> DeleteUniversity(int id)
        {
            var success = await _universityService.DeleteUniversityAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}