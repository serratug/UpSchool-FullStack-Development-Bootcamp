using Application.Common.Models.Log;
using Domain.Utilities;
using Microsoft.AspNetCore.SignalR;

namespace WebApi.Hubs;

public class LogHub : Hub
{
    public async Task SendLogNotificationAsync(LogDto log)
    {
        await Clients.All.SendAsync(SignalRMethodKeys.Log.NewLogAdded, log);
    }
}