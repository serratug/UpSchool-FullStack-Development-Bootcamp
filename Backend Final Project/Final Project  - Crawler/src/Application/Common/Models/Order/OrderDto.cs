using Application.Common.Models.Product;
using Domain.Enums;

namespace Application.Common.Models.Order;

public class OrderDto
{
    public Guid Id { get; set; }
    public ProductAmountChoice ProductAmountChoice { get; set; }
    public int RequestedAmount { get; set; }
    public int TotalFoundAmount { get; set; }
    public ProductCrawlType ProductCrawlType { get; set; }
    public DateTimeOffset CreatedOn { get; set; }
    public List<OrderEventDto> OrderEvents { get; set; }
    public List<ProductDto> Products { get; set; }
}