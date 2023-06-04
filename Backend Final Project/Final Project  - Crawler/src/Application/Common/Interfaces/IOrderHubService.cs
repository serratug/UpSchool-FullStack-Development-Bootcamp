using Application.Common.Models.Order;

namespace Application.Common.Interfaces;

public interface IOrderHubService
{
    Task AddedAsync(OrderDto orderDto, CancellationToken cancellationToken);
    
    Task UpdatedAsync(OrderDto orderDto, CancellationToken cancellationToken);
    
    Task RemovedAsync(Guid id, CancellationToken cancellationToken);
}