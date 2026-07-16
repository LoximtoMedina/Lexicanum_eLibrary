using Microsoft.AspNetCore.Mvc;

namespace Backend.Features.Users
{
    [ApiController]
    [Route("LibraryAPI/[controller]")] // https://localhost:xxxx/LibraryAPI/user/
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet] // GET: https://localhost:xxxx/LibraryAPI/user
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return Ok(await _userService.GetUsersAsync());
        }

        [HttpPost] // POST: https://localhost:xxxx/LibraryAPI/user
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            await _userService.AddUserAsync(user);
            return CreatedAtAction(nameof(GetUsers), new { id = user.UserId }, user);
        }

        [HttpPut("{id}")] // PUT: https://localhost:XXXX/LibraryAPI/user/{id}
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            var success = await _userService.UpdateUserAsync(id, user);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")] // DELETE: https://localhost:XXXX/LibraryAPI/user/{id}
        public async Task<IActionResult> DeleteUser(int id)
        {
            var success = await _userService.DeleteUserAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}