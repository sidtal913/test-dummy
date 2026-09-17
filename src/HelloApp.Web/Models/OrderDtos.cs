namespace HelloApp.Web.Models;

public record CreateOrderRequest(string ProductName, int Quantity);

public record OrderResponse(
    int Id,
    string ProductName,
    int Quantity,
    string Status,
    DateTime CreatedAt,
    DateTime UpdatedAt);

public record CatalogItemResponse(
    string Sku,
    string Name,
    int UnitPriceCents);

public record OrdersPayloadResponse(
    IReadOnlyList<CatalogItemResponse> Catalog,
    IReadOnlyList<OrderResponse> Orders);
