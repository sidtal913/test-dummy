using HelloApp.Web.Data;
using HelloApp.Web.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors();
}

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/api/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow }))
   .WithName("HealthCheck")
   .WithOpenApi();

app.MapGet("/api/hello", async (AppDbContext db) =>
{
    var greeting = await db.Greetings.OrderBy(g => g.Id).FirstOrDefaultAsync();
    return Results.Ok(new
    {
        message = greeting?.Message ?? "Hello, World!",
        source = greeting is not null ? "postgresql" : "fallback",
        timestamp = DateTime.UtcNow
    });
})
.WithName("GetHello")
.WithOpenApi();

static IReadOnlyList<CatalogItemResponse> BrownieCatalog() =>
[
    new("classic-fudge", "Classic Fudge Brownie", 450),
    new("salted-caramel", "Salted Caramel Square", 525),
    new("walnut-dark", "Walnut Dark Chocolate", 500),
];

static OrderResponse ToOrderResponse(Order order) =>
    new(order.Id, order.ProductName, order.Quantity, order.Status, order.CreatedAt, order.UpdatedAt);

app.MapGet("/api/orders", async (AppDbContext db) =>
{
    var orders = await db.Orders
        .OrderByDescending(o => o.CreatedAt)
        .ToListAsync();

    return Results.Ok(new OrdersPayloadResponse(
        BrownieCatalog(),
        orders.Select(ToOrderResponse).ToList()));
})
.WithName("ListOrders")
.WithOpenApi();

app.MapPost("/api/orders", async (CreateOrderRequest request, AppDbContext db) =>
{
    if (string.IsNullOrWhiteSpace(request.ProductName))
    {
        return Results.BadRequest(new { error = "productName is required" });
    }

    if (request.Quantity is < 1 or > 99)
    {
        return Results.BadRequest(new { error = "quantity must be between 1 and 99" });
    }

    var catalogMatch = BrownieCatalog()
        .FirstOrDefault(item => string.Equals(item.Name, request.ProductName.Trim(), StringComparison.OrdinalIgnoreCase));

    var now = DateTime.UtcNow;
    var order = new Order
    {
        ProductName = catalogMatch?.Name ?? request.ProductName.Trim(),
        Quantity = request.Quantity,
        Status = "pending",
        CreatedAt = now,
        UpdatedAt = now,
    };

    db.Orders.Add(order);
    await db.SaveChangesAsync();

    return Results.Created($"/api/orders/{order.Id}", ToOrderResponse(order));
})
.WithName("CreateOrder")
.WithOpenApi();

app.MapFallbackToFile("index.html");

app.Run();
