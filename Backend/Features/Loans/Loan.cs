using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Backend.Features.Books;
using Backend.Features.Users;

namespace Backend.Features.Loans
{
    [Table("loans")]
    public class Loan
    {
        [Key]
        [Column("loanid")]
        public int LoanId { get; set; }

        [Column("userid")]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }

        [Column("bookid")]
        public int BookId { get; set; }

        [ForeignKey("BookId")]
        public Book? Book { get; set; }

        [Column("status")]
        public bool Status { get; set; }

        [Column("loan_date")]
        public DateTime LoanDate { get; set; } = DateTime.UtcNow;

        [Column("devolution_date")]
        public DateTime DevolutionDate { get; set; }

        [Column("active")]
        public bool Active { get; set; } = true;
    }
}