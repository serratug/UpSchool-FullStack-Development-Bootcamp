using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.OrderEvents.Queries.GetAll;

public class OrderEventGetAllQueryHandler:IRequestHandler<OrderEventGetAllQuery,List<OrderEventGetAllDto>>
{
    private readonly IApplicationDbContext _applicationDbContext;

    public OrderEventGetAllQueryHandler(IApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public async Task<List<OrderEventGetAllDto>> Handle(OrderEventGetAllQuery request, CancellationToken cancellationToken)
    {
        var dbQuery = _applicationDbContext.OrderEvents.AsQueryable();

        dbQuery = dbQuery.Where(x => x.OrderId == request.OrderId);

        //dbQuery = dbQuery.Include(x => x.Order);
        //order include etmeye gerek yok gibi

        var products = await dbQuery
            .Select(x=>MapToGetAllDto(x))
            .ToListAsync(cancellationToken);
        
        return products;
    }
    
    private static OrderEventGetAllDto MapToGetAllDto(OrderEvent orderEvent)
    {
        return new OrderEventGetAllDto()
        {
            Id = orderEvent.Id,
            OrderId = orderEvent.OrderId,
            Status = orderEvent.Status,
            CreatedOn = orderEvent.CreatedOn,
        };
    }
}