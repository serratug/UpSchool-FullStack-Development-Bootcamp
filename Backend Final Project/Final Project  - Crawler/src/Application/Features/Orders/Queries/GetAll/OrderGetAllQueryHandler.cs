using Application.Common.Interfaces;
using Application.Common.Models.Order;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Orders.Queries.GetAll;

public class OrderGetAllQueryHandler:IRequestHandler<OrderGetAllQuery,List<OrderGetAllDto>>
{
    private readonly IApplicationDbContext _applicationDbContext;

    public OrderGetAllQueryHandler(IApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public async Task<List<OrderGetAllDto>> Handle(OrderGetAllQuery request, CancellationToken cancellationToken)
    {
        var dbQuery = _applicationDbContext.Orders.AsQueryable();

        var orders = await dbQuery
            .Select(x=>MapToGetAllDto(x))
            .ToListAsync(cancellationToken);
        
        return orders;
    }
    
    private static OrderGetAllDto MapToGetAllDto(Order order)
    {
        return new OrderGetAllDto()
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