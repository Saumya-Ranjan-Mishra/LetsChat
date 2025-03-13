using chat.apis.MessageHandler;
using Microsoft.AspNetCore.Mvc;
using System.Net.WebSockets;

namespace chat.apis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IMessageHandler MessageHandler;
        public ChatController(IMessageHandler messageHandler)
        {
            MessageHandler = messageHandler;
        }
        [HttpGet("connect")]
        public async Task InitiateChat([FromQuery] string userId)
        {
            Console.WriteLine($"{userId} is online");
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                using WebSocket webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                //string userId = HttpContext.Request.Query["user_id"];
                Console.WriteLine(userId);
                if (!string.IsNullOrEmpty(userId))
                {
                    Console.WriteLine($"{userId} is receiving messages");
                    await MessageHandler.ReceiveMessages(userId, webSocket);
                }
            }
        }

        [HttpGet("/message")]
        public async Task SendMessage([FromQuery] string to)
        {

        }

    }
}