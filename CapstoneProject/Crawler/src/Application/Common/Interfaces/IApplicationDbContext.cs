using Domain.Entities;
using Domain.Settings;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Product> Products { get; set; }
    DbSet<Order> Orders { get; set; }
    DbSet<OrderEvent> OrderEvents { get; set; }
    DbSet<Notification> Notifications { get; set; }
    DbSet<NotificationSettings> NotificationSettings { get; set; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    int SaveChanges();
}