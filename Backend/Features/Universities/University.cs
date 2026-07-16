using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Features.Universities
{
    [Table("universities")]
    public class University
    {
        [Key]
        [Column("universityId")]
        public int Id { get; set; }

        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [Column("description")]
        public string? Description { get; set; }

        [Column("location")]
        public string? Location { get; set; }

        [Column("registration_date")]
        public DateTime RegistrationDate { get; set; } = DateTime.Now;

        [Column("active")]
        public bool Active { get; set; } = true;
    }
}