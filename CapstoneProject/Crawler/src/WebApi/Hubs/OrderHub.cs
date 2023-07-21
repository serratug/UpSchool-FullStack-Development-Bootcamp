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
    
}