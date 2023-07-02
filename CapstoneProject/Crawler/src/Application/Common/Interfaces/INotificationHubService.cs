using Domain.Enums;

namespace Application.Common.Interfaces;

public interface INotificationHubService
{
    Task NewNotificationAddedAsync(OrderStatus orderStatus, CancellationToken cancellationToken);
}