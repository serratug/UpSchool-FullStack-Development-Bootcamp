using Domain.Enums;

namespace Application.Common.Models.Order;

public class OrderEventDto
{
    public Guid Id { get; set; }
    
    public Guid OrderId { get; set; }

    public OrderStatus Status { get; set; }
    
    public DateTimeOffset CreatedOn { get; set; }
}