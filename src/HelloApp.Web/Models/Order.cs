namespace HelloApp.Web.Models;

public class Order
{
    public int Id { get; set; }
    public required string ProductName { get; set; }
    public int Quantity { get; set; }
    public string Status { get; set; } = "pending";
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
