using Domain.Settings;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations.Application;

public class NotificationSettingsConfiguration:IEntityTypeConfiguration<NotificationSettings>
{
    public void Configure(EntityTypeBuilder<NotificationSettings> builder)
    {
        builder.HasKey(x => x.Id);
        
        // PushNotification
        builder.Property(x => x.PushNotification)
            .IsRequired()
            .HasDefaultValueSql("0");

        // EmailNotification
        builder.Property(x => x.EmailNotification)
            .IsRequired()
            .HasDefaultValueSql("0");

        // EmailAddress
        builder.Property(x => x.EmailAddress).IsRequired(false);
    }
}