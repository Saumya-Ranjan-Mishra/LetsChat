using chat.apis.Models;
using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;

namespace chat.apis.MessageHandler
{
    public class MessageHandler : IMessageHandler
    {
        private ConcurrentDictionary<string, WebSocket> connections = new ConcurrentDictionary<string, WebSocket>();
        private List<Message> messages = new List<Message>();

        public async Task ReceiveMessages(string userId, WebSocket connection)
        {
            var buffer = new byte[1024];
            if (connections.TryAdd(userId, connection))
            {
                var unreadMessages = messages.Where(message => message.receiverId == userId);
                foreach(var unreadMessage in unreadMessages)
                {
                    await connections[userId].SendAsync(Encoding.ASCII.GetBytes(unreadMessage.message), WebSocketMessageType.Text, true, CancellationToken.None);
                }
            }

            while (connection.State == WebSocketState.Open)
            {
                var result = await connection.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                if (result.MessageType == WebSocketMessageType.Close)
                {
                    connections.TryRemove(userId, out _);
                    await connection.CloseAsync(WebSocketCloseStatus.NormalClosure, $"{userId} is Offline", CancellationToken.None);
                    break;
                }

                else
                {
                    string jsonMessage = Encoding.UTF8.GetString(buffer, 0, result.Count);
                    Message? decryptedMessage = JsonSerializer.Deserialize<Message>(jsonMessage);

                    if (decryptedMessage != null)
                    {
                        string rcvId = decryptedMessage.receiverId;
                        if (connections.TryGetValue(rcvId.ToLower(), out _))
                        {
                            await connections[rcvId].SendAsync(Encoding.ASCII.GetBytes(decryptedMessage.message), WebSocketMessageType.Text, true, CancellationToken.None);
                        }
                        else
                        {
                            messages.Add(decryptedMessage);
                        }
                    }
                }
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