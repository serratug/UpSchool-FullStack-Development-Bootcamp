using Application.Common.Models.Order;
using Domain.Common;
using Domain.Enums;
using MediatR;

namespace Application.Features.Orders.Commands.Add;

public class OrderAddCommand:IRequest<Response<OrderDto>>
{
    public ProductAmountChoice ProductAmountChoice { get; set; }
    
    public int RequestedAmount { get; set; }
    
    public ProductCrawlType ProductCrawlType { get; set; }

    public DateTimeOffset CreatedOn { get; set; }   
}