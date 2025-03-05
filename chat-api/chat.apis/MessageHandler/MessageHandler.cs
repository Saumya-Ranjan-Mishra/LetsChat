using chat.apis.Models;
using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;

namespace chat.apis.MessageHandler
{
    public class MessageHandler : IMessageHandler
    {
        private ConcurrentDictionary<string, WebSocket> connections = new ConcurrentDictionary<string, WebSocket>();
        public async Task ReceiveMessages(string userId, WebSocket connection)
        {
            var buffer = new byte[1024];
            connections.TryAdd(userId, connection);

            while (connection.State == WebSocketState.Open)
            {
                var result = await connection.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                await connection.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);

                if(result.MessageType == WebSocketMessageType.Close)
                {
                    connections.TryRemove(userId, out _);
                    await connection.CloseAsync(WebSocketCloseStatus.NormalClosure, $"{userId} is Offline", CancellationToken.None);
                    break;
                }

                string message = Encoding.UTF8.GetString(buffer);
                Console.WriteLine($"{userId}: {message}");
            }
        }

        public Task SendMessages(Message message, WebSocket connection)
        {
            Console.WriteLine($"{message.senderId}: {message.message}");
            return Task.CompletedTask;
        }

        private void MarkUserOnline(string userId, WebSocket connection)
        {
            connections.TryAdd(userId, connection);
        }
    }
}
