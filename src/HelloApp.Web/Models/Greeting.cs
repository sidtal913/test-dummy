namespace HelloApp.Web.Models;

public class Greeting
{
    public int Id { get; set; }
    public required string Message { get; set; }
    public DateTime CreatedAt { get; set; }
}
