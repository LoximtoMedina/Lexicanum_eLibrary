using System;

public class Loan{

    public int Id { get; set; }
    public int UserId { get; set; }
    public int BookId { get; set; }
    public DateTime LoanDate { get; set; }
    public DateTime? ReturnDate { get; set; }
    public int Status { get; set; }
    public int Quantity { get; set; }
    public string? Penalization { get; set; }
}