using Application.Common.Models.CrawlerService;
using Domain.Utilities;
using Microsoft.AspNetCore.SignalR;

namespace WebApi.Hubs;

public class OrderHub : Hub
{
    public static string SenderConnectionId { get; private set; }

    public override Task OnConnectedAsync()
    {
        SenderConnectionId = Context.ConnectionId;
        return base.OnConnectedAsync();
    }
    
    public async Task SendTokenAsync()
    {
        var accessToken = Context.GetHttpContext().Request.Query["access_token"];
        
        Console.WriteLine(accessToken);
        
        await Clients.All.SendAsync(SignalRMethodKeys.Log.SendToken, new WorkerServiceSendTokenDto(accessToken));
    }
}