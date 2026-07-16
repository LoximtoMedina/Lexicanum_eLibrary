using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Backend.Features.Users;
using Backend.Data;

namespace Backend.Features.Users
{
    public class UserService
    {
        private readonly ApplicationDbContext _context;
        private readonly PasswordHasher<User> _passwordHasher = new PasswordHasher<User>();

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<List<User>> GetUsersAsync()
        {
            return await _context.Users.Where(u => u.Active == true).ToListAsync();
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserId == id && u.Active == true);
        }

        public async Task<User> AddUserAsync(User user)
        {
            user.Password = _passwordHasher.HashPassword(user, user.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public bool VerifyPassword(User user, string providedPassword)
        {
            var result = _passwordHasher.VerifyHashedPassword(user, user.Password, providedPassword);
            return result == PasswordVerificationResult.Success;
        }

        public async Task<bool> UpdateUserAsync(int id, User userData)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null || user.Active == false) return false;

            user.Name = userData.Name;
            user.Email = userData.Email;
            user.Password = userData.Password;
            user.Role = userData.Role;
            user.Penalization = userData.Penalization;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            user.Active = false;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}