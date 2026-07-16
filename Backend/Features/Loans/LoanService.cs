using Microsoft.EntityFrameworkCore;
using Backend.Features.Loans;
using Backend.Data;

namespace Backend.Features.Loans
{
    public class LoanService
    {
        private readonly ApplicationDbContext _context;

        public LoanService(ApplicationDbContext context) => _context = context;

        public async Task<List<Loan>> GetAllAsync() =>
            await _context.Loans
                .Include(l => l.Book)
                .Include(l => l.User)
                .Where(l => l.Active)
                .ToListAsync();

        public async Task<Loan?> GetByIdAsync(int id) =>
            await _context.Loans.FindAsync(id);

        public async Task AddAsync(Loan loan)
        {
            _context.Loans.Add(loan);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateAsync(int id, Loan data)
        {
            var loan = await _context.Loans.FindAsync(id);
            if (loan == null || !loan.Active) return false;

            loan.Status = data.Status;
            loan.DevolutionDate = data.DevolutionDate;
            loan.BookId = data.BookId;
            loan.UserId = data.UserId;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var loan = await _context.Loans.FindAsync(id);
            if (loan == null) return false;

            loan.Active = false;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}