using Microsoft.AspNetCore.SignalR;
using UpStorageChat.Dtos;

namespace UpStorageChat.Hubs
{
    public class ChatHub:Hub
    {
        public Task SendMessageAsync(ChatDto chatDto, CancellationToken cancellationToken)
        {
            ChatStore.AddChat(chatDto);
            return Clients.All.SendAsync("messageSended", chatDto, cancellationToken);
        }

        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
