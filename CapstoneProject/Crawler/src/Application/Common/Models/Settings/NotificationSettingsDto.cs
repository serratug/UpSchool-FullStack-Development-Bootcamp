namespace Application.Common.Models.Settings;

public class NotificationSettingsDto
{
    public bool PushNotification { get; set; }
    
    public bool EmailNotification { get; set; }

    public string? EmailAddress { get; set; }
}