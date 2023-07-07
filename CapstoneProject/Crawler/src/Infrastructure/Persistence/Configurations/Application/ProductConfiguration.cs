using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations.Application;

public class ProductConfiguration:IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        // Id
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedOnAdd();

        // Name
        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(150);

        // Picture
        builder.Property(x => x.Picture)
            .IsRequired()
            .HasMaxLength(150);

        // IsOnSale
        builder.Property(x => x.IsOnSale)
            .IsRequired()
            .HasDefaultValueSql("0");

        // Price
        builder.Property(x => x.Price)
            .IsRequired()
            .HasColumnType("decimal(10,4)");

        // SalePrice
        builder.Property(x => x.SalePrice)
            .IsRequired()
            .HasColumnType("decimal(10,4)");

        /* Common Fields */

        // CreatedByUserId
        builder.Property(x => x.CreatedByUserId)
            .IsRequired(false)
            .HasMaxLength(100);

        // CreatedOn
        builder.Property(x => x.CreatedOn).IsRequired();

        // Relationships
        builder.HasOne<Order>(x => x.Order)
            .WithMany(x => x.Products)
            .HasForeignKey(x => x.OrderId);
        
        builder.ToTable("Products");
    }
}