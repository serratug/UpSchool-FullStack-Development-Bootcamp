using Application.Common.Interfaces;
using Application.Common.Models.Order;
using Domain.Common;
using Domain.Entities;
using Domain.Enums;
using MediatR;

namespace Application.Features.Orders.Commands.Add;

public class OrderAddCommandHandler:IRequestHandler<OrderAddCommand,Response<OrderDto>>
{
    private readonly IApplicationDbContext _applicationDbContext;

    private readonly IOrderHubService _orderHubService;

    public OrderAddCommandHandler(IApplicationDbContext applicationDbContext, IOrderHubService orderHubService)
    {
        _applicationDbContext = applicationDbContext;
        _orderHubService = orderHubService;
    }

    public async Task<Response<OrderDto>> Handle(OrderAddCommand request, CancellationToken cancellationToken)
    {
        var order = new Order()
        {
            ProductAmountChoice = request.ProductAmountChoice,
            ProductCrawlType = request.ProductCrawlType,
            CreatedOn = DateTimeOffset.Now,
        };

        order.RequestedAmount = order.ProductAmountChoice == ProductAmountChoice.All ? 0 : request.RequestedAmount;

        await _applicationDbContext.Orders.AddAsync(order, cancellationToken);

        await _applicationDbContext.SaveChangesAsync(cancellationToken);
        
        await _orderHubService.AddedAsync(MapOrderToOrderDto(order), cancellationToken);

        return new Response<OrderDto>("Order successfully added.", MapOrderToOrderDto(order));
    }

    public OrderDto MapOrderToOrderDto(Order order)
    {
        return new OrderDto()
        {
            Id = order.Id,
            ProductAmountChoice = order.ProductAmountChoice,
            RequestedAmount = order.RequestedAmount,
            ProductCrawlType = order.ProductCrawlType,
            CreatedOn = order.CreatedOn
        };
    }
}