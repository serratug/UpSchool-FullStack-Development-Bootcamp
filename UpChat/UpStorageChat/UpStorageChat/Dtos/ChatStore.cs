namespace UpStorageChat.Dtos
{
    public static class ChatStore
    {
        private static readonly List<ChatDto> _chats = new List<ChatDto>();

        public static IReadOnlyList<ChatDto> Chats => _chats.AsReadOnly();

        public static void AddChat(ChatDto chat)
        {
            _chats.Add(chat);
        }
    }
}
