using Application.Common.Models.CrawlerService;
using Application.Common.Models.Log;
using Domain.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace WebApi.Hubs;


public class LogHub : Hub
{
    public async Task SendLogNotificationAsync(LogDto log)
    {
        Console.WriteLine(log.Message);
        await Clients.All.SendAsync(SignalRMethodKeys.Log.NewLogAdded, log);
    }
    
    [Authorize]
    public async Task SendTokenAsync()
    {
        var accessToken = Context.GetHttpContext().Request.Query["access_token"];
        
        Console.WriteLine(accessToken);
        
        await Clients.All.SendAsync(SignalRMethodKeys.Log.SendToken, new WorkerServiceSendTokenDto(accessToken));
    }
}