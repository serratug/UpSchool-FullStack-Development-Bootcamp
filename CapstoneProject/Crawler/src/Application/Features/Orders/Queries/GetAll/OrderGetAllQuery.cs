using MediatR;

namespace Application.Features.Orders.Queries.GetAll;

public class OrderGetAllQuery:IRequest<List<OrderGetAllDto>>
{

    public OrderGetAllQuery()
    {

    }
}