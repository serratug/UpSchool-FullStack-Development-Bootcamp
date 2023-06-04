using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Orders.Queries.GetById;

public class OrderGetByIdQueryHandler:IRequestHandler<OrderGetByIdQuery,OrderGetByIdDto>
{
    private readonly IApplicationDbContext _applicationDbContext;

    public OrderGetByIdQueryHandler(IApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public async Task<OrderGetByIdDto> Handle(OrderGetByIdQuery request, CancellationToken cancellationToken)
    {
        var order = await _applicationDbContext.Orders
            .Where(x => x.Id == request.Id)
            .FirstOrDefaultAsync();

        if (order is null) throw new ArgumentNullException(nameof(request.Id));

        return new OrderGetByIdDto()
        {
            Id = order.Id,
            ProductAmountChoice = order.ProductAmountChoice,
            RequestedAmount = order.RequestedAmount,
            TotalFoundAmount = order.TotalFoundAmount,
            ProductCrawlType = order.ProductCrawlType,
            CreatedOn = order.CreatedOn,
        };
    }
}