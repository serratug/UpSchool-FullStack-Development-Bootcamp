using Domain.Enums;

namespace Application.Common.Models.Email;

public class SendEmailNotificationDto
{ 
    public string EmailAddress { get; set; }
    
    public Guid OrderId { get; set; }
    
    public OrderStatus Status { get; set; }
}