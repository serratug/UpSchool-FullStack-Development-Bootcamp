using Domain.Common;
using Domain.Enums;

namespace Domain.Entities;

public class Order:EntityBase<Guid>
{
    public ProductAmountChoice ProductAmountChoice { get; set; }
    
    public int RequestedAmount { get; set; }
    
    public int TotalFoundAmount { get; set; }
    
    public ProductCrawlType ProductCrawlType { get; set; }
    
    public ICollection<OrderEvent> OrderEvents { get; set; }
    
    public ICollection<Product> Products { get; set; }
    
    public DateTimeOffset CreatedOn { get; set; }
}