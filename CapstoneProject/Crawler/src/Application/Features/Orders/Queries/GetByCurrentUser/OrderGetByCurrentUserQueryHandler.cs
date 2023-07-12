using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Orders.Queries.GetByCurrentUser;

public class OrderGetByCurrentUserQueryHandler:IRequestHandler<OrderGetByCurrentUserQuery, List<OrderGetByCurrentUserDto>>
{
    private readonly IApplicationDbContext _applicationDbContext;
    private readonly ICurrentUserService _currentUserService;

    public OrderGetByCurrentUserQueryHandler(IApplicationDbContext applicationDbContext, ICurrentUserService currentUserService)
    {
        _applicationDbContext = applicationDbContext;
        _currentUserService = currentUserService;
    }

    public async Task<List<OrderGetByCurrentUserDto>> Handle(OrderGetByCurrentUserQuery request, CancellationToken cancellationToken)
    {
        var dbQuery = _applicationDbContext.Orders.AsQueryable();
        
        dbQuery = dbQuery.Where(x => x.UserId == _currentUserService.UserId);
        
        var orders = await dbQuery
            .Select(x=>MapToGetByCurrentUserDto(x))
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        return orders;
    }
    
    private static OrderGetByCurrentUserDto MapToGetByCurrentUserDto(Order order)
    {
        return new OrderGetByCurrentUserDto()
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