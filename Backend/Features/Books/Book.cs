using System;

public class Book{

    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public string Editorial { get; set; } = string.Empty;
    public string Genre { get; set; } = string.Empty;
    public string Edition { get; set; } = string.Empty;
    public DateTime PublicationDate { get; set; }
    public int Stock { get; set; }
    public bool IsActive { get; set; } = true;

}