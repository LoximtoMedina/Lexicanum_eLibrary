using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Features.Books
{
    [Table("books")]
    public class Book
    {
        [Key]
        [Column("bookid")]
        public int BookId { get; set; }

        [Column("title")]
        public string Title { get; set; } = string.Empty;

        [Column("author")]
        public string Author { get; set; } = string.Empty;

        [Column("synopsis")]
        public string? Synopsis { get; set; }

        [Column("editorial")]
        public string Editorial { get; set; } = string.Empty;

        [Column("edition")]
        public string Edition { get; set; } = string.Empty;

        [Column("genre")]
        public string Genre { get; set; } = string.Empty;

        [Column("publication_year")]
        public int PublicationYear { get; set; }

        [Column("stock")]
        public int Stock { get; set; }

        [Column("registration_date")]
        public DateTime RegistrationDate { get; set; } = DateTime.Now;

        [Column("active")]
        public bool Active { get; set; } = true;
    }
}