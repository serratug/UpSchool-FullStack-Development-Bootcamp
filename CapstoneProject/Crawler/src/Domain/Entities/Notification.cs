using Domain.Common;

namespace Domain.Entities;

public class Notification:EntityBase<Guid>
{
    public string UserId { get; set; }
    
    public string Message { get; set; }

    public bool IsRead { get; set; }
}