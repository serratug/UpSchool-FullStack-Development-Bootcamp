using Application.Common.Models.Order;
using Domain.Enums;

namespace Application.Features.Orders.Queries.GetAll;

public class OrderGetAllDto
{
    public Guid Id { get; set; }
    
    public string UserId { get; set; }
    
    public ProductAmountChoice ProductAmountChoice { get; set; }
    
    public int RequestedAmount { get; set; }
    
    public int TotalFoundAmount { get; set; }
    
    public ProductCrawlType ProductCrawlType { get; set; }

    public DateTimeOffset CreatedOn { get; set; }
    
    public string? CreatedByUserId { get; set; }
}