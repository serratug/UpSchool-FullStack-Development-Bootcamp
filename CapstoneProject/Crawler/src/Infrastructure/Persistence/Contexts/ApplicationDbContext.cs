using System.Reflection;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Settings;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Contexts;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderEvent> OrderEvents { get; set; }
    public DbSet<NotificationSettings> NotificationSettings { get; set; }
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
    {
            
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        // Configurations
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        

        base.OnModelCreating(modelBuilder);
    }
}