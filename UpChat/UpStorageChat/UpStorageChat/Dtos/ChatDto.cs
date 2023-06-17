namespace UpStorageChat.Dtos
{
    public class ChatDto
    {
        public string UserName { get; set; }
        public string Message { get; set; }
        public DateTimeOffset SendTime { get; set; }
    }
}
