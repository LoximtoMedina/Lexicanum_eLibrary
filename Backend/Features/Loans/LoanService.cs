using Microsoft.EntityFrameworkCore;
using Backend.Features.Loans;
using Backend.Data;

namespace Backend.Features.Loans
{
    public class LoanService
    {
        private readonly ApplicationDbContext _context;

        public LoanService(ApplicationDbContext context) => _context = context;

        public async Task<List<Loan>> GetLoansAsync(int userId) =>
            await _context.Loans
                .Include(l => l.Book)
                .Include(l => l.User)
                .Where(l => l.UserId == userId && l.Active)
                .ToListAsync();

        public async Task<(bool Success, string Message)> CreateLoanWithValidationsAsync(int userId, int bookId, DateTime devolutionDate)
        {
            int activeLoansCount = await _context.Loans
                .CountAsync(l => l.UserId == userId && l.Status == false && l.Active);

            var book = await _context.Books.FindAsync(bookId);
            if (book == null) return (false, "El libro no existe.");

            var user = await _context.Users.FindAsync(userId);
            int penalizacionUsuario = user?.Penalization ?? 0;

            bool reglaAprobada = PrologService.ValidarPrestamoConProlog(activeLoansCount, book.Stock, penalizacionUsuario);

            if (!reglaAprobada)
            {
                return (false, "La solicitud de préstamo no cumple con las reglas del sistema (límite de libros, sin stock o con penalización activa).");
            }

            book.Stock -= 1;

            var nuevoPrestamo = new Loan
            {
                UserId = userId,
                BookId = bookId,
                LoanDate = DateTime.UtcNow,
                DevolutionDate = devolutionDate,
                Status = false,
                Active = true
            };

            _context.Loans.Add(nuevoPrestamo);
            await _context.SaveChangesAsync();

            return (true, "Préstamo registrado con éxito.");
        }

        public async Task<(bool Success, string Message)> ReturnLoanAsync(int loanId)
        {
            var loan = await _context.Loans
                .Include(l => l.Book)
                .Include(l => l.User)
                .FirstOrDefaultAsync(l => l.LoanId == loanId);

            if (loan == null || loan.Status == true)
            {
                return (false, "El préstamo no existe o ya fue devuelto.");
            }

            // 1. Cambiar el status del préstamo a devuelto
            loan.Status = true;

            // 2. Sumar 1 al stock del libro correspondiente
            if (loan.Book != null)
            {
                loan.Book.Stock += 1;
            }

            // 3. Evaluar penalización mediante Prolog
            DateTime fechaDevolucionReal = DateTime.UtcNow;
            if (fechaDevolucionReal > loan.DevolutionDate)
            {
                TimeSpan retraso = fechaDevolucionReal - loan.DevolutionDate;
                double diasDeRetraso = retraso.TotalDays;

                if (loan.User != null)
                {
                    // Llamada directa al motor Prolog embebido
                    loan.User.Penalization = PrologService.ObtenerPenalizacion(diasDeRetraso);
                }
            }

            await _context.SaveChangesAsync();
            return (true, "Libro devuelto con éxito.");
        }

        public async Task<bool> UpdateLoanAsync(int id, Loan data)
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

        public async Task<bool> DeleteLoanAsync(int id)
        {
            var loan = await _context.Loans.FindAsync(id);
            if (loan == null) return false;

            loan.Active = false;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}