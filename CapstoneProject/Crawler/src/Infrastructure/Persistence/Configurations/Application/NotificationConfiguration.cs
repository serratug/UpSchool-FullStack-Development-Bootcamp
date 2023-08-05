using Domain.Entities;
using Domain.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations.Application;

public class NotificationConfiguration:IEntityTypeConfiguration<Notification>
{
    public void Configure(EntityTypeBuilder<Notification> builder)
    {
        // Id
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).ValueGeneratedOnAdd();
        
        // Message
        builder.Property(x => x.Message)
            .IsRequired()
            .HasMaxLength(250);
        
        // IsRead
        builder.Property(x => x.IsRead)
            .IsRequired()
            .HasDefaultValueSql("0");
        
        /* Common Fields */

        // CreatedByUserId
        builder.Property(x => x.CreatedByUserId)
            .IsRequired(false)
            .HasMaxLength(100);

        // CreatedOn
        builder.Property(x => x.CreatedOn).IsRequired();

        // Relationships
        builder.HasOne<User>().WithMany()
            .HasForeignKey(x => x.UserId);
        
        builder.ToTable("Notifications");
    }
}