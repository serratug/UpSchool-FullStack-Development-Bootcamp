namespace Application.Common.Models.Log;

public class SendLogNotificationApiDto
{
    public LogDto Log { get; set; }
    public string ConnectionId { get; set; }


    public SendLogNotificationApiDto(LogDto log, string connectionId)
    {
        Log = log;

        ConnectionId = connectionId;
    }
}