using Microsoft.EntityFrameworkCore;
using Backend.Features.Universities;
using Backend.Data;

namespace Backend.Features.Universities
{
    public class UniversityService
    {
        private readonly ApplicationDbContext _context;

        public UniversityService(ApplicationDbContext context) => _context = context;

        public async Task<List<University>> GetUniversitiesAsync() =>
            await _context.Universities.Where(u => u.Active).ToListAsync();

        public async Task<University?> GetUniversityByIdAsync(int id) =>
            await _context.Universities.FirstOrDefaultAsync(u => u.Id == id && u.Active);

        public async Task AddAsync(University university)
        {
            _context.Universities.Add(university);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateUniversityAsync(int id, University data)
        {
            var uni = await _context.Universities.FindAsync(id);
            if (uni == null || !uni.Active) return false;

            uni.Name = data.Name;
            uni.Description = data.Description;
            uni.Location = data.Location;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteUniversityAsync(int id)
        {
            var uni = await _context.Universities.FindAsync(id);
            if (uni == null) return false;
            uni.Active = false;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}