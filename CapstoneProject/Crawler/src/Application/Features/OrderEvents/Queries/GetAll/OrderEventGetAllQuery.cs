using MediatR;

namespace Application.Features.OrderEvents.Queries.GetAll;

public class OrderEventGetAllQuery:IRequest<List<OrderEventGetAllDto>>
{
    public  Guid  OrderId { get; set; }

    public OrderEventGetAllQuery(Guid orderId)
    {
        OrderId = orderId;
    }
}