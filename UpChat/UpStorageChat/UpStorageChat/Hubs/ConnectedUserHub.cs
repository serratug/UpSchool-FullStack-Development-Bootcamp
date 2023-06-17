using Microsoft.AspNetCore.SignalR;
using UpStorageChat.Dtos;

namespace UpStorageChat.Hubs
{
    public class ConnectedUserHub:Hub
    {
        public Task AddUserAsync(ConnectedUserDto userDto, CancellationToken cancellationToken)
        {
            UserStore.AddUser(userDto);
            return Clients.All.SendAsync("userAdded", userDto, cancellationToken);
        }
        
        public IReadOnlyList<ConnectedUserDto> GetConnectedUsers()
        {
            var users = UserStore.Users;
            return users;
        }

        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
        }
    }
}
