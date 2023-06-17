using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using UpStorageChat.Dtos;
using UpStorageChat.Hubs;

namespace UpStorageChat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IHubContext<ConnectedUserHub> _hubContext;

        public UsersController(IHubContext<ConnectedUserHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpGet]
        public IActionResult GetConnectedUsers()
        {
            var users = UserStore.Users;
            return Ok(users);
        }

        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] ConnectedUserDto userDto)
        {
            UserStore.AddUser(userDto);
            await _hubContext.Clients.All.SendAsync("userAdded", userDto);
            return Ok(userDto);
        }

    }
}

