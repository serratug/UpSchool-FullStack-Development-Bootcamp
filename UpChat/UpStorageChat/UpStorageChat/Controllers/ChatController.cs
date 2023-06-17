using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using UpStorageChat.Dtos;
using UpStorageChat.Hubs;

namespace UpStorageChat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatController(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] ChatDto chatDto)
        {
            await _hubContext.Clients.All.SendAsync("ReceiveMessage", chatDto);
            return Ok();
        }

        [HttpGet]
        public IActionResult GetChats()
        {
            var chats = ChatStore.Chats;
            return Ok(chats);
        }
    }
}
