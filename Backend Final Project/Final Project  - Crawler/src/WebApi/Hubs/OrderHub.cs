using Application.Common.Models.Order;
using Application.Features.Products.Commands.Add;
using Domain.Utilities;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using WebApi.Controllers;

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