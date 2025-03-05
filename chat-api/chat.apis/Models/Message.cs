namespace chat.apis.Models
{
    public class Message
    {
        public string senderId { get; set; }
        public string message { get;set; }
        public string receiverId { get; set; }
        public DateTime? timestamp { get; set; } = DateTime.Now;
    }
}
