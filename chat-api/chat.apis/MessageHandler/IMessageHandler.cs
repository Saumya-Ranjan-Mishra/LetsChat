using chat.apis.Models;
using System.Net.WebSockets;

namespace chat.apis.MessageHandler
{
    public interface IMessageHandler
    {
        Task ReceiveMessages(string userId, WebSocket connection);
        Task SendMessages(Message message, WebSocket connection);   
    }
}
