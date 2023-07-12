using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Orders.Queries.GetByUserId;

public class OrderGetByUserIdQueryHandler:IRequestHandler<OrderGetByUserIdQuery, List<OrderGetByUserIdDto>>
{
    private readonly IApplicationDbContext _applicationDbContext;

    public OrderGetByUserIdQueryHandler(IApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public async Task<List<OrderGetByUserIdDto>> Handle(OrderGetByUserIdQuery request, CancellationToken cancellationToken)
    {
        var dbQuery = _applicationDbContext.Orders.AsQueryable();
        
        dbQuery = dbQuery.Where(x => x.UserId == request.UserId);
        
        var orders = await dbQuery
            .Select(x=>MapToGetByUserIdDto(x))
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        return orders;
    }
    
    private static OrderGetByUserIdDto MapToGetByUserIdDto(Order order)
    {
        return new OrderGetByUserIdDto()
        {
            Id = order.Id,
            UserId = order.UserId,
            ProductAmountChoice = order.ProductAmountChoice,
            RequestedAmount = order.RequestedAmount,
            TotalFoundAmount = order.TotalFoundAmount,
            ProductCrawlType = order.ProductCrawlType,
            CreatedOn = order.CreatedOn,
            CreatedByUserId = order.CreatedByUserId,
        };
    }
}