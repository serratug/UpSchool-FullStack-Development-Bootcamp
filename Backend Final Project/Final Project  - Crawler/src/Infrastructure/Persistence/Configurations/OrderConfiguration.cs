using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class OrderConfiguration:IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        // Id
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedOnAdd();
        
        // ProductAmountChoice
        builder.Property(x => x.ProductAmountChoice)
            .IsRequired()
            .HasConversion<int>();

        // RequestedAmount
        builder.Property(x => x.RequestedAmount).IsRequired();
        
        // TotalFoundAmount
        builder.Property(x => x.TotalFoundAmount).IsRequired();
        
        // ProductCrawlType
        builder.Property(x => x.ProductCrawlType)
            .IsRequired()
            .HasConversion<int>();

        /* Common Fields */

        // CreatedByUserId
        builder.Property(x => x.CreatedByUserId)
            .IsRequired(false)
            .HasMaxLength(100);

        // CreatedOn
        builder.Property(x => x.CreatedOn).IsRequired();

        // Relationships
        builder.HasMany<Product>(x => x.Products)
            .WithOne(x => x.Order)
            .HasForeignKey(x => x.OrderId);
        
        builder.HasMany<OrderEvent>(x => x.OrderEvents)
            .WithOne(x => x.Order)
            .HasForeignKey(x => x.OrderId);
        
        builder.ToTable("Orders");
    }
}