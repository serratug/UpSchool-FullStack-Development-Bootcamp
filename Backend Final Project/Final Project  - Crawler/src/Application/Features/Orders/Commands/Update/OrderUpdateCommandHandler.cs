using Application.Common.Interfaces;
using Application.Common.Models.Order;
using Domain.Common;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Orders.Commands.Update;

public class OrderUpdateCommandHandler:IRequestHandler<OrderUpdateCommand,Response<Guid>>
{
    private readonly IApplicationDbContext _applicationDbContext;
    
    private readonly IOrderHubService _orderHubService;

    public OrderUpdateCommandHandler(IApplicationDbContext applicationDbContext, IOrderHubService orderHubService)
    {
        _applicationDbContext = applicationDbContext;
        _orderHubService = orderHubService;
    }

    public async Task<Response<Guid>> Handle(OrderUpdateCommand request, CancellationToken cancellationToken)
    {
        var order = await _applicationDbContext.Orders.Where(x => x.Id == request.Id).FirstOrDefaultAsync();

        if (order == null) throw new ArgumentNullException(nameof(request.Id));

        order.TotalFoundAmount = request.TotalFoundAmount;

        _applicationDbContext.Orders.Update(order);
        
        await _applicationDbContext.SaveChangesAsync(cancellationToken);
        
        await _orderHubService.UpdatedAsync(MapOrderToOrderDto(order), cancellationToken);
        
        return new Response<Guid>($"The order was successfully updated.");
    }
    
    public OrderDto MapOrderToOrderDto(Order order)
    {
        return new OrderDto()
        {
            Id = order.Id,
            ProductAmountChoice = order.ProductAmountChoice,
            RequestedAmount = order.RequestedAmount,
            TotalFoundAmount = order.TotalFoundAmount,
            ProductCrawlType = order.ProductCrawlType,
            CreatedOn = order.CreatedOn
        };
    }
}