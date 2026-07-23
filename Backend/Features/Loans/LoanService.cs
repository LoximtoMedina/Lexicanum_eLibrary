using Microsoft.EntityFrameworkCore;
using Backend.Features.Loans;
using Backend.Data;

namespace Backend.Features.Loans
{
    public class LoanService
    {
        private readonly ApplicationDbContext _context;

        public LoanService(ApplicationDbContext context) => _context = context;

        public async Task<List<Loan>> GetLoansAsync() =>
            await _context.Loans
                .Include(l => l.Book)
                .Include(l => l.User)
                .ToListAsync();

        public async Task<Loan?> GetLoansByIdAsync(int id) =>
            await _context.Loans.FindAsync(id);

        public async Task<(bool Success, string Message)> CreateLoanWithValidationsAsync(int userId, int bookId, DateTime devolutionDate)
        {
            // 1. Verificar si el usuario tiene 3 o más libros prestados (status == false significa activo/por devolver)
            int activeLoansCount = await _context.Loans
                .CountAsync(l => l.UserId == userId && l.Status == false && l.Active);

            if (activeLoansCount >= 3)
            {
                return (false, "Has alcanzado el límite máximo de 3 libros en préstamo a la vez.");
            }

            // 2. Buscar el libro y verificar stock (> 0)
            var book = await _context.Books.FindAsync(bookId);
            if (book == null)
            {
                return (false, "El libro no existe.");
            }

            if (book.Stock <= 0)
            {
                return (false, "No hay stock disponible de este libro.");
            }

            // 3. Restar 1 al stock del libro
            book.Stock -= 1;

            // 4. Crear el préstamo
            var nuevoPrestamo = new Loan
            {
                UserId = userId,
                BookId = bookId,
                LoanDate = DateTime.UtcNow,
                DevolutionDate = devolutionDate,
                Status = false, // Activo / Pendiente
                Active = true
            };

            _context.Loans.Add(nuevoPrestamo);
            await _context.SaveChangesAsync();

            return (true, "Préstamo registrado con éxito.");
        }

        public async Task<(bool Success, string Message)> ReturnLoanAsync(int loanId)
        {
            var loan = await _context.Loans.Include(l => l.Book).Include(l => l.User).FirstOrDefaultAsync(l => l.LoanId == loanId);
            if (loan == null || loan.Status == true)
            {
                return (false, "El préstamo no existe o ya fue devuelto.");
            }

            // 1. Cambiar el status del préstamo a devuelto (true)
            loan.Status = true;

            // 2. Sumar 1 al stock del libro correspondiente
            if (loan.Book != null)
            {
                loan.Book.Stock += 1;
            }

            // 3. Verificar penalización por retraso (Comparar fecha actual vs DevolutionDate esperada)
            DateTime fechaDevolucionReal = DateTime.UtcNow;
            if (fechaDevolucionReal > loan.DevolutionDate)
            {
                TimeSpan retraso = fechaDevolucionReal - loan.DevolutionDate;
                double diasDeRetraso = retraso.TotalDays;

                // Aplicar reglas de penalización al usuario si aplica
                if (loan.User != null)
                {
                    if (diasDeRetraso <= 7)
                    {
                        loan.User.Penalization = 30; // 1 mes de Timeout
                    }
                    else if (diasDeRetraso > 7 && diasDeRetraso < 30)
                    {
                        loan.User.Penalization = 365; // 1 año de Timeout
                    }
                    else
                    {
                        loan.User.Penalization = -1; // Ban permanente
                    }
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