using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations.Application;

public class OrderEventConfiguration:IEntityTypeConfiguration<OrderEvent>
{
    public void Configure(EntityTypeBuilder<OrderEvent> builder)
    {
        // Id
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedOnAdd();
        
        // ProductCrawlType
        builder.Property(x => x.Status)
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
        builder.HasOne<Order>(x => x.Order)
            .WithMany(x => x.OrderEvents)
            .HasForeignKey(x => x.OrderId);
        
        builder.ToTable("OrderEvents");
    }
}